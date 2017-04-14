<template>
   <transition name='move'>
	<div class="food" v-show='showFlag' ref='food'>
		<div class='food_content'>
			<div class="img_header">
				<img :src="food.image" alt="" class="img_wrap">
				<div class="back" @click.stop.prevent='hide'>
					<i class="arrow"></i>
				</div>
			</div>
			<div class="content">
				<div class="title">{{food.name}}</div>
				<div class="sell">
					<span>月售{{food.sellCount}}份</span>
					<span class='sell_right'>好评率{{food.rating}}%</span>
				</div>
				<div class="money">
					<span class="money_left">￥{{food.price}}</span>
					<span class="money_right" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
				<div class="Cartcontral">
					<Cartcontral :food="food"></Cartcontral>
				</div>
					<div class="cart_content" @click.stop.prevent='addFirst' v-show='!food.count || food.count==0'>加入购物车</div>
			</div>
			<Splite></Splite>
			<div class="introduce">
				<h1>商品介绍</h1>
				<div class="introduce_desc">{{food.info}}</div>
			</div>
			<Splite></Splite>
			<div class='rate'>
				<div class="rate_content">
					<div class="rate_title">商品评价</div>
					<div class='ratingselect_wrap'>
						<Ratingselect :selectType='selectType' :onlycontent='onlycontent' :desc='desc' :ratings='food.ratings' @select='select'></Ratingselect>
					</div>
				</div>
			</div>
		</div>
	</div>
   </transition>
</template>

<script>
import Splite from '../Splite/Splite.vue'
import BScroll from 'better-scroll'
import Cartcontral from '../Cartcontral/Cartcontral.vue'
import Vue from 'vue'
import Ratingselect from '../Ratingselect/Ratingselect.vue'
   const ALL=2;
   const POSITIVE=0;
   const NEGATIVE=1;
	export default{
		name:'Food',
		components:{
			'Splite':Splite,
			'Cartcontral':Cartcontral,
			'Ratingselect':Ratingselect
		},
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return {
				showFlag:false,
				selectType:ALL,
				onlycontent:false,
				desc:{
				  positive:'推荐',
                  negative:'吐槽',
                  all:'全部'
				}
			};
		},
		methods:{
			show(){
				this.showFlag=true;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.food,{
							click:true
						});
					}else{
						this.scroll.refresh();
					}
				});
			},
			hide(){
				this.showFlag=false;
			},
			addFirst(event){
                this.$set(this.food,'count',1);
                this.$emit('add',event.target);
			},
			select(type){
				this.selectType=type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		}
	}
</script>

<style>
	.food{background-color: #fff;position: fixed;top:0;left:0;bottom:48px;z-index: 30;width:100%;}
	
    .move-enter-active, .move-leave-active{
      transition: all 0.8s linear;
      
    }
    .move-enter, .move-leave-active{
      transform: translate3d(100%, 0, 0);
    }
/*img的样式，这里的样式写法非常重要*/
    .img_header{height: 0;width:100%;padding-top: 100%;position: relative;}
    .img_wrap{position: absolute;top:0;left:0;width: 100%;height: 100%;}
/*箭头的样式*/
    .back{position: absolute;left:14px;top:14px;}
    .arrow{display: block;background: url('./arrow.png') no-repeat left top;background-size: 22px;width: 22px;height: 22px;padding:10px;}
/*商品题目等基本信息*/
    .content{padding:18px;position: relative;}
    .title{font-size: 14px;color:rgb(7,17,27);font-weight: 700;line-height: 14px;}
    .sell{padding-top: 8px;font-size: 10px;color:rgb(147,153,159);line-height: 10px;}
    .sell_right{padding-left:12px;}
    .money{padding:18px 0 0 0;}
    .money_left{font-size:14px;color:rgb(240,20,20);font-weight: 700;line-height: 24px;}
    .money_right{font-size:10px;color:rgb(147,153,159);font-weight: normal;line-height: 24px;text-decoration:line-through;}
    /*cartcontral和购物车的样式*/
    .Cartcontral{position: absolute;right:18px;bottom:18px;}
    .cart_content{width: 74px;height:24px;background-color:rgb(0,160,220); position: absolute;right:18px;bottom:22px;border-radius: 12px;text-align: center;line-height: 24px;font-size: 10px;color:#fff;}
    /*商品介绍的样式*/
    .introduce{padding:18px;}
    .introduce h1{}
    .introduce_desc{padding-top:6px;font-size: 12px;font-weight: 200;color:rgb(147,153,159);line-height: 24px;}
    /*商品评价样式*/
     .rate_content{margin:18px;}
</style>
