<template>
    <div>
        <div class="chose_container" v-if="showPay">
        <div class="title">Please select a payment method</div>
        <div class="choses"> 
            <ul class="nav"> 
                <li class="content">
                    <div class="credit"  @click.prevent.stop="pay(5)">
                        <input type="radio" name="chose_pay" id="credit" value="1" class="selected" ref="radio5">
                        <label for="credit" class="selected">
                            Credit Card
                            <img src="@/assets/payimages/3.png">
                            <img src="@/assets/payimages/4.png">
                            <img src="@/assets/payimages/5.png">
                            <img src="@/assets/payimages/6.png">
                        </label>
                    </div>
                    <ul class="sub "  v-show="payradio==5">
                        <li>
                            <div>
                                <img src="@/assets/payimages/1.png">
                                <img src="@/assets/payimages/2.png">
                            </div>
                            <div style="text-align: left;">Please note that payments from cards not enrolled for 3D secure are subject to review. To avoid delays to your order, please use a 3D secure enabled card.</div>
                        </li>
                    </ul>
                </li>
            <!-- <el-radio-group v-model="payradio" @change="changeRadio"> -->

                <li class="content">
                    <div class="credit" @click.prevent.stop="pay(1)">
                        <input type="radio" name="chose_pay" id="payfast" value="0" class="selected" style="vertical-align: top;margin-top:4px;" checked="checked" ref="radio1">
                        <!-- <el-radio v-model="payradio" label="1"></el-radio> -->
                        <label for="payfast" class="selected" style="display: inline-block;width:90%;">
                            Pay Fast
                            <img src="@/assets/payimages/0.png">
                            <img src="@/assets/payimages/3.png">
                            <img src="@/assets/payimages/4.png">
                            <img src="@/assets/payimages/28.png">
                            <img src="@/assets/payimages/11.png">
                            <img src="@/assets/payimages/12.png">
                            <img src="@/assets/payimages/13.png">
                            <img src="@/assets/payimages/14.png">
                            <img src="@/assets/payimages/15.png">
                            <img src="@/assets/payimages/16.png">
                        </label>
                    </div>
                    <ul class="sub" v-show="payradio==1">
                        <li>
                            <div style="text-align: left;margin-bottom: 0;">PayFast is a payments processing service for South Africans and South African websites. We enable easy, secure and instant transfer of money between online buyers and sellers.</div>
                        </li>
                    </ul>
                </li>
                <!-- <li class="content" style="display:none;">
                    <div class="credit">
                        <input type="radio" name="chose_pay" id="miles" value="2" class="selected">
                        <label for="miles" class="selected">
                            Discovery Miles
                            <img src="@/assets/payimages/7.png">
                        </label>
                    </div>
                    <ul class="sub" style="padding-bottom: 12px;">
                        <li>
                            <div style="text-align: left;margin-bottom: 0;">Discovery Miles payments are processed via PayU Payment solutions, partners with Discovery Health.</div>
                        </li>
                    </ul>
                </li> -->
                <li class="content">
                    <div class="credit" @click.prevent.stop="pay(2)">
                        <input type="radio" name="chose_pay" id="masterpass" value="3" class="selected" ref="radio2">
                        <!-- <el-radio v-model="payradio" label="2"></el-radio> -->
                        <label for="masterpass" class="selected">
                            Masterpass
                            <img src="@/assets/payimages/8.png">
                        </label>
                    </div>
                    <ul class="sub" style="padding-bottom: 12px;" v-show="payradio==2">
                        <li>
                            <div style="text-align: left;margin-bottom: 0;">Masterpass is a simple, convenient, trusted digital wallet from Mastercard for faster, safer shopping at online merchants. A digital wallet makes online shopping safer and easy by storing payment information in one secure place. Masterpass works with credit, cheque and debit cards and secures the users data using industry leading technology.</div>
                        </li>
                    </ul>
                </li>
                <!-- <li class="content" style="display:none;">
                    <div class="credit">
                        <input type="radio" name="chose_pay" id="zapper" value="5" class="selected">
                        <label for="zapper" class="selected">
                            Zapper
                            <img src="@/assets/payimages/17.png">
                        </label>
                    </div>
                    <ul class="sub" style="padding-bottom: 12px;">
                        <li>
                            <div style="text-align: left;margin-bottom: 0;">Zapper is high performance QR Code scanner that allows you to make instant payments using your mobile phone. Requires the installation of the Zapper App on your phone.</div>
                        </li>
                    </ul>
                </li> -->
                <!-- <li class="content" style="display:none;">
                    <div class="credit">
                        <input type="radio" name="chose_pay" id="rcscard" value="6" class="selected">
                        <label for="rcscard" class="selected">
                                RCS Card
                            <img src="@/assets/payimages/18.png">
                        </label>
                    </div>
                    <ul class="sub" style="padding-bottom: 12px;">
                        <li>
                            <div style="text-align: left;margin-bottom: 0;">
                                <p>To pay with your RCS Card, you need to be a registered Self-Service customer.</p>
                                <p style="margin-top: 4px;">You can register via web or mobile app (Android or IOS).</p>
                                <p style="margin-top: 12px;">If you are already registered, you can generate a One Time PIN (OTP). Please dial *120*7007# or log onto the app and request an OTP.</p>
                            </div>
                            <div style="margin:0 auto;margin-top: 26px;border-bottom:1px solid #dedede;width: 88%;">
                                <input type="text" placeholder="One Time Pin " class="one-time-pin">
                            </div>
                            <div style="margin-top: 12px;">
                                <span style="font-weight: bold;">Note：</span> 
                                You have 3 attempts to submit a valid One Time PIN. The OTP will be submitted when you click "Pay Now".
                            </div>
                        </li>
                    </ul>
                </li> -->
                <!-- <li class="content" style="display:none;">
                    <div class="credit">
                        <input type="radio" name="chose_pay" id="mobicred" value="7" class="selected">
                        <label for="mobicred" class="selected">
                            Mobicred
                            <img src="@/assets/payimages/19.png">
                        </label>
                    </div>
                    <ul class="sub" style="padding-bottom: 12px;">
                        <li>
                            <div style="text-align: left;margin-bottom: 0;">Mobicred payments are processed via PayU Payment solutions, partners with Mobicred.</div>
                        </li>
                    </ul>
                </li> -->
                <li class="content">
                    <div class="credit" @click.prevent.stop="pay(4)">
                        <input type="radio" name="chose_pay" id="sCode" value="8" class="selected" style="vertical-align: top;margin-top:4px;" ref="radio4">
                        <!-- <el-radio v-model="payradio" label="3"></el-radio> -->
                        <label for="sCode" class="selected" style="display: inline-block;width:90%;">
                            SCode
                            <img src="@/assets/payimages/20.png">
                            <img src="@/assets/payimages/21.png">
                            <img src="@/assets/payimages/22.png">
                            <img src="@/assets/payimages/23.png">
                            <img src="@/assets/payimages/24.png">
                            <img src="@/assets/payimages/25.png">
                            <img src="@/assets/payimages/26.png">
                            <img src="@/assets/payimages/27.png">
                        </label>
                    </div>
                    <ul class="sub" style="padding-bottom: 12px;" v-show="payradio==4">
                        <li>
                            <div style="text-align: left;margin-bottom: 0;">Print out a barcode from our web site and pay for your order using cash, credit or debit card in store at the Post Office，Shoprite，Checkers Hyper,U Save. House & Home and OK Furniture.</div>
                        </li>
                    </ul>
                </li>
                <li class="content">
                    <div class="credit" @click.prevent.stop="pay(3)">
                        <input type="radio" name="chose_pay" id="ozow" value="4" class="selected" style="vertical-align: top;margin-top:4px;" ref="radio3">
                        <!-- <el-radio v-model="payradio" label="4"></el-radio> -->
                        <label for="ozow" class="selected" style="display: inline-block;width:90%;">
                            Ozow Instant EFT
                            <img src="@/assets/payimages/9.png">
                            <img src="@/assets/payimages/10.png">
                            <img src="@/assets/payimages/11.png">
                            <img src="@/assets/payimages/12.png">
                            <img src="@/assets/payimages/13.png">
                            <img src="@/assets/payimages/14.png">
                            <img src="@/assets/payimages/15.png">
                            <img src="@/assets/payimages/16.png">
                        </label>
                    </div>
                    <ul class="sub" style="padding-bottom: 12px;" v-show="payradio==3">
                        <li>
                            <div style="text-align: left;margin-bottom: 0;">Ozow is an Instant EFT payment option available to all customers who bank with Capitec,ABSA,Fist National Bank, Investec,Nedbank or Standard Bank. Ozow allows for electronic funds to be transferred inter-bank directly into the sellers bank account, in real time, using the current infrastructure of your bank's internet banking functionality.</div>
                        </li>
                    </ul>
                </li>
                <li class="content">
                    <div class="credit" @click.prevent.stop="pay(6)">
                        <input type="radio" name="chose_pay" id="eftOr" value="9" class="selected" ref="radio6">
                        <label for="eftOr" class="selected">
                            EFT or Bank Deposit
                        </label>
                    </div>
                    <ul class="sub" style="padding-bottom: 12px;" v-show="payradio==6">
                        <li>
                            <div style="text-align: left;margin-bottom: 0;">This payment method enables you to place an order and then transfer the money into our bank account. The banking details will be supplied on the next page. Please take note of the following:</div>
                            <div style="overflow: hidden;text-align: left;margin-top:12px;">
                                <div style="float: left;width: 3%;margin-right: 1%;">1.</div>
                                <div style="float: left;width: 96%;">Please do not deposit cash. Select to pay using SCode above instead if you would like to pay in cash, as cash deposits to our bank account may result in a surcharge and delays to your order. </div>
                            </div>
                            <div style="overflow: hidden;text-align: left;margin-top:12px;">
                                <div style="float: left;width: 3%;margin-right: 1%;">2.</div>
                                <div style="float: left;width: 96%;">We automatically cancel orders where we don’t receive payment within 2 business days. </div>
                            </div>
                            <div style="overflow: hidden;text-align: left;margin-top:12px;">
                                <div style="float: left;width: 3%;margin-right: 1%;">3.</div>
                                <div style="float: left;width: 96%;">It can take 2 working days for payment to reflect on our system and order processing will start once we receive the money. This will affect delivery time. </div>
                            </div>
                            <div style="overflow: hidden;text-align: left;margin-top:12px;">
                                <div style="float: left;width: 3%;margin-right: 1%;">4.</div>
                                <div style="float: left;width: 96%;">If you payment reflects on our statement after 12:00, it may only be processed the following working day. </div>
                            </div>
                            <div style="overflow: hidden;text-align: left;margin-top:12px;">
                                <div style="float: left;width: 3%;margin-right: 1%;">5.</div>
                                <div style="float: left;width: 96%;">Please quote your order number, provided on the next page,as a reference.</div>
                            </div>
                        </li>
                    </ul>
                </li>
                <!-- </el-radio-group> -->
            </ul>
        </div>

        <!-- 支付要提交的form表单 -->
        <form :action="action" method="POST" id="formAction" v-html="form_html" ref="formAction">
        <!-- 在此处填写将要提交的数据 -->
        </form>  
    </div>

    <!-- 跳转按钮 -->
    <div id="nextStepTrue" @click="selectRad()">PAY NOW</div>
    <!-- <div id="nextStepFalse" onclick="appCallback()">CONFIRM</div>  -->

    <!-- 线下支付方式弹出层 -->
    <div class="three" v-show="showUnderLine">
        <div class="titleYes">
            <div class="iconYes"></div>
            <p class="order">Order Received</p>
            <div class="title-content">
                <p>Order Number : <span id="dingdan">{{ m_payment_id }}</span></p>
                <p>Price : <span id="price">{{ amount }}</span> R</p>
            </div>
            <div class="title-content">
                <p>For South Africa Customers only!</p>
                <p>Account Name: Merchant 001</p>
                <p>Account Number : 62819287956</p>
                <p>First National Bank </p>
                <p>Branch Code 25065</p>
                <p>South Africa</p>
            </div>
            <div class="title-content">
                   <p>
                        Please make the money transfer to our Account in time.
                   </p>
                   <p>
                        Please Email the TT receipt to Payment@billimall.com after transfer.
                   </p>
                   <p>
                        You can also contact us with Whatapp: <span style="color: #006CE0;">008615364951979</span>.
                   </p>
                   <p>
                        Then we will confirm order and make delivery ASAP.
                   </p>
            </div>
            <div class="close_button">
                <div @click="appClose">Continue Shopping</div>
            </div>
        </div>
    </div>
    <div class="zhezao">
        <div>
            <img src="@/assets/payimages/loading.gif">
        </div>
        </div>
    </div>
</template>
<script>
    import api from '@/api'
    export default {
        name:"pay",
        props: ["orderData"],
        data(){
            return{
                action:"",//对应支付地址
                payradio:1,//单选值,
                form_html:"",
                checked:1,
                payData:{},
                order_id:1,
                order_sn:1,
                showPay:null,
                showUnderLine:false,
                m_payment_id:"",
                amount:""
            }
        },
        // watch: {
        //     orderData(val){
        //         console.log(val,888);
        //     }
        // },
        created() {
            this.getselectPay()
        },
        methods:{
            selectRad(){//paynow
                if (this.action=="") {
                    this.showPay=false
                    this.showUnderLine=true
                    this.m_payment_id=this.payData.eft.m_payment_id
                    this.amount=this.payData.eft.amount
                    return
                }
                this.$refs.formAction.submit()
            },
            appClose(){//返回首页
                this.$router.push({ name: 'home', params: {  }})
            },
            changeRadio(value){//获取单选
                console.log(value);
            },
            getselectPay(){//支付
                let params = {
                    // order_id:839,
                    // order_sn:201908301317517326
                    order_id:this.orderData.order.order_id,
                    order_sn:this.orderData.order.order_sn
                }
                this.axios.post(api.selectPay, params)
                    .then(res => {
                        if (res.data.code==200) {
                            this.payData=res.data.data
                            this.showPay=true
                            // this.payData.eft.merchant_id="10014890"
                            // this.payData.eft.merchant_key="21eywt91bgrtc"
                            // this.payData.eft.return_url="http://192.168.3.75:8080/yesback"
                            // this.payData.eft.return_url="http://www_test.billimall.com/yesback"
                            // this.payData.eft.return_url="https://www.billimall.com/yesback"
                            this.payData.eft.return_url="https://www.billimall.com/yesback"
                            this.payData.eft.cancel_url="https://www.billimall.com/noback"
                            let eft=this.payData.eft
                            let html = `
                                            <input type="hidden" name="merchant_id" value="${eft.merchant_id}">
                                            <input type="hidden" name="merchant_key" value="${eft.merchant_key}">
                                            <input type="hidden" name="return_url" value="${eft.return_url}">
                                            <input type="hidden" name="cancel_url" value="${eft.cancel_url}">
                                            <input type="hidden" name="notify_url" value="${eft.notify_url}">
                                            <input type="hidden" name="m_payment_id" value="${eft.m_payment_id}">
                                            <input type="hidden" name="amount" value="${eft.amount}">
                                            <input type="hidden" name="item_name" value="${eft.item_name}">
                                        `
                            this.form_html=html
                            // this.$refs.radio1.checked=true
                            this.action="https://www.payfast.co.za/eng/process"
                            // this.action="https://sandbox.payfast.co.za/eng/process"//测试环境
                            localStorage.setItem("order_id",this.orderData.order.order_id)
                        }
                        else if (res.data.code==401) {
                            this.$router.replace({ name: 'login', params: { islogin:"signin" }})
                        }
                    })
            },
            pay(type){
                this.payradio=type
                // this.payData.eft.merchant_id="10014890"
                // this.payData.eft.merchant_key="21eywt91bgrtc"
                this.payData.eft.return_url="https://www.billimall.com/yesback"
                this.payData.eft.cancel_url="https://www.billimall.com/noback"
                let eft=this.payData.eft//payfast
                let ozow=this.payData.ozow//ozow
                let cardit=this.payData.cardit//前海
                let secureCode="ldDZf00668440xVVZh4tjn88dXbd8fFtdp48V62HT2P8N06F6d4Zf40NbD2n222z"
                let signValue="191457"+"19145703"+ozow.NotifyUrl+cardit.order_sn+"ZAR"+cardit.total_amount+cardit.consignee+cardit.consignee+cardit.email+secureCode//1.前海测试环境中网站订单号只能支付1次，不管是否付款成功，生产环境中不存在该限制2.如果交易金额为0，不需要发送至钱海支付系统3.如果网站没有billing信息，可用shipping信息代替
                this.$refs.radio1.checked=false
                this.$refs.radio2.checked=false
                this.$refs.radio3.checked=false
                this.$refs.radio4.checked=false
                this.$refs.radio5.checked=false
                this.$refs.radio6.checked=false
                if (type==1) {//payfast支付  
                    let html = `
                                    <input type="hidden" name="merchant_id" value="${eft.merchant_id}">
                                    <input type="hidden" name="merchant_key" value="${eft.merchant_key}">
                                    <input type="hidden" name="return_url" value="${eft.return_url}">
                                    <input type="hidden" name="cancel_url" value="${eft.cancel_url}">
                                    <input type="hidden" name="notify_url" value="${eft.notify_url}">
                                    <input type="hidden" name="m_payment_id" value="${eft.m_payment_id}">
                                    <input type="hidden" name="amount" value="${eft.amount}">
                                    <input type="hidden" name="item_name" value="${eft.item_name}">
                                `
                    this.form_html=html
                    this.$refs.radio1.checked=true
                    this.action="https://www.payfast.co.za/eng/process"
                    // this.action="https://sandbox.payfast.co.za/eng/process"//测试环境
                }else if (type==2) {//masterpass支付
                    let html = `
                                    <input type="hidden" name="merchant_id" value="${eft.merchant_id}">
                                    <input type="hidden" name="merchant_key" value="${eft.merchant_key}">
                                    <input type="hidden" name="return_url" value="${eft.return_url}">
                                    <input type="hidden" name="cancel_url" value="${eft.cancel_url}">
                                    <input type="hidden" name="notify_url" value="${eft.notify_url}">
                                    <input type="hidden" name="m_payment_id" value="${eft.m_payment_id}">
                                    <input type="hidden" name="amount" value="${eft.amount}">
                                    <input type="hidden" name="item_name" value="${eft.item_name}">
                                    <input type="hidden" name="payment_method" value="mp">
                                `
                    this.form_html=html
                    this.$refs.radio2.checked=true
                    this.action="https://www.payfast.co.za/eng/process"
                    // this.action="https://sandbox.payfast.co.za/eng/process"//测试环境
                }else if (type==3) {//ozow支付
                    let html = `
                                    <input type="hidden" name="SiteCode" value="${ozow.SiteCode}">
                                    <input type="hidden" name="CountryCode" value="${ozow.CountryCode}">
                                    <input type="hidden" name="CurrencyCode" value="${ozow.CurrencyCode}">
                                    <input type="hidden" name="Amount" value="${ozow.Amount}">
                                    <input type="hidden" name="TransactionReference" value="${ozow.TransactionReference}">
                                    <input type="hidden" name="BankReference" value="${ozow.BankReference}">
                                    <input type="hidden" name="Optional1" value="${ozow.Optional1}">
                                    <input type="hidden" name="SuccessUrl" value="${ozow.SuccessUrl}">
                                    <input type="hidden" name="NotifyUrl" value="${ozow.NotifyUrl}">
                                    <input type="hidden" name="IsTest" value="${ozow.IsTest}">
                                    <input type="hidden" name="HashCheck" value="${ozow.HashCheck}">
                                `
                    this.form_html=html
                    this.$refs.radio3.checked=true
                    this.action="https://pay.ozow.com"
                }else if (type==4) {//scode支付
                    let html = `
                                    <input type="hidden" name="merchant_id" value="${eft.merchant_id}">
                                    <input type="hidden" name="merchant_key" value="${eft.merchant_key}">
                                    <input type="hidden" name="return_url" value="${eft.return_url}">
                                    <input type="hidden" name="cancel_url" value="${eft.cancel_url}">
                                    <input type="hidden" name="notify_url" value="${eft.notify_url}">
                                    <input type="hidden" name="m_payment_id" value="${eft.m_payment_id}">
                                    <input type="hidden" name="amount" value="${eft.amount}">
                                    <input type="hidden" name="item_name" value="${eft.item_name}">
                                    <input type="hidden" name="payment_method" value="sc">
                                `
                    this.form_html=html
                    this.$refs.radio4.checked=true
                    this.action="https://www.payfast.co.za/eng/process"
                    // this.action="https://sandbox.payfast.co.za/eng/process"//测试环境
                }else if (type==5) {//前海支付
                    let html = `
                                    <input	type="hidden"	name="account" value="191457" />
                                    <input	type="hidden"	name="terminal" value="19145703" />
                                    <input	type="hidden"	name="signValue" value="${cardit.singValue}" />
                                    <input	type="hidden"	name="backUrl" value="${ozow.NotifyUrl}" />
                                    <input	type="hidden"	name="methods" value="Credit Card" />
                                    <input	type="hidden"	name="pages" value="0" />
                                    <input	type="hidden"	name="order_number" value="${cardit.order_sn}" />
                                    <input	type="hidden"	name="order_currency" value="ZAR" />
                                    <input	type="hidden"	name="order_amount" value="${cardit.total_amount}" /> 
                                    <input	type="hidden"	name="billing_firstName" value="${cardit.consignee}" />
                                    <input	type="hidden"	name="billing_lastName" value="${cardit.consignee}" />
                                    <input	type="hidden"	name="billing_email" value="${cardit.email}" />
                                    <input	type="hidden"	name="billing_country" value="ZA" />
                                `
                    this.form_html=html
                    this.$refs.radio5.checked=true
                    this.action="https://secure.oceanpayment.com/gateway/service/pay"//生产环境
                    // this.action="https://secure.oceanpayment.com/gateway/service/test"//测试环境
                }else if (type==6) {//线下支付
                    let html = ``
                    this.form_html=html
                    this.action=""
                    this.$refs.radio6.checked=true
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
.chose_container{
            padding: 0 12px;
            box-sizing: border-box;
            color: #333;
            font-size: 14px;
            background: #fff;
            padding-bottom: 70px;
            /* display: none; */
        }
        .title{
            padding-top: 14px;
            padding-bottom: 12px;
            font-size: 18px;
            font-weight: bold;
            border-bottom: 1px solid #DEDEDE;
        }
        .nav .content{
            border-bottom: 1px solid #DEDEDE;
            text-align: left;
        }
        .credit{
            font-size: 16px;
            padding: 12px 0;
            display: flex;
            padding-left: 10px;
            cursor: pointer;
        }
        .credit img{
            height: 20px;
            vertical-align: middle;
        }
        .sub{
            font-size: 14px;
            line-height: 18px;
            padding-bottom: 20px;
            padding-left: 32px;
            // display: none;
        }
        .sub div:first-child{
            text-align: center;
            margin-bottom: 12px;
        }
        .sub img{
            height: 38px;
            margin-right: 24px;
        }
        .selected img{
            vertical-align: middle;
            line-height: 10px;
        }
        /* 单选按钮样式 */
        .choses div input{
            margin-right: 8px;
            width: 14px;
            height: 14px;
            appearance: none;
            position: relative;
            vertical-align: middle;
        }
        .choses div input:checked:before{
            content: '';
            width: 17px;
            height: 17px;
            border: 1px solid #FDD818;
            display: inline-block;
            border-radius: 50%;
            position: absolute;
            left: -2px;
            top: -2px;
            box-sizing: border-box;
            background: #fff;
        }
        .choses div input:checked:after{
            content: '';
            width: 9px;
            height:9px;
            background: #FDD818;
            border-top: transparent;
            border-right: transparent;
            text-align: center;
            display: block;
            position: absolute;
            top: 2px;
            left:2px;
            border-radius: 50%;
        }
        .choses div .one-time-pin{
            border: none;
            outline: none;
            font-size:16px;
            width: 80%;
            margin-bottom: 6px;
        }
        #nextStepTrue,#nextStepFalse{
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
            height: 48px;
            line-height: 48px;
            font-size: 18px;
            font-weight: bold;
            background: #FFD923;
            display: none;
        }
        #nextStepTrue{
            display: block;
        }
        .three{
            margin-top: 26px;
            padding-top: 26px;
            background-color: #fff;
            // display: none;
        }
        .iconYes{
            position: relative;
        }
        .iconYes:before{
            content: '';
            width: 50px;
            height: 50px;
            border: 1px solid #B7CB34;
            background:#B7CB34;
            display: inline-block;
            border-radius: 50%;
            vertical-align: middle;
        }
        .iconYes:after{
            content: '';
            width: 26px;
            height:13px;
            border: 5px solid white;
            border-top: transparent;
            border-right: transparent;
            text-align: center;
            display: block;
            position: absolute;
            top: 12px;
            left:9px;
            transform: rotate(-45deg);
        }
        .titleYes .order{
            text-align: center;
            font-weight: 500;
            font-size: 14px;
            margin-top: 16px;
        }
        .titleYes .iconYes{
            width: 52px;
            margin: 0 auto;
            
        }
        .title-content{
            width: 90%;
            margin: 0 auto;
            padding-left: 5%;
            padding-top: 10px;
            padding-bottom: 10px;
            margin-top: 20px;
            border: 1px solid #ededed;
            line-height: 20px;
            border-radius: 5px;
        }
        .close_button div{
            height: 48px;
            text-align: center;
            background-color: #FFD843;
            line-height: 48px;
            color: #000;
            position: fixed;
            bottom: 0;
            width: 100%;
            font-weight: bold;
            border: none;
            font-size: 18px;
        }
        .zhezao{
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: rgba(251,251,251,.9);
            display: none;
        }
        .zhezao div{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 30%;
            transform: translate(-50%,-50%);
        }
        .zhezao div img{
            width: 100%;
            border: none;
            /* border-radius: 50%; */
        }
        .credit /deep/ .el-radio__label{
            display: none;
        }
</style>