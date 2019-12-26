<template>

<!-- 二维码生成组件 -->

<div class="qrCode">
    <div class="logoConter">
        <img :src="img" class="logoimg"/>
    </div>
    <div id="qrCode" ref="qrCodeDiv"></div>
</div>
</template>

<script>
  import QRCode from 'qrcodejs2';
  export default {
    // name: "qrCode",
    data() {
      return {
          url:"http://192.168.1.35:8080/phonesystem",
          img:require("@/assets/images/logoqrcode.png")
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.bindQRCode();
      })
    },
    methods: {
      bindQRCode: function () {
        new QRCode(this.$refs.qrCodeDiv, {
          text: this.url,
          width: 242,
          height: 242,
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          correctLevel: QRCode.CorrectLevel.L,//容错率，L/M/H
        })
      }
    }
  }
</script>
<style>

.qrCode{
  display:inline-block;
  position:relative;
}
.logoConter{
    position:absolute;
    left:50%;
    top:50%;
    width: 40px;
    height: 40px;
    transform: translate(-50%,-50%);
    background-color: #fff;
    border-radius: 5px;
}
.logoimg{
    width: 30px;
    height: 30px;
    margin-top: 5px;
}
</style>