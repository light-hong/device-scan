<template>
  <div class="pager van-hairline--surround">
    <van-pagination class="left" v-model="currentPage" :total-items="500" :show-page-size="5" mode="simple"/>
    <div class="right">
      <van-field style="width: 70px" v-model="digit" type="digit" label />
      <van-button type="info" size="small">跳转</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      digit: 1
    }
  }
}
</script>

<style lang="less" scoped>
.pager {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    flex: 1;
  }
  .right {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}
/deep/ .van-pagination__item::after {
  border-width: 0 0 0;
}
/deep/ .van-cell {
  padding: 0;
}
</style>
