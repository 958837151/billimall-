<template>
    <div class="allCategories">
        <HeaderHtml></HeaderHtml>
        <Search :fixedMsg="searchBarFixed" :homedata='homedata'></Search>
        <Allcategories :allCategoriesdata=homedata></Allcategories>
        <Footerhtml></Footerhtml>
    </div>
</template>

<script>
    import HeaderHtml from '@/components/common/headerhtml'
    import Search from '@/components/common/search'
    import Allcategories from '@/components/common/allcategories'
    import Footerhtml from '@/components/common/footerhtml'
    export default {
        name:'allCategories',
        data() {
            return {
                searchBarFixed:{
                    isfixed:false,
                    isshow:true
                },
                userdata:'',
                homedata:{}
            };
        },
        components:{
            HeaderHtml,
            Search,
            Allcategories,
            Footerhtml
        },
        created () {
            this.gethomedata()
        },
        methods: {
            gethomedata(){//获取首页数据
                this.$store.dispatch('home/gethomedataaction').then((data)=>{
                    this.$nextTick(()=>{
                        this.homedata=data.data
                    })
                })
            },
        }
    };
</script>
   
<style lang="scss" scoped>
    
</style>