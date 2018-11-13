<template>
    <div class="footer">
        <div class="item">
            首页
        </div>
        <div class="item">
            <router-link to="/goodsList">
                商品
            </router-link>
        </div>
        <div class="item">
            <router-link to="/shopCart">
                购物车
            </router-link>
        </div>
        <div class="item">
            我的
        </div>
    </div>
</template>

<script>
export default {
    name:'mfooter'
}
</script>

<style scoped>
.footer{
    width: 100%;
    height: 50px;
    display: flex;
    text-align: center;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ddd;
    font-size: 14px;
    color: #666;
    background: #fefefe;
}
.footer .item{
    flex: 1;
}
</style>