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
        <el-button
          @click="searchInTable"
          icon="el-icon-search"
          size="small"
          type="primary">
          搜索
        </el-button>
      </el-col>
      <el-col span="12" style="text-align: right;">
        <el-button @click="showDialog" plain="true" size="small" type="primary">添加</el-button>
        <el-button @click="handleDelete" plain="true" size="small" type="danger">删除</el-button>
        <el-button @click="handleUpdate" plain="true" size="small">修改</el-button>
      </el-col>
    </el-row>
    <el-row>
      <EmployeeAddedDialog ref="employeeAddedDialog"></EmployeeAddedDialog>
      <EmployeeUpdateDialog ref="employeeUpdateDialog"></EmployeeUpdateDialog>
    </el-row>
    <el-row style="margin-bottom: 10px">
      <el-table
        :data="tableShowData"
        @selection-change="handleSelectChange"
        border
        height="820"
        size="mini"
        stripe
        style="width: 100%">
        <el-table-column
          align="left"
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column
          align="left"
          fixed
          label="名称"
          prop="name"
          width="150">
        </el-table-column>
        <el-table-column
          label="类型"
          prop="type"
          width="150">
        </el-table-column>
        <el-table-column
          align="left"
          label="打卡器"
          prop="gunDescript"
          width="100">
          <template slot-scope="scope"></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="监控状态"
          prop="state"
          width="100">
        </el-table-column>
        <el-table-column
          label="报警状态"
          prop="alarming"
          width="100">
        </el-table-column>
        <el-table-column
          label="报警时间"
          prop="alarmTime"
          width="200">
        </el-table-column>
        <el-table-column
          label="报警时长"
          prop="alarmSpan"
          width="100">
        </el-table-column>
        <el-table-column
          label="班组长级推送"
          prop="lowPush"
          width="100">
        </el-table-column>
        <el-table-column
          align="left"
          label="主任级推送"
          prop="midPush"
          width="100">
        </el-table-column>
        <el-table-column
          label="经理级推送"
          prop="highPush"
          width="100">
        </el-table-column>
        <el-table-column
          align="left"
          label="员工编号"
          prop="employeeNo"
          width="150">
        </el-table-column>
        <el-table-column
          align="left"
          label="员工姓名"
          prop="employeeName"
          width="100">
        </el-table-column>
        <el-table-column
          align="left"
          label="组长编号"
          prop="masterNo"
          width="150">
        </el-table-column>
        <el-table-column
          align="left"
          label="组长姓名"
          prop="masterName"
          width="100">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  import moment from 'moment'
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
        searchKey: '',
        tableShowData: [],
        alarmInfo: [],
        selectedColums: []
      }
    },
    methods: {
      handleDelete () {
        if (this.selectedColums.length <= 0) {
          return
        }
        if (!confirm('确认删除?')) {
          return
        }
        let deleteIds = []
        for (let index in this.selectedColums) {
          deleteIds.push(this.selectedColums[index].id)
        }
        this.axios({
          method: 'post',
          url: '/employeeInfo/deleteEmployees',
          data: deleteIds,
        }).then(resp => {
          if (resp && resp.status == 200 && resp.data == true) {
            alert('删除成功')
            this.getInfosByPage(1)
            return
          }
          alert('删除失败')
        })
      },
      handleUpdate () {
        if (this.selectedColums.length == 1) {
          this.$refs.employeeUpdateDialog.show(this.selectedColums[0])
        }
      },
      getInfosByPage (page, size = 20) {
        // this.tableLoading = true;
        // this.axios({
        //     method: 'get',
        //     url: '/employeeInfo/checkInfos',
        //     params: {
        //         page: page,
        //         size: size
        //     },
        //
        // }).then(resp => {
        //     this.tableLoading = false;
        //     if (resp && resp.status == 200) {
        //         this.employees = resp.data;
        //         this.tableShowData = this.employees;
        //     }
        // })
      },
      searchInTable () {
        let tempArr = []
        for (let index in this.employees) {
          if (this.searchKey && this.employees[index].name && this.employees[index].name.match(this.searchKey)) {
            tempArr.push(this.employees[index])
          }
        }
        if (tempArr.length != 0) {
          this.tableShowData = tempArr
        } else {
          alert('未找到合适的结果!')
        }
      },
      handleSelectChange (selection) {
        this.selectedColums = selection
      },
      showDialog () {
        this.$refs.employeeAddedDialog.show()
      }
    },
    mounted: function () {
      this.getInfosByPage(1)
    }
  }

</script>

<style scoped>

</style>
