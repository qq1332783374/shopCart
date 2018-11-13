<template>
    <div class="shopCart">
        <goods></goods>
        <mfooter></mfooter>
    </div>
</template>

<script>
//mfooter
import mfooter from '../common/mfooter'
//商品
import goods from './pages/shopCartList'
export default {
    name:'shopCart',
    components:{
        mfooter,
        goods
    }
}
</script>

<style scoped>
.shopCart{
    padding-bottom: 50px;
}
</style>
