<template>
  <div class="process-node-render">
    <div>
      <div style="font-size: 16px">{{ task.title }}</div>
      <span style="color:#a8adaf;" v-if="task.users">{{ desc }}</span>
    </div>
    <div style="display:flex;">
      <avatar :closeable="user.enableEdit" @close="delUser(i)" :size="38" showY :src="user.avatar"
              :type="user.type" :name="user.name" v-for="(user, i) in task.users" :key="'user_'+i"></avatar>
      <span class="add-user" v-if="task.enableEdit && (task.multiple || task.users.length === 0)" @click="$emit('addUser', task)">
        <i class="el-icon-plus"></i>
        <div>添加</div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProcessNodeRender",
  props:{
    desc:{
      type: String,
      required: '',
    },
    task:{
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    delUser(i) {
      this.task.users.splice(i, 1)
      this.$emit('delUser', this.task.id, i)
    },
  }
}
</script>

<style lang="less" scoped>
.add-user {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  i {
    padding: 10px;
    font-size: 1.1rem;
    border-radius: 50%;
    border: 1px dashed #8c8c8c;
    cursor: pointer;

    &:hover {
      color: @theme-primary;
      border: 1px dashed @theme-primary;
    }
  }
}
</style>
