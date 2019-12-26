<template>

<!-- 商品详情页里面的overview组件 -->

    <div class="overview">
        <div class="overviewTop">
            We arm to provide our best quality products and customer service. and our customer service specialists are always standing by to solve any of your problem. If you have any questions about the shipping time & defective quality & items no received, please do contact us, we can give you a satisfied answer & resolution. We greatly appreciate your 5-STAR POSITIVE feedback and please do NOT leave negative feedback without asking for help.
        </div>
       <div v-for="(item,index) in urls" :key="index">
           <img :src="item.image_url">
       </div>
       <Customer></Customer>
    </div>
</template>
<script>
import Customer from '@/components/common/customer'
export default{
    props:["goodsInfoval"],
    data(){
        return{
            urls:[
                // require('@/assets/images/zhijia.png'),
                // require('@/assets/images/you.png'),
                // require('@/assets/images/ping.png'),
            ]
        }
    },
    components:{
        Customer
    },
    created() {
        
    },
    watch: {
        goodsInfoval(val){
            this.getImg(val.goodsinfo)
        }
    },
    methods: {
        getImg(data){
            if (data.goods_content) {
                
            }else{
                this.urls=data.img
            }
        }
    }
}
</script>
<style lang="scss" scoped>
   .overview{
       margin-left: 26px;
       .overviewTop{
            margin-top: 24px;
            margin-bottom: 18px;
             text-align: left;
             color: #333;
             font-size: 20px;
       }
       img{
           width: 100%;
           display: block;
       }
       
   }
   .overview /deep/ .customer{
       margin-left: none;
   }
</style>