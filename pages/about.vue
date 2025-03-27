<template>
  <div class="tools">
    <button @click="setTool('brush')">画笔</button>
    <button @click="setTool('eraser')">橡皮擦</button>
    <button @click="setTool('pan')">平移</button>
    <button @click="execUndo">上一步</button>
    <button @click="execRedo">下一步</button>
  </div>
  <div id="container">
    <div
      class="redraw-container"
      :style="{
        width: '642.667px',
        height: '482px',
        transition: isDragging ? 'none' : 'transform 0.2s',
        transform: `scale(${scaleSize}) translate(${translateX}px, ${translateY}px)`,
      }"
    >
      <div class="image-container">
        <div class="image-container-inner">
          <img
            draggable="false"
            crossorigin="anonymous"
            loading="lazy"
            fetchpriority="high"
            src="https://p9-dreamina-sign.byteimg.com/tos-cn-i-tb4s082cfz/33bef75e096049689e6f9dbce591a053~tplv-tb4s082cfz-aigc_resize:2048:2048.webp?lk3s=43402efa&x-expires=1744416000&x-signature=lGi432nZTiyFL2O%2B%2BtNRcefwt1g%3D&format=.webp"
          />
        </div>
      </div>
      <div class="editor-container">
        <div class="editor-container-inner">
          <canvas
            width="1024"
            height="768"
            :style="{ width: '642.667px', height: '482px' }"
          ></canvas>
        </div>
      </div>
      <div v-show="currentTool === 'pan'" class="mask-container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDraggable } from '~/hooks/use-draggable';
import { useImageRedraw } from '~/hooks/use-redraw-v2';

onMounted(() => {
  initRedraw();
  // loadImage(
  //   'https://p9-dreamina-sign.byteimg.com/tos-cn-i-tb4s082cfz/33bef75e096049689e6f9dbce591a053~tplv-tb4s082cfz-aigc_resize:2048:2048.webp?lk3s=43402efa&x-expires=1744416000&x-signature=lGi432nZTiyFL2O%2B%2BtNRcefwt1g%3D&format=.webp'
  // );
});

const { isDragging, translateX, translateY, setScaleSize } = useDraggable({
  containerEl: '.redraw-container',
  dragEl: '.mask-container',
});

const {
  scaleSize,
  currentTool,
  setTool,
  execRedo,
  execUndo,
  loadImage,
  initRedraw,
} = useImageRedraw({
  container: 'container',
  imageContainer: '.image-container',
  editorContainer: '.editor-container',
  redrawContainer: '.redraw-container',
});

watch(
  scaleSize,
  (newValue) => {
    setScaleSize(newValue);
  },
  { immediate: true }
);
</script>

<style lang="css" scoped>
#container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 800px;
  height: 482px;
  overflow: hidden;
  user-select: none;
  border-radius: 12px;
  background-color: #17191d;
}

.redraw-container {
  position: relative;
  margin: auto;
  height: 100%;
  will-change: transform;
}

.image-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.image-container-inner {
  transition: opacity 0.3s;
  opacity: 1;
}

.image-container-inner img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: contain;
  transition: opacity 0.1s ease;
}

.editor-container {
  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.editor-container-inner {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: url('http://localhost:3000/eraser.svg') 16 16, auto;
}

.mask-container {
  position: absolute;
  inset: 0px;
  z-index: 10;
}
</style>
