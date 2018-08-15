<template>
  <div>
    <Select :value='value' :disabled='disabled' :clearable='clearable' :filterable='filterable'
            :remote='remote' :remote-method='remoteMethod' :loading='loading' :loading-text='loadingText'
            :label='label' :size='size' :placeholder='placeholder' :not-found-text='notFoundText'
            :label-in-value='labelInValue' :placement='placement' :transfer='transfer' :element-id='elementId'
            @on-change="handChange" @on-query-change="handQueryChange" @on-clear="handClear"
            @on-open-change="handOpenChange" style="width: 70px">
      <iOption value="=" key="eq" label="等于"></iOption>
      <iOption value="!=" key="neq" label="不等于"></iOption>
      <iOption v-if="type!='Number'" value="like" key="like" label="包含"></iOption>
      <iOption v-if="type!='Number'" value="not like" key="nlike" label="不包含"></iOption>
      <iOption v-if="type=='Number'" value=">" key="gt" label="大于"></iOption>
      <iOption v-if="type=='Number'" value="<" key="lt" label="小于"></iOption>
    </Select>
  </div>
</template>

<script>
  import {Select} from 'iview'

  export default {
    name: "Operator",
    data() {
      return {}
    },
    components: {
      Select
    },
    props: {
      type: {type: String, default: 'text'}, remoteMethod: {
        type: Function
      }, loadingText: {
        type: String
      }, notFoundText: {
        type: String
      }, labelInValue:
        {
          type: Boolean,
          default:
            false
        },
      elementId: {
        type: String
      }
    },
    extends:
      {
        mixins: [Select]
      }
    ,
    methods: {
      handChange(option) {
        this.$emit('input', option);
        this.$emit('on-change', option);
      }
      ,
      handQueryChange(query) {
        this.$emit('on-query-change', query);
      }
      ,
      handClear(event) {
        this.$emit('on-clear', event);
      }
      ,
      handOpenChange(event) {
        this.$emit('on-open-change', event);
      }
    }
  }
  ;
</script>

<style scoped>

</style>
