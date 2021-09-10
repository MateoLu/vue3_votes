<template>
  <div class="login-container">
    <div class="login-wrapper">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="loginForm"
        class="login_From"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            class="btns"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const { ctx } = getCurrentInstance()

const router = useRouter()
const labelPosition = ref('right')
const loginForm = ref(null)
const formLabelAlign = reactive({
  username: '',
  password: ''
})

const rules = reactive({
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

const submitForm = (formName) => {
  ctx.$refs[formName].validate((valid) => {
    if (valid) {
      router.push('/home')
    } else {
      console.log('error submit!!')
      return false
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
    width: 300px;
    height: 200px;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
    margin-bottom: 200px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
  .login_From {
    margin: 13px 10px 0px -19px;
  }
  .btns {
    margin: 13px 0 0 35px;
  }
}
</style>
