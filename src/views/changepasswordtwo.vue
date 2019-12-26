<template>
    <div class="changepasswordtwo">
        <HeaderHtml></HeaderHtml>
        <div>
            <Search id="searchBar" :fixedMsg="searchBarFixed"></Search>
        </div>
        <div class="content" v-show="!isSuccess">
            <Step ref="step" msg-father="Change Login Password"></Step>
            <el-form :model="ruleForm" ref="ruleForm" label-width="170px" class="demo-ruleForm">

                <el-form-item label="New Password" prop="pass" v-if="checked">
                    <el-input type="text" v-model="ruleForm.pass" autocomplete="off" :autofocus="checked" placeholder="Input your new password"></el-input>
                </el-form-item>
                <el-form-item label="New Password" prop="pass" v-else>
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" :autofocus="!checked" placeholder="Input your new password"></el-input>
                </el-form-item>

                <el-form-item label="Confirm New Password" prop="checkPass" v-if="checked" :class="{ red: isRed }">
                    <el-input type="text" v-model="ruleForm.checkPass" autocomplete="off" placeholder="Confirm your new password"></el-input>
                </el-form-item>
                <el-form-item label="Confirm New Password" prop="checkPass" v-else :class="{ red: isRed }" ref='confirmpw'>
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="Confirm your new password"></el-input>
                </el-form-item>
                <div class="codetips" v-show="isRed"><img src="../assets/images/modifyMailboxfail.png" alt="">The two passwords do not match</div>

                <div class="consist">The password must consist of acombination of 6-20 letters,numbers and symbols(except spaces)</div>
                <el-checkbox v-model="checked" class="checkbox">Show password</el-checkbox>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">Submit</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content finished" v-show="isSuccess">
            <img src="../assets/images/bigsuccess.png" alt="">
            <div>Changed successfully.</div>
            <div>Sign in now</div>
        </div>
    </div>
</template>
<script>
import HeaderHtml from '@/components/common/headerhtml'
import Search from '@/components/common/search'
import Step from '@/components/common/step'

export default {
    name:'changepasswordtwo',
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
            isSuccess:false,
            ruleForm: {
                pass: '',
                checkPass: '',
            },
            checked: false,
            isRed: false
        }
    },
    computed: {
        confirmpw(){
            return this.ruleForm.checkPass
        },
        pw(){
            return this.ruleForm.pass
        }
    },
    watch: {
        confirmpw(e){
            if(e!==this.ruleForm.pass){
                setTimeout(() => {
                    this.isRed=true
                }, 1000);
            }else{
                setTimeout(() => {
                    this.isRed=false
                }, 1000);
            }
        },
        pw(e){
            if(e!==this.ruleForm.checkPass){
                setTimeout(() => {
                    this.isRed=true
                }, 1000);
            }else{
                setTimeout(() => {
                    this.isRed=false
                }, 1000);
            }
        },
    },
    created() {
        let that=this;
        document.onkeypress=function(e){//回车触发
            var keycode=document.all ? event.keyCode : e.which;
            if (keycode == 13) {
                that.submitForm()
                return false;
            }
        }
    },
    mounted(){
        this.$refs.step.next()
    },
    methods:{
        submitForm() {
            if(this.ruleForm.pass==''||this.ruleForm.checkPass==''){
                this.$message('Password or confirmation password cannot be empty');
                return
            }
            if(this.ruleForm.pass==this.ruleForm.checkPass){
                this.isSuccess=!this.isSuccess
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.changepasswordtwo{
    .content{
        margin: 0 auto;
        width:780px;
        text-align: left;
        padding-top: 48px;
        .demo-ruleForm{
            position: relative;
            .el-form-item{
                margin-bottom: 0;
                margin-left: 60px;
                &:nth-child(1){
                    margin-top: 68px;
                }
                &:nth-child(2){
                    margin-top: 24px;
                }
                &:nth-child(6){
                    margin-top: 25px;
                    margin-left: 72px;
                }
                .el-input{
                    width: 210px;
                    height: 36px;
                    left: 12px;
                }
            }
            .consist{
                width: 308px;
                height:28px;
                font-size:12px;
                font-family:Helvetica;
                color:rgba(153,153,153,1);
                line-height:14px;
                margin-left: 243px;
                margin-top: 12px;
            }
            .checkbox{
                margin-left: 243px;
                margin-top: 9px;
            }
            .codetips{
                width:230px;
                height:17px;
                font-size:12px;
                font-family:HelveticaNeue;
                color:rgba(255,51,8,1);
                line-height:14px;
                display: flex;
                align-items: center;
                position: absolute;
                left: 460px;
                top: 75px;
                img{
                    margin-right: 9px;
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
.changepasswordtwo{
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
    .content{
        .demo-ruleForm{
            .el-form-item{
                .el-input{
                    .el-input__inner{
                        height: 36px;
                        line-height: 36px;
                        &:focus{
                            border-color: rgba(222,222,222,1);
                        }
                    }
                }
                .el-form-item__label{
                    font-family:HelveticaNeue;
                    color:rgba(102,102,102,1);
                }
            }
            .red{
                .el-input{
                    .el-input__inner{
                        border-color: #FF3308;
                        &:focus{
                            border-color: #FF3308;
                        }
                    }
                }
            }
            .checkbox{
                .el-checkbox__inner{
                    width:12px;
                    height:12px;
                    background:#fff;
                    border-radius: 50%;
                    overflow: hidden;
                    border-color: #CACACA;
                    &::after{
                        border-color: #B4CC06;
                        top: 0;
                        left: 3px;
                    }
                }
                .el-checkbox__label{
                    height:14px;
                    font-size:12px;
                    font-family:SFProDisplay-Regular;
                    font-weight:400;
                    color:rgba(153,153,153,1);
                    line-height:14px;
                }
            }
            .is-checked{
                .el-checkbox__inner{
                    border-color: #B4CC06;
                }
            }
        }
    }
}
</style>