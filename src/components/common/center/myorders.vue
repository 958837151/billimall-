<template>
<!-- 订单列表页面 -->
    <div class="my-orders">
        <div class="pay" v-if="showPay">
            <Pay :orderData="orderData"></Pay>
        </div>
        <div class="bcg_div" v-if="showPay"></div>
        <div class="order-title">
            <div v-for="(item,index) in orderList" :key="index" :class="{titleActive:index==current}" @click="titleActive(index)">
                <span>{{item.name}}</span> 
                <span class="order-num">{{item.num}}</span>
            </div>
        </div>
        <div class="order-msg">
            <div>
                <span>Product</span>
            </div>
            <div>
                <span>Order Status</span>
            </div>
            <div>
                <span>Order Action</span>
            </div>
        </div>
        <div class="order-container">
            <div class="order-panel" v-for="(item) in listData" :key="item.order_id">
                <div class="panel-title">
                    <div>
                        <p>
                            <span>Order ID:</span>
                            <span>{{ item.order_id }}</span>
                            <span class="view-datail" @click="toOrderDetails(item)">View Detail</span>
                            <span class="view-datail" @click="toMessage(item)">Contact Seller</span>
                        </p>
                        <p>
                            <span>Order Time: </span>
                            <span>{{ item.add_time }}</span>
                        </p>
                    </div>
                     <div>
                        <p>
                            <span>Order  Amount:</span>
                            <span class="deletes"><i class="icon-shanchu iconfont" @click="getdeleteOrder(item)"></i></span>
                        </p>
                        <p>
                            <span>R {{ item.order_amount }}</span>
                        </p>
                    </div>
                </div>
                <div class="panel-content">
                    <div class="content-left">
                        <div class="content-left-container" v-for="(goodslist,index) in item.goodslist" :key="index">
                            <div>
                                <img :src="goodslist.imgUrl" style="width: 62px;height: 62px;display: block;">
                            </div>
                            <div>
                                <p>{{ goodslist.goods_name }}</p>
                                <p>
                                    <span>{{ goodslist.spec_key_name }}</span>
                                    <!-- <span>Black</span>
                                    <img src="@/assets/images/2.jpg">
                                    <span>Size：</span>
                                    <span>S</span> -->
                                </p>
                                <p>R {{ goodslist.goods_price }} x{{ goodslist.goods_num }}</p>
                            </div>
                        </div>                       
                    </div>
                    <div class="content-mid">
                        <p v-if="item.order_status == 0">
                            <span class="awaiting">Awaiting payment</span>
                        </p>
                        <!-- <p v-else-if="item.order_status == 1"> 
                            <span class="mobile">Mobile Order</span>
                        </p> -->
                        <p v-else-if="item.order_status == 1">
                            <span class="processing">Processing</span>
                        </p>
                        <p v-else-if="item.order_status == 2">
                            <span class="shipped">Shipped</span>
                        </p>
                        <p v-else-if="item.order_status == 3||item.order_status == 4">
                            <span>Finished</span>
                        </p>
                        <p v-else-if="item.order_status==5">
                            <span class="closed">Closed</span>  
                        </p>
                    </div>
                    <div class="content-right">
                        <p v-if="item.order_status == 3" style="margin-bottom: 10px;">
                            <span class="confirm"  @click="toFeedback(item)">Leave Feedback</span>
                        </p>
                        <p v-if="item.order_status == 0" style="margin-bottom: 10px;">
                            <span class="pay-now" @click="payNow(item)">Pay Now</span>
                        </p>
                        <p v-if="item.order_status == 5" @click="addCat(item)" style="margin-bottom: 10px;">
                            <span>Add to Cart</span>
                        </p>
                        <p v-if="item.order_status == 2" style="margin-bottom: 10px;">
                            <span class="confirm" @click="open(item)">Confirm Order Received</span>
                        </p>
                        <p v-if="item.order_status == 2||item.order_status == 3||item.order_status == 4" style="margin-bottom: 10px;">
                            <span @click="toOrderDetails(item)">Tracking</span>
                        </p>
                        <p v-if="item.order_status == 0">
                            <span @click="closeOrderPopup(item)">Cancle Order</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="pagimg" style="text-align: right;margin-top: 20px;" v-if="countNum>0">
                <el-pagination id="pagesComment" :background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="5" layout="prev, pager, next, jumper" :total="countNum*1"></el-pagination>
        </div>
        <div class="closeOrder" v-show="showCloseOrder">
            <div class="offCloseOrder" @click="offCloseOrderPopup">×</div>
            <h4>Summary</h4>
            <h5>Reason for cancelling the order:</h5>
            <ul>
                <li v-for="(item, index) in closeReasonData" :key="index"><el-radio v-model="closeOrderRadio" :label="index" @change="changeRadio">{{ item }}</el-radio></li>
            </ul>
            <div class="closeOrderbtn" @click="closeOrder">Cancel Order</div>
        </div>
        <div class="closeOrderbcg" v-show="showCloseOrder"></div>
    </div>
</template>
<script>
import api from '@/api'
import Pay from '@/components/common/pay'
export default {
    name:'myorders',
    components:{
        Pay
    },
    data(){
        return{
            orderList:[{name:"ALL Orders",num:""},{name:"Unpaid",num:""},{name:"Processing",num:""},{name:"Shipped",num:""},{name:"Feedback",num:""}],
            current:0,
            listData:[],
            month:["January","February","March","April","May","June","July","August","September","October","November","December"],//12月份
            currentPage: 1,
            page:1,
            countNum:0,//总条数
            countPage:0,//总页数
            nowPage:1,//当前页
            user_id:"",
            type:"",//WAITPAY 是 unpaid;WAITSEND是 processipng；WAITRECEIVE是shipped；FINISH是delivered 空是all
            order_status:["Awaiting payment","Mobile Order","Processing","Shipped","Finished"],
            showPay:false,
            orderData:{
                order:{
                    order_id:"",
                    order_sn:""
                }
            },
            showCloseOrder:false,
            closeOrderRadio:"",
            itemOrder_id:"",
            closeReasonData:{}
        }
    },
    created() {
        if (localStorage.getItem("userdata")) {
            let userdata=JSON.parse(localStorage.getItem("userdata"))
            this.user_id=userdata.user_id
            this.getorderVal()
            this.getorderStat()
            this.closeReason()
        }else{
            router.replace({ name: 'login', params: { islogin:"signin" }})
        }
    },
    methods:{
        formatDate(now) { //时间戳转换
            var now=new Date(now*1000);
            var year=now.getFullYear(); 
            var m=now.getMonth(); 
            var date=now.getDate(); 
            var hour=now.getHours(); 
            var minute=now.getMinutes(); 
            return hour+":"+minute+" "+this.month[m]+"."+date+"."+year
        }, 
        getorderStat(){//订单统计
            let params = {
                user_id:this.user_id,
            }
            this.axios.post(api.orderStat, params)
                .then(res => {
                    if (res.data.code==200) {
                        // this.orderNum=res.data.data
                        this.orderList.forEach((item,index) => {
                            if (index=="0") {
                                item.num=res.data.data.orders_all
                            }else if (index=="1") {
                                item.num=res.data.data.unpaid
                            }else if (index=="2") {
                                item.num=res.data.data.processing
                            }else if (index=="3") {
                                item.num=res.data.data.shipped
                            }else if (index=="4") {
                                item.num=res.data.data.feedback
                            }
                        });
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        getorderVal(){//订单列表
            this.getorder().then((data)=>{
                this.listData=data.list
                // this.listData[0].order_status=2
                if (this.listData) {
                    this.listData.forEach(item => {
                        item.add_time=this.formatDate(item.add_time)
                    });
                }
                this.countNum=data.page.countNum*1
            })
        },
        getorder(){
            let params = {
                "user_id":this.user_id,
                "type":this.type,
                "perPage":5,
                "page":this.page
            }
            return new Promise((resolve)=>{
                this.axios.post(api.order, params)
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
        titleActive(index){//状态tap
            this.current = index;
            this.page=1
            this.currentPage=1
            if (this.current==0) {//WAITPAY 是 unpaid;WAITSEND是 processipng；WAITRECEIVE是shipped；FINISH是delivered
                this.type=""
            }else if (this.current==1) {
                this.type="WAITPAY"
            }else if (this.current==2) {
                this.type="WAITSEND"
            }else if (this.current==3) {
                this.type="WAITRECEIVE"
            }else if (this.current==4) {
                this.type="FINISH"
            }
            this.getorderVal()
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
        addCat(item){//加入购物车

            item.goodslist.forEach(list => {
                list.spec_key_name=list.spec_key_name.slice(0,list.spec_key_name.length-1)
                var params = {
                    goods_id:list.goods_id,
                    goods_num:list.goods_num*1,
                    attrsku:list.spec_key_name
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
                    })
            });
        },
        getdeleteOrder(item){//删除订单
            let params = {
                "user_id":this.user_id,
                "order_id":item.order_id,
            }
            this.axios.post(api.deleteOrder, params)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getorderVal()
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        orderComfirm(item){//确认收货
            let params = {
                "user_id":this.user_id,
                "order_id":item.order_id,
            }
            this.axios.post(api.orderComfirm, params)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getorderVal()
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        closeOrderPopup(item){//关闭订单弹窗打开
            this.showCloseOrder=true
            this.itemOrder_id=item.order_id
            this.closeOrderRadio
        },
        offCloseOrderPopup(){//关闭订单弹窗关闭
            this.showCloseOrder=false
        },
        changeRadio(val){//改变选择原因值
            this.closeOrderRadio=val
        },
        closeOrder(){//关闭订单
            if (this.closeOrderRadio=="") {
                this.$message({
                    showClose: true,
                    message: "Please select the reason for closing the order",
                    type: 'warning'
                });
                return false
            }
            let params = {
                "user_id":this.user_id,
                "order_id":this.itemOrder_id,
                "reason":this.closeOrderRadio
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
                        this.getorderVal()
                        this.showCloseOrder=false
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        closeReason(){//获取订单关闭理由
            let params = {
            }
            this.axios.post(api.closeReason, params)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        this.closeReasonData=data
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        open(item) {//确认收货弹窗
            this.$confirm('Conformation of recei', 'Receiving Goods', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancle'
            }).then(() => {
                this.orderComfirm(item)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Cancle'
                });          
            });
        },
        payNow(item){//购买
            this.showPay=true
            this.orderData.order.order_id=item.order_id
            this.orderData.order.order_sn=item.order_sn
        },
        toFeedback(data){
            this.$router.push({ name: 'feedback', params: { "itemData":data }})
        },
        toOrderDetails(data){
            this.$router.push({ name: 'OrderDetails', params: { "itemData":data }})
        },
        toMessage(data){
            this.$router.push({ name: 'message', params: { "itemData":data }})
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.page=val
            this.getorderVal()
        }
    }
}
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
    position: fixed;
    z-index: 9999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 375px;
    // height: 400px;
}
.bcg_div,.closeOrderbcg{
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #666;
    opacity: .5;
}
.my-orders{
    background: #FAFAFA;
}
  .order-title{
      overflow: hidden;
      background: #fff;
      div{
          float: left;
          width: 144px;
          height: 48px;
          font-size: 14px;
          text-align: center;
          line-height: 48px;
          border-right: 1px solid #F6F6F6;
          box-sizing: border-box;
      }
      .titleActive{
          font-weight: bold;
          border-top: 3px solid #FFB610;
          background-color: #FAFAFA;
      }
      .order-num{
          color: #FFB610;
          margin-left: 4px;
          font-weight: normal;
      }
  }
  .order-msg{
      overflow: hidden;
      background: #fff;
      margin: 16px 0;
      div{
          float: left;
          width: 218px;
          text-align: left;
          font-size: 12px;
          font-weight: bold;
          height: 48px;
          line-height: 48px;
          span{
            margin-left: 24px;
          }
      }
      div:nth-child(1){
          width: 460px;
      }
  }
  .order-container{
      .order-panel{
         margin-top: 16px;
         border: 1px solid #DEDEDE;
         box-sizing: border-box;
         background: #fff;
      }
  }
  .panel-title{
      height: 74px;
      overflow: hidden;
      background-color: #F2F2F2;
      font-size: 12px;
      div{
          float: left;
          margin-left: 22px;
          margin-top: 6px;
          p{
              margin-top: 10px;
              text-align: left;
              span.view-datail{
                  color: #1974A1;
                  margin-left: 12px;
                  cursor: pointer;
              }
          }
      }
      div:last-child{
          float: right;
          margin-right: 18px;
          p:last-child{
              span{
                font-weight: bold;
                font-size: 16px;
            }
          }
      }
      .deletes{
          cursor: pointer;
          margin-left: 80px;
      }
  }
  .panel-content{
      overflow: hidden;
      position: relative;
      .content-left,.content-mid,.content-right{
           float: left;
          width: 217px;
          text-align: left;
          font-size: 12px;
          padding-left: 24px;
          box-sizing: border-box;
      }
      .content-left{
          width: 460px;
          overflow: hidden;
          box-sizing: border-box;
          .content-left-container{
              border: 1px solid #DEDEDE;
              border-top: none;
              border-left: none;
              overflow: hidden;
              padding-bottom: 24px;
              padding-top: 20px;
              box-sizing: border-box;
               div{
                    float: left;
                }
                div:first-child{
                    width: 62px;
                    img{
                        width: 100%;
                        border-radius: 2px;
                    }
                }
                div:last-child{
                    width: 280px;
                    margin-left: 14px;
                    p:nth-child(1){
                        height: 40px;
                        line-height: 20px;
                        overflow: hidden;
                    }
                    p:nth-child(2){
                        color: #666;
                        margin-top: 8px;
                        img{
                            width: 20px;
                            border-radius: 2px;
                            vertical-align: middle;
                            margin-left: 4px;
                            margin-right: 32px;
                        }
                    }
                    p:nth-child(3){
                        font-weight: bold;
                        margin-top: 8px;
                    }
                }
          }
          .content-left-container:last-child{
              border-bottom: none;
          }
      }
      .content-mid{
          font-size: 12px;
          border-right: 1px solid #DEDEDE;
          position: absolute;
          left: 460px;
          height: 100%;
          padding-top: 20px;
          box-sizing: border-box;
          span{
              display: inline-block;
              text-align: center;
              cursor: pointer;
              font-weight: bold;
          }
          .closed{
              color: #666;
          }
          .mobile{
              width: 88px;
              height: 20px;
              line-height: 20px;
              background: #C1C9FA;
              color: #fff;
              font-weight: normal;
          }
          .awaiting{
              color: #367202;
          }
          .processing{
              color: #1B5EC9;
          }
          .shipped{
              color: #FF7805;
          }
      }
      .content-right{
          position: absolute;
          left: 677px;
          padding-top: 20px;
          box-sizing: border-box;
          span{
              display: inline-block;
              cursor: pointer;
              width: 102px;
              height: 28px;
              line-height: 28px;
              text-align: center;
              font-weight: bold;
              background: #F5F5F5;
              border: 1px solid #DEDEDE;
              box-sizing: border-box;
              border-radius: 2px;
          }
          .pay-now{
              background: #FF7804;
              color: #fff;
              border: none;
          }
          .confirm{
              background: #FF7804;
              width: 162px;
              border: none;
              color: #fff;
          }
      }
  }
</style>
