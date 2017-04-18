<template>
  <div class="header">
     <div class="top_content clearfix">
     	<div class="avatar fl"><img :src="seller.avatar" alt="avatar" width="64px" height="64px"></div>
     	<div class="seller_content fl">
     	  <div class="brand">
     		<span class='brand_img'></span>
     		<span class='brand_text'>{{seller.name}}</span>
     	  </div>
     		<div class="deliver">
     		<span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
     		</div>
     	  <div class="discount">
     		<span class='discount_img'></span>
     		<span class="discount_text">{{seller.supports[1].description}}</span>
     	  </div>
     	</div>
     	<div class='icon' @click='blackShow=true'>5 ></div>
     </div>
     <div class="note_content">
     	<span class='note_img'></span>
     	<span class='note_text'>{{seller.bulletin}}</span>
     </div>
     <transition enter-active-class='animated fadeInDown' leave-active-class='animated fadeOutUp'>
      <div class="black" v-show="blackShow">
     	<div class="wrap">
     		<div class="wrap_content clearfix">
     		    <p>{{seller.name}}</p>
     		    <!-- star组件 -->
     			<Star :size="48" :score='3.8'></Star>
<!-- 优惠信息 -->
                <div class="discount_flex">
                	<div class="line"></div>
                	<div class="text">优惠信息</div>
                	<div class="line"></div>
                </div>
                <ul v-if="seller.supports" class="supports_ul">
                	<li class='supports_li' v-for='(item,index) in seller.supports'>
                		<span :class='supportsItem[index]' class='supports_icon'></span>
            		<span v-show='seller.supports' class='supports_text'>{{seller.supports[index].description}}</span>
                	</li>
                </ul>
<!-- 商家公告信息 -->
               <div class="discount_flex">
                	<div class="line"></div>
                	<div class="text">商家公告</div>
                	<div class="line"></div>
                </div>
                <div class='bulletin'>{{seller.bulletin}}</div>
     		</div>
     	</div>
     	<div class="black_footer" @click="blackShow=false"><img src="./X.png" height="32" width="32" alt=""></div>
      </div>
    </transition>
      
  </div>

</template>

<script>
  import Star from '../Star/Star.vue'
    export default{
    	name:"MyHeader",
    	props:{
    		seller:{
    			type:Object
    		}
    	},
    	components:{
    		'Star':Star
    	},
    	data(){
    		return {
    			blackShow:true,
    			supportsItem:['sub','dis','dis','spec','spec']
    		}
    	}
    }
</script>

<style>
.top_content{padding:24px 12px 18px 24px;position:relative;
background:url(banner.jpg) no-repeat left top;}
/*商家头像*/
    .avatar{width:64px;height: 64px;}
    .avatar img{border-radius: 2px;}
/*右边商家基本信息*/
    .seller_content{margin-left: 16px;}
    /*商家招牌信息*/
    .brand{}
    .brand_img{background:url("brand@2x.png") no-repeat left top; width: 30px;height: 18px;display: inline-block;background-size: 30px 18px;vertical-align: top;}
    .brand_text{font-size: 16px;line-height: 18px;font-weight: bold;color:rgb(255,255,255);}
    /*运输信息*/
    .deliver{padding-top: 8px;}
    .deliver span{font-size:12px;font-weight: 200;line-height: 12px;color:rgb(255,255,255);}
    /*优惠信息*/
    .discount{padding-top: 10px;}
    .discount_img{background:url('decrease_2@2x.png') no-repeat left top;width: 16px;height: 16px;background-size: 16px 16px;display: inline-block;vertical-align: top;}
    .discount_text{font-size: 10px;line-height: 12px;font-weight: 200;color:rgb(255,255,255);}
    /*icon区域*/
    .icon{width:40px;height:24px;background: rgba(0,0,0,0.2);display: inline-block;border-radius: 16px;text-align: center;font-size: 10px;
    	line-height: 24px;position: absolute;right:12px;bottom:18px;
    	color:rgb(255,255,255);font-weight: 200;cursor: pointer;}
/*公告区域*/
.note_content{padding-left:12px;padding-right:12px;background-color: rgba(7,17,27,0.2);
overflow: hidden;height: 28px;}
.note_img{background:url('bulletin@2x.png') no-repeat left top;background-size: 22px 12px;
width:22px;height: 12px;display: inline-block;vertical-align: middle;}
.note_text{margin-left: 4px;font-size: 10px;line-height: 28px;text-overflow: ellipsis;overflow: hidden;}
/*遮罩层,这里用fixed绝对定位*/
.black{background-color: rgba(7,17,27,0.8);height: 100%;width:100%;z-index: 100;position: fixed;left:0;top:0;color:white;z-index: 102;}
/*sticky footer布局的方法*/
.wrap{min-height: 100%;}
.wrap_content{padding-top:64px;padding-bottom: 64px;}
.black_footer{margin: -64px auto 0 auto;height: 32px;width:32px;color:white;clear:both;position: relative;}
.wrap_content p{padding-bottom: 16px;text-align: center;}
/*优惠信息及商品公告标题flex布局*/
.discount_flex{width:80%;margin:28px auto 24px auto;height: 21px;display: flex;}
.line{display: flex;flex:1;border-bottom:1px solid orange;height: 14px;
margin-bottom: 7px;}
.text{padding: 7px 12px 0 12px;font-weight: 700;}
/*优惠信息内容的样式*/
.supports_ul{margin: 24px auto 28px auto;overflow: hidden;width: 76%;}
.supports_li{height: 12px;line-height: 12px;margin-bottom: 12px;font-weight: 200;}
.supports_icon{width:16px;height: 16px;display:inline-block;margin-right: 6px;}
/*.supports_icon里的图片样式*/
.sub{width:16px;height: 16px;background:url('./decrease_2@2x.png') no-repeat left top;display:inline-block;background-size: 16px 16px;}
.dis{width:16px;height: 16px;background:url('./discount_2@2x.png') no-repeat left top;display:inline-block;background-size: 16px 16px;}
.spec{width:16px;height: 16px;background:url('./special_2@2x.png') no-repeat left top;display:inline-block;background-size: 16px 16px;}
/*商家公告内容样式*/
.bulletin{width: 76%;margin:24px auto 0 auto;
font-size: 12px;line-height: 36px;font-weight: 200;}

</style>
