<template>

<!-- 用户评论列表组件 -->

    <div class="customer">
       <div class="customerTitle">Customer Reviews <span>({{ total_sum }})</span></div>
       <div class="customerStarts">
           <div>Average Rating</div>
           <div>
               <el-rate v-model="value" disabled :colors="['#FF7900','#FF7900','#FF7900']"></el-rate>
           </div>
           <div :v-model="startValue">({{startValue}}%)</div>
       </div>
       <div class="changeComment">
           <div v-for="(item,index) in comment" :key="index" @click="whichComment(index)" :class="{activeComment:index == current}">{{item}}</div>
       </div>
      <div class="userCommentContainer">
            <div class="userComment" v-for="(item,index) in reviews" :key="index">
                <div class="userCommentLeft">
                    <div class="userNames">{{item.userNames}}</div>
                    <div class="userTimes">{{item.userTimes}}</div>
                </div>
                <div class="userCommentRight">
                    <div class="userStars">
                        <el-rate v-model="item.userStartValue" disabled :colors="['#FF7900','#FF7900','#FF7900']"></el-rate>
                    </div>
                    <div class="userSpecification">
                        <span>{{item.spec_key_name}}</span>
                    </div>
                    <div class="userContent">{{item.userContent}}</div>
                    <div class="userImg">
                        <img :src="img.img" v-for="(img, index) in item.userImg" :key="index">
                    </div>
                </div>
            </div>
      </div>
      <div class="pagimg" v-if="this.reviews.length>0">
           <el-pagination id="pagesComment" :background="true" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="5" layout="prev, pager, next, jumper" :total="countNum*1"></el-pagination>
      </div>
    </div>
</template>
<script>
import api from '@/api'
export default{
    data(){
        return{
            value:3.7,
            startValue:"",
            comment:["All"],
            current:0,
            currentPage: 1,
            comment_type:1,//1 全部 2好评 5图片
            page:1,//当前页
            countNum:0,//总条数
            countPage:0,//总页数
            total_sum:"",//总数量
            reviews:[
            //    {userNames:"v***l",userTimes:"27 Jul 2019",userStartValue:5,color:"black",size:"XXL",
            //     userContent:"Fast delivery and best price I could find plus free shipping. Can't wait for my lift kit to arrive so I can get them on my Jeep !!!! Have attached photo of them on my new rugged ridge gun metal gray wheels and they are gonna look awesome !!!! update- lift is on and tires are installed. Love it !!!!!",
            //     userImg:require("@/assets/images/2.jpg")
            //     },
            ],
            showReviews:[
                // {userNames:"v***l",userTimes:"27 Jul 2019",userStartValue:5,color:"black",size:"XXL",
                // userContent:"Fast delivery and best price I could find plus free shipping. Can't wait for my lift kit to arrive so I can get them on my Jeep !!!! Have attached photo of them on my new rugged ridge gun metal gray wheels and they are gonna look awesome !!!! update- lift is on and tires are installed. Love it !!!!!",
                // userImg:require("@/assets/images/1.jpg")
                // },
            ]
        }
    },
    components:{
        
    },
    created() {
        if (this.$route.params.goods_id) {
            this.goods_id=this.$route.params.goods_id
        }
        this.getcommentVal()
        this.getstatVal()
    },
    methods:{
        getcommentVal(){
            this.getcomment().then((data) =>{
                this.reviews=[]
                this.countNum=data.page.countNum
                this.countPage=data.page.countPage
                this.showReviews=data.list
                data.list.forEach(item => {
                    let list={userNames:item.username,userTimes:item.add_time,userStartValue:item.goods_rank*1,spec_key_name:item.spec_key_name,userContent:item.content,userImg:item.img}
                    this.reviews.push(list)
                });
            })
        },
        getcomment(){//获取评论列表
            let params = {
                "goods_id":this.goods_id,
                "comment_type":this.comment_type,
                "perPage":5,
                "page":this.page
            }
            return new Promise((resolve)=>{
                this.axios.post(api.comment, params)
                    .then(res => {
                        if(res.data.code==200){
                            resolve(res.data.data)
                        }
                    })
            })
        },
        getstatVal(){
            this.getstat().then((data) =>{
                this.comment.push("Good reviews("+data.high_sum+")")
                this.comment.push("Picture("+data.img_sum+")")
                this.total_sum=data.total_sum
                this.value=data.high_rate
                this.startValue=this.value/5*100
            })
        },
        getstat(){//获取商品评论统计
            let params = {
                "goods_id":this.goods_id,
            }
            return new Promise((resolve)=>{
                this.axios.post(api.stat, params)
                    .then(res => {
                        if(res.data.code==200){
                            resolve(res.data.data)
                        }
                    })
            })
        },
        whichComment(index){
            this.current=index
            if (index==0) {
                this.comment_type = 1;
            }else if (index==1) {
                this.comment_type = 2;
            }else if (index==2) {
                this.comment_type = 5;
            }
            this.currentPage=1
            this.page=1
            this.reviews=[]
            this.getcommentVal()
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.page=val
            this.getcommentVal()
            // var indexEnd = val*5;
            // var indexStart = val*5 - 5;
            // this.reviews = this.showReviews.slice(indexStart,indexEnd);
        }
    }
}
</script>
<style lang="scss" scoped>
  .customer{
      margin-top: 28px;
      text-align: left;
      font-size: 12px;
      color: #666;
      .customerTitle{
          font-size: 20px;
          font-weight: 550;
      }
      .customerStarts{
          overflow: hidden;
          margin-top: 16px;
          div{
              float: left;
               font-size: 16px;
             color: #333;
             margin-right: 12px;
             & /deep/ .el-rate__icon{
                 font-size: 20px;
                 color: #FF7900;
             }
          }
      }
      .changeComment{
          overflow: hidden;
          margin-top: 16px;
          div{
              float: left;
              margin-right: 16px;
              border: 1px solid #DEDEDE;
              border-radius: 8px;
              height: 38px;
              color: #333;
              font-size: 16px;
              text-align: center;
              line-height: 38px;
              padding: 0 20px;
              cursor: pointer;
          }
          div:first-child{
              width: 80px;
          }
          .activeComment{
              background-color: #FBD2B0;
              border-color: #FF7900;
              color: #FF7805;
          }
      }
      .userComment{
          border-bottom: 1px solid #dedede;
          overflow: hidden;
          margin-top: 28px;
          .userCommentLeft,.userCommentRight{
              float: left;
          }
          .userCommentLeft{
              width: 120px;
              .userNames{
                color: #333;
                font-size: 14px;
              }
              .userTimes{
                  margin-top: 8px;
                  color: #666;
                  font-size: 12px;
              }
          }
          .userCommentRight{
              margin-top: 16px;
              width: 790px;
              font-size: 12px;
              .userImg{
                  margin-top: 12px;
                  margin-bottom: 19px;
                  img{
                      width: 68px;
                      height: 68px;
                  }
              }
              .userSpecification{
                  color: #666;
                  margin: 10px 0;
              }
              .userContent{
                  color: #333;
              }
          }
      }
      .pagimg{
          margin-top: 24px;
          overflow: hidden;
          padding-bottom: 20px;
      }
      #pagesComment{
           float: right;
      }
      #pagesComment /deep/ .active{
          background-color: #FEB610;
      }
      #pagesComment /deep/ li{
          width: 32px;
          height: 32px;
          line-height: 32px;
      }
      #pagesComment /deep/ .btn-prev ,#pagesComment /deep/ .btn-next{
          width: 32px;
          height: 32px;
          line-height: 32px;
      }
      #pagesComment /deep/ .el-input__inner{
          width: 50px;
          height: 32px;
          line-height: 32px;
      }
  }
</style>