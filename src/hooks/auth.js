import { ref } from 'vue'
import store from '@/store'
import { login, register } from '@/api/user'
import { ElNotification } from 'element-plus'
import { setToken } from '@/utils/storage'
import { useRouter } from 'vue-router'

export function useAuth() {
  const router = useRouter()
  const loading = ref(false)

  // 用户登陆
  const userLogin = async (formValue) => {
    loading.value = true
    await login(formValue)
      .then(async (res) => {
        if (res.code == 200) {
          const token = res.data.token
          setToken(token)
          await store.dispatch('user/setUser', token)
          await router.replace('/home')
          ElNotification({
            title: '提示',
            message: '登陆成功！',
            type: 'success',
            duration: 2000
          })
        } else {
          ElNotification({
            title: '提示',
            message: '账号或密码不正确',
            type: 'error',
            duration: 2000
          })
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  // 用户退出
  const userLogout = () => {
    store.dispatch('user/clearUser')
  }

  // 用户注册
  const userRegister = async (registerForm) => {
    loading.value = true
    try {
      const res = await register(registerForm)
      if (res.code == 200) {
        ElNotification({
          title: '提示',
          message: '用户注册成功！',
          type: 'success',
          duration: 2000
        })
      } else {
        ElNotification({
          title: '提示',
          message: res.message,
          type: 'error',
          duration: 2000
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  return {
    userLogin,
    userLogout,
    userRegister,
    loading
  }
}
