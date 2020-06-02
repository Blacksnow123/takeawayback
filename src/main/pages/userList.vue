<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                border:none
                :row-style="{height:'40px'}"
                :cell-style="{padding:'0px'}"
                :data="users.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="#"
                  width="100">
                </el-table-column>
                <el-table-column
                  property="id"
                  label="用户id"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="user_name"
                  label="用户姓名"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="email"
                  label="邮箱">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="users.length">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop.vue'
    // import {getUserList, getUserCount} from '@/api/getData'
    export default {
        data(){
            return {
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                pagesize:10,
                users:[
                    {
                  id: '',
                  user_name: '',
                  email: ''
                }
                ]
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            initData(){
                this.$ajax.post('allUsers',{role_flag:'1'}).then((res)=>{
                    this.users=res.data.data;
                    this.count=eval(res.data.data).length;
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
</style>
