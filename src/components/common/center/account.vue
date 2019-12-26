<template>
<!-- 我的account页面 -->
    <div class="my-account">
        <div class="account-title">Account</div>
        <div class="account-list">
            <div class="account-top">
                <div @click="choseAccount(index)" v-for="(item,index) in btnList" :key="index" :class="{accountActive:index==current}">{{item}}</div>
            </div>
            <div class="account-bm" v-show="current==0">
                <div class="user-img">
                    <img :src="userImg" alt="" style="width: 104px;height: 104px;display: block;">
                    <div class="upload_user_pic">
                        <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="https://pc.bm.cn/restapi/suggestions/upload?action=uploadimage"
                        multiple
                        :http-request="handleHttpRequest" 
                        :before-upload="beforeAvatarUpload"
                        :limit="1"
                        :on-exceed="alertUser" name="upfile">
                        <el-button size="small" type="primary">upload Avatar</el-button>
                        </el-upload>
                    </div>
                </div>
                <div class="user-edit">
                    <div class="user-msg">
                        <div class="user-name">
                            <span @click="inputIsShow" v-show="!inputShow">{{userName}}</span>
                            <input type="text" v-model="userName" v-show="inputShow" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')">
                        </div>
                        <div class="user-sex" :class="{marginT:inputShow}">
                            <span class="male" @click="sexAlert" v-if="sexIdex==1"><i class="el-icon-male"></i></span>
                            <span class="female" @click="sexAlert" v-else><i class="el-icon-female"></i></span>
                            <div class="chose-sex" v-show="sexChoseAlert">
                                <div @click="userSex(1)">
                                    <span class="male"><i class="el-icon-male"></i></span>
                                    <span style="font-size:12px;margin-left:10px;">Male</span>
                                    <span style="float:right;font-size:12px;margin-left:10px;color:#FF3308" v-show="sexIdex==1"><i class="el-icon-check"></i></span>
                                </div>
                                <div @click="userSex(2)">
                                    <span class="female"><i class="el-icon-female"></i></span>
                                    <span style="font-size:12px;margin-left:10px;">Female</span>
                                    <span style="float:right;font-size:12px;margin-left:10px;color:#FF3308" v-show="sexIdex==2"><i class="el-icon-check"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="user-time">
                        <div class="default-time" v-show="!inputShow" @click="inputIsShow">{{userBirth}}</div>
                        <div class="chose-time" v-show="inputShow">
                            <el-date-picker
                                v-model="userBirth"
                                type="date"
                                placeholder="your birth"
                                format="dd.MM.yyyy"
                                value-format="dd.MM.yyyy">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="save-cancel" v-show="inputShow">
                        <span @click="editClose('Save')">Save</span>
                        <span @click="editClose">Cancle</span>
                    </div>
                </div>
            </div>
            <div class="account-settings" v-show="current==1">
                <!-- <p>My Personal Information</p>
                <p>
                    <span>Upload My Photo</span>
                    <span>Edit Member Profile</span>
                </p> -->
                <p>Security Information Settings</p>
                <p>
                    <span @click="confirmEmail">Email Verification</span>
                    <span @click="changeEmail">Change Email Address</span>
                    <span @click="changepassword">Change Password</span>
                    <!-- <span>Set Security Question</span> -->
                </p>
            </div>
        </div>
       
    </div>
</template>
<script>
import api from '@/api'
import user from "@/assets/images/user.png"
export default {
    data(){
        return{
            current:0,
            // btnList:["My Profile","Account Settings"],
            btnList:["My Profile"],
            userName:"LUCKY",
            inputShow:false,
            sexChoseAlert:false,
            sexIdex:1,//性别：0 保密 1 男 2 女
            userBirth:"16.08.1995",
            userImg:user
        }
    },
    created() {
        this.getuserDetail()
    },
    methods:{
        getuserPersonal(){//个人资料修改
            let params = {
                "birthday":this.userBirth,
                "head_pic":this.userImg,
                "sex":this.sexIdex,
                "nickname":this.userName
            }
            this.axios.post(api.userPersonal, params)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        this.$message({
                            showClose: true,
                            message: "Modified success",
                            type: 'success'
                        });
                        this.getuserDetail()
                    }else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        getuserDetail(){//获取用户基本信息
            let params = {
            }
            this.axios.post(api.userDetail, params)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        this.userName=data.username
                        this.userBirth=data.birthday
                        this.sexIdex=data.sex*1
                        this.userImg=data.head_pic
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        toMyAddress(){
            this.$router.push({name:'myaddress'})
        },
        choseAccount(index){
            this.current = index;
        },
        inputIsShow(){
            this.inputShow = true;
        },
        sexAlert(){
            this.sexChoseAlert = !this.sexChoseAlert;
            this.inputShow = true;
        },
        userSex(index){
            this.sexIdex = index
            this.sexChoseAlert = !this.sexChoseAlert
        },
        editClose(state){
            if (state=="Save") {
                this.getuserPersonal()
            }
            this.inputShow = false;
        },
        handleHttpRequest(a){
            var formdata=new FormData()
            formdata.append("upfile",a.file)
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            this.axios.post(api.userUpload,formdata,config)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        this.$refs.upload.clearFiles()
                        this.userImg=data.url
                        this.getuserPersonal()
                    }
                })
        },
        beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
            const isJPG = true;
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$alert('Upload image size cannot exceed 2MB!', 'Tips', {
                    confirmButtonText: 'OK'
                });
            }
            return isJPG && isLt2M;
        },
        alertUser(files, fileList){
            this.$alert('No more than 1 pictures, please', 'Tips', {
                confirmButtonText: 'OK'
            });
        },
        confirmEmail(){
            this.$router.push({ name: 'confirmEmail', params: {  }})
        },
        changeEmail(){
            this.$router.push({ name: 'changeEmail', params: {  }})
        },
        changepassword(){
            this.$router.push({ name: 'changepassword', params: {  }})
        }
    }
}
</script>
<style lang="scss" scoped>
    .account-title{
        font-size: 18px;
        font-weight: bold;
        background: #FAFAFA;
        padding-bottom: 16px;
        text-align: left;
    }
    .account-list{
        .account-top{
            overflow: hidden;
            border-bottom: 1px solid #EDEDED;
            div{
                float: left;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                margin-left: 30px;
                cursor: pointer;
            }
            div:last-child{
                margin-left: 140px;
            }
            .accountActive{
                font-weight: bold;
                border-bottom: 5px solid #FEB610;
            }
        }
        .account-bm{
            overflow: hidden;
            padding: 36px 24px;
            box-sizing: border-box;
            .user-img,.user-edit{
                float: left;
            }
            .user-img{
                width: 104px;
                margin-right: 32px;
                img{
                    width: 100%;
                    border-radius: 50%;
                }
                .upload_user_pic{
                    margin-top: 20px;
                    height: 32px;
                    overflow: hidden;
                }
            }
            .user-msg:after{
                content: "";
                display: block;
                clear: both;
            }
            .user-msg{
                // overflow: hidden;
                .user-name,.user-sex{
                    float: left;
                }
                .user-name{
                    span{
                        display: inline-block;
                        padding:0 5px;
                        cursor: pointer;
                        font-size: 16px;
                    }
                    input{
                        border: 1px solid #DEDEDE;
                        height: 40px;
                        line-height: 40px;
                        font-size: 16px;
                        width: 215px;
                        padding: 0 6px;
                        box-sizing: border-box;
                    }
                }
                .user-sex{
                    position: relative;
                    margin-left: 24px;
                    .male,.female{
                        display: inline-block;
                        color: #fff;
                        background-color: #B4CAEB;
                        width: 15px;
                        height: 15px;
                        cursor: pointer;
                        border-radius: 2px;
                    }
                    .female{
                        background-color: #FBBDB1;
                    }
                    .chose-sex{
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        border: 1px solid #EDEDED;
                        color: #333;
                        background-color: #fff;
                        div{
                            width: 223px;
                            text-align: left;
                            box-sizing: border-box;
                            cursor: pointer;
                            padding: 9px 9px;
                            span{
                                color: #333;
                                font-size: 16px;
                            }
                        }
                        div:hover{
                            background-color: #F2F2F2;
                        }
                    }
                }
                .marginT{
                    margin-top: 13px;
                }
            }
            .user-time{
                font-size: 14px;
                color: #999;
                text-align: left;
                margin-top: 12px;
                position: relative;
                .default-time{
                    cursor: pointer;
                }
                .chose-time{
                    position: absolute;
                    top: 0px;
                    left: 0px;
                }
                & /deep/ .el-date-editor.el-input{
                    width: 215px;
                }
            }
        }
        .save-cancel{
            text-align: left;
            margin-top: 70px;
            span{
                display: inline-block;
                width: 72px;
                height: 32px;
                line-height: 32px;
                border-radius: 2px;
                text-align: center;
                background: #FEB610;
                box-sizing: border-box;
                margin-right: 12px;
                cursor: pointer;
                color: #fff;
            }
            span:last-child{
                border: 1px solid #979797;
                background: none;
                color: #333;
            }

        }
        .account-settings{
            text-align: left;
            font-size: 14px;
            p{
                margin-top: 24px;
                margin-left: 24px;
            }
            p:last-child{
                padding-bottom: 48px;
            }
            span{
                color: #1B5EC9;
                cursor: pointer;
                margin-right: 110px;
            }
            span:last-child{
                margin-right: 0;
            }
        }
    }
</style>
