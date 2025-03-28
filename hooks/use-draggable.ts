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

  const scaleSize = ref(1);
  const translateX = ref(0);
  const translateY = ref(0);
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
  }

  function bindListener() {
    if (dragContainerEl && containerEl) {
      dragContainerEl.addEventListener('mousedown', dragMousedown);
      document.addEventListener('mousemove', dragMousemove);
      document.addEventListener('mouseup', dragMouseup);
      document.addEventListener('mouseleave', dragMouseleave);
      containerEl.addEventListener('wheel', handleWheel);
    }
  }

  function unbindListener() {
    if (dragContainerEl && containerEl) {
      dragContainerEl.removeEventListener('mousedown', dragMousedown);
      document.removeEventListener('mousemove', dragMousemove);
      document.removeEventListener('mouseup', dragMouseup);
      document.removeEventListener('mouseleave', dragMouseleave);
      containerEl.removeEventListener('wheel', handleWheel);
    }
  }

  function dragMousedown(event: MouseEvent) {
    isDragging.value = true;
    console.log('Mouse down at: ', event.clientX, event.clientY);
    [startPanX, startPanY] = [event.clientX, event.clientY];
  }

  function dragMousemove(event: MouseEvent) {
    if (isDragging.value) {
      const dx = (event.clientX - startPanX) / scaleSize.value;
      const dy = (event.clientY - startPanY) / scaleSize.value;
      const { x, y } = getRange();
      translateX.value = getValueInRange(translateX.value + dx, x);
      translateY.value = getValueInRange(translateY.value + dy, y);
      changeMoveStyle();
      console.log('Mouse move at: ', dx, translateX.value, translateY.value);
      [startPanX, startPanY] = [event.clientX, event.clientY];
    }
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

  return { isDragging, scaleSize, translateX, translateY, initDraggable };
}
