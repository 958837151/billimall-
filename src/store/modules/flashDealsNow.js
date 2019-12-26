import api from '@/api'
import axios from '../../http'
const flashDealsNowvuex={
    namespaced:true,
    state: {
        stateflashDealsNow:{}
    },
    getters: {
        stateflashDealsNow: state => state.stateflashDealsNow
    },
    mutations: {
        flashDealsNow(state,data){
            state.stateflashDealsNow=data
        }
    },
    actions: {
        getflashDealsNow(store){
            let params = {
                "start_time":""
            }
            return new Promise((resolve) => {
                axios.post(api.FlashList, params)
                    .then(response => {
                        if(response.data.code==200){
                            store.commit('flashDealsNow', response.data.data)
                            resolve()
                        }
                    })
            })
        },
    }
}
export default flashDealsNowvuex