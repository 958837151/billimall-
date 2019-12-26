<template>
    <div class="changeEmailtwo">
        <HeaderHtml></HeaderHtml>
        <div>
            <Search id="searchBar" :fixedMsg="searchBarFixed"></Search>
        </div>
        <div class="content" v-show="!isSuccess">
            <Step ref="step" msg-father="Change Email Address"></Step>
            <div class="followstep"><img src="../assets/images/modifyMailboxtishi.png" alt="" style="margin-right: 12px;">Please  make sure that your new address works.</div>
            <div class="emailAddress">Login ID:  <span style="margin-left: 11px;">15042214483@163.com</span></div>
            <el-form :model="numberValidateForm" ref="numberValidateForm" class="demo-ruleForm" label-width="120px">
                <el-form-item label="Email" prop="code" class="formitem">
                    <el-input type="code" v-model="numberValidateForm.email" autocomplete="off" placeholder="6 digits"></el-input>
                    <div class="seconds" v-show="isActive=='default'||isActive=='occupy' ? true : false" :class="[isActive=='default'||isActive=='occupy' ? 'secondsactive' : '']">Request free verification code</div>
                    <div class="seconds" v-show="isActive=='fail' ? true : false">Click here to receive verification code</div>
                    <div class="seconds" v-show="isActive=='success' ? true : false">60 seconds later，a code again</div>
                </el-form-item>
                <div class="codetips" v-show="isActive=='default' ? false : false"><img src="../assets/images/modifyMailboxloading.png" alt="">Sending a verification code…</div>
                <div class="codetips" v-show="isActive=='fail' ? true : false" style="color:#FF3308;"><img src="../assets/images/modifyMailboxfail.png" alt="">This email is same as the currently one，please try another email</div>
                <div class="codetips" v-show="isActive=='occupy' ? true : false" style="color:#FF3308;"><img src="../assets/images/modifyMailboxfail.png" alt="">The email address has been registered.</div>
                <div class="codetips" v-show="isActive=='success' ? true : false"><img src="../assets/images/modifyMailboxsuccess.png" alt="">A verification code has been sent to your emai address, and it will be calid for 15 minutes.</div>

                <el-form-item label="Verification code" prop="code" class="formitem formitem2">
                    <el-input type="code" v-model="numberValidateForm.code" autocomplete="off" placeholder="6 digits"></el-input>
                </el-form-item>
                <div class="codetips" v-show="isActive=='fail' ? true : false" style="color:#FF3308;"><img src="../assets/images/modifyMailboxfail.png" alt="">Enter verification code</div>

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
        <div class="content finished" v-show="isSuccess">
            <img src="../assets/images/bigsuccess.png" alt="">
            <div>Changed successfully, sdf***asd@163.com can be your account name</div>
            <div>Return to my BilliMall</div>
        </div>
    </div>
</template>
<script>
import HeaderHtml from '@/components/common/headerhtml'
import Search from '@/components/common/search'
import Step from '@/components/common/step'

export default {
    name:'changeEmailtwo',
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
            numberValidateForm: {
                email:'',
                code: ''
            },
            isError:false,
            isSuccess:false,
            isActive:'occupy',//fail相同 success成功 default默认 occupy占用
            seconds:60
        }
    },
    mounted(){
        this.$refs.step.next()
    },
    methods:{
        submitForm() {
            this.isSuccess=!this.isSuccess
        },
    }
}
</script>
<style lang="scss" scoped>
.changeEmailtwo{
    .content{
        margin: 0 auto;
        width:780px;
        text-align: left;
        padding-top: 48px;
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
            margin: 24px 0 28px 155px;
        }
        .demo-ruleForm{
            position: relative;
            .formitem{
                display: flex;
                padding-left: 109px;
                box-sizing: border-box;
            }
            .formitem2{
                margin-top: 28px;
            }
            // .red{
            //     .el-form-item__content{
            //         .el-input{
            //             border-color: #FF3308;
            //         }
            //     }
            // }
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
                left: -120px;
                position: relative;
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
    .finished{
        width:1200px;
        height:117px;
        background:rgba(242,249,194,1);
        border:1px solid rgba(180,204,6,1);
        margin: 0 auto;
        padding: 0;
        margin-top: 32px;
        position: relative;
        box-sizing: border-box;
        img{
            position: absolute;
            width: 36px;
            height: 36px;
            display: block;
            top: 40px;
            left: 32px;
        }
        div{
            &:nth-child(2){
                height:15px;
                font-size:16px;
                font-family:HelveticaNeue-Bold;
                font-weight:bold;
                color:rgba(51,51,51,1);
                line-height:15px;
                margin: 40px 0 7px 93px;
            }
            &:nth-child(3){
                height:15px;
                font-size:14px;
                font-family:HelveticaNeue;
                color:rgba(255,51,8,1);
                line-height:15px;
                margin-left: 93px;
            }
        }
    }
}
</style>
<style lang="scss">
.changeEmailtwo{
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
    .demo-ruleForm{
        .formitem{
            margin-bottom: 8px;
            .el-form-item__content{
                display: flex;
                margin-left: 19px;
                left: -115px;
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
                    color:#999999;
                    text-align: center;
                    cursor: pointer;
                }
                .secondsactive{
                    background:rgba(243,243,243,1);
                    border:1px solid rgba(102,102,102,1);
                    color:#333333;
                }
            }
        }
    }
}
</style>