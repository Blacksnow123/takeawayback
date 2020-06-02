<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">数据统计</header>
            <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{this.userCount}}</span> 注册用户</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{this.orderCount}}</span> 订单</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{this.adminCount}}</span> 管理员</div></el-col>
            </el-row>
		</section>
		<tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
    </div>
</template>

<script>
	import headTop from '../components/headTop.vue'
	import tendency from '../components/tendency.vue' 
	import dtime from 'time-formater'
    export default {
    	data(){
    		return {
    			sevenDay: [],
				sevenDate: [[],[],[]],
				orderCount:[],
				userCount:[],
				adminCount:[],
				orders:[]
    		}
    	},
    	components: {
    		headTop,
    		tendency,
    	},
    	created(){
    		this.initData();
    		for (let i = 6; i > -1; i--) {
				const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
				// console.log(date)
    			this.sevenDay.push(date)
    		}
    		
		},
		
        computed: {

        },
    	methods: {
    		initData(){
				var a=this.$ajax.post("Orders");
				var b=this.$ajax.post("userCount");
				var c=this.$ajax.post("adminCount");

				this.$ajax.all([a,b,c]).then(this.$ajax.spread((res1,res2,res3)=>{
					this.orders=eval(res1.data.data);
					// console.log(this.orders);
					this.orderCount=eval(res1.data.data).length;
					this.userCount=res2.data.data;
					this.adminCount=res3.data.data;
					this.getSevenData();
				})).catch(err=>{
					console.log(err);
				})
			},
    		getSevenData(){
				const apiArr = [[],[],[]];
				let arr=[0,0,0,0,0,0,0];  
				this.sevenDay.forEach((day,index)=>{
					eval(this.orders).forEach((order)=>{
					let a=order.order_time;
					let data=dtime(order.order_time).format('YYYY-MM-DD');
					if(data==day){
						arr[index]++;
						
					}
				})
				})
				this.sevenDate=arr;
				console.log(this.sevenDate);
    		}
    	}
	}
</script>

<style lang="less">
	@import '../../../static/style/mixin.less';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
