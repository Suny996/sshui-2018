<template>
  <div>
  </div>
</template>

<script>

  export default {
    name: "OrgQuery",
    data() {
      return {
      }
    },
    props: {
      listUrl: {type: String, default: '/system/org/0/tree'}
    },
    created:function(){
      this.$PageUtil.get(this);
    }
  }
</script>

<style scoped>

</style>
