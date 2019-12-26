<template>

<!-- high fashion 组件 -->

  <div class="highFashion">
    <div class="fashionTitle">
        High Fashion
    </div>
    <div class="fashionImg">
        <div class="imgContainer" v-for="(item,index) in images" :class="{nowMarginRt:index%3==2}">
            <div>
                <p>
                    <img :src="item.url">
                </p>
                <p>
                    {{item.content}}
                </p>
                <p>
                    <span>ZAR {{item.nowZar}}</span>
                    <span>{{item.off}}% off</span>
                </p>
                <p>ZAR {{item.oldZar}}</p>
            </div>
        </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      timer: null,
      images:[
          {url:require("@/assets/images/7.png"),content:"Simplee Sexy deep v-neck solid women jumpsuit Elega jumpsuit Elega…",nowZar:"ZAR 22.32",off:"28",oldZar:"35.68"},
          {url:require("@/assets/images/7.png"),content:"Simplee Sexy deep v-neck solid women jumpsuit Elega jumpsuit Elega…",nowZar:"ZAR 22.32",off:"28",oldZar:"35.68"},
          {url:require("@/assets/images/7.png"),content:"Simplee Sexy deep v-neck solid women jumpsuit Elega jumpsuit Elega…",nowZar:"ZAR 22.32",off:"28",oldZar:"35.68"},
          {url:require("@/assets/images/7.png"),content:"Simplee Sexy deep v-neck solid women jumpsuit Elega jumpsuit Elega…",nowZar:"ZAR 22.32",off:"28",oldZar:"35.68"},
          {url:require("@/assets/images/7.png"),content:"Simplee Sexy deep v-neck solid women jumpsuit Elega jumpsuit Elega…",nowZar:"ZAR 22.32",off:"28",oldZar:"35.68"},
          {url:require("@/assets/images/7.png"),content:"Simplee Sexy deep v-neck solid women jumpsuit Elega jumpsuit Elega…",nowZar:"ZAR 22.32",off:"28",oldZar:"35.68"},
          {url:require("@/assets/images/7.png"),content:"Simplee Sexy deep v-neck solid women jumpsuit Elega jumpsuit Elega…",nowZar:"ZAR 22.32",off:"28",oldZar:"35.68"},
          {url:require("@/assets/images/7.png"),content:"Simplee Sexy deep v-neck solid women jumpsuit Elega jumpsuit Elega…",nowZar:"ZAR 22.32",off:"28",oldZar:"35.68"},
          {url:require("@/assets/images/7.png"),content:"Simplee Sexy deep v-neck solid women jumpsuit Elega jumpsuit Elega…",nowZar:"ZAR 22.32",off:"28",oldZar:"35.68"},
          {url:require("@/assets/images/7.png"),content:"Simplee Sexy deep v-neck solid women jumpsuit Elega jumpsuit Elega…",nowZar:"ZAR 22.32",off:"28",oldZar:"35.68"},
          {url:require("@/assets/images/7.png"),content:"Simplee Sexy deep v-neck solid women jumpsuit Elega jumpsuit Elega…",nowZar:"ZAR 22.32",off:"28",oldZar:"35.68"},
      ]
    };
  },
};
</script>
   
<style lang="scss" scoped>
    .highFashion{
        width: 1200px;
        margin: 0 auto;
        .fashionTitle{
            font-size: 36px;
            font-weight: bold;
            color: #333;
            margin-top: 32px;
            margin-bottom: 24px;
        }
        .fashionImg{
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;
             .imgContainer{
                width: 392px;
                height: 489px;
                background-color: #fff;
                float: left;
                margin-right: 12px;
                margin-bottom: 12px;
                div{
                    width: 368px;
                    margin: 0 auto;
                    margin-top: 12px;
                    img{
                        width: 100%;
                        border-radius: 6px;
                    }
                    p:nth-child(2){
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow:ellipsis;
                        font-size: 14px;
                        color: #333;
                        margin-top: 16px;
                    }
                     p:nth-child(3){
                         margin-top: 16px;
                         text-align: left;
                       span:first-child{
                           font-size: 16px;
                           color: #333;
                           font-weight: 550;
                       }
                       span:last-child{
                           font-size: 12px;
                           color: #FF3308;
                            display: block;
                            text-align: center;
                            float: right;
                            width: 56px;
                            height: 20px;
                            background-color: #FEE5E1;
                            line-height: 20px;
                       }
                    }
                    p:nth-child(4){
                        text-align: left;
                        margin-top: 16px;
                        font-size: 12px;
                        color: #999;
                        text-decoration:line-through;
                    }
                }
            }
            .nowMarginRt{
                margin-right: 0;
            }
        }
    }
</style>