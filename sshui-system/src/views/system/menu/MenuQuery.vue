<template>
  <div>
  </div>
</template>

<script>

  export default {
    name: "MenuQuery",
    data() {
      return {
      }
    },
    props: {
      listUrl: {type: String, default: '/system/menu/00/tree'}
    },
    created:function(){
      this.$PageUtil.get(this);
    }
  }
</script>

<style scoped>

</style>
