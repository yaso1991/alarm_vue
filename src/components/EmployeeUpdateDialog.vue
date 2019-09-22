<template>
  <el-dialog
    :before-close="handleClose"
    :visible.sync="dVisible"
    title="修改资料"
    width="70%">
    <el-form :model="emp" :rules="rules" ref="heheEmp">
      <el-row>
        <el-col :span="6">
          <div>
            <el-form-item label="姓名:" prop="name">
              <el-input placeholder="请输入员工姓名" prefix-icon="el-icon-edit" size="mini" style="width: 150px"
                        v-model="emp.name"></el-input>
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="5">
          <div>
            <el-form-item label="性别:" prop="gender">
              <el-radio-group v-model="emp.gender">
                <el-radio label="男">男</el-radio>
                <el-radio label="女" style="margin-left: 15px">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-form-item label="出生日期:" prop="birthday">
              <el-date-picker
                placeholder="出生日期"
                size="mini"
                style="width: 150px"
                type="date"
                v-model="emp.birthday">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <el-form-item label="政治面貌:" prop="politicId">
              <el-select
                :loading="politicsLoading"
                @visible-change="selectPolitics"
                placeholder="政治面貌"
                size="mini"
                style="width: 200px"
                v-model="emp.politicId"
              >
                <el-option
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  v-for="item in politics">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>
            <el-form-item label="民族:" prop="nationId">
              <el-select
                @visible-change="selectNations"
                placeholder="请选择民族"
                size="mini"
                style="width: 150px"
                v-model="emp.nationId">
                <el-option
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  v-for="item in nations">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="5">
          <div>
            <el-form-item label="籍贯:" prop="nativePlace">
              <el-input placeholder="员工籍贯" size="mini" style="width: 120px" v-model="emp.nativePlace"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-form-item label="电子邮箱:" prop="email">
              <el-input placeholder="电子邮箱地址..." prefix-icon="el-icon-message" size="mini" style="width: 150px"
                        v-model="emp.email"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <el-form-item label="联系地址:" prop="address">
              <el-input placeholder="联系地址..." prefix-icon="el-icon-edit" size="mini" style="width: 200px"
                        v-model="emp.address"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>
            <el-form-item label="职位:" prop="posId">
              <el-select
                @visible-change="selectPositions"
                placeholder="请选择职位"
                size="mini"
                style="width: 150px"
                v-model="emp.posId">
                <el-option
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  v-for="item in positions">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="5">
          <div>
            <el-form-item label="职称:" prop="jobLevelId">
              <el-select
                @visible-change="selectJobLevels"
                placeholder="请选择职称"
                size="mini"
                style="width: 120px"
                v-model="emp.jobLevelId">
                <el-option
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  v-for="item in joblevels">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-form-item label="所属部门:" prop="departmentId">
              <el-select
                @visible-change="selectDepartments"
                placeholder="请选择所属部门"
                size="mini"
                style="width: 120px"
                v-model="emp.departmentId">
                <el-option
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  v-for="item in departments">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <el-form-item label="电话号码:" prop="phone">
              <el-input placeholder="电话号码..." prefix-icon="el-icon-phone" size="mini" style="width: 200px"
                        v-model="emp.phone"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>
            <el-form-item label="工号:" prop="workID">
              <el-input disabled placeholder="员工工号..." size="mini" style="width: 150px"
                        v-model="emp.workID"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="5">
          <div>
            <el-form-item label="学历:" prop="tiptopDegree">
              <el-select placeholder="最高学历" size="mini" style="width: 120px" v-model="emp.tiptopDegree">
                <el-option
                  :key="item"
                  :label="item"
                  :value="item"
                  v-for="item in degrees">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-form-item label="毕业院校:" prop="school">
              <el-input placeholder="毕业院校名称" prefix-icon="el-icon-edit" size="mini" style="width: 150px"
                        v-model="emp.school"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div>
            <el-form-item label="专业名称:" prop="specialty">
              <el-input placeholder="专业名称" prefix-icon="el-icon-edit" size="mini" style="width: 200px"
                        v-model="emp.specialty"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>
            <el-form-item label="入职日期:" prop="beginDate">
              <el-date-picker
                placeholder="入职日期"
                size="mini"
                style="width: 130px"
                type="date"
                v-model="emp.beginDate">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-form-item label="转正日期:" prop="conversionTime">
              <el-date-picker
                placeholder="转正日期"
                size="mini"
                style="width: 130px"
                type="date"
                v-model="emp.conversionTime">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-form-item label="合同起始日期:" prop="beginContract">
              <el-date-picker
                placeholder="合同起始日期"
                size="mini"
                style="width: 135px"
                type="date"
                v-model="emp.beginContract">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-form-item label="合同终止日期:" prop="endContract">
              <el-date-picker
                placeholder="合同终止日期"
                size="mini"
                style="width: 135px"
                type="date"
                v-model="emp.endContract">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div>
            <el-form-item label="身份证号码:" prop="idCard">
              <el-input placeholder="请输入员工身份证号码..." prefix-icon="el-icon-edit" size="mini" style="width: 180px"
                        v-model="emp.idCard"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="聘用形式:" prop="engageForm">
              <el-radio-group v-model="emp.engageForm">
                <el-radio label="劳动合同">劳动合同</el-radio>
                <el-radio label="劳务合同" style="margin-left: 15px">劳务合同</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-form-item label="婚姻状况:" prop="wedlock">
              <el-radio-group v-model="emp.wedlock">
                <el-radio label="已婚">已婚</el-radio>
                <el-radio label="未婚" style="margin-left: 15px">未婚</el-radio>
                <el-radio label="离异" style="margin-left: 15px">离异</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <span class="dialog-footer" slot="footer">
          <el-button @click="dVisible = false">取 消</el-button>
          <el-button @click="submitUpdate" type="primary">确 定</el-button>
        </span>
  </el-dialog>

</template>

<script>
    export default {
        name: "EmployeeUpdateDialog",
        data() {
            return {
                rules: {
                    name: [
                        {message: '请输入名称', trigger: 'blur'},
                        {
                            pattern: /^[\u4E00-\u9FA5\\s]{2}$|^[\u4E00-\u9FA5\\s]{3}$|^[\u4E00-\u9FA5\\s]{4}$|^[\u4E00-\u9FA5\\s]{5}$/,
                            message: '格式错误,请输入2-5个汉字',
                            trigger: 'blur'
                        }
                    ],
                    birthday: [
                        {message: '出生日期不可为空', trigger: 'blur'},
                        {type: 'date', message: '出生日期格式不正确', trigger: 'blur'}
                    ],
                    nativePlace: [
                        {message: '籍贯不可为空', trigger: 'blur'},
                    ],
                    email: [
                        {type: 'email', message: '电子邮件格式不对', trigger: 'blur'}
                    ]

                },
                emp: {},
                politics: [],
                nations: [],
                joblevels: [],
                departments: [],
                positions: [],
                degrees: ['博士', '硕士', '本科', '大专', '高中', '初中', '小学', '其他'],
                dVisible: false,
                politicsLoading: false
            }
        },
        methods: {
            handleClose() {
                this.dVisible = false;
            },
            selectPolitics() {
                if (this.politics.length == 0) {
                    this.politicsLoading = true;
                    this.axios({
                        method: 'get',
                        url: '/employeeInfo/getPoliticsStatus'
                    }).then(resp => {
                        if (resp && resp.status == 200) {
                            this.politics = resp.data;
                        }
                    }).catch(() => {
                    });
                    this.politicsLoading = false;
                }
            },
            selectNations() {
                if (this.nations.length == 0) {
                    this.axios({
                        method: 'get',
                        url: '/employeeInfo/getNations'
                    }).then(resp => {
                        if (resp && resp.status == 200) {
                            this.nations = resp.data;
                        }
                    })
                }
            },
            selectJobLevels() {
                if (this.joblevels.length == 0) {
                    this.axios({
                        method: 'get',
                        url: '/employeeInfo/getJobLevels'
                    }).then(resp => {
                        if (resp && resp.status == 200) {
                            this.joblevels = resp.data;
                        }
                    })
                }
            },
            selectDepartments() {
                if (this.departments.length == 0) {
                    this.axios({
                        method: 'get',
                        url: '/employeeInfo/getDepartments'
                    }).then(resp => {
                        if (resp && resp.status == 200) {
                            this.departments = resp.data;
                        }
                    })
                }
            },
            selectPositions() {
                if (this.positions.length == 0) {
                    this.axios({
                        method: 'get',
                        url: '/employeeInfo/getPositions'
                    }).then(resp => {
                        if (resp && resp.status == 200) {
                            this.positions = resp.data;
                        }
                    })
                }
            },
            submitUpdate() {
                this.$refs.heheForm.validate(valid => {
                    if (valid) {
                        this.axios({
                            method: 'post',
                            url: '/employeeInfo/fixEmployee',
                            data: this.emp
                        }).then(resp => {
                                if (resp && resp.status == 200) {
                                    if (resp.data == false) {
                                        alert("更新失败");
                                        return;
                                    }
                                    alert("更新成功");
                                    this.dVisible = false;
                                } else {
                                    alert("提交失败,请检查网络");
                                }
                            }
                        );
                    }
                });
            },
            show(employee) {
                this.selectPolitics();
                this.selectDepartments();
                this.selectJobLevels();
                this.selectNations();
                this.selectPositions();
                this.emp = employee;
                this.dVisible = true;
            }
        }
    }
</script>

<style scoped>

</style>
