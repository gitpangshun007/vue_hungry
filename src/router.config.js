import Goods from './components/Goods/Goods.vue'
import Ratings from './components/Ratings/Ratings.vue'
import Sellers from './components/Sellers/Sellers.vue'

export default{
	routes:[{
		path:'/goods',name:'goods',component:Goods
	},{
		path:'/ratings',name:'ratings',component:Ratings
	},{
		path:'/sellers',name:'sellers',component:Sellers
	},{
		path:'/',name:'home',redirect:{name:'goods'},component:Goods
	}]
};