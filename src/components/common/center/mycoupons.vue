<template>
<!-- 我的优惠券页面 -->
    <div class="my-coupons">
        <div class="coupons-title">My Coupons</div>
        <div class="coupons-list">
            <div class="coupos-container">
                <div class="coupons-img">
                    <img src="@/assets/images/youhuiquantest.png">
                </div>
                <div class="coupons-says">
                    <div>
                        <span>Validity period: </span>
                        <span>22Jul,2019 00:18:19 PDT ~26Jul,2019 00:18:19 PDT</span>
                    </div>
                    <div>
                        <span>Can be used on: </span>
                        <span>All</span>
                    </div>
                    <div>
                        <span>Coupon Name: </span>
                        <span>Full-range coupons</span>
                    </div>
                    <div>
                        <span>Coupon status: </span>
                        <span class="expired" v-if="!isNewCou">Expired</span>
                        <span class="vaild-now" v-if="isNewCou">Valid Now</span>
                        <!-- <span class="see-items" v-if="isNewCou">SEE SELECTED ITEMS</span> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="coupons-list">
            <div class="coupos-container">
                <div class="coupons-img">
                    <img src="@/assets/images/youhuiquantest.png">
                </div>
                <div class="coupons-says">
                    <div>
                        <span>Validity period: </span>
                        <span>22Jul,2019 00:18:19 PDT ~26Jul,2019 00:18:19 PDT</span>
                    </div>
                    <div>
                        <span>Can be used on: </span>
                        <span>All</span>
                    </div>
                    <div>
                        <span>Coupon Name: </span>
                        <span>Full-range coupons</span>
                    </div>
                    <div>
                        <span>Coupon status: </span>
                        <span class="expired" v-if="!isNewCou">Expired</span>
                        <span class="vaild-now" v-if="isNewCou">Valid Now</span>
                        <!-- <span class="see-items" v-if="isNewCou">SEE SELECTED ITEMS</span> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isNewCou:true
        }
    }
}
</script>
<style lang="scss" scoped>
.my-coupons{
    text-align: left;
    .coupons-title{
           font-size: 18px;
           font-weight: bold;
           background: #FAFAFA;
           padding-bottom: 16px;
        }
    .coupons-list{
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
        .coupos-container{
            overflow: hidden;
            margin: 32px 16px 0 32px;
            border-bottom: 1px solid #DEDEDE;
        }
        .coupons-img{
            float: left;
            width: 280px;
            margin-right: 16px;
            margin-bottom: 24px;
            img{
                width: 100%;
            }
        }
        .coupons-says{
            font-size: 12px;
            float: left;
            div{
                margin-bottom: 12px;
            }
            div span:first-child{
                color: #999;
                width: 92px;
                text-align: right;
                display: inline-block;
                margin-right: 4px;
            }
            .vaild-now{
                color: #B4CC06;
                margin-right: 12px;
            }
            .see-items{
                width: 154px;
                height: 28px;
                line-height: 28px;
                display: inline-block;
                border-radius: 2px;
                color: #fff;
                text-align: center;
                background: #FEB610;
                cursor: pointer;
            }
        }
    }
}
    
</style>
