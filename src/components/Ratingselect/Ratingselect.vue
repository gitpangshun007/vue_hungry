<template>
  <div class="ratingselect">
      <div class="rating_tab">
      	<span class="all" @click.stop.prevent='selectTab(2)' :class='{"active1":selectType==2}'>{{desc.all}}<i></i></span>
      	<span class="positive" @click.stop.prevent='selectTab(0)' :class='{"active1":selectType==0}'>{{desc.positive}}<i></i></span>
      	<span class="negative" @click.stop.prevent='selectTab(1)' :class='{"active2":selectType==1}'>{{desc.negative}}<i></i></span>
      </div>
      <div class="onlycontent">
      	<i></i>
      	<span class="onlycontent_title">只看有内容的评价</span>
      </div>
  </div>
</template>

<script>
   const ALL=2;
   const POSITIVE=0;
   const NEGATIVE=1;
   export default{
   	name:"Ratingselect",
   	props:{
   		ratings:{
   			type:Array,
   			default(){
   				return [];
   			}
   		},
   		selectType:{
           type:Number,
           default:ALL
   	   },
        onlycontent:{
        	type:Boolean,
        	default:false
        },
        desc:{
        	type:Object,
        	default() {
        		return {
                  positive:'满意',
                  negative:'不满意',
                  all:'全部'
        		};
        	}
        }
   },
   methods:{
   	    selectTab(type){
   	    	this.selectType=type;
   	    	this.$emit('select',type);
   	    }
   }
}
</script>

<style>
  .ratingselect{}
  .rating_tab{padding:18px;border-bottom: 1px solid rgba(7,17,27,0.1);}
  .positive{display:inline-block;padding:8px 12px;text-align: center;background-color: rgba(0,160,220,0.2);border-radius: 6px;margin-right:8px;font-size: 12px;color:#fff;}
  .negative{display:inline-block;padding:8px 12px;text-align: center;background-color: rgba(77,85,93,0.2);border-radius: 6px;margin-right:8px;font-size: 12px;color:#fff;}
  .all{display:inline-block;padding:8px 12px;text-align: center;background-color: rgb(0,160,220);border-radius: 6px;margin-right:8px;font-size: 12px;color:#fff;}
  .onlycontent{padding:12px 18px;border-bottom:1px solid rgba(7,17,27,0.2);}
  .onlycontent_title{font-size: 12px;color:rgb(147,153,159);line-height: 24px;}
  .onlycontent i{width:18px;height: 18px;display: inline-block;background:url('./right.png') no-repeat left top;background-size: 18px;vertical-align: middle;}
  /*tab点击活动时的样式*/
  .active1{background-color: rgb(0,160,220);}
  .active2{background-color: rgb(147,153,159);}
</style>
