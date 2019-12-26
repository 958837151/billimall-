<template>

<!-- 主页轮播图组件 -->

  <div class="block">
    <el-carousel trigger="click" :interval="4000">
      <el-carousel-item v-for="item in carouselhomedata" :key="item.ad_id">
        <img :src="item.ad_code" @click="toDirectSearch(item.ad_link)" style="width:708px;height:286px;display:block;">
      </el-carousel-item>
    </el-carousel>
    <div>
        <CarouselBottom :homedata='homedata'></CarouselBottom>
    </div>
  </div>
</template>
<script>
    import CarouselBottom from '@/components/common/carouselBottom';
    export default {
      name:'carousel',
      props:["homedata"],
      data(){
          return{
              carouselhomedata:[],
          }
      },
      components:{
          CarouselBottom
      },
      created () {
        
      },
      watch: {
        homedata(val){
            this.getcarouselhomedata(val)
        }
      },
      methods: {
        toDirectSearch(cat_id){//跳转到分类搜索
            // this.$router.push({ name: 'DirectSearch', params: { cat_id:cat_id }})
            this.$router.push({ name: "DirectSearch", query: { Title: "" ,cat_id :cat_id} });
        },
        getcarouselhomedata(data){
            if(data){
                this.carouselhomedata=data.banner
            }
        },
      }
    }
</script>
<style lang="scss" scoped>
.block{
    float: left;
    width: 708px;
}
.el-carousel{
    height: 286px;
    overflow: hidden;
    img {
        width:100%;
        cursor: pointer;
    }
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .block /deep/ .el-carousel__button{
    height: 10px;
    width: 10px;
    border-radius: 50%;
  }
</style>