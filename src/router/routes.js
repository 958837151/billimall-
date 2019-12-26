// 路由配置模块
import Home from '@/views/home'
import Productdetails from '@/views/productDetails'
import Login from '@/views/login'
import Phonesystem from '@/components/common/phonesystem'
import Flashdealsnow from '@/views/flashDealsNow'
import Highfashions from '@/views/highFashions'
import AllCategories from '@/views/allCategories'
import DirectSearch from '@/views/directSearch'
import PersonalCenter from '@/views/personalCenter'
    // PersonalCenter下的子路由
    import Mybillimall from "@/components/common/center/mybillimall"
    import Wishlist from "@/components/common/center/wishlist"
    import Mycoupons from "@/components/common/center/mycoupons"
    import Message from "@/components/common/center/message"
    import Account from "@/components/common/center/account"
    import Myaddress from "@/components/common/center/myaddress"
    import Myorders from "@/components/common/center/myorders"
import DownPage from '@/views/downPage'
// import Uploadphoto from '@/views/uploadphoto'
// import Editmemberprofile from '@/views/editmemberprofile'
import ConfirmEmail from '@/views/confirmEmail'
import ChangeEmail from '@/views/changeEmail'
import ChangeEmailtwo from '@/views/changeEmailtwo'
import Changepassword from '@/views/changepassword'
import Changepasswordtwo from '@/views/changepasswordtwo'
import PlaceOrder from '@/views/placeOrder'
import ShoppingCart from '@/views/shoppingCart'
import Feedback from '@/views/feedback'
import OrderDetails from '@/views/orderDetails'
import Yesback from '@/views/yesback'
import Noback from '@/views/noback'

const routes= [
    {path: '/',name: 'home',component: Home,meta: {requiresAuth: false,title: 'HOME-BilliMall'},keepAlive: true},//主页
    {path: '/phonesystem',name: 'phonesystem',component: Phonesystem},
    {path: '/productdetails/:goods_id',name: 'productdetails',component: Productdetails,meta: {requiresAuth: false}},//产品详情
    {path: '/login',name: 'login',component: Login,meta: {requiresAuth: false,title: '登录'}},//登录注册
    {path:'*',redirect:'/',meta: {requiresAuth: false}},
    {path:'/flashdealsnow',name:'flashdealsnow',component: Flashdealsnow,meta: {requiresAuth: false}},//首页活动 闪购
    {path:'/highfashion',name:'Highfashions',component: Highfashions,meta: {requiresAuth: false}},//导航分类右边
    {path:'/allcategories',name:'AllCategories',component: AllCategories,meta: {requiresAuth: false}},//首页所有类别
    {path:'/directSearch/:cat_id/:Title',name:'DirectSearch',component: DirectSearch,meta: {requiresAuth: false}},//搜索页面
    {path:'/personalCenter',name:'PersonalCenter',component: PersonalCenter,meta: {requiresAuth: true},//个人中心
        children:[
            { path: '/', redirect: 'mybillimall' },
            { name : "mybillimall", path : "mybillimall", component : Mybillimall},
            { name : "wishlist", path : "wishlist", component : Wishlist},
            { name : "mycoupons", path : "mycoupons", component : Mycoupons},
            { name : "message", path : "message", component : Message},
            { name : "account", path : "account", component : Account},
            { name : "myaddress", path : "myaddress", component : Myaddress},
            { name : "myorders", path : "myorders", component : Myorders}
        ]
    },
    {path:'/downPage',name:'DownPage',component: DownPage,meta: {requiresAuth: false}},//APP下载
    // {path:'/uploadphoto',name:'uploadphoto',component: Uploadphoto,meta: {requiresAuth: false}},
    // {path:'/editmemberprofile',name:'editmemberprofile',component: Editmemberprofile,meta: {requiresAuth: false}},
    {path:'/confirmEmail',name:'confirmEmail',component: ConfirmEmail,meta: {requiresAuth: true}},//确认邮箱
    {path:'/changeEmail',name:'changeEmail',component: ChangeEmail,meta: {requiresAuth: true}},//修改邮箱
    {path:'/changeEmailtwo',name:'changeEmailtwo',component: ChangeEmailtwo,meta: {requiresAuth: true}},//修改邮箱第二步
    {path:'/changepassword',name:'changepassword',component: Changepassword,meta: {requiresAuth: true}},//修改密码
    {path:'/changepasswordtwo',name:'changepasswordtwo',component: Changepasswordtwo,meta: {requiresAuth: true}},//修改密码第二步
    {path:'/placeOrder',name:'PlaceOrder',component: PlaceOrder,meta: {requiresAuth: true},},//下单
    {path:'/shoppingCart',name:'ShoppingCart',component: ShoppingCart,meta: {requiresAuth: true}},//购物车
    {path:'/feedback',name:'feedback',component: Feedback,meta: {requiresAuth: true}},//反馈
    {path:'/orderDetails',name:'OrderDetails',component: OrderDetails,meta: {requiresAuth: true}},//订单详情
    {path:'/yesback',name:'yesback',component: Yesback,meta: {requiresAuth: false}},//订单付款成功
    {path:'/noback',name:'noback',component: Noback,meta: {requiresAuth: false}},//订单付款失败
]

export default routes