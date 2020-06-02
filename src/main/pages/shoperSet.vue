<template>
    <div class="fillcontain">
        <head-top></head-top>
        <header class="admin_title">商家信息</header>
        <div class="admin_set">
            <ul class="info">
                <li>
                    <span>姓名：</span><span>{{this.user.user_name}}</span>
                </li>
                <li>
                    <span>管理员权限：</span><span>{{this.user.role_flag==2?'商家':'管理员'}}</span>
                </li>
                <li>
                    <span>商家 ID：</span><span>{{this.user.id}}</span>
                </li>
                <li>
                    <span>更换头像：</span>
                    <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8080/uploadimage"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                </li> 
                <el-button type="primary" style="width:140px;" @click="updateShop">确 定</el-button>   
            </ul>
        </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop.vue'

    export default {
        data(){
            return {
                imageUrl:'',
                user:[]
            }
        },
        created(){
            this.user =this.$store.getters.getUser;
            this.imageUrl=user.shop_img;
        },
    	components: {
    		headTop,
    	},
        computed: {
        },
        methods: {
            updateShop(){
                this.$ajax.post('updateShop',{id:this.this.user.id,shop_img:this.imageUrl}).then((res)=>{
                    // console.log(res.data.data);
                    if (res.data.result == 0) {
                    this.$message({
                        type: 'success',
                        message: '更新头像成功'
                    });
                    this.initData();
                    }else{
                        this.$message({
                            type: 'error',
                            message: '更新头像失败'
                        });
                    }
                });
            },
            handleAvatarSuccess(res, file) {
        		this.imageUrl = "http://localhost:8080"+res.data.src;
      		},
      		beforeAvatarUpload(file) {
        		const isJPG = file.type === 'image/jpeg';
        		const isLt2M = file.size / 1024 / 1024 < 2;

        		if (!isJPG) {
          			this.$message.error('上传头像图片只能是 JPG 格式!');
        		}
        		if (!isLt2M) {
          			this.$message.error('上传头像图片大小不能超过 2MB!');
        		}
        		return isJPG && isLt2M;
      		},
        },
    }
</script>
scoped
<style lang="less" scoped>
	@import '../../../static/style/mixin.less';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
    .admin_set{
        width: 60%;
        background-color: #F9FAFC;
        min-height: 400px;
        margin: 20px auto 0;
        border-radius: 10px;
        ul > li{
            padding: 20px;
            span{
                color: #666;
            }
        }
    }
    .admin_title{
        margin-top: 20px;
        .sc(24px, #666);
        text-align: center;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        margin-top: 10px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .info{
        background-color:  #F5F5F5 !important;
        text-align: center;
    }
    
</style>
