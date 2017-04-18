<template>
  <div id="app">
    <div class="header">
      <My-header :seller='seller'></My-header>
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
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>
    <div class="content">
    </div>
  </div>
</template>

<script>
    import MyHeader from './components/MyHeader/MyHeader.vue'
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
    .nav-item a{color:#000;display: block;font-weight: 600;font-size: 14px;}
    .nav-item a:hover{color:#00b4ff;}
    #app{overflow: hidden;height: 100%;}
</style>
