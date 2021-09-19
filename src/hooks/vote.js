import store from '@/store'
import { computed } from 'vue'
import { createVote } from '@/api/vote'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export function useVote() {
  const router = useRouter()
  const votes = computed(() => store.state.vote.list)
  const pager = computed(() => store.state.vote.pager)

  const setVotes = async (pageNum) => {
    await store.dispatch('vote/setVotes', pageNum)
  }

  const makeVote = async (params) => {
    try {
      const res = await createVote(params)
      if (res.code === 200) {
        ElMessage.success('创建并发布投票问卷成功')
        router.push('/home')
      }
    } catch (error) {
      ElMessage.error(error.message)
    }
  }

  return {
    setVotes,
    makeVote,
    votes,
    pager
  }
}
