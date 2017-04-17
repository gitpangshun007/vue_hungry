<template>
 <div class="ratings" ref='ratings'>
    <div class="rating_content_wrap">
     <div class="star_wrap">
    	<div class="star_left">
    		<div class="star_num">{{seller.score}}</div>
    		<div class="star_text1">综合评分</div>
    		<div class="star_text2">高于周边商家{{seller.rankRate}}%</div>
    	</div>
    	<div class="star_right">
    		<div>
    			<div class="star_type1">商品质量</div>
    			<div class='star_item'>
    				<Star :size='36' :score='3.9'></Star>
    			</div>
    			<div class="num">{{seller.foodScore}}</div>
    		</div>
    		<div>
    			<div class="star_type2">服务态度</div>
    			<div class='star_item'>
    				<Star :size='36' :score='4.1'></Star>
    			</div>
    			<div class="num">{{seller.serviceScore}}</div>
    		</div>
    		<div>
    			<div class="star_type3">送达时间</div>
    			<div class='star_item'>
    				<Star :size='36' :score='3.9'></Star>
    			</div>
    			<span class="rating_delivery">{{seller.deliveryTime}}分钟</span>
    		</div>
    	</div>
     </div>
     <Splite></Splite>
     <div class="ratingSelectWrap">
    	<Ratingselect :selectType='selectType' :onlycontent='onlycontent' @toggleRight='toggleRating' @select='selectRating' :ratings='ratings'></Ratingselect>
     </div>
     <!-- 评价列表 -->
     <div class="newRating_wrap">
     	<ul class="newRating_ul">
     		<li v-for='rating in ratings' class="newRating_li">
     		 <div class="newRating_avatar_wrap">	
     			<div class="newRating_avatar"><img :src="rating.avatar" alt="" width="28" height="28"></div>
     		 </div>
     			<div class="newRating_right">
     				<div class="newRating_title">{{rating.username}}</div>
     				<div class="newRating_time">{{rating.rateTime}}</div>
     				<div class="newRating_star_wrap">
     				  <div class="star_wrapper">
     				    <Star :size='24' :score='rating.score'></Star>
     				  </div>
     					<span class="newRating_delivery">{{rating.deliveryTime}}分钟送达</span>
     				</div>
                    <div class="newRating_content">{{rating.text}}</div>
                    <div class="newRating_tab">
                    	<span class="newRating_yes" :class='{"good":rating.rateType==0,"bad":rating.rateType==1}'></span>
                    	<span class='newRating_tab_item' v-for='(recommend,index) in rating.recommend'>{{rating.recommend[index]}}</span>
                    </div>
     			</div>
     		</li>
     	</ul>
     </div>
   </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll'
import Star from '../Star/Star.vue'
import Splite from '../Splite/Splite.vue'
import Ratingselect from '../Ratingselect/Ratingselect.vue'
const ALL=2;
const POSITIVE=0;
const NEGATIVE=1;
const ERR_OK=0;
   export default{
   	name:"Ratings",
   	props:{
   		seller:{
   			type:Object,
   			default(){
   				return {};
   			}
   		}
   	},
   	data(){
   		return {
   			selectType:ALL,
   			onlycontent:true,
   			ratings:[]
   		}
   	},
   	created(){
        this.$http.get('./api/ratings').then((response) =>{
            response=response.body;
            this.ratings=response.data;
            this.$nextTick(() => {
            	this.scroll=new BScroll(this.$refs.ratings,{
            		click:true
            	});
            });
        },(response) => {
        	console.log(response.status);
        });
   	},
   	components:{
       'Star':Star,
       'Splite':Splite,
       'Ratingselect':Ratingselect
   	},
   	methods:{
     toggleRating(){
     	this.onlycontent=!this.onlycontent;
     },
     selectRating(type){
     	this.selectType=type;
     }
   	}
   }
</script>

<style>
    .ratings{overflow: hidden;position: absolute;top: 191px;bottom: 0;width: 100%;}
    /*评分区域样式*/
    .newRating_li{padding: 18px 0;border-bottom:1px solid rgba(7,17,27,0.2);}
    .star_wrap{padding:18px 0;display: flex;}
    .star_left{flex:1;padding:0 24px;text-align: center;border-right: 1px solid rgba(7,17,27,0.2)}
    .star_right{flex:2;}
    .star_num{font-size: 24px;color:rgb(255,152,0);line-height: 28px;}
    .star_text1{margin-top: 6px;font-size: 12px;color:rgb(7,17,27);line-height: 12px;}
    .star_text2{margin-top: 8px;padding-bottom: 6px;font-size: 10px;color:rgba(7,17,27,0.5);}
    .star_right{padding:0 0 0 24px;}
    .star_type1{font-size: 12px;color:rgb(7,17,27);line-height: 18px;margin-right: 12px;display: inline-block;}
    .star_type2{font-size: 12px;color:rgb(7,17,27);line-height: 18px;margin-right: 12px;display: inline-block;margin-top:8px;}
    .star_type3{font-size: 12px;color:rgb(7,17,27);line-height: 18px;margin-right: 12px;display: inline-block;margin-top:8px;}
    .star_item{display: inline-block;vertical-align: middle;}
    .num{display: inline-block;vertical-align: middle;font-size: 12px;color:rgb(255,152,0);margin-left: 12px;line-height: 18px;}
    .rating_delivery{display: inline-block;font-size: 12px;color:rgb(147,153,159);}
    /*评价列表的样式*/
    .newRating_ul{padding:18px 0;width:90%;margin:0 auto;}
    .newRating_li{position: relative;display: flex}
    .newRating_avatar{width: 26px;height: 26px;overflow: hidden;border-radius: 50%;display: inline-block;flex:1;}
    .newRating_right{display: inline-block;vertical-align: top;font-size: 10px;color:rgb(7,17,27);line-height: 12px;width: 90%;margin-left: 12px;}
    .newRating_star_wrap{margin-top: 4px;}
    .newRating_delivery{display: inline-block;font-size: 10px;font-weight: 200;color:rgb(147,153,159);line-height: 12px;}
    .star_wrapper{display: inline-block;margin-right: 6px;}
    .newRating_content{margin-top: 0;margin-bottom: 8px;font-size: 12px;color:rgb(7,17,27);line-height: 18px;}
    .newRating_yes{display: inline-block;width:12px;height: 12px;margin-right: 8px;}
    .good{background:url('./yes.png') no-repeat left top;background-size: 12px;}
    .bad{background:url('./no.png') no-repeat left top;background-size: 12px;}
    .newRating_tab_item{display: inline-block;height:14px;border: 1px solid rgba(7,17,27,0.1);border-radius: 2px;margin-right: 6px;}
    .newRating_time{display: inline-block;position: absolute;right:18px;top:18px;font-size: 10px;font-weight: 200;color:rgb(147,153,159);line-height: 12px;}
</style>
