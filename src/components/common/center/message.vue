<template>
<!-- message页面 -->
    <div class="message">
       <div class="message-title">Message</div>
       <div class="message-container">
           <div :class="[item.admin_id>=1 ? 'message-top' : '', 'message-md']" v-for="(item) in messageList" :key="item.id">
               <div class="own">
                   <span v-if="item.admin_id>=1">BilliMall</span>
                   <span style="color:#666;font-size:12px;" v-if="item.admin_id>=1">{{ item.reply_time }}</span>
                   <span style="color:#666;font-size:12px;" v-if="item.admin_id<1">{{ item.add_time }}</span>
                   <span v-if="item.admin_id<1">Own</span>
                </div>
                <div class="message-img">
                    <div v-if="item.admin_id>=1">
                        {{ item.reply }}
                    </div>
                    <div v-if="item.admin_id<1">
                        {{ item.content }}
                    </div>
                    <div v-if="item.admin_id>=1">
                        <img :src="item.reply_img" alt="" style="width:68px;height:68px;display:block;">
                    </div>
                    <div v-if="item.admin_id<1">
                        <img :src="item.img" alt="" style="width:68px;height:68px;display:block;">
                    </div>
                </div>
           </div>
       </div>
       <div class="leave-message">
           <span @click="messageAlert">Leave Message</span>
       </div>
       <div class="message-alert" v-show="isAlert">
           <div class="alert-container">
                <div class="alert-title">
                    <span>Leave Message</span>
                    <span @click="messageAlert"><i class="el-icon-close"></i></span>
                </div>
                <div class="alert-content">
                    <div class="leaves">
                        <textarea placeholder="Leave your message in English or your native language,1000 characters left." maxlength="1000" v-model="desc" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"></textarea>
                    </div>
                    <div class="upload">
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <el-upload
                            action="https://pc.bm.cn/restapi/suggestions/upload?action=uploadimage"
                            list-type="picture-card" :before-upload="beforeAvatarUpload" :http-request="(a)=>{handleHttpRequest(a) }"
                            :on-remove="handleRemove" :multiple="true" :limit="3" :on-exceed="alertUser" ref="upload">
                            <i class="icon-mn_shangchuantupian iconfont"></i>
                        </el-upload>
                    </div>
                    <div class="alert-btn">
                        <span @click="messageAlert">Cancle</span>
                        <span @click="addMessage">Submit</span>
                    </div>
                </div>
           </div>
       </div>
    </div>
</template>
<script>
import api from '@/api'
export default {
    data(){
        return{
            isAlert:false,
            remnant: 1000,
            desc:"",
            dialogImageUrl: '',
            dialogVisible: false,
            order_id:"",
            user_id:"",
            imgs:[],
            messageList:[]
        }
    },
    created() {
        this.getRouteData()
        this.message()
    },
    methods:{
        formatDate(now) { //时间戳转换
            var now=new Date(now*1000);
            var year=now.getFullYear(); 
            var m=now.getMonth()+1; 
            var date=now.getDate(); 
            var hour=now.getHours(); 
            var minute=now.getMinutes(); 
            return year+"."+m+"."+date+"  "+hour
        }, 
        getRouteData(){
            if (localStorage.getItem("userdata")) {
                let userdata=JSON.parse(localStorage.getItem("userdata"))
                this.user_id=userdata.user_id
            }else{
                router.replace({ name: 'login', params: { islogin:"signin" }})
            }
            if (localStorage.getItem("order_id")) {
                let order_id=JSON.parse(localStorage.getItem("order_id"))
                this.order_id=order_id
            }
            if (this.$route.params.itemData) {
                this.order_id=this.$route.params.itemData.order_id
                localStorage.setItem("order_id",this.order_id)
            }
        },
        message(){//获取留言列表
            let params = {
                order_id:this.order_id,
            }
            this.axios.post(api.message, params)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        data.forEach(item => {
                            item.add_time=this.formatDate(item.add_time*1)
                            item.reply_time=this.formatDate(item.reply_time*1)
                        });
                        // data[0].admin_id=2
                        this.messageList=data
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        addMessage(){//添加留言
            let params = {
                order_id:this.order_id,
                imgs:this.imgs,
                content:this.desc
            }
            this.axios.post(api.addMessage, params)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.isAlert = !this.isAlert;
                        this.message()
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        messageAlert(){
            this.isAlert = !this.isAlert;
            this.$refs.upload.clearFiles();
            this.desc=""
        },
        handleHttpRequest(a){
            var formdata=new FormData()
            formdata.append("upfile",a.file)
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            this.axios.post(api.uploadPic,formdata,config)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        this.imgs.push(data.url)
                    }
                })
        },
        beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
            const isJPG = true;
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                // this.$message.error('上传图片大小不能超过 2MB!');
                this.$alert('Upload image size cannot exceed 2MB!', 'Tips', {
                    confirmButtonText: 'OK'
                });
            }
            return isJPG && isLt2M;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        alertUser(files, fileList){
            this.$alert('No more than 3 pictures, please', 'warning', {
                confirmButtonText: 'OK'
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .message{
        text-align: left;
        background: #FAFAFA;
    }
    .message-title{
           font-size: 18px;
           font-weight: bold;
           background: #FAFAFA;
        }
    .message-container{
        background-color: #fff;
        border-radius: 4px;
        padding-top: 1px;
        .message-md{
            border-bottom: 1px solid #DEDEDE;
            .own{
                font-size: 14px;
                font-weight: bold; 
                padding-bottom: 10px;
                margin: 12px 12px 0 12px;
                border-bottom: 1px solid #DEDEDE;
                overflow: hidden;
                span{
                    float: right;
                    line-height: 16px;
                    margin-right: 10px;
                }
            }
            .message-img{
                font-size: 12px;
                margin: 12px 12px 0 12px;
                color: #666;
                margin-top: 14px;
                padding-bottom: 15px;
                div:first-child{
                    height: 32px;
                    line-height: 16px;
                    overflow: hidden;
                }
                div:last-child{
                    margin-top: 14px;
                    img{
                        width: 68px;
                        border-radius: 4px;
                        margin-right: 10px;
                    }
                }
            }
        }
        .message-top{
            .own{
                span{
                    float: left;
                    line-height: 16px;
                }
            }
        }
    }
    .leave-message{
        margin-top: 24px;
        color: #fff;
        span{
            width: 136px;
            height: 36px;
            line-height: 36px;
            border-radius: 2px;
            display: inline-block;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
            background: #FEB610;
        }
    }
    .message-alert{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        .alert-container{
            width: 574px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: #fff;
            .alert-title{
                background-color: #FAFAFA;
                height: 48px;
                line-height: 48px;
                span:first-child{
                    font-size: 14px;
                    font-weight: bold;
                    display: inline-block;
                    margin-left: 24px;
                }
                span:last-child{
                    float:right;
                    margin-right: 15px;
                    i{
                        font-weight: bold;
                        cursor: pointer;
                    }
                }
            }
        }
        .alert-content{
            .leaves{
                margin: 20px 24px; 
                textarea{
                    height: 102px;
                    width: 526px;
                    border: 1px solid #DEDEDE;
                    padding: 12px;
                    box-sizing: border-box;
                    resize:none;
                }
            }
            .upload{
                margin-left: 24px;
            }
            .upload /deep/ .el-upload-list__item,.upload /deep/ .el-upload--picture-card{
                width: 68px;
                height: 68px;
                margin-right: 8px;
            }
            .upload /deep/ .el-upload--picture-card{
                line-height: 68px;
            }
            .alert-btn{
                margin: 24px 0 32px 24px;
                span{
                    display: inline-block;
                    width: 80px;
                    height: 36px;
                    line-height: 36px;
                    cursor: pointer;
                    border-radius: 2px;
                    font-size: 12px;
                    color: #666;
                    text-align: center;
                    box-sizing: border-box;
                }
                span:first-child{
                    border: 1px solid #B6B6B6;
                    margin-right: 12px;
                }
                span:last-child{
                    background: #FEB610;
                    color: #fff;
                }
            }
        }
    }
</style>
