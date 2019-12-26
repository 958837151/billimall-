<template>

    <!-- 主页左侧分类展示组件 -->

    <div class="asides">
        <div class="navigation" :class="{'backgrounds':isbackgrounds}">
            <div>
                <ul>
                    <li class="leftLiFirst" @click="toAllCategories">
                        <div>
                            <span class="iconfont icon-caidan"></span>
                            <span>Categories</span>
                        </div>
                    </li>
                    <li v-for="(one,i) in hovermenuhomedata" :key="i" @mouseenter="enter(i,$event)" @mouseleave="leave(i,$event)" ref="menuitem" class="leftLi">
                        <div class="leftLi_leftdiv">
                            <img :src="one.image" class="leftLi_leftimg">
                            <span>{{one.name}}</span>
                        </div>
                        <div class="asideShow" :class="isindexasideShow ? 'isindexasideShow' : '' " @mouseenter="sceondEnter(i,$event)" @mouseleave="sceondLeave(i,$event)">
                            <div class="classification">
                                <div class="classification_left">
                                    <!-- <div class="classificationlist">
                                        <h5>High Fashion</h5>
                                        <ul>
                                            <li @click="toDirectSearch">Hoodies & Sweatshirts</li>
                                            <li @click="toDirectSearch">Hoodies & Sweatshirts</li>
                                            <li @click="toDirectSearch">Hoodies & Sweatshirts</li>
                                        </ul>
                                    </div> -->
                                    <div class="classificationlist" v-for="two in one.children" :key="two.id">
                                        <h5 @click="TwoLevelTitleToDirectSearch(two.id)">{{ two.name }}</h5>
                                        <ul>
                                            <li @click="toDirectSearch(three.id)"  v-for="(three, index) in two.children" :key="index">{{ three.name }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="classification_right">
                                    <ul>
                                        <!-- <li @click="toHighfashions">Sexy Styles<img src="../../assets/images/7.png" alt=""></li>
                                        <li @click="toHighfashions">Sexy Styles<img src="../../assets/images/7.png" alt=""></li>
                                        <li @click="toHighfashions">Sexy Styles<img src="../../assets/images/7.png" alt=""></li> -->
                                    </ul>
                                </div> 
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'hovermenu',
    props: ['isindexasideShow','homedata'],
    data() {
        return {
            whereli:"",
            isbackgrounds:false,
            hovermenuhomedata:[]//接收过来的父组件数据
        };
    },
    created() {

    },
    watch: {
        homedata(val){
            this.gethomedata(val)
        }
    },
    methods:{
        gethomedata(data){//获取首页数据
            this.$nextTick(()=>{
                if(data){
                    for (const key in data.category) {
                        this.hovermenuhomedata.push(data.category[key])
                    }
                }
            })
        },
        enter(i,e){
            if(this.$refs.menuitem[i]){
                this.$refs.menuitem[i].style.backgroundColor="#FFF"
            }
        },
        leave(i,e){
            if(this.$refs.menuitem){
                this.$refs.menuitem.forEach(element => {
                    element.style.backgroundColor="#F9F9F9"
                });
            }
        },
        sceondEnter(i,e){
            if(this.$refs.menuitem[i]){
                this.$refs.menuitem[i].style.backgroundColor="#FFF"
                this.isbackgrounds = true
            }
        },
        sceondLeave(i,e){
            this.isbackgrounds = false
        },
        toHighfashions(){
            this.$router.push({ name: 'Highfashions', params: {  }})
        },
        toAllCategories(){
            this.$router.push({ name: 'AllCategories', params: {  }})
        },
        toDirectSearch(cat_id){
            // this.$router.push({ name: 'DirectSearch', params: { cat_id:cat_id }})
            this.$router.push({ name: "DirectSearch", query: { Title: "" ,cat_id :""} });
        },
        TwoLevelTitleToDirectSearch(cat_id){
            // this.$router.push({ name: 'DirectSearch', params: { cat_id:cat_id }})
            this.$router.push({ name: "DirectSearch", query: { Title: "" ,cat_id :cat_id} });
        }
    }
};
</script>

<style lang="scss" scoped>
.asides{
    float: left;
    background-color: #fff;
    margin-right: 5px;
    &::before{
        content: "";
        display: block;
        clear: both;
    }
    .navigation{
        width: 240px;
        background-color: #fff;
        font-size: 14px;
        color: #333;
        text-align: left;
        position: relative;
        &:hover{
            background-color: #F9F9F9;
        }
        .leftLi{
            width: 100%;
            height: 37px;
            line-height: 37px;
            span{
                display: inline-block;
            }
            span:first-child{
                margin-left: 8px;
                margin-right: 9px;
            }
            .asideShow{
                display: none;
                width: 824px;
                background-color: #fff;
                min-height: 522px;
                position: absolute;
                top:0px;
                left: 240px;
                z-index: 99;
                border-left: none;
                .classification{
                    width: 100%;
                    display: flex;
                    .classification_left{
                        width: 612px;
                        margin-left: 32px;
                        padding-top: 16px;
                        padding-bottom: 16px;
                        column-gap: 0;
                        -moz-column-count:3; /* Firefox */
                        -webkit-column-count:3; /* Safari 和 Chrome */
                        column-count: 3;
                        .classificationlist{
                            -moz-page-break-inside: avoid;
                            -webkit-column-break-inside: avoid;
                            break-inside: avoid;
                            margin-bottom: 32px;
                            h5{
                                height:15px;
                                font-size:12px;
                                font-family:HelveticaNeue;
                                // font-weight:500;
                                color:rgba(51,51,51,1);
                                line-height:15px;
                                margin-bottom: 16px;
                                cursor: pointer;
                            }
                            ul{
                                li{
                                    font-size:12px;
                                    font-family:HelveticaNeue;
                                    color:rgba(51,51,51,1);
                                    line-height:14px; 
                                    margin-bottom: 20px;
                                    cursor: pointer;
                                    &:last-child{
                                        margin-bottom: 0;
                                    }
                                    &:hover{
                                        text-decoration: underline;
                                        text-decoration-color: rgba(25,116,161,1);
                                        color:rgba(25,116,161,1);
                                    }
                                }
                            }
                        }
                    }
                    .classification_right{
                        margin-right: 12px;
                        ul{
                            width:200px;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-items: center;
                            flex-wrap: wrap;
                            li{
                                width:200px;
                                height:61px;
                                background:rgba(255,255,255,1);
                                border:1px solid rgba(237,237,237,1);
                                padding-left: 16px;
                                padding-top: 16px;
                                box-sizing: border-box;
                                font-size:14px;
                                font-family:HelveticaNeue;
                                font-weight:500;
                                color:rgba(51,51,51,1);
                                line-height:17px;
                                position: relative;
                                cursor: pointer;
                                img{
                                    position: absolute;
                                    height: 60px;
                                    bottom: 10px;
                                    right: 20px;
                                }
                            }
                        }
                    }
                }
            }
            .isindexasideShow{
                width: 935px;
                .classification{
                    justify-content: space-between;
                    .classification_left{
                        width: 685px;
                    }
                }
            }
        }
        .leftLi:hover{
            background-color: #fff;
            border: 1px solid #eee;
            border-right: none;
            color: #000;
            .asideShow{
                height: 100%;
                display: block;
                border: 1px solid #eee;
                border-left: none;
            }
        }
        .leftLi_leftdiv{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            &:hover{
                cursor: pointer;
            }
            .leftLi_leftimg{
                display: none;
                width: 20px;
                height: 20px;
                margin: 0 10px;
            }
            span{
                padding-left: 30px;
            }
        }
        .leftLiFirst{
            background-color: #F9F9F9;
            color: #000;
            font-weight: bold;
            height: 41px;
            cursor: pointer;
            line-height: 41px;
            span:first-child{
                margin-left: 8px;
                margin-right: 9px;
            }
            &:hover{
                background-color: #fff;
            }
        }
    }
}
.backgrounds{
    background-color: #F9F9F9;
}
</style>