export function useDraggable(options: { containerEl: string; dragEl: string }) {
  let startPanX = 0;
  let startPanY = 0;
  let scaleSize = 1;

  let containerWidth = 0;
  let containerHeight = 0;

  const translateX = ref(0);
  const translateY = ref(0);
  const isDragging = ref(false);

  let containerEl: HTMLElement | null;

  onMounted(() => {
    containerEl = document.querySelector<HTMLElement>(options.containerEl);
    containerWidth = containerEl!.clientWidth;
    containerHeight = containerEl!.clientHeight;
    bindListener();
  });

  onBeforeUnmount(() => {
    unbindListener();
  });

  function setScaleSize(value: number) {
    scaleSize = value;
  }

  function bindListener() {
    const dragEl = document.querySelector<HTMLElement>(options.dragEl);
    if (dragEl) {
      dragEl.addEventListener('mousedown', dragMousedown);
      document.addEventListener('mousemove', dragMousemove);
      document.addEventListener('mouseup', dragMouseup);
      document.addEventListener('mouseleave', dragMouseleave);
    }
  }

  function unbindListener() {
    const dragEl = document.querySelector<HTMLElement>(options.dragEl);
    if (dragEl) {
      dragEl.removeEventListener('mousedown', dragMousedown);
      document.removeEventListener('mousemove', dragMousemove);
      document.removeEventListener('mouseup', dragMouseup);
      document.removeEventListener('mouseleave', dragMouseleave);
    }
  }

  function dragMousedown(event: MouseEvent) {
    isDragging.value = true;
    console.log('Mouse down at: ', event.clientX, event.clientY);
    [startPanX, startPanY] = [event.clientX, event.clientY];
  }

  function dragMousemove(event: MouseEvent) {
    if (isDragging.value) {
      const dx = (event.clientX - startPanX) / scaleSize;
      const dy = (event.clientY - startPanY) / scaleSize;
      const { x, y } = getRange();
      translateX.value = getValueInRange(translateX.value + dx, x);
      translateY.value = getValueInRange(translateY.value + dy, y);
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
    const boundaryX = Math.abs(containerWidth / scaleSize / 2);
    const boundaryY = Math.abs(containerHeight / scaleSize / 2);
    return {
      x: { min: -boundaryX, max: boundaryX },
      y: { min: -boundaryY, max: boundaryY },
    };
  }

  function getValueInRange(value: number, range: { min: number; max: number }) {
    return Math.min(range.max, Math.max(range.min, value));
  }

  return { isDragging, translateX, translateY, setScaleSize };
}
