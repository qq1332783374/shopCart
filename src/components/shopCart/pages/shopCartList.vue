<template>
    <div class="shopCartList">
       <div class="media" v-for="(item,index) in goods" :key="index">
            <div class="media-left">
                <img :src="item.imgUrl" class="media-object" style="width:95px">
            </div>
            <div class="media-body">
                <h4 class="media-heading">{{item.title}}</h4>
                <p>颜色分类:<strong>{{item.classification}}</strong></p>
                <p>
                    <span style="color:#999;">价格:</span> <span class="price">￥{{item.price*item.num}}</span>
                    <span class="pull-right">
                        <span style="color:#999;">数量</span>:{{item.num}}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
//mfooter

export default {
    name:'shopCartList',
    computed:{
        goods(){
            return this.$store.getters.addShopCart
        },
        getPrice(){

        }
    }
}
</script>

<style scoped>
.price {
    color: #eb5211;
    font-size: 14px;
}
.media{
    background: #fff;
    padding: 5px;
}
.media-left img{
    width: 95px;
}
.media-heading{
    font-size: 14px;
}
.num{
    width: 30px;
    text-align: center;
    border: 0;
}
.mbtn{
    border: 0;
    padding: 3px 12px;
    background: #fff;
}
</style>
