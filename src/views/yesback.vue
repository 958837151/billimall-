<template>
    <div>
        <div class="container">
            <div class="content-container">
                <div class="top-content">✔</div>
                <div class="content-one">Payment Successful</div>
                <div class="content-two">Order will be shipped out within 2-3 days.</div>
                <div class="back-btn" @click="appClose">Back</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"yesback",
        data(){
            return{
                
            }
        },
        created() {
            
        },
        methods:{
            appClose(){
                this.$router.push({ name: 'OrderDetails', params: {  }})
            }
        }
    }
</script>
<style lang="scss" scoped>
    .content-container{
       width: 90%;
       margin: 0 auto;
       text-align: center;
    }
    .top-content{
     width: 53px;
     height: 53px;
     margin: 0 auto;
     margin-top: 100px;
     background: #B4CC06;
     color: #fff;
     border-radius: 50%;
     line-height: 53px;
     font-size: 30px;
    }
    .content-one{
        margin-top: 28px;
        font-size: 18px;
        /* font-weight: bold; */
        color: #333;
        margin-bottom: 6px;
    }
    .content-two{
        font-size: 14px;
        color: #333;
        margin-bottom: 36px;
    }
    .back-btn{
         width: 140px;
         height: 38px;
         background: #FDE678;
         line-height: 38px;
         margin: 0 auto;
         border-radius: 19px;
         color: #333;
         font-weight: bold;
    }
</style>