<template>
    <div class="flashDealsNow">
        <HeaderHtml></HeaderHtml>
        <Search :fixedMsg="searchBarFixed" :homedata='allCategoriesdata'></Search>
        <div class="flashDealsTitle">
            <span>Flash Deals</span>
            <span>Only available for 48 hours - don’t miss out！</span>
        </div>
        <div class="flashDealsBtnList">
            <div class="btnContainer">
                <ul>
                    <li v-for="(item,i) in list" :key="i">
                        <div>
                            <!-- <img :src="item.icons" class="iconBk"> -->
                        </div>
                        <div>
                            <span class="iconTitle">{{item.title}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flashDealsBtn">
            <div class="btnContainerTwo">
                <div @click="choseClickBtn(index)" :class="{divClickAvtive:index == current}" v-for="(item,index) in choseBtn" :key="index">{{item}}</div>
            </div>
        </div>
        <div class="flashDealsImgList">
            <div class="imgListContainer">
                <Flashdealsparticulars :isComings="current"></Flashdealsparticulars>
            </div>
        </div>
        <Footerhtml></Footerhtml>
    </div>
</template>
<script>
    import api from '@/api'
    import Search from '@/components/common/search'
    import HeaderHtml from '@/components/common/headerhtml'
    import Footerhtml from '@/components/common/footerhtml'
    import Flashdealsparticulars from '@/components/common/flashdealsparticulars'
    export default{
        name:"flashDealsNow",
        components:{
            Search,
            HeaderHtml,
            Footerhtml,
            Flashdealsparticulars
        },
        data(){
            return{
                searchBarFixed:{
                    isfixed:false,
                    isshow:true
                },
                list: [
                    // { icons: require("@/assets/images/licai.png"), title: "Picked For you" },
                    // { icons: require("@/assets/images/shuma.png"), title: "Consumer Electronics" },
                    // { icons: require("@/assets/images/meizhuang.png"), title: "Health&Beauty" },
                    // { icons: require("@/assets/images/jiaju.png"), title: "Home&Garden" },
                    // { icons: require("@/assets/images/zhubao.png"), title: "Accessories" },
                    // { icons: require("@/assets/images/neiyi.png"), title: "Women's Clothing" },
                    // { icons: require("@/assets/images/naiping.png"), title: "Mom&Kids" },
                    // { icons: require("@/assets/images/gongju.png"), title: "Home   Improvement" },
                    // { icons: require("@/assets/images/nvbao.png"), title: "Shoes&Bags" },
                    // { icons: require("@/assets/images/luntai.png"), title: "Auto& Motorcycle" },
                    // { icons: require("@/assets/images/yifu.png"), title: "Men’s Clothing" },
                    // { icons: require("@/assets/images/qiu.png"), title: "Sports& Outdoors" },
                ],
                choseBtn:["NOW","UPCOMING"],
                current:0,
                allCategoriesdata:{}
            }
        },
        created() {
            this.gethomedata()
        },
        methods:{
            gethomedata(){//获取首页数据
                this.$store.dispatch('home/gethomedataaction').then((data)=>{
                    this.$nextTick(()=>{
                        if(data.code==200){
                            this.allCategoriesdata=data.data
                            for (const key in data.data.category) {
                                if (data.data.category[key]) {
                                    data.data.category[key]
                                    this.list.push({ icons: data.data.category[key].image, title: data.data.category[key].name })
                                }
                            }
                        }
                    })
                })
            },
            choseClickBtn(index){
                this.current = index;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .flashDealsTitle{
        width: 1200px;
        margin: 0 auto;
        height: 82px;
        text-align: left;
        line-height: 82px;
        span:first-child{
            color: #333;
            font-size: 36px;
            font-weight: bold;
            margin-right: 24px;
        }
        span:last-child{
            color: #999;
            font-size: 36px;
           font-weight: lighter;
        }
    }
    .flashDealsBtnList{
        width: 100%;
        background: linear-gradient(left, #FEB610 , #FB9741);
        height: 80px;
        .btnContainer{
            width: 1200px;
            margin: 0 auto;
            ul{
                display: flex;
                li{
                    width: 100px;
                    height: 80px;
                    cursor: pointer;
                    padding-top: 8px;
                    position: relative;
                    &:hover{
                        background: rgba(255,255,255,.2);
                    }
                }
                .iconBk{
                    display: inline-block;
                    font-size: 28px;
                    color: #fff;
                    width: 32px;
                    height: 32px;
                }
                .iconTitle{
                    font-size: 14px;
                    color: #fff;
                    top: 15px;
                    position: relative;
                }
            }
        }
    }
    .flashDealsBtn{
        .btnContainerTwo{
            height: 74px;
            margin: 0 auto;
            width: 330px;
            div{
                float: left;
                border-radius: 20px;
                height: 40px;
                padding: 0 32px;
                font-size: 20px;
                color: #999;
                line-height: 40px;
                margin-right: 20px;
                margin-top: 24px;
                cursor: pointer;
            }
            .divClickAvtive{
                background-color: #FEB610;
                color: #fff;
                font-weight: bold;
            }
        }
    }
    .imgListContainer{
        width: 1200px;
        margin: 0 auto;
    }
</style>