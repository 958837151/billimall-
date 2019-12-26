<template>
    <div class="more">
        <p class="loveTitle">
            More To Love
        </p>
        <div class="list">
            <div class="listImg" v-for="item in moreToLovehomedata.list" :key="item.goods_id">
                <div>
                    <router-link :to="{name:'productdetails',params: {goods_id: item.goods_id}}">
                        <div class="shade">
                            <img :src="item.imgUrl">
                            <div></div>
                        </div>
                    </router-link>
                    <div>
                        <p>{{ item.goods_name }}</p>
                    </div>
                    <div>
                        <p>R {{ item.shop_price }}</p>
                    </div>
                    <div>
                        <span> <i class="el-icon-star-on"></i>{{ item.goods_rate }}</span>
                        <span>{{ item.sales_sum }} Sold</span>
                    </div>
                </div>
            </div>     
            <!--infinite-loading这个组件要放在列表的底部，滚动的盒子里面！-->
            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div>
    </div>
</template>
<script>
    import api from '@/api'
    import InfiniteLoading from 'vue-infinite-loading';
    export default {
        name:'moreToLove',
        props:['homedata'],
        data() {
            return {
                moreToLovehomedata:{},
                page:1,//当前页
                countPage:1,//总页
                perPage:12,//每页取几个商品
                tempdata:{}//懒加载数据
            };
        },
        created () {
            
        },
        watch: {
            homedata(val){
                this.getmoreToLovehomedata(val)
            }
        },
        methods: {
            getgoodsindexlist(page){
                let params={
                    page:page,
                    perPage:this.perPage
                }
                this.axios.post(api.goodsindex, params)
                    .then(response => {
                        if(response.status==200){
                            this.tempdata=response.data.data.list
                        }
                    })
            },
            getmoreToLovehomedata(data){
                if(data){
                    this.moreToLovehomedata=data.goods
                    this.countPage=data.goods.page.countPage
                }
            },
            infiniteHandler($state) {
                this.page++
                if(this.page>this.countPage){
                    return false
                }
                this.getgoodsindexlist(this.page)
                var that=this
                setTimeout(() => {
                    const temp = [];
                    that.tempdata.forEach(item => {
                        temp.push(item);
                    });
                    this.moreToLovehomedata.list = this.moreToLovehomedata.list.concat(temp);
                    $state.loaded();
                }, 1000);
            },
        },
        components: {
            InfiniteLoading
        }
    }
</script>
<style lang="scss" scoped>
    .more{
        width: 1200px;
        .loveTitle{
            background-color: #FAFAFA;
                font-size: 24px;
                color: #333;
                font-weight: bold;
                text-align: left;
                margin-bottom: 16px;
                margin-top: 15px;
        }
        .list{
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                border-radius: 8px;
            }
            .listImg{
                &:hover{
                    box-shadow: 0 0 4px #666;
                }
                background-color: #fff;
                border-radius: 6px;
                width: 194px;
                height: 296px;
                margin-bottom: 12px;
                float: left;
                margin-right: 5px;
                div:nth-child(1){
                    width: 180px;
                    height: 180px;
                    margin: 0 auto;
                    margin-top: 12px;
                }
                div:nth-child(2){
                    margin-top: 5px;
                    p{
                    width: 180px;
                    height: 18px;
                    margin-bottom: 12px;
                    line-height: 18px;
                    color: #666;
                    font-size: 12px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    }
                }
                div:nth-child(3){
                    margin-top: 5px;
                    p{
                        font-size: 14px;
                        font-weight: bold;
                        color: #333;
                        text-align: left;
                    }
                }
                 div:nth-child(4){
                     text-align: left;
                     margin-top: 15px;
                    span{
                        font-size: 12px;
                        color: #666;
                        text-align: left;
                        line-height: 18px;
                    }
                     span:first-child{
                        i{
                            color: #FF3308;
                            font-size: 13px;
                        }
                    }
                    span:last-child{
                        float: right;
                    }
                }
            }
        }
    }
    .shade{
        position: relative;
        div{
            height: 100%;
            margin: 0;
            width: 100%;
            opacity: 0.2;
            position: absolute;
            background-color: #dedede;
            top: 0;
            left: 0;
            display: none;
            cursor: pointer;
        }
        &:hover{
            div{
                display: block;
            }
        }
    }
</style>