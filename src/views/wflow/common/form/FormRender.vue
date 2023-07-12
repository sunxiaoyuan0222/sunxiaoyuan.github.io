<template>
  <!--渲染表单-->
  <div>
    <el-form v-if="mode === 'PC'" ref="form" class="process-form" label-position="top" :rules="rules" :model="_value">
      <div :class="{readonly: isReadonly(item)}" v-show="showItem(item)" v-for="(item, index) in forms"
           :key="item.name + index">
        <el-form-item v-if="item.name !== 'SpanLayout' && item.name !== 'Description'" :prop="item.id"
                      :label="item.title">
          <form-design-render :readonly="isReadonly(item)" :ref="item.id" v-model="_value[item.id]" :formData="_value"
                              :mode="mode" :config="item"/>
        </el-form-item>
        <form-design-render :ref="item.id" :readonly="isReadonly(item)" v-else v-model="_value" :formData="_value"
                            :mode="mode" :config="item"/>
      </div>
    </el-form>
    <div v-else class="process-form">
      <div :class="{readonly: isReadonly(item)}" v-show="showItem(item)" v-for="(item, index) in forms"
           :key="item.name + index">
        <form-item v-if="item.name !== 'SpanLayout' && item.name !== 'Description'" :model="_value"
                   :rule="rules[item.id]"
                   :ref="item.id" :prop="item.id" :label="item.title">
          <form-design-render :readonly="isReadonly(item)" :formData="_value" :ref="item.id + '_item'"
                              v-model="_value[item.id]" :mode="mode" :config="item"/>
        </form-item>
        <form-design-render :ref="item.id" :readonly="isReadonly(item)" :formData="_value" v-else v-model="_value"
                            :mode="mode" :config="item"/>
      </div>

    </div>
  </div>

</template>

<script>
import {Field, Form} from "vant";
import FormItem from "@/components/common/FormItem";
import FormDesignRender from '@/views/wflow/admin/layout/form/FormDesignRender'

const VForm = Form
export default {
  name: "FormRender",
  components: {FormItem, FormDesignRender, VForm, Field},
  props: {
    forms: {
      type: Array,
      default: () => {
        return []
      }
    },
    process: {
      type: Object,
      default: () => {
        return {}
      }
    },
    //当前节点，用来联动表单权限
    currentNode: {
      type: String,
      default: null
    },
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    mode: {
      type: String,
      default: 'PC'
    }
  },
  data() {
    return {
      formRules: {},
    }
  },
  computed: {
    _value: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    rules() {
      let rules = {}
      this.loadFormConfig(this.forms, rules)
      return rules
    }
  },

  methods: {
    showItem(item) {
      return (!(this.isReadonly(item) && this.isBlank(this._value[item.id]))) || item.name === 'SpanLayout'
    },
    isBlank(val) {
      return !this.$isNotEmpty(val) ||
          ((val instanceof String) && val.trim() === '')
          || (Array.isArray(val) && val.length === 0)
    },
    isReadonly(item) {
      return item.perm === 'R'
    },
    validate(call) {
      let success = true
      console.log(this.rules)
      if (this.mode === 'PC') {
        this.$refs.form.validate(valid => {
          success = valid
          if (valid) {
            //校验成功再校验内部
            for (let i = 0; i < this.forms.length; i++) {
              if (this.forms[i].name === 'TableList') {
                let formRef = this.$refs[this.forms[i].id]
                if (formRef && Array.isArray(formRef) && formRef.length > 0) {
                  formRef[0].validate(subValid => {
                    success = subValid
                  })
                  if (!success) {
                    break
                  }
                }
              }
            }
          }
          call(success)
        });
      } else {
        this.forms.forEach(form => {
          let formRef = this.$refs[form.id]
          if (formRef && Array.isArray(formRef) && formRef.length > 0) {
            formRef[0].validate(subValid => {
              console.log('校验' + form.title, form.id, subValid)
              if (!subValid) {
                success = false
              }
            })
            if (form.name === 'TableList') {
              //扫描明细表项
              this.$refs[form.id + '_item'][0].validate(subValid => {
                if (!subValid) {
                  success = false
                }
              })
            }
          }
        })
        call(success)
      }
    },
    loadFormConfig(forms, rules) {
      forms.forEach(item => {
        if (item.name === 'SpanLayout') {
          this.loadFormConfig(item.props.items, rules)
        } else {
          this.$set(this._value, item.id, this.value[item.id])
          if (item.props.required && this.showItem(item)) {
            this.$set(rules, item.id, [{
              type: item.valueType === 'Array' ? 'array' : undefined,
              required: true,
              message: `请完成${item.title}`, trigger: 'blur'
            }])
          }
        }
      })
    },
    isRequired(item) {
      return this.rules[item.id] !== undefined
    }
  }
}
</script>

<style lang="less" scoped>
.process-form {
  /deep/ .el-form-item__label {
    height: 30px;
    line-height: 30px;
    padding: 0 0;
    font-weight: normal;
  }

  /deep/ .van-cell {
    padding: 10px 0;
    font-size: 1.2rem;
  }
}

/deep/ .readonly {
  font-size: 16px;

  .el-form-item {
    margin-bottom: 10px;

    .el-form-item__label::before {
      display: none;
    }

    .el-form-item__content {
      padding-left: 5px;
      line-height: 30px;
    }
  }

  .m-form-item {
    padding: 10px 5px;
    margin-bottom: 0;

    .m-form-item_title {
      font-size: 16px;

      .title-required {
        display: none;
      }
    }

    .m-form-item_content {
      padding-left: 4px;
    }
  }
}
</style>
