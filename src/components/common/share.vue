<template>

<!-- 主页右侧固定定位的组件 -->

  <div class="shareBox animated bounceInRight">
    <div>
      <ul>
        <!-- <li><i class="iconfont icon-gift__easyico"></i></li>
        <li><i class="iconfont icon-youhuiquan"></i></li>
        <li><i class="iconfont icon-xihuan"></i></li>
        <li><i class="iconfont icon-shizhong"></i></li> -->
      </ul>
    </div>
    <div>
      <ul style="position: absolute;bottom: 100px;width: 100%;">
        <!-- <li><i class="iconfont icon-fenxiang"></i></li> -->
        <li @click="toWishList"><i class="iconfont icon-xihuan"></i></li>
        <li @click="retunrnTop">
          <i class="iconfont icon-icon-test"></i>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      timer: null
    };
  },
  methods: {
    toWishList(){
      this.$router.push({name:'wishlist'})
    },
    retunrnTop() {
        let that = this;
      cancelAnimationFrame(that.timer);
      that.timer = requestAnimationFrame(function fn() {
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop = oTop - 100;
          that.timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(that.timer);
        }
      });
    }
  }
};
</script>
   
<style lang="scss" scoped>
.shareBox {
  width: 44px;
  height: 100%;
  position: fixed;
  z-index: 1000;
  right: 0;
  top: 0;
  background-color: #373737;
  overflow: hidden;
  color: #fff;
  li {
      height: 30px;
        line-height: 30px;
        font-size: 15px;
        cursor: pointer;
    
    &:hover{
        background-color: #ff2929;
    }
  }
  div:first-child {
    margin-top: 200px;
    ul {
      li:first-child {
        color: #ff2929;
        &:hover{
            background-color: #FFB610;
        }
      }
    }
  }
  div:last-child {
    margin-top: 340px;
    ul {
      li {
        margin-top: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>