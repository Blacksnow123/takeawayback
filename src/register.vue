<template>
    <div class="registerContainer">
        <transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showRegister">
		  		<div class="manage_tip">
		  			<p>后台管理系统</p>
		  		</div>
		    	<el-form :model="registerForm" :rules="rules" ref="registerForm">
					<el-form-item prop="username">
						<el-input v-model="registerForm.username" placeholder="用户名"><span></span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="registerForm.password" type="password" placeholder="密码" ></el-input>
					</el-form-item>
                    <el-form-item prop="comfirm">
						<el-input v-model="registerForm.comfirm" type="password" placeholder="确认密码" ></el-input>
					</el-form-item>
                    <el-form-item prop="email">
						<el-input v-model="registerForm.email" placeholder="邮箱" ></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="register(registerForm)"  class="submit_btn">注册</el-button>
				  	</el-form-item>
				</el-form>		
	  		</section>
	  	</transition>
    </div>
</template>

<script>
export default {
    data(){
        return{
            showRegister:false,
            registerForm:{
                username:'',
                password:'',
                comfirm:'',
                email:'',
                
            },
            rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    comfirm: [
						{ required: true, message: '请确认密码', trigger: 'blur' }
                    ],
                    email: [
						{ required: true, message: '请输入邮箱', trigger: 'blur' }
                    ],
				},
        }
    },
    mounted(){
        this.showRegister=true;
    },
    methods:{
        register(registerForm){
            if(registerForm.password===registerForm.comfirm){
                this.$ajax.post("/shoperRegister",{user_name:registerForm.username,user_password:registerForm.password,email:registerForm.email}).then((res)=>{
                    if(res.data.result===0){
                        this.$message({
		                    type: 'success',
		                    message: '注册成功'
                        });
                        this.$router.push('/login');
                    }else{
                       this.$message({
		                    type: 'error',
		                    message: '注册失败'
		                }); 
                    }
                    console.log(res.data.result);
                })
            }else{
                this.$message({
		            type: 'error',
		            message: '两次输入密码不一致'
		        });
            }
        }
    }
}
</script>

<style lang="less" scoped>
 @import '../static/style/mixin';
.form_contianer{
		.wh(320px, 280px);
		.ctp(320px, 280px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
}
.registerContainer{
    background-color: #324057;
    height: 100vh;
    width: 100vw;
}
.form-fade-enter-active, .form-fade-leave-active {
	transition: all 1s;
}
.form-fade-enter, .form-fade-leave-active {
	transform: translate3d(0, -50px, 0);
	opacity: 0;
}
</style>