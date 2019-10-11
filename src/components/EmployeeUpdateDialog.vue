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
      ref="formOfFixEmployeeInfo">
      <el-row>
        <el-col :span="12">
          <div>
            <el-form-item label="姓名:" prop="name">
              <el-input placeholder="请输入员工姓名" prefix-icon="el-icon-edit" style="width: 200px" v-model="employeeInfo.name" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
            <el-form-item label="工号:" prop="workId">
              <el-input placeholder="请输入工号" prefix-icon="el-icon-edit" style="width: 200px" v-model="employeeInfo.workId" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
            <el-form-item label="推送等级:" prop="position">
              <el-select
                placeholder="选择推送等级"
                style="width: 200px"
                v-model="employeeInfo.position">
                <el-option
                  :key="item"
                  :label="item"
                  :value="item"
                  v-for="item in positions">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
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
          <el-button @click="submitEmployeeInfo" type="primary">确 定</el-button>
            <el-button @click="dVisible = false">取 消</el-button>
        </span>
        </el-col>
      </el-row>

    </el-form>
  </el-dialog>

</template>

<script>
  export default {
    name: 'EmployeeUpdateDialog',
    data () {
      return {
        dVisible: false,
        rules: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          workId: [
            {required: true, message: '请输入工号', trigger: 'blur'},
            {pattern: /^[0-9]+$/, message: '工号只能是数字', trigger: 'blur'}
          ],
          email: [
            {type: 'email', required: false, message: '邮件格式不正确', trigger: 'blur'}
          ]
        },
        employeeInfo: {
          id: '',
          name: '',
          workId: '',
          position: '',
          email: ''
        },
        positions:[
          '员工',
          '班组长',
          '主任',
          '经理'
        ]
      }
    },
    methods: {
      handleClose () {
        this.dVisible = false
      },
      submitEmployeeInfo () {
        this.$refs.formOfFixEmployeeInfo.validate(valid=>{
          if(valid) {
            this.axios({
              method: 'post',
              url: '/employeeInfo/fixEmployee',
              data: this.employeeInfo
            }).then(res => {
              if (res && res.status == 200 && res.data) {
                alert('修改成功')
                this.dVisible = false
                return
              }
              alert('修改失败')
            }).catch(err => {
              alert(err)
            })
          }
        })
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

