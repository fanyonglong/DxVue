<template>
  <div class="input-container">
        <input type="text" v-model="name">{{name}}
  </div>
</template>
<style>
.input-container{
  border: solid 1px red;
}

</style>
<script>
export default {
        data()
        {
            return {name:"11144"}
        },
        props:{
          width:String
        },
        created()
        {
            // this._renderCell=function(h)
            // {
            //   return <div>43</div>;
            // }
        }
}
</script>
