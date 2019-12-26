<template>
<!-- 个人中心页 -->
    <div class="personal-center">
        <HeaderHtml></HeaderHtml>
        <div>
            <Search id="searchBar" :fixedMsg="searchBarFixed"></Search>
        </div>
        <div class="personal-center-container">
            <div class="center-left">
                <div class="center-list">
                    <router-link tag="div" :to="{path:'/personalCenter/mybillimall'}" :class="{clickActive:this.$route.name=='mybillimall'}">My BilliMall</router-link>
                    <router-link tag="div" :to="{path:'/personalCenter/myorders'}" :class="{clickActive:this.$route.name=='myorders'}">My Orders</router-link>
                    <router-link tag="div" :to="{path:'/personalCenter/wishlist'}" :class="{clickActive:this.$route.name=='wishlist'}">Wish List</router-link> 
                    <!-- <router-link tag="div" :to="{path:'/personalCenter/message'}" :class="{clickActive:this.$route.name=='message'}">Message</router-link> -->
                    <!-- <router-link tag="div" :to="{path:'/personalCenter/mycoupons'}" :class="{clickActive:this.$route.name=='mycoupons'}">My Coupons</router-link> -->
                    <router-link tag="div" :to="{path:'/personalCenter/myaddress'}" :class="{clickActive:this.$route.name=='myaddress'}">My Shipping Address</router-link>
                    <router-link tag="div" :to="{path:'/personalCenter/account'}" :class="{clickActive:this.$route.name=='account'}">Account</router-link>
                </div>
                <div style="height:10px;background:#FAFAFA"></div>
                <div class="download-app">
                    <div style="height:75px;line-height:75px;text-align:center;font-size:16px;font-weight:bold;">BilliMall Mobile App</div>
                    <div class="down-img" @click="downPage">
                        <div>
                            <Qrcode></Qrcode>
                        </div>
                    </div>
                    <div style="height:75px;line-height:75px;text-align:center;font-size:16px;">Scan or click to download</div>
                </div>
            </div>
            <div class="center-right">
                <router-view></router-view>
            </div>
        </div>
        <div>
            <Footer></Footer>
        </div>
    </div>
</template>
<script>
    import HeaderHtml from '@/components/common/headerhtml'
    import Search from '@/components/common/search'
    import Footer from "@/components/common/footerhtml"
    import Qrcode from "@/components/common/qrcode"
    export default {
        components: {
            HeaderHtml,
            Search,
            Qrcode,
            Footer
        },
        data(){
            return{
                searchBarFixed:{
                    isfixed:false,
                    isshow:false
                },
            }
        },
        created () {

        },
        methods:{
            choseList(index){
                this.current = index
            },
            downPage(){
                this.$router.push({path:'/downPage'})
            }
        }
    }
</script>
<style lang="scss" scoped>
    // 修改search组件的样式
    #searchBar /deep/ #search .search_box .search-input{
        border-right: none;
        width: 600px;
    }
    #searchBar /deep/ #search .search_box .help{
        display: none;
    }
    #searchBar /deep/ #search .search_box div:last-child{
        display: none;
    }
//个人中心页内容样式
.personal-center-container{
    width: 1200px;
    margin: 0 auto;
    margin-top: 24px;
    overflow: hidden;
    .center-right,.center-left{
        float: left;
        background-color: #fff;
    }
    .center-left{
        width: 290px;
        margin-right: 14px;
        color: #333;
        .center-list{
            text-align: left;
            div{
                margin: 0 24px;
                height: 68px;
                line-height: 68px;
                border-bottom: 1px solid #FAFAFA;
                cursor: pointer;
                font-size: 16px;
            }
            .clickActive{
                font-weight: bold;
            }
        }
        .download-app{
            .down-img{
                cursor: pointer;
                div{
                    width: 242px;
                    height: 242px;
                    margin: 0 auto;
                }
            }
        }
    }
    .center-right{
        width: 896px;
    }
}
</style>