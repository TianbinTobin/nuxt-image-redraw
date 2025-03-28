import { ref } from 'vue';

interface DrawPath {
  points: [number, number][];
  type: PathType;
  lineWidth: number;
  lineCap: CanvasLineCap;
  lineJoin: CanvasLineJoin;
  strokeStyle: string | CanvasPattern | CanvasGradient;
}

type PathType = 'brush' | 'eraser' | 'drag';

enum WheelAction {
  TouchPadPinchUp = 'TouchPadPinchUp',
  TouchPadPinchDown = 'TouchPadPinchDown',
  TouchPadMoveUp = 'TouchPadMoveUp',
  TouchPadMoveDown = 'TouchPadMoveDown',
  MouseUp = 'MouseUp',
  MouseDown = 'MouseDown',
}

export function useDraggable(options: {
  container: string | HTMLElement;
  dragContainer: string | HTMLElement;
  redrawContainer: string | HTMLElement;
}) {
  let startPanX = 0;
  let startPanY = 0;

  let containerWidth = 0;
  let containerHeight = 0;

  let initialDistance = 0;

  const scaleSize = ref(1);
  const translateX = ref(0);
  const translateY = ref(0);
  const isScaling = ref(false);
  const isDragging = ref(false);

  let containerEl: HTMLElement | null;
  let dragContainerEl: HTMLElement | null;
  let redrawContainerEl: HTMLElement | null;

  function initDraggable() {
    if (options.container instanceof HTMLElement) {
      containerEl = options.container;
    } else {
      containerEl = document.getElementById(options.container)!;
    }
    if (options.dragContainer instanceof HTMLElement) {
      dragContainerEl = options.dragContainer;
    } else {
      dragContainerEl = document.querySelector(options.dragContainer)!;
    }
    if (options.redrawContainer instanceof HTMLElement) {
      redrawContainerEl = options.redrawContainer;
    } else {
      redrawContainerEl = document.querySelector(options.redrawContainer)!;
    }
    containerWidth = containerEl.clientWidth;
    containerHeight = containerEl.clientHeight;

    bindListener();
  }

  function destroyDraggable() {
    unbindListener();
    containerEl = null;
    dragContainerEl = null;
    redrawContainerEl = null;
  }

  function bindListener() {
    if (dragContainerEl && containerEl) {
      dragContainerEl.addEventListener('pointerdown', dragMousedown);
      dragContainerEl.addEventListener('touchstart', dragTouchstart);
      dragContainerEl.addEventListener('touchmove', dragTouchmove);
      dragContainerEl.addEventListener('touchend', dragTouchend);
      document.addEventListener('pointermove', dragMousemove);
      document.addEventListener('pointerup', dragMouseup);
      document.addEventListener('pointerleave', dragMouseleave);
      containerEl.addEventListener('wheel', handleWheel);
    }
  }

  function unbindListener() {
    if (dragContainerEl && containerEl) {
      dragContainerEl.removeEventListener('pointerdown', dragMousedown);
      dragContainerEl.removeEventListener('touchstart', dragTouchstart);
      dragContainerEl.removeEventListener('touchmove', dragTouchmove);
      dragContainerEl.removeEventListener('touchend', dragTouchend);
      document.removeEventListener('pointermove', dragMousemove);
      document.removeEventListener('pointerup', dragMouseup);
      document.removeEventListener('pointerleave', dragMouseleave);
      containerEl.removeEventListener('wheel', handleWheel);
    }
  }

  function dragTouchstart(event: TouchEvent) {
    if (event.touches.length === 2) {
      initialDistance = getFingersDistance(event.touches[0], event.touches[1]);
      isScaling.value = true;
    }
  }

  function dragTouchmove(event: TouchEvent) {
    event.preventDefault();
    if (isScaling.value && event.touches.length === 2) {
      const distance = getFingersDistance(event.touches[0], event.touches[1]);
      handleScale(distance > initialDistance, true);
      initialDistance = distance;
    }
  }

  function dragTouchend() {
    if (isScaling.value) {
      isScaling.value = false;
    }
  }

  function dragMousedown(event: PointerEvent) {
    isDragging.value = true;
    console.log('Mouse down at: ', event.clientX, event.clientY);
    [startPanX, startPanY] = [event.clientX, event.clientY];
  }

  function dragMousemove(event: PointerEvent) {
    event.preventDefault();
    dragMove(event.clientX, event.clientY);
  }

  function dragMouseup() {
    if (isDragging.value) {
      isDragging.value = false;
    }
  }

  function dragMouseleave() {
    if (isDragging.value) {
      isDragging.value = false;
    }
  }

  function dragMove(clientX: number, clientY: number) {
    if (isDragging.value && !isScaling.value) {
      const dx = (clientX - startPanX) / scaleSize.value;
      const dy = (clientY - startPanY) / scaleSize.value;
      const { x, y } = getRange();
      translateX.value = getValueInRange(translateX.value + dx, x);
      translateY.value = getValueInRange(translateY.value + dy, y);
      changeMoveStyle();
      console.log('Mouse move at: ', translateX.value, translateY.value);
      [startPanX, startPanY] = [clientX, clientY];
    }
  }

  function getRange() {
    const boundaryX = Math.abs(containerWidth / scaleSize.value / 2);
    const boundaryY = Math.abs(containerHeight / scaleSize.value / 2);
    return {
      x: { min: -boundaryX, max: boundaryX },
      y: { min: -boundaryY, max: boundaryY },
    };
  }

  function getValueInRange(value: number, range: { min: number; max: number }) {
    return Math.min(range.max, Math.max(range.min, value));
  }

  function getFingersDistance(touch1: Touch, touch2: Touch) {
    const x1 = touch1.clientX;
    const y1 = touch1.clientY;
    const x2 = touch2.clientX;
    const y2 = touch2.clientY;
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  function changeMoveStyle() {
    if (redrawContainerEl) {
      redrawContainerEl.style.transition = isDragging.value
        ? 'none'
        : 'transform 200ms';
      redrawContainerEl.style.transform = `scale(${scaleSize.value}) translate(${translateX.value}px, ${translateY.value}px)`;
    }
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

  return { initDraggable, destroyDraggable };
}

export function useImageRedraw(options: {
  container: string | HTMLElement;
  dragClass: string;
  imageClass: string;
  editorClass: string;
  redrawClass: string;
}) {
  let containerEl: HTMLElement | null;
  let editorInnerEl: HTMLElement | null;
  let dragContainerEl: HTMLElement | null;
  let imageContainerEl: HTMLElement | null;
  let editorContainerEl: HTMLElement | null;
  let redrawContainerEl: HTMLElement | null;

  let imageEl: HTMLImageElement | null;

  let canvas: HTMLCanvasElement | null;
  let ctx: CanvasRenderingContext2D | null;

  let drawPath = resetPath();

  let lastX = 0;
  let lastY = 0;

  const canvasSize = { width: 0, height: 0 };
  const imageSize = { width: 0, height: 0, ratio: 1 };

  const undoPaths: DrawPath[] = [];
  const redoPaths: DrawPath[] = [];

  const brushSize = ref(15);
  const eraserSize = ref(15);
  const isDrawing = ref(false); // 是否正在绘制
  const currentTool = ref<PathType>(); // 当前工具类型

  const { initDraggable, destroyDraggable } = useDraggable({
    container: options.container,
    dragContainer: `.${options.dragClass}`,
    redrawContainer: `.${options.redrawClass}`,
  });

  function setTool(tool: PathType) {
    currentTool.value = tool;
    if (!editorInnerEl) {
      return;
    }
    if (tool === 'eraser') {
      editorInnerEl.style.cursor = `url("/eraser.svg") 16 16, auto`;
    } else if (tool === 'brush') {
      editorInnerEl.style.cursor = `url("/brush.svg") 16 16, auto`;
    }
    if (tool === 'drag') {
      dragContainerEl!.style.display = 'block';
      document.body.style.touchAction = 'none';
    } else {
      dragContainerEl!.style.display = 'none'; // 隐藏拖拽容器
      document.body.style.touchAction = '';
    }
  }

  function loadImage(url: string) {
    imageEl = new Image();
    imageEl.height = 482;
    imageEl.loading = 'lazy';
    imageEl.draggable = false;
    imageEl.fetchPriority = 'high';
    imageEl.crossOrigin = 'anonymous'; // 允许跨域加载图片
    imageEl.style.overflow = 'hidden';
    imageEl.style.objectFit = 'contain';
    imageEl.onload = function () {
      setImageSize();
      setCanvasSize();
      changeCanvasSize();
      changeCanvasScale();
    };
    imageEl.onerror = function () {
      console.error('Failed to load image');
    };
    imageEl.src = url;
  }

  function setImageSize() {
    imageSize.width = imageEl!.naturalWidth;
    imageSize.height = imageEl!.naturalHeight;
    imageSize.ratio = imageSize.width / imageSize.height;
  }

  function setCanvasSize() {
    const { width, height } = getCanvasSize();
    canvasSize.width = width;
    canvasSize.height = height;
    if (redrawContainerEl) {
      redrawContainerEl.style.width = `${canvasSize.width}px`;
      redrawContainerEl.style.height = `${canvasSize.height}px`;
    }
    if (editorInnerEl) {
      editorInnerEl.style.width = `${canvasSize.width}px`;
      editorInnerEl.style.height = `${canvasSize.height}px`;
    }
  }

  function getCanvasSize() {
    const containerWidth = containerEl!.clientWidth;
    const containerHeight = containerEl!.clientHeight;
    if (imageSize.ratio > containerWidth / containerHeight) {
      if (imageSize.width > containerWidth) {
        return {
          width: containerWidth,
          height: containerWidth / imageSize.ratio,
        };
      }
    } else {
      if (imageSize.height > containerHeight) {
        return {
          width: containerHeight * imageSize.ratio,
          height: containerHeight,
        };
      }
    }
    return { width: imageSize.width, height: imageSize.height };
  }

  function changeCanvasSize() {
    if (canvas) {
      canvas.width = imageSize.width;
      canvas.height = imageSize.height;
      canvas.style.touchAction = 'none';
      canvas.style.width = `${canvasSize.width}px`;
      canvas.style.height = `${canvasSize.height}px`;
    }
    initCanvasContext();
  }

  function changeCanvasScale() {
    if (ctx) {
      ctx.scale(
        imageSize.width / canvasSize.width,
        imageSize.height / canvasSize.height
      );
    }
    loadBrushImage(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADBJREFUOE9jbAp4ZsyAB4hISuKTZmAcNWBYhMG0zP9408Gb58/xp4NRAxgYh34YAABF7zjxN4qb+wAAAABJRU5ErkJggg=='
    );
  }

  function loadBrushImage(url: string) {
    const image = new Image();
    image.src = url;
    image.onload = function () {
      if (ctx) {
        ctx.strokeStyle = ctx.createPattern(image, 'repeat')!;
      }
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
      lineCap: ctx?.lineCap,
      lineJoin: ctx?.lineJoin,
      lineWidth: ctx?.lineWidth,
      strokeStyle: ctx?.strokeStyle,
    });
  }

  function createRedrawContainer() {
    redrawContainerEl = document.createElement('div');
    redrawContainerEl.classList.add(options.redrawClass);
    redrawContainerEl.appendChild(createImageContainer());
    redrawContainerEl.appendChild(createCanvasContainer());
    redrawContainerEl.appendChild(createDragContainer());
    containerEl!.appendChild(redrawContainerEl);
  }

  function createImageContainer() {
    imageContainerEl = document.createElement('div');
    imageContainerEl.classList.add(options.imageClass);
    const imageInner = document.createElement('div');
    imageInner.style.transition = 'opacity 300ms';
    imageInner.style.opacity = '1';
    imageInner.appendChild(imageEl!);
    imageContainerEl.appendChild(imageInner);
    return imageContainerEl;
  }

  function createCanvasContainer() {
    editorContainerEl = document.createElement('div');
    editorContainerEl.classList.add(options.editorClass);
    editorInnerEl = document.createElement('div');
    editorInnerEl.style.position = 'relative';
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    bindListener();
    editorInnerEl.appendChild(canvas);
    editorContainerEl.appendChild(editorInnerEl);
    return editorContainerEl;
  }

  function createDragContainer() {
    dragContainerEl = document.createElement('div');
    dragContainerEl.classList.add(options.dragClass);
    dragContainerEl.style.display =
      currentTool.value === 'drag' ? 'block' : 'none';
    dragContainerEl.style.cursor = `url("/grab.svg") 16 16, auto`;
    return dragContainerEl;
  }

  function initCanvasContext() {
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }

  function bindListener() {
    // 事件监听
    if (canvas) {
      canvas.addEventListener('pointerdown', handleMousedown);
      canvas.addEventListener('pointermove', handleMousemove);
    }
    window.addEventListener(
      'onpointerup' in window ? 'pointerup' : 'mouseup',
      handleMouseup
    );
  }

  function unbindListener() {
    // 解除事件监听
    if (canvas) {
      canvas.removeEventListener('pointerdown', handleMousedown);
      canvas.removeEventListener('pointermove', handleMousemove);
    }
    window.removeEventListener(
      'onpointerup' in window ? 'pointerup' : 'mouseup',
      handleMouseup
    );
  }

  function initRedraw(url: string) {
    if (options.container instanceof HTMLElement) {
      containerEl = options.container;
    } else {
      containerEl = document.getElementById(options.container)!;
    }
    loadImage(url);
    createRedrawContainer();
    setTool('brush');
    initDraggable();
  }

  function destroyRedraw() {
    destroyDraggable();
    unbindListener();
    undoPaths.length = 0;
    redoPaths.length = 0;
    drawPath = resetPath();
    redrawContainerEl?.remove();
    ctx = null;
    canvas = null;
    imageEl = null;
    containerEl = null;
    editorInnerEl = null;
    dragContainerEl = null;
    imageContainerEl = null;
    editorContainerEl = null;
    redrawContainerEl = null;
  }

  function drawLine(offsetX: number, offsetY: number) {
    if (isDrawing.value && ctx) {
      ctx.save();
      ctx.globalCompositeOperation =
        currentTool.value === 'eraser' ? 'destination-out' : 'xor';
      ctx.lineWidth =
        currentTool.value === 'eraser' ? eraserSize.value : brushSize.value;
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      savePath(offsetX, offsetY);
      ctx.restore();
      [lastX, lastY] = [offsetX, offsetY];
    }
  }

  function drawPaths(paths: DrawPath[]) {
    paths.forEach((path) => {
      if (ctx) {
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
      }
    });
  }

  function clearRect() {
    if (ctx) {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
    }
  }

  function handleMousedown(event: PointerEvent) {
    isDrawing.value = true;
    drawPath = resetPath();
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(event.offsetX, event.offsetY);
      savePath(event.offsetX, event.offsetY);
    }
  }

  function handleMousemove(event: PointerEvent) {
    event.preventDefault();
    drawLine(event.offsetX, event.offsetY);
  }

  function handleMouseup(event: MouseEvent) {
    if (isDrawing.value) {
      if (lastX === event.offsetX && lastY === event.offsetY) {
        drawLine(event.offsetX, event.offsetY);
      }
      if (ctx) {
        ctx.closePath();
      }
      undoPaths.push(drawPath);
      isDrawing.value = false;
    }
  }

  return {
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
