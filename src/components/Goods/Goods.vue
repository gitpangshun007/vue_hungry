<!-- 这里用到了v-for当中的数据嵌套，重点看 -->
<template>
  <div class="goods">
      <div class="menu_wrap">
      	<ul>
      		<li v-for='(item,index) in goods' class="menu_li">{{goods[index].name}}</li>
      	</ul>
      </div>
      <div class="foods_wrap">
      	<ul>
<!-- 这里是重点 item.name就等同于goods[index].name-->
      		<li v-for='(item,index) in goods' class='food_li'>
      			<h2 class='food_item_name'>{{item.name}}</h2>
      			<ul>
<!-- 这里是重点 -->
      				<li v-for='(food,index) in item.foods' class='food_display'>
      					<div class='item_img fl'><img :src="food.icon" alt="" width="64" height="64"></div>
      				<div class="food_detail fl">
      					<h2>{{food.name}}</h2>
      					<div class="food_description">{{food.description}}</div>
      					<div class="food_sell">
      						<span>{{food.sellCount}}</span>
      						<span>{{food.rating}}</span>
      					</div>
      					<div class="food_price">
      						<span>￥{{food.price}}</span>
      						<span class="food_oldPrice">{{food.oldPrice}}</span>
      					</div>
      				</div>
      				</li>
      			</ul>
      		</li>
      	</ul>
      </div>
  </div>

</template>

<script>
   export default{
   	name:"Goods",
    props:{
    	seller:{
    		type:Object
    	}
    },
    data(){
    	return {
    		goods:[]
    	}
    },
    created(){
    	const ERR_OK=0;
    	this.$http.get('./api/goods').then(response =>{
           response=response.body;
           if(response.errorno==ERR_OK){
             this.goods=response.data;
           }
    	},response =>{
    		console.log(response.status);
    	});
    }
   }
</script>
 
<style>
.goods{margin:0 auto;min-height: 100%;width:100%;display: flex;border:1px solid orange;}
.menu_wrap{flex:0 0 80px;width: 80px;}
.foods_wrap{flex:1;overflow: hidden;}
.food_display{display: inline-block;width: 100%;}
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
/*左侧menu的样式*/
.menu_wrap{overflow: hidden;}
.menu_li{line-height: 12px;background-color:#f3f5f7;
font-size: 12px;font-weight: 200; padding: 21px 0 21px 12px;border-bottom:1px solid rgba(7,17,27,0.1);}
</style>
