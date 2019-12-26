<template>
  <div class="highFashion">
      <HeaderHtml></HeaderHtml>
      <Search :fixedMsg="searchBarFixed"></Search>
    <Highfashionimg></Highfashionimg>
  </div>
</template>


<script>
    import HeaderHtml from '@/components/common/headerhtml'
    import Search from '@/components/common/search'
    import Highfashionimg from '@/components/common/highfashionimg'
    export default {
        data() {
            return {
             searchBarFixed:{
                    isfixed:false,
                    isshow:true
                },
            };
        },
        components:{
            HeaderHtml,
            Search,
            Highfashionimg
        }
    };
</script>
   
<style lang="scss" scoped>
    
</style>