<template>
<!-- 订单确认页面-->
    <div class="place-orderr">
        <div class="place-logo">
            <div>
                <img src="@/assets/images/logo.png" alt="">
            </div>
        </div>
        <div class="pay" v-if="showPay">
            <Pay :orderData="orderData"></Pay>
        </div>
        <div class="bcg_div" v-if="showPay"></div>
        <div class="place-container">
            <div class="place-left">
                <div class="shipping-information">
                    <div class="shipping-title">
                        <p>Shipping Information</p>
                    </div>
                    <div class="user-name" v-if="seleteAddressData.consignee">
                        <p>
                            <span style="margin-right: 15px;">name: </span>
                            <span>{{ seleteAddressData.consignee }}</span>
                        </p>
                    </div>
                    <div class="user-address" v-if="seleteAddressData.province&&seleteAddressData.city">
                        <p>
                            <span style="font-size: 16px;font-weight: bold;">address:</span>
                            <span>{{ seleteAddressData.province }}</span>
                        </p>
                        <p style="padding-left: 65px;">
                            <span>{{ seleteAddressData.city }}</span>
                        </p>
                        <p style="padding-left: 65px;">
                            <span>{{ seleteAddressData.address }},{{ seleteAddressData.ainfo }}</span>
                        </p>
                        <p>
                            <span style="font-size: 16px;font-weight: bold;margin-right: 11px;">phone:</span>
                            <span>{{ seleteAddressData.mobile }}</span>
                        </p>
                        <p>
                            <span style="font-size: 16px;font-weight: bold;margin-right: 18px;">email:</span>
                            <span>{{ seleteAddressData.email }}</span>
                        </p>
                    </div>
                    <div class="add-others">
                        <span @click="addNewAddress">+ Add new address</span>
                        <span @click="selectOtherAddresses">Select other addresses</span>
                    </div>
                    <div v-show="showMyaddress" :class="[buyAdreassState==1 ? 'addAdress' : 'editAdress', 'address']">
                        <Myaddress :buyAdreassState="buyAdreassState" @receiveAddressData="receiveAddressData" @addressListData="addressListData"></Myaddress>
                    </div>
                </div>
                <!-- <div class="payment-methods">
                    <div class="payment-title">
                        <p>Payment Methods</p>
                    </div>
                    <div class="select-methods">
                        <div class="cards">
                            <p>Card</p>
                            <p>
                                <img src="@/assets/images/visa.png" alt="">
                                <img src="@/assets/images/twoyuan.png" alt="">
                                <img src="@/assets/images/jcb.png" alt="">
                                <img src="@/assets/images/disc.png" alt="">
                            </p>
                        </div>
                    </div>
                    <div class="input-card">
                        <div>
                            <p>Card Number </p>
                            <p>
                                <input type="text" v-model="card.cardNum" placeholder="0000 0000 0000 0000" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" maxlength="16">
                            </p>
                            <p>
                                <span>Card Holder</span>
                                <span>Expires</span>
                            </p>
                            <p>
                                <input type="text" v-model="card.cardHolder">
                                <input type="text" v-model="card.expires">
                            </p>
                        </div>
                        <div>
                            <p></p>
                            <p>CW</p>
                            <p>
                                <input type="text" v-model="card.cw" placeholder="000" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" maxlength="3">
                            </p>
                        </div>
                    </div>
                </div> -->
                <div class="order-review">
                    <div class="review-title">
                        <p>Order Review</p>
                    </div>
                    <div class="review-container">
                        <div class="order-list" v-for="(item, index) in cartlist" :key="index">
                            <div class="orders-img">
                                <img :src="item.imgurl" alt="" style="width: 120px;height: 120px;display: block;">
                            </div>
                            <div class="orders-content">
                                <p>{{ item.goods_name }}</p>
                                <p>
                                    <span>{{ item.spec_key_name }}</span>
                                    <!-- <span>Black</span>
                                    <img src="@/assets/images/2.jpg" alt="" style="width:20px;border-radius:2px;">
                                    <span>Size: </span>
                                    <span>S</span> -->
                                </p>
                                <p>
                                    <span>R {{ item.goods_price }}</span>
                                </p>
                                <!-- <p class="user-msg">
                                    <input type="text" v-model="item.userMsg" v-if="userMsgIs"  @blur="closedInput">
                                    <p v-show="userMsgIsP" @click="leaveMsg" style=" text-overflow: ellipsis;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        border: 1px solid #DEDEDE;
                                        width: 280px;
                                        height: 22px;
                                        line-height: 24px;">{{item.userMsg}}</p>
                                </p> -->
                            </div>
                            <div class="add-btn">
                                <el-input-number disabled v-model="item.userQuabity" @change="handleChange(item)" :min="1"></el-input-number>
                            </div>
                        </div>
                    </div>
                    <div class="zar-total">
                        <p>
                            <span>Subtotal</span>
                            <span>R {{ goods_fee }}</span>
                        </p>
                        <p>
                            <span>Shipping</span>
                            <span> {{ Shipping }}</span>
                        </p>
                        <!-- <p>
                            <span>Coupons</span>
                            <span style="float:right;margin-left:8px;cursor: pointer;color:#333;" @click="lookCoupon">
                                <i class="el-icon-arrow-down" style="font-size:14px;" v-if="!discountIsShow"></i>
                                <i class="el-icon-arrow-up" style="font-size:14px;" v-else></i>
                                </span>
                            <span style="color:#FF3308;">- R 20</span>
                        </!--> 
                        <p>
                            <span>Total</span>
                            <span>R {{ total_fee }}</span>
                        </p>
                        <!-- <div class="alldis" v-show="discountIsShow">
                            <div class="listConter">
                                <ul>
                                <li :class="{usernew:isNewUser,userold:!isNewUser}">
                                    <div>
                                        <p>R 10.00</p>
                                        <p>Orders over R 50.00</p>
                                        <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                    </div>
                                    <div>
                                        <button :class="{added:!isAdded}">GET</button>
                                    </div>
                                </li>
                                <li :class="{userold:isNewUser,added:isAdded}">
                                    <div>
                                        <p>R 10.00</p>
                                        <p>Orders over R 50.00</p>
                                        <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                    </div>
                                    <div>
                                        <button :class="{added:isAdded}">Added</button>
                                    </div>
                                </li>
                                <li :class="{userold:isNewUser,added:isAdded}">
                                    <div>
                                        <p>R 10.00</p>
                                        <p>Orders over R 50.00</p>
                                        <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                    </div>
                                    <div>
                                        <button :class="{added:isAdded}">Added</button>
                                    </div>
                                </li>
                                <li :class="{userold:isNewUser,added:isAdded}">
                                    <div>
                                        <p>R 10.00</p>
                                        <p>Orders over R 50.00</p>
                                        <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                    </div>
                                    <div>
                                        <button :class="{added:isAdded}">Added</button>
                                    </div>
                                </li>
                                <li :class="{userold:isNewUser,added:isAdded}">
                                    <div>
                                        <p>R 10.00</p>
                                        <p>Orders over R 50.00</p>
                                        <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                    </div>
                                    <div>
                                        <button :class="{added:isAdded}">Added</button>
                                    </div>
                                </li>
                                <li :class="{userold:isNewUser,added:isAdded}">
                                    <div>
                                        <p>R 10.00</p>
                                        <p>Orders over R 50.00</p>
                                        <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                    </div>
                                    <div>
                                        <button :class="{added:isAdded}">Added</button>
                                    </div>
                                </li>
                                
                            </ul>
                            </div>
                        </div> -->
                    </div>
                    </div>
                </div>
            <div class="place-right">
                <div class="order-summary">
                        <div style="font-size:24px;font-weight:bold;">Order Summary</div>
                        <div class="zar-detailes">
                            <p>
                                <span>Subtotal:</span>
                                <span>R {{ goods_fee }}</span>
                            </p>
                            <p>
                                <span>Shipping:</span>
                                <span> {{ Shipping }}</span>
                            </p>
                            <!-- <p>
                                <span>BilliMall Coupon:</span>
                                <span style="float:right;margin-left:8px;cursor: pointer;color:#333;" @click="lookCouponInOrder">
                                    <i class="el-icon-arrow-down" style="font-size:14px;" v-if="!discountIsShowTwo"></i>
                                    <i class="el-icon-arrow-up" style="font-size:14px;" v-else></i>
                                    </span>
                                <span style="color:#FF3308;">- R 20</span>
                            </p> -->
                                <div class="alldis" v-show="discountIsShowTwo">
                                        <div class="listConter">
                                            <ul>
                                            <li :class="{usernew:isNewUser,userold:!isNewUser}">
                                                <div>
                                                    <p>R 10.00</p>
                                                    <p>Orders over R 50.00</p>
                                                    <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                                </div>
                                                <div>
                                                    <button :class="{added:!isAdded}">GET</button>
                                                </div>
                                            </li>
                                            <li :class="{userold:isNewUser,added:isAdded}">
                                                <div>
                                                    <p>R 10.00</p>
                                                    <p>Orders over R 50.00</p>
                                                    <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                                </div>
                                                <div>
                                                    <button :class="{added:isAdded}">Added</button>
                                                </div>
                                            </li>
                                            <li :class="{userold:isNewUser,added:isAdded}">
                                                <div>
                                                    <p>R 10.00</p>
                                                    <p>Orders over R 50.00</p>
                                                    <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                                </div>
                                                <div>
                                                    <button :class="{added:isAdded}">Added</button>
                                                </div>
                                            </li>
                                            <li :class="{userold:isNewUser,added:isAdded}">
                                                <div>
                                                    <p>R 10.00</p>
                                                    <p>Orders over R 50.00</p>
                                                    <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                                </div>
                                                <div>
                                                    <button :class="{added:isAdded}">Added</button>
                                                </div>
                                            </li>
                                            <li :class="{userold:isNewUser,added:isAdded}">
                                                <div>
                                                    <p>R 10.00</p>
                                                    <p>Orders over R 50.00</p>
                                                    <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                                </div>
                                                <div>
                                                    <button :class="{added:isAdded}">Added</button>
                                                </div>
                                            </li>
                                            <li :class="{userold:isNewUser,added:isAdded}">
                                                <div>
                                                    <p>R 10.00</p>
                                                    <p>Orders over R 50.00</p>
                                                    <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                                </div>
                                                <div>
                                                    <button :class="{added:isAdded}">Added</button>
                                                </div>
                                            </li>
                                            
                                        </ul>
                                        </div>
                                    </div>
                        </div>
                        <div>
                            <div class="total">
                                <p>
                                    <span>Total</span>
                                    <span>R {{ total_fee }}</span>
                                </p>
                                <p @click="ConfirmOrder">
                                    <span class="buy-btn">Confirm&Place Order</span>
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
    import api from '@/api'
    import Myaddress from '@/components/common/center/myaddress'
    import Pay from '@/components/common/pay'
    export default {
        components: {
            Myaddress,
            Pay
        },
        data(){
            return{
                card:{cardNum:"",cardHolder:"",expires:"",cw:""},
                userMsg:"",
                userMsgIs:true,
                btnIsShow:true,
                userMsgIsP:false,
                number:"",
                discountIsShow:false,
                discountIsShowTwo:false,
                isNewUser:true,
                isAdded:true,
                images: [
                    [
                        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
                    ],
                    [
                        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
                    ],
                    [
                        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
                    ],
                ],
                cartlist:[],
                Shipping: 0,//运费
                goods_fee: 0,//货物单价
                goods_num: null,//货物总数量
                total_fee: 0,//费用合计
                showPay:false,
                showMyaddress:false,
                cart_ids:"",
                buyNow:{},
                buyAdreassState:1,//1是新增地址，2是修改地址
                addressList:[],
                seleteAddressData:{},
                orderData:{}
            }
        },
        created() {
            // this.getaddressList()
            if (this.$route.params.cartListData||localStorage.getItem("cart_ids")) {
                this.isbuyCart()
            }else if (this.$route.params.buyNow||localStorage.getItem("buyNow")) {
                this.isbuyNow()
            }
        },
        destroyed(){
            localStorage.removeItem('buyNow')
            localStorage.removeItem('cart_ids')
        },
        methods:{
            isbuyCart(){
                if (this.$route.params.cartListData) {
                    this.cart_ids=this.$route.params.cartListData
                    localStorage.setItem("cart_ids",this.cart_ids)
                }
                this.cart_ids=localStorage.getItem("cart_ids")
                if (this.cart_ids) {
                    let params = {
                        cart_ids:this.cart_ids
                    }
                    this.getcartInfo(params)
                }
            },
            isbuyNow(){
                if (this.$route.params.buyNow) {
                    this.buyNow=JSON.stringify(this.$route.params.buyNow)
                    localStorage.setItem("buyNow",this.buyNow)
                }
                this.buyNow=JSON.parse(localStorage.getItem("buyNow"))
                this.buyNow=JSON.parse(this.buyNow)
                if (this.buyNow) {
                    this.getcartInfo(this.buyNow)
                }
            },
            getsubOrder(){//提交订单接口
                if (localStorage.getItem("buyNow")) {
                    var params = {
                        address_id:this.seleteAddressData.address_id,//地址ID
                        act:"submit_order",//提交订单submit_order
                        goods_id:this.buyNow.goods_id,//商品ID
                        goods_num:this.buyNow.goods_num,//商品数量
                        attrsku:this.buyNow.attrsku,//商品属性值
                        action:"buy_now",//立即购买 buy_now
                        // coupon_id:"",//	优惠券ID
                        // user_note:"",//订单备注
                        // goods_msgs:"",//商品备注
                    }
                }else{
                    var params = {
                        address_id:this.seleteAddressData.address_id,//地址ID
                        act:"submit_order",//提交订单submit_order
                        // coupon_id:"",//	优惠券ID
                        // user_note:"",//订单备注
                        // goods_msgs:"",//商品备注
                    }
                }
                this.axios.post(api.subOrder, params)
                    .then(res => {
                        if (res.data.code==200) {
                            this.orderData=res.data.data
                            this.showPay=true
                        }
                        else if (res.data.code==401) {
                            this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                        }
                    })
            },
            ConfirmOrder(){//提交订单
                if (this.addressList.length==0) {
                    this.$message({
                        showClose: true,
                        message: "Please select an address",
                        type: 'warning'
                    });
                    return
                }
                if (JSON.stringify(this.seleteAddressData) != "{}") {
                    this.getsubOrder()
                }else{
                    this.$message({
                        showClose: true,
                        message: "Please select an address",
                        type: 'warning'
                    });
                }
                // this.showPay=true
            },
            receiveAddressData(data){//接收子组件数据
                this.seleteAddressData=data
                this.showMyaddress=false
            },
            addressListData(data){//接收子组件地址列表数据
                this.addressList=data
                data.forEach(item => {
                    if (item.is_default==true) {
                        this.seleteAddressData=item
                    }
                });
            },
            getcartInfo(params){//提交订单页
                this.axios.post(api.cartInfo, params)
                    .then(res => {
                        if (res.data.code==200) {
                            this.cartlist=[]
                            let cartNum=0
                            let data=res.data.data
                            if (data.length==0) {
                                this.$store.commit("shopingcarnum",0)
                                return
                            }
                            this.Shipping=data.cartPriceInfo.usdshipp
                            this.goods_fee=data.cartPriceInfo.subtotal
                            this.total_fee=data.cartPriceInfo.total
                            this.goods_num=data.cartPriceInfo.goods_num
                            data.cartList.forEach(item => {
                                item.userQuabity=item.goods_num*1
                                item.userMsg=""
                                cartNum=cartNum+item.goods_num*1
                            });
                            this.cartlist=data.cartList
                            this.$store.commit("shopingcarnum",cartNum)
                        }
                        else if (res.data.code==401) {
                            this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                        }
                    })
            },
            leaveMsg(){
                this.btnIsShow = false;
                this.userMsgIs = true
                this.userMsgIsP= false
            },
            closedInput(){
                this.userMsgIs = false
                this.userMsgIsP= true
            },
            getchangeNum(itemData){//更新购物车商品数量
                let params = {
                    cart_id:itemData.id,
                    goods_num:itemData.userQuabity
                }
                this.axios.post(api.changeNum, params)
                    .then(res => {
                        if (res.data.code==200) {
                            let data=res.data.data
                            this.Shipping=data.shipping
                            this.goods_fee=data.cart_price_info.goods_fee
                            this.total_fee=data.cart_price_info.total_fee
                            // this.getcartInfo()
                        }
                        else if (res.data.code==401) {
                            this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                        }
                    })
            },
            addNewAddress(){//添加地址
                this.showMyaddress=true
                this.buyAdreassState=1
            },
            selectOtherAddresses(){//修改地址
                this.showMyaddress=true
                this.buyAdreassState=2
            },
            handleChange(item) {
                // this.getchangeNum(item)
            },
            lookCoupon(){
                this.discountIsShow = !this.discountIsShow
            },
            lookCouponInOrder(){
                this.discountIsShowTwo = !this.discountIsShowTwo
            }
        }
    }
</script>
<style lang="scss" scoped>
    .pay{
        position: absolute;
        z-index: 9999;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 375px;
        // height: 400px;
    }
    .bcg_div{
        position: fixed;
        z-index: 9990;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #666;
        opacity: .5;
    }
   .place-logo{
       background: #fff;
       div{
           width: 1200px;
           margin: 0 auto;
           text-align: left;
           padding: 10px 0;
           box-sizing: border-box;
           img{
               width: 210px;
               cursor: pointer;
           }
       }
   }
   .place-container{
       width: 1200px;
       margin: 0 auto;
       margin-top: 32px;
       overflow: hidden;
       text-align: left;
       .place-left,.place-right{
           float: left;
       }
       .place-left{
            margin-right: 14px;
            width: 836px;
            position: relative;
            .address /deep/ .address-title,.address /deep/ .add-btn{
                display: none;
            }
            .address /deep/ .address-content{
                width: 470px;
                position: relative;
                left: -10px;
                top: 0;
            }
            .addAdress /deep/ .address-content{
                display: none;
            }
            .editAdress /deep/ .address-content{
                display: block;
            }
            .addAdress /deep/ .add-address{
                display: block;
            }
            .editAdress /deep/ .add-address{
                display: none;
            }
           .shipping-information,.payment-methods,.order-review{
              background: #fff;
              border-radius: 4px;
              padding: 20px 0 30px 24px;
              box-sizing: border-box;
              font-size: 12px;
              .shipping-title,.payment-title,.review-title{
                  p{
                      font-size: 18px;
                      font-weight: bold;
                  }
              }
              .user-name{
                  p{
                    margin-top: 16px;
                    span:first-child{
                        font-size: 16px;
                        font-weight: bold;
                    }
                  }
              }
              .user-address{
                  p{
                      margin-top: 10px;
                  }
              }
              .add-others{
                  margin-top:24px;
                  span{
                      color: #1974A1;
                      font-size: 14px;
                      font-weight: bold;
                      cursor: pointer;
                      margin-right: 32px;
                  }
              }
           }
           .payment-methods,.order-review{
               margin-top: 16px;
               
           }
           .order-review{
               overflow: hidden;
           }
           .payment-methods{
               .select-methods{
                   overflow: hidden;
                   margin-top: 16px;
                   div{
                       float: left;
                   }
                   .cards{
                       text-align: center;
                       border: 2px solid #DEDEDE;
                       padding: 16px 22px;
                       box-sizing: border-box;
                       p:first-child{
                           font-size: 18px;
                           font-weight: bold;
                           margin-bottom: 10px;
                       }
                   }
               }
               .input-card{
                   overflow: hidden;
                   margin-top: 16px;
                   div{
                       width: 344px;
                       height: 216px;
                       border: 1px solid #DEDEDE;
                       background: #F7F7F7;
                       box-sizing: border-box;
                       float: left;
                       margin-right: 24px;
                       padding-left: 22px;
                   }
                   div:first-child{
                       p:nth-child(1){
                           margin-top: 47px;
                           margin-bottom: 6px;
                       }
                       p:nth-child(2){
                           border-bottom: 1px solid #DEDEDE;
                           margin-right: 100px;
                           input{
                               font-size: 24px;
                               color: #999;
                               height: 30px;
                               line-height: 30px;
                               border: none;
                               background: #F7F7F7;
                           }
                       }
                       p:nth-child(3){
                           margin-top: 38px;
                           span{
                               margin-right: 85px;
                           }
                       }
                       p:nth-child(4){
                           margin-top: 10px;
                           input{
                               border: none;
                               font-size: 24px;
                               color: #999;
                               height: 30px;
                               line-height: 30px;
                               border: none;
                               background: #F7F7F7;
                               margin-right: 25px;
                               width: 126px;
                               border-bottom: 1px solid #DEDEDE;
                           }
                           input:last-child{
                               width: 102px;
                           }
                       }
                   }
                   div:last-child{
                       padding: 0;
                       p:nth-child(1){
                           height:54px;
                           background:#F1F1F1;
                           margin-top:28px;
                       }
                       p:nth-child(2){
                           margin-top: 32px;
                           text-align: right;
                           margin-right: 22px;
                       }
                       p:nth-child(3){
                           margin-top: 10px;
                           text-align: right;
                           margin-right: 22px;
                           input{
                               font-size: 24px;
                               color: #999;
                               height: 30px;
                               line-height: 30px;
                               border: none;
                               background: #F7F7F7;
                               width: 60px;
                               border-bottom: 1px solid #DEDEDE;
                           }
                       }
                   }
               }
           }
           .review-container{
               padding-bottom: 20px;
               border-bottom: 1px solid #DEDEDE;
               .order-list{
                   overflow: hidden;
                   margin-top: 24px;
                   .orders-img,.orders-content,.add-btn{
                       float: left;
                   }
                   .orders-img{
                       width: 120px;
                       margin-right: 16px;
                       img{
                           width: 100%;
                           border-radius: 6px;
                       }
                   }
                   .orders-content{
                       width: 536px;
                       p:nth-child(1){
                           height: 40px;
                           line-height: 20px;
                       }
                       p:nth-child(2){
                           margin-top: 6px;
                           span:nth-child(2){
                               color: #666;
                           }
                           img{
                               vertical-align: middle;
                               margin-left: 4px;
                               margin-right: 26px;
                           }
                           span:nth-child(5){
                               color: #666;
                           }
                       }
                       p:nth-child(3){
                           font-size: 14px;
                           font-weight: bold;
                           margin-top: 8px;
                        }
                        .user-msg{
                           font-size: 14px;
                           font-weight: bold;
                           color: #1974A1;
                           margin-top: 8px;
                           span{
                               cursor: pointer;
                           }
                           input{
                               width: 280px;
                               height: 24px;
                               line-height: 24px;
                               border: 1px solid #DEDEDE;
                               padding: 0 6px;
                               box-sizing: border-box;
                           }
                           
                        }
                   }
                   .add-btn{
                       margin-top: 60px;
                   }
                   .add-btn /deep/ .el-input-number{
                       width: 130px;
                   }
               }
           }
            .zar-total{
                float: right;
                position: relative;
                p:nth-child(1),p:nth-child(2){
                    color: #999;
                    font-size: 12px;
                    margin-top: 8px;
                    span:first-child{
                        margin-right: 30px;
                        display: inline-block;
                        width: 70px;
                    }
                    span:last-child{
                        display: inline-block;
                        width: 100px;
                    }
                }
                p:nth-child(3),p:nth-child(4){
                    margin-top: 8px;
                    span:first-child{
                        margin-right: 30px;
                        display: inline-block;
                        width: 70px;
                    }
                    span:last-child{
                        display: inline-block;
                        width: 100px;
                    }
                }
            }
           
       }
   }
.order-summary{
        width: 350px;
        // margin-left: 14px;
        border-radius: 4px;
        padding: 24px 16px 24px 20px;
        box-sizing: border-box;
        position: relative;
        background: #fff;
        .zar-detailes{
            font-size: 12px;
            border-bottom: 1px solid #DEDEDE;
            padding-bottom: 16px;
            p{
                margin-top: 12px;
                span:last-child{
                    float: right;
                }
        }   
    }
    .alldis{
        top:140px;
        left: 0px;
    }
     .total{
                margin-top: 16px;
                font-size: 12px;
                p:first-child{
                    font-size: 16px;
                    font-weight: bold;
                    span:last-child{
                        float: right;
                    }
                }
                p:nth-child(2){
                    margin-top: 32px;
                    span{
                        width: 314px;
                        height: 44px;
                        display: inline-block;
                        cursor: pointer;
                        text-align: center;
                        line-height: 44px;
                        color: #fff;
                        font-size: 16px;
                        background: #FFB610;
                        border-radius: 8px;
                    }
                }
                p:last-child{
                    text-align: right;
                    margin-top: 16px;
                    color: #666;
                    span{
                        margin-left: 10px;
                    }
                }
            }
}

.alldis{
        position: absolute;
        top: -368px;
        left: -144px;
        width: 350px;
        height: 412px;
        border: 1px solid #DEDEDE;
        background-color: #fff;
        padding-top: 18px;
        z-index: 100;
        box-sizing: border-box;
        overflow: hidden;
        .listConter{
            height: 402px;
            overflow: hidden;
            overflow-y: scroll;
        }
        .listConter::-webkit-scrollbar{
            width: 1px;
        }
        .listConter::-webkit-scrollbar-thumb{
            border-radius: 10px;
            background: rgba(0,0,0,0.2);
        }
        li{
            width: 346px;
            height: 88px;
            // margin-left: 18px;
            margin-top: 10px;
            div:first-child{
                float: left;
                p{
                    margin-left: 24px;
                    color: #fff;
                    font-size: 12px;
                    margin-top: 6px;
                }
                p:nth-child(1){
                    margin-top: 14px;
                    font-size: 18px;
                    font-weight: bold;
                }
                p:nth-child(2){
                    font-size: 14px;
                }
                p:nth-child(3){
                    width: 194px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                }
            }
            div:last-child{
                float: right;
                margin-top: 30px;
                margin-right: 14px;
                button{
                    width: 80px;
                    height: 32px;
                    border-radius: 24px;
                    background-color: #fff;
                    font-size: 16px;
                    cursor: pointer;                       
                }
                .added{
                    background-color: #ededed;
                    color: #D0CFCE;
                    background-color: #F2F2F2;
                    pointer-events:none;
                }
            }
    }
}
.usernew{
    background: url("../assets/images/new.png") no-repeat;
    border-bottom: 1px solid #dedede;
    padding-bottom: 10px;
}
.userold{
    background: url("../assets/images/old.png") no-repeat;
}
</style>