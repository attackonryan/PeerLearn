<template>
  <div class="search-panel">
    <div class="search-nav">
      <div class="search-input">
        <img  src="/static/img/search.png" width="25" height="25" />
        <input ref="mySearch" type="search" placeholder="输入想学的课程"/>
      </div>
      <button @click="$emit('changeSearch')">取消</button>
    </div>
    <div class="search-content">
       <div class="title">
         <img src="/static/img/hot.png" alt="" width="25" height="25">
         <span >热门搜索</span>
       </div>
       <ul class="search-list">

       </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchPanel",
    props:{
    },
    mounted(){
      this.$refs.mySearch.focus();
    }
  }
</script>

<style scoped>
.search-input img{
  margin-left:15px;
}
.search-input input{
  margin-left:10px;
}
input{
  width:100%;
  border:none;
  background-color:#f5f5f5;
}
input:focus{
  outline:none;
}
.search-input{
  margin:5px 0px;
  margin-right:10px;
  font-size:16px;
  display:flex;
  align-items:center;
  height:38px;
  width:80%;
  border-radius:10px;
  border:1px solid gray;
}
.search-nav{
      display:flex;
      justify-content:center;
}
button{
      border:none;
      background-color: transparent;
      font-size:16px;
      color:lightblue;      
      }
.title{
  display:flex;
  align-items:center;
}
</style>
