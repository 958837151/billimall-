<template>
    <div class="order-details">
        <div class="pay" v-if="showPay">
            <Pay :orderData="orderData"></Pay>
        </div>
        <div class="bcg_div" v-if="showPay"></div>
        <HeaderHtml></HeaderHtml>
        <Search :fixedMsg="searchBarFixed" :homedata='homedata'></Search>
        <div class="details-container">
            <div class="navigation">
                <span @click="toHome"> My BilliMall</span> ><span @click="toMyorders"> Order List</span> ><span style="font-weight:bold;"> Order Detail </span>
            </div>
            <div class="order-id">
                <div>
                    <span class="text-r">Order ID</span>
                    <span>{{ orderDetailData.order_id }}</span>
                </div>
                <div>
                    <span class="text-r">Status</span>
                    <span class="finishedBlue" style="color: #666666;" v-if="orderDetailData.order_status == 5">Closed</span>
                    <span class="finishedBlue" style="color: #367202;" v-else-if="orderDetailData.order_status == 0">Cancle Order</span>
                    <span class="finishedBlue" style="color: #1B5EC9;" v-else-if="orderDetailData.order_status == 1">Processing</span>
                    <span class="finishedBlue" style="color: #FF7805;" v-else-if="orderDetailData.order_status == 2">Shipped</span>
                    <span class="finishedBlue" style="color: ##333333;" v-else-if="orderDetailData.order_status == 3||orderDetailData.order_status == 4">Finished</span>
                </div>
                <div>
                    <span class="text-r">Reminder</span>
                    <span>{{ orderDetailData.txt }}</span>
                    <!-- <span v-if="orderDetailData.order_status == 5">{{ orderDetailData.txt }}</span> -->
                </div>
                <div class="click-btn">
                    <span style="border:1px solid #DEDEDE;background:#F5F5F5;color:#333;" v-if="orderDetailData.order_status == 5" @click="addCat()">Add To Card</span>
                    <span @click="payNow" v-else-if="orderDetailData.order_status == 0">Pay Now</span>
                    <span v-else-if="orderDetailData.order_status == 2" @click="open">Confirm Order Received</span>
                    <span @click="tofeedback" v-else-if="orderDetailData.order_status == 3">Leave Feedback</span>
                    <span style="border:1px solid #DEDEDE;background:#F5F5F5;color:#333;margin-left:0;" v-if="orderDetailData.order_status == 0" @click="closeOrderPopup">Cancle Order</span>
                </div>
                <div class="popContainer" v-show="popIsShow">
                    <div class="popContent">
                        <div>Payment</div>
                        <div>
                            <el-radio-group v-model="radio">
                                <el-radio :label="0"><span></span></el-radio>
                                <!-- <el-radio :label="6">备选项</el-radio>
                                <el-radio :label="9">备选项</el-radio> -->
                            </el-radio-group>
                            <img src="@/assets/images/visa.png" alt="">
                            <img src="@/assets/images/twoyuan.png" alt="">
                            <img src="@/assets/images/jcb.png" alt="">
                            <img src="@/assets/images/disc.png" alt="">
                        </div>
                        <div>
                            <p>Card number</p>
                            <p>
                                <input type="text" maxlength="16" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
                            </p>
                            <p>
                                <span>Expiry date</span>
                                <span>Security code</span>
                            </p>
                            <p>
                                <input type="text" maxlength="2" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" placeholder="MM"> /
                                <input type="text" maxlength="4" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" placeholder="YY">
                                <input type="text" maxlength="4" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
                            </p>
                            <p>
                                Gardholder name
                            </p>
                            <p>
                                <input type="text">
                                <input type="text">
                            </p>
                        </div>
                        <div>
                            <span>DONE</span>
                            <span @click="popShow">Cancel</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-details">
                <div class="ueser-address">
                    <p>
                        <span><i class="icon-yonghu1 iconfont"></i></span>
                        <span style="font-weight:bold;margin-left:6px;">name,</span>
                        <span>{{ orderDetailData.consignee }}</span>
                    </p>
                    <p>
                        <span><i class="icon-04 iconfont"></i></span>
                        <span style="margin-left:6px;">{{ orderDetailData.province }}</span>
                        <br>
                        <span style=" margin-left: 20px;">{{ orderDetailData.city }}</span>
                        <br>
                        <span style=" margin-left: 20px;">{{ orderDetailData.address }},{{ orderDetailData.ainfo }}</span>
                    </p>
                </div>
                <div class="product-time" v-if="orderDetailData.order_status == 2||orderDetailData.order_status == 3||orderDetailData.order_status == 4">
                    <div class="time-title">Tracking information</div>
                    <div class="time-line">
                        <el-timeline>
                            <el-timeline-item
                            placement="top"
                            v-for="(activity, index) in activities"
                            :key="index"
                            :icon="activity.icon"
                            :type="activity.type"
                            :color="activity.color"
                            :class="{fontColor:index==0}"
                            :size="activity.size"
                            :timestamp="activity.displaytime">
                            {{activity.content}}
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                    <div class="show-all" @click="showAll">
                        <div>
                            <span>
                                <i class="el-icon-arrow-down" v-if="current==0"></i>
                                <i class="el-icon-arrow-up" v-else></i>
                            </span>
                            <span v-if="current==0">Show All</span>
                            <span v-else>pack up</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-details">
                <div class="product-title">
                    <div>Product Details</div>
                    <div>
                        <span><i class="el-icon-service"></i> </span>
                        <span> Contact Us</span>
                    </div>
                    <div>Price Per Unit</div>
                    <div>Quantity</div>
                    <div>Order Total</div>
                    <div>Status</div>
                </div>
                <div class="product-container">
                    <div class="product-list">
                        <div class="for-container" v-for="(item, index) in orderDetailData.goodslist" :key="index">
                            <div class="list">
                                <div class="order-img">
                                    <div>
                                        <img :src="item.imgUrl" style="width: 62px;height: 62px;display: block;">
                                    </div>
                                    <div>
                                        <p>{{ item.goods_name }}</p>
                                        <p>
                                            <span style="color:#666;">{{ item.spec_key_name }}</span>
                                            <!-- <span style="color:#666;margin-right:4px;">Black</span>
                                            <img src="@/assets/images/2.jpg" style="width:20px;border-radius:2px;vertical-align: middle;">
                                            <span style="color:#666;margin-left:26px;">Size:</span>
                                            <span style="color:#666;">S</span> -->
                                        </p>
                                    </div>
                                </div>
                                <div style="width:184px;">R {{ item.goods_price }}</div>
                                <div style="width:156px;">{{ item.goods_num }} Pieces</div>
                                <div style="width:187px;">R {{ item.final_price }}</div>
                            </div>
                            <div class="user-msg">
                                <span>Note:</span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div class="status">
                        <span style="color: #666666;font-weight:500;">{{ orderDetailData.txt }}</span>
                    </div>
                </div>
                <div class="product-total">
                     <div>
                        <p>Total Amount</p>
                        <p>R {{ orderDetailData.mtotal_amount }}</p>
                    </div>
                     <div>
                        <p>Shipping Cost</p>
                        <p>R {{ orderDetailData.shipping_price }}</p>
                    </div>
                    <div>
                        <p>Product Amount</p>
                        <p>R {{ orderDetailData.order_amount }}</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        <div class="closeOrder" v-show="showCloseOrder">
            <div class="offCloseOrder" @click="offCloseOrderPopup">×</div>
            <h4>Summary</h4>
            <h5>Reason for cancelling the order:</h5>
            <ul>
                <li><el-radio v-model="closeOrderRadio" label="1">备选项1</el-radio></li>
                <li><el-radio v-model="closeOrderRadio" label="2">备选项2</el-radio></li>
                <li><el-radio v-model="closeOrderRadio" label="3">备选项3</el-radio></li>
            </ul>
            <div class="closeOrderbtn" @click="closeOrder">Cancel Order</div>
        </div>
        <div class="closeOrderbcg" v-show="showCloseOrder"></div>
    </div>
</template>

<script>
import api from '@/api'
import HeaderHtml from '@/components/common/headerhtml'
import Search from '@/components/common/search'
import Footer from '@/components/common/footerhtml'
import Pay from '@/components/common/pay'
export default {
    name:'orderDetails',
    components:{
        HeaderHtml,
        Search,
        Footer,
        Pay
    },
    data() {
        return {
            searchBarFixed:{
                isfixed:false,
                isshow:true
            },
            radio:0,
            current:0,
            popIsShow:false,
            order_id:"",
            user_id:"",
            homedata:{},
            activities: [],
            activitiesAll:[{
                content: 'PORT SAINT LUCIE 34987  Out for Delivery',
                timestamp: '2018-04-12 20:46',
                size: 'large',
                color: '#367202'
                }, {
                content: 'PORT SAINT LUCIE 34987  Out for Delivery',
                timestamp: '2018-04-06 20:46'
                }],
            activitiesShow:[{
                content: 'PORT SAINT LUCIE 34987  Out for Delivery',
                timestamp: '2018-04-12 20:46',
                size: 'large',
                color: '#367202'
                }],
            orderDetailData:{},
            order_status:["Awaiting payment","Mobile Order","Processing","Shipped","Finished"],
            showPay:false,
            orderData:{
                order:{
                    order_id:"",
                    order_sn:""
                }
            },
            showCloseOrder:false,
            closeOrderRadio:0
        }
    },
    created(){
        this.getRouteData()
        this.gethomedata()
        this.getorderDetailVal()
    },
    // beforeDestroy() {
    //     localStorage.removeItem('order_id');
    // },
    methods:{
        formatDate(now) { //时间戳转换
            var now=new Date(now*1000);
            var year=now.getFullYear(); 
            var m=now.getMonth()+1; 
            var date=now.getDate(); 
            var hour=now.getHours(); 
            var minute=now.getMinutes(); 
            return year+"."+m+"."+date+"."+hour+minute
        }, 
        gethomedata(){//获取首页数据
            this.$store.dispatch('home/gethomedataaction').then((data)=>{
                this.$nextTick(()=>{
                    if(data.code==200){
                        this.homedata=data.data
                    }
                })
            }) 
        },
        getRouteData(){
            if (localStorage.getItem("userdata")) {
                let userdata=JSON.parse(localStorage.getItem("userdata"))
                this.user_id=userdata.user_id
            }else{
                router.replace({ name: 'login', params: { islogin:"signin" }})
            }
            if (localStorage.getItem("order_id")) {
                let order_id=JSON.parse(localStorage.getItem("order_id"))
                this.order_id=order_id
            }
            if (this.$route.params.itemData) {
                this.order_id=this.$route.params.itemData.order_id
                localStorage.setItem("order_id",this.order_id)
            }
        },
        getorderShipping(){//物流信息
            var params = {
                order_id:this.order_id,
            }
            this.axios.post(api.orderShipping, params)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        if (data) {
                            data.forEach(item => {
                                item.color="#367202"
                                item.size="large"
                                item.displaytime=this.formatDate(item.displaytime)
                            });
                            this.activitiesAll=data.record
                            this.activitiesShow=data.record[0]
                        }
                        this.activities = this.activitiesShow;
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        closeOrderPopup(){//关闭订单弹窗打开
            this.showCloseOrder=true
        },
        offCloseOrderPopup(){//关闭订单弹窗关闭
            this.showCloseOrder=false
        },
        closeOrder(){//关闭订单
            let params = {
                "user_id":this.user_id,
                "order_id":this.order_id,
                "reason":""
            }
            this.axios.post(api.closeOrder, params)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getorderDetailVal()
                        this.showCloseOrder=false
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        payNow(){//购买
            this.showPay=true
            this.orderData.order.order_id=this.orderDetailData.order_id
            this.orderData.order.order_sn=this.orderDetailData.order_sn
        },
        getorderDetailVal(){//获取订单数据
            this.getorderDetail().then((data)=>{
                this.orderDetailData=data
                if (this.orderDetailData.order_status==2||this.orderDetailData.order_status==3||this.orderDetailData.order_status==4) {
                    this.getorderShipping()
                }
                // this.orderDetailData.order_status=2
            })
        },
        getorderDetail(){
            let params = {
                "user_id":this.user_id,
                "order_id":this.order_id,
            }
            return new Promise((resolve)=>{
                this.axios.post(api.orderDetail, params)
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
        addCat(){
            this.orderDetailData.goodslist.forEach(list => {
                var params = {
                    goods_id:list.goods_id,
                    goods_num:list.goods_num,
                    // attrsku:this.attrsku
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
                        }
                        else if (res.data.code==401) {
                            this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                        }
                    })
            });
        },
        showAll(){
            if(this.current == 0){
                this.activities= this.activitiesAll;
                this.current = 1
            }else{
                this.activities= this.activitiesShow;
                this.current = 0;
            }
        },
        tofeedback(){//去评价
            this.$router.push({ name: 'feedback', params: {  }})
        },
        toMyorders(){//返回订单列表页
            this.$router.push({ name: 'myorders', params: {  }})
        },
        toHome(){//返回首页
            this.$router.push({ name: 'home', params: {  }})
        },
        popShow(){
            this.popIsShow = !this.popIsShow
        },
        open() {//确认收货弹窗
            this.$confirm('Conformation of recei', 'Receiving Goods', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancle'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: 'Confirmed receipt'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Cancle'
                });          
            });
        }
    }
  };
</script>
<style lang="scss" scoped>
.closeOrder{
    background-color: #fff;
    position: fixed;
    z-index: 9999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    padding: 0 20px;
    .offCloseOrder{
        height: 32px;
        line-height: 32px;
        position: absolute;
        cursor: pointer;
        font-size: 28px;
    }
    h4,h5{
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid #ccc;
    }
    h5{
        text-align: left;
    }
    ul{
        margin: 10px 0;
        li{
            text-align: left;
            height: 30px;
            line-height: 30px;
        }
    }
    .closeOrderbtn{
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #000;
        background-color: #FEB610;
        margin-bottom: 10px;
        cursor: pointer;
    }
}
.pay{
    position: absolute;
    z-index: 9999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 375px;
    // height: 400px;
}
.bcg_div,.closeOrderbcg{
    position: fixed;
    z-index: 9990;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #666;
    opacity: .5;
}
.details-container{
    width: 1200px;
    margin: 0 auto;
    text-align: left;
    .popContainer{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.3);
        z-index: 100;
        .popContent{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 420px;
            background: #fff;
            border-radius: 4px;
            padding: 16px 24px 38px 24px;
            div:nth-child(1){
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 20px;
                margin-left: 24px;
            }
            div:nth-child(2){
                margin: 0;
                margin-left: 24px;
                & /deep/ .el-radio-group{
                    margin: 0;
                    padding: 0;
                    margin-bottom: 14px;
                }
            }
            div:nth-child(3){
                width: 372px;
                margin: 0 auto;
                background: #F8F8F8;
                font-size: 14px;
                color: #333;
                text-align: left;
                padding: 24px 34px 34px 34px;
                overflow: hidden;
                box-sizing: border-box;
                input{
                    border: 1px solid #dedede;
                    height: 32px;
                    line-height: 32px;
                    font-size: 16px;
                    padding: 0 6px;
                    box-sizing: border-box;
                }
                p:nth-child(1){
                    margin-bottom: 12px;
                }
                p:nth-child(2){
                    input{
                        width: 304px;
                    }
                }
                p:nth-child(3){
                    margin-top: 16px;
                    span:first-child{
                        margin-right: 90px;
                    }
                }
                p:nth-child(4){
                    margin-top: 12px;
                    margin-bottom: 12px;
                    input:nth-child(1),input:nth-child(2){
                        width: 48px;
                    }
                    input:nth-child(3){
                        width: 142px;
                        margin-left: 54px;
                    }
                }
                 p:nth-child(6){
                     margin-top: 12px;
                     input{
                         width: 144px;
                     }
                     input:last-child{
                         margin-left: 16px;
                     }
                 }
            }
            div:last-child{
                margin-top: 24px;
                span{
                    display: inline-block;
                    height: 44px;
                    width: 184px;
                    line-height: 44px;
                    text-align: center;
                    color: #fff;
                    cursor: pointer;
                    border-radius: 4px;
                    box-sizing: border-box;
                    font-size: 16px;
                    font-weight: bold;
                    background: #FEB610;
                    margin-left: 24px;
                }
                span:last-child{
                    border: 1px solid #DEDEDE;
                    background: #fff;
                    color: #DEDEDE;
                    margin-left: 4px;
                }
            }
        }
    }
    .navigation{
        color: #666;
        font-size: 12px;
        padding: 28px 0 24px 0;
        box-sizing: border-box;
        span{
            cursor: pointer;
        }
    }
    .order-id{
        padding: 22px 47px 32px 47px;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #DEDEDE;
        font-size: 12px;
        div{
            margin-top: 15px;
        }
        .text-r{
            display: inline-block;
            width: 80px;
            text-align: right;
            margin-right: 12px;
        }
        .awaiting{
            color: #367202;
        }
        .closed,.finished{
            font-weight: bold;
            color: #333;
        }
        .processing{
            color: #1B5EC9;
            font-weight: bold;
        }
        .shipped{
            color: #FF7805;
            font-weight: bold;
        }
        .finishedBlue{
            color: #1B5EC9;
            font-weight: bold;
        }
        .click-btn{
            span{
                display: inline-block;
                text-align: center;
                color: #fff;
                padding: 6px 26px;
                border-radius: 2px;
                background: #FF7804;
                cursor: pointer;
                box-sizing: border-box;
                margin-right: 16px;
                margin-left: 90px;
            }
        }
    }
    .user-details{
        padding: 20px 24px 24px 24px;
        background: #fff;
        font-size: 12px;
        margin-top: 16px;
        border: 1px solid #DEDEDE;
        color: #333;
        .ueser-address{
            margin-left: 90px;
            p{
                margin-top: 10px;
            }
            p:last-child{
                span{
                    display: inline-block;
                    margin-top: 4px;
                }
            }
        }
        .product-time{
            margin-top: 24px;
            border-top: 1px solid #DEDEDE;
            padding-top: 15px;
            .time-title{
                color: #333;
                font-weight: bold;
                margin-bottom: 16px;
            }
            .time-line{
                padding-left: 100px;
                & /deep/ .is-top{
                    position: absolute;
                    width: 80px;
                    line-height: 20px;
                    text-align: right;
                    left: -100px;
                    height: 200px;
                }
                .el-timeline-item{
                    min-height: 50px;
                    font-size: 12px;
                }
                .fontColor{
                    & /deep/ .el-timeline-item__content{
                        color: #367202;
                    }
                }
            }
            .show-all{
                margin-left: 130px;
                width: 70px;
                cursor: pointer;
                span:first-child{
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    background: #000;
                    color: #fff;
                    border-radius: 50%;
                    line-height: 16px;
                    text-align: center;
                    margin-right: 8px;
                }
            }
        }
    }
    .product-details{
        background: #fff;
        border: 1px solid #DEDEDE;
        box-sizing: border-box;
        margin-top: 16px;
        font-size: 12px;
        .product-title{
            overflow: hidden;
            background: #F2F2F2;
            height: 48px;
            line-height: 48px;
            padding-left: 24px;
            div{
                float: left;
                margin-right: 110px;
            }
            div:nth-child(1){
                font-weight: bold;
                margin-right: 25px;
            }
            div:nth-child(2){
                margin-right: 190px;
                i{
                    font-size: 16px;
                }
            }
            div:nth-child(5){
                margin-right: 150px;
            }
        }
        .product-container{
            overflow: hidden;
            border-bottom: 1px solid #DEDEDE;
            .product-list,.status{
                float: left;
            }
            .product-list{
                .list{
                    padding-top: 12px;
                    border-right: 1px solid #DEDEDE;
                    border-bottom: 1px solid #DEDEDE;
                    padding-left: 24px;
                    overflow: hidden;
                    box-sizing: border-box;
                    div{
                        float: left;
                    }
                    .order-img{
                        div{
                            width: 62px;
                            margin-right: 14px;
                            img{
                                width: 100%;
                                border-radius: 2px;
                                
                            }
                        }
                        div:last-child{
                            width: 290px;
                            p{
                                height: 40px;
                                line-height: 20px;
                                overflow: hidden;
                            }
                            p:last-child{
                                margin-top: 8px;
                            }
                        }
                    }
                }
                .for-container{
                    .user-msg{
                        height: 40px;
                        width: 907px;;
                        line-height: 40px;
                        border-right: 1px solid #DEDEDE;
                        border-bottom: 1px solid #DEDEDE;
                        padding-left: 24px;
                        overflow: hidden;
                        span{
                            float: left;
                        }
                        span:last-child{
                            display: inline-block;
                            width: 95%;
                            box-sizing: border-box;
                            margin-left: 4px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .user-msg:last-child{
                        border-bottom: none;
                    }
                }
            }
            .status{
                padding-top: 12px;
                span{
                    margin-left: 24px;

                }
            }
        }
        .product-total{
            overflow: hidden;
            padding-bottom: 30px;
            div{
                float: right;
                margin-right: 52px;
                p{
                    margin-top: 20px;
                }
                p:last-child{
                    font-weight: bold;
                }
            }
        }
    }
}
</style>