<template xmlns:el-col="http://www.w3.org/1999/html">
  <el-dialog
    :before-close="handleClose"
    :visible.sync="dVisible"
    style="text-align: center"
    title="添加员工资料"
    width="600px">
    <el-form
      :model="employeeInfo"
      :rules="rules"
      label-position="right"
      label-width="100px"
      ref="formOfAddEmployeeInfo"
      size="small"
      style="margin-left: 100px">
      <el-row>
        <el-col :span="12">
          <div>
            <el-form-item inline-message="true" label="姓名:" prop="name">
              <el-input placeholder="请输入员工姓名" prefix-icon="el-icon-edit" style="width: 200px"
                        v-model="employeeInfo.name"/>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
            <el-form-item label="工号:" prop="workId">
              <el-input placeholder="请输入工号" prefix-icon="el-icon-edit" style="width: 200px"
                        v-model="employeeInfo.workId"/>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
            <el-form-item label="职务:" prop="position">
              <el-select
                placeholder="选择职务"
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
              <el-input placeholder="请输入电子邮箱" prefix-icon="el-icon-edit" style="width: 200px"
                        v-model="employeeInfo.email"/>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span style="margin-left: 80px">
          <el-button @click="submitEmployeeInfo" size="small" type="primary">确 定</el-button>
            <el-button @click="dVisible = false" size="small">取 消</el-button>
        </span>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    name: 'EmployeeAddedDialog',

    data () {
      return {
        dVisible: false,
        employeeInfo: {
          id: '',
          name: '',
          workId: '',
          position: '员工',
          email: ''
        },
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
        positions: [
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
        this.$refs.formOfAddEmployeeInfo.validate(valid => {
          if (valid) {
            this.axios({
              method: 'post',
              url: '/employeeInfo/addEmployee',
              data: this.employeeInfo
            }).then(res => {
              if (res && res.status == 200 && res.data) {
                alert('添加成功')
                this.dVisible = false
                return
              }
              alert('添加失败')
            }).catch(err => {
              alert(err)
            })
          }
        })
      },
      show () {
        this.dVisible = true
      }
    }
  }
</script>

<style scoped>

</style>
