<template>
    <div class="datailsRightContainer">
       <!-- 此组件需要引入三个子组件，分别为overview,customer,specifications,并且此组件又被引用 -->
       <div class="datailsRightTitle" :class="{activeFixed:curtomerFixed}">
           <div v-for="(item,index) in titles" @click="whichTitles(index)" :key="index" :class="{activeDiv:index == current}" class="selectedBtn">
               <p>{{item}}</p>
               <p class="borderBottom" :class="{activeP:index == current}"></p>
            </div>
            <div class="buyAddBtn" v-show="curtomerFixed">
                <div class="buyNow" @click="buyNow()">Buy Now</div>
                <!-- <div class="addCat" @click="addCat()">Add to Cart</div> -->
            </div>
       </div>
        <div>
            <Overview v-show="current == 0" :goodsInfoval="goodsInfoval"></Overview>
            <div class="custmerStyle" v-show="current == 1">
                <Customer></Customer>
            </div>
            <Productnature v-show="current == 2"></Productnature>
        </div>
        <div id="moreToLoves">
            <MoreToLoves :homedata='homedata'></MoreToLoves>
        </div>
    </div>
</template>
<script>
import Overview from '@/components/common/overview'
import Customer from '@/components/common/customer'
import Productnature from '@/components/common/productnature'
import MoreToLoves from '@/components/common/moreToLove'
export default{
    props:["curtomerFixed","productSpecifica","homedata","goodsInfoval"],
    data(){
        return{
            // titles:['OVERVIEW','CUSTOMER REVIEWS(6)','SPECIFICATIONS'],
            titles:['OVERVIEW','CUSTOMER REVIEWS'],
            current:0,
            isClose:false,
        }
    },
    components:{
        Overview,
        MoreToLoves,
        Customer,
        Productnature
    },
    methods:{
        whichTitles(index){
            this.current = index;
            this.$emit("scrollTopTitle",'');
        },
        buyNow(){
            if(this.productSpecifica == null || this.productSpecifica.color =="" || this.productSpecifica.size =="" || this.productSpecifica.quabity ==0){
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = document.body.scrollTop = 0;
                 this.isClose = true;
                this.$emit("postAlert",this.isClose);
                return;
            }else if(this.productSpecifica.color !="" && this.productSpecifica.size !="" && this.productSpecifica.quabity !=0){
                    alert("跳转支付页面")
                }
        },
        addCat(){

        }
    }
}
</script>
<style lang="scss" scoped>
    .datailsRightContainer{
        width: 936px;
        border-radius: 8px;
        background-color: #fff;
        overflow: hidden;
        position: relative;
    }
    .datailsRightTitle{
        overflow: hidden;
        margin-top: 18px;
        border-bottom: 1px solid #EDEDED;
        .selectedBtn{
            float: left;
            color: #333;
            font-size: 16px;
            height: 33px;
            margin-right: 104px;
            cursor: pointer;
            &:hover{
                color: #333;
                font-weight: bold;
                p:last-child{
                    background-color: #FEB610;
                }
            }
        }
        div:first-child{
            margin-left: 26px;
        }
        .borderBottom{
            width: 84px;
            margin: 0 auto;
            height: 5px;
            margin-top: 10px;
        }
        .activeDiv{
            color: #333;
            font-weight: bold;
        }
        .activeP{
             background-color: #FEB610;
        }
        .buyAddBtn,.buyNow,.addCat{
            margin: 0;
            margin-right: 21px;
        }
        .buyAddBtn{
            float: left;
            overflow: hidden;
            margin-top: 8px;
            color: #333;
            font-size: 14px;
            font-weight: Medium;
            .buyNow,.addCat{
                float: left;
                height: 36px;
                margin: 0;
                 line-height: 36px;
                 cursor: pointer;
                 border-radius: 8px;
            }
            .buyNow{               
                width: 80px;                
                background-color: #FEB610;               
                margin-right: 21px;                               
            }
            .addCat{                
                width: 96px;              
                background-color: #FDD818;
            }
        }
    }
    #moreToLoves{
        background-color: #FAFAFA;
        width: 100%;
        border-radius: 8px;
    }
    #moreToLoves /deep/ .loveTitle{
        height: 50px;
        margin: 0;
        line-height: 50px;
        margin-left: 10px;
    }
   #moreToLoves /deep/ .listImg{
       width: 184px;
        margin-right: 1px;
        margin-left: 2px;
   }
    #moreToLoves /deep/ .shade{
       width: 170px;
   }
   #moreToLoves /deep/ .more{
       width: 100%;
   }
   .custmerStyle /deep/ .customer{
       margin-left: 26px;
   }
   .activeFixed{
       position: fixed;
       width: 100%;
        top:0;
        left: 0;
        z-index: 100;
        background-color: #fff;
        margin-top: 0;
        height: 52px;
        text-align: center;
        box-sizing: border-box;
        padding-left: 532px;
        div{
            margin-top: 18px;
        }
   }
</style>