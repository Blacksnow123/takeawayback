<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown  menu-align='start'>
			<div class="el-icon-s-tools"></div>
			<el-dropdown-menu slot="dropdown">
				<el-button class="main" type="primary" @click="main()">首页</el-button>
				<el-button class="back" type="primary" @click="back()">退出</el-button>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
    export default {
    	data(){
    		return {
    			
    		}
    	},
    	created(){
    		
    	},
    	computed: {

    	},
		methods: {
			main(){
				this.$router.push('/manage')
			},
			back(){
				// alert("111");
				this.$router.push('/login')
			}
		}
    }
</script>

<style lang="less" >
	@import '../../../static/style/mixin.less';
	.header_container{
		background-color: #EFF2F7 ;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}

	// ul{
	// 	background-color: rgb(50, 64, 87) !important;
	// }
	.el-submenu__title,.el-menu-item{
		color: #bfcbd9 !important ;
	}

	.el-dropdown-menu {
		background-color:#e4e4e4 !important;
		text-align: center;
	}

	.main,.back{
		width: 100%;
	}
	.el-button+.el-button {
    	margin-left: 0px !important; 
	}
</style>
