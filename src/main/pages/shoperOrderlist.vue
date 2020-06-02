<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
				border
			    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
				:row-style="{height:'40px'}"
                :cell-style="{padding:'0px'}"
				:header-cell-style="{background:'#eef1f6',color:'#606266'}"
			    style="width: 100%">
			    <el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="用户名" >
			            <span>{{ props.row.user_name }}</span>
			          </el-form-item>
			          <el-form-item label="店铺名称">
			            <span>{{ props.row.shop_name }}</span>
			          </el-form-item>
			          <el-form-item label="收货地址">
			            <span>{{ props.row.location }}</span>
			          </el-form-item>
			          <el-form-item label="店铺 ID">
			            <span>{{ props.row.shop_num }}</span>
			          </el-form-item>
			          <el-form-item label="订单备注">
			            <span>{{ props.row.extra_info }}</span>
			          </el-form-item>
			        </el-form>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="订单 ID"
			      prop="order_id">
			    </el-table-column>
			    <el-table-column
			      label="总价格"
			      prop="total_price">
			    </el-table-column>

			    <el-table-column
			      label="订单状态"
			      prop="pay_state">
			    </el-table-column>

                <el-table-column
			      label="接受状态"
                  :formatter="stateFormat"
			      prop="accept_state">
			    </el-table-column>

                <el-table-column label="操作" width="160">
                  <template slot-scope="scope">
                    <el-button 
                      size="small"
                      type="danger"
                      @click="handleAccept(scope.row)">接受订单</el-button>
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
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop.vue'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
				currentPage: 1,
				pagesize:10,
                restaurant_id: null,
                expendRow: [],
            }
        },
    	components: {
    		headTop,
    	},
        created(){
        	this.restaurant_id = this.$route.query.restaurant_id;
            this.initData();
        },
        mounted(){

        },
        methods: {
            initData(){
                let a=this.$store.getters.getUser.shop_num;
                this.$ajax.post("shoperOrders",{shop_num:a}).then((res)=>{
                    // console.log(res.data.data);
					this.tableData=res.data.data;
					// console.log(this.tableData);
                })
            },
            payState(row1, column1){
                console.log('row:'+row1.pay_sate)
                if (row1.pay_sate ==="a") {
                    return '已支付'
                } else  {
                    return '未支付'
                } 
            },
            stateFormat(row, column){
                //  console.log('row:'+row.accept_state)
                if (row.accept_state == 1) {
                    return '已接单'
                } else  {
                    return '未接单'
                } 
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
            handleAccept(row){
                // console.log(row)
                if(row.accept_state==1){
                    this.$message.error('已经接受过此订单，请勿重复接受！');
                }else{
                    this.$ajax.post('acceptOrder',{order_id:row.order_id}).then((res)=>{
                        if (res.data.data === 1) {
                            this.$message({
                                type: 'success',
                                message: '接受订单成功'
                        });
                            this.initData();
                        }else{
                            this.$message({
                                type: 'error',
                                message: '接受订单失败'
                        });
                        }
                    })
                }
            }
        },
    }
</script>

<style lang="less">
	@import '../../../static/style/mixin.less';
    .table_container{
        padding: 20px;
    }
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
</style>
