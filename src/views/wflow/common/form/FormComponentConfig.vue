<template>
  <div>
    <el-form label-width="90px" v-if="form.name !== 'SpanLayout'">
      <el-form-item label="表单ID">
        <el-input size="small" disabled v-model="form.id"/>
      </el-form-item>
      <el-form-item label="表单名称">
        <el-input size="small" clearable v-model="form.title"/>
      </el-form-item>
      <component :is="form.name" v-model="form.props"/>
      <el-form-item label="必填项">
        <el-switch v-model="form.props.required"></el-switch>
      </el-form-item>
      <el-form-item label="可打印">
        <el-switch v-model="form.props.enablePrint"></el-switch>
      </el-form-item>
    </el-form>
    <el-empty v-else description="当前组件不支持配置"></el-empty>
  </div>

</template>

<script>
import TextInput from './config/TextInputConfig.vue'
import NumberInput from './config/NumberInputConfig.vue'
import AmountInput from './config/AmountInputConfig.vue'
import TextareaInput from './config/TextareaInputConfig.vue'
import MultipleSelect from './config/SelectInputConfig.vue'
import SelectInput from './config/SelectInputConfig.vue'
import TimePicker from './config/TimePickerConfig.vue'
import TimeRangePicker from './config/TimeRangePickerConfig.vue'
import DateTime from './config/DateTimeConfig.vue'
import DateTimeRange from './config/DateTimeRangeConfig.vue'
import ImageUpload from './config/ImageUploadConfig.vue'
import FileUpload from './config/FileUploadConfig.vue'
import Description from './config/DescriptionConfig.vue'
import MoneyInput from './config/MoneyInputConfig.vue'
import DeptPicker from './config/DeptPickerConfig.vue'
import UserPicker from './config/UserPickerConfig.vue'
import TableList from './config/TableListConfig.vue'
import Location from './config/LocationConfig.vue'
import Provinces from './config/ProvincesConfig.vue'
import SignPanel from './config/SignPanelConfig.vue'
import ProcessIndex from './config/ProcessIndexConfig.vue'
import Score from './config/ScoreConfig.vue'
import WebIframe from './config/WebIframeConfig.vue'
import VueContainer from './config/VueContainerConfig.vue'
import CalcFormula from './config/CalcFormulaConfig.vue'

export default {
  name: "FormComponentConfig",
  components: {
    TextInput,
    NumberInput,
    AmountInput,
    TextareaInput,
    SelectInput,
    MultipleSelect,
    TimePicker,
    TimeRangePicker,
    DateTime,
    DateTimeRange,
    ImageUpload,
    FileUpload,
    Description,
    MoneyInput,
    DeptPicker,
    UserPicker,
    TableList,
    Location,
    Provinces,
    SignPanel,
    Score,
    WebIframe,
    VueContainer,
    ProcessIndex,
    CalcFormula
  },
  props:{},
  computed:{
    form(){
      return this.$store.state.selectFormItem
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

</style>
