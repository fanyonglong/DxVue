<template>
 <div>
     <div class="left">
           <router-link to="/input">input</router-link>

     </div>
     <div class="right">
          <router-view></router-view>
    </div>
</div>
</template>

<style >
.left{
    width:280px;
}
.right{
    width:100%;
    margin-left: 280px;
}
:root { 
  --red: #d33;
}
a { 
  &:hover {
    color: color(var(--red) a(54%));
  }
}
::placeholder {
  color: gray;
}
</style>

<script>
export default {
  name:'app'
}
</script>
