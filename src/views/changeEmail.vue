<template>
    <div class="changeEmail">
        <HeaderHtml></HeaderHtml>
        <div>
            <Search id="searchBar" :fixedMsg="searchBarFixed"></Search>
        </div>
        <div class="content" v-show="verifyNowstatus">
            <Step msg-father="Change Email Address"></Step>
            <div class="progress">Verification in progress <span style="color: #FF3308;">150***@163.com </span>Change email please select the method of verification</div>
            <div class="verifynow">
                <div>By Email Verification</div>
                <div>If your email is still in use,please choose this way .</div>
                <el-button class="btn" @click="verifyNow">Verify Now</el-button>
            </div>
        </div>
        <div class="content" v-show="!verifyNowstatus">
            <Step msg-father="Change Email Address"></Step>
            <div class="followstep"><img src="../assets/images/modifyMailboxtishi.png" alt="" style="margin-right: 12px;">If you would like to verify your account by Email Verification,please follow these steps</div>
            <div class="emailAddress">Email Address  <span style="margin-left: 24px;">15042214483@163.com</span></div>
            <el-form :model="numberValidateForm" ref="numberValidateForm" class="demo-ruleForm">
                <el-form-item label="Verification code" prop="code" :class="{ red: isRed }">
                    <el-input type="code" v-model="numberValidateForm.code" autocomplete="off" placeholder="6 digits"></el-input>
                    <div class="seconds" v-show="isActive=='loading'||isActive=='success' ? true : false">{{ seconds }} seconds later，get a code again</div>
                    <div class="seconds" style="color:#FF3308;" v-show="isActive=='fail' ? true : false">Click here to receive verification code</div>
                </el-form-item>
                <div class="codetips" v-show="isActive=='loading' ? true : false"><img src="../assets/images/modifyMailboxloading.png" alt="">Sending a verification code…</div>
                <div class="codetips" v-show="isActive=='fail' ? true : false" style="color:#FF3308;"><img src="../assets/images/modifyMailboxfail.png" alt="">You have exceeded the limit to obtain your verification code.Please try again after 15 minutes</div>
                <div class="codetips" v-show="isActive=='success' ? true : false"><img src="../assets/images/modifyMailboxsuccess.png" alt="">A verification code has been sent to your emai address, and it will be calid for 15 minutes.Please make sure it didn’t wind up in your Junk Mail and enter the valid code.</div>
                <el-form-item  class="followstepbtn">
                    <el-button type="primary" @click="submitForm">Submit</el-button>
                </el-form-item>
            </el-form>
            <div class="error" v-show="isError">This verification code has expired</div>
            <div class="notreceive">
                <h3>Did not receive email verification code？</h3>
                <ul>
                    <li>1,Your email code may take up to 10 minutes to arrive (depending on your email service provider),please do not repeat clicking.</li>
                    <li>2,Please check if your mailbox works or if it goes to trash/spam folder or your mail inbox is full.</li>
                    <li>3,Network anomalies may cause loss of messages, please re-submit request or try again later with different browsers or with browser cookies cleared.</li>
                    <li>4,Check with your email operator to see if verification code email has been blocked</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderHtml from '@/components/common/headerhtml'
import Search from '@/components/common/search'
import Step from '@/components/common/step'

export default {
    name:'changeEmail',
    components: {
        HeaderHtml,
        Search,
        Step
    },
    data(){
        return{
            searchBarFixed:{
                isfixed:false,
                isshow:false
            },
            verifyNowstatus:true,
            numberValidateForm: {
                code: ''
            },
            isRed:false,
            isError:false,
            isActive:'success',//loading fail success
            seconds:60
        }
    },
    methods:{
        verifyNow(){
            this.verifyNowstatus=false
        },
        submitForm() {
            this.$router.push({ name: 'changeEmailtwo', params: {  }})
        },
    }
}
</script>
<style lang="scss" scoped>
.changeEmail{
    .content{
        margin: 0 auto;
        width:780px;
        text-align: left;
        padding-top: 48px;
        .progress{
            margin-top: 32px;
        }
        .verifynow{
            width: 780px;
            height: 99px;
            margin-top: 32px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(222,222,222,1);
            position: relative;
            div{
                &:nth-child(1){
                    height:19px;
                    font-size:16px;
                    font-family:HelveticaNeue-Bold;
                    font-weight:bold;
                    color:rgba(102,102,102,1);
                    line-height:19px;
                    margin: 28px 0 10px 24px;
                }
                &:nth-child(2){
                    height:14px;
                    font-size:12px;
                    font-family:HelveticaNeue;
                    color:rgba(102,102,102,1);
                    line-height:14px;
                    margin-left: 24px;
                }
            }
            .btn{
                position: absolute;
                right: 24px;
                bottom: 24px;
                width:137px;
                height:29px;
                line-height: 29px;
                background:rgba(254,182,16,1);
                border-radius:2px;
                color: #fff;
            }
        }
        .followstep{
            height:16px;
            font-size:14px;
            font-family:HelveticaNeue;
            color:rgba(102,102,102,1);
            line-height:16px;
            display: flex;
            align-items: center;
            margin-top: 24px;
        }
        .emailAddress{
            margin: 24px 0 28px 109px;
        }
        .demo-ruleForm{
            position: relative;
            &>div{
                &:nth-child(1){
                    display: flex;
                    padding-left: 109px;
                    box-sizing: border-box;
                }
            }
            .red{
                .el-form-item__content{
                    .el-input{
                        border-color: #FF3308;
                    }
                }
            }
            .codetips{
                width: 820px;
                font-size:12px;
                font-family:HelveticaNeue;
                color:rgba(102,102,102,1);
                line-height:16px;
                display: flex;
                align-items: start;
                img{
                    margin-left: 233px;
                    margin-right: 7px;
                }
            }
            .followstepbtn{
                margin: 24px 0 56px 233px;
                height:36px;
                .el-button--primary{
                    width:152px;
                    height:36px;
                    background:rgba(254,182,16,1);
                    border-radius:2px;
                    border:1px solid rgba(254,182,16,1);
                }
            }
        }
        .error{
            position: absolute;
            height:16px;
            font-size:12px;
            font-family:HelveticaNeue;
            color:rgba(255,51,8,1);
            line-height:16px;
            left: 620px;
            bottom: 470px;
        }
        .notreceive{
            width:780px;
            height:192px;
            background:rgba(255,248,217,1);
            border:1px solid rgba(253,230,120,1);
            padding-left: 24px;
            padding-top: 24px;
            box-sizing: border-box;
            h3{
                height:20px;
                font-size:14px;
                font-family:HelveticaNeue-Medium;
                font-weight:500;
                color:rgba(51,51,51,1);
                line-height:17px;
                margin-bottom: 12px;
            }
            ul{
                li{
                    font-size:12px;
                    font-family:HelveticaNeue-Medium;
                    font-weight:500;
                    color:rgba(102,102,102,1);
                    line-height:20px;
                    margin-bottom: 4px;
                }
            }
        }
    }
}
</style>
<style lang="scss">
.changeEmail{
    .step{
        .el-steps{
            .is-flex{
                .el-step__head.is-wait{
                    left: 14px;
                }
            }
            &>div{
                &:nth-child(2){
                    .el-step__head{
                        margin-left: -10px;
                    }
                    .el-step__title{
                        margin-left: -40px;
                        font-size:14px;
                        font-family:HelveticaNeue-Medium;
                        font-weight:500;
                    }
                }
            }
        }
    }
    .verifynow{
        .btn{
            span{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                display: block;
            }
        }
    }
    .demo-ruleForm{
        div{
            &:nth-child(1){
                margin-bottom: 8px;
                .el-form-item__content{
                    display: flex;
                    margin-left: 19px;
                    .el-input{
                        width:110px;
                        height:36px;
                        background:rgba(255,255,255,1);
                        border-radius:2px;
                        border:1px solid rgba(222,222,222,1);
                        .el-input__inner{
                            height:36px;
                            line-height: 36px;
                            border:none;
                            border-bottom: 1px solid rgba(222,222,222,1);
                            top: -3px;
                            position: relative;
                        }
                    }
                    .seconds{
                        width:248px;
                        height:36px;
                        background:rgba(255,240,227,1);
                        border-radius:2px;
                        border:1px solid rgba(255,120,5,1);
                        margin-left: 12px;
                        font-size:12px;
                        font-family:Helvetica;
                        color:rgba(153,153,153,1);
                        text-align: center;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>