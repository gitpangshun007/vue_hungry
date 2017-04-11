<template>
	<div class="cartcontral">
	  <transition enter-active-class='animated bounce' leave-active-class="animated slideOutDown">
		<div class="decrease" v-show='food.count>0' @click.stop.prevent="subCount" ></div>
	  </transition>
		<div class="countNumber" v-show="food.count>0">{{food.count}}</div>
		<div class="plus" @click.stop.prevent="plusCount"></div>
	</div>
</template>

<script>
  import Vue from 'Vue'
  import '.3.5.2@animate.css'
	export default{
		name:"Cartcontral",
		props:{
			food:{
				type:Object
			}
		},
		methods:{
          plusCount(event){
          	if(!event._constructed){
          		return;
          	}
          	if(!this.food.count){
/*这里是重点，要用局部的set，不要用全局的set，因为会造成数据更新缓慢*/
             this.$set(this.food,'count',1);
           }else{
           	this.food.count++;
           }
            this.$emit('add', event.target);
          },
          subCount(event){
          	if(!event._constructed){
          		return;
          	}
          	if(this.food.count){
          		this.food.count--;
          	}

          }
		}
	}
</script>

<style>
	.decrease{width:24px;height: 24px;background:url(sub.png) no-repeat left top;background-size: 24px;display: inline-block;}
	.countNumber{width:8px;height: 24px;display: inline-block;text-align: center;font-size: 10px;line-height: 24px;vertical-align: top;color:rgb(147,153,159);}
	.plus{width:24px;height: 24px;background:url(plus.png) no-repeat left top;background-size: 24px;display: inline-block;}
</style>