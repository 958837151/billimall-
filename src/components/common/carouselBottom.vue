<template>

<!-- 轮播图下面的热卖图片展示组件 -->

    <div class="imageConter">
        <div class="carouselBottomImag" v-for="item in carouselBottomhomedata" :key="item.id" @click="toDirectSearch(item.product.cat_id)">
            <div><img :src="item.product.imgUrl"></div>
            <div>R {{ item.product.shop_price }}</div>
            <div>{{ item.name }}</div>
            <div class="shade"></div>
        </div>
    </div>
  </template>
  
<script>
    export default {
        name:'carouselBottom',
        props:["homedata"],
        data(){
            return{
                carouselBottomhomedata:[],
            }
        },
        created () {

        },
        watch: {
            homedata(val){
                this.getcarouselBottomhomedata(val)
            }
        },
        methods: {
            toDirectSearch(cat_id){//跳转到分类搜索
                // this.$router.push({ name: 'DirectSearch', params: { cat_id:cat_id }})
                this.$router.push({ name: "DirectSearch", query: { Title: "" ,cat_id :cat_id} });
            },
            getcarouselBottomhomedata(data){
                if(data){
                    this.carouselBottomhomedata=data.subCategory
                }
            },
        }
    }
</script>
  
  <style lang="scss" scoped>
   .imageConter{
        width: 708px;
        height: 220px;
        margin-top: 16px;
        background-color: #fff;
        .carouselBottomImag:last-child{
            border-right: none;
        }
        .carouselBottomImag{
            width: 25%;
            float: left;
            height: 100%;
            box-sizing: border-box;
            border-right: 1px solid #DEDEDE;
            position: relative;
            &:hover{
                .shade{
                    display: block;
                }
            }
            .shade{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: #dedede;
                opacity: 0.2;
                display: none;
                cursor: pointer;
            }
            img{
                width: 160px;
                height: 160px;
                margin-top: 8px;
                border-radius: 5px;
                
            }
            div:nth-child(2){
                position: absolute;
                bottom:35px;
                left: 41px;
                width: 94px;
                height: 31px;
                background-color: #FF7805;
                color: #fff;
                line-height: 31px;
                border-radius: 15px;
                font-size: 14px;
            }
            div:nth-child(3){
                font-size: 14px;
                margin-top: 23px;
                color:#333;
                font-weight: bold;

            }
        }
   }
  </style>