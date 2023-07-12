<template>
  <div>
    <div v-if="mode === 'DESIGN'">
      <el-select class="max-fill" v-if="!expanding" size="medium" v-model="_value" disabled :placeholder="placeholder"/>
      <el-radio-group v-model="_value" v-else>
        <el-radio class="w-row-text" style="margin: 5px" disabled v-for="(op, index) in options" :key="index" :label="op">{{op}}</el-radio>
      </el-radio-group>
    </div>
    <div v-else-if="mode === 'PC' && !readonly">
      <el-select class="max-fill" v-if="!expanding" v-model="_value" size="medium" clearable  :placeholder="placeholder" @change="onchangeselect">
        <el-option v-for="(op, index) in options" :key="index" :value="op" :label="op"></el-option>
      </el-select>
      <el-radio-group v-model="_value" v-else>
        <el-radio class="w-row-text" style="margin: 5px" v-for="(op, index) in options" :key="index" :label="op">{{op}}</el-radio>
      </el-radio-group>
    </div>
    <div v-else-if="mode === 'MOBILE' && !readonly">
<!--      <div v-if="!expanding">
        <field right-icon="arrow" readonly clickable :value="_value" :placeholder="placeholder" @click="showPicker = true"/>
        <popup v-model="showPicker" position="bottom">
          <picker :title="placeholder" show-toolbar :columns="options" @confirm="onConfirm" @cancel="showPicker = false"></picker>
        </popup>
      </div>-->
      <radio-group  v-model="_value" direction="horizontal">
        <radio style="margin: 5px" v-for="(op, index) in options" :key="index" :name="op">{{op}}</radio>
      </radio-group>
    </div>
    <div v-else>
      {{_value}}
    </div>
  </div>
</template>

<script>
import { Field, Popup, Picker, Radio, RadioGroup } from 'vant';
import componentMinxins from '../ComponentMinxins'

export default {
  mixins: [componentMinxins],
  name: "SelectInput",
  components: {Radio, RadioGroup, Picker, Field, Popup},
  props:{
    value:{
      type: String,
      default: null
    },
    placeholder:{
      type: String,
      default: '请选择选项'
    },
    expanding:{
      type: Boolean,
      default: false
    },
    options:{
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      showPicker: false
    }
  },
  methods: {
    onConfirm(val){
      this.showPicker = false
      this._value = val
    },
    onchangeselect(val) {
      if (this.$store.state.design.formId == 'wf648fd4bc62b88643e7f166b1') {
        if(val == '其他'){
            this.$store.state.design.formItems.push({
            icon: "el-icon-more-outline",
            id: "field5817158379722",
            name: "TextareaInput",
            perm: "E",
            props: {
              enablePrint: true,
              enableScan: false,
              required: true,
            },
            title: "备注",
            value: "",
            valueType: "String",
          })
        }else if (val == '公开招标' | val == '竞争性谈判'| val == '邀请招标'| val == '单一来源'| val == '询价比价'| val == '定点采购'| val == '政采云商城'){
            this.$store.state.design.formItems = this.$store.state.design.formItems.filter(item => {
            if(item.title != '备注'){
                return item
            }
          })
        }
      } 
      if (this.$store.state.design.formId == 'wf647dbcca62b8bb5638e31180') {
        if(val != '现金' && val != '其他'){
            this.$store.state.design.formItems.splice(4,0,{
            icon: "el-icon-more-outline",
            id: "field3313061831637",
            name: "NumberInput",
            perm: "E",
            props: {
              enablePrint: true,
              placeholder: "请输入银行账号",
              required: true,
            },
            title: "银行账号",
            value: "",
            valueType: "Number",
          }
          )
          this.$store.state.design.formItems.splice(5,0,{
            icon: "el-icon-edit",
            id: "field4822861853559",
            name: "TextInput",
            perm: "E",
            props: {
              enablePrint: true,
              enableScan: false,
              placeholder: "请输入开户行",
              required: true,
            },
            title: "开户行",
            value: "",
            valueType: "String",
          }
          )
        }else {
            this.$store.state.design.formItems = this.$store.state.design.formItems.filter(item => {
            if(item.title != '银行账号' && item.title != '开户行'){
                return item
            }
          })
        }
      } 
      
    }
  }
}
</script>

<style scoped>

</style>
