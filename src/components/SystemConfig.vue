<template>
  <el-form
    :model="configInfo"
    :rules="rules"
    label-position="left"
    label-width="200px"
    style="width: 800px;height: 600px; margin: 100px;margin-left: 150px" >
    <el-row>
      <el-col :span="6">
        <div>
          <el-form-item label="班组长级推送触发时间:" prop="forcemanPushTime">
            <el-input-number v-model="configInfo.forcemanPushTime"/>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>
          <el-form-item label="主任级推送触发时间:" prop="masterPushTime">
            <el-input-number v-model="configInfo.masterPushTime"/>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>
          <el-form-item label="经理级推送触发时间:" prop="masterPushTime">
            <el-input-number v-model="configInfo.ManagerPushTime"/>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div>
          <el-form-item label="前日汇总推送时刻:" prop="sumPushTimer">
            <el-time-picker style="width: 180px" placeholder="请选择推送时刻" v-model="configInfo.sumPushTimer" />
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col >
          <span style="margin-left: 100px">
          <el-button @click="dVisible = false">取 消</el-button>
          <el-button @click="submitEmployeeInfo" type="primary">确 定</el-button>
        </span>
      </el-col>
    </el-row>
  </el-form>

</template>

<script>
  export default {
    name: 'SystemConfig',
    rules: [],
    data () {
      return {
        dVisible: true,
        configInfo: {
          forcemanPushTime: '10',
          masterPushTime: '20',
          ManagerPushTime: '30',
          sumPushTimer: new Date(),
        }
      }
    },
    methods: {
      handleClose () {
        this.dVisible = false
      },
      submitEmployeeInfo () {
        this.$emit('submitted','wori');
      },
      show () {
        this.dVisible = true
      }
    }
  }
</script>

<style scoped>

</style>
