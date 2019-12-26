<template>

<!-- 商品详情页下面左侧top selling 组件 -->

    <div class="datailsLeftContainer">
        <div class="datailsLeftMarg" v-if="topsellingData.length>0">
            <div class="statrtTitle">Top Selling</div>
            <router-link v-for="(item, index) in topsellingData" :key="index" tag="div" :to="{name:'productdetails',params: {goods_id: item.goods_id}}">
                <div class="imgStars" style="width:224px;height:224px;background:rgba(216,216,216,1);border-radius:8px;overflow: hidden;"><img :src="item.original_img" style="width:224px;height:224px;display:block;"></div>
                <p>R {{ item.shop_price }}</p>
                <div class="startsConer">
                    <span class="el-icon-star-on"></span>
                    <span class="startNum">{{ item.goods_rate }}</span>
                    <span class="soldNum">{{ item.collect_sum }} Sold</span>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
import api from '@/api'
export default{
    props:["goodsInfoval"],
    data () {
        return {
            topsellingData:[],
            goods_id:""
        }
    },
    created() {
        this.getgoodsTop()
    },
    watch: {
        goodsInfoval(val){
            this.goods_id=val.goodsinfo.goods_id
        }
    },
    methods: {
        getgoodsTop(){//商品推荐
            let params = {
                limit:"4"
            }
            this.axios.post(api.goodsTop, params)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        this.topsellingData=data
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
<style lang="scss" scoped>
    .datailsLeftContainer{
        width: 260px;
        background-color: #fff;
        border-radius: 8px;
        text-align: left;
        padding-bottom: 30px;
        .datailsLeftMarg{
            width: 224px;
            margin: 0 auto;
            overflow: hidden;
           .statrtTitle{
                font-size: 17px;
                font-weight: bold;
                margin-top: 17px;
            }
            .imgStars{
                width: 224px;
                height: 224px;
                margin-top: 30px;
                margin-bottom: 16px;
                img{
                    width: 100%;
                    cursor: pointer;
                }
            }
             .startsConer{
               .el-icon-star-on{
                   color: #FF3308;
               }
               .startNum,.soldNum{
                   font-size: 14px;
                   color: #666;
               }
               .soldNum{
                   float: right;
               }
            }
            p{
                font-size: 24px;
                font-weight: Medium;
            }
        }
    }
</style>