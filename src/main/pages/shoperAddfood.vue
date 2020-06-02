<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
  				<header class="form_header">选择食品种类</header>
	  			<el-form :model="categoryForm" ref="categoryForm" label-width="110px" class="form">
		  			<el-row class="category_select">
		  				<el-form-item label="食品种类">
			  				<el-select v-model="value" :placeholder="selectValue.label" style="width:100%;">
							    <el-option
							      	v-for="item in categoryForm.categoryList"
							      	:key="item.id"
							      	:label="item.name"
							      	:value="item.id">
							    </el-option>
						  	</el-select>
						</el-form-item>
					</el-row>
					<el-row class="add_category_row" :class="showAddCategory? 'showEdit': ''">
						<div class="add_category">
							<el-form-item label="食品种类" prop="name">
								<el-input v-model="categoryForm.name"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="submitcategoryForm(categoryForm)">提交</el-button>
							</el-form-item>
						</div>
					</el-row>
					<div class="add_category_button" @click="addCategoryFun">
						<i class="el-icon-caret-top edit_icon" v-if="showAddCategory"></i>
						<i class="el-icon-caret-bottom edit_icon" v-else slot="icon"></i>
						<span>添加食品种类</span>
					</div>
	  			</el-form>
	  			<header class="form_header">添加食品</header>
	  			<el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form">
	  				<el-form-item label="食品名称" prop="name">
						<el-input v-model="foodForm.name"></el-input>
					</el-form-item>
					<el-form-item label="食品描述" prop="description">
						<el-input v-model="foodForm.description"></el-input>
					</el-form-item>
					<el-row >
						<el-form-item label="价格">
							<el-input-number v-model="foodForm.price" :min="0" :max="10000"></el-input-number>
						</el-form-item>
					</el-row>

					<el-form-item label="上传食品图片">
						<el-upload
                            class="avatar-uploader"
                            action="http://localhost:8080/uploadimage"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" :disabled="existed==false" @click="addFood(foodForm)">确认添加食品</el-button>
					</el-form-item>
	  			</el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
 	import headTop from '../components/headTop.vue'
    export default {
    	data(){
    		return {
				value:'',
				restaurant_id: 1,
				inputName:'',
    			categoryForm: {
    				categoryList: [],
    				categorySelect: '',
    				name: '',
    			},
    			foodForm: {
    				name: '',
    				description: '',
			        price: 20,
    			},
    			foodrules: {
    				name: [
						{ required: true, message: '请输入食品名称', trigger: 'blur' },
					],
    			},
    			showAddCategory: false,
				dialogFormVisible: false,
                imageUrl:'',
                existed:true
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){
            if(this.$store.getters.getUser.shop_num==null||this.$store.getters.getUser.shop_num==""){
                this.$message.error('您未用拥有店铺，请添加！');
                this.existed=false;
            }else{
                this.restaurant_id=this.$store.getters.getUser.shop_num;
                this.existed=true;
            }
            // console.log(this.restaurant_id)
    		this.initData();
    	},
    	computed: {
    		selectValue: function (){
    			return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
    		}
    	},
    	methods: {
    		initData(){
				// console.log(this.restaurant_id)
				this.$ajax.post('leftnames',{shop_num:this.restaurant_id}).then((res)=>{
					console.log(res.data.data);
					this.categoryForm.categoryList=res.data.data
				})
    		},
		    addCategoryFun(){
		    	this.showAddCategory = !this.showAddCategory;
		    },
		    submitcategoryForm(categoryForm) {

				let name= eval(categoryForm).name;

				let shop_num =this.restaurant_id;
				
				this.$ajax.post('insertName',{shop_num:shop_num,name:name}).then((res)=>{
					console.log(res);
					if (res.data.data === 1) {
						this.initData();
						this.categoryForm.name = '';
						this.showAddCategory = false;
						this.$message({
					        type: 'success',
					        	message: '添加成功'
					        });
					}else{
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				})
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
		    addFood(foodForm){

				console.log(foodForm)
				console.log(this.value)

				this.$ajax.post('insertFood',{shop_num:this.restaurant_id,
				food_name:foodForm.name,
				food_price:foodForm.price,
				left_name_id:this.value,
				food_img:this.imageUrl,
				food_extra:foodForm.description}).then((res)=>{
					console.log(res.data.data);
					if (res.data.data === 1) {
						this.$message({
					        type: 'success',
					        message: '添加成功'
							});
						}else{
							this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
						}
				})
		    }
		}
    }
</script>

<style lang="less">
	@import '../../../static/style/mixin.less';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.food_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
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
	.cell{
		text-align: center;
	}
</style>
