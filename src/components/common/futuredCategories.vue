<template>

<!-- 主页furured categores 组件 -->

  <div class="futured">
    <div class="futuredContainer">
      <div class="futuresHeader">Futured Categories</div>
      <div class="futuredList">
        <div class="bakimg">
          <p>{{ futuredCategorieshomedata.name }}</p>
          <div>
            <div class="imgleft">
              <!-- <img src="@/assets/images/2.jpg"> -->
              <div></div>
            </div>
            <div class="imgright">
              <div>
                <!-- <img src="@/assets/images/2.jpg"> -->
                <div></div>
              </div>
              <div>
                <!-- <img src="@/assets/images/2.jpg"> -->
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="list">
          <!-- <div class="listProduct">
            <p>Kids</p>
                <div class="imgConter">
                    <div>
                        <img src="@/assets/images/2.jpg">
                        <div></div>
                    </div>
                    <div>
                        <img src="@/assets/images/2.jpg">
                        <div></div>
                    </div>
                    <div>
                        <img src="@/assets/images/2.jpg">
                        <div></div>
                    </div>
                </div>            
          </div> -->
          <div class="listProduct" v-for="item in futuredCategorieshomedata.imglist" :key="item.id">
              <p>{{ item.name }}</p>
              <div class="imgConter">
                  <div v-for="(imgitem, index) in item.product" :key="index"  @click="toDirectSearch(imgitem.cat_id)">
                      <img :src="imgitem.imgUrl">
                      <div></div>
                  </div>
              </div>            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'futuredCategories',
  props:['homedata'],
  data () {
    return {
      futuredCategorieshomedata:{//接收过来的父组件数据
        name:'',
        imglist:{}
      }
    }
  },
  watch: {
    homedata(val){
        this.getfuturedCategorieshomedata(val)
    }
  },
  methods: {
    getfuturedCategorieshomedata(data){
        if(data){
            this.futuredCategorieshomedata=data.hotCategory
            this.futuredCategorieshomedata.name=data.hotCategory.name
            this.futuredCategorieshomedata.imglist=data.hotCategory.children
        }
    },
    toflashdealsnow(){
        this.$router.push({ name: 'flashdealsnow', params: {  }})
    },
    toDirectSearch(cat_id){
        // this.$router.push({ name: 'DirectSearch', params: { cat_id:cat_id }})
        this.$router.push({ name: "DirectSearch", query: { Title: "" ,cat_id :cat_id} });
    },
  }
};
</script>
<style lang="scss" scoped>
.futured {
  width: 1200px;
  margin-top: 20px;
  .futuredContainer {
    overflow: hidden;
    .futuresHeader {
      background-color: #fafafa;
      font-size: 24px;
      color: #333;
      font-weight: bold;
      text-align: left;
      margin-bottom: 16px;
    }
    .futuredList {
      overflow: hidden;
      height: 296px;
      img {
        width: 100%;
      }
      .bakimg {
        height: 298px;
        width: 296px;
        background: url("../../assets/images/beauty.png") no-repeat;
        float: left;
        overflow: hidden;
        p {
          font-size: 20px;
          color: #333;
          font-weight: bold;
          margin: 26px 0 34px 20px;
          text-align: left;
        }
        & > div {
          margin-left: 20px;
          .imgleft {
            width: 170px;
            height: 170px;
            float: left;
            margin-right: 2px;
            position: relative;
            display: none;
            div{
                width: 100%;
                height: 100%;
                background-color: #dedede;
                opacity: 0.2;
                position: absolute;
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
          .imgright {
            width: 84px;
            height: 170px;
            float: left;
            display: none;
            div {
              height: 84px;
              margin-bottom: 2px;
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
          }
        }
      }
      .list {
        div:nth-child(3) {
          margin-right: 0;
        }
        div:nth-child(6) {
          margin-right: 0;
        }
        float: left;
        margin-left: 10px;
        width: 890px;
        .listProduct {
          width: 290px;
          height: 140px;
          float: left;
          background: #fff;
          border-radius: 6px;
          margin-right: 10px;
          margin-bottom: 16px;
          p {
            color: #fe6c7b;
            font-size: 18px;
            font-weight: bold;
            text-align: left;
            margin: 14px 0 8px 16px;
          }
          .imgConter {
            margin-left: 16px;
            text-align: left;
            div {
              float: left;
              margin-right: 5px;
              position: relative;
              div {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #dedede;
                opacity: 0.2;
                display: none;
                cursor: pointer;
              }
              img {
                width: 84px;
                height: 84px;
              }
              &:hover {
                div {
                  display: block;
                }
              }
            }

            div:nth-child(3) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>