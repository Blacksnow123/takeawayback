<template>
    <div>
        <head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="店铺名称" prop="shop_name">
						<el-input v-model="formData.shop_name"></el-input>
					</el-form-item>
					<el-form-item label="详细地址" prop="shop_place">
						<el-input
						  v-model="formData.shop_place"
                          placeholder="请输入地址"
                          style="width: 100%;"
                        ></el-input>
						<span>当前城市：{{this.city}}</span>
					</el-form-item>
					<el-form-item label="配送服务" prop="send_service">
						<el-input v-model.number="formData.send_service" maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="店铺分类" prop="shop_type">
						<el-select placeholder="请选择" v-model="formData.shop_type">
                            <el-option
                            v-for="item in categoryOptions"
                            :key="item.id"
                            :label="item.type_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
					</el-form-item>
					<el-form-item label="配送费" prop="distribution_price">
						<el-input-number v-model="formData.distribution_price" :min="0" :max="20"></el-input-number>
					</el-form-item>
					<el-form-item label="起送价" prop="sell_start">
						<el-input-number v-model="formData.sell_start" :min="0" :max="100"></el-input-number>
					</el-form-item>

					<el-form-item label="上传商铺图片">
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
						

					<el-form-item class="button_submit">
						<el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
					</el-form-item>
		        </el-form>
  			</el-col>
  		</el-row>
    </div>
</template>

<script>
	import headTop from '../components/headTop.vue'
	import BMap from "BMap";
    export default {
    	data(){
    		return {
				city: {},
    			formData: {
					shop_name: '', //店铺名称
					shop_place: '', //地址
					shop_type:'',//店铺类型
					send_service: '',
					distribution_price: 5, //运费
					sell_start: 20, //起价
       	 			shop_img: '',
		        },
		        rules: {
					name: [
						{ required: true, message: '请输入店铺名称', trigger: 'blur' },
					],
					address: [
						{ required: true, message: '请输入详细地址', trigger: 'blur' }
					],
					sendService: [
						{ required: true, message: '请输入配送服务', trigger: 'blur' }
					],
				},
			    categoryOptions: [],
				selectedCategory: ['快餐便当', '简餐'],
				imageUrl:''
    		}
    	},
    	components: {
    		headTop,
    	},
    	mounted(){
			this.ready();
    		this.initData();
    	},
    	methods: {
			//获取当前城市
            ready() {
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(
                    r => {
                    // console.log(r.address.city);
                    this.city = r.address.city;
                    },
                    { enableHighAccuracy: true }
                );
            },
    		initData(){

				this.$ajax.post('typerList').then((res)=>{
					this.categoryOptions=res.data.data;
					console.log(this.categoryOptions);
				}).catch(err=>{
					console.log(err);
				})
    			
    		},
    		querySearchAsync(queryString, cb) {
    			
		    },
		    addressSelect(address){
		    	this.formData.latitude = address.latitude;
		    	this.formData.longitude = address.longitude;
		    	console.log(this.formData.latitude, this.formData.longitude)
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
			tableRowClassName(row, index) {
		        if (index === 1) {
		        	return 'info-row';
		        } else if (index === 3) {
		        	return 'positive-row';
		        }
		        return '';
		    },
		    submitForm(formName) {
				
				this.$ajax.post('insertShop',{shop_type:this.formData.shop_type,
				shop_place:this.formData.shop_place,
				shop_name:this.formData.shop_name,
				shop_img:this.formData.shop_img,
				sell_start:this.formData.sell_start,
				send_service:this.formData.send_service,
				distribution_price:this.formData.distribution_price,
				shop_img:this.imageUrl
				}).then((res)=>{
					console.log(res.data);
					if (res.data.data === 1) {
						this.$message({
					        type: 'success',
					        message: '添加成功'
						});
					}else{
						this.$message({
					        type: 'error',
					        message: "添加失败"
					    });
					}
				})

				console.log(this.formData);
				// this.$refs[formName].validate(async (valid) => {
				// 	if (valid) {
				// 		Object.assign(this.formData, {activities: this.activities}, {
				// 			category: this.selectedCategory.join('/')
				// 		})
				// 		try{
				// 			let result = await addShop(this.formData);
				// 			if (result.status == 1) {
				// 				this.$message({
				// 	            	type: 'success',
				// 	            	message: '添加成功'
				// 	          	});
				// 	          	this.formData = {
				// 					name: '', //店铺名称
				// 					address: '', //地址
				// 					latitude: '',
				// 					longitude: '',
				// 					description: '', //介绍
				// 					phone: '',
				// 					promotion_info: '',
				// 					float_delivery_fee: 5, //运费
				// 					float_minimum_order_amount: 20, //起价
				// 					is_premium: true,
				// 					delivery_mode: true,
				// 					new: true,
				// 					bao: true,
				// 					zhun: true,
				// 					piao: true,
				// 					startTime: '',
				//        	 			endTime: '',
				//        	 			image_path: '',
				//        	 			business_license_image: '',
				//        	 			catering_service_license_image: '',
				// 		        };
				// 		        this.selectedCategory = ['快餐便当', '简餐'];
				// 		        this.activities = [{
				// 		        	icon_name: '减',
				// 		        	name: '满减优惠',
				// 		        	description: '满30减5，满60减8',
				// 			    }];
				// 			}else{
				// 				this.$message({
				// 	            	type: 'error',
				// 	            	message: result.message
				// 	          	});
				// 			}
				// 			console.log(result)
				// 		}catch(err){
				// 			console.log(err)
				// 		}
				// 	} else {
				// 		this.$notify.error({
				// 			title: '错误',
				// 			message: '请检查输入是否正确',
				// 			offset: 100
				// 		});
				// 		return false;
				// 	}
				// });
			},
		}
    }
</script>

<style lang="less">
	@import '../../../static/style/mixin.less';
	.button_submit{
		text-align: center;
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
	.el-table .info-row {
	    background: #c9e5f5;
	}

	.el-table .positive-row {
	    background: #e2f0e4;
	}
</style>
