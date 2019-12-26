<template>
    <div class="flashDeals" v-if="flashdealsmorehomedata">
        <div class="flashContiner">
            <div class="dealsHeader">
                <p>Flash Deals</p>
                <p @click="toflashdealsnow">view more</p>
            </div>
            <div class="dealsBottom" v-for="(item, index) in flashdealsmorehomedata.goodsList" :key="index">
                <div class="deals">
                    <div class="shade" @click="toflashdealsnow">
                        <img :src="item.imgUrl">
                        <div></div>
                    </div>
                    <div>
                        <p><span>ZAR {{ item.price }}</span></p>
                        <p><span>{{ item.off }}%</span> Off</p>
                    </div>
                    <div>
                        <div class="progressbar" :style="{ width: (item.sales_sum/item.all_sum) + '%' }"></div>
                    </div>
                    <div>
                        <span>{{ item.sales_sum }} Sold</span>
                    </div>
                </div>
            </div>
            <!-- <div class="dealsBottom">
                <div class="deals">
                    <div class="shade" @click="toflashdealsnow">
                        <img src="@/assets/images/2.jpg">
                        <div></div>
                        </div>
                    <div>
                        <p><span>ZAR 22.32</span></p>
                        <p><span>28%</span> Off</p>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <span>46 Sold</span>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
    export default {
        name:'flashdealsmore',
        props:['homedata'],
        data () {
            return {
                flashdealsmorehomedata:{}
            }
        },
        watch: {
            homedata(val){
                this.getflashdealsmorehomedata(val)
            }
        },
        methods: {
            getflashdealsmorehomedata(data){
                console.log(data.flashsale);
                if(data){
                    this.flashdealsmorehomedata=data.flashsale
                }
            },
            toflashdealsnow(){
                this.$router.push({ name: 'flashdealsnow', params: {  }})
            },
        }
    }
</script>
<style lang="scss" scoped>
    .flashDeals{
        width: 1200px;
        height: 342px;
        background-color: #fff;
        margin-top: 20px;
        overflow: hidden;
        .flashContiner{
            margin: 14px 20px 12px 20px;
            div:last-child{
                margin-right: 0;
            }
            .dealsHeader{
                margin-bottom: 14px;
                overflow: hidden;
                p{
                    float: left;
                    font-size: 14xp;
                    color: #333;
                    font-weight: bold;
                }
                p:last-child{
                    float: right;
                    font-size: 12px;
                    color: #999;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
            .dealsBottom{
                float: left;
                margin-right: 15px;
                .deals{
                    width: 220px;
                    height: 284px;
                    img{
                        width: 100%;
                    }
                    div:nth-child(2){
                        overflow: hidden;
                        p{
                            float: left;
                            color: #333;
                            font-size: 14px;
                            font-weight: bold;
                        }
                        p:nth-child(2){
                            float: right;
                            border: 1px solid #F45151;
                            background-color: #FEE5E1;
                            font-size: 12px;
                            color: #FF3308;
                            padding: 3px 8px;
                        }
                    }
                    div:nth-child(3){
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
                    div:nth-child(4){
                        text-align: left;
                        margin-top: 6px;
                        span{
                            font-size: 12px;
                            color: #666;
                        }
                    }
                    .shade{
                        position: relative;
                        height: 220px;
                        margin-bottom: 9px;
                        img{
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
        }
    }

</style>