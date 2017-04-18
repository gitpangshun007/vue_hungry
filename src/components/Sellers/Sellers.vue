<template>
  <div class="sellers" ref='sellers'>
     <div class="sellers_wrapper">
     	<div class="sellers_content">
     		<div class="sellers_top">
     			<div class="sellers_title">{{seller.name}}</div>
     			<div>
     			    <div class='sellers_star_wrapper'>
     				  <Star :size='36' :score='4.2'></Star>
     				</div>
     				<div class="text_style">
     				 <span class="sellers_star_text">({{seller.ratingCount}})</span>
     				 <span class="sellers_star_text">月售{{seller.sellCount}}单</span>
     				</div>
     			</div>
     			<div class="favorite" @click='toggleFav' :class='{"favorite_red":fav}'></div>
     			<span class="favorite_text">收藏</span>
     		</div>
     		<div class="sellers_bottom">
     			<div class="sellers_bottom_wrapper">
     				<div class="bottom_wrapper_left">
     					<p class="bottom_p1">起送价</p>
     					<p class="bottom_p2">{{seller.minPrice}}<span>元</span></p>
     				</div>
     				<div class="bottom_wrapper_middle">
     					<p class="bottom_p1">商家配送</p>
     					<p class="bottom_p2">{{seller.deliveryPrice}}<span>元</span></p>
     				</div>
     				<div class="bottom_wrapper_right">
     					<p class="bottom_p1">平均配送时间</p>
     					<p class="bottom_p2">{{seller.deliveryTime}}<span>分</span></p>
     				</div>
     			</div>
     		</div>
     	</div>
     	<Splite></Splite>
     	<div class="notice">
     		<div class="notice_title">公告与活动</div>
     		<div class="notice_content">{{seller.bulletin}}</div>
     	</div>
     	<div class="discount_list">
     		<ul>
     			<li class="discount_list_li" v-for='(support,index) in seller.supports'>
     				<span class="support_avatar" :class='{"support_avatar_decrease":support.type==0,
                     "support_avatar_discount":support.type==1,
                     "support_avatar_special":support.type==2,
                     "support_avatar_vote":support.type==3,
                     "support_avatar_safe":support.type==4,
     				}'></span>
     				<span class='support_content'>{{support.description}}</span>
     			</li>
     		</ul>
     	</div>
     	<Splite></Splite>
     	<div class="sellers_pic_wrapper">
     		<div class="sellers_pic_title">商家实景</div>
     		<div class="sellers_pic_list" ref='list'>
     			<ul class="sellers_pic_ul" ref='listUl'>
     				<li class="sellers_pic_li" v-for="pic in seller.pics">
     					<img :src="pic" alt="" width="120" height="90">
     				</li>
     			</ul>
     		</div>
     	</div>
     	<Splite></Splite>
     	<div class="sellers_info">
     		<div class="sellers_info_title">商家信息</div>
     		<div class="sellers_info_content" v-for='info in seller.infos'>{{info}}</div>
     	</div>
     </div>
  </div>
</template>

<script>
import Star from '../Star/Star.vue'
import Splite from '../Splite/Splite.vue'
import BScroll from 'better-scroll'
   export default{
   	name:"Sellers",
   	components:{
   		'Star':Star,
   		'Splite':Splite
   	},
   	props:{
   		seller:{
   			type:Object,
   			default(){
   				return {}
   			}
   		}
   	},
   	data(){
   		return {
          fav:false
   		}
   	},
   	mounted(){
   		this.$nextTick(() => {
           this._initScroll();
           this._initPic();
           this.$nextTick(() => {
           	  this.scroll.refresh();
           	  this.picScroll.refresh();
           });
   		});
   	},
   	methods:{
   		_initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.sellers, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPic(){
      	let liMargin=6;
      	let liWidth=120;
      	let totalWidth=(liWidth+liMargin)* 4;
      	this.$refs.listUl.style.width=totalWidth+ 'px';
      	this.$nextTick(() =>{
      		if(!this.picScroll){
      			this.picScroll=new BScroll(this.$refs.list,{
      				click:true,
      				scrollX:true,
      				eventPassthrough: 'vertical'
      			});
      		}else{
      			this.scroll.refresh();
      		}
      	});
      },
      toggleFav(){
        this.fav=!this.fav;
      }
   	}
   }
</script>

<style>
   .sellers{position: absolute;top:191px;bottom: 0;overflow: hidden;width: 100%;}
   .sellers_wrapper{min-height: 100%;}
   .sellers_content{width:90%;margin:18px auto;}
   .sellers_top{padding-bottom: 18px;position: relative;border-bottom: 1px solid rgba(7,17,27,0.1);}
   .sellers_title{font-size: 14px;color:rgb(7,17,27);line-height: 14px;margin-bottom: 8px;}
   .sellers_star_wrapper{width:40%;margin-left:-26px;display: inline-block;vertical-align: middle;}
   .text_style{display: inline-block;margin-left: -16px;}
   .sellers_star_text{display: inline-block;line-height: 10px;font-size: 10px;color:rgb(77,85,93);}
   .favorite{position: absolute;right: -24px;top:0;width: 24px;height: 24px;padding:12px;background: url('./heart_grey.png') no-repeat left top;background-size: 24px;overflow: hidden;}
   .favorite_red{position: absolute !important ;right: -24px !important ;top:0 !important ;padding:12px;width: 24px !important ;height: 24px !important ;background: url('./heart_red.png') no-repeat left top !important ;background-size: 24px !important ;overflow: hidden !important ;}
   .favorite_text{font-size: 10px;color:rgb(77,85,93);line-height: 10px;margin-top: 4px;display: inline-block;position: absolute;right: 2px;top:24px;}
   .sellers_bottom{width: 88%;margin:18px auto 0 auto;}
   .sellers_bottom_wrapper{display: flex;}
   .bottom_wrapper_left{flex:1;text-align: center;}
   .bottom_wrapper_middle{flex:1;border-left:1px solid rgba(7,17,27,0.1);
   	border-right:1px solid rgba(7,17,27,0.1);text-align: center;}
   .bottom_wrapper_right{flex:1;text-align: center;}
   .bottom_p1{font-size: 10px;color:rgb(147,153,159);padding-bottom: 4px;}
   .bottom_p2{font-size: 24px;font-weight: 200;color:rgb(7,17,27);line-height: 24px;}
   .bottom_p2 span{font-size: 10px;font-weight: 200;}
   .notice{width: 90%;border-bottom: 1px solid rgba(7,17,27,0.1);margin:18px auto 0 auto;}
   .notice_title{font-size: 14px;color:rgb(7,17,27);line-height: 14px;}
   .notice_content{font-size: 12px;line-height: 24px;color:rgb(240,20,20);font-weight:200;padding:8px 12px 16px 12px;}
   .discount_list{width: 90%;margin:0 auto;}
   .discount_list_li{padding:16px 12px;border-bottom: 1px solid rgba(7,17,27,0.1)}
   .support_avatar{display: inline-block;width: 16px;height: 16px;vertical-align: middle;}
   .support_avatar_decrease{background:url('decrease.png') no-repeat left top;
background-size: 16px;}
.support_content{font-size: 12px;font-weight: 400;color:rgb(7,17,27);line-height: 16px;}
   .support_avatar_discount{background:url('discount.png') no-repeat left top;
background-size: 16px;}
   .support_avatar_special{background:url('special.png') no-repeat left top;
background-size: 16px;}
   .support_avatar_safe{background:url('safe.png') no-repeat left top;
background-size: 16px;}
   .support_avatar_vote{background:url('vote.png') no-repeat left top;
background-size: 16px;}
   /*横向滚动的图片区域样式*/
   .sellers_pic_wrapper{padding:18px 0 18px 18px;}
   .sellers_pic_title{margin-bottom: 12px;font-size: 14px;color:rgb(7,17,27);line-height: 14px;}
   .sellers_pic_li{margin-right:6px;display: inline-block;}
   .sellers_pic_list{width: 100%;overflow: hidden;}
   /*商家信息区域样式*/
   .sellers_info{margin:18px;}
   .sellers_info_title{font-size: 14px;color:rgb(7,17,27);line-height: 14px;padding-bottom: 12px;border-bottom: 1px solid rgba(7,17,27,0.1);}
   .sellers_info_content{padding:16px 12px;font-size: 12px;font-weight: 300;color:rgb(7,17,27);line-height: 16px;border-bottom: 1px solid rgba(7,17,27,0.1);}
</style>
