<template>

<!-- 商品详情页用户选择规格组件 -->

    <div class="specification">
        <div class="title">{{ goods_name }}</div>
        <div class="star">
            <div>
                <el-rate v-model="commect_score" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
            </div>
            <div>
                <span>{{ sumComment }} Reviews</span>
                <span>{{ sales_sum }} Orders</span>
            </div>
        </div>
        <div class="sale">
            <span>R {{ shop_price }}</span>
            <span>R {{ market_price }}</span>
            <span>{{ off }}% off</span>
        </div>
        <div class="qrcodediv">
            <span @mouseenter="qrcodeshow(true)" @mouseleave="qrcodehidden(false)">Buy on mobile phone {{ off }}%off</span>
            <div v-show="qrcodestatus" @mouseenter="qrcodeshow(true)" @mouseleave="qrcodehidden(false)" class="showqrcode">
                <h5>BilliMall Mobile App</h5>
                <Qrcode></Qrcode>
            </div>
        </div>
        <div class="flashdeals" v-show="false">
            <div>
                <p>Ends in</p>
                <p><span>2</span> Days</p>
            </div>
            <div style="width: 60px;margin-right: 22px;margin-top: 17px;">
                <p>Limited Time Only</p>
            </div>
            <div style="width: 60px;margin-right: 58px;margin-top: 17px;">
                <p>30-Day</p>
                <p>Best Price</p>
            </div>
        </div>
        <div class="discount">
            <div class="newuser" @click="discountShow">R 20 New User Coupon</div>
            <div class="per" @click="discountShow">R 20 off per R 50</div>
            <div class="getbtn" @click="discountShow">Get Coupons</div>
            <div class="alldis" v-show="discountIsShow">
                <div class="listConter" v-if="coupos_listarr[0]">
                    <ul>
                        <!-- <li :class="{usernew:isNewUser,userold:!isNewUser}" v-for="(item, index) in coupos_listarr[0]" :key="index">
                            <div>
                                <p>R {{ item.coupon_money }}</p>
                                <p>Orders over R {{ item.coupon_condition }}</p>
                                <p>{{ item.use_start_time }} to {{ item.use_end_time }}</p>
                            </div>
                            <div>
                                <button :class="{added:!isAdded}">GET</button>
                            </div>
                        </li> -->
                        <li :class="{userold:isNewUser,added:isAdded}" v-for="(item, index) in coupos_listarr[0]" :key="index">
                            <div>
                                <p>R {{ item.coupon_money }}</p>
                                <p>Orders over R {{ item.coupon_condition }}</p>
                                <p>{{ item.use_start_time }} to {{ item.use_end_time }}</p>
                            </div>
                            <div>
                                <button :class="[item.is_collect==0 ? '' : 'added']" @click="getadded(item, index)">{{ item.is_collect==0 ? "GET" : "Added" }}</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="productColor" v-if="iscolor_attributes_arr.length!=0">
            <div>{{ name_en }}: <span style="color:#666;">{{ userColor }}</span></div>
            <div>
                <ul>
                    <li v-for="(item,index) in colors" :key="index"><img :src="item.url" @click="whichColor(index,$event,item.color)" :class="{activeColor:index == currentColor}"></li>
                </ul>
            </div>
        </div>
        <div v-for="(attr,index) in notcolor_attributes_arr" :key="index">
            <div class="productSize">
                <div class="sizeTitle">
                    <div>{{ attr.specs.name_en }}: <span style="color:#666;" v-for="(item,index) in attr" :key="item.item_id" v-show="index == attr.currentSize">{{ item.item_name }}</span></div>
                    <!-- <div>{{ attr.specs.name_en }} Guide</div> -->
                </div>
                <div class="sizeConter">
                    <ul>
                        <li v-for="(item,index) in attr" :key="item.item_id" @click="whichSize(item,attr,$event
                        )" :class="{activeSize:index == attr.currentSize}">{{item.item_name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="quanity">
            <div>Quanity:</div>
            <div>
                <el-input-number v-model="userQuabity" @change="changeuserQuabity" :min="1" :max="100"></el-input-number>
            </div>
        </div>
        <div class="shipping">
            <span>Shipping: </span>
            <span>{{ shipping_price }}</span>
            <span>{{ shipping_delivery }}</span>
            <span> <i class="el-icon-question"></i></span>
        </div>
        <div class="alertSelect" v-show="isClose">
            <div class="hint">
                <div>Please select the commodity information you want.</div>
                <div class="closeAlert" @click="closeAlert()"> <i class="el-icon-close"></i></div>
            </div>
            <div class="productColor" v-if="iscolor_attributes_arr.length!=0">
                <div>{{ name_en }}: <span style="color:#666;">{{ userColor1 }}</span></div>
                <div>
                    <ul>
                        <li v-for="(item,index) in iscolor_attributes_arr" :key="index"><img :src="item.url" @click="whichColor(index,$event,item.color)" :class="{activeColor:index == currentColor}"></li>
                    </ul>
                </div>
            </div>
            <div v-for="(attr,index) in notcolor_attributes_arr" :key="index">
                <div class="productSize">
                    <div class="sizeTitle">
                        <!-- <div>{{ attr.specs.name_en }}: <span style="color:#666;" v-for="(item,index) in attr" :key="item.item_id" v-show="index == attr.currentSize">{{ item.item_name }}</span></div> -->
                        <div>{{ attr.specs.name_en }}: <span style="color:#666;display:none">{{ userSize }}</span></div>
                        <!-- <div>{{ attr.specs.name_en }} Guide</div> -->
                    </div>
                    <div class="sizeConter">
                        <ul>
                            <li v-for="(item,index) in attr" :key="item.item_id" @click="whichSize(item,attr,$event
                        )" :class="{activeSize:index == attr.currentSize}">{{item.item_name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="quanity">
                <div>Quanity:</div>
                <div>
                    <el-input-number v-model="userQuabity" @change="changeuserQuabity" :min="1" :max="100"></el-input-number>
                </div>
            </div>
            <div class="shipping">
                <span>Shipping: </span>
                <span>{{ shipping_price }}</span>
                <span>{{ shipping_delivery }}</span>
                <span> <i class="el-icon-question"></i></span>
            </div>
            <div class="okBtn">
                <div  @click="closeAlert(true)">ok</div>
            </div>
        </div>
        <div class="buyBtns">
            <div class="buyNow" @click="buyNows()">Buy Now</div>
            <div class="addCat" @click="addCat()">Add To Cart</div>
            <div class="addWish" @click="addedWish" v-if="wishIsShow"> 
                <span><i class="iconfont icon-xihuan"></i></span>
                <span>Add to Wish List</span>
            </div>
            <div class="addedWish" v-else @click="addedWish">
                <span><i class="iconfont icon-aixin"></i> </span>
                <span>{{ wish_count }}</span>
            </div>
        </div>
        <div class="safeReture">
            <div class="safe">
                <div><img src="@/assets/images/safe.png" alt=""></div>
                <div>
                    <p>{{ shipping_return }}</p>
                    <p>Money back guarantee</p>
                </div>
            </div>
            <div class="returns">
                 <div><img src="@/assets/images/return.png" alt=""></div>
                <div>
                    <p>Local Return</p>
                    <p>Return for any reason within 15 days</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '@/api'
    import Qrcode from '@/components/common/qrcode'
    export default{
        name:'specification',
        components: {
            Qrcode
        },
        props:["goodsInfoval"],
        data(){
            return{
                isNewUser:true,
                isAdded:true,
                discountIsShow:false,
                currentColor:null,
                currentSize:null,
                wishIsShow:true,//添加收藏显示隐藏
                colors:[//商品属性尺码
                    // {url:require("@/assets/images/2.jpg"),color:"blue"},
                ],
                sizes:[],
                userSpecification:{
                    quabity:0
                } ,
                userColor:null,
                userColor1:"",
                name_en:"",
                userSize:"",
                goodsInfovalData:{},
                goods_id:"",//商品ID
                attrsku:[],//选中的商品属性
                userQuabity:1,//按钮默认数量
                isClose:false,
                qrcodestatus:false,
                goodsInfodata:{},////商品详情数据 
                goods_name:'',//商品名称,
                commect_score:5,//评论分值
                sumComment:0,//评论总数	
                sales_sum:0,//售出数量 订单
                market_price:0,//原价
                shop_price:0,//售卖价	
                off:0,//折扣
                coupos_listdata:[],//优惠券列表
                coupos_listarr:[],
                coupons:{//优惠券
                    coupon_money:'',//优惠券金额
                    coupon_condition:'',//使用条件
                    use_end_time:'',//结束时间
                    use_start_time:'',//使用时间
                    is_collect:0//是否领取0未领取，1领取
                },
                shipping_delivery:"",//送货服务
                shipping_price:"",//运费价格
                shipping_return:0,//买家保护
                is_wish:0,//是否收藏，0否，1是
                wish_count:0,//心愿数
                specs:{},//属性
                attributes:{},//属性值
                iscolor_attributes_arr:[],
                notcolor_attributes_arr:[],
            }
        },
        watch: {
            goodsInfoval(val){
                this.goodsInfovalData=val
                this.renderGoodsInfoaction(val)
            }
        },
        created () {
            // this.rendercoupos_list()
        },
        methods:{
            getGoodsInfoactionVal(){
                this.getgoodsInfoaction().then((data) =>{
                    this.renderGoodsInfoaction(data)
                })
            },
            getgoodsInfoaction(){//获取商品详情
                let params = {
                    "goods_id":this.goods_id
                }
                return new Promise((resolve)=>{
                    this.axios.post(api.goodsInfo, params)
                        .then(res => {
                            if(res.data.code==200){
                                resolve(res.data.data)
                            }
                        })
                })
            },
            renderGoodsInfoaction(data){
                this.goodsInfodata=data;
                if (data) {
                    this.goods_id=data.goodsinfo.goods_id
                    this.goods_name=data.goodsinfo.goods_name
                    this.commect_score=(data.commect_score/100*5).toFixed(1)*1
                    this.sumComment=data.comment.sumComment*1
                    this.sales_sum=data.goodsinfo.sales_sum*1
                    this.market_price=data.goodsinfo.market_price*1
                    this.shop_price=data.goodsinfo.shop_price*1
                    this.off=data.goodsinfo.off*1
                    this.coupons=data.coupons
                    this.shipping_delivery=data.goodsinfo.shipping_delivery
                    this.shipping_price=data.goodsinfo.shipping_price
                    this.shipping_return=data.goodsinfo.shipping_return
                    this.is_wish=data.goodsinfo.is_wish
                    this.is_wish ? this.is_wish=1 : this.is_wish=0
                    if (this.is_wish==0) {
                        this.wishIsShow=true
                    }else if (this.is_wish==1) {
                        this.wishIsShow=false
                    }
                    this.wish_count=data.goodsinfo.wish_count
                    this.specs=data.goodsinfo.specs
                    this.attributes=data.goodsinfo.attributes
                    this.iscolor_attributes_arr=[]
                    this.notcolor_attributes_arr=[]
                    this.colors=[]
                    for (const key in data.goodsinfo.specs) {
                        let arr=[]
                        for (const index in data.goodsinfo.attributes[key]) {
                            if (data.goodsinfo.attributes[key][index].image_src!="") {
                                arr.push(true)
                            }else{
                                arr.push(false)
                            }
                        }
                        let isColorAttr=arr.some((v)=>{
                            return v==true
                        })
                        if (isColorAttr==true) {
                            for (const index in data.goodsinfo.attributes[key]) {
                                this.colors.push({url:data.goodsinfo.attributes[key][index].image_src,color:data.goodsinfo.attributes[key][index].item_name})
                                this.iscolor_attributes_arr.push(data.goodsinfo.attributes[key][index].image_src)
                            }
                            data.goodsinfo.attributes[key].specs=data.goodsinfo.specs[key]
                            this.name_en=data.goodsinfo.specs[key].name_en
                        }else{
                            for (const index in data.goodsinfo.attributes[key]) {
                                if (data.goodsinfo.attributes[key][index].item_name) {
                                    this.sizes.push(data.goodsinfo.attributes[key][index].item_name)
                                }
                            }
                            data.goodsinfo.attributes[key].specs=data.goodsinfo.specs[key]
                            data.goodsinfo.attributes[key].currentSize=0
                            this.notcolor_attributes_arr.push(data.goodsinfo.attributes[key])
                        }
                    }
                }
            },
            rendercoupos_list(){//红包列表渲染
                this.getcoupos_list().then(()=>{
                    this.$nextTick(()=>{
                        for (const key in this.coupos_listdata) {
                            this.coupos_listarr.push(this.coupos_listdata[key])
                        }
                    })
                })
            },
            getcoupos_list(){//获取红包列表
                let params = {
                    "page":"1"
                }
                return new Promise((resolve)=>{
                    this.axios.post(api.coupos_list, params)
                        .then(response => {
                            if(response.status==200){
                                this.coupos_listdata=response.data.data
                                resolve()
                            }
                        })
                })
            },
            getadded(item,index){//领取优惠券
                alert("接口未调试")
                return
                console.log(item,index);
                let params = {
                    "cId":item.cid,
                    "type":item.coupon_type,
                }
                this.axios.post(api.get_coupons, params)
                    .then(response => {
                        if(response.status==200){
                            console.log(response.data.data);
                        }
                    })
            },
            discountShow(){
                return
                this.discountIsShow = !this.discountIsShow;
            },
            whichColor(index,ev,color){
                this.currentColor = index;
                this.userColor = color;
                this.userColor1 = color;
            },
            whichSize(item,attr,$ev){
                if (item) {
                    attr.currentSize=item.item_id
                    this.currentSize = item.item_id;
                    // this.userSize = item.item_name;
                    this.userSize = item.item_name;
                }
            },
            changeuserQuabity(value) {
                this.userQuabity = value;
                this.userSpecification.quabity = value;
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
                            this.getGoodsInfoactionVal()
                            this.is_wish=1
                            this.is_wish=1 ? this.wishIsShow=false : this.wishIsShow=true
                        }
                    })
            },
            getcancelGoodsCollect(goods_id){//用户取消收藏
                let params = {
                    "type":0,
                    "goods_id":goods_id,
                }
                this.axios.post(api.cancelGoodsCollect, params)
                    .then(res => {
                        if(res.data.code==200){
                            this.$message({
                                showClose: true,
                                message: res.data.message,
                                type: 'success'
                            });
                            this.getGoodsInfoactionVal()
                            this.is_wish=0
                            this.is_wish=0 ? this.wishIsShow=true : this.wishIsShow=false
                        }
                    })
            },
            addedWish(){
                this.is_wish ? this.is_wish=1 : this.is_wish=0
                if (this.is_wish==1) {
                    this.getcancelGoodsCollect(this.goods_id)
                }else if (this.is_wish==0) {
                    this.getaddGoodsCollect(this.goods_id)
                }
            },
            buyNows(){
                if (this.userColor==null&&this.colors.length>0) {
                    this.$message({
                        showClose: true,
                        message: "Please select product properties",
                        type: 'warning'
                    });
                    return
                }
                if(this.userColor && this.userSize && this.userQuabity !=0){
                    this.isClose = !this.isClose;
                }else{
                    this.isClose = !this.isClose;
                }
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
                        })
                })
            },
            attrskufcn(){
                if (this.notcolor_attributes_arr.length>0) {
                    this.notcolor_attributes_arr.forEach(item => {
                        if (item.currentSize==0) {
                            this.$message({
                                showClose: true,
                                message: "Please select "+item.specs.name_en+ " attribute",
                                type: 'warning'
                            });
                            return
                        }
                    });
                }
                let attr={}
                this.attrsku=""
                this.notcolor_attributes_arr.forEach(item => {
                    var name_en=item.specs.name_en
                    var item_name=item[item.currentSize].item_name
                    if (name_en&&item[item.currentSize].item_name) {
                        attr[name_en]=item[item.currentSize].item_name
                        this.attrsku=this.attrsku+name_en+":"+item_name+","
                    }
                });
                this.attrsku=this.attrsku.slice(0,this.attrsku.length-1)
                if (this.colors.length>0) {
                    this.colors.forEach(coo => {
                        if (coo.color==this.userColor) {
                            this.attrsku=this.attrsku+","+this.name_en+":"+this.userColor
                        }
                    });
                }
            },
            addCat(){//添加购物车
                if (this.userColor==null&&this.colors.length>0) {
                    this.$message({
                        showClose: true,
                        message: "Please select product properties",
                        type: 'warning'
                    });
                    return
                }
                // this.$store.commit("shopingcarnum",this.userQuabity)
                this.attrskufcn()
                let params = {
                    goods_id:this.goods_id*1,
                    goods_num:this.userQuabity,
                    attrsku:this.attrsku
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
            closeAlert(isBuyNow){
                this.isClose = !this.isClose;
                if (isBuyNow) {
                    this.attrskufcn()
                    let params={
                        goods_id:this.goods_id,
                        goods_num:this.userQuabity,
                        attrsku:this.attrsku,
                        action:"buy_now",
                        cart_ids:""
                    }
                    // console.log(this.goods_id,this.userQuabity,this.attrsku,params);
                    this.$router.push({ name: 'PlaceOrder', params: { "buyNow":JSON.stringify(params) }})
                }
            },
            changeIsClose(flag){
                this.isClose = flag;
            },
            qrcodeshow(status){
                this.qrcodestatus=status
            },
            qrcodehidden(status){
                this.qrcodestatus=status
            }
        }
    }
</script>
<style lang="scss" scoped>
.specification{
    width: 566px;
    float: left;
    margin-left: 14px;
    text-align: left;
    color: #333;
    position: relative;
    .alertSelect{
        padding-bottom: 10px;
        background-color: #fff;
        position: absolute;
        width: 590px;
        min-height: 470px;
        border: 1px solid #FF3308;
        top: 150px;
        left: 0;
        z-index: 900;
        box-sizing: border-box;
        .productColor,.productSize,.quanity,.shipping{
            margin-left: 11px;
        }
        .hint{
            height: 28px;
            color: #FA0000;
            font-size: 12px;
            background-color: #FBBDB1;
            line-height: 28px;
            overflow: hidden;
            div{
                float: left;
                margin-left: 11px;
            }
            .closeAlert{
                width: 16px;
                height: 16px;
                cursor: pointer;
                float: right;
                margin-right: 12px;
            }
        }
        .okBtn{
            div{
                width: 80px;
                height: 42px;
                color: #fff;
                font-size: 14px;
                line-height: 42px;
                border-radius: 6px;
                background-color: #FEB610;
                font-weight: bold;
                text-align: center;
                cursor: pointer;
                margin-top: 24px;
                margin-left: 11px;
            }
        }
    }
    .title{
        font-size: 16px;
    }
    .star{
        margin-top: 9px;
        overflow: hidden;
        div{
            float: left;
            margin-right: 24px;
            font-size: 14px;
            span{
                margin-right: 8px;
            }
        }
    }
    .sale{
        margin-top: 26px;
        height: 28px;
        span:first-child{
            font-size: 24px;
            font-weight: bold;
        }
        span:nth-child(2){
            font-size: 14px;
            color: #666;
            margin-left: 12px;
            margin-right: 24px;
            line-height: 28px;
            vertical-align: top;
            text-decoration: line-through;
        }
        span:nth-child(3){
            width: 56px;
            height: 20px;
            display: inline-block;
            font-size: 12px;
            color: #FF3308;
            position: relative;
            line-height: 20px;
            top: -5px;
            text-align: center;
            background-color: #FEE5E1;
            border: 1px solid #F45151;
        }
    }
    .qrcodediv{
        margin-top: 8px;
        position: relative;
        span{
            cursor: pointer;
            height:16px;
            font-size:12px;
            font-family:Helvetica;
            color:rgba(153,153,153,1);
            line-height:16px;
            &:hover{
                color: #FF3308;
            }
        }
        .showqrcode{
            width: 242px;
            position: absolute;
            z-index: 901;
            left: 0;
            top: 14px;
            background:rgba(255,255,255,1);
            cursor: pointer;
            h5{
                height:19px;
                font-size:16px;
                font-family:HelveticaNeue;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:19px;
                text-align: center;
                margin-top: 32px;
                margin-bottom: 12px;
            }
            .qrCode{
                margin-bottom: 22px;
            }
        }
    }
    .flashdeals{
        height: 64px;
        margin-top: 20px;
        background: url("../../assets/images/flashdeals.png") no-repeat;
        div{
            float: right;
            color: #fff;
            font-size: 12px;
            margin-top: 13px;
            margin-right: 48px;
            p{
                margin-bottom: 5px;
            }
            span{
                display: inline-block;
                width: 16px;
                height: 20px;
                font-size: 14px;
                line-height: 20px;
                text-align: center;
                color: #333;
                background-color: #fff;
            }
        }
    }
    .discount{
        height: 40px;
        border-bottom: 1px solid #EDEDED;
        margin-top: 32px;
        position: relative;
        display: none;
        .newuser,.per,.getbtn{
             width: 194px;
            height: 24px;
            float: left;
            font-size: 14px;
            color: #fff;
            text-align: center;
            line-height: 24px;
            // cursor: pointer;
        }
        .newuser{          
            background: url("../../assets/images/newuser.png") no-repeat;            
        }
        .per{          
            background: url("../../assets/images/per.png") no-repeat; 
            margin-left: 12px;           
        }
        .getbtn{          
            width: 83px;
            float: right;
            color: #1974A1;
            font-weight: 400;
            &:hover{
                color: #FF3308;
            }
        }
        .alldis{
            position: absolute;
            top: 35px;
            left: 0px;
            width: 384px;
            // height: 412px;
            border: 1px solid #DEDEDE;
            background-color: #fff;
            padding-top: 18px;
            z-index: 100;
            .listConter{
                // height: 402px;
                overflow: hidden;
                overflow-y: scroll;
                padding-bottom: 10px;
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
                margin-left: 18px;
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
                        font-weight: 700;
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
        .alldis:after,
        .alldis:before {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-bottom-color: #DEDEDE;
            left: 6%;
            margin-left: -4px;
            top: -16px;
        }

        .alldis:after {
            border-bottom-color: #fff;
            top: -15px;
        }
    }
    .productColor{
        min-height: 105px;
        div:first-child{
            font-size: 16px;
            margin:16px 0 4px 0;
        }
        div:last-child{
            ul{
                overflow: hidden;
                li{
                    height: 72px;
                    width: 72px;
                    float: left;
                    margin-right: 12px;
                    margin-bottom: 12px;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        cursor: pointer;
                        box-sizing: border-box;
                    }
                    .activeColor{
                        border: 2px solid #FF3308;
                    }
                }
            }
        }
    }
    .productSize{
        overflow: hidden;
        margin-top: 10px;
        .sizeTitle{
            overflow: hidden;
            div:first-child{
                float: left;
               font-size:  16px;
            }
            // div:last-child{
            //     color: #2477A0;
            //    font-size:  14px;
            //    float: right;
            // }
        }
        .sizeConter{
            margin-top: 8px;
            ul{
                li{
                    float: left;
                    padding: 0 17px;
                    height: 24px;
                    line-height: 24px;
                    border: 1px solid #F6F6F6;
                    cursor: pointer;
                    box-sizing: border-box;
                    margin-right: 12px;
                }
                li:nth-last-child(1),li:nth-last-child(2){
                    display: none;
                }
                .activeSize{
                    border: 2px solid #FF3308;
                }
            }
        }
    }
    .quanity{
        margin-top: 10px;
        div:first-child{
            font-size: 16px;
        }
        div{
            .el-input-number{
                height: 40px;
                margin-top: 16px;
            }
        }
    }
    .shipping{
        margin-top: 20px;
        span{
            font-size: 12px;
            color: #666;
        }
        span:nth-child(1),span:nth-child(2){
            font-size: 16px;
            font-weight: 550;
        }
        span:nth-child(2){
            margin-right: 14px;
        }
        span:nth-child(4){
            margin-left: 8px;
            font-size: 14px;
            cursor: pointer;
        }
    }
    .buyBtns{
        margin-top: 10px;
        overflow: hidden;
        div{
            float: left;
            text-align: center;
            cursor: pointer;
            border-radius: 6px;
            width: 166px;
            height: 42px;
            line-height: 42px;
            color: #fff;
            font-size: 14px;
        }
        .buyNow{
            background-color: #FEB610;
        }
        .addCat{
             background-color: #FDD818;
             margin: 0 16px;
        }
        .addWish{
            width: 147px;
            color:#333;
            font-size: 12px;
            border: 1px solid #999;
            box-sizing: border-box;
            i{
                font-size: 24px;
            }
            span:last-child{
                vertical-align: top;
            }
        }
        .addedWish{
            width: 82px;
            height: 42px;
            color:#333;
            font-size: 12px;
            border: 1px solid #999;
            box-sizing: border-box;
             i{
                font-size: 24px;
                color: red;
            }
            span:last-child{
                vertical-align: top;
            }
        }
    }
    .safeReture{
        margin-top: 15px;
        overflow: hidden;
        .safe,.returns{
            float: left;
            overflow: hidden;
            div{
                float: left;
            }
        }
        .safe div:last-child,.returns div:last-child{
            margin-left: 8px;
            font-size: 12px;
            color: #333;
            p:last-child{
                color: #666;
            }
        }
        .safe{
            margin-right: 24px;
        }
    }
}
</style>