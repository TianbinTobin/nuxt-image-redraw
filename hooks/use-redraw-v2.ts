import { ref } from 'vue';

interface DrawPath {
  points: [number, number][];
  type: PathType;
  lineWidth: number;
  lineCap: CanvasLineCap;
  lineJoin: CanvasLineJoin;
  strokeStyle: string | CanvasPattern | CanvasGradient;
}

type PathType = 'brush' | 'eraser' | 'pan';

enum WheelAction {
  TouchPadPinchUp = 'TouchPadPinchUp',
  TouchPadPinchDown = 'TouchPadPinchDown',
  TouchPadMoveUp = 'TouchPadMoveUp',
  TouchPadMoveDown = 'TouchPadMoveDown',
  MouseUp = 'MouseUp',
  MouseDown = 'MouseDown',
}

export function useImageRedraw(options: {
  container: string | HTMLElement;
  imageContainer: string | HTMLElement;
  editorContainer: string | HTMLElement;
  redrawContainer: string | HTMLElement;
}) {
  let containerEl: HTMLElement | null;

  let imageEl: HTMLImageElement | null;

  let canvas: HTMLCanvasElement | null;
  let ctx: CanvasRenderingContext2D;

  let drawPath: DrawPath;

  let lastX = 0;
  let lastY = 0;

  const imageSize = { width: 0, height: 0 };
  const originImageSize = { width: 0, height: 0, ratio: 1 };

  const undoPaths: DrawPath[] = [];
  const redoPaths: DrawPath[] = [];

  const scaleSize = ref(1);
  const brushSize = ref(15);
  const eraserSize = ref(15);
  const isDrawing = ref(false); // 是否正在绘制
  const currentTool = ref<PathType>('brush'); // 当前工具类型

  function setTool(tool: PathType) {
    currentTool.value = tool;
  }

  function loadImage(url: string) {
    imageEl = new Image();
    imageEl.height = 482;
    imageEl.loading = 'lazy';
    imageEl.draggable = false;
    imageEl.fetchPriority = 'high';
    imageEl.crossOrigin = 'Anonymous'; // 允许跨域加载图片
    imageEl.onload = function () {
      // setOriginImageSize(imageEl!);
      // setImageSize();
    };
    imageEl.src = url;
  }

  function setImageSize() {
    const containerWidth = containerEl!.parentElement!.clientWidth;
    const containerHeight = containerEl!.parentElement!.clientHeight;
    const containerRatio = containerWidth / containerHeight;
    if (originImageSize.ratio > containerRatio) {
      if (originImageSize.width > containerWidth) {
        imageSize.width = containerWidth;
        imageSize.height = containerWidth / originImageSize.ratio;
      } else {
        imageSize.width = originImageSize.width;
        imageSize.height = originImageSize.height;
      }
    } else {
      if (originImageSize.height > containerHeight) {
        imageSize.width = containerHeight * originImageSize.ratio;
        imageSize.height = containerHeight;
      } else {
        imageSize.width = originImageSize.width;
        imageSize.height = originImageSize.height;
      }
    }
    canvas!.style.width = `${imageSize.width}px`;
    canvas!.style.height = `${imageSize.height}px`;
    containerEl!.style.width = `${imageSize.width}px`;
    containerEl!.style.height = `${imageSize.height}px`;
  }

  function setOriginImageSize(imageEl: HTMLImageElement) {
    originImageSize.width = imageEl.naturalWidth;
    originImageSize.height = imageEl.naturalHeight;
    originImageSize.ratio = originImageSize.width / originImageSize.height;
    canvas!.width = originImageSize.width;
    canvas!.height = originImageSize.height;
  }

  function loadBrushImage(url: string) {
    const image = new Image();
    image.src = url;
    image.onload = function () {
      ctx.strokeStyle = ctx.createPattern(image, 'repeat')!;
    };
  }

  function execUndo() {
    const popItem = undoPaths.pop();
    if (popItem) {
      redoPaths.push(popItem);
      clearRect();
      drawPaths(undoPaths);
    }
  }

  function execRedo() {
    const popItem = redoPaths.pop();
    if (popItem) {
      undoPaths.push(popItem);
      clearRect();
      drawPaths(undoPaths);
    }
  }

  function resetPath(): DrawPath {
    return {
      points: [],
      type: 'brush',
      lineWidth: 15,
      lineCap: 'round',
      lineJoin: 'round',
      strokeStyle: '#000000',
    };
  }

  function savePath(offsetX: number, offsetY: number) {
    drawPath.points.push([offsetX, offsetY]);
    Object.assign(drawPath, {
      type: currentTool.value,
      lineCap: ctx.lineCap,
      lineJoin: ctx.lineJoin,
      lineWidth: ctx.lineWidth,
      strokeStyle: ctx.strokeStyle,
    });
  }

  function initRedraw() {
    if (options.container instanceof HTMLElement) {
      containerEl = options.container;
    } else {
      containerEl = document.getElementById(options.container)!;
    }
    if (containerEl && !canvas) {
      canvas = containerEl.querySelector('canvas')!;

      ctx = canvas.getContext('2d')!;
      ctx.scale(1024 / 642.667, 768 / 482);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      loadBrushImage(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADBJREFUOE9jbAp4ZsyAB4hISuKTZmAcNWBYhMG0zP9408Gb58/xp4NRAxgYh34YAABF7zjxN4qb+wAAAABJRU5ErkJggg=='
      );

      // 事件监听
      canvas.addEventListener('mousedown', handleMousedown);
      canvas.addEventListener('mousemove', handleMousemove);
      canvas.addEventListener('mouseout', handleMouseout);
      canvas.addEventListener('mouseover', handleMouseover);
      containerEl.addEventListener('wheel', handleWheel);
      window.addEventListener(
        'onpointerup' in window ? 'pointerup' : 'mouseup',
        handleMouseup
      );
    }
  }

  function destroyRedraw() {
    if (containerEl && canvas) {
      canvas.removeEventListener('mousedown', handleMousedown);
      canvas.removeEventListener('mousemove', handleMousemove);
      canvas.removeEventListener('mouseout', handleMouseout);
      canvas.removeEventListener('mouseover', handleMouseover);
      containerEl.removeEventListener('wheel', handleWheel);
      window.removeEventListener(
        'onpointerup' in window ? 'pointerup' : 'mouseup',
        handleMouseup
      );
      canvas = null;
      containerEl = null;
    }
  }

  function drawLine(event: MouseEvent) {
    if (isDrawing.value) {
      ctx.save();
      ctx.globalCompositeOperation =
        currentTool.value === 'eraser' ? 'destination-out' : 'xor';
      ctx.lineWidth =
        currentTool.value === 'eraser' ? eraserSize.value : brushSize.value;
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
      savePath(event.offsetX, event.offsetY);
      ctx.restore();
      [lastX, lastY] = [event.offsetX, event.offsetY];
    }
  }

  function drawPaths(paths: DrawPath[]) {
    paths.forEach((path) => {
      ctx.save();
      ctx.globalCompositeOperation =
        path.type === 'brush' ? 'xor' : 'destination-out';
      ctx.lineWidth = path.lineWidth;
      ctx.strokeStyle = path.strokeStyle;
      ctx.beginPath();
      for (let i = 0; i < path.points.length; i++) {
        const [x, y] = path.points[i];
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
      ctx.restore();
    });
  }

  function clearRect() {
    ctx.clearRect(0, 0, canvas!.width, canvas!.height);
  }

  function handleMousedown(event: MouseEvent) {
    isDrawing.value = true;
    drawPath = resetPath();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
    savePath(event.offsetX, event.offsetY);
  }

  function handleMousemove(event: MouseEvent) {
    drawLine(event);
  }

  function handleMouseup(event: MouseEvent) {
    if (isDrawing.value) {
      if (lastX === event.offsetX && lastY === event.offsetY) {
        drawLine(event);
      }
      ctx.closePath();
      undoPaths.push(drawPath);
      isDrawing.value = false;
    }
  }

  function handleMouseover(event: MouseEvent) {
    console.log('Mouse over', event.offsetX, event.offsetY);
  }

  function handleMouseout(event: MouseEvent) {
    console.log('Mouse out', event.offsetX, event.offsetY);
  }

  function handleWheel(event: WheelEvent) {
    event.preventDefault();
    event.stopPropagation();
    const { action } = checkWheelAction(event);
    console.log('Wheel action', action);
    if (
      [
        WheelAction.TouchPadPinchUp,
        WheelAction.TouchPadPinchDown,
        WheelAction.MouseUp,
        WheelAction.MouseDown,
      ].includes(action)
    ) {
      handleScale(
        action === WheelAction.MouseUp ||
          action === WheelAction.TouchPadPinchUp,
        action === WheelAction.TouchPadPinchDown ||
          action === WheelAction.TouchPadPinchUp
      );
    }
  }

  function handleScale(isUp: boolean, isTouch: boolean) {
    const flag = isTouch ? (isUp ? 1.03 : 0.97) : isUp ? 1.06 : 0.94;
    scaleSize.value = Math.max(
      0.33,
      Math.min(3, Math.abs(scaleSize.value * flag))
    );
  }

  function checkWheelAction(event: WheelEvent) {
    if (event.ctrlKey) {
      return {
        action:
          event.deltaY > 0
            ? WheelAction.TouchPadPinchDown
            : WheelAction.TouchPadPinchUp,
      };
    }
    return (event.deltaY ? Math.abs(event.deltaY) < 100 : event.deltaMode === 0)
      ? {
          action:
            event.deltaY > 0
              ? WheelAction.TouchPadMoveUp
              : WheelAction.TouchPadMoveDown,
        }
      : {
          action:
            event.deltaY > 0 ? WheelAction.MouseUp : WheelAction.MouseDown,
        };
  }

  return {
    scaleSize,
    isDrawing,
    currentTool,
    setTool,
    execUndo,
    execRedo,
    loadImage,
    initRedraw,
    destroyRedraw,
  };
}
