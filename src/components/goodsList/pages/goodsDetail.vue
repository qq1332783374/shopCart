<template>
    <div class="goodsDetail">
        <!-- 商品详情 -->
        <div class="thumbnail">
            <i class="iconfont icon-fanhui goback" @click="goBack"></i>
            <img :src="imgUrl" alt="通用的占位符缩略图">
            <div class="caption">
                <h4>￥<span>{{price}}</span> <span class="txt">预售价</span></h4>
                <p>专柜价<del>￥{{oldPrice}}</del></p>
                <p><strong>{{title}}</strong></p>
                <p class="info">
                    <span>免运费</span>
                    <span>已预订{{pay}}</span>
                    <span>{{region}}</span>
                </p>
            </div>
         </div>
         <!-- 商品详情 -->
        <!-- 商品选择 -->
        <div class="choose">
            <div class="group-warp">
                <ul class="list-group">
                    <li class="list-group-item" @click="show">
                        <span class="badge">></span>
                        <span style="color:#ccc;">选择</span>
                        <span>选择颜色分类</span>
                    </li>
                    <li class="list-group-item">
                        <span class="badge">></span>
                        <span style="color:#ccc;">参数</span>
                        <span>品牌 型号</span>
                    </li>
                </ul>
            </div>
            <transition name="el-zoom-in-bottom" >
                <div class="cover" v-show="idShow">
                    <div class="cover-bg" @click="close"></div>
                    <div class="chooseShop">
                        <div class="header">
                            <span class="close" @click="close">x</span>
                        </div>
                        <div class="clearfix"></div>
                        <div class="color-classification">
                            <div class="title">
                                颜色分类
                            </div>
                            <div class="content">
                                <a href="javascript:;" 
                                   v-for="(item,index) in classification"
                                   :key="index"
                                   :class="{active:item.isChecked}"
                                   @click="selectShop(index)"
                                >
                                    {{item.size}}
                                </a>
                            </div>
                        </div>
                        <hr>
                        <div class="buyNum">
                            <div class="title">
                                购买数量
                            </div>
                            <div class="content">
                                <button type="button" @click="subShopNum">-</button>
                                <input type="text" class="number" v-model="shopNum">
                                <button type="button" @click="addShopNum">+</button>
                            </div>
                        </div>
                        <hr>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </transition>
        </div>
        <!-- 商品选择 -->
        <!-- 底部导航 -->
        <div class="bottomBar">
            <div class="item">
                <div class="icon">
                    <a href="javascript:;" class="shop ">
                        <i class="iconfont icon-dianpu"></i><br>
                        <span>店铺</span>
                    </a>
                    <a href="javascript:;" class="service">
                        <i class="iconfont icon-buoumaotubiao10"></i><br>
                        <span>客服</span>
                    </a>
                    <a href="javascript:;" class="collection">
                        <i class="iconfont icon-shoucang"></i><br>
                        <span>收藏</span>
                    </a>
                </div>
            </div>
            <div class="item join" @click="joinShopCart">
                <a href="javascript:;" class="mbtn">
                    加入购物车
                </a>
            </div>
            <div class="item buy">
                <a href="javascript:;" class="mbtn">
                    立即购买
                </a>
            </div>
        </div>
        <!-- 底部导航 -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'goodsDetail',
    data(){
        return {
            imgUrl:'',
            title:'',
            price:0,
            oldPrice:0,
            shopNum:0,
            isSelect:false,
            classification:[],
            pay:0,
            region:'',
            idShow:false,
            tabIndex:-9999,
        }
    },
    methods:{
        goBack(){
            history.back(-1)
        },
        show(){
            this.idShow = !this.idShow
        },
        close(){
            this.idShow = !this.idShow
        },
        selectShop(index){  //选择商品
            for(var i=0;i<this.classification.length;i++){
                this.classification[i].isChecked = false
            }
            this.classification[index].isChecked = true
        },
        subShopNum(){  //数量--
            if(this.shopNum<=0){
                this.$message({
                    showClose: true,
                    message: '商品数量不能小于0',
                    type: 'warning'
                });
            }else{
                this.shopNum--
            }
        },
        addShopNum(){  //数量++
            this.shopNum++
        },
        joinShopCart(){  //加入购物车
            //选中当前分类
            for(var i=0;i<this.classification.length;i++){
                if(this.classification[i].isChecked){
                    this.isSelect = true
                    this.tabIndex = i
                    break
                }
            }
            //判断是否符合条件加入购物车
            if(!this.isSelect){
                this.$message({
                    showClose: true,
                    message: '请选择商品分类',
                    type: 'warning'
                });
            }else if(this.shopNum<=0){
                this.$message({
                    showClose: true,
                    message: '请选添加商品数量',
                    type: 'warning'
                });
            }else{
                var obj = {
                    id:this.$route.params.id,
                    imgUrl:this.imgUrl,
                    title:this.title,
                    price:this.price,
                    num:this.shopNum,
                    classification:this.classification[this.tabIndex].size
                }
                //提交到vuex
                this.$store.dispatch("addShopCart",obj)

                this.$confirm('成功添加商品，是否前去查看', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    this.$router.push('/shopCart')
                }).catch(() => {
                            
                });
                this.idShow = !this.idShow
            }
        }
    },
    created() {
        //获取商品详情页
        axios.get('/api/detailinfo.php',{
            params:{
                id:this.$route.params.id
            }
        })
            .then((res)=>{
                console.log(res)
                //图片
                this.imgUrl = res.data[0].img
                //标题
                this.title = res.data[0].title
                //价格
                this.price = res.data[0].price
                //oldPrice
                this.oldPrice = res.data[0].oldPrice
                //付款人数
                this.pay = res.data[0].pay
                //地区
                this.region = res.data[0].region
                //颜色分类
                var color = res.data[0].color.split(',')
                for(var i=0;i<color.length;i++){
                    var obj = {
                        size:color[i],
                        isChecked:false
                    }
                    this.classification.push(obj)
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    },
}
</script>

<style scoped>
.goodsDetail{
    padding-bottom: 50px;
}
.thumbnail{
    margin-bottom: 10px;
}
.goback{
    position: fixed;
    background: rgba(0,0,0,0.55);
    color: #fff;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    left: 10px;
    top: 10px;
}
.goodsDetails{
}
.txt{
    font-size: 12px;
}
.info{
    display: flex;
    text-align: center;
}
.info span{
    flex: 1;
}
.badge{
    background: #fff;
    color: #ccc;
}
.group-warp ul li{
    border-radius: 0;
    font-size: 12px;
}
.cover{
    
}
.chooseShop{
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 50px;
    left: 0;
    border: 1px solid #ddd;
    padding: 5px;
}
.title{
    padding-top: 5px;
    padding-bottom: 15px;
}
.color-classification .content a{
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 13px;
    margin: 0 8px 8px 0;
    color: #555;    
}
.color-classification .content a.active{
    border-color: #FF0036;
    background-color: #FF0036;
    color: #fff;    
}
.buyNum{
    height: 36px;
}
.buyNum .content{
    height: 36px;
    width: 100px;
    border-radius: 3px;
    float: right;    
}
.buyNum .title{
    float: left;
}
.buyNum button{
    border: none;
    outline: 0;
    line-height: 32px;
    height: 34px;
    width: 30px;
    font-size: 24px;
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
    float: left;
}
.number{
    line-height: 32px;
    height: 34px;
    width: 36px;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    border: 1px solid #f5f5f5;
    background-color: #f5f5f5;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    margin-left: 2px;
    margin-right: 2px;    
    float: left;
}
.cover-bg{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0,0,0,.5);    
}
.bottomBar{
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #fff;
    display: flex;
}
.bottomBar .item{
    flex: 1;
}
.icon{
    display: flex;
    line-height: 1.4;
    padding-top:2px; 
}
.icon a{
    flex: 1;
    
    font-size: 12px;
    color: #666;
}
.icon a i{
    font-size: 20px;
}
.mbtn{
    font-weight: 500    ;
    color: #fff;
}
.join{
    background: #FF9500;
}
.buy{
    background: #FF0036;
}
</style>
