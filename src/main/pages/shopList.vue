<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table 
                :row-style="{height:'40px'}"
                :cell-style="{padding:'0px'}"
                border
                :data="shops.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="店铺名称">
                        <span>{{ props.row.shop_name }}</span>
                      </el-form-item>
                      <el-form-item label="店铺地址">
                        <span>{{ props.row.shop_place }}</span>
                      </el-form-item>
                      <el-form-item label="店铺 ID">
                        <span>{{ props.row.shop_num }}</span>
                      </el-form-item>
                      <el-form-item label="评分">
                        <span>{{ props.row.shop_score }}</span>
                      </el-form-item>
                      <el-form-item label="销售量">
                        <span>{{ props.row.sell_count }}</span>
                      </el-form-item>
                      <el-form-item label="分类">
                        <span>{{ props.row.type_name }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="店铺名称"
                  prop="shop_name">
                </el-table-column>
                <el-table-column
                  label="店铺地址"
                  prop="shop_place">
                </el-table-column>
                <el-table-column
                  label="店铺评分"
                  prop="shop_score">
                </el-table-column>
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="Success"
                      @click="addFood(scope.$index, scope.row)">添加</el-button>
                    <el-button
                      size="mini"
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
                :total="shops.length">
                </el-pagination>
            </div>
            <el-dialog
                title="修改店铺信息"
                :visible.sync="dialogFormVisible"
                width="60%">

                <el-form :model="selectTable">
                    <el-form-item label="店铺名称" label-width="100px">
                        <el-input v-model="selectTable.shop_name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" label-width="100px">
                        <el-input
                          v-model="address"
                          placeholder="请输入地址"
                          style="width: 100%;"
                        ></el-input>
                        <span>当前城市：{{this.city}}</span>
                    </el-form-item>
                    <el-form-item label="店铺分类" label-width="100px">
                        <el-select v-model="value" :placeholder="this.selectTable.type_name">
                            <el-option
                            v-for="item in categoryOptions"
                            :key="item.id"
                            :label="item.type_name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item label="商铺图片" label-width="100px">
                        <el-upload
                            class="avatar-uploader"
                            action="http://localhost:8080/uploadimage"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="selectTable.shop_img" :src="selectTable.shop_img" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                 </el-form> 
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateShop">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop.vue'
    import BMap from "BMap";
    export default {
        data(){
            return {
                city: {},
                offset: 0,
                limit: 1,
                count: 0,
                tableData: [],
                currentPage: 1,
                selectTable: {},
                pagesize:10,
                dialogFormVisible: false,
                categoryOptions: [],
                selectedCategory: [],
                address: {},
                shops:[],
                value:'',
                imageUrl:''
            }
        },
        created(){
            this.initData();
            this.ready();
        },
    	components: {
    		headTop,
    	},
        methods: {
            initData(){
                var a1=this.$ajax.post('allshops',{role_flag:'2'});
                var a2=this.$ajax.post('typerList');
                
                this.$ajax.all([a1,a2]).then(this.$ajax.spread((res1,res2)=>{
                    this.shops=res1.data.data;
                    console.log(this.shops);
                    this.count=eval(res1.data.data).length;
                    this.categoryOptions=res2.data.data;
				})).catch(err=>{
					console.log(err);
				})
            },
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
             // 初始页currentPage、初始每页数据数pagesize和数据data
			handleSizeChange: function (size) {
					this.pagesize = size;
					console.log(this.pagesize)  //每页下拉显示数据
			},
			handleCurrentChange: function(currentPage){
					this.currentPage = currentPage;
					console.log(this.currentPage)  //点击第几页
			},
            handleEdit(index, row) {
                // console.log(index);
                // console.log(row);
                this.selectTable = row;
                this.address = row.shop_place;
                this.dialogFormVisible = true;
                // this.value = row.type_name.split('/');
            },
            handleAvatarSuccess(res, file) {
                if (res.code === 0) {
                    this.selectTable.shop_img = "http://localhost:8080"+res.data.src;
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
            addFood(index, row){
                this.$router.push({ path: 'addGoods', query: { restaurant_id: row.shop_num }})
            },
            handleDelete(index, row) {
                let a=row.id;
                this.$ajax.post('deleteShop',{id:a,shop_num:row.shop_num}).then((res)=>{
                    // console.log(res.data.data);
                    if (res.data.result == 0) {
                    this.$message({
                        type: 'success',
                        message: '删除店铺信息成功'
                    });
                    this.initData();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                });
            },
            updateShop(){
                this.dialogFormVisible = false;
                console.log(this.value);
                this.imageUrl=this.selectTable.shop_img;
                this.$ajax.post('updateShop',{id:this.selectTable.id,shop_name:this.selectTable.shop_name,shop_place:this.address,shop_type:this.value,shop_img:this.imageUrl}).then((res)=>{
                    // console.log(res.data.data);
                    if (res.data.result == 0) {
                    this.$message({
                        type: 'success',
                        message: '更新店铺信息成功'
                    });
                    this.initData();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                });
            },
        },
    }
</script>

<style lang="less" scoped>
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
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-scrollbar__view ,.el-select-dropdown__list{
      background-color: white !important;
  }
</style>
