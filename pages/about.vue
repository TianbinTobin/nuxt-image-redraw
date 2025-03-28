<template>
  <div class="tools">
    <button @click="setTool('brush')">画笔</button>
    <button @click="setTool('eraser')">橡皮擦</button>
    <button @click="setTool('drag')">平移</button>
    <button @click="execUndo">上一步</button>
    <button @click="execRedo">下一步</button>
    <button @click="initRedraw(url)">初始化组件</button>
    <button @click="destroyRedraw">销毁组件</button>
  </div>
  <div id="container"></div>
</template>

<script lang="ts" setup>
import { useImageRedraw } from '~/hooks/use-redraw-v2';

const url =
  'https://p3-dreamina-sign.byteimg.com/tos-cn-i-tb4s082cfz/c2dc4529a5824c22b9caf76eb47204c2~tplv-tb4s082cfz-aigc_resize:2400:2400.webp?lk3s=43402efa&x-expires=1748304000&x-signature=kUfprDMajJlkh63CHoOHwWdA5cg%3D&format=.webp';

const { setTool, execRedo, execUndo, initRedraw, destroyRedraw } =
  useImageRedraw({
    container: 'container',
    dragClass: 'drag-container',
    imageClass: 'image-container',
    editorClass: 'editor-container',
    redrawClass: 'redraw-container',
  });
</script>

<style lang="css">
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

.image-container img {
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

.drag-container {
  position: absolute;
  inset: 0px;
  z-index: 10;
}
</style>
