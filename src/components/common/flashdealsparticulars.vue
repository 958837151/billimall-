<template>
    <div class="flashDeals">
        <div class="flashContiner">
            <div class="dealsBottom" @click="toProductdetails(list.goods_id)" v-for="(list,index) in dealsList0" :key="list.id" :class="{divLastMargin:index%5 == 4}"  v-show="isComings == 0">
                <div class="deals">
                    <div class="shade">
                        <img :src="list.url">
                        <div></div>
                    </div>
                    <div>
                        <p><span>ZAR {{list.priceNow}}</span></p>
                    </div>
                    <div>
                         <span>ZAR {{list.priceOld}} </span>
                        <span> {{list.off}}% OFF</span>
                    </div>
                    <div class="salesRatio">
                        <div  :style="{width:((100*sales_sum)/all_sum)+'%'}"></div>
                    </div>
                    <div class="sold">
                        <span>{{list.sold}} Sold</span>
                        <span><i class="el-icon-timer"></i></span>
                        <span>{{list.times}}</span>
                    </div>
                </div>
            </div>
            <div class="dealsBottom" @click="toProductdetails(list.goods_id)" v-for="(list,index) in dealsList1" :key="list.id" :class="{divLastMargin:index%5 == 4}" v-show="isComings == 1">
                <div class="deals">
                    <div class="shade">
                        <img :src="list.url">
                        <div></div>
                    </div>
                    <div>
                        <p><span>ZAR {{list.priceNow}}</span></p>
                    </div>
                    <div>
                         <span>ZAR {{list.priceOld}} </span>
                        <span> {{list.off}}% OFF</span>
                    </div>
                    <div class="salesRatio">
                        <div  :style="{width:((100*sales_sum)/all_sum)+'%'}"></div>
                    </div>
                    <div class="upComing">
                        <span>Starts in {{list.times}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    
    export default {
        name:"flashdealsparticulars",
        props:['isComings'],
        data(){
            return{
                dealsList0:[
                //    {url:require("@/assets/images/2.jpg"),priceNow:22.32,priceOld:35.68,off:67,sold:46,times:"04:52:30"},
                ],
                dealsList1:[],
                flashListdata:{},//闪购数据
                all_sum:1,//总数量
                sales_sum:1,//销售数量	
            }
        },
        created () {
            this.getflashDealsNow()
        },
        methods: {
            getTime(end){//时间戳转换
                var now = new Date()
                var end=end*1000
                var time=Math.floor((end-now)/1000)//转化单位为秒。
                var day=Math.floor(time/86400)//1天86400秒;
                var hour =Math.floor(time%86400/3600)//1小时3600秒；
                if(hour<10){
                    hour="0"+hour
                }
                var minute=Math.floor(time%3600/60)
                if(minute<10){
                    minute="0"+minute
                }
                var second=Math.floor(time%60)
                if(second<10){
                    second="0"+second
                }
                return hour +":"+ minute +":"+second
            },
            getflashDealsNow(){
                this.$store.dispatch('flashDealsNow/getflashDealsNow').then(()=>{//获取闪购
                    this.$nextTick(()=>{
                        this.flashListdata=this.$store.state.flashDealsNow.stateflashDealsNow
                        this.flashListdata.forEach(key => {
                            if(key.goodsList){
                                if (key.flashInfo.state==0) {//开始
                                    key.goodsList.forEach(item => {
                                        if(item){
                                            let endtime=this.getTime(this.flashListdata[0].flashInfo.end_time)
                                            this.dealsList0.push({url:item.imgUrl,priceNow:item.shop_price,priceOld:item.market_price,off:item.off,sold:item.sales_sum,goods_id:item.goods_id,id:item.id,times:endtime})
                                            this.all_sum=item.all_sum
                                            this.sales_sum=item.sales_sum
                                        }
                                    });
                                }else if (key.flashInfo.state==2) {//未开始
                                    key.goodsList.forEach(item => {
                                        if(item){
                                            let endtime=this.getTime(this.flashListdata[0].flashInfo.end_time)
                                            this.dealsList1.push({url:item.imgUrl,priceNow:item.shop_price,priceOld:item.market_price,off:item.off,sold:item.sales_sum,goods_id:item.goods_id,id:item.id,times:endtime})
                                            this.all_sum=item.all_sum
                                            this.sales_sum=item.sales_sum
                                        }
                                    });
                                }
                            }
                        });
                    })
                })
            },
            toProductdetails(goods_id){
                this.$router.push({ name: 'productdetails', params: { goods_id:goods_id }})
            },
        }
    }
</script>
<style lang="scss" scoped>
    .flashDeals{
        width: 1200px;
        margin-top: 20px;
        .flashContiner{
            overflow: hidden;
            .dealsBottom{
                float: left;
                margin-right: 15px;
                margin-top: 16px;
                width: 228px;
                height: 316px;
                background-color: #fff;
                border-radius: 6px;
                cursor: pointer;
                .deals{
                    width: 220px;
                    margin: 0 auto;
                    
                    img{
                        width: 100%;
                        border-radius: 3px;
                    }
                     div:nth-child(2){
                        overflow: hidden;
                        margin-top: 8px;
                        p{
                            float: left;
                            color: #333;
                            font-size: 14px;
                            font-weight: bold;
                        }
                    }
                    div:nth-child(3){
                        font-size: 12px;
                        color: #999;
                        text-align: left;
                        margin-top: 8px;
                        span:first-child{
                            text-decoration: line-through;
                            padding-right: 6px;
                            border-right: 1px solid #DEDEDE;
                        }
                        span:last-child{
                            margin-left: 6px;
                        }
                    }
                    div:nth-child(4){
                        background-color: #FAFAFA;
                        height: 10px;
                        margin-top: 8px;
                        div{
                            width: 28%;
                            height: 10px;
                            border-radius: 5px;
                            background: linear-gradient(left, #FBD2B0, #FF7805);
                        }
                    }
                    .sold{
                        text-align: left;
                        margin-top: 6px;
                        span{
                            font-size: 12px;
                            color: #666;
                        }
                        span:nth-child(2){
                            margin-left: 112px;
                            margin-right: 4px;
                        }
                    }
                    .upComing{
                        color: #B4CC06;
                        font-size: 12px;
                        text-align: left;
                        margin-top: 5px;
                    }
                    .shade{
                        position: relative;
                        img{
                            display: block;
                            width: 220px;
                            height: 220px;
                        }
                    }
                    .shade:hover{
                        div{
                            display: block;
                        }
                    }
                    .shade div{
                        display: none;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: #dedede;
                        opacity: 0.2;
                        cursor: pointer;
                    }
                }
            }
            .divLastMargin{
                margin-right: 0;
            }
        }
    }

</style>