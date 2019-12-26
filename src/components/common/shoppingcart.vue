<template>
  <div class="cart-container">
      <div class="cart-left">
          <div class="cart-title">
                <p class="title-p">Shopping Cart ({{ $store.state.shopingcarnum }})</p>
                <div class="content-container" v-if="cartlist.length==0" style="text-align: center;">
                    <div style="line-height: 120px;height: 120px;font-weight: 600;font-size: 18px;">Your Shopping Cart is empty</div>
                    <router-link to="home" tag="div" style="height: 30px;cursor: pointer;color: #FFB610;">Don't miss out on great deals! Start shopping</router-link>
                </div>
                <el-checkbox :indeterminate="isIndeterminate" @change="handleCheckAllChange" class="select-all" v-model="checkAll" v-if="cartlist.length>0">Select all</el-checkbox>
                <div style="height:20px;background:#fafafa;"></div>
                <div class="content-container" v-if="cartlist.length>0">
                    <el-checkbox-group v-model="item.checkedCities" @change="handleCheckedCitiesChange(item,index)"  v-for="(item,index) in cartlist" :key="index">
                        <div class="cart-border">
                            <el-checkbox :label="item">
                                <span></span>
                            </el-checkbox>
                            <div class="cart-content">
                                    <div>
                                        <img :src="item.imgUrl" alt="" style="width:120px;height:120px;display:block;">
                                    </div>
                                    <div>
                                        <p>{{ item.goods_name }}</p>
                                        <p>{{ item.spec_key_name }}</p>
                                        <p>R {{ item.goods_price }}</p>
                                    </div>
                                    <div>
                                        <p>
                                            <!-- <span>
                                                <i class="icon-xihuan iconfont" @click="getaddGoodsCollect(item.goods_id)"></i>    
                                            </span> -->
                                            <span>
                                                <i class="icon-shanchu iconfont" @click="deleteCart(item)"></i>
                                            </span>
                                        </p>
                                        <p>
                                            <el-input-number v-model="item.userQuabity" @change="handleChange(item)" :min="1"></el-input-number>
                                        </p>
                                    </div>
                                </div>
                        </div>  
                    </el-checkbox-group>
                </div>
          </div>
          <div style="height:20px;background:#fafafa;"></div>
          <div class="more-love">
              <div style="font-size:20px;font-weight:bold;padding:18px 24px;box-sizing:border-box;">More to Love</div>
              <div class="carousel-recommend">
                  <el-carousel trigger="click" :interval="4000" arrow="always">
                        <el-carousel-item v-for="(item,index) in goodsTopData" :key="index">
                            <div class="carousel-imgs-container">
                                <div class="carousel-imgs" v-for="(item, index) in goodsTopData" :key="index">
                                    <div class="carousel-images-top" @click="toProductdetails(item.goods_id)">
                                        <img :src="item.original_img" style="width:168px;height:168px;display:block;">
                                    </div>
                                    <div>
                                       <div class="carousel-zar-price">
                                            <span>R {{ item.shop_price }}</span>
                                        </div>
                                        <div class="carousel-star">
                                            <span><i class="el-icon-star-on"></i></span>
                                            <span>{{ item.goods_rate }}</span>
                                            <span>{{ item.collect_sum }} Sold</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
              </div>
          </div>
      </div>
      <div class="cart-right">
          <div style="font-size:24px;font-weight:bold;">Order Summary</div>
          <div class="zar-detailes">
              <p>
                  <span>Subtotal:</span>
                  <span>R {{ goods_fee }}</span>
              </p>
              <p>
                  <span>Shipping:</span>
                  <span>{{ Shipping }}</span>
              </p>
              <!-- <p>
                  <span>Shipping Saved:</span>
                  <span style="color:#FF3308">- R 2</span>
              </p>
              <p>
                  <span>BilliMall Coupon:</span>
                  <span style="float:right;margin-left:8px;cursor: pointer;color:#333;" @click="lookCoupon">
                      <i class="el-icon-arrow-down" style="font-size:14px;" v-if="!discountIsShow"></i>
                      <i class="el-icon-arrow-up" style="font-size:14px;" v-else></i>
                    </span>
                  <span style="color:#FF3308;">- R 20</span>
              </p> -->
                <!-- <div class="alldis" v-show="discountIsShow">
                        <div class="listConter">
                            <ul>
                            <li :class="{usernew:isNewUser,userold:!isNewUser}">
                                <div>
                                    <p>ZAR 10.00</p>
                                    <p>Orders over ZAR 50.00</p>
                                    <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                </div>
                                <div>
                                    <button :class="{added:!isAdded}">GET</button>
                                </div>
                            </li>
                            <li :class="{userold:isNewUser,added:isAdded}">
                                <div>
                                    <p>ZAR 10.00</p>
                                    <p>Orders over ZAR 50.00</p>
                                    <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                </div>
                                <div>
                                    <button :class="{added:isAdded}">Added</button>
                                </div>
                            </li>
                            <li :class="{userold:isNewUser,added:isAdded}">
                                <div>
                                    <p>ZAR 10.00</p>
                                    <p>Orders over ZAR 50.00</p>
                                    <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                </div>
                                <div>
                                    <button :class="{added:isAdded}">Added</button>
                                </div>
                            </li>
                            <li :class="{userold:isNewUser,added:isAdded}">
                                <div>
                                    <p>ZAR 10.00</p>
                                    <p>Orders over ZAR 50.00</p>
                                    <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                </div>
                                <div>
                                    <button :class="{added:isAdded}">Added</button>
                                </div>
                            </li>
                            <li :class="{userold:isNewUser,added:isAdded}">
                                <div>
                                    <p>ZAR 10.00</p>
                                    <p>Orders over ZAR 50.00</p>
                                    <p>2019/07/22 00:00 to 2019/07/25 00:00</p>
                                </div>
                                <div>
                                    <button :class="{added:isAdded}">Added</button>
                                </div>
                            </li>
                            <li :class="{userold:isNewUser,added:isAdded}">
                                <div>
                                    <p>ZAR 10.00</p>
                                    <p>Orders over ZAR 50.00</p>
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
          <div>
              <div class="total">
                  <p>
                      <span>Total</span>
                      <span>R {{ total_fee }}</span>
                  </p>
                  <p @click="toPlaceOrder()">
                      <span class="buy-btn">BUY</span>
                  </p>
                  <p>
                      <span><i class="el-icon-info"></i></span>
                      <span>Full R 500 free shipping</span>
                  </p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
    import api from '@/api'
    export default {
        data(){
            return{
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true,
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
                discountIsShow:false,
                isNewUser:true,
                isAdded:true,
                cartlist:[],
                Shipping: 0,//运费
                goods_fee: 0,//货物单价
                goods_num: null,//货物总数量
                total_fee: 0,//费用合计
                allSelete:null,
                isAllSelete:null,
                cart_ids:"",
                goodsTopData:[]
            }
        },
        created(){
            this.getcartVal()
            this.getgoodsTop()
        },
        methods:{
            getgoodsTop(){//推荐商品
                let params = {
                    limit:4,
                }
                this.axios.post(api.goodsTop, params)
                    .then(res => {
                        if (res.data.code==200) {
                            let data=res.data.data
                            this.goodsTopData=data
                        }
                    })
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
                            this.getcartVal()
                        }
                        else if (res.data.code==401) {
                            this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                        }
                    })
            },
            getcartVal(){//获取购物车数据
                this.getcart().then((data)=>{
                    let cartNum=0
                    this.cartlist=[]
                    if (data.length==0) {
                        this.$store.commit("shopingcarnum",0)
                        return
                    }
                    if (data.cartlist.length) {
                        this.Shipping=data.shipping
                        this.goods_fee=data.cart_price_info.goods_fee
                        this.total_fee=data.cart_price_info.total_fee
                        let checkedCities=[]
                        data.cartlist.forEach(item => {
                            item.userQuabity=item.goods_num*1
                            item.checkedCities=[]
                            if (item.selected==1) {
                                checkedCities.push(item)
                            }
                            // item.selected==1 ? item.checkedCities=[] :item.checkedCities=[]
                            cartNum=cartNum+item.goods_num*1
                        });
                        data.cartlist.forEach(item => {
                            if (item.selected==1) {
                                item.checkedCities=checkedCities
                            }
                        });
                        this.cartlist=data.cartlist
                        this.$store.commit("shopingcarnum",cartNum)
                    }
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
            deleteCart(itemData){//删除购物车
                let  params = {
                    cart_id :itemData.id*1
                }
                this.axios.post(api.deleteCart, params)
                    .then(res => {
                        if (res.data.code==200) {
                            let data=res.data.data
                            this.Shipping=data.shipping
                            this.goods_fee=data.cart_price_info.goods_fee
                            this.total_fee=data.cart_price_info.total_fee
                            this.getcartVal()
                        }
                        else if (res.data.code==401) {
                            this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                        }
                    })
            },
            getselectCart(isAllSelete,itemData,index){//选择购物车商品
                // cartlist [{"id":"17722","selected":"0"},{"id":"17723","selected":"1"}]
                let cartlist=[]
                if (isAllSelete) {
                    if (this.allSelete) {
                        this.cartlist.forEach(item => {
                            var goods={"id":item.id*1,"selected":1}
                            cartlist.push(goods)
                        });
                    }else{
                        this.cartlist.forEach(item => {
                            var goods={"id":item.id*1,"selected":0}
                            cartlist.push(goods)
                        });
                    }
                }else{
                    if (itemData.selected==1) {
                        var goods={"id":itemData.id*1,"selected":0}
                    }else{
                        var goods={"id":itemData.id*1,"selected":1}
                    }
                    cartlist.push(goods)
                }
                let  params = {
                    cartlist
                }
                this.axios.post(api.selectCart, params)
                    .then(res => {
                        if (res.data.code==200) {
                            let data=res.data.data
                            this.Shipping=data.shipping
                            this.goods_fee=data.cart_price_info.goods_fee
                            this.total_fee=data.cart_price_info.total_fee
                            data.cartlist.forEach(item => {
                                item.userQuabity=item.goods_num*1
                            });
                            this.cartlist=data.cartlist
                            // this.getcartVal()
                        }
                        else if (res.data.code==401) {
                            this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                        }
                    })
            },
            handleCheckAllChange(val) {
                this.allSelete=val
                this.getselectCart(true)
                this.cartlist.forEach(item => {
                    item.checkedCities=val ? this.cartlist : [];
                });
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value,index) {
                this.getselectCart(false,value,index)
                let checkedCount = value.checkedCities.length;
                // let checkedCount = value;
                this.checkAll = checkedCount === this.cartlist.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cartlist.length;
            },
            handleChange(item) {
                this.getchangeNum(item)
            },
            lookCoupon(){
                this.discountIsShow = !this.discountIsShow
            },
            getaddGoodsCollect(goods_id){//用户收藏
                let params = {
                    "type":1,
                    "goods_id":goods_id,
                }
                this.axios.post(api.addGoodsCollect, params)
                    .then(res => {
                        if(res.data.code==200){
                            this.$message({
                                showClose: true,
                                message: res.data.message,
                                type: 'success'
                            });
                            this.getcartVal()
                        }
                    })
            },
            toPlaceOrder(){
                let data=this.cartlist
                let havaShop=[]
                data.forEach(item => {
                    if (item.selected==1) {
                        havaShop.push(true)
                    }else{
                        havaShop.push(false)
                    }
                });
                let havaShopState=havaShop.some((val)=>{
                    return val==true
                })
                if (havaShopState==false) {
                    this.$message({
                        showClose: true,
                        message: "Please choose to buy"
                    });
                    return
                }else{
                    let cart_ids=""
                    data.forEach(item => {
                        if (item.selected==1) {
                            cart_ids=cart_ids+item.id+","
                        }
                    });
                    this.cart_ids=cart_ids.substring(0, cart_ids.length -1)
                    this.$router.push({ name: 'PlaceOrder', params: { "cartListData":this.cart_ids }})
                }
            },
            toProductdetails(data){
                this.$router.push({ name: 'productdetails', params: { "goods_id":data }})
            },
        }
    }
</script>

<style lang="scss" scoped>
    .cart-container{
        overflow: hidden;
        text-align: left;
        .cart-left,.cart-right{
            float: left;
            width: 836px;
            background: #fff;
            box-sizing: border-box;
        }
        .cart-right{
            width: 350px;
            margin-left: 14px;
            border-radius: 4px;
            padding: 24px 16px 24px 20px;
            box-sizing: border-box;
            position: relative;
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
                .alldis{
                    position: absolute;
                    top: 164px;
                    left: 0px;
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
            .usernew{
                background: url("../../assets/images/new.png") no-repeat;
                border-bottom: 1px solid #dedede;
                padding-bottom: 10px;
            }
            .userold{
                background: url("../../assets/images/old.png") no-repeat;
            }
        }
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
        .cart-title{
            .title-p{
                font-size: 24px;
                font-weight: bold;
                margin: 24px 0 20px 24px;
            }
            .select-all{
                margin-left: 24px;
                font-size: 14px;
                margin-bottom: 30px;
            }
        }
        .content-container /deep/ .el-checkbox-group{
            font-size: 12px;
        }
        .content-container .el-checkbox{
            bottom: 76px;
            margin: 0;
        }
        .cart-border{
            border-bottom: 1px solid #DEDEDE;
            margin-left: 24px;
            margin-right: 24px;
            text-align: left;
        }
        .cart-border:last-child{
            border: none;
        }
        .cart-content{
            color: #333;
            overflow: hidden;
            display: inline-block;
            padding: 32px 0 16px 0;
            box-sizing: border-box;
            width: 764px;
            div{
                float: left;
            }
            div:nth-child(1){
                width: 120px;
                img{
                    width: 100%;
                    border-radius: 4px;
                }
            }
             div:nth-child(2){
                width: 453px;
                margin-left: 14px;
                p:nth-child(1){
                    height: 34px;
                    line-height: 17px;
                    overflow: hidden;
                    margin-bottom: 12px;
                }
                p:nth-child(2){
                    font-weight: bold;
                    margin-bottom: 12px;
                }
                p:nth-child(3){
                    font-weight: bold;
                    font-size: 16px;
                }
            }
             div:nth-child(3){       
                 float: right;    
                text-align: right;
                p:nth-child(1){
                    margin-bottom: 28px;
                    span{
                        cursor: pointer;
                        margin-left: 24px;
                        i{
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }
    .carousel-recommend{
        width: 836px;
        padding-bottom: 40px;
        & /deep/ .el-carousel__indicators{
            display: none;
        }
        & /deep/ .el-carousel__container{
            height: 220px;
    }
    .el-carousel{
        background-color: #fff;
        img{
            width: 25%;
        }
        & /deep/ .el-carousel__arrow{
            width: 24px;
            height: 24px;
        }
    }
    .carousel-zar-price{
        font-size: 14px;
        font-weight: bold;
        margin-top: 10px;
    }
    .carousel-star{
        margin-top: 10px;
        color: #666;
        span:nth-child(1){
            color: #FF3308;
            margin-right: 4px;
            i{
                font-size: 14px;
            }
        }
        span:nth-child(3){
            float: right;
            margin-right: 16px;
        }
    }
    .carousel-imgs-container{
        margin-left: 48px;
    }
    .carousel-imgs{
        float: left;
        width: 168px;
        margin: 0 9px;
        background: #fff;
        font-size: 12px;
        text-align: left;  
        img{
            width: 100%;
            border-radius: 6px;
            cursor: pointer;
        }
    }
}
</style>