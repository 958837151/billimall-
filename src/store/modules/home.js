import api from '@/api'
import axios from '../../http'
import router from '@/router'
const productDetails={
    namespaced:true,
    state: {
        statehomedata:{}
    },
    getters: {
        statehomedata: state => state.statehomedata
    },
    mutations: {
        homedata(state,data){
            state.statehomedata=data
        }
    },
    actions: {
        gethomedataaction(store){
            return new Promise((resolve) => {
                axios.post(api.index)
                    .then(response => {
                        if(response.data.code==200){
                            store.commit('homedata', response.data)
                            resolve(response.data)
                        }
                        // else if(response.data.code==401){
                        //     router.replace({ name: 'login', params: { islogin:"signin" }})
                        // }
                    })
            })
        },
    }
}
export default productDetails