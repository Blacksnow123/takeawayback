<template>
  <div id="app" class="fillcontain">
    <router-view ></router-view>
    
  </div>
  
</template>

<script>
export default {
    provide :function() {
    return {
      reload:this.reload
    }
},
data:function(){
    return {
        isRouterAlive:true
    }
},
methods:{
    reload:function(){
        this.isRouterAlive=false;
        this.$nextTick(function(){
            this.isRouterAlive=true
        })
    }
}
}
</script>

<style lang="less" >
    @import '../static/style/common.less';
</style>