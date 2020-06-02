<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>后台管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span></span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
				<div @click="register()">
					<p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，点击这里注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p>
				</div>
				
	  		</section>

			
	  	</transition>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
                },
                user:{
                    user_name:'',
                    user_password:''
                },
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		mounted(){
			this.showLogin = true;
			// if (!this.adminInfo.id) {
    		// 	this.getAdminData()
    		// }
		},
		// computed: {
		// 	...mapState(['adminInfo']),
		// },
		methods: {
			// ...mapActions(['getAdminData']),
			submitForm(formName) {
                console.log(this.loginForm.username);
                this.user.user_name=this.loginForm.username;
                this.user.user_password=this.loginForm.password;
                this.$ajax.post("adminCheck",this.user).then(result => {
                    // console.log(result.data.result);
                    if (result.data.result == 0) {
						// console.log("1111"+result.data.data)
						this.$store.commit('setUser',result.data.data[0])
						this.$message({
		                    type: 'success',
		                    message: '登录成功'
						});
						let a=result.data.data[0].role_flag;
						console.log(a)
						if(a===2){
							this.$router.push('/shoperManage')
						}else if(a===3){
							this.$router.push('/manage')
						}
						else{
							this.$message({
		                        type: 'error',
		                        message: "账号或密码错误"
		                    });
						}
					}else{
						    this.$message({
		                        type: 'error',
		                        message: "账号或密码错误"
		                    });
						}
                    // this.shopList=result.data.data;
                    // console.log(this.shopList);
                });
			},
			register(){
				// this.showLogin=!this.showLogin;
				// this.showRegister=!this.showRegister;
				this.$router.push('/register');
				
			}
		},
		// watch: {
		// 	adminInfo: function (newValue){
		// 		if (newValue.id) {
		// 			this.$message({
        //                 type: 'success',
        //                 message: '检测到您之前登录过，将自动登录'
        //             });
		// 			this.$router.push('manage')
		// 		}
		// 	}
		// }
	}
</script>

<style lang="less" >
    @import '../static/style/mixin';
    body{
        margin: 0 !important;
    }
	.login_page{
        background-color: #324057;
        height: 100vh;
        width: 100vw;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 250px);
		.ctp(320px, 250px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
        color: red;
        padding: 0;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
