<template>
    <div class="recommended" v-if="recommandData.length>0">
        <div class="recommendedTitle">Recommended For You</div>
        <div class="recommendedList" v-for="(item, index) in recommandData" :key="index">
            <div><img :src="item.imgUrl"></div>
            <p>R {{ item.shop_price }}</p>
        </div>
    </div>
</template>
<script>
    import api from '@/api'
    export default{
        props:["goodsInfoval"],
        data () {
            return {
                recommandData:[],
                goods_id:""
            }
        },
        created() {
            this.getgoodsRecommand()
        },
        watch: {
            goodsInfoval(val){
                this.goods_id=val.goodsinfo.goods_id
            }
        },
        methods: {
            getgoodsRecommand(){//商品推荐
                let params = {
                    goods_id:this.goods_id*1,
                }
                this.axios.post(api.goodsRecommand, params)
                    .then(res => {
                        if (res.data.code==200) {
                            let data=res.data.data
                            this.recommandData=data
                        }
                        else if (res.data.code==401) {
                            this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                        }
                        else{
                            this.$message({
                                showClose: true,
                                message: res.data.message,
                                type: 'warning'
                            });
                        }
                    })
            },
        }
    }
</script>
<style lang='scss' scoped>
    .recommended{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: #666;
        width: 100%;
        height: 100%;
        .recommendedTitle{
            font-size: 14px;
            text-align: left;
            line-height: 20px;
        }
        .recommendedList{
            width: 120px;
            cursor: pointer;
            img{
                width: 100%;
            }
            p{
                font-size: 16px;
                margin-top: 8px;
            }
        }
    }
</style>