<template>
    <div class="editmemberprofile">
        <HeaderHtml></HeaderHtml>
        <div>
            <Search id="searchBar" :fixedMsg="searchBarFixed"></Search>
        </div>
        <div class="content" v-show="editstatus">
            <h3>Edit Member Profile</h3>
            <div class="form">
                <el-form ref="form" :model="form">
                    <el-form-item label="Name" class="list">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="Gender" class="list">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="Male"></el-radio>
                            <el-radio label="Female"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Email Address" class="list">
                        <span style="margin-right: 5px;">15052213365@163.com</span>
                        (<span style="color:#FF3308;cursor: pointer;">Email address unconfirmed,</span><span style="color:#1974A1;cursor: pointer;"> Click here to confirm </span>or<span style="color:#1974A1;cursor: pointer;"> Cange email address</span>)
                    </el-form-item>
                    <el-form-item label="Contact Address" class="address">
                        <el-form ref="form" :model="form" class="addressform">
                            <el-form-item label="Street Address" class="addresslist">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="City" class="addresslist">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Province/State/County" class="addresslist">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Country" class="addresslist">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Pincode" class="addresslist">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-form-item>
                    <el-form-item label="Tel" class="list">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-button class="btn" @click="editsubmit">Submit</el-button>
                </el-form>
            </div>
        </div>
        <div class="content" v-show="!editstatus">
            <h3>Edit Member Profile</h3>
            <hr style="width:1200px;background:#DEDEDE;border:1px solid rgba(222,222,222,1);margin:0 auto;margin-top: 24px;">
            <div class="success"><img src="../assets/images/editmemberprofilegou.png" alt=""><span>You have successfully submitted your Member Profile！</span></div>
        </div>
    </div>
</template>
<script>
import HeaderHtml from '@/components/common/headerhtml'
import Search from '@/components/common/search'

export default {
    name:'editmemberprofile',
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
            form: {
                name: '',
            },
            editstatus:true
        }
    },
    methods:{
        editsubmit(){
            this.editstatus=!this.editstatus
        }
    }
}
</script>
<style lang="scss" scoped>
.editmemberprofile{
    .content{
        margin: 0 auto;
        width:1440px;
        font-size:14px;
        font-family:HelveticaNeue;
        color:rgba(51,51,51,1);
        line-height:16px;
        h3{
            text-align: left;
            width:180px;
            height:20px;
            font-size:18px;
            font-family:Helvetica;
            color:rgba(51,51,51,1);
            line-height:20px;
            margin: 24px 0 0 123px;
        }
        .success{
            text-align: left;
            height: 36px;
            line-height: 36px;
            display: flex;
            align-items: center;
            padding-left: 120px;
            margin-top: 24px;
            img{
                display: inline-block;
                margin-right: 13px;
            }
            span{
                display: inline-block;
                line-height: 36px;
            }
        }
        .form{
            width:1200px;
            height:510px;
            background:rgba(255,255,255,1);
            border:1px solid rgba(222,222,222,1);
            margin: 24px auto;
            .list{
                height: 28px;
                line-height: 28px;
                margin-bottom: 12px;
                &:nth-child(1){
                    margin-top: 52px;
                }
                label{
                    width: 206px;
                }
            }
            .btn{
                width:80px;
                height:32px;
                line-height: 32px;
                background:rgba(254,182,16,1);
                border-radius:2px;
                border:1px solid rgba(254,182,16,1);
                position: relative;
                color: #fff;
            }
        }
    }
}
</style>
<style>
.editmemberprofile .el-input__inner,.editmemberprofile .list .el-input{
    width: 300px;
    height: 28px;
    line-height: 28px;
} 
.editmemberprofile .address{
    margin-left: 82px;
} 
.editmemberprofile .addressform{
    width: 600px;
    margin-left: 157px;
    margin-top: 6px;
} 
.editmemberprofile .el-form-item .addresslist{
    width: 300px;
    height: 28px;
    line-height: 28px;
    margin-bottom: 12px;
} 
.editmemberprofile .list .el-form-item__label{
    width: 206px;
    height: 28px;
    line-height: 28px;
    text-align: right;
    margin-right: 32px;
}
.editmemberprofile .addresslist .el-form-item__label{
    width: 170px;
    height: 28px;
    line-height: 28px;
    text-align: left;
} 
.editmemberprofile .list .el-form-item__content{
    height: 28px;
    line-height: 28px;
    margin-left: 206px;
    text-align: left;
} 
.editmemberprofile .addresslist .el-form-item__content{
    height: 28px;
    line-height: 28px;
    margin-left: 170px;
    text-align: left;
}  
.editmemberprofile .form .btn span{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>