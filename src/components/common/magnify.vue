<template>

<!-- 放大镜组件 -->

    <div>
        <div class="magnify"  @mousemove="move($event)"  @mouseout="out" ref="previewBox">
            <div class="preview-box">
              <img width="100%" :src="previewImg" alt="">
              <div class="hover-box" ref="hoverBox"></div>
            </div>
            <div class="zoom-box" v-show="zoomVisiable" ref="zoomBox">
              <img :src="zoomImg" ref="bigImg">
            </div>
        </div>
            <!-- <div class="magnify viewbox">
                <div class="preview-box">
                    <video width="460" height="460" poster="https://ae01.alicdn.com/kf/HTB17L06oC8YBeNkSnb4q6yevFXaW/NAGARAKU-10-cases-lot-High-quality-mink-eyelash-extension-individual-eyelashes-natural-eyelashes-make-up-fake.jpg" id="item-video" src="https://cloud.video.taobao.com/play/u/1661771812/p/1/e/6/t/10301/50062844207.mp4" style="background-color: rgb(34, 34, 34); display: block;" controls="true"></video>
                </div>
            </div> -->
             <div class="productList">
                 <div>
                      <ul>
                        <li v-for="(item,index) in todos" :key="index">
                            <img :src="item" @mouseover="whichImg(index,$event)" :class="{active:index == current}">
                        </li>
                    </ul>
                 </div>
            </div>
    </div>
</template>

<script>
function offset(el) {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return {
    left: left,
    top: top,
    isActive:false
  }
}
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'magnify',
  props:["goodsInfoval"],
  data() {
    return {
      zoomVisiable: false,
      hoverVisiable: false,
      previewImg:'',//require("@/assets/images/phone2.jpg")
      zoomImg:"",
      current:0,
      todos:[
          // require("@/assets/images/phone1.jpg"),
      ],
      goodsInfodata:{}//数据
    };
  },
  watch: {
    goodsInfoval(val){
      this.getgoodsInfoaction(val)
    }
  },
  created () {

  },
  methods: {
    getgoodsInfoaction(data){
      if(data.goodsinfo){
        this.previewImg=data.goodsinfo.imgUrl
        this.todos=[]
        // this.zoomImg=this.goodsInfodata.goodsinfo.original_img
        data.goodsinfo.img.forEach(item => {
          this.todos.push(item.image_url)
        });
      }
    },
    out() {
      this.zoomVisiable = false;
    },
    move(ev) {
      this.init();
      // 鼠标距离屏幕距离
      let moveX = ev.clientX; //横坐标
      let moveY = ev.clientY; //纵坐标
      // 大盒子距离顶部的距离
      let offsetLeft = offset(this.oPreviewBox).left;

      let offsetTop = offset(this.oPreviewBox).top;
      let left = moveX - offsetLeft - this.houverWidth / 2;
      let top
      if(this.scroll > 0) {
        top = moveY - offsetTop + this.scroll - this.houverHeight / 2;
      }else {
        top = moveY - offsetTop - this.houverHeight / 2;
      }
      let maxWidth = this.pWidth - this.houverWidth;
      let maxHeight = this.pWidth - this.houverHeight;
      left = left < 0 ? 0 : left > maxWidth ? maxWidth : left;
      top = top < 0 ? 0 : top > maxHeight ? maxHeight : top;
      let percentX = left / (maxWidth);
      let percentY = top / (maxHeight);
      this.oHoverBox.style.left = left + 'px';
      this.oHoverBox.style.top = top  + 'px';
      this.oBigImg.style.left = percentX * (this.bWidth - this.imgWidth) + 'px';
      this.oBigImg.style.top = percentY * (this.bHeight - this.imgHeight) + 'px';
      this.$emit('move', ev);
      this.zoomVisiable = true;
    },
    init() {
      this.oHoverBox = this.$refs.hoverBox; //小蓝框
      this.oPreviewBox = this.$refs.previewBox;//原图片展示区域
      this.oBigImg = this.$refs.bigImg; //大图
      this.imgBox = this.$refs.zoomBox;//大图展示区域
      this.houverWidth = this.oHoverBox.offsetWidth;//小蓝框宽
      this.houverHeight = this.oHoverBox.offsetHeight;//小蓝框高
      this.pWidth = this.oPreviewBox.offsetWidth;//原图宽
      this.pHeight = this.oPreviewBox.offsetHeight;//原图高
      this.imgWidth = this.oBigImg.offsetWidth;//大图宽
      this.imgHeight = this.oBigImg.offsetHeight;//大图高
      this.bWidth = this.imgBox.offsetWidth;//大图区域宽
      this.bHeight = this.imgBox.offsetHeight;//大图区域高
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    },
    whichImg(index,ev) {
        this.current = index;
        var imgSrc = ev.target.src;
        this.previewImg = imgSrc;
        this.zoomImg = imgSrc;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .magnify {
    position: relative;
    .preview-box {
      width: 460px;
      height: 460px;
      border: 1px solid #dededd;
      position: relative;
      overflow: hidden;
      &:hover .hover-box{
        display: block;
      }
      .hover-box {
        position: absolute;
        display: none;
        left: 0;
        top: 0;
        width: 1px;
        height: 1px;
        border: 1px solid #545454;
        background: url('../../assets/images/magnify_bag.png') repeat 0 0;
        cursor: move;
        user-select: none;
      }
    }
    .zoom-box {
      width: 460px;
      height: 460px;
      overflow: hidden;
      position: absolute;
      left: 1px;
      top: 1px;
      cursor: crosshair;
      img {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  .productList{
      width: 460px;
      margin-top: 15px;
      ul{
          width: 100%;
          overflow: hidden;
          display: flex;
          justify-content: space-around;
          align-items: center;
          li{
              width: 60px;
              height: 60px;
              cursor: pointer;
              box-sizing: border-box;
              img{
                  width: 100%;
                  height: 100%;
                  box-sizing: border-box;
                  border: 1px solid #EDEDED;
              }
          }
          .active{
              border: 2px solid #FF3308;
          }
      }
  }
</style>