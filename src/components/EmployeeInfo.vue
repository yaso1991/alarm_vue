<template>
  <div style="text-align: left">
    <el-row :gutter="10" style="margin-bottom: 10px">
      <el-col span="12">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          size="small"
          style="width: 240px"
          v-model="searchKey">
        </el-input>
        <el-button @click=" searchShow = !searchShow" icon="el-icon-search" size="small" style="margin-left: 0px"
                   type="primary">搜索
        </el-button>
        <el-button @click="showAddedDialog" icon="el-icon-plus" plain="true" size="small" style="margin-left: 0px"
                   type="primary">添加
        </el-button>
        <el-button @click="showUpdateDialog" icon="el-icon-upload" plain="true" size="small" style="margin-left: 0px"
                   type="primary">
          修改
        </el-button>
        <el-button @click="handleDelete" icon="el-icon-close" plain="true" size="small" style="margin-left: 0px"
                   type="danger">删除
        </el-button>
        <span>
            <el-button @click="" icon="el-icon-top" plain="true" size="small" type="primary">导出</el-button>
        </span>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div class="transition-box"
           style="margin: 10px 0px;border-radius: 3px;border: #E4E7ED solid 1px;padding-top: 20px;padding-left: 20px"
           v-show="searchShow">
        <el-row>
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-col :span="16">
              <el-form-item label="姓名:">
                <el-input placeholder="请输入姓名" size="small" v-model="searchForm.name"/>
              </el-form-item>
              <el-form-item label="工号:">
                <el-input placeholder="请输入工号" size="small" v-model="searchForm.workId"/>
              </el-form-item>
              <el-form-item label="推送等级:">
                <el-input placeholder="请输入推送等级" size="small" v-model="searchForm.pushLevel"/>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="text-align:right">
              <el-form-item>
                <el-button @click="onSubmit" size="small" type="primary">查询</el-button>
                <el-button @click="searchShow = false" size="small" type="danger">取消</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-collapse-transition>
    <el-row>
      <EmployeeAddedDialog ref="employeeAddedDialog"/>
      <EmployeeUpdateDialog ref="employeeUpdateDialog"/>
    </el-row>
    <el-row style="margin-bottom: 10px">
      <el-table
        :data="tableShowData"
        @selection-change="handleSelectChange"
        border
        height="800"
        max-height="800"
        size="mini"
        stripe
        style="width: 100%">
        <el-table-column
          align="center"
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          align="center"
          fixed
          label="员工姓名"
          prop="name"
          width="400">
        </el-table-column>
        <el-table-column
          align="center"
          label="员工编号"
          prop="workId"
          width="400">
        </el-table-column>
        <el-table-column
          align="center"
          label="推送等级"
          prop="position"
          width="300">
        </el-table-column>
        <el-table-column
          align="center"
          label="电子邮件"
          prop="email"
          width="550">
        </el-table-column>
      </el-table>
    </el-row>

  </div>
</template>

<script>
  import EmployeeAddedDialog from './EmployeeAddedDialog'
  import EmployeeUpdateDialog from './EmployeeUpdateDialog'

  export default {
    name: 'EmployeeInfo',
    components: {
      EmployeeAddedDialog,
      EmployeeUpdateDialog
    },
    data () {
      return {
        searchForm: {
          name: '',
          workId: '',
          pushLevel: ''
        },
        alarmPoints: [
          '1号线中轧测厚',
          '2号线中轧测厚',
          '3号线中轧测厚',
          '4号线中轧测厚',
          '5号线中轧测厚',
          '6号线中轧测厚',
        ],
        searchShow: false,
        searchKey: '',
        tableShowData: [],
        employees: [],
        selectedColums: []
      }
    },
    methods: {
      handleDelete () {
        if (this.selectedColums.length <= 0) {
          alert('请先选择需要删除的员工资料.')
          return
        }
        if (!confirm('确认删除所选员工的资料?')) {
          return
        }
        //TODO 删除员工资料
        alert('删除成功.')

      },
      handleUpdate () {
        if (this.selectedColums.length == 1) {
          this.$refs.employeeUpdateDialog.show(this.selectedColums[0])
        }
      },
      loadAllEmployees () {
        this.axios({
          url: '/employeeInfo'
        }).then(res => {
          if (res && res.status == 200) {
            this.employees = res.data
            this.tableShowData =  this.employees;
            return
          }
          alert('载入失败')
        }).catch(err => {
          alert(err)
        })
      },
      handleSearchEmployee () {
      },
      handleSelectChange (selection) {
        this.selectedColums = selection
      },
      showAddedDialog () {
        this.$refs.employeeAddedDialog.show()
      },
      showUpdateDialog () {
        if (this.selectedColums.length != 1) {
          alert('每次只能修改一个员工的资料.')
          return
        }
        this.$refs.employeeUpdateDialog.show(this.selectedColums[0])
      },
    },
    mounted: function () {
      this.loadAllEmployees()
    }
  }

</script>

<style scoped>

</style>

