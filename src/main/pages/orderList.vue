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

                this.$ajax.post("Orders").then((res)=>{
                    console.log(res.data.data);
					this.tableData=res.data.data;
					console.log(this.tableData);
                })
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
