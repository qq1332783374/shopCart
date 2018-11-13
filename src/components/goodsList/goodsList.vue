<template>
    <div class="goodsList">
        <!-- goodsList -->
        <div class="media" v-for="(item,index) in getGoods" :key="index">
            <div class="media-left">
                <img :src="item.img" class="media-object" style="width:100px">
            </div>
            <div class="media-body">
                <router-link :to="/goodsDetail/+item.id">
                    <h4 class="media-heading goodsTitle"><span>{{item.title}}</span></h4>
                </router-link>
                <p><span class="price">￥{{item.price}}</span> <del class="oldPrice">￥{{item.oldPrice}}</del></p>
                <p class="goodsInfo"><span>免运费</span> <span>{{item.pay}}人付款</span><span>{{item.region}}</span></p>
            </div>
        </div>
        <!-- footer -->
        <mfooter></mfooter>
    </div>
</template>

<script>
//mfooter
import mfooter from '../common/mfooter'
export default {
    name:'goodsList',
    components:{
        mfooter
    },
    methods:{
        getGoodsList(){  //vuex请求数据
            this.$store.dispatch('getGoodsLists')
        }
    },
    created() {
        this.getGoodsList()
    },
    computed:{
        getGoods(){
            return this.$store.getters.getGoodsLists
        }
    }
}
</script>

<style scoped>
.goodsList{
    color: #666;
    padding: 6px 6px 50px 6px;
}
.media{
    background: #fff;
    padding: 6px;
    border-bottom: 1px solid #ddd;
    margin: 0px;
    line-height: 2.2;
}
.goodsTitle{
    font-size: 14px;
    font-weight: bold;
    color: #666;
}
.price{
    color: #eb5211;
    font-size: 14px;
}
.oldPrice{
    font-size: 12px;
}
.goodsInfo{
    display: flex;
    color: #999;
    font-size: 12px;
}
.goodsInfo span{
    flex: 1;
    text-align: center;
}
</style>
