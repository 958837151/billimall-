<template>
    <div class="login">
        <header><img src="../assets/images/loginlogo.png" alt="" class="logo" @click="toHome"></header>
        <hr>
        <div class="logintab">
            <span :class="[loginstatus === 'register' ? 'activespan' : '']" @click="logintab('register')">REGISTER</span>
            <span :class="[loginstatus === 'signin' ? 'activespan' : '']" @click="logintab('signin')">SIGN IN</span>
        </div>

        <div class="register loginform" v-show="loginstatus === 'register'">
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="Email/Phone" class="formw username" :autofocus="loginstatus === 'register'"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" show-password placeholder="Password" class="formw password"></el-input>
                </el-form-item>
                <el-button class="formw submit" @click="registersubmit('loginForm')">GREATE ACCOUNT</el-button>
            </el-form>
        </div>

        <div class="signin loginform" v-show="loginstatus === 'signin'">
            <el-form :model="signinForm" status-icon :rules="rules" ref="signinForm" class="demo-ruleForm">
                <el-form-item prop="userName">
                    <el-input v-model="signinForm.userName" placeholder="Email/Phone" class="formw username" :autofocus="loginstatus === 'signin'"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="signinForm.password" show-password placeholder="Password" class="formw password"></el-input>
                </el-form-item>
                <el-button class="formw submit" @click="signinsubmit('signinForm')">SIGN IN</el-button>
            </el-form>
        </div>
        
        <div class="content" v-show="loginstatus === 'register'">By creating an account,you agree to the<span> BilliMall.com Free Membership Agreement </span>and<span> Privacy Policy</span></div>
        <div class="content" v-show="loginstatus === 'signin'"><span>Forgot Password</span></div>
        <div class="access">
            <h5>Quick access with</h5>
            <img src="../assets/images/loginf.png" alt="" class="loginf">
            <img src="../assets/images/loging.png" alt="">
        </div>
    </div>
</template>
<script>
    import api from '@/api'
    export default {
        name:'login',
        data(){
            var username = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('Please enter a valid Email or phone number.'));
                }
                if(this.loginstatus=='register'&&value==localStorage.getItem("loginuserName")){
                    return callback(new Error('Account already exists.'));
                }
                setTimeout(() => {
                    var phones = /^\d{10,10}$/;
                    var emall = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
                    if (phones.test(value)) {
                        this.regtype="mobile"
                    } else{
                        this.regtype="email"
                    }
                    if (phones.test(value)||emall.test(value)) {
                        callback();
                    } 
                    else {
                        callback(new Error('Please enter a valid Email or phone number.'));
                    }
                }, 1000);
            };
            var password = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('Please enter a password between 6-20 characters long（numbers and letters only）'));
                }
                setTimeout(() => {
                    var onlyNum = new RegExp('^[0-9]+$');
                    var onlyChar = new RegExp('^[a-zA-Z]+$');
                    if (value.toString().length < 5) {
                        callback(new Error('Please enter a password between 6-20 characters long（numbers and letters only）'));
                    } 
                    else if (onlyNum.test(value)) {
                        callback(new Error('Please enter a password between 6-20 characters long（numbers and letters only）'));
                    }
                    else if (onlyChar.test(value)) {
                        callback(new Error('Please enter a password between 6-20 characters long（numbers and letters only）'));
                    }
                    else {
                        callback();
                    }
                }, 1000);
            };
            return{
                loginForm:{
                    userName:"",
                    password:""
                },
                loginstatus:'register',
                signinForm:{
                    userName:"",
                    password:""
                },
                rules: {
                    userName: [
                        { validator: username, trigger: 'blur' }
                    ],
                    password: [
                        { validator: password, trigger: 'blur' }
                    ]
                },
                token: '',
                regtype:"email"
            }
        },
        created() {
            if(this.$route.params.islogin){
                this.loginstatus=this.$route.params.islogin
            }
            this.keypress()
        },
        methods: {
            getreg(){//注册
                let params = {
                    "username":this.loginForm.userName,
                    "password":this.loginForm.password,
                    "regtype":this.regtype
                }
                this.axios.post(api.reg, params)
                    .then(response => {
                        if(response.data.code==200){
                            this.$router.push({ name: 'home', params: { logindata : response.data.data }});
                            this.$store.commit("login", response.data.data.token)
                            this.$store.commit("userdata", response.data.data)
                            this.$message({
                                message: 'Congratulations on your successful registration!',
                                type: 'success'
                            });
                        }
                        else if(response.data.code==500){
                            this.$message({
                                message: response.data.message,
                                type: 'warning'
                            });
                        }
                    })
            },
            getlogin(){//登录
                let params = {
                    "username":this.signinForm.userName,
                    "password":this.signinForm.password,
                }
                this.axios.post(api.login, params)
                    .then(response => {
                        if(response.data.code==200){
                            this.$router.push({ name: 'home', params: { logindata : response.data.data }});
                            this.$store.commit("login", response.data.data.token)
                            this.$store.commit("userdata", response.data.data)
                            this.$message({
                                message: 'Congratulations! Login sucessfully!',
                                type: 'success'
                            });
                        }
                        else if(response.data.code==500){
                            this.$message({
                                message: response.data.message,
                                type: 'warning'
                            });
                        }
                    })
            },
            keypress(){
                let that=this;
                document.onkeypress=function(e){//回车触发
                    var keycode=document.all ? event.keyCode : e.which;
                    if (keycode == 13) {
                        if(that.loginstatus=='register'){
                            that.registersubmit('loginForm');
                        }
                        else if(that.loginstatus=='signin'){
                            that.signinsubmit('signinForm');
                        }
                        return false;
                    }
                }
            },
            logintab(t){//切换
                if(t=='register'){
                    this.loginstatus='register' 
                }else if(t=='signin'){
                    this.loginstatus='signin'
                }
            },
            registersubmit(formName) {//register注册提交
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getreg()
                    }
                });
            },
            signinsubmit(formName) {//signin登录提交
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getlogin()
                    }
                });
            },
            toHome(){
                this.$router.push({ name: 'home', params: {  }});
            }
        }
    }
</script>
<style lang="scss" scoped>
.login{
    header{
        margin: 0 auto;
        width: 1440px;
        height: 120px;
        text-align: left;
        position: relative;
        .logo{
            width: 289px;
            height: 60px;
            position: absolute;
            left: 123px;
            top: 30px;
        }
    }
    hr{
        width:1440px;
        height:1px;
        background:rgba(222,222,222,1);
        margin: 0 auto;
    }
    .logintab{
        width: 520px;
        height: 62px;
        line-height: 62px;
        text-align: center;
        margin: 0 auto;
        margin-top: 107px;
        span{
            width:156px;
            height:19px;
            font-size:16px;
            font-family:HelveticaNeue-Bold;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:19px;
            display: inline-block;
            cursor: pointer;
            &:nth-child(1){
                margin-right: 131px;
            }
        }
        span.activespan{
            color:rgba(254,182,16,1);
            position: relative;
            &:before{
                content: '';
                width:156px;
                height:2px;
                background:rgba(254,182,16,1);
                position: absolute;
                left: 0;
                bottom: -24px;
            }
        }
    }
    .loginform{
        width:520px;
        // height:62px;
        display: block;
        margin: 0 auto;
        .formw{
            width:520px;
            height:62px;
            display: block;
            margin: 0 auto;
            .el-input__inner{
                height: 62px;
            }
        }
        .username{
            margin-top: 48px;
        }
        .password{
            margin-top: 28px;
        }
        .submit{
            margin-top: 52px;
            background:rgba(254,182,16,1);
            border-radius:2px;
            color: #FFFFFF;
            padding: 0;
            border: 0;
        }
    }
    .content{
        margin: 0 auto;
        margin-top: 16px;
        width:520px;
        height:28px;
        font-size:12px;
        font-family:HelveticaNeue;
        color:rgba(153,153,153,1);
        line-height:14px;
        text-align: left;
        span{
            color: #1974A1;
            cursor: pointer;
        }
    }
    .access{
        width:520px;
        margin: 0 auto;
        margin-top: 78px;
        h5{
            height:19px;
            font-size:16px;
            font-family:HelveticaNeue-Medium;
            font-weight:500;
            color:rgba(153,153,153,1);
            line-height:19px;
            text-align: center;
            margin-bottom: 32px;
        }
        img{
            width: 78px;
            height: 78px;
            display: inline-block;
        }
        .loginf{
            margin-right: 64px;
        }
    }
    .el-form-item {
        margin-bottom: 0;
    } 
}
</style>
<style>
.login .el-input__inner{
    height: 62px;
}   
</style>