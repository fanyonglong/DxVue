<template>
 <div>
     <div class="left">
           <router-link :to="{name:'input'}">input</router-link>
      <router-link to="/list">list</router-link>
     </div>
     <div class="right">
  <router-view></router-view>
    </div>
</div>
</template>
<script>
export default {
  name:'app'
}
</script>
<style >

.left{
   border: solid 1px red;
   height: 200px;
   width: 300px;
}
@custom-media --viewport-medium (width <= 50rem);
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

:root {
  --fontSize: 1rem;
  --mainColor: #12345678;
}

@media (--viewport-medium) {
  body {
    color: var(--mainColor);
    font-family: system-ui;
    font-size: var(--fontSize);
    line-height: calc(var(--fontSize) * 1.5);
    overflow-wrap: break-word;
    padding-inline: calc((var(--fontSize) / 2) + 1px);
  }
}

:--heading {
  margin-block: 0;
}

a {
  color: rebeccapurple;

  &:hover {
    color: color-mod(var(--mainColor) b(15%) a(20%));
  }
}
</style>