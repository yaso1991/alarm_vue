<template>
  <div>
    <el-row style="margin-bottom: 10px">
      <el-col :span="8" style="margin-left: 25px">
        <el-button @click="addManagerInfoDialogVisible = !addManagerInfoDialogVisible" icon="el-icon-plus" plain="true"
                   size="small" style="margin-left: 0px"
                   type="primary">添加
        </el-button>
        <el-button @click="handleUpdate" icon="el-icon-upload" plain="true" size="small" style="margin-left: 0px" type="primary">
          修改
        </el-button>
        <el-button @click="handleDelete" icon="el-icon-close" plain="true" size="small" style="margin-left: 0px" type="danger">删除
        </el-button>
      </el-col>
      <el-col :span="15" style="text-align: right">
        <el-pagination
          :total="100"
          background
          layout="prev, pager, next">
        </el-pagination>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div class="transition-box"
           style="margin: 10px 25px;border-radius: 3px;border: #E4E7ED solid 1px;padding-top: 20px;padding-left: 20px"
           v-show="addManagerInfoDialogVisible">
        <el-row>
          <el-form :inline="true" :model="managerInfoForm" class="demo-form-inline">
            <el-col :span="16">
              <el-form-item label="用户名:">
                <el-input size="small" style="width: 150px" v-model="managerInfoForm.username"/>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input size="small" style="width: 150px" v-model="managerInfoForm.password"/>
              </el-form-item>
              <el-form-item label="管理等级:">
                <el-select size="small" v-model="managerInfoForm.level" style="width: 150px">
                  <el-option v-for="item in levelItems" :key="item" :value="item" :label="item" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="text-align:right">
              <el-form-item>
                <el-button @click="onSubmit" size="small" type="primary">添加</el-button>
                <el-button @click="addManagerInfoDialogVisible = false" size="small" type="danger">取消</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div class="transition-box"
           style="margin: 10px 25px;border-radius: 3px;border: #E4E7ED solid 1px;padding-top: 20px;padding-left: 20px"
           v-show="updateManagerInfoDialogVisible">
        <el-row>
          <el-form :inline="true" :model="updateManagerInfoForm" class="demo-form-inline">
            <el-col :span="16">
              <el-form-item label="用户名:">
                <el-input size="small" style="width: 150px" v-model="updateManagerInfoForm.username"/>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input size="small" style="width: 150px" v-model="updateManagerInfoForm.password"/>
              </el-form-item>
              <el-form-item label="管理等级:">
                <el-select size="small" v-model="updateManagerInfoForm.level" style="width: 150px">
                  <el-option v-for="item in levelItems" :key="item" :value="item" :label="item" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="text-align:right">
              <el-form-item>
                <el-button @click="onSubmit" size="small" type="primary">修改</el-button>
                <el-button @click="updateManagerInfoDialogVisible = false" size="small" type="danger">取消</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-collapse-transition>
    <el-row>
      <el-table
        :data="tableShowData" @selection-change="handleSelectChange" border height="800" max-height="800" size="mini"
        stripe style="margin-left: 25px; width: 1050px">
        <el-table-column align="center" type="selection" width="50"/>
        <el-table-column align="center" label="用户名" prop="username" width="300"/>
        <el-table-column align="center" label="密码" prop="password" width="500"/>
        <el-table-column align="center" label="管理等级" prop="level" width="250"/>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'ManagerInfo',
    data () {
      return {
        levelItems:['系统管理员','普通管理员'],
        addManagerInfoDialogVisible: false,
        updateManagerInfoDialogVisible:false,
        managerInfoForm: {
          username: '',
          password: '',
          level: ''
        },
        selectedColums: [],
        updateManagerInfoForm: {
          id:'',
          username: '',
          password: '',
          level: ''
        },
        managerInfos: [
          {
            id: '',
            username: 'admin',
            password: '123',
            level: '系统管理员'
          },
          {
            id: '',
            username: 'yaso11',
            password: '567',
            level: '普通管理员'
          },
          {
            id: '',
            username: 'yaso22',
            password: '901',
            level: '普通管理员'
          },
        ],
        tableShowData: []
      }
    },
    methods: {
      handleUpdate() {
        if(this.selectedColums.length != 1) {
          alert('一次只能选择一行数据进行更新.');
          return;
        }
        this.updateManagerInfoForm = this.selectedColums[0];
        this.updateManagerInfoDialogVisible = true;
      },
      handleDelete() {
        if(this.selectedColums.length == 0) {
          alert('请先选择最少一行进行删除.');
          return;
        }
        if(!confirm('确认删除所选择的行?')) {
          return;
        }
        // for(selection in this.selectedColums) {
        //
        // }
        // this.axios({
        //   method:'post',
        //   url:'alarmInfo/deleteAlarmInfos',
        //   data:this.
        // })
      },
      handleSelectChange(selection){
        this.selectedColums = selection;
      },
    },
    mounted: function () {
      this.tableShowData = this.managerInfos
    }
  }
</script>

<style scoped>

</style>
