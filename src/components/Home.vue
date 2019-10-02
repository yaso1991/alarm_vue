<template>
  <el-container>
    <el-header>
      <span style="font-size: larger" >双飞带材生产线报警监控系统</span>
      <span style="float: right;">
        <el-dropdown>
          <span style="color: white" class="el-dropdown-link">
            系统管理员
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-header>
    <el-container>
      <el-aside width="160px" style="height: 880px">
        <el-row>
          <el-col>
            <el-menu @close="handleClose" @open="handleOpen" background-color="black" class="el-menu-vertical-demo"
                     default-active="2" router="true" text-color="white">
              <el-menu-item index="/alarmInfo">
                <template slot="title">
                  <i class="el-icon-s-grid"></i>
                  <span>监控页面</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/sumInfo">
                <template slot="title">
                  <i class="el-icon-coin"></i>
                  <span>报警汇总</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/employeeInfo">
                <template slot="title">
                  <i class="el-icon-copy-document"></i>
                  <span>员工管理</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/systemConfig">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>系统设置</span>
                </template>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
        <el-row style="color:white;margin-top: 600px">
          <el-col style="line-height: 20px" >{{date.toLocaleDateString()}}</el-col>
          <el-col style="line-height: 20px" >{{date.toLocaleTimeString()}}</el-col>
        </el-row>
      </el-aside>
      <el-main id="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        date: new Date()
      }
    },
    methods: {
      handleOpen () {

      },
      handleClose () {

      }
    },
    mounted () {
      this.timer = setInterval(() => {
        this.date = new Date()
      }, 1000)
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: cadetblue;
    color: white;
    text-align: left;
    line-height: 60px;
  }

  .el-aside {
    height: 900px;
    line-height: 200px;
    background-color: black;
  }

  .el-main {
    background-color: white;
    color: #333;
  }


  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-footer {
    background-color: cadetblue;
    color: white;
    text-align: left;
    line-height: 60px;
  }




</style>
