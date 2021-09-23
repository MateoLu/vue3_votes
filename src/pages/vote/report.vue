<template>
  <div v-if="!isLoading" class="report-wrapper">
    <div class="empty" v-if="voteDetail.recordTotalCount === 0">
      <el-empty
        description="该项目暂无数据，点击下方按钮开始收集吧"
        style="height: 100%"
      >
        <el-button type="primary">分享</el-button>
      </el-empty>
    </div>
    <div v-else-if="voteDetail.recordTotalCount !== 0" class="container">
      <div class="data-overview">
        <div class="label">数据概况</div>
        <div class="row-list">
          <div class="row-item">
            <div class="title">投票类型</div>
            <div class="text">{{ postType }}</div>
          </div>
          <div class="row-item">
            <div class="title">数据总量</div>
            <div class="text">{{ voteDetail.recordTotalCount }}</div>
          </div>
          <div class="row-item">
            <div class="title">验证方式</div>
            <div class="text">{{ checkType }}</div>
          </div>
        </div>
        <div class="label">统计报表</div>
        <div class="report-content">
          <div class="question-content">
            投票标题：{{ voteDetail.name }}
            <el-dropdown @command="handleCommand" style="float: right">
              <span class="el-dropdown-link">
                图表类型
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="pie" icon="el-icon-pie-chart">
                    饼状图
                  </el-dropdown-item>
                  <el-dropdown-item command="bar" icon="el-icon-s-data">
                    柱状图
                  </el-dropdown-item>
                  <el-dropdown-item command="line" icon="el-icon-share">
                    折线图
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="chart-wrapper">
            <BarChart
              v-if="showType === 'bar'"
              :name="optionsData.name"
              :data="optionsData.data"
            />
            <LineChart
              v-if="showType === 'line'"
              :name="optionsData.name"
              :data="optionsData.data"
            />
            <PieChart
              v-if="showType === 'pie'"
              :name="optionsData.name"
              :data="optionsData.data"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, reactive } from 'vue'
import { getVoteDetailStatistic } from '@/api/vote'
import { useRoute } from 'vue-router'
import { ElLoading } from 'element-plus'
import BarChart from '@/components/BarChart.vue'
import LineChart from '@/components/LineChart.vue'
import PieChart from '@/components/PieChart.vue'

const isLoading = ref(true)

onMounted(async () => {
  const elLoading = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: '数据加载中...'
  })
  try {
    const res = await getVoteDetailStatistic(route.params.id)
    if (res.code === 200) {
      voteDetail.value = res.data
      console.log(res.data)
      const statisticData = res.data.optionVOList.map((item) => ({
        value: item.recordCount,
        name: item.name
      }))

      optionsData.name = res.data.name
      optionsData.data = statisticData
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
    elLoading.close()
  }
})

const route = useRoute()
const voteDetail = ref({})

const postType = computed(() =>
  voteDetail.value.isMultiple === 0 ? '单选' : '多选'
)

const checkType = computed(() => {
  if (voteDetail.value.checkId == 1) {
    return 'IPv4'
  } else if (voteDetail.value.checkId == 2) {
    return '邮箱'
  } else {
    return '手机号码'
  }
})

const optionsData = reactive({
  name: '',
  data: []
})

const showType = ref('pie')
const handleCommand = (command) => {
  switch (command) {
    case 'pie':
      showType.value = 'pie'
      break
    case 'bar':
      showType.value = 'bar'
      break
    case 'line':
      showType.value = 'line'
      break
  }
}
</script>

<style scoped lang="less">
.report-wrapper {
  width: 100%;
  height: 100%;
  .empty {
    height: 700px;
  }
  .container {
    padding-top: 30px;
    width: 1176px;
    height: 300px;
    margin: auto;
    .data-overview {
      margin-bottom: 18px;
      .label {
        font-weight: 400;
        color: #484848;
        &::before {
          content: '';
          display: inline-block;
          width: 2px;
          height: 12px;
          background: #2672ff;
          border-radius: 1px;
          margin-right: 5px;
        }
      }
      .report-content {
        margin: 8px 0 18px;
        padding: 24px 0;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
        border-radius: 4px;
        .question-content {
          padding: 0 24px;
          color: #666;
          font-size: 14px;
        }
        .chart-wrapper {
          height: 336px;
          width: 1176px;
        }
      }
      .row-list {
        display: flex;
        margin: 8px 0 18px;
        width: 100%;
        padding: 24px 0;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
        border-radius: 4px;
        .row-item {
          flex: 1;
          text-align: center;
          .title {
            color: #aaa;
            font-size: 12px;
          }
          .text {
            margin-top: 8px;
            color: #484848;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
