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

  const setVotes = async (pageNum) => {
    await store.dispatch('vote/setVotes', pageNum)
  }

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
        await setVotes(1)
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

  const updateVote = async (id, params) => {
    loading.value = true
    store.commit('vote/setLoading', true)
    try {
      const res = await updateVoteById(id, params)
      if (res.code == 200) {
        store.commit('vote/setLoading', false)

        loading.value = false
      } else {
        ElMessage.error(res.message)
        loading.value = false
        store.commit('vote/setLoading', false)
      }
    } catch (error) {
      console.log(error)
      loading.value = false
      store.commit('vote/setLoading', false)
    }
  }

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
        ElMessage.error(res.message)
        loading.value = false
        store.commit('vote/setLoading', false)
      }
    } catch (error) {
      console.log(error)
      loading.value = false
      store.commit('vote/setLoading', false)
    }
  }

  const updateVoteForDelOption = async (id) => {
    loading.value = true
    store.commit('vote/setLoading', true)

    try {
      const res = await delOption(id)
      if (res.code == 200) {
        loading.value = false
      } else {
        ElMessage.error(res.message)
        loading.value = false
      }
      store.commit('vote/setLoading', false)
    } catch (error) {
      console.log(error)
      loading.value = false
      store.commit('vote/setLoading', false)
    }
  }

  const updateVoteForUptOption = async (id, name) => {
    loading.value = true
    store.commit('vote/setLoading', true)

    try {
      const res = await uptOption(id, { name })
      if (res.code == 200) {
        loading.value = false
      } else {
        ElMessage.error(res.message)
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
