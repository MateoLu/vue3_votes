<template>
  <div class="report-wrapper">
    <div class="container">
      <div class="data-overview">
        <div class="label">数据概况</div>
        <div class="row-list"></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="less">
.report-wrapper {
  width: 100%;
  height: 100%;
  .container {
    padding-top: 30px;
    width: 1258px;
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
      .row-list {
        margin-top: 8px;
        width: 100%;
        padding: 24px 0;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
        border-radius: 4px;
      }
    }
  }
}
</style>
