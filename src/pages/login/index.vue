<template>
  <div class="login-container">
    <div class="bg-voting"></div>
    <div class="bg1">
      <h1 class="title">甄步绰投票系统</h1>
      <p class="desc">
        该系统的功能有发布、下线，创建、删除、编辑投票问卷等功能，用户可通过发布的问卷链接进行投票
      </p>
      <div class="login-wrapper">
        <el-tabs v-model="activeName" type="border-card">
          <!-- 登录页面 -->
          <el-tab-pane label="登录" name="first" class="tab">
            <el-form
              :label-position="labelPosition"
              label-width="80px"
              :model="loginParams"
              :rules="loginRules"
              ref="loginForm"
              class="login-From"
              @keydown.enter="submitLoginForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="loginParams.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  show-password
                  v-model="loginParams.password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="loading"
                  type="primary"
                  @click="submitLoginForm"
                  class="btns"
                >
                  登 录
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <!-- 注册页面 -->
          <el-tab-pane label="注册" name="second" class="tab">
            <el-form
              :label-position="labelPosition"
              label-width="80px"
              :model="registerParams"
              :rules="registerRules"
              ref="registerForm"
              class="register-From"
              @keydown.enter="submitregisterForm"
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
                  :loading="loading"
                  type="success"
                  @click="submitregisterForm"
                  class="btns"
                >
                  注 册
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <footer class="footer">&copy; GGS · 甄步绰小组</footer>
      <div class="bg2"></div>
      <div class="bg3"></div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import { ElNotification } from 'element-plus'
import { useAuth } from '@/hooks/auth'

const { userLogin, loading, userRegister } = useAuth()
const labelPosition = ref('right')

// 登陆业务逻辑
const loginForm = ref(null)
const loginParams = reactive({
  username: '',
  password: ''
})
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const submitLoginForm = () => {
  loginForm.value.validate(async (valid) => {
    if (valid) {
      const params = {
        username: loginParams.username,
        password: loginParams.password
      }
      await userLogin(params)
    } else {
      ElNotification({
        type: 'error',
        title: '错误',
        message: '账号或密码不符合参数要求'
      })
    }
  })
}

// 注册业务逻辑
const activeName = ref('first')
watch(activeName, () => {
  loginForm.value.resetFields()
  registerForm.value.resetFields()
})

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
const submitregisterForm = () => {
  registerForm.value.validate(async (valid) => {
    if (valid) {
      if (registerParams.password === registerParams.confirmPassword) {
        await userRegister({
          username: registerParams.username,
          password: registerParams.password
        })
        registerForm.value.resetFields()
      } else {
        ElNotification({
          type: 'error',
          title: '错误',
          message: '密码不一致'
        })
      }
    } else {
      ElNotification({
        type: 'error',
        title: '错误',
        message: '账号或密码不符合参数要求'
      })
    }
  })
}
</script>

<style scoped lang="less">
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .bg-voting {
    z-index: 10;
    position: absolute;
    width: 50%;
    height: 50%;
    left: 0;
    bottom: 40px;
    background: url(../../assets/images/login_voting.svg) no-repeat;
    background-size: 100% 100%;
  }

  .btns {
    margin-left: 35%;
  }

  .bg1 {
    position: absolute;
    z-index: 9;
    right: 0;
    top: 0;
    padding: 40px 80px;
    width: 55%;
    height: 100%;
    background-color: #0389f7;
    .title {
      color: #fff;
      font-size: 50px;
      font-weight: lighter;
    }
    .desc {
      color: #fff;
      font-size: 16px;
      font-weight: lighter;
      line-height: 24px;
    }
    .footer {
      position: absolute;
      bottom: 40px;
      left: 50%;
      text-align: center;
      font-weight: lighter;
      color: #fff;
    }
    .bg2 {
      position: absolute;
      left: -20%;
      top: 0;
      width: 20%;
      height: 50%;
      background-color: #0389f7;
      border-radius: 0 0 0 100%;
    }
    .bg3 {
      position: absolute;
      left: 0px;
      bottom: 0;
      width: 20%;
      height: 50%;
      background-color: #f7f8fa;
      border-radius: 0 100% 0 0;
    }
  }
  .login-wrapper {
    z-index: 9;
    margin: 20% 0 0 30%;
    width: 65%;
    .tab {
      padding: 15px 20px 0 20px;
    }
  }
}
</style>
