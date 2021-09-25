import store from '@/store'
import { computed, ref } from 'vue'
import {
  createVote,
  delVoteById,
  getVoteDetailById,
  updateVoteById
} from '@/api/vote'
import { addOption, delOption, uptOption } from '@/api/option'
import { ElMessage, ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

export function useVote() {
  const router = useRouter()
  const loading = ref(false)
  const votes = computed(() => store.state.vote.list)
  const pager = computed(() => store.state.vote.pager)
  const curVoteDetail = computed(() => store.state.vote.currentVoteDetail)

  // 分页查询用户的投票项目列表
  const setVotes = async (pageNum) => {
    await store.dispatch('vote/setVotes', pageNum)
  }

  // 创建一个投票项目
  const makeVote = async (params) => {
    loading.value = true
    try {
      const res = await createVote(params)
      if (res.code == 200) {
        ElNotification({
          title: '成功',
          message: '创建投票问卷',
          type: 'success'
        })
        await getVoteDetail(res.data.id)
        router.push(`/vote/edit/${res.data.id}`)
      }
    } catch (error) {
      ElMessage.error(error.message)
    } finally {
      loading.value = false
    }
  }

  // 根据 questionId 获取投票项目的详情
  const getVoteDetail = async (id) => {
    loading.value = true
    try {
      const res = await getVoteDetailById(id)

      if (res.code == 200) {
        await store.dispatch('vote/setCurrentVoteDetail', res.data)
      }
      return res.data
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  // 根据 questionId 删除投票项目
  const deleteVote = async (id) => {
    loading.value = true
    store.commit('vote/setLoading', true)
    try {
      const res = await delVoteById(id)
      if (res.code == 200) {
        ElNotification({
          title: '成功',
          message: '删除投票问卷',
          type: 'success'
        })
      } else {
        ElMessage.error(res.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
      store.commit('vote/setLoading', false)
    }
  }

  // 根据 questionId 并传入更改内容对象去更改投票问题
  const updateVote = async (id, params) => {
    loading.value = true
    store.commit('vote/setLoading', true)
    try {
      const res = await updateVoteById(id, params)
      if (res.code == 200) {
        store.commit('vote/setLoading', false)
        loading.value = false
      } else {
        ElNotification({
          title: '错误',
          message: res.message,
          type: 'error'
        })
        loading.value = false
        store.commit('vote/setLoading', false)
      }
    } catch (error) {
      console.log(error)
      loading.value = false
      store.commit('vote/setLoading', false)
    }
  }

  // 给投票项目增加一个选项
  const updateVoteForAddOption = async (params) => {
    loading.value = true
    store.commit('vote/setLoading', true)

    try {
      const res = await addOption(params)
      if (res.code == 200) {
        loading.value = false
        store.commit('vote/setLoading', false)

        return res.data
      } else {
        ElNotification({
          title: '错误',
          message: res.message,
          type: 'error'
        })
        loading.value = false
        store.commit('vote/setLoading', false)
      }
    } catch (error) {
      console.log(error)
      loading.value = false
      store.commit('vote/setLoading', false)
    }
  }

  // 删除投票项目的一个选项
  const updateVoteForDelOption = async (id) => {
    loading.value = true
    store.commit('vote/setLoading', true)

    try {
      const res = await delOption(id)
      if (res.code == 200) {
        loading.value = false
      } else {
        ElNotification({
          title: '错误',
          message: res.message,
          type: 'error'
        })
        loading.value = false
      }
      store.commit('vote/setLoading', false)
    } catch (error) {
      console.log(error)
      loading.value = false
      store.commit('vote/setLoading', false)
    }
  }

  // 更新投票项目的一个选项
  const updateVoteForUptOption = async (id, name) => {
    loading.value = true
    store.commit('vote/setLoading', true)

    try {
      const res = await uptOption(id, { name })
      if (res.code == 200) {
        loading.value = false
      } else {
        ElNotification({
          title: '错误',
          message: res.message,
          type: 'error'
        })
        loading.value = false
      }
      store.commit('vote/setLoading', false)
    } catch (error) {
      console.log(error)
      loading.value = false
      store.commit('vote/setLoading', false)
    }
  }

  return {
    setVotes,
    makeVote,
    getVoteDetail,
    updateVote,
    deleteVote,
    updateVoteForAddOption,
    updateVoteForDelOption,
    updateVoteForUptOption,
    votes,
    pager,
    loading,
    curVoteDetail
  }
}
