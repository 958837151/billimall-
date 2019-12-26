<template>
<!-- 心愿单列表页面 -->
    <div class="wish-list">
        <div class="wish-title">Wish List</div>
        <div class="wish-list" v-for="(item,index) in list" :key="index">
            <div class="list-items">
                <div class="items-img" @click="toProductdetails(item.goods_id)">
                    <img :src="item.imgUrl" alt="" style="width: 160px;height: 160px;display: block;cursor: pointer;">
                </div>
                <div class="items-says">
                    <div class="items-content" @click="toProductdetails(item.goods_id)" style="cursor: pointer;">{{ item.goods_name }}</div>
                    <div class="item-price">
                        <span>R {{ item.shop_price }}</span>
                        <span>/ piece</span>
                        <!-- <span>3 days left</span> -->
                    </div>
                    <div>
                        <span style="color:#999;text-decoration:line-through">R {{ item.market_price }}</span>
                    </div>
                    <div>
                        <div class="img-star" style="margin-bottom: 14px;">
                            <el-rate v-model="item.comment.high_rate" disabled disabled-void-color="#ccc"></el-rate>
                            <div style="color:#666">
                                <span style="margin-right:8px;">({{ item.comment.total_sum }})</span>
                                <span>Orders(1526)</span>
                            </div>
                        </div>
                    </div>
                    <div  class="add-cart">
                        <span @click="toProductdetails(item.goods_id)">To Shop</span>
                    </div>
                </div>
                <div class="time-removes">
                    <div>Added {{ item.add_date }}</div>
                    <div>
                        <span @click="removeWish(item)">Remove</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div> -->
            <div class="pagimg" v-if="this.list.length>0">
                <el-pagination id="pagesComment" :background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="5" layout="prev, pager, next, jumper" :total="countNum"></el-pagination>
            <!-- </div> -->
        </div>
    </div>
</template>
<script>
import api from '@/api'
export default {
    data(){
        return{
            starVal:4,
            currentPage: 1,
            showReviews:100,
            countNum:0,//总条数
            countPage:0,//总页数
            nowPage:1,//当前页
            list:[],//数据
            month:["January","February","March","April","May","June","July","August","September","October","November","December"],//12月份
            user_id:"",
            perPage:5,//每页几条
            page:1,//当前页
        }
    },
    created() {
        if (localStorage.getItem("userdata")) {
            let userdata=JSON.parse(localStorage.getItem("userdata"))
            this.user_id=userdata.user_id
        }else{
            router.replace({ name: 'login', params: { islogin:"signin" }})
        }
        this.getgoodsCollectVal()
    },
    methods:{
        formatDate(now) { 
            var now=new Date(now*1000);
            var year=now.getFullYear(); 
            var m=now.getMonth(); 
            var date=now.getDate(); 
            return date+" "+this.month[m]+" "+year
        }, 
        getgoodsCollectVal(){
            this.getgoodsCollect().then((data)=>{
                console.log(data);
                this.list=[]
                this.countNum=data.page.countNum*1
                this.list=data.list
                if (this.list) {
                    this.list.forEach(item => {
                        item.add_date=this.formatDate(item.add_date)
                    });
                }
            })
        },
        getgoodsCollect(){//收藏接口
            let params = {
                "user_id":this.user_id,
                "perPage":this.perPage,
                "page":this.page
            }
            return new Promise((resolve)=>{
                this.axios.post(api.goodsCollect, params)
                    .then(res => {
                        if (res.data.code==200) {
                            let data=res.data.data
                            resolve(data)
                        }
                        else if (res.data.code==401) {
                            this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                        }
                    })
            })
        },
        getcancelGoodsCollect(item){//用户取消收藏
            let params = {
                "type":0,
                "goods_id":item.goods_id,
            }
            this.axios.post(api.cancelGoodsCollect, params)
                .then(res => {
                    if(res.data.code==200){
                        this.page=1
                        this.getgoodsCollectVal()
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                    }
                })
        },
        removeWish(item){
            this.getcancelGoodsCollect(item)
        },
        getcartVal(){//获取购物车数据
            this.getcart().then((data)=>{
                let cartNum=0
                if (data.cartlist.length>0) {
                    data.cartlist.forEach(item => {
                        item.userQuabity=item.goods_num*1
                        cartNum=cartNum+item.goods_num*1
                    });
                }
                this.$store.commit("shopingcarnum",cartNum)
            })
        },
        getcart(){
            let params = {
            }
            return new Promise((resolve)=>{
                this.axios.post(api.cart, params)
                    .then(res => {
                        if (res.data.code==200) {
                            let data=res.data.data
                            resolve(data)
                        }
                        else if (res.data.code==401) {
                            this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                        }
                    })
            })
        },
        addCat(item){
            let params = {
                goods_id:item.goods_id,
                goods_num:1,
                attrsku:""
            }
            this.axios.post(api.addCart, params)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getcartVal()
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                    else{
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.page=val
            this.getgoodsCollectVal()
        },
        toProductdetails(data){
            this.$router.push({ name: 'productdetails', params: { "goods_id":data }})
        },
    }
}
</script>
<style lang="scss" scoped>
   .wish-list{
       color: #333;
        text-align: left;
        background: #FAFAFA;
        .wish-title{
           font-size: 18px;
           font-weight: bold;
           background: #FAFAFA;
           margin-bottom: 16px;
        }
        .wish-list{
            .list-items{
                padding: 12px 0 14px 12px;
                background-color: #fff;
                overflow: hidden;
                border-bottom: 1px solid #FAFAFA;
                border-radius: 4px;
                .items-img{
                    float: left;
                    width: 160px;
                    img{
                        width: 100%;
                    }
                }
                .items-says{
                    width: 536px;
                    float: left;
                    text-align: left;
                    font-size: 12px;
                    margin-left: 16px;
                    .items-content{
                        height: 40px;
                        line-height: 20px;
                        overflow: hidden;
                        margin-bottom: 12px;
                    }
                    .item-price{
                        margin-bottom: 4px;
                        span:nth-child(1){
                            color:#FF7900;
                            font-size:14px;
                            font-weight:bold;
                        }
                        span:nth-child(2){
                            color:#666;
                            margin-left: 6px;
                        }
                        span:nth-child(3){
                            display: inline-block;
                            width: 86px;
                            height: 20px;
                            text-align: center;
                            line-height: 20px;
                            color: #FF7805;
                            border: 1px solid #FF7805;
                            border-radius: 10px;
                            margin-left: 24px;
                        }
                    }
                     .img-star{
                        display: flex;
                        margin-top: 15px;
                        .el-rate{
                            margin: 0;
                            flex: 0 0 66px;
                            line-height: 1;
                            & /deep/ .el-rate__icon{
                                margin: 0;
                                font-size: 12px;
                            }
                        }
                    }
                    .add-cart{
                        color: #1974A1;
                        span{
                            display: inline-block;
                            width: 66px;
                            height: 20px;
                            line-height: 20px;
                            cursor: pointer;
                            text-align: center;
                        }
                    }
                }
                .time-removes{
                    float: left;
                    font-size: 12px;
                    text-align: right;
                    margin-left: 30px;
                    div:first-child{
                        color: #999;
                        margin-bottom: 16px;
                    }
                    div:nth-child(2){
                        color: #1974A1;
                        cursor: pointer;
                    }
                }
            }
            
        }
        .pagimg{
              margin-top: 24px;
            overflow: hidden;
            padding-bottom: 20px;
            background-color: #FAFAFA;
        }
        #pagesComment{
            float: right;
        }
        #pagesComment /deep/ .active{
            background-color: #FEB610;
        }
        #pagesComment /deep/ li{
            width: 32px;
            height: 32px;
            line-height: 32px;
        }
        #pagesComment /deep/ .btn-prev ,#pagesComment /deep/ .btn-next{
            width: 32px;
            height: 32px;
            line-height: 32px;
        }
        #pagesComment /deep/ .el-input__inner{
            width: 50px;
            height: 32px;
            line-height: 32px;
        }
   }
</style>
