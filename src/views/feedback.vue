<template>
    <div class="feedback">
        <HeaderHtml></HeaderHtml>
        <div>
            <Search id="searchBar" :fixedMsg="searchBarFixed"></Search>
        </div>
        <div class="content">
            <Crumbs :list='list'></Crumbs>
            <div class="orderid"><span>Order ID</span><span>{{ order_id }}</span></div>
            <div class="shoplist">
                <ul>
                    <li v-for="(item, index) in goodslist" :key="index">
                        <img :src="item.imgUrl" alt="" class="shopimg">
                        <div class="tit">{{ item.goods_name }}</div>
                        <div class="specifications">
                            <!-- <div class="color">Color：<span>Black</span><img src="../assets/images/ping.png" alt=""></div>
                            <div class="size">Size：<span>S</span></div>
                            <div class="size">ZAR 26.35 <span>X1</span></div> -->
                            <div class="color">{{ item.spec_key_name }}</div>
                        </div>
                        <el-rate v-model="item.rate" class="rate"></el-rate>
                        <el-input type="textarea" :rows="3" placeholder="Leave your feedback in English or your native language 1,000 characters left" v-model="item.text"></el-input>
                        <el-upload
                            action="https://pc.bm.cn/restapi/suggestions/upload?action=uploadimage"
                            list-type="picture-card" :file-list="item.listImg" :http-request="(a)=>{handleHttpRequest(a,item) }" :before-upload="beforeAvatarUpload"
                            :on-remove="handleRemove" :multiple="true" :limit="3" :on-exceed="alertUser" name="upfile" class="upphoto">
                            <i class="icon-mn_shangchuantupian iconfont"></i>
                        </el-upload>
                    </li>
                </ul>
            </div>
            <el-button class="btn" @click="postaddCommont">Submit</el-button>
        </div>
    </div>
</template>
<script>
import api from '@/api'
import HeaderHtml from '@/components/common/headerhtml'
import Search from '@/components/common/search'
import Crumbs from '@/components/common/crumbs'

export default {
    name:'feedback',
    components: {
        HeaderHtml,
        Search,
        Crumbs
    },
    data(){
        return{
            searchBarFixed:{
                isfixed:false,
                isshow:false
            },
            list:['My BilliMall','Order List','Order Detail','Feedback'],
            rate:2,
            textarea:'',
            listImg:[],
            goodslist:[],
            order_id:""
        }
    },
    watch: {
        goodslist:{
            handler:function(val,oldval){
                console.log(val)
                this.goodslist=val
            },
            deep:true//对象内部的属性监听，也叫深度监听
        },
    },
    created() {
        if (this.$route.params.itemData||localStorage.getItem("feedback")) {
            if (localStorage.getItem("feedback")) {
                this.itemData=JSON.parse(localStorage.getItem("feedback"))
            }else{
                let data=JSON.stringify(this.$route.params.itemData)
                localStorage.setItem("feedback",data)
                this.itemData=JSON.parse(localStorage.getItem("feedback"))
            }
            this.goodslist=this.itemData.goodslist
            this.order_id=this.itemData.order_id
            this.goodslist.forEach(item => {
                // item.text=""
                // item.rate=5
                item.listImg=[]
            });
        }
    },
    destroyed () {
        localStorage.removeItem("feedback")
    },
    methods:{
        postaddCommont(){
            if (this.goodslist.length>0) {
                var dataArr=[]
                this.goodslist.forEach(item => {
                    dataArr.push({goods_id:item.goods_id,order_id:item.order_id,rec_id:item.order_id,imgs:item.listImg,content:item.text,rate:item.rate})
                });
            }
            // var data= {data:[{goods_id:1,order_id:5,rec_id:43,imgs:['img1','img2'],content:"add",rate:5},{goods_id:1,order_id:5,rec_id:51,imgs:['img1','img2'],content:"add",rate:5}]}
            var data= {data:dataArr}
            this.axios.post(api.addCommont,data)
                .then(res => {
                    if (res.data.code==200) {
                        let data=res.data.data
                        this.$message({
                            showClose: true,
                            message: 'Successful picture deletion',
                            type: 'success'
                        });
                        setTimeout(() => {
                            this.$router.push({ name: 'myorders', params: {  }})
                        }, 1000);
                    }
                    else{
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'warning'
                        });
                    }
                })
        },
        handleHttpRequest(a,item){
            console.log(a,item,3);
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
                        item.listImg.push(data.url)
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
            this.$message({
                showClose: true,
                message: 'Successful picture deletion',
                type: 'success'
            });
        },
        alertUser(files, fileList){
            this.$alert('No more than 3 pictures, please', 'Tips', {
                confirmButtonText: 'OK'
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.feedback{
    .content{
        margin: 0 auto;
        width:1198px;
        text-align: left;
        padding-top: 28px;
        box-sizing: border-box;
        position: relative;
        .orderid{
            width: 100%;
            height: 48px;
            line-height: 48px;
            background:rgba(242,242,242,1);
            color:rgba(102,102,102,1);
            text-align: left;
            margin-top: 24px;
            span{
                margin-left: 23px;
                &:last-child{
                    margin-left: 12px;
                    color:rgba(51,51,51,1);
                }
            }
        }
        .shoplist{
            ul{
                li{
                    position: relative;
                    height: 317px;
                    border-bottom: 1px solid #DEDEDE;
                    padding-left: 99px;
                    margin-top: 16px;
                    box-sizing: border-box;
                    .shopimg{
                        width:62px;
                        height:62px;
                        background:rgba(216,216,216,1);
                        border-radius:2px;
                        position: absolute;
                        left: 23px;
                    }
                    .tit{
                        width:280px;
                        height:40px;
                        font-size:12px;
                        font-family:HelveticaNeue;
                        color:rgba(51,51,51,1);
                        line-height:20px;
                        -webkit-line-clamp:2;
                        display: -webkit-box; 
                        overflow:hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient:vertical;
                    }
                    .specifications{
                        height:20px;
                        font-size:12px;
                        font-family:HelveticaNeue-Medium;
                        font-weight:500;
                        color:rgba(102,102,102,1);
                        line-height:20px;
                        display: flex;
                        align-items: center;
                        .color{
                            display: flex;
                            align-items: center;
                            img{
                                height: 20px;
                                display: block;
                                margin-left: 5px;
                            }
                        }
                        .size{
                            margin-left: 30px;
                        }
                    }
                    .rate{
                        margin-top: 17px;
                    }
                    .el-textarea{
                        width:1084px;
                        height:81px;
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(222,222,222,1);
                        margin-top: 14px;
                    }
                }
            }
        }
    }
}
</style>
<style lang="scss">
.feedback{
    .content{
        .shoplist{
            ul{
                li{
                    .el-textarea{
                        .el-textarea__inner{
                            border: none;
                        }
                    }
                    .upphoto{
                        display: flex;                    
                        .el-upload{
                            margin-top: 16px;
                            width:68px;
                            height:68px;
                            background:rgba(250,250,250,1);
                            border-radius:2px;
                            border:1px solid rgba(222,222,222,1);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .el-upload-list{
                            img{
                                width:68px;
                                height:68px;
                            }
                            li{
                                width:68px;
                                height:68px;
                                margin: 16px 8px 8px 0;
                                .el-upload-list__item-actions{
                                    width:68px;
                                    height:68px;
                                    display: inline-block;
                                }
                            }
                        }
                    }
                }
            }
        }
        .btn{
            width:82px;
            height:28px;
            background:rgba(255,120,4,1);
            border-radius:2px;
            margin: 24px 0;
            color: #FFFFFF;
            padding: 0;
            position: absolute;
            right: 16px;
            span{
                line-height: 28px;
                height: 28px;
                display: block;
            }
        }
    }
}
</style>