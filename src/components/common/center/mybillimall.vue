<template>
<!-- 我的billimall页面 -->
    <div class="mybm">
        <div class="mybm-top">
            <div>
                <img src="@/assets/images/user.png">
            </div>
            <div>
                <!-- <span><i class="el-icon-message"></i></span>
                <span>Unread Message :</span>
                <span>0</span>
                <span>My Coupons :</span>
                <span>2</span> -->
            </div>
        </div>
        <div class="mybm-bm">
            <div>
                <p>{{ orderNum.orders_all }}</p>
                <p>All Order</p>
            </div>
            <div>
                <p>{{ orderNum.unpaid }}</p>
                <p>Unpaid</p>
            </div>
            <div>
                <p>{{ orderNum.processing }}</p>
                <p>Processing</p>
            </div>
            <div>
                <p>{{ orderNum.shipped }}</p>
                <p>Shipped</p>
            </div>
            <div>
                <p>{{ orderNum.feedback }}</p>
                <p>Feedback</p>
            </div>

        </div>
    </div>
</template>
<script>
import api from '@/api'
export default {
    data(){
        return{
            user_id:"",
            orderNum:{}
        }
    },
    created() {
        if (JSON.parse(localStorage.getItem("userdata"))) {
            this.user_id=JSON.parse(localStorage.getItem("userdata")).user_id
            this.getorderStat()
        }else{
            router.replace({ name: 'login', params: { islogin:"signin" }})
        }
    },
    methods: {
        getorderStat(){//订单统计
            let params = {
                user_id:this.user_id,
            }
            this.axios.post(api.orderStat, params)
                .then(res => {
                    if (res.data.code==200) {
                        this.orderNum=res.data.data
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        }
    }
}
</script>
<style lang="scss" scoped>
    .mybm{
        background: #fff;
        text-align: left;
        .mybm-top{
            // margin: 24px;
            overflow: hidden;
            padding-bottom: 24px;
            border-bottom: 1px solid #DEDEDE;
            div{
                float: left;
            }
            div:first-child{
                width: 56px;
                margin: 24px 0 0 24px;
                img{
                    width: 100%;
                    border-radius: 50%;
                }
            }
            div:last-child{
                margin-top: 62px;
                margin-left: 12px;
                color: #999;
                font-size: 12px;
                span:nth-child(1){
                    font-size: 16px;
                    margin-right: 8px;
                    display: inline-block;
                    position: relative;
                    width: 20px;
                    height: 10px;
                    i{
                        position: absolute;
                        top: -2px;
                        left: 0px;
                    }
                }
                 span:nth-child(3){
                     color: #FF7805;
                     margin-right: 24px;
                     margin-left: 2px;
                     font-weight: bold;
                 }
                 span:nth-child(5){
                     color: #FF7805;
                     font-weight: bold;
                     margin-left: 2px;
                 }
            }
        }
        .mybm-bm{
            overflow: hidden;
            height: 96px;
            div{
                float: left;
                width: 164px;
                text-align: center;
                margin-top: 22px;
                p:first-child{
                    font-size: 24px;
                }
                 p:last-child{
                    font-size: 14px;
                    margin-top: 8px;
                }
            }
            div:first-child{
                margin-left: 38px;
            }
        }
    }
</style>
