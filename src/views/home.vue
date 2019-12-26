<template>
    <div>
        <div class="home">
            <HeaderHtml></HeaderHtml>
        </div>
        <div>
            <Search id="searchBar" :fixedMsg="searchBarFixed" :homedata='homedata'></Search>
        </div>
        <div class="home">
            <div class="homeTop">
                <Hovermenu :isindexasideShow='true' :homedata='homedata'></Hovermenu>
                <Carousel :homedata='homedata'></Carousel>
                <Homeuserlogin></Homeuserlogin>
            </div>
            <div>
                <Flashdealsmore :homedata='homedata'></Flashdealsmore>
            </div>
            <div>
                <FuturedCategories :homedata='homedata'></FuturedCategories>
            </div>
            <div>
                <MoreToLove :homedata='homedata'></MoreToLove>
            </div>
        </div>
        <Share></Share>
        <div>
            <Footer></Footer>
        </div>
    </div>
</template>
<script>
    import HeaderHtml from '@/components/common/headerhtml'
    import Search from '@/components/common/search'
    import Hovermenu from '@/components/common/hovermenu'
    import Carousel from '@/components/common/carousel'
    import Homeuserlogin from '@/components/common/homeuserlogin'
    import Flashdealsmore from '@/components/common/flashdealsmore'
    import FuturedCategories from '@/components/common/futuredCategories'
    import MoreToLove from '@/components/common/moreToLove'
    import Share from "@/components/common/share"
    import Footer from "@/components/common/footerhtml"

    export default {
        name:"home",
        components: {
            HeaderHtml,
            Search,
            Hovermenu,
            Carousel,
            Homeuserlogin,
            Flashdealsmore,
            FuturedCategories,
            MoreToLove,
            Share,
            Footer
        },
        data(){
            return{
                searchBarFixed:{
                    isfixed:false,
                    isshow:false
                },
                userdata:{},//用户登录数据
                homedata:{}//首页数据
            }
        },
        created() {
            this.gethomedata()
        },
        mounted() {
            window.addEventListener("scroll", this.handleScroll);
        },
        beforeDestroy() {
            window.removeEventListener("scroll", this.handleScroll);
        },
        methods:{
            // getuserdata(){//获取用户登录数据
            //     return new Promise((resolve)=>{
            //         if(localStorage.getItem("userdata")){
            //             this.userdata=localStorage.getItem("userdata")
            //             resolve(this.userdata)
            //         }
            //     })
            // },
            gethomedata(){//获取首页数据
                // this.getuserdata().then((res)=>{
                //     var res=JSON.parse(res)
                //     this.$store.dispatch('home/gethomedataaction',res).then((data)=>{
                //         this.$nextTick(()=>{
                //             console.log(data);
                //             if(data.code==200){
                //                 this.homedata=data.data
                //             }
                //         })
                //     })
                // }) 
                this.$store.dispatch('home/gethomedataaction').then((data)=>{
                    this.$nextTick(()=>{
                        if(data.code==200){
                            this.homedata=data.data
                        }
                    })
                }) 
            },
            handleScroll () {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                var offsetTop = document.getElementById('searchBar').offsetTop
                if (scrollTop > offsetTop) {
                    this.searchBarFixed.isfixed = true
                    this.searchBarFixed.isshow = true
                }
                else {
                    this.searchBarFixed.isfixed = false
                    this.searchBarFixed.isshow = false
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
.home{
    width: 1200px;
    margin: 0 auto;
    .homeTop{
        overflow: hidden;
        margin-top: 24px;
    }
    
}

</style>