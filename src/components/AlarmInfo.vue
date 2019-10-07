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
        <el-button @click="handleUpdate" plain="true" size="small">修改</el-button>
        <el-button @click="handleDelete" plain="true" size="small" type="danger">删除</el-button>
      </el-col>
    </el-row>
    <el-row>
      <AlarmInfoAddedDialog ref="alarmInfoAddedDialog"></AlarmInfoAddedDialog>
      <AlarmInfoUpdateDialog ref="alarmInfoUpdateDialog"></AlarmInfoUpdateDialog>
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
          align="left"
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column
          align="center"
          label="名称"
          prop="name"

          width="250">
        </el-table-column>
        <el-table-column
          align="center"
          label="类型"
          prop="type"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          label="打卡器"
          prop="cardReader.name"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          label="监控状态"
          prop="state"
          width="80">
        </el-table-column>
        <el-table-column
          align="center"
          label="报警状态"
          prop="alarming"

          width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.alarming?'正常':'故障' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="报警时间"
          prop="alarmTime"

          width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.alarmTime | filterNullValue }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="报警时长"
          prop="alarmSpan"
          width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.alarmSpan | filterNullValue }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="推送"
          prop="pushLevel"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          label="员工编号"
          prop="employee.workId"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          label="员工姓名"
          prop="employee.name"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          label="组长编号"
          prop="master.workId"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          label="组长姓名"
          prop="master.name"
          width="150">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  import AlarmInfoAddedDialog from './AlarmInfoAddedDialog'
  import AlarmInfoUpdateDialog from './AlarmInfoUpdateDialog'

  export default {
    name: 'AlarmInfo',

    components: {
      AlarmInfoAddedDialog,
      AlarmInfoUpdateDialog
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
            return
          }
          alert('删除失败')
        })
      },
      handleUpdate () {
        if (this.selectedColums.length == 1) {
          this.$refs.alarmInfoUpdateDialog.show(this.selectedColums[0])
        }
      },
      //TODO ......
      searchInTable () {
        let tempArr = []
        tempArr = searchInObj(this.searchKey, this.alarmInfo)
        return tempArr
      },
      searchInObj (key, obj) {
        let tempArr = []
        for (let index in obj) {
          if (typeof obj[index] == 'object') {
            searchInObj(key in obj[index])
          } else {
            if (key && obj[index] && obj[index].match(key)) {
              tempArr.push(obj[index])
            }
          }
        }
        return tempArr
      },
      handleSelectChange (selection) {
        this.selectedColums = selection
      },
      showDialog () {
        this.$refs.alarmInfoAddedDialog.show()
      }
    },
    filters:{
      filterNullValue(val) {
        if(!val) {
          return "-";
        }
      }
    },
    mounted: function () {
      this.axios({
        method: 'get',
        url: '/alarmInfo',
      }).then(resp => {
        if (!resp || !resp.status == 200) {
          return
        }
        this.alarmInfo = resp.data
        this.tableShowData = this.alarmInfo
      })
    }
  }

</script>

<style scoped>

</style>
