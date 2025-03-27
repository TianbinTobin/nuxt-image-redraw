import { ref } from 'vue';

type ToolType = 'brush' | 'eraser' | 'pan';

export function useImageRedraw(options: {
  width: number;
  height: number;
  container: string;
}) {
  let imageEl: HTMLImageElement | null;
  let canvas: HTMLCanvasElement | null;
  let offscreenCanvas: HTMLCanvasElement | null;
  let brushImageEl: HTMLImageElement | null;
  let pattern: CanvasPattern | null;

  let ctx: CanvasRenderingContext2D;
  let offscreenCtx: CanvasRenderingContext2D;

  let scale = 1;
  let lastX = 0;
  let lastY = 0;
  let startPanX = 0;
  let startPanY = 0;
  let translateX = 0;
  let translateY = 0;

  const brushSize = ref(15);
  const eraserSize = ref(15);
  const isDrawing = ref(false); // 是否正在绘制
  const isPanning = ref(false); // 是否正在平移
  const currentTool = ref<ToolType>('brush'); // 当前工具类型

  function initRedraw() {
    const container = document.getElementById(options.container);

    if (container && !canvas) {
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d')!;
      container.appendChild(canvas);

      // 离屏Canvas
      offscreenCanvas = document.createElement('canvas');
      offscreenCtx = offscreenCanvas.getContext('2d')!;

      loadImage('https://picsum.photos/800/600');
      loadBrushImage('http://localhost:3000/brush.png');

      // 事件监听
      canvas.addEventListener('mousedown', start);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', end);
      canvas.addEventListener('mouseout', end);
      canvas.addEventListener('wheel', handleZoom);
    }
  }

  function destroyRedraw() {
    if (canvas && offscreenCanvas) {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', end);
      canvas.removeEventListener('mouseout', end);
      canvas.removeEventListener('wheel', handleZoom);
      imageEl = null;
      canvas = null;
      offscreenCanvas = null;
    }
  }

  function loadImage(url: string) {
    // 加载背景图片
    imageEl = new Image();
    imageEl.src = url;
    imageEl.onload = function () {
      canvas!.width = options.width;
      canvas!.height = options.height;
      offscreenCanvas!.width = imageEl!.width;
      offscreenCanvas!.height = imageEl!.height;
      updateCanvas();
    };
  }

  function loadBrushImage(url: string) {
    brushImageEl = new Image();
    brushImageEl.src = url;
    brushImageEl.onload = function () {
      pattern = ctx.createPattern(brushImageEl!, 'repeat');
    };
  }

  function setTool(tool: ToolType) {
    currentTool.value = tool;
    canvas!.style.cursor = tool === 'pan' ? 'pan' : 'crosshair';
  }

  function getCanvasCoordinates(clientX: number, clientY: number) {
    const rect = canvas!.getBoundingClientRect();
    return {
      x: (clientX - rect.left - translateX) / scale,
      y: (clientY - rect.top - translateY) / scale,
    };
  }

  function start(e: MouseEvent) {
    if (currentTool.value === 'pan') {
      isPanning.value = true;
      startPanX = e.clientX - translateX;
      startPanY = e.clientY - translateY;
      canvas!.style.cursor = 'grabbing';
    } else {
      isDrawing.value = true;
      const pos = getCanvasCoordinates(e.clientX, e.clientY);
      [lastX, lastY] = [pos.x, pos.y];

      offscreenCtx.beginPath();
      offscreenCtx.moveTo(pos.x, pos.y);
      offscreenCtx.lineWidth = 15;
      offscreenCtx.lineCap = 'round';
      offscreenCtx.lineJoin = 'round';
      offscreenCtx.strokeStyle =
        currentTool.value === 'eraser' ? 'rgba(0, 0, 0, 1)' : pattern!;
      offscreenCtx.globalCompositeOperation =
        currentTool.value === 'eraser' ? 'destination-out' : 'source-over';
    }
  }

  function draw(e: MouseEvent) {
    if (isPanning.value) {
      translateX = e.clientX - startPanX;
      translateY = e.clientY - startPanY;
      requestAnimationFrame(updateCanvas);
    } else if (isDrawing.value) {
      const pos = getCanvasCoordinates(e.clientX, e.clientY);
      offscreenCtx.lineTo(pos.x, pos.y);
      offscreenCtx.stroke();
      [lastX, lastY] = [pos.x, pos.y];
      requestAnimationFrame(updateCanvas);
    }
  }

  function end() {
    isDrawing.value = false;
    isPanning.value = false;
    canvas!.style.cursor = currentTool.value === 'pan' ? 'pan' : 'crosshair';
    if (currentTool.value !== 'pan') {
      offscreenCtx.closePath();
    }
  }

  function handleZoom(e: WheelEvent) {
    e.preventDefault();
    const zoomIntensity = 0.1;
    const oldScale = scale;
    const rect = canvas!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    scale *= e.deltaY > 0 ? 1 - zoomIntensity : 1 + zoomIntensity;
    scale = Math.min(Math.max(0.5, scale), 4);

    translateX = mouseX - (mouseX - translateX) * (scale / oldScale);
    translateY = mouseY - (mouseY - translateY) * (scale / oldScale);

    requestAnimationFrame(updateCanvas);
  }

  function updateCanvas() {
    ctx.clearRect(0, 0, canvas!.width, canvas!.height);
    ctx.save();
    ctx.translate(translateX, translateY);
    ctx.scale(scale, scale);
    ctx.drawImage(imageEl!, 0, 0);
    ctx.drawImage(offscreenCanvas!, 0, 0);
    ctx.restore();
  }

  return {
    isDrawing,
    isPanning,
    currentTool,
    setTool,
    loadImage,
    initRedraw,
    destroyRedraw,
  };
}
