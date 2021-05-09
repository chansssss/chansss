<template>
  <div class="desktop">
    <div class="windowarea">
        <Win98Dialog></Win98Dialog>
    </div>
    <div class="footer">
      <div class="startmenu">
        <button class="win98-button btn-startmenu">Start</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Win98Dialog from "@/components/Win98Dialog";
export default {
  name: "Home",
  components: {Win98Dialog},
};
</script>

<style lang="less" scoped>
.desktop {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--background-color);
  background-image: var(--background-image);
  background-repeat: var(--background-repeat);
  background-size: var(--background-size);
  background-position: 50%;
  color: var(--color-primary-alt);
  padding: 0;
  margin: 0;
  overflow: hidden;
  transform-origin: top left;
}
.windowarea {
  position: relative;
  height: calc(100% - 24px);
  overflow: hidden;
}
.footer {
  display: flex;
  background: var(--gray);
  background: linear-gradient(
    180deg,
    var(--gray) 0,
    var(--gray) 1px,
    #fff 0,
    #fff 2px,
    var(--gray) 0
  );
  color: var(--black);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 22px;
  padding: 4px 2px 2px;
  box-shadow: 0 calc(var(--px) * -1) 0 var(--graylight);
  z-index: 90;
  .startmenu {
    .btn-startmenu {
      image-rendering: crisp-edges;
      image-rendering: pixelated;
      background-image: url(data:image/gif;base64,R0lGODlhEAAQAMIGAAABACcA9foAAAD9AM7Mvfb9AHBLxXBLxSH5BAEKAAcALAAAAAAQABAAAANJeLrcCxCwKBUUgsIxoM0AtnVA91EcWl0bFLTVEZbUaz5zSL6xnAcFl+cRBEGCL1wQwFvyLEsXTwg9OnlJXyEaCTwtkUnYQWYkAAA7);
      background-repeat: no-repeat;
      background-position: 3px;
      padding-left: 22px;
      width: 55px;
      height: 100%;
      font-weight: 700;
    }
  }
}
</style>
