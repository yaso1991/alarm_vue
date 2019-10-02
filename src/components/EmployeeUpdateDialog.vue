<template>
  <el-dialog
    :before-close="handleClose"
    :visible.sync="dVisible"
    style="text-align: center"
    title="修改员工资料"
    width="600px">
    <el-form
      :model="employeeInfo"
      :rules="rules"
      label-position="right"
      label-width="80px"
      style="padding-left: 140px"
      ref="addEmployeeInfoForm">
      <el-row>
        <el-col :span="6">
          <div>
            <el-form-item label="姓名:" prop="name">
              <el-input placeholder="请输入员工姓名" prefix-icon="el-icon-edit" style="width: 200px" v-model="employeeInfo.name" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div>
            <el-form-item label="工号:" prop="workId">
              <el-input placeholder="请输入工号" prefix-icon="el-icon-edit" style="width: 200px" v-model="employeeInfo.workId" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div>
            <el-form-item label="推送等级:" prop="pushLevel">
              <el-select
                placeholder="选择推送等级"
                style="width: 200px"
                v-model="employeeInfo.pushLevel">
                <el-option
                  :key="item"
                  :label="item"
                  :value="item"
                  v-for="item in pushLevels">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <div>
            <el-form-item label="电子邮箱:" prop="email">
              <el-input placeholder="请输入电子邮箱" prefix-icon="el-icon-edit" style="width: 200px" v-model="employeeInfo.email" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <span>
          <el-button @click="dVisible = false">取 消</el-button>
          <el-button @click="submitEmployeeInfo" type="primary">确 定</el-button>
        </span>
        </el-col>
      </el-row>

    </el-form>
  </el-dialog>

</template>

<script>
  export default {
    name: 'EmployeeUpdateDialog',
    rules: [],
    data () {
      return {
        dVisible: false,
        employeeInfo: {
          id: '',
          name: '',
          workId: '',
          pushLevel: '',
          email: ''
        },
        pushLevels:[
          '员工级',
          '班组长级',
          '主任级',
          '经理级'
        ]
      }
    },
    methods: {
      handleClose () {
        this.dVisible = false
      },
      submitEmployeeInfo () {
      },
      show (employee) {
        this.employeeInfo = employee;
        this.dVisible = true
      }
    }
  }
</script>

<style scoped>

</style>

