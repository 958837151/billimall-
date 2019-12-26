<template>
    <div>
        <HeaderHtml></HeaderHtml>
        <Search :fixedMsg="searchBarFixed" :homedata="homedata" @searchVal="searchVal"></Search>
        <div class="direct-search-title">
            <!-- <span>Home > All Categories > </span>
            <span>dress women</span>
            <span>(95310) Results</span> -->
        </div>
        <div class="direct-container">
            <div class="direct-search-chose">
                <Directsearchchose :goodsData="goodsData" @clickCategoriesVal="clickCategoriesVal"></Directsearchchose>
            </div>
            <div class="direct-search-list">
                <div class="user-chose user-chose-price">
                    <span style="margin-right:10px;">Price:</span>
                    <el-input placeholder="Min" v-model="min_price"></el-input>
                    <span style="color:#999;margin:0 8px;">-</span>
                    <el-input placeholder="Max" v-model="max_price"></el-input> 
                    <!-- <el-checkbox-group v-model="checkList">
                        <el-checkbox label="New Arrivals"></el-checkbox>
                        <el-checkbox label=""></el-checkbox>
                    </el-checkbox-group>
                    <el-rate v-model="starVal" disabled></el-rate>
                    <span>&Up</span> -->
                </div>
                <div class="btn-title">
                    <div class="user-chose user-chose-btn">
                        <div v-for="(item,index) in choseBtn" :key="index" :class="{activeBtn:index==current,noActive:index!=current}" @click="userChoseBtn(index)" class="btn-margin">
                            <span>{{item.name}}</span>
                            <div style="float:right;height: 10px;margin-top: -3px;">
                                <div style="height:10px;width: 10px;position: relative;top: 15px;">
                                    <i class="el-icon-caret-top" style="position: absolute;left: 0;top: 0;" :class="{active_i:'t'==current_i&&index==current}" v-show="item.top" @click.stop="clickTopOrBom(index,'t')" :data="item.name" ref="ielet"></i>
                                </div>
                                <div style="height:10px;width: 10px;position: relative;top: 12px;">
                                    <i class="el-icon-caret-bottom" style="position: absolute;left: 0;top: 0;" :class="{active_i:'b'==current_i&&index==current}" v-show="item.bottom" @click.stop="clickTopOrBom(index,'b')" :data="item.name" ref="ielet"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="page-list">
                        <span>View</span>
                        <span class="icon-qiehuanyingyong iconfont" :class="{pageChose:pageChose}" @click="pageStyle"></span>
                        <span class="icon-caidan1 iconfont" :class="{pageChose:!pageChose}" @click="pageStyle"></span>
                    </div>
                </div>
                 <div class="direct-img" v-show="!userChange">
                     <div class="img-container" v-for="(item,index) in list" :key="item.goods_id" :class="{marignR:(index%4)==3}">
                         <div class="images-top" @click="toproductdetails(item)">
                             <img :src="item.original_img" alt="" style="width:211px;height:211px;display:block;">
                         </div>
                         <div style="width:211px;margin:0 auto;text-align:left;">
                            <!-- <div class="colors-num">{{item.colorNum}}</div> -->
                            <div class="text-says" @click="toproductdetails(item)">
                                {{item.goods_name}}
                            </div>
                            <div class="sale">
                                <!-- <span>SALE</span> -->
                            </div>
                            <div class="zar-price">
                                <span>R {{item.shop_price}}</span>
                                <span>/ piece</span>
                            </div>
                            <div class="img-star">
                                <el-rate v-model="item.goods_rate" disabled></el-rate>
                                <div style="color:#666">
                                    <span>({{item.comment_count}})</span>
                                    <span>Orders({{item.orders}})</span>
                                </div>
                            </div>
                            <div class="add-hert">
                                <!-- <span>NEW</span> -->
                                <span style="display:none;">
                                    <i class="icon-aixin iconfont"></i>
                                    Add to Wish List
                                </span>
                            </div>
                         </div>
                     </div>
                </div>
                <div class="direct-img" v-show="userChange">
                     <div class="img-container img-container-table" v-for="(item) in list" :key="item.goods_id">
                         <div class="table-img">
                             <div @click="toproductdetails(item)">
                                <img :src="item.original_img" alt="" style="width:160px;height:160px;display:block;">
                             </div>
                             <!-- <div>
                                 2 Colors Acailable
                             </div> -->
                         </div>
                         <div class="table-says">
                             <div @click="toproductdetails(item)" style="cursor: pointer;">{{item.goods_name}}</div>
                             <div class="sale">
                                 <span>SALE</span>
                             </div>
                             <div style="margin-bottom: 8px;">
                                 <span style="color:#FF7900;font-size:14px;font-weight:bold;margin-right:6px;">R {{item.shop_price}}</span>
                                 <span style="color:#666;font-size:14px;">/ piece</span>
                             </div>
                             <div class="img-star" style="margin-bottom: 20px;">
                                <el-rate v-model="item.goods_rate" disabled></el-rate>
                                <div style="color:#666">
                                    <span style="margin-right:8px;">({{item.comment_count}})</span>
                                    <span>Orders({{item.orders}})</span>
                                </div>
                            </div>
                            <!-- <div>
                                <span style="color:#999; cursor: pointer;">
                                    <i class="icon-aixin iconfont"></i>
                                    Add to Wish List
                                </span>
                            </div> -->
                         </div>
                     </div>
                </div>
                 <div class="pagimg">
                    <el-pagination id="pagesComment" :background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="40" layout="prev, pager, next, jumper" :total="showReviews"></el-pagination>
                </div>
                 <div class="carousel-recommend">
                     <div style="font-size:20px;font-weight:bold;text-align:left;background:#fff;padding:16px 12px;">Premium Related Products</div>
                    <el-carousel trigger="click" :interval="4000" arrow="always">
                        <el-carousel-item v-for="(item,index) in images" :key="index">
                            <div class="carousel-imgs-container">
                                <div class="carousel-imgs" v-for="(item, index) in goodsTopData" :key="index">
                                    <div class="carousel-images-top" @click="toproductdetails(item)">
                                        <img :src="item.original_img" style="width:200px;height:200px;display:block;">
                                    </div>
                                    <div>
                                        <div class="carousel-text-says">
                                            {{ item.goods_name }}
                                        </div>
                                        <div class="carousel-zar-price">
                                            <span>R {{ item.shop_price }}</span>
                                            <span>/ piece</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
            </div>
            </div>
       </div>
       <Footer></Footer>
    </div>
</template>
<script>
import api from '@/api'
import Directsearchchose from "@/components/common/directsearchchose"
import HeaderHtml from '@/components/common/headerhtml'
import Search from '@/components/common/search'
import Footer from "@/components/common/footerhtml"
export default {
    components:{
        Directsearchchose,
        HeaderHtml,
        Search,
        Footer
    },
    data(){
        return{
            searchBarFixed:{
                    isfixed:false,
                    isshow:true
                },
                userChange:false,
                checkList:[],
                starVal:4,
                current:0,
                currentI:"",
                choseBtn:[
                        {name:"Best Match",top:false,bottom:false},
                        {name:"Orders",top:true,bottom:true},
                        {name:"Newest",top:true,bottom:true},
                        {name:"Price",top:true,bottom:true}
                    ],
                pageChose:true,
                imgsList:[
                   {url:require("@/assets/images/2.jpg"),colorNum:"2 Colors Acailable",textSays:"Hilo Rill Summer Beach MaxiHilo Rill Summer Beach Maxi",zarPrice:"9.61-25.62"},
                ],
                currentPage: 1,//当前页数
                showReviews:20,//总页数
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
                homedata:{},
                list:[],
                goodsData:{},
                keyword:"",
                min_price:"",
                max_price:"",
                cat_id:"",
                shop_price:1,
                orders:1,
                last_update:1,
                goodsTopData:[],
                current_i:"",
        }
    },
    watch: {
        min_price(min){
            this.min_price=min
            this.getgoodsindex()
        },
        max_price(max){
            this.max_price=max
            this.getgoodsindex()
        },
        goodsTopData(val){
            this.goodsTopData=val
        }
    },
    created() {
        this.getgoodsTop()
        this.gethomedata()
        if (this.$route.query.Title) {
            this.keyword=this.$route.params.Title
            this.currentPage=1
            this.getgoodsindex()
            return
        }else if (this.$route.query.cat_id) {
            this.cat_id=this.$route.params.cat_id
            this.currentPage=1
            this.getgoodsindex()
            return
        }
        this.getgoodsindex()
    },
    beforeRouteUpdate(to, from, next) {
        if(to.fullPath!=from.fullPath){
            this.cat_id=to.query.cat_id
            this.currentPage=1
            this.getgoodsindex()
            next()
        }
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
        clickCategoriesVal(data){//左边分类
            this.cat_id=data
            this.currentPage=1
            this.getgoodsindex()
        },
        searchVal(data){//搜索
            this.keyword=data
            this.currentPage=1
            this.getgoodsindex()
        },
        getgoodsindex(){//搜索数据
            let params = {
                page:this.currentPage,
                perPage:"40",
                keyword:this.keyword,
                cat_id:this.cat_id,
                min_price:this.min_price,
                max_price:this.max_price,
                orders:{shop_price:this.shop_price,orders:this.orders,last_update:this.last_update}
            }
            this.axios.post(api.goodsSearch, params)
                .then(res => {
                    if (res.data.code==200) {
                        this.goodsData=res.data.data
                        res.data.data.list.forEach(item => {
                            item.goods_rate=item.goods_rate*1
                        });
                        this.list=res.data.data.list
                        this.showReviews=res.data.data.page.countNum*1
                    }
                })
        },
        gethomedata(){//获取首页数据
            this.$store.dispatch('home/gethomedataaction').then((data)=>{
                this.$nextTick(()=>{
                    if(data.code==200){
                        this.homedata=data.data
                    }
                })
            }) 
        },
        userChoseBtn(index){
            if (index==3) {
                this.shop_price=-1*this.shop_price
                this.shop_price==1 ? this.current_i='t' : this.current_i='b'
            }
            else if (index==1) {
                this.orders=-1*this.orders
                this.orders==1 ? this.current_i='t' : this.current_i='b'
            }
            else if (index==2) {
                this.last_update=-1*this.last_update
                this.last_update==1 ? this.current_i='t' : this.current_i='b'
            }
            this.currentPage=1
            this.getgoodsindex()
            // 切换按钮选择样式
            this.current = index
        },
        clickTopOrBom(index,y){
            if (index==3) {
                if (y=='b') {
                    this.shop_price=-1
                }else{
                    this.shop_price=1
                }
            }
            else if (index==1) {
                if (y=='b') {
                    this.orders=-1
                }else{
                    this.orders=1
                }
            }
            else if (index==2) {
                if (y=='b') {
                    this.last_update=-1
                }else{
                    this.last_update=1
                }
            }
            this.currentPage=1
            this.getgoodsindex()
            // 切换按钮选择样式
            this.current = index
            this.current_i=y
        },
        pageStyle(){
            // 切换页面列表显示
            this.pageChose = !this.pageChose
            this.userChange = !this.userChange
            this.currentPage=1
            this.getgoodsindex()
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage=val
            this.getgoodsindex()
        },
        toproductdetails(item){
            this.$router.push({ name: 'productdetails', params: { goods_id:item.goods_id }})
        },
    }
}
</script>
<style lang="scss" scoped>
.direct-search-title{
    width: 1200px;
    margin: 0 auto;
    text-align: left;
    height: 76px;
    line-height: 76px;
    font-size: 12px;
    color: #666;
    span:nth-child(2){
        font-weight: bold;
    }
}
.direct-container{
    width: 1200px;
    margin: 0 auto;
    display: flex;
}
.direct-search-chose{
    width: 240px;
    margin-right: 12px;
}
.direct-search-list{
    width: 948px;
    font-size: 12px;
    .user-chose{
        display: flex;
        height: 52px;
        line-height: 52px;
        padding: 0 12px;
    }
    .user-chose-price{
        background-color: #fff;
    }
    .user-chose /deep/ .el-checkbox-group{
        display: flex;
    }
    .el-checkbox-group{
        margin-left: 28px;
    }
    .el-input{
        width: 52px;
    }
    .el-input /deep/ .el-input__inner{
        height: 28px;
        line-height: 28px;
        padding: 0 8px;
    }
    .el-rate{
        line-height: 4;
        margin-left: 8px;
    }
}
.btn-title{
    overflow: hidden;
}
.direct-search-list .user-chose-btn{
    float: left;
    height: 40px;
    line-height: 40px;
    width: 500px;
}
.page-list{
    float: right;
    line-height: 40px;
    color: #333;
    font-size: 12px;
    margin-right: 12px;
    span:nth-child(2){
        display: inline-block;
        margin: 0 8px;
        cursor: pointer;
        font-size: 12px;
    }
    span:nth-child(3){
        display: inline-block;
        cursor: pointer;
        font-size: 12px;
    }
    .pageChose{
        color: #FF7804;
    }
}
.user-chose-btn div{
   cursor: pointer;
   .noActive{
       color: #333;
   }
} 
.user-chose-btn .activeBtn{
    color: #FF7804;
    font-weight: bold;
}
.user-chose-btn /deep/ .active_i{
    color: #FF7804;
    font-weight: bold;
}
.user-chose-btn i{
    color: #333;
    margin-bottom: 10px;
}

.btn-margin{
    margin-right: 48px;
    // width: 100px;
}
.direct-img{
    width: 932px;
    padding: 20px 8px;
    background-color: #fff;
    color: #333;
    font-size: 12px;
    overflow: hidden;
    .img-container{
        width: 227px;
        height: 417px;
        background-color: #fff;
        float: left;
        margin-right: 8px;
        .images-top{
            width: 211px;
            height: 211px;
            margin-left: 8px;
            margin-bottom: 8px;
            img{
                width: 100%;
                border-radius: 6px;
                cursor: pointer;
            }
        }
        .colors-num{
            height: 24px;
            line-height: 24px;
            background-color: #F5F5F5;
            margin-bottom: 6px;
            text-align: center;

        }
        .text-says{
            height: 32px;
            line-height: 16px;
            overflow: hidden;
            text-align: left;
            margin-bottom: 8px;
            cursor: pointer;
        }
        .sale{
            text-align: left;
            margin-bottom: 12px;
            span{
                display: inline-block;
                width: 56px;
                height: 20px;
                line-height: 20px;
                color: #fff;
                background-color: #FE390F;
                font-weight: bold;
                text-align: center;
                border-radius: 2px;
            }
        }
        .zar-price{
            margin-bottom: 6px;
            span:first-child{
                color: #FF7900;
                font-size: 14px;
                font-weight: bold;
            }
            span:last-child{
                color: #666;
                font-size: 14px;
                margin-left: 5px;
            }
        }
        .img-star{
            display: flex;
            .el-rate{
                margin: 0;
                flex: 0 0 66px;
                line-height: 1;
                & /deep/ .el-rate__icon{
                    margin: 0;
                    font-size: 12px;
                }
            }
        }
        .add-hert{
            margin-bottom: 14px;
            span:first-child{
                width: 54px;
                height: 18px;
                border: 1px solid #B4CC06;
                color: #B4CC06;
                display: inline-block;
                line-height: 18px;
                text-align: center;
                font-size: 12px;
            }
            span:last-child{
                float: right;
                cursor: pointer;
                color: #999;
            }
        }
    }
    .img-container-table{
        width: 932px;
        height: 216px;
        border: 1px solid #dedede;
        box-sizing: border-box;
        overflow: hidden;
        margin-bottom: 8px;
        .table-img,.table-says{
            float: left;
            margin: 12px 8px;
            font-size: 12px;
        }
        .table-img{
            margin-right: 25px;
            div:first-child{
                width: 160px;
                margin-bottom: 6px;
                img{
                    width: 100%;
                    border-radius: 6px;
                    cursor: pointer;
                }
            }
            div:last-child{
                text-align: center;
                color: #333;
                background: #F5F5F5;
                height: 24px;
                line-height: 24px;
            }
        }
        .table-says{
            text-align: left;
            .sale{
                margin-top: 16px;
                span{
                    width: 56px;
                    height: 20px;
                    background-color: #FE390F;
                    line-height: 20px;
                    text-align: center;
                    color: #fff;
                    font-weight: bold;
                }
            }
        }
    }
    .marignR{
            margin-right: 0;
        }
}
 .pagimg{
        //   margin-top: 24px;
          overflow: hidden;
          padding-bottom: 20px;
          background-color: #fff;
      }
      #pagesComment{
           float: right;
      }
      #pagesComment /deep/ .active{
          background-color: #FEB610;
      }
      #pagesComment /deep/ li{
          width: 32px;
          height: 32px;
          line-height: 32px;
      }
      #pagesComment /deep/ .btn-prev ,#pagesComment /deep/ .btn-next{
          width: 32px;
          height: 32px;
          line-height: 32px;
      }
      #pagesComment /deep/ .el-input__inner{
          width: 50px;
          height: 32px;
          line-height: 32px;
      }
.carousel-recommend{
    width: 948px;
    margin-top: 24px;
    // margin-bottom: 40px;
    & /deep/ .el-carousel__indicators{
        display: none;
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
    .carousel-imgs-container{
        margin-left: 38px;
    }
    .carousel-imgs{
        float: left;
        width: 200px;
        margin: 0 9px;
        background: #fff;
        font-size: 12px;
        text-align: left;  
        img{
            width: 100%;
            border-radius: 6px;
            cursor: pointer;
        }
        .carousel-text-says{
            color: #333;
            height: 32px;
            line-height: 16px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 8px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .carousel-zar-price{
            font-size: 14px;
            span:first-child{
                color: #FF7900;
                font-weight: bold;
            }
             span:last-child{
                color: #666;
                margin-left: 10px;
            }
        }

    }
}

</style>

