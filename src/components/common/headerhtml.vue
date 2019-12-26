<template>

<!-- 页面顶部用户信息组件 -->

  <div>
    <div id="headers">
      <ul class="headerList">
        <li class="help">
            <span>Help</span>
             <i class="el-icon-caret-bottom"></i>
             <i class="el-icon-caret-top"></i>
             <div>
                 <ul>
                    <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/55" target="_blank" style="cursor: pointer;">User Guide</a>
                    <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/42" target="_blank" style="cursor: pointer;">Size Guide</a>
                    <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/59" target="_blank" style="cursor: pointer;">Payment Methods</a>
                    <a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/40" target="_blank" style="cursor: pointer;">Contact Us</a>
                 </ul>
             </div>
        </li>
        <li><a href="https://www.billimall.com/index.php/Home/Article/detail/article_id/36" target="_blank" style="text-decoration: none;">Buyer Protection</a></li>
        <li class="app" @click="toApp"><span>App</span></li>
        <li @click="toWishList">
          <i class="iconfont icon-xihuan"></i> &nbsp;
          <span>Wish List</span>
        </li>
        <li class="accountList">
          <i class="iconfont icon-yonghu"></i> &nbsp;
          <span>Account</span>
          <i class="el-icon-caret-bottom"></i>
          <i class="el-icon-caret-top"></i>
          <div>
            <ul class="account">
              <li @click="toAccount"><img :src="head_pic"> {{ welecome }}</li>
              <li v-if="!islogin" class="btnli">
                <button @click="toJoin">Join</button>
                <button @click="toSignin">Sign In</button>
              </li>
              <li v-if="islogin" class="btnli" @click="getlogout">
                <p style="color:rgba(25,116,161,1);">Sign Out</p>
              </li>
              <li @click="toMyOrders">My Orders</li>
              <!-- <li @click="toMessageCenter">Message Center</li> -->
              <li @click="toWishList">Wish List</li>
              <!-- <li @click="toMyCoupons">My Coupons</li> -->
              <li @click="toMyAddress">My Shipping Address</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import user from '@/assets/images/user.png'
export default {
  name:'headerhtml',
  data() {
    return {
      welecome:"Welecome to BilliMall",
      head_pic:user,
      userdata:{},
      islogin:false
    };
  },
  created() {
    if(this.$store.state.token){
      this.islogin=true
      this.welecome="Welcome back !"
      this.getuserdata()
      this.getuserDetail()
    }
  },
  methods: {
    getuserDetail(){//获取用户基本信息
        let params = {
        }
        this.axios.post(api.userDetail, params)
            .then(res => {
                if (res.data.code==200) {
                    let data=res.data.data
                    this.head_pic=data.head_pic
                }
            })
    },
    getuserdata(){
      if(this.$store.state.userdata){
        if(localStorage.getItem("userdata")){
          this.userdata=JSON.parse(localStorage.getItem("userdata"))
          this.head_pic=this.userdata.head_pic
        }
      }
    },
    getlogout(){//登出接口
        let params = {
        }
        this.axios.post(api.logout, params)
            .then(res => {
              if (res.data.code==200) {
                this.signOut()
              }else if (res.data.code==401) {
                this.signOut()
              }
            })
    },
    toJoin(){
      this.$router.push({ name: 'login', params: { islogin:"register" }})
    },
    toSignin(){
      this.$router.push({ name: 'login', params: { islogin:"signin" }})
    },
    toMyOrders(){
      this.$router.push({name:'myorders'})
    },
    toMessageCenter(){
      this.$router.push({name:'message'})
    },
    toWishList(){
      this.$router.push({name:'wishlist'})
    },
    toMyCoupons(){
      this.$router.push({name:'mycoupons'})
    },
    toMyAddress(){
      this.$router.push({name:'myaddress'})
    },
    toAccount(){
      this.$router.push({name:'account'})
    },
    toApp(){
      let routeOne = this.$router.resolve({
          name: "DownPage",
      });
      window.open(routeOne.href, '_blank');
    },
    signOut(){
      this.$store.commit("logout")
      this.$router.replace({ name: 'login', params: { islogin:"signin" }})
    }
  }
};
</script>
<style lang="scss" scoped>
#headers {
  width: 1200px;
  margin: 0 auto;
  height: 40px;
  font-size: 12px;
  .headerList {
    list-style: none;
    float: right;
    height: 30px;
    margin: 5px 0;
    li {
      float: left;
      padding: 5px 15px;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
      margin-top: 8px;
      &:hover{
          color:#FFB610;
      }
    }
    .app {
      border-right: 1px solid #dedede;
    }
    li:last-child {
      position: relative;
      div {
        display: none;
        position: absolute;
        top: 25px;
        right: 0px;
        width: 180px;
        background-color: #fff;
        border: 2px solid #fafafa;
        z-index: 100;
        border-top: none;
        .account {
          li {
            width: 100%;
            height: 30px;
            line-height: 30px;
            color: #333;
            font-size: 12px;
            margin: 2px 0;
            padding: 0;
            padding-left: 12px;
            text-align: left;
            &:first-child{
              height: 36px;
              display: flex;
              align-items: center;
              color: #666666;
              img{
                display: inline-block;
                width: 36px;
                margin-right: 12px;
              }
            }
            button{
                width: 69px;
                height: 30px;
                border-radius: 2px;
                cursor: pointer;
            }
            button:first-child{
                background-color: #FFB610;
                color: #fff;
                margin-right: 14px;
            }
             button:last-child{
                background-color: #FFF0CA;
                color: #FFB610;
            }
          }
          li:hover {
            background-color: #f4f5f7;
          }
          .btnli{
            margin: 10px 0;
          }
        }
      }
      .el-icon-caret-top {
        display: none;
      }
    }
    .accountList:hover {
      background-color: #fff;
      div {
        display: block;
      }
      .el-icon-caret-bottom {
        display: none;
      }
      .el-icon-caret-top {
        display: inline-block;
      }
    }
    .help{
        position: relative;
        height: 27px;
        .el-icon-caret-top{
            display: none;
        }
        &:hover{
            background-color: #fff;
            div{
            display: block;
            }
            .el-icon-caret-top{
            display: inline-block;
        }
        .el-icon-caret-bottom{
            display: none;
        }
        }
        
        div{
            display: none;
            position: absolute;
            top: 26px;
            right: 0px;
            width: 180px;
            min-height: 110px;
            background-color: #fff;
            z-index: 100;
            border: 2px solid #fafafa;
            border-top: none;
            a{
                text-decoration: none;
                display: block;
                width: 94%;
                color: #333;
                cursor: pointer;
                height: 30px;
                line-height: 30px;
                margin: 3px 0;
                padding: 0;
                padding-left: 12px;
                text-align: left;
                &:hover{
                    background-color: #f4f5f7;
                }
            }
        }
    }
  }
}
</style>