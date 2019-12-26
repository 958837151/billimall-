const mutations ={
    login(state, data){//登录获取token
        localStorage.token = data;
        state.token = data;
    },
    userdata(state, data){//获取用户登录数据
        localStorage.userdata = JSON.stringify(data);
        state.userdata = data;
    },
    logout(state){//退出登录
        localStorage.removeItem('token');
        localStorage.removeItem('userdata');
        state.token = null
        state.userdata = null
    },
    shopingcarnum(state,data){//加入购物车数量
        if(data){
            state.shopingcarnum =  1*data ;
        }else{
            state.shopingcarnum=0
        }
        localStorage.shopingcarnum = state.shopingcarnum;
    },
    title(state, data){
        state.title = data;
    }
}

export default mutations