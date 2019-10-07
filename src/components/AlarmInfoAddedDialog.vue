<template>
  <el-dialog
    :before-close="handleClose"
    :visible.sync="dVisible"
    style="text-align: center"
    title="添加报警点"
    width="600px">
    <el-form
      :model="alarmInfo"
      :rules="rules"
      label-position="right"
      label-width="80px"
      ref="formOfAddAlarmInfo"
      style="padding-left: 140px">
      <el-row>
        <el-col :span="6">
          <div>
            <el-form-item label="名称:" prop="name">
              <el-input placeholder="请输入报警点名称" prefix-icon="el-icon-edit"
                        style="width: 200px"
                        v-model="alarmInfo.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div>
            <el-form-item label="类型:" prop="type">
              <el-select
                placeholder="选择类型"
                style="width: 200px"
                v-model="alarmInfo.type">
                <el-option
                  :key="item"
                  :label="item"
                  :value="item"
                  v-for="item in type">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div>
            <el-form-item label="打卡器:" prop="cardReaderId">
              <el-select
                @visible-change="getCardReaders"
                placeholder="选择打卡器"
                style="width: 200px"
                v-model="alarmInfo.cardReaderId">
                <el-option
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  v-for="item in this.cardReaders">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <div>
            <el-form-item label="监控状态:" prop="state">
              <el-select
                placeholder="监控状态"
                style="width: 200px"
                v-model="alarmInfo.state">
                <el-option
                  :key="item"
                  :label="item"
                  :value="item"
                  v-for="item in states">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>
            <el-form-item
              label="端口:"
              prop="comName">
              <el-select
                placeholder="请选择端口"
                style="width: 200px"
                v-model="alarmInfo.comName">
                <el-option
                  :key="item"
                  :label="item"
                  :value="item"
                  v-for="item in comNames">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <div>
            <el-form-item label="地址:" prop="address">
              <el-input placeholder="modbus地址"
                        style="width: 200px"
                        v-model="alarmInfo.address"></el-input>
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
    name: 'AlarmInfoAddedDialog',
    data () {
      return {
        rules: {},
        alarmInfo: {
          id: 0,
          name: '',
          type: '测厚系统',
          cardReaderId: '',
          state: '正常',
          comName: 'COM4',
          addr: '40001',
        },
        type: [
          '测厚系统',
          '缺陷识别系统',
          '温度报警系统',
          '位移系统'
        ],
        states: [
          '正常',
          '维护',
          '退出'
        ],
        comNames: [
          'COM1',
          'COM2',
          'COM3',
          'COM4',
          'COM5',
          'COM6'
        ],
        cardReaders: [],
        dVisible: false,
      }
    },
    methods: {
      handleClose () {
        this.dVisible = false
      },
      submitEmployeeInfo () {
        this.$refs.formOfAddAlarmInfo.validate(valid => {
          if (valid) {
            this.axios({
              method: 'post',
              url: '/alarmInfo/addAlarmInfo',
              data: this.alarmInfo
            }).then(resp => {
                if (resp && resp.status == 200 && resp.data) {
                  alert('添加成功.')
                  this.dVisible = false
                  return
                }
                alert('添加失败.')
              }
            ).catch(err => {
                alert(err)
              }
            )
          }
        })
      },
      getCardReaders() {
        this.util.loadCardReadersData().then(value => {
          this.cardReaders = value;
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
