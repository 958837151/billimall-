<template>

<!-- 页面底部组件 -->

    <div class="footers">
        <!-- <div class="animated bounce infinite">animated</div> -->
        <!-- <div>{{isUserName}}</div> -->
        <!-- <el-button><el-button type="primary" icon="el-icon-edit"></el-button></p> -->
        <!-- <el-button type="primary" @click='timeChangeName("名字")'>点击操作</el-button> -->
        <div class="footTop">
            <div class="topsContainer">
                <div class="tops">
                    <div>
                        <div class="msgTitle">
                            <div>
                                <img src="@/assets/images/youhuiquan.png">
                            </div>
                            <div>
                                <p>Great Value</p>
                                <p>We offer competitive prices on our 100 million plus product range.</p>
                            </div>
                        </div>
                        <div class="msgTitle">
                            <div>
                                <img src="@/assets/images/yusan.png">
                            </div>
                            <div>
                                <p>Shop with Confidence</p>
                                <p>Our Buyer Protection covers your purchase from dick to delivery.</p>
                            </div>
                        </div>
                    </div>
                     <div>
                        <div class="msgTitle">
                            <div>
                                <img src="@/assets/images/feiji.png">
                            </div>
                            <div>
                                <p>Worldwide Delivery</p>
                                <p>With sites in 5 languages,we ship to over 200 countries & regions.</p>
                            </div>
                        </div>
                        <div class="msgTitle">
                            <div>
                                <img src="@/assets/images/kefu.png">
                            </div>
                            <div>
                                <p>24/7 Help Center</p>
                                <p>Round-the-clock assistance for a smooth shopping experiience.</p>
                            </div>
                        </div>
                    </div>
                     <div>
                        <div class="msgTitle">
                            <div>
                                <img src="@/assets/images/kabao.png">
                            </div>
                            <div>
                                <p>Safe Payment</p>
                                <p>Pay with the world‘s most popular and secure payment methods.</p>
                            </div>
                        </div>
                        <div class="msgTitle">
                            <div>
                                <img src="@/assets/images/ioss.png">
                            </div>
                            <div class="twoImg">
                                <img src="@/assets/images/anzhuos.png">
                            </div>
                            <div id="twoP">
                                <p>Shop On-The-Go</p>
                                <p><a href="">Download the app</a> and get the world of BilliMall at your fingertips</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottomsContainer">
               <div class="bottoms">
                    <div class="bottomTitle">
                        <p>Customer Service</p>
                        <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/55" target="_blank" style="cursor: pointer;">User Guide</a>
                        <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/42" target="_blank" style="cursor: pointer;">Size Guide</a>
                        <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/59" target="_blank" style="cursor: pointer;">Payment Methods</a>
                        <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/40" target="_blank" style="cursor: pointer;">Contact Us</a>
                    </div>
                    <div class="bottomTitle">
                        <p>Policy</p>
                        <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/37" target="_blank" style="cursor: pointer;">Privacy Policy</a>
                        <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/36" target="_blank" style="cursor: pointer;">Return Policy</a>
                        <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/41" target="_blank" style="cursor: pointer;">Shipping Policy</a>
                        <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/44" target="_blank" style="cursor: pointer;">Terms And Conditions</a>
                        <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/43" target="_blank" style="cursor: pointer;">Intellectual Property Rights</a>
                    </div>
                    <!-- <div class="bottomTitle">
                        <p>Policy</p>
                        <p class="pown">Return Policy</p>
                        <p class="pown">Terms and Conditions</p>
                        <p class="pown">Privacy Policy</p>
                    </div> -->
                    <div class="bottomTitle bottomImgs">
                        <p>Stay Connected</p>
                        <p style="display: flex;">
                            <a href=""><img src="@/assets/images/xiaoniao.png" alt=""></a>
                            <a href=""><img src="@/assets/images/mogu.png" alt=""></a>
                            <a href=""><img src="@/assets/images/huixing.png" alt=""></a>
                        </p>
                        <p>Payment</p>
                        <p style="display: flex;">
                            <a href=""><img src="@/assets/images/timg.png" alt=""></a>
                            <a href=""><img src="@/assets/images/visa.png" alt=""></a>
                            <a href=""><img src="@/assets/images/twoyuan.png" alt=""></a>
                            <a href=""><img src="@/assets/images/jcb.png" alt=""></a>
                            <a href=""><img src="@/assets/images/disc.png" alt=""></a>
                        </p>
                    </div>
               </div>
            </div>
        </div>
        <div class="footBottom">
            <div>
                <a href=""><img src="@/assets/images/ios.png" alt=""></a>
                <a href=""><img src="@/assets/images/anzhuo.png" alt=""></a>
            </div>
        </div>
        <div class="footerBlack">c 2019 BilliMall.com Copyright, All Rights Reserved</div>
    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
    export default {
        data(){
            return{
                // msg:this.$store.state.userName
            }
        },
        computed:{
            ...mapGetters([
                "isUserName"
            ])
        },
        methods:{
            ...mapActions([
                'timeChangeName'
            ])
        }
    }
</script>
<style lang="scss" scoped>
    .footers{
        text-align: left;
        img{width: 100%;}
        .footTop{
            width: 100%;
            margin-top: 32px;
            background-color: #fff;
            .topsContainer{
                border-bottom: 1px solid #DEDEDE;
                .tops{
                    width: 1200px;
                    height: 195px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    .msgTitle{
                        display: flex;
                        padding-top: 30px;
                        div:first-child{
                            width: 52px;
                            height: 52px;
                            margin-right: 10px;
                        }
                        .twoImg{
                            margin-right: 10px;
                        }
                        #twoP{
                            width: 238px;
                            a{
                                text-decoration:none
                            }
                        }
                        div:last-child{
                            width: 300px;
                            p:first-child{
                                color: #333;
                                font-size: 16px;
                            }
                             p:last-child{
                                color: #999;
                                font-size: 12px;
                            }
                        }
                    }
                }
            }
            .bottomsContainer{
                    .bottoms{
                        width: 1200px;
                        margin: 0 auto;
                        padding-top: 23px;
                        padding-bottom: 32px;
                        display: flex;
                        justify-content: space-between;
                        .bottomTitle{
                            p,a{
                                font-size: 12px;
                                color: #999;
                                margin-top: 16px;
                                display: block;
                                text-decoration: none;
                            }
                            p:first-child{
                                font-size: 14px;
                                color: #333;
                                font-weight: bold;
                            }
                            .pown{
                                color: #333;
                            }
                            .bottomsImg{
                                img{
                                    width: 32px;
                                    margin-right: 6px;
                                }
                            }
                    }
                    .bottomImgs{
                        p:first-child{
                            font-size: 15px;    
                        }
                        p:nth-child(2){
                            margin-top: 2px;
                            img{
                                width: 32px;
                                margin-right: 6px;
                            }    
                        }
                        p:nth-child(3){
                            font-size: 15px; 
                            color: #333;
                            font-weight: bold;
                        }
                         p:nth-child(4){
                             margin-top: 2px;
                             img{
                                 height: 16px;
                                 width: 32px;
                             }
                            img:nth-child(1){
                                width:50px;
                            }
                            img:nth-child(1){
                                width:39px;
                            }
                        }
                    }
               
                }
            }
        }

    }
    .footBottom{
        background-color: #E8E8E8;
        height: 50px;
        line-height: 50px;
        div{
            width: 1200px;
            margin: 0 auto;
        }
        a{
            display: inline-block;
            width: 128px;
            margin-top: 10px;
            margin-right: 12px;
        }
    }
    .footerBlack{
        background-color: #333;
        height: 35px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        line-height: 35px;
    }
</style>