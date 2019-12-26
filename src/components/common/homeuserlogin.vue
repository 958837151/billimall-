<template>

<!-- 主页右侧登录和推荐组件 -->

    <div class="rightNavConter">
        <div class="rightNav">
            <div>
                <img :src="head_pic" alt="" style="width:56px;height:56px;display:block;">
            </div>
            <div>{{ welecome }}</div>
            <div class="btn" v-if="!islogin">
                <button @click="toJoin">Join</button>
                <button @click="toSignin">Sign in</button>
            </div>
            <div v-if="!islogin" class="newcoupon">New Users Coupons</div>
            <div class="coupon" v-if="!islogin">
                <div>
                    <p>Get Your ZAR 30</p>
                    <p>Coupon</p>
                </div>
            </div>
            <div class="ordersmessages" v-if="islogin">
                <ul>
                    <li @click="toAccount">
                        <img src="@/assets/images/account.png">
                        <p>Account</p>
                    </li>
                    <li @click="toOrders">
                        <img src="@/assets/images/orders.png">
                        <p>Orders</p>
                    </li>
                    <!-- <li @click="toMessage">
                        <img src="@/assets/images/messages.png">
                        <p>Messages</p>
                    </li> -->
                </ul>
                <div class="download" @click="toApp">BilliMall Mobile App Click To Download</div>
            </div>
            <!-- <div class="pickimg">
                <p>
                    Pick For You
                </p>
                <div>
                    <img src="@/assets/images/phone2.jpg">
                    <img src="@/assets/images/phone2.jpg">
                    <img src="@/assets/images/phone2.jpg">
                    <img src="@/assets/images/phone2.jpg">
                    <img src="@/assets/images/phone2.jpg">
                    <img src="@/assets/images/phone2.jpg">
                    <img src="@/assets/images/phone2.jpg">
                    <img src="@/assets/images/phone2.jpg">
                    <img src="@/assets/images/phone2.jpg">
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
    import user from '@/assets/images/user.png'
    import api from '@/api'
    export default {
        name:'homeuserlogin',
        data () {
            return {
                welecome:"Welecome to BilliMall",
                islogin:false,
                head_pic:user
            }
        },
        created() {
            this.getislogin()
            this.getuserDetail()
        },
        methods: {
            getuserDetail(){//获取用户基本信息
                let params = {
                }
                this.axios.post(api.userDetail, params)
                    .then(res => {
                        if (res.data.code==200) {
                            let data=res.data.data
                            this.head_pic=data.head_pic
                        }
                    })
            },
            getislogin(){
                if(this.$store.state.token){
                    this.islogin=true
                    this.welecome="Welcome"
                }
            },
            toJoin(){
                this.$router.push({ name: 'login', params: { islogin:"register" }})
            },
            toSignin(){
                this.$router.push({ name: 'login', params: { islogin:"signin" }})
            },
            toAccount(){ 
                this.$router.push({name:'account'})
            },
            toOrders(){
                this.$router.push({name:'myorders'})
            },
            toMessage(){
                this.$router.push({name:'message'})
            },
            toApp(){
                let routeOne = this.$router.resolve({
                    name: "DownPage",
                });
                window.open(routeOne.href, '_blank');
            },
        }
    }
</script>
<style lang="scss" scoped>
.rightNavConter{
    width: 240px;
    height: 522px;
    float: right;
    background-color: #fff;
    text-align: center;
    .rightNav{
        width: 200px;
        margin: 0 auto;
        div:nth-child(1){
            height: 89px;
            img{
                width: 56px;
                border-radius: 50%;
                margin: 22px auto;
                margin-bottom: 0;
            }
        }
        div:nth-child(2){
            color: #333;
            font-size: 16px;
            font-weight: bold;
        }
        .btn{
            margin-top: 17px;
            button{
                width: 90px;;
                height: 40px;
                font-size: 14px;
                border-radius: 13px;
                cursor: pointer;
            }
            button:first-child{
                background-color: #ffb610;
                color: #fff;
                margin-right: 20px;
            }
            button:last-child{
                background-color: #F9F9F9;
                color: #333;
            }
        }
        .newcoupon{
            margin-top: 16px;
            text-align: left;
            font-size: 16px;
            color: #333;
            font-weight: bold;
        }
        .coupon{
            height: 58px;
            margin-top: 8px;
            background: url("../../assets/images/coupons.png") no-repeat;
            overflow: hidden;
            p{
                color: #fff;
                font-size: 13px;
                margin-top: 10px;
                margin-left: 16px;
                text-align: left;
            }
            p:last-child{
                margin-top: 0;
            }
        }
        .ordersmessages{
            ul{
                width: 100%;
                display: flex;
                justify-content: space-around;
                margin-top: 16px;
                li{
                    cursor: pointer;
                    img{
                        display: block;
                        width: 48px;
                        margin: 0 auto;
                    }
                    p{
                        margin-top: 1px;
                        height:18px;
                        font-size:12px;
                        font-family:PingFangSC;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        line-height:18px;
                    }
                }
            }
            .download{
                height:30px;
                font-size:12px;
                font-family:HelveticaNeue;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:15px;
                margin-top: 27px;
                cursor: pointer;
            }
        }
        .pickimg{
            margin-top: 16px;
            p{
                color: #333;
                font-size: 16px;
                text-align: left;
            }
            
            img{
                width: 66px;
                height: 66px;
                cursor: pointer;
            }
        }
    }
    
}

</style>