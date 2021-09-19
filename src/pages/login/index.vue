<template>
  <div class="login-container">
    <div class="login-wrapper">
      <el-tabs v-model="activeName" type="border-card">
        <!-- 登录页面 -->

        <el-tab-pane label="登录" name="first" class="page">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="loginParams"
            :rules="loginRules"
            ref="loginForm"
            class="login-From"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginParams.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input show-password v-model="loginParams.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitLoginForm('loginForm')"
                class="btns"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 注册页面 -->
        <el-tab-pane label="注册" name="second" class="page">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="registerParams"
            :rules="registerRules"
            ref="registerForm"
            class="register-From"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="registerParams.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                show-password
                v-model="registerParams.password"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                show-password
                v-model="registerParams.confirmPassword"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitregisterForm('registerForm')"
                class="btns"
              >
                注册
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup>
// import { http } from '@/service'
import { useStore } from 'vuex'
import { getCurrentInstance, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const { ctx } = getCurrentInstance()
const store = useStore()
const labelPosition = ref('right')

// 登陆业务逻辑
const loginForm = ref(null)
const loginParams = reactive({
  username: '',
  password: ''
})
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6,
      max: 18,
      message: '长度在 6 到 18 个字符',
      trigger: 'blur'
    }
  ]
})
const submitLoginForm = (formName) => {
  ctx.$refs[formName].validate((valid) => {
    if (valid) {
      store.dispatch('user/setUser', {
        username: loginParams.username,
        password: loginParams.password
      })
    } else {
      ElMessage.error('账号或密码不符合参数要求')
    }
  })
}

// 注册业务逻辑
const activeName = ref('first')
const registerForm = ref(null)
const registerParams = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})
const registerRules = reactive({
  username: [
    { required: true, message: '请输入要注册的用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      min: 6,
      max: 18,
      message: '长度在 6 到 18 个字符',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      min: 6,
      max: 18,
      message: '长度在 6 到 18 个字符',
      trigger: 'blur'
    }
  ]
})
const submitregisterForm = (formName) => {
  ctx.$refs[formName].validate((valid) => {
    if (valid) {
      console.log(1)
    } else {
      ElMessage.error('账号或密码不符合参数要求')
    }
  })
}
</script>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-wrapper {
    // width: 360px;
    // height: 302px;
    // border-radius: 10px;
    // padding: 20px 40px;
    // background-color: #fff;
    // margin-bottom: 200px;
    // box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    .page {
      padding: 22px 18px;
      height: 239px;
    }
    .login-From,
    .register-From {
      margin: 13px 10px 0px -11px;
    }
    .btns {
      margin: 6px 36px auto;
    }
  }
}
</style>
