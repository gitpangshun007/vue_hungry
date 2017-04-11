<template>
  <div id="app">
    <div class="header">
      <MyHeader :seller='seller'></MyHeader>
    </div>
    <div class="nav">
      <div class='nav-item'>
        <router-link to="/goods">商品</router-link>
      </div>
      <div class='nav-item'>
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class='nav-item'>
        <router-link to="/sellers">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
    <div class="content">
    </div>
  </div>
</template>

<script>
    import MyHeader from './components/Header/MyHeader.vue'
    export default{
      data(){
         return{
          seller:{}
         }
      },
      components:{
        "MyHeader":MyHeader 
      },
//利用created函数创建vue-resource  get请求读取/api/seller的数据
      created(){
        const ERR_OK=0;
        this.$http.get('/api/seller').then(response =>{
          response=response.body
           if(response.errorno==ERR_OK){
            this.seller=response.data;
         }
        },response =>{
            alert(response.status);
        });
      }
    }
</script>

<style>
    .nav{display: flex;border-bottom: 0.5px solid #000;}
    .nav-item{
      flex:1;
      width:100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    #app{overflow: hidden;height: 100%;}
</style>
