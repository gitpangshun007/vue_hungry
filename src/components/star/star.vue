<template>
	<div class="star" :class="starType">
		<span v-for='item in itemClass' :class="itemClass" class='star-item'></span>
	</div>
</template>
<script>
    const LENGTH=5;
    const CLS_ON='on';
    const CLS_OFF='off';
    const CLS_HALF='half';
	export default{
		name:'Star',
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
		starType(){
			return "star-"+this.size;
		},
		itemClass(){
            let myData=[];
            let score=this.score;
            let newScore=Math.floor(score);
            for(let i=0;i<newScore;i++){
            	myData.push(CLS_ON);
            }
            score=this.score;
            let fudian=(score.toString()).indexOf('.');
            let stringScore=score.toString();
            console.log(fudian);
            if(fudian!=-1){
            	let myScore=stringScore.split('');
            	if(parseInt(myScore[myScore.length-1])<5){
            		return myData;
            	}
                //if(parseInt(myScore[myScore.length-1])>5){
                	//myData.push(CLS_HALF);
                //}
            }
            return myData;
		}
	}
	}

</script>
<style>
	.star{font-size: 0;text-align: center;}
/*设置总体公用的star-item的样式*/
	.star-item{display: inline-block;background-repeat: no-repeat;}
	/*设置48尺寸的star-item样式*/
	.star-48 .star-item{width: 24px;height: 24px;}
	/*设置星星的状态*/
	.star-48 .on{background: url('star48_on@3x.png') no-repeat left top;background-size: 24px 24px;width:24px;height: 24px;}
	.star-48 .half{background: url('star48_half@3x.png') no-repeat left top;background-size: 24px 24px;width:24px;height: 24px;}
	.star-48 .off{background: url('star48_off@3x.png') no-repeat left top;background-size: 24px 24px;width:24px;height: 24px;}
	/*设置36尺寸的star-tiem样式*/
	.star-36 .star-item{width: 18px;height: 18px;}
	/*设置星星的状态*/
	.star-36 .on{background: url('star36_on@3x.png') no-repeat left top;background-size: 18px 18px;width:18px;height: 18px;}
	.star-36 .half{background: url('star36_half@3x.png') no-repeat left top;background-size: 18px 18px;width:18px;height: 24px;}
	.star-36 .off{background: url('star36_off@3x.png') no-repeat left top;background-size: 18px 18px;width:18px;height: 18px;}
	/*设置24尺寸的star-tiem样式*/
	.star-24 .star-item{width: 10px;height: 10px;}
	/*设置星星的状态*/
	.star-24 .on{background: url('star24_on@3x.png') no-repeat left top;background-size: 10px 10px;width:10px;height: 10px;}
	.star-24 .half{background: url('star24_half@3x.png') no-repeat left top;background-size: 10px 10px;width:10px;height: 10px;}
	.star-24 .off{background: url('star24_off@3x.png') no-repeat left top;background-size: 10px 10px;width:10px;height: 10px;}
</style>