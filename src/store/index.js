import Vue from 'vue'
import Vuex from 'vuex'
//axios
import axios from 'axios'
Vue.use(Vuex)

const state = {
    getGoodsList:[], //商品列表
    shopCartGoods:[],  //购物车商品
}

const getters = {
    getGoodsLists(){
        return state.getGoodsList
    },
    addShopCart(){
        return state.shopCartGoods
    }
}

const actions = {
    getGoodsLists(ctx){  //接受指令发送请求，获取商品列表
        axios.get('/api/detail.php')
            .then((res)=>{
                ctx.commit('getGoodsLists',res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    },
    addShopCart(ctx,obj){
        ctx.commit("addShopCart",obj)
    }
}

const mutations = {
    getGoodsLists(state,data){
        state.getGoodsList = data
    },
    addShopCart(state,obj){
        var isHave = false 
        var index = -9999
        if(state.shopCartGoods.length>0){
            //排他
            for(var i=0;i<state.shopCartGoods.length;i++){
                if(state.shopCartGoods[i].id==obj.id && state.shopCartGoods[i].classification==obj.classification){
                    index = i
                    isHave = true
                    break
                }
            }
            //
            if(isHave){
                state.shopCartGoods[index].num += obj.num
            }else{
                state.shopCartGoods.push(obj)
            }
        }else{
            state.shopCartGoods.push(obj)
        }
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})