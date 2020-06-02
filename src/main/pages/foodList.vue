<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                border
                :row-style="{height:'40px'}"
                :cell-style="{padding:'0px'}"
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                style="width: 100%;">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="食品名称">
                        <span>{{ props.row.food_name }}</span>
                      </el-form-item>
                      <el-form-item label="餐馆名称">
                        <span>{{ props.row.shop_name }}</span>
                      </el-form-item>
                      <el-form-item label="食品 ID">
                        <span>{{ props.row.food_id }}</span>
                      </el-form-item>
                      <el-form-item label="餐馆 ID">
                        <span>{{ props.row.shop_num }}</span>
                      </el-form-item>
                      <el-form-item label="餐馆地址">
                        <span>{{ props.row.shop_place }}</span>
                      </el-form-item>
                      <el-form-item label="食品评分">
                        <span>{{ props.row.taste_score }}</span>
                      </el-form-item>
                      <el-form-item label="食品分类">
                        <span>{{ props.row.left_name }}</span>
                      </el-form-item>
                      <!-- <el-form-item label="月销量">
                        <span>{{ props.row.sell_count }}</span>
                      </el-form-item> -->
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="食品名称"
                  prop="food_name">
                </el-table-column>
                <el-table-column
                  label="评分"
                  prop="taste_score">
                </el-table-column>
                <el-table-column label="操作" width="160">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="tableData.length">
                </el-pagination>
            </div>
            <el-dialog
                title="修改食品信息"
                :visible.sync="dialogFormVisible"
                width="60%">
                <el-form :model="selectTable">
                    <el-form-item label="食品名称" label-width="100px">
                        <el-input v-model="selectTable.food_name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="食品分类" label-width="100px">
	                    <el-select v-model="value" :placeholder="selectTable.left_name" @change="handleSelect">
						    <el-option
						      v-for="item in menuOptions"
						      :key="item.id"
						      :label="item.name"
						      :value="item.id">
						    </el-option>
						</el-select>
                    </el-form-item>

                     <el-form-item label="食品图片" label-width="100px">
                        <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8080/uploadimage"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="selectTable.food_img" :src="selectTable.food_img" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateFood">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop.vue'

    export default {
        data(){
            return {
                // baseUrl,
                // baseImgPath,
                restaurant_id: null,
                city: {},
                currentPage: 1,
				pagesize:10,
                offset: 0,
                limit: 20,
                count: 0,
                tableData: [],
                selectTable: {},
                dialogFormVisible: false,
                menuOptions: [],
                selectMenu: {},
                selectIndex: null,
                specsForm: {
		          	specs: '',
		          	packing_fee: 0,
		          	price: 20,
		        },
                specsFormrules: {
		        	specs: [
						{ required: true, message: '请输入规格', trigger: 'blur' },
					],
		        },
		        specsFormVisible: false,
                expendRow: [],
                value:'',
                imageUrl:''
            }
        },
        created(){
        	this.restaurant_id = this.$route.query.restaurant_id;
            this.initData();
        },
        computed: {
        	specs: function (){
        		let specs = [];
        		if (this.selectTable.specfoods) {
	        		this.selectTable.specfoods.forEach(item => {
	        			specs.push({
	        				specs: item.specs_name,
	        				packing_fee: item.packing_fee,
	        				price: item.price,
	        			})
	        		})
        		}
        		return specs
        	}
        },
    	components: {
    		headTop,
    	},
        methods: {
            initData(){
                this.$ajax.post('allFoods').then((res)=>{
                    	this.tableData=res.data.data;
                        this.count=eval(res.data.data).length;
                })               
            },
            handleEdit(row) {
                console.log(row);
                this.selectTable=row;
                let a =eval(row).shop_num;
                console.log(a);
                this.$ajax.post('leftnames',{shop_num:a}).then((res)=>{
                    console.log(res.data.data);
                    this.menuOptions=res.data.data;
                })
            	// this.getSelectItemData(row, 'edit')
                this.dialogFormVisible = true;
            },
            handleSelect(index){
                // console.log(index);
            	this.selectIndex = index;
            	this.selectMenu = this.menuOptions[index];
            },
            handleDelete(index, row) {
                console.log(row.food_id)
                this.$ajax.post('deleteFood',{food_id:row.food_id}).then(((res)=>{
                    console.log(res.data.data);
                    if (res.data.data === 1) {
                        this.$message({
                            type: 'success',
                            message: '删除食品信息成功'
                        });
                        this.initData();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }))
            },
             // 初始页currentPage、初始每页数据数pagesize和数据data
			handleSizeChange: function (size) {
					this.pagesize = size;
					console.log(this.pagesize)  //每页下拉显示数据
			},
			handleCurrentChange: function(currentPage){
					this.currentPage = currentPage;
					console.log(this.currentPage)  //点击第几页
			},
            handleAvatarSuccess(res, file) {
                if (res.code === 0) {
                    this.selectTable.food_img = "http://localhost:8080"+res.data.src;
                    this.imageUrl="http://localhost:8080"+res.data.src;
                }else{
                    this.$message.error('上传图片失败！');
                }
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
            
            updateFood(){
                this.dialogFormVisible = false;
                console.log(this.value)
                this.$ajax.post('updateFood',{food_id:this.selectTable.food_id,food_name:this.selectTable.food_name,left_name_id:this.value,food_img:this.imageUrl}).then(((res)=>{
                    console.log(res.data.data);
                    if (res.data.data === 1) {
                        this.$message({
                            type: 'success',
                            message: '更新食品信息成功'
                        });
                        this.initData();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }))
            },
        },
    }
</script>

<style lang="less">
	@import '../../../static/style/mixin.less';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
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
</style>
