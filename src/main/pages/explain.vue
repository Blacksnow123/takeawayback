<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p class="explain_text">这里是后台管理系统</p>
        
    </div>
</template>

<script>
	import headTop from '../components/headTop.vue'
    export default {
    	components: {
    		headTop,
    	},
    }
</script>

<style lang="less">
	@import '../../../static/style/mixin.less';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
</style>
