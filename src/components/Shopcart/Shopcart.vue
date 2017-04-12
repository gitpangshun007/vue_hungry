<template>
	<div class='shopcart'>
		<div class="shopcart_left">
			<div class="shopcart_logo">
				<span><img src="./shopcart.png" height="24" width="24" alt="购物车"></span>
			</div>
			<div class="shopcart_price">￥{{totalPrice}}</div>
			<div class="shopcart_delivery">另需配送费￥{{deliveryPrice}}元</div>
		</div>
		<div class="shopcart_right">
			<div class='mini_price' :class="{'greenPrice':totalPrice>=20}">￥{{subPrice}}</div>
		</div>
		<div :class="{'total_count':totalCount>0}">{{totalCount}}</div>
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
	</div>
	
</template>

<script>
//import cartcontrol from '../Cartcontral/Cartcontral.vue';
	export default{
		name:'Shopcart',
		props:{
			selectfoods:{
                type:Array,
                default(){
                	return [{price:10,count:1}];
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
            console.log(this.dropBalls);
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
				dropBalls:[]
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
			}
		}
	}
</script>

<style>
	.shopcart{width:100%;height:48px;background-color: #141d27;z-index: 100;position: fixed;bottom:0;left:0;display:flex;}
	.shopcart_right{flex:0 0 105px;}
	.shopcart_left{flex:1;}
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
    	.inner{width: 16px;height: 16px;background-color: orange;transition: all 0.6s linear;display: block;border-radius: 50%;}
</style>