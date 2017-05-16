<template>
	<div class='shopcart' @click="togglelist">
	<!-- 定义mask遮罩层 -->
	 <transition enter-active-class='animated fadeIn' leave-active-class="animated fadeOut">
	 <div class="mask" v-show='listshow'></div>
	 </transition>
		<div class="shopcart_left">
			<div class="shopcart_logo">
				<span><img src="./shopcart.png" height="24" width="24" alt="购物车">
				</span>
			</div>
			<div class="shopcart_price">￥{{totalPrice}}</div>
			<div class="shopcart_delivery">另需配送费￥{{deliveryPrice}}元</div>
		</div>
		<div class="shopcart_right">
			<div class='mini_price' :class="{'greenPrice':totalPrice>=20}" @click.stop.prevent='pay'>{{subPrice}}
			</div>
		</div>
		<div :class="{'total_count':totalCount>0}" v-show='totalCount>0'>{{totalCount}}</div>
<!-- 定义小球 -->
        <div class="ball_container">
        	<div v-for="ball in balls" v-show="ball.show">
<!-- transition里面要包含两个层 -->
        		<transition name='drop' @before-enter="beforeDrop" @enter='dropping' @after-enter="afterDrop">
        			<div class='ball'>
        				<div class="inner inner-hook" ref='inner'></div>
        			</div>
        		</transition>
        	</div>
        </div>
<!-- 定义购物车弹出层 -->
   <transition enter-active-class='animated zoomIn' leave-active-class="animated zoomOut">
                <div class='shopcartlist' v-show='listshow'>
                	<div class="list_header">
                		<h1>购物车</h1>
                		<h2 class="h2" @click.stop.prevent="empty">清空</h2>
                	</div>
                	<div class='list_content' ref='listcontent'>
                		<ul>
                			<li class='list_food' v-for='food in selectfoods'>
                				<span class="name">{{food.name}}</span>
                				<span class='price'>￥{{food.price * food.count}}</span>
                				<div class="cartcontral_wrapper">
                					<Cartcontral :food="food"></Cartcontral>
                				</div>
                			</li>
                		</ul>
                	</div>
                </div>
   </transition>
	</div>
	
</template>

<script>
import BScroll from 'better-scroll';
import Cartcontral from '../Cartcontral/Cartcontral.vue';
	export default{
		name:'Shopcart',
		components:{
			'Cartcontral':Cartcontral
		},
		props:{
			selectfoods:{
                type:Array,
                default(){
                	return [];
                }
			},
			minPrice:{
				type:Number,
			    default:20
			},
			deliveryPrice:{
				type:Number,
			    default:4
			}
		},
		methods:{
          drop(el) {
          for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
   /*return相当于break退出循环*/
            return;
          }
        }
      },
          beforeDrop(el) {
          let count = this.balls.length;
          while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.transform = 'translate3d(0,${y}px,0)';
            el.style.transform = 'translate3d(0,${y}px,0)';
            //let inner = el.getElementsByClassName('inner-hook')[0];
            this.$refs.inner.style.webkitTransform = 'translate3d(${x}px,0,0)';
            this.$refs.inner.style.transform = 'translate3d(${x}px,0,0)';

          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          //let inner = el.getElementsByClassName('inner-hook')[0];
          this.$refs.inner.style.webkitTransform = 'translate3d(0,0,0)';
          this.$refs.inner.style.transform = 'translate3d(0,0,0)';
          //el.addEventListener('transitionend', done);

        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      togglelist(){
      	if(!this.totalCount){
      		return ;
      	}
      	this.fold=!this.fold;
      },
      empty(){
      	this.selectfoods.forEach((food) => {
      		food.count=0;
      	});
      },
      pay(){
      	if(this.totalPrice<20){
      		return ;
      	}else{
      		alert('请支付' + this.totalPrice + '元');
      	}
      }
		},
		data(){
			return {
				balls:[{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				}],
				dropBalls:[],
				fold:true
			}
		},
		computed:{
/*这里重点学习forEach箭头函数的用法，这里food换成value或者其他的什么都可以*/
			totalPrice(){
				let total=0;
				this.selectfoods.forEach((food) => {
                   total+=food.price * food.count;
				});
				return total;
			},
			totalCount(){
				let count=0;
				this.selectfoods.forEach((food) => {
                   count+=food.count;
				});
				return count;
			},
			subPrice(){
                if(this.totalPrice==0){
                	return '还差'+this.minPrice+'起送';
                }else if(this.totalPrice>0 && this.totalPrice<this.minPrice){
                	let sub=this.minPrice-this.totalPrice;
                	return '还差'+sub+'起送';
                }else if(this.totalPrice==this.minPrice || this.totalPrice>this.minPrice){
                	return '结算';
                	
                }
			},
			listshow(){
               if(!this.totalCount){
               	this.fold=true;
               	return false;
               }
               let show=!this.fold;
               if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listcontent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
               return show;
			}
		}
	}
</script>

<style>
	.shopcart{width:100%;height:48px;background-color: #141d27;position: fixed;bottom:0;left:0;display:flex;z-index: 50;}
	.shopcart_right{flex:0 0 105px;}
	.shopcart_left{flex:1;background-color: #141d27;}
	/*logo样式，注意logo的position写法*/
	.shopcart_logo{width:38px;height: 38px;background-color:#2b343c;position: relative;top:-10px;margin:0 12px;border:6px solid #141d27;border-radius: 38px;text-align: center;display: inline-block;line-height: 38px;}
	.shopcart_logo span{display: inline-block;}
	.shopcart_logo span img{vertical-align: middle;}
    /*price样式*/
    .shopcart_price{margin:12px 0 12px 0;line-height: 24px;font-size: 16px;
    	color:rgba(255,255,255,0.4);font-weight: 700;display: inline-block;border-right:1px solid #2c343d;padding-right: 12px;}
    .shopcart_delivery{margin:12px 0 12px 12px;line-height: 24px;font-size: 14px;
    	color:rgba(255,255,255,0.4);font-weight: 300;display: inline-block;}
    .shopcart_right{background-color: #2b333b;text-align: center;line-height: 48px;font-size: 12px;font-weight: 700;color:rgba(255,255,255,0.4);}
    .total_count{width: 24px;height:16px;background-color: rgb(240,20,20);display:inline-block;position: fixed;bottom:44px;display: inline-block;
    	left:44px;border-radius: 12px;text-align: center;font-size: 9px;font-weight: 700;color:#fff;line-height: 16px;box-shadow: 0 4px 8px 0 rgba(0,0,0, 0.4)}
    	/*结算时呈现绿色*/
    	.greenPrice{background-color: green;color:#fff;}
    	/*ball的样式*/
    	.ball{position: fixed;bottom:22px;left:32px;transition: all 0.6s cubic-bezier(0.49,-0.29,0.75,0.41);}
    	.inner{width: 16px;height: 16px;transition: all 0.6s linear;display: block;border-radius: 50%;}
    	/*购物车折叠层的样式,注意这里的高度要用max-height*/
    	.shopcartlist{position: absolute;left:0;bottom:0;width:100%;max-height:305px;z-index: -1;}
    	.list_header{width: 90%;height: 40px;line-height: 40px;background-color: #f3f5f7;padding:0 18px;border-bottom:1px solid rgba(7,17,27,0.1);}
    	.list_header h1{font-size: 14px;color:rgb(7,17,27);}
        .list_content{overflow: hidden;max-height: 218px;background: #fff}
    	.empty{display: inline-block;border:1px solid red;}
    	.list_food{width:90%;margin:0 auto;border-bottom:1px solid rgba(7,17,27,0.1);padding: 12px 0 12px 0;display: block;position: relative;}
    	.name{display: inline-block;font-size: 14px;color:rgb(7,17,27);line-height: 24px;}
    	.price{display: inline-block;font-size: 14px;color:rgb(7,17,27);line-height: 24px;position: absolute;right:72px;bottom:12px;}
    	.cartcontral_wrapper{display: inline-block;margin-left: 20px;position: absolute;right: 0;top:12px;}
    	.h2{display: inline-block;position: absolute;right: 12px;top:0;font-size: 12px;color:rgb(0,160,220);}
    	/*mask遮罩层样式*/
    	.mask{position: fixed;background-color: rgba(7,17,27,0.6);-webkit-filter: blur(10px);-ms-filter: blur(10px);-moz-filter: blur(10px);
    		-o-filter: blur(10px);height: 100%;width:100%;top:0;left:0;z-index: -2;}


</style>