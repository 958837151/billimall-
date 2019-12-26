<template>
  <!-- 顶部搜索框，带有购物车图标的组件 -->
  
  <div class="header_search" :class="fixedMsg.isfixed == true ? 'isFixed' :''">
    <div id="search">
      <div class="logo">
        <router-link to="/home">
          <img src="@/assets/images/logo.png" />
        </router-link>
      </div>
      <div class="menu">
        <div class="iconfont icon-caidan1" v-show="fixedMsg.isshow">
          <div class="leftSearch">
            <Hovermenu :homedata='homedata'></Hovermenu>
          </div>
        </div>
      </div>
      <div class="search_box">
        <div>
          <input
            class="search-input"
            type="text"
            :class="fixedMsg.isshow == true ? 'inputNoShowClass' :''"
            placeholder="I'm Shopping..."
            v-model="searchMsg"
          />
          <button class="magnify" @click="search">
            <i class="el-icon-search"></i>
          </button>
          <div class="help" v-show="!fixedMsg.isshow">
            <!-- All Categories
            <i class="el-icon-caret-bottom"></i>
            <i class="el-icon-caret-top"></i> -->
            <!-- <div class="helpHover">
              <div>All Categories</div>
              <div>All Categories</div>
              <div>All Categories</div>
              <div>All Categories</div>
              <div>All Categories</div>
              <div>All Categories</div>
              <div>All Categories</div>
            </div> -->
          </div>
        </div>
        <div>
          <!-- <ul>
            <li>huawei p20 Pro</li>
            <li>mp3</li>
            <li>color master</li>
            <li>sticky notes</li>
            <li>kitchen appliances</li>
            <li>dress summer</li>
          </ul> -->
        </div>
      </div>
      <div class="cart">
        <router-link to="/shoppingCart">
          <span class="el-icon-shopping-cart-2"></span>
          <span>{{ $store.state.shopingcarnum }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Hovermenu from "@/components/common/hovermenu";
export default {
  name: "search",
  components: {
    Hovermenu
  },
  props: ["fixedMsg","homedata","currentPage"],
  data() {
    return {
      searchMsg: "",
      page:1,
      searchVal:""
    };
  },
  watch: {
    searchMsg(val){
      this.searchVal=val
    },
  },
  created () {
    this.getshopingcarnum()
  },
  methods: {
    getshopingcarnum(){
      if(localStorage.getItem("shopingcarnum")){
        this.$store.state.shopingcarnum=localStorage.getItem("shopingcarnum")
      }
    },
    search() {
      this.$emit("searchVal",this.searchVal)
      // this.$router.push({ name: "DirectSearch", params: { Title: this.searchVal ,cat_id :""} });
      this.$router.push({ name: "DirectSearch", query: { Title: this.searchVal ,cat_id :""} });
    }
  }
};
</script>

<style lang="scss" scoped>
.isFixed {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
}
.header_search {
  background-color: #fff;
  #search {
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    .logo {
      width: 289px;
      height: 60px;
      margin-top: 10px;
      img {
        width: 100%;
      }
    }
    .search_box {
      width: 656px;
      div:first-child {
        border: 2px solid #ffb610;
        text-align: left;
        // overflow: hidden;
        margin-top: 10px;
        height: 32px;
        line-height: 32px;
        input {
          width: 477px;
          padding: 3px 5px;
          margin: 2px 2px;
          padding-right: 0;
          margin-right: 0;
          border-right: 1px solid #999;
          box-sizing: border-box;
        }
        .inputNoShowClass {
          width: 600px;
          border-right: none;
        }
        span {
          display: inline-block;
        }
        .help {
          float: right;
          width: 120px;
          height: 27px;
          box-sizing: border-box;
          font-size: 14px;
          color: #999;
          // border-left: 1px solid #999;
          text-align: center;
          margin-top: 5px;
          line-height: 27px;
          cursor: pointer;
          position: relative;
          .el-icon-caret-top {
            display: none;
          }
          &:hover {
            color: #000;
            .helpHover {
              display: block;
            }
            .el-icon-caret-top {
              display: inline-block;
            }
            .el-icon-caret-bottom {
              display: none;
            }
          }
          .helpHover {
            width: 198px;
            height: 226px;
            background-color: #fff;
            display: none;
            position: absolute;
            top: 19px;
            right: 0px;
            z-index: 100;
            border: 2px solid #fafafa;
            border-top: 2px solid #ffb610;
            div {
              border: none;
              text-align: left;
              padding-left: 12px;
              height: 30px;
              &:hover {
                background-color: #f4f5f7;
              }
            }
          }
        }
        .magnify {
          float: right;
          width: 48px;
          height: 34px;
          font-size: 20px;
          line-height: 36px;
          text-align: center;
          color: #fff;
          background-color: #ffb610;
        }
      }
      div:last-child {
        // background-color: #000;
        margin-top: 8px;
        font-size: 14px;
        ul {
          display: flex;
          color: #000;
          li {
            border-right: 1px solid #dedede;
            padding-right: 8px;
            padding-left: 8px;
            cursor: pointer;
          }
          li:first-child {
            padding-left: 0;
          }
          li:last-child {
            padding-right: 0;
            border-right: none;
          }
          li:hover {
            color: #1974a1;
          }
        }
      }
    }
    .cart {
      margin-left: 34px;
      position: relative;
      span {
        display: inline-block;
        text-align: center;
      }
      span:first-child {
        width: 26px;
        height: 26px;
        margin-top: 16px;
        font-size: 30px;
      }
      span:last-child {
        // width: 26px;
        // height: 26px;
        margin-top: 16px;
        font-size: 12px;
        position: absolute;
        top: -5px;
        right: -11px;
        background-color: #ff3308;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        color: #fff;
        text-align: center;
        line-height: 18px;
      }
    }
  }
}
.menu {
  color: #000;
  width: 53px;
  height: 80px;
  line-height: 80px;
  margin-left: 20px;
  div {
    cursor: pointer;
    position: relative;
    font-size: 20px;
    &:hover {
      color: #666;
      background-color: #fafafa;
      .leftSearch {
        display: block;
      }
    }
    .leftSearch {
      position: absolute;
      top: 56px;
      left: -188px;
      font-size: 12px;
      display: none;
      z-index: 9999;
    }
    .leftSearch /deep/ .navigation {
      font-size: 13px;
    }
  }
}
</style>