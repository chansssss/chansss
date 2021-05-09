<template>
  <div class="my-computer">
    <Win98Dialog>
        <h1>我的电脑</h1>
    </Win98Dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Win98Dialog from "@/components/Win98Dialog";
export default {
  name: "Home",
  components: {Win98Dialog},
  data(){
    return{
      
    }
  }
};
</script>

<style lang="less" scoped>
.my-computer{
    width: auto;
    height: auto;
    position: absolute;
}
</style>
