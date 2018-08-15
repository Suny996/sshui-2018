<template>
  <div>
    <Select :value='value' :multiple='multiple' :disabled='disabled' :clearable='clearable' :filterable='filterable'
            :remote='remote' :remote-method='remoteMethod' :loading='loading' :loading-text='loadingText'
            :label='label' :size='size' :placeholder='placeholder' :not-found-text='notFoundText'
            :label-in-value='labelInValue' :placement='placement' :transfer='transfer' :element-id='elementId'
            @on-change="handChange" @on-query-change="handQueryChange" @on-clear="handClear"
            @on-open-change="handOpenChange">
      <template v-for="item in listData">
        <iOptionGroup v-if="item.children" :label="item.label">
          <iOption v-for="item2 in item.children" :value="item2.value" :key="item2.key" :label="item2.label"></iOption>
        </iOptionGroup>
        <iOption v-else :value="item.value" :key="item.key" :label="item.label"></iOption>
      </template>
    </Select>
  </div>
</template>

<script>
  import {Select} from 'iview'

  export default {
    name: "sSelect",
    data() {
      return {
        listData: []
      };
    },
    components: {
      Select
    },
    props: {
      dict: {type: String}, remoteMethod: {
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
    mounted: function () {
      if (this.dict) {
        this.$axios.get("/plist/" + this.dict).then(res => {
          console.log(JSON.stringify(res.data));
          //this.listData=[];
          this.listData = res.data;
          //console.log(this.listData);
        }).catch(error => {
          console.log(error);
        });
      }
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
