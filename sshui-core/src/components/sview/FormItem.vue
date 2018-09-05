<template>
  <div>
    <Col :span='span'
         :order='order'
         :offset='offset'
         :push='push'
         :pull='pull'
         :class-name='className'
         :xs='lxs'
         :sm='lsm'
         :md='lmd'
         :lg='llg'>
      <FormItem :prop='prop'
                :label='label'
                :label-width='labelWidth'
                :label-for='labelFor'
                :required='required'
                :rules='rules'
                :error='error'
                :show-message='showMessage'>
        <slot></slot>
      </FormItem>
    </Col>

  </div>
</template>

<script>
  import {FormItem, Col} from 'iview'

  export default {
    name: "sFormItem",
    data() {
      return {
        llg: this._lg,
        lmd: this._md,
        lsm: this._sm,
        lxs: this._xs
      };
    },
    components: {
      FormItem, Col
    },
    props: {
      labelWidth: {
        type: Number
      },
      labelFor: {
        type: String
      },
      showMessage: {
        type: Boolean, default: true
      },
      className: {
        type: String
      },
      xs: {
        type: [Number, Object]
      },
      sm: {
        type: [Number, Object]
      },
      md: {
        type: [Number, Object]
      },
      lg: {
        type: [Number, Object]
      }
    },
    extends: {
      mixins: [FormItem, Col]
    },
    created: function () {
      if (this.lg) {
        this.llg = this.lg;
      }
      if (this.md) {
        this.lmd = this.md;
      }
      if (this.sm) {
        this.lsm = this.sm;
      }
      if (this.xs) {
        this.lxs = this.xs;
      }
    }
  }
</script>

<style scoped>

</style>
