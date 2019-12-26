<template>
    <div class="confirmEmail">
        <HeaderHtml></HeaderHtml>
        <div>
            <Search id="searchBar" :fixedMsg="searchBarFixed"></Search>
        </div>
        <div class="content">
            <h3>Edit Member Profile</h3>
            <hr style="width:1200px;background:#DEDEDE;border:1px solid rgba(222,222,222,1);margin:0 auto;margin-top: 24px;">
            <div class="sentemail">
                <div style="margin-bottom: 2px;">We’ve sent an email to: 15052202263@163.com</div>
                <div style="margin-bottom: 24px;">Please confirm your email address so that you will not miss the inquires from trade partners.</div>
                <el-button class="btn" @click="editsubmit">Go to confirm now</el-button>
                <div>Didn’t receive our confirmation emaill?</div>
                <div class="confirmation">
                    <ul>
                        <li>1,Check your spam box.</li>
                        <li>2,Resend confirmation email to 15042214483@163.com?<span @click="resendnow" :class="{ resendnow: isShowconfirmation }">Resend now</span></li>
                        <li v-show="isShowconfirmation">We‘ve sent a confirmation email to your inbox. To resend confirmation,please wait <span style="color:#FF3308;">60</span> seconds.</li>
                        <li>3,Change another email address?<span>Change now</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderHtml from '@/components/common/headerhtml'
import Search from '@/components/common/search'

export default {
    name:'confirmEmail',
    components: {
        HeaderHtml,
        Search
    },
    data(){
        return{
            searchBarFixed:{
                isfixed:false,
                isshow:false
            },
            isShowconfirmation: false
        }
    },
    methods:{
        editsubmit(){

        },
        resendnow(){
            this.isShowconfirmation=true
        }
    }
}
</script>
<style lang="scss" scoped>
.confirmEmail{
    .content{
        margin: 0 auto;
        width:1440px;
        font-size:14px;
        font-family:HelveticaNeue;
        color:rgba(51,51,51,1);
        line-height:16px;
        h3{
            text-align: left;
            height:20px;
            font-size:18px;
            font-family:Helvetica;
            color:#333333;
            line-height:20px;
            margin: 24px 0 0 123px;
        }
        .sentemail{
            margin: 21px 0 0 144px;
            text-align: left;
            height:20px;
            font-size:14px;
            font-family:HelveticaNeue;
            color:#333333;
            line-height:20px;
            .btn{
                width:150px;
                height:32px;
                line-height: 32px;
                background:#FEB610;
                border-radius:2px;
                font-size:14px;
                font-family:HelveticaNeue-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                position: relative;
                margin-bottom: 32px;
            }
            .confirmation{
                padding-left: 48px;
                ul{
                    li{
                        margin-top: 6px;
                        span{
                            margin-left: 4px;
                            color: #1974A1;
                            cursor: pointer;
                        }
                    }
                    .resendnow{
                        color: #DEDEDE;
                    }
                }
            }
        }
    }
}
</style>
<style>
.confirmEmail .btn span{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
}    
</style>