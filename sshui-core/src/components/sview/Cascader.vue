<template>
  <div>
    <Cascader :data='listData'
              :value='value'
              :render-format='renderFormat'
              :disabled='disabled'
              :clearable='clearable'
              :placeholder='placeholder'
              :trigger='trigger'
              :change-on-select='changeOnSelect'
              :size='size'
              :load-data='loadData'
              :filterable='filterable'
              :not-found-text='notFoundText'
              :transfer='transfer'
              :element-id='elementId'
              @on-change="handChange" @on-visible-change="handVisibleChange">
    </Cascader>
  </div>
</template>


<script>
  import {Cascader} from 'iview'

  export default {
    name: "sCascader",
    data() {
      return {
        listData: []
      };
    },
    components: {
      Cascader
    },
    props: {
      dict: {type: String}, renderFormat: {
        type: Function,
        default(label) {
          return label.join(' / ');
        }
      }, changeOnSelect: {
        type: Boolean,
        default: false
      }, loadData: {
        type: Function
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
        mixins: [Cascader]
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
    },
    methods: {
      handChange(value, selectedData) {
        this.$emit('input', value);
        this.$emit('on-change', value, selectedData);
      },
      handVisibleChange(visible) {
        this.$emit('on-visible-change', visible);
      }
    }
  }
  ;
</script>

<style scoped>

</style>
