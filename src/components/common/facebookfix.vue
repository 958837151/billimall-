<template>

<!-- 右侧固定定位分享组件 -->

    <div class="facefixed">
        <!-- <div>
            <img src="@/assets/images/face.png">
        </div>
        <div>
            <img src="@/assets/images/xiaoniao.png">
        </div>
        <div>
            <img src="@/assets/images/huixing.png">
        </div>
        <div>
            <img src="@/assets/images/mogu.png">
        </div> -->
         <div class="returnTop">
            <span @click="retunrnTop"><i class="iconfont icon-icon-test"></i></span>
        </div>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                timer: null
            };
        },
        methods: {
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
    }
</script>
<style lang='scss' scoped>
    .facefixed{
        position: fixed;
        z-index: 1000;
        right: 50px;
        top: 300px;
        width: 40px;
        div{
            margin-top: 10px;
           cursor: pointer;
        }
        .returnTop{
            .iconfont{
                font-size: 26px;
                color: red;
            }
        }
    }
</style>