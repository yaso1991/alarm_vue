<template>
  <el-form :model="form" :rules="rules" class="form" label-width="80px" ref="form">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input show-password v-model="form.password"></el-input>
    </el-form-item>
    <el-button @click="onSubmit" type="primary">登录</el-button>
    <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      /**
       * 登录验证.
       */
      onSubmit () {
        this.axios({
          method: 'post',
          url: '/login',
          params: {
            username: this.form.username,
            password: this.form.password
          }
        }).then(resp => {
          if (!resp || resp.status != 200) {
            alert('服务器未响应')
            return
          }
          if (!resp.data) {
            alert('账号密码错误')
            return
          }
          this.$router.push('/alarmInfo')
        }).catch(err => {
          alert(err)
        })
      }
    }
  }
</script>

<style scoped>
  .form {
    border-radius: 5px;
    border: lightgray 1px solid;
    padding: 35px;
    margin: 200px auto;
    width: 350px;
    box-shadow: 0 0 25px lightgray;
  }
</style>
