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
        <el-button @click="searchShow = !searchShow" icon="el-icon-search" size="small" type="primary">搜索</el-button>

      </el-col>
      <el-col span="12" style="text-align: right;">
        <span>
          <el-upload
            :before-remove="beforeRemove"
            :file-list="fileList"
            :limit="3"
            action="https://jsonplaceholder.typicode.com/posts/"
            class="upload-demo"
            multiple
            style="display: inline">
            <el-button @click="" icon="el-icon-top" plain="true" size="small" type="success">导出</el-button>
          </el-upload>
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
              <el-form-item label="报警时间:">
                <el-date-picker
                  end-placeholder="结束日期"
                  range-separator="至"
                  size="small"
                  start-placeholder="开始日期"
                  type="daterange"
                  v-model="searchForm.rangeTime"
                  value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="报警点:">
                <el-input placeholder="报警点名称" size="small" v-model="searchForm.alarmPoint"/>
              </el-form-item>
              <el-form-item label="当班员工:">
                <el-input placeholder="员工姓名" size="small" v-model="searchForm.employeeName"/>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="text-align:right">
              <el-form-item>
                <el-button @click="submitSearch" size="small" type="primary">查询</el-button>
                <el-button @click="searchShow = false" size="small" type="danger">取消</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-collapse-transition>
    <el-row style="margin-bottom: 10px">
      <el-table
        :data="tableShowData"
        border
        empty-text="昨天没有发生报警."
        height="800"
        max-height="800"
        size="mini"
        stripe
        style="width: 100%">
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          align="center"
          label="报警点"
          prop="alarmInfo.name"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          label="报警时间"
          prop="alarmStartTime"
          width="350">
          <template slot-scope="scope">
            {{scope.row.alarmStartTime | timeFormat}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="报警时长"
          prop="alarmSpan"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          label="结束时间"
          prop="alarmEndTime"
          width="300">
          <template slot-scope="scope">
            {{calculateEndTime(scope.row.alarmStartTime,scope.row.alarmSpan)}}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="员工编号"
          prop="employee.workId"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          label="员工姓名"
          prop="employee.name"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          label="推送"
          prop="pushLevel"
          width="150">
        </el-table-column>
        <el-table-column
          align="center"
          label="组长编号"
          prop="master.workId"
          width="100">
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
  import moment from 'moment'

  export default {
    name: 'SumInfo',
    data () {
      return {
        searchForm: {
          rangeTime: [moment([moment().year(),moment().month(),moment().date()]).subtract(1,'d').format('YYYY-MM-DD HH:mm:ss'), moment([moment().year(),moment().month(),moment().date()]).format('YYYY-MM-DD HH:mm:ss')],
          alarmPoint: '',
          employeeName: ''
        },
        searchShow: false,
        searchKey: '',
        tableShowData: [],
        alarmItems: []
      }
    },
    methods: {
      calculateEndTime (start, span) {
        return moment.unix(moment(start).unix() + span).format('YYYY-MM-DD HH:mm:ss')

      },
      loadSumInfos () {
        this.axios({
          method: 'get',
          url: '/sumInfo/getSumInfos',
          params: {
            beginTime:this.searchForm.rangeTime ? this.searchForm.rangeTime[0]:null,
            endTime: this.searchForm.rangeTime ? this.searchForm.rangeTime[1]:null,
            alarmName: this.searchForm.alarmPoint,
            employeeName: this.searchForm.employeeName
          }
        }).then(resp => {
          if (resp && resp.status == 200) {
            this.alarmItems = resp.data
            this.tableShowData = this.alarmItems
            return
          }
          alert('加载失败.')
        }).catch(err => {
          alert(err)
        })
      },
      submitSearch () {
        this.loadSumInfos()
        this.searchShow = false
      },
      showDialog () {
        this.$refs.employeeAddedDialog.show()
      }
    },
    filters: {
      timeFormat (val) {
        return moment(val).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    mounted: function () {
      this.loadSumInfos()
    }
  }

</script>

<style scoped>

</style>

