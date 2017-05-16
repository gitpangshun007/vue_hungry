
<template>
  <div class="goods">
      <div class="menu_wrap" ref='menuWrap'>
      	<ul>
      		<li v-for='(item,index) in goods' class="menu_li" :class='{"current":currentIndex==index}' @click="clickMenu(index)" ref='menuList'>{{goods[index].name}}</li>
      	</ul>
      </div>
      <div class="foods_wrap" ref='foodWrap'>
      	<ul>
      		<li v-for='(item,index) in goods' class='food_li' ref='foodlist'>
      			<h2 class='food_item_name'>{{item.name}}</h2>
      			<ul>
      				<li v-for='(food,index) in item.foods' class='food_display' @click='selectFood(food,$event)'>
      					<div class='item_img fl'><img :src="food.icon" alt="" width="64" height="64"></div>
      				<div class="food_detail fl">
      					<h2>{{food.name}}</h2>
      					<div class="food_description">{{food.description}}</div>
      					<div class="food_sell">
      						<span class='sellCount'>月售{{food.sellCount}}份</span>
      						<span>好评率{{food.rating}}%</span>
      					</div>
      					<div class="food_price">
      						<span>￥{{food.price}}</span>
      						<span class="food_oldPrice">{{food.oldPrice}}</span>
      					</div>
                <div class='cartcontral_wrap'>
                  <Cartcontral :food="food"></Cartcontral>
                </div>
      				</div>
      				</li>
      			</ul>
      		</li>
      	</ul>
      </div>
      <Shopcart ref='Shopcart' :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selectfoods='selectfoods'></Shopcart>
      <Food :food='selectedFood' ref='food'></Food>
  </div>
  
</template>

<script>
import BScroll from 'better-scroll';
import Shopcart from '../Shopcart/Shopcart.vue'
import Cartcontral from '../Cartcontral/Cartcontral.vue'
import Food from '../Food/Food.vue'
const ERR_OK=0;
   export default{
   	name:"Goods",
    components:{
      'Shopcart':Shopcart,
      'Cartcontral':Cartcontral,
      'Food':Food
    },
    props:{
    	seller:{
    		type:Object
    	}
    },
    data(){
    	return {
    		goods:[],
        heightList:[],
        scrollY:0,
        selectedFood:{}
    	}
    },
    created(){
    	this.$http.get('./api/goods').then(response =>{
           response=response.body;
           if(response.errorno==ERR_OK){
             this.goods=response.data;
    /*监听从Cartcontral传来的add事件。*/
             this.$root.eventHub.$on('add',(target) =>{
              this._drop(target);
             })
             this.$nextTick(() => {
             	this._initScroll();
              this._getHeight();
             });
           }
    	},response =>{
    		console.log(response.status);
    	});
    },
    computed:{
      currentIndex(){
        for(let i=0;i<this.heightList.length;i++){
            let Height1=this.heightList[i];
            let Height2=this.heightList[i+1];
/*这里是大于等于*/
            if(!Height2 || (this.scrollY>=Height1 && this.scrollY<Height2)){
               return i;
            }
        }
        return 0;
      },
      selectfoods(){
        let foods=[];
        this.goods.forEach((good) => {
           good.foods.forEach((food) =>{
            if(food.count){
              foods.push(food);
            }
           });
        });
        return foods;
      }
    },
    methods:{
      _drop(target){
    /*调用Shopcart组件中的drop函数,并异步执行*/
        this.$nextTick(() => {
          this.$refs.Shopcart.drop(target);
        });
      },
    	_initScroll(){
       /* 这里用this.$refs提取DOM元素*/
             this.foodScroll= new BScroll(this.$refs.foodWrap, {
              click:true,
              probeType:3
            });
             this.foodScroll.on('scroll', (pos) => {
               this.scrollY=Math.abs(Math.floor(pos.y));
               //console.log(this.scrollY);
            });
             let menuScroll= new BScroll(this.$refs.menuWrap, {
              click:true
             });
    	},
      _getHeight(){
           let foodList=this.$refs.foodlist;
           let Height=0;
           this.heightList.push(Height);
           for(let i=0;i<foodList.length;i++){
              Height+=foodList[i].clientHeight;
              this.heightList.push(Height);
           }
      },
      clickMenu(index){
        let menuList=this.$refs.menuList
        let foodList=this.$refs.foodlist;
        let el=foodList[index];
        this.foodScroll.scrollToElement(el,300);
      },
      selectFood(food,event){
        if(!event._constructed){
          return ;
        }
        this.selectedFood=food;
        this.$refs.food.show();
        }
      }
    }
   
</script>
 
<style>
/*这里的绝对定位一定要设置*/
.goods{margin:0 auto;width:100%;display: flex;overflow: hidden;position: absolute;top: 191px;bottom: 46px;}
.menu_wrap{flex:0 0 80px;width: 80px;}
.foods_wrap{flex:1;overflow: hidden;height: 100%;}
.food_display{display: inline-block;width: 100%;position: relative;}
/*food详细信息的样式*/
.food_li{padding:0 18px 18px 18px;}
.food_item_name{background-color: #f3f5f7;margin-right: -18px;margin-left: -18px;padding:0 12px 0 12px;line-height: 26px;font-size: 12px;color:rgb(147,153,159);}
.item_img{margin-top:18px;}
.food_detail{margin-top:18px;margin-left: 10px;}
.food_detail h2{margin-top: 2px;font-size: 14px;color:rgb(7,17,27);}
.food_sell{margin-top:8px;font-size: 10px;color:rgb(147,153,159);}
.food_description{margin-top:8px;font-size: 10px;color:rgb(147,153,159);}
.food_price{padding-top:18px;font-size: 14px;color:rgb(240,20,20);}
.food_oldPrice{text-decoration: line-through;color:rgb(147,153,159);font-size: 10px;font-weight: 700;}
.sellCount{padding-right: 12px;}
/*左侧menu的样式*/
.menu_wrap{overflow: hidden;}
.menu_li{line-height: 12px;background-color:#f3f5f7;
font-size: 12px;font-weight: 400; padding: 21px 0 21px 12px;border-bottom:1px solid rgba(7,17,27,0.1);}
.current{background-color:lightblue; }
/*定义加减号的定位*/
.cartcontral_wrap{position: absolute;right:0;bottom:0;}
</style>

