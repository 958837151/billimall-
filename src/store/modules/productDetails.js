import api from '@/api'
import axios from '../../http'
const productDetails={
    namespaced:true,
    state: {
        stategoodsInfodata:{}
    },
    getters: {
        stategoodsInfodata: state => state.stategoodsInfodata
    },
    mutations: {
        goodsInfo(state,data){
            state.stategoodsInfodata=data
        }
    },
    actions: {
        getgoodsInfoaction(store){
            let params = {
                "goodsId":"10020"
            }
            return new Promise((resolve) => {
                axios.post(api.goodsInfo, params)
                    .then(response => {
                        if(response.data.code==200){
                            store.commit('goodsInfo', response.data.data)
                            resolve()
                        }
                    })
            })
        },
    }
}
export default productDetails