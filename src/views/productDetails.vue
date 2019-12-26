 <template>
    <div>
        <HeaderHtml></HeaderHtml>
        <Search :fixedMsg="searchBarFixed"  :homedata='homedata'></Search>
        <div class="productDetails">
            <div class="navigation">
                <!-- <span> My BilliMall</span> ><span> Order List</span> ><span style="font-weight:bold;"> Order Detail </span> -->
            </div>
            <div class="detailsContainer">
                <div>
                    <Magnify :goodsInfoval="goodsInfoval"></Magnify>                   
                </div>
                <div>
                    <Specification :goodsInfoval="goodsInfoval" :coupos_listdata="coupos_listdata" @getStandardData="getspecifica" ref="specifiChange"></Specification>          
                </div>
                <div class="recommendeds">
                    <Recommended :goodsInfoval="goodsInfoval"></Recommended>
                </div>
            </div>
        </div>
        <div class="detailsBottomContainer">
            <div class="detailsBottom">
                <div class="datailsBottomLeft">
                    <Topselling :goodsInfoval="goodsInfoval"></Topselling>
                </div>
                <div class="datailsBottomRight">
                    <Productovercust id="productDetail" :goodsInfoval="goodsInfoval" :homedata='homedata' :curtomerFixed="customerIsfixed" :productSpecifica="userSpecification" @postAlert="getAlert" @scrollTopTitle="titleReturnTop"></Productovercust>
                </div>
            </div>
        </div>
        <Facebookfix></Facebookfix>
        <Footerhtml></Footerhtml>
    </div>
</template>
<script>
    import api from '@/api'
    import Magnify from '@/components/common/magnify'
    import Search from '@/components/common/search'
    import HeaderHtml from '@/components/common/headerhtml'
    import Specification from '@/components/common/specification'
    import Recommended from '@/components/common/recommended'
    import Facebookfix from '@/components/common/facebookfix'
    import Topselling from '@/components/common/topselling'
    import Productovercust from '@/components/common/productovercust'
    import Footerhtml from '@/components/common/footerhtml'
    export default {
        data(){
            return{
                "max":require("@/assets/images/phone1.jpg"),
                "min":require("@/assets/images/phone2.jpg"),
                 searchBarFixed:{
                    isfixed:false,
                    isshow:true
                },
                customerIsfixed:false,
                userSpecification :null,
                isAlert:null,
                goodsInfoval:{},//商品详情数据
                coupos_listdata:{},//红包列表数据
                homedata:{},//首页数据
                timer: null,
                goods_id:""
            }
        },
        components: {
            Magnify,
            Search,
            HeaderHtml,
            Specification,
            Recommended,
            Facebookfix,
            Topselling,
            Productovercust,
            Footerhtml
        },
        created(){
            if (this.$route.params.goods_id) {
                this.goods_id=this.$route.params.goods_id
            }
            console.log(this.$route.params.goods_id)
            this.gethomedata()
            this.getGoodsInfoactionVal()
        },
        beforeRouteUpdate(to, from, next) {
            //在当前路由改变，但是该组件被复用时调用
            //对于一个带有动态参数的路径 /good/:id，在 /good/1 和 /good/2 之间跳转的时候，
            // 由于会渲染同样的good组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
            // console.log(this, 'beforeRouteUpdate'); //当前组件实例
            // console.log(to,to.params.goods_id, '组件独享守卫beforeRouteUpdate第一个参数');
            // console.log(from, '组件独享守beforeRouteUpdate卫第二个参数');
            // console.log(next, '组件独享守beforeRouteUpdate卫第三个参数');
            this.goods_id=to.params.goods_id
            this.getGoodsInfoactionVal()
            setTimeout(() => {
                this.retunrnTop()
            }, 300);
            next(vm => {
                // console.log(vm)
            });
        },
        mounted() {
            window.scroll(0,0) //进入到商品详情页重置滚动条到顶部
            window.addEventListener("scroll", this.handleScroll); //监听滚动
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.handleScroll);
        },
        methods:{
            getGoodsInfoactionVal(){
                this.getgoodsInfoaction().then((data) =>{
                    this.goodsInfoval=data;
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
            retunrnTop() {//置顶
                // location.reload() 
                // return
                let that = this;
                cancelAnimationFrame(that.timer);
                that.timer = requestAnimationFrame(function fn() {
                    var oTop = document.body.scrollTop || document.documentElement.scrollTop;
                    if (oTop > 0) {
                        document.body.scrollTop = document.documentElement.scrollTop = oTop - 100;
                        that.timer = requestAnimationFrame(fn);
                    } else {
                        cancelAnimationFrame(that.timer);
                    }
                });
            },
            gethomedata(){//获取首页数据
                this.$store.dispatch('home/gethomedataaction').then((data)=>{
                    this.$nextTick(()=>{
                        this.homedata=data.data
                    })
                })
            },
            handleScroll () {
                // 获取滚动的距离
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                // 获取目标元素的距离顶部距离
                var offsetTop = document.getElementById('productDetail').offsetTop
                // 两个距离进行判断
                if (scrollTop > offsetTop) {
                    this.customerIsfixed = true
                } else {
                    this.customerIsfixed = false
                }
            },
            getspecifica(data){   
                this.userSpecification = data; //子组件的值传给父组件
            },
            getAlert(data){
                this.isAlert = data;
                this.$refs.specifiChange.changeIsClose(this.isAlert); //调用子组件的方法，让子组件获得父组件的值
            },
            titleReturnTop(){
               scroll(0,760)
            }
        }
    }
    </script>
    <style lang="scss" scoped>
        $bla:#000;
        .productDetails{
            background-color: #fff;
            padding-bottom: 36px;
            // overflow: hidden;
            .detailsContainer{
                width: 1200px;
                margin: 0 auto;     
                display: flex;
                .recommendeds{
                    margin-left: 38px;
                }
            }
            .navigation{
                width: 1200px;
                margin: 0 auto;
                height: 44px;
                line-height: 44px;
                text-align: left;
                color: #666;
                font-size: 12px;
                box-sizing: border-box;
                span{
                    cursor: pointer;
                }
            }
        }
        .detailsBottomContainer{
            margin-top: 14px;
            .detailsBottom{
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;
                .datailsBottomLeft,.datailsBottomRight{
                    float: left;
                }
                .datailsBottomRight{
                    margin-left: 4px;
                }
            }
        }
    </style>