<template>
<!-- 地址列表页面 -->
    <div class="adress-list">
        <div class="bcg_div" v-if="confirmOff"></div>
        <div class="address-title">My Shipping Address</div>
        <div class="address-list" v-show="isAdd">
            <div class="add-btn">
                <div @click="isAddAddress">Add a New Address</div>
            </div>
             <div class="address-container">
                <div class="address-content" v-for="(item,index) in addressList" :key="index" :class="{isDefault:item.is_default}" @click="passAddressData(item)">
                    <div class="user-name">
                        <span><i class="icon-yonghu1 iconfont"></i></span>
                        <span>{{item.consignee}}</span>
                        <span v-show="item.is_default">Default Address</span>
                    </div>
                    <div class="user-address">
                        <p>
                            <span><i class="icon-04 iconfont"></i></span>
                            <span>{{item.province}}</span>
                        </p>
                        <p>
                            <span class="span-left">{{item.city}}</span>
                        </p>
                        <p>
                             <span class="span-left">{{item.district}}</span>
                        </p>
                        <p>
                            <span class="span-left">{{item.twon}}</span>
                        </p>
                    </div>
                    <div class="user-phone">
                       <span><i class="icon-shouji1 iconfont"></i></span>
                        <span>{{item.mobile}}</span>
                        <span @click="getaddressDelete(item.address_id)">Delete</span>
                        <span @click="editAdress(item)">Edit</span>
                        <span @click="getsetAddress(item)" v-show="!item.is_default">Set as default</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="add-address" v-show="!isAdd">
            <div class="selete_div" v-if="confirmOff">
                <div v-for="(item) in areaList" :key="item.id">
                    <el-radio-group v-model="zipcode" @change="changeRadio">
                        <el-radio  :label="item.id">{{ item.province }},{{ item.city }},{{ item.region }}</el-radio>
                    </el-radio-group>
                </div>
                <div class="confirm_btn" @click="ConfirmOff">Confirm</div>
            </div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
                <el-form-item label="Contact Name" prop="name">
                    <!-- <el-input v-model="ruleForm.name" autocomplete="off" onkeyup="this.value=this.value.replace(/[^a-zA-Z]/g,'')"></el-input> -->
                    <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Phone Number" prop="phoneNumber">
                    <el-input v-model="ruleForm.phoneNumber"></el-input>
                </el-form-item>
                 <el-form-item label="Alternate Phone Number" prop="phoneNumberTwo">
                    <el-input v-model="ruleForm.phoneNumberTwo" placeholder="(Optional)"></el-input>
                </el-form-item>
                 <el-form-item label="Pincode" prop="pincode" class="pincode">
                    <el-input v-model="ruleForm.pincode" @change="pinCode"></el-input>
                </el-form-item>
                 <el-form-item label="Stree Address" prop="addressOne" >
                    <el-input v-model="ruleForm.addressOne" placeholder="Flat/House No./Floor/Building"></el-input>
                </el-form-item>
                 <el-form-item prop="addressTwo" >
                    <el-input v-model="ruleForm.addressTwo" placeholder="Colony/Street/Locality"></el-input>
                </el-form-item>
                 <!-- <el-form-item prop="addressThree" >
                    <el-input v-model="ruleForm.addressThree" placeholder="Landmark:Near/Behind(Optional)"></el-input>
                </el-form-item> -->
                 <el-form-item label="State" :required="true">
                    <el-input v-model="ruleForm.state" :disabled="true" :placeholder="state"></el-input>
                </el-form-item>
                 <el-form-item label="City" :required="true">
                    <el-input v-model="ruleForm.city" :disabled="true" :placeholder="city"></el-input>
                </el-form-item>
                 <el-form-item label="Country" prop="phoneNumber">
                    South Africa
                </el-form-item>
                <!-- <el-checkbox v-model="ruleForm.checkeds" style="margin-left:200px;">Set as default </el-checkbox> -->
                <el-form-item style="margin:16px 0 38px 0;">
                    <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
                    <el-button @click="resetForm('ruleForm')">Cancle</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import api from '@/api'
export default {
    name:"Myaddress",
    props: ["buyAdreassState"],
    data(){
        var userNameV = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('The name cannot be empty'));
            }else{
                callback();
            }
        };
        var phoneV = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('phone number cannot be empty'));
            }
            setTimeout(() => {
                var reg = /^\d{10,10}$/;
                if (reg.test(value)) {
                     callback();
                }else {
                    return callback(new Error("Please enter Numbers or hyphens '-'only."));
                }
            }, 1000);
        };
        var phoneVTwo = (rule, value, callback) => {
            if (value) {
                    setTimeout(() => {
                    var reg = /^\d{10,10}$/;
                    if (reg.test(value)) {
                        callback();
                    }else {
                        return callback(new Error("Please enter Numbers or hyphens '-'only."));
                    }
                }, 1000);
            }else{
                callback();
            }
        };
         var pincodeV = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('pincode cannot be empty'));
            }
            setTimeout(() => {
                if (!Number.isInteger(+value)) {
                    callback(new Error('Please enter a numeric value'));
                } else {
                    callback();
                }
            }, 1000);
        };
         var addressV = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('address cannot be empty'));
            }
            setTimeout(() => {
                 var reg = /^[a-zA-Z]+$/;
                 if(reg.test(value)){
                     callback();
                 }else{
                     return callback(new Error("Please enter English only"));
                 }
            }, 1000);
        };
        return{
            addressList:[
                // {username:"LUCKY DOG",address1:"Street1",address2:"Apartment，suite，unit，etc",address3:"2 rock ranch station，Califoornia，36255",address4:"United States",phone:"12345678",isdefault:true},
            ],
            ruleForm: {
                name: '',
                email: '',
                phoneNumber: '',
                phoneNumberTwo:'',
                pincode:'',
                addressOne:"",
                addressTwo:"",
                addressThree:"",
                state:"",
                city:"",
                checkeds: false
            },
            isAdd:true,
            rules: {
                name: [
                    { validator: userNameV, trigger: 'blur', required:true}
                ],
                email: [
                    { type: 'email', message: 'Please fill in the correct email address.', trigger: ['blur', 'change'] },
                    { required: true, message: 'Please enter your email address', trigger: 'blur' },
                ],
                phoneNumber: [
                    { validator: phoneV, trigger: 'blur', required:true, }
                ],
                phoneNumberTwo: [
                    { validator: phoneVTwo, trigger: 'blur'}
                ],
                pincode:[
                    { validator: pincodeV, required: true, trigger: 'blur'}
                ],
                // addressOne:[
                //     { validator: addressV, required: true, trigger: 'blur'}
                // ],
                // addressTwo:[
                //     { validator: addressV, required: true, trigger: 'blur'}
                // ],
                // addressThree:[
                //     { validator: addressV, required: true, trigger: 'blur'}
                // ],
                
            },
            zipcode: '1',
            areaList:[],
            confirmOff:false,//关闭单个区域弹窗
            state:"State is linked with Pincode",
            city:"City is linked with Pincode",
            isEditstate:false,//是否是编辑,
            address_id:"",
      };
    },
    watch: {
        buyAdreassState(val){
            val==1 ? this.isAdd=false : this.isAdd=true
            // if (this.isEditstate) {
            //     this.isAdd=false
            // }
        }
    },
    created() {
        this.buyAdreassState==1 ? this.isAdd=false : this.isAdd=true
        this.getaddressList()
    },
    methods:{
        passAddressData(item){//给父组件传值
            this.$emit("receiveAddressData",item)
        },
        getaddressDelete(address_id){//删除地址
            let params = {
                address_id:address_id*1
            }
            this.axios.post(api.addressDelete, params)
                .then(res => {
                    if (res.data.code==200) {
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getaddressList()
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        getsetAddress(item){//设置默认地址
            if (item) {
                let params = {
                    address_id:item.address_id
                }
                this.axios.post(api.setAddress, params)
                    .then(res => {
                        if (res.data.code==200) {
                            this.$message({
                                showClose: true,
                                message: res.data.message,
                                type: 'success'
                            });
                            this.getaddressList()
                        }
                        else if (res.data.code==401) {
                            this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                        }
                    })
            }
        },
        ConfirmOff(){
            this.confirmOff=false
        },
        changeRadio(value){//获取单个区域地址id
            this.zipcode=value
            this.areaList.forEach(item => {
                if (value==item.id) {
                    this.state=item.province
                    this.city=item.city
                }
            });
        },
        pinCode(value){//获取单个区域信息
            if (value) {
                this.getAddress(value)
            }
        },
        getAddress(val,isEdit){
            let params = {
                code_id:val
            }
            this.axios.post(api.getAddress, params)
                .then(res => {
                    if (res.data.code==200) {
                        this.areaList=res.data.data.List
                        this.areaList.length>0 ? this.confirmOff=true : this.confirmOff=false
                        if (isEdit) {
                            this.areaList.forEach(item => {
                                if (this.zipcode==item.id) {
                                    this.state=item.province
                                    this.city=item.city
                                }
                            });
                            this.confirmOff=false
                        }
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        getaddressSave(params){//增加地址或者修改地址
            this.isEditstate=false
            this.axios.post(api.addressSave, params)
                .then(res => {
                    if (res.data.code==200) {
                        this.$message({
                            showClose: true,
                            message: res.data.message,
                            type: 'success'
                        });
                        this.isAdd=true
                        this.getaddressList()
                        if (this.addressList.length==0) {
                            this.getsetAddress()
                        }
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        editAdress(item){//编辑地址信息
            this.isEditstate=true
            this.isAdd=false
            this.ruleForm.name=item.consignee
            this.ruleForm.email=item.email
            this.ruleForm.phoneNumber=item.mobile
            this.ruleForm.phoneNumberTwo=item.alternateMobile
            this.ruleForm.pincode=item.code
            this.ruleForm.addressOne=item.address
            this.ruleForm.addressTwo=item.twon
            this.state=item.province
            this.city=item.city
            item.is_default==0 ? this.ruleForm.checkeds=false : this.ruleForm.checkeds=true
            this.getAddress(item.code,true)
            this.address_id=item.address_id
            this.getaddressList()
        },
        getaddressList(){//用户地址列表
            let params = {
            }
            this.axios.post(api.addressList, params)
                .then(res => {
                    if (res.data.code==200) {
                        if (res.data.data.length==0) {
                            this.addressList=[]
                            this.$emit("addressListData",this.addressList)
                            return
                        }
                        res.data.data.List.forEach(item => {
                            item.is_default==0 ? item.is_default=false : item.is_default=true
                        });
                        this.addressList=res.data.data.List
                        this.$emit("addressListData",this.addressList)
                    }
                    else if (res.data.code==401) {
                        this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                    }
                })
        },
        isAddAddress(){
            this.isAdd = !this.isAdd
        },
        submitForm(formName) {//提交添加或编辑地址
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.isEditstate) {
                        var params = {
                            address_id:this.address_id,
                            consignee:this.ruleForm.name,
                            email:this.ruleForm.email,
                            mobile:this.ruleForm.phoneNumber,
                            alternateMobile:this.ruleForm.phoneNumberTwo,
                            zipcode:this.zipcode,
                            address:this.ruleForm.addressOne,
                            twon:this.ruleForm.addressTwo
                        }
                    }else{
                        var params = {
                            consignee:this.ruleForm.name,
                            email:this.ruleForm.email,
                            mobile:this.ruleForm.phoneNumber,
                            alternateMobile:this.ruleForm.phoneNumberTwo,
                            zipcode:this.zipcode,
                            address:this.ruleForm.addressOne,
                            twon:this.ruleForm.addressTwo
                        }
                    }
                    this.getaddressSave(params)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.isAdd = !this.isAdd
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="scss" scoped>
    .bcg_div{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 990;
        background-color: #666;
        opacity: .5;
    }
    .address-title{
        font-size: 18px;
        font-weight: bold;
        background: #FAFAFA;
        text-align: left;
        padding-bottom: 16px;
    }
    .add-btn{
        div{
            width: 230px;
            height: 36px;
            line-height: 36px;
            font-size: 18px;
            font-weight: bold;
            color: #fff;
            text-align: center;
            background: #FEB610;
            border-radius: 2px;
            cursor: pointer;
            margin: 24px 12px;
        }
    }
    .address-container{
        margin-left: 12px;
        margin-top: 24px;
        text-align: left;
        padding-bottom: 28px;
        .address-content{
            width: 872px;
            height: 173px;
            box-sizing: border-box;
            border: 1px solid #DEDEDE;
            margin-bottom: 2px;
            .user-name,.user-address,.user-phone{
                margin-left: 16px;
                margin-top: 15px;
                span{
                    margin-right: 12px;
                    font-size: 12px;
                }
            }
            .user-name{
                span:nth-child(2){
                    font-size: 16px;
                    font-weight: bold;
                }
                span:nth-child(3){
                    float: right;
                    color: #FF7805;
                }
            }
            .user-address{
                .span-left{
                    margin-left: 28px;
                }
            }
            .user-phone{
                span:nth-child(3),span:nth-child(4),span:nth-child(5){
                    float: right;
                    color: #1974A1;
                    cursor: pointer;
                }
                 span:nth-child(4),span:nth-child(5){
                     border-right: 1px solid #DEDEDE;
                     padding-right: 15px;
                 }
            }
        }
        .isDefault{
            background: #FBD2B0;
        }
    }
    .add-address{
        text-align: left;
        margin-top: 32px;
        position: relative;
        .selete_div{
            position: absolute;
            top: 245px;
            left: 200px;
            z-index: 999;
            min-width: 360px;
            height: 290px;
            overflow-y: auto;
            background-color: #fff;
            padding-left: 10px;
            div{
                height: 32px;
                line-height: 32px;
            }
            .confirm_btn{
                width: 180px;
                height: 36px;
                line-height: 36px;
                font-size: 18px;
                font-weight: bold;
                color: #fff;
                text-align: center;
                background: #FEB610;
                border-radius: 2px;
                cursor: pointer;
                margin: 24px 12px;
            }
        }
    }
    .add-address /deep/ .el-input{
        width: 300px;
        height: -1px;
        
    }
    .add-address /deep/ .el-input__inner{
        height: 28px;
        line-height: 28px;
    }
    .el-form-item{
        margin-bottom: 12px;
    }
     .add-address /deep/ .el-form-item__content{
        height: 32px;
    }
</style>
