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
	/*设置48尺寸的star-tiem样式*/
	.star-48 .star-item{width: 24px;height: 24px;}
	/*设置星星的状态*/
	.on{background: url('star48_on@3x.png') no-repeat left top;background-size: 24px 24px;border:1px solid orange;width:24px;height: 24px;}
	.half{background: url('star48_half@3x.png') no-repeat left top;background-size: 24px 24px;border:1px solid orange;width:24px;height: 24px;}
	.off{background: url('star48_off@3x.png') no-repeat left top;background-size: 24px 24px;border:1px solid orange;width:24px;height: 24px;}
</style>