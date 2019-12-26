<template>
<!-- 个人中心页 -->
    <div class="personal-center">
        <HeaderHtml></HeaderHtml>
        <div>
            <Search id="searchBar" :fixedMsg="searchBarFixed"></Search>
        </div>
        <div class="cart">
            <Shoppingcart></Shoppingcart>
        </div>
    </div>
</template>
<script>
    import HeaderHtml from '@/components/common/headerhtml'
    import Search from '@/components/common/search'
    import Shoppingcart from '@/components/common/shoppingcart'
    export default {
        components: {
            HeaderHtml,
            Search,
            Shoppingcart
        },
        data(){
            return{
                searchBarFixed:{
                    isfixed:false,
                    isshow:false
                },
            }
        },
        methods:{
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
    .cart{
        width: 1200px;
        margin: 0 auto;
        margin-top: 14px;
    }

</style>