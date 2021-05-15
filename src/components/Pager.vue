<template>
  <div class="pager van-hairline--surround">
    <van-pagination
      class="left"
      v-model="pagination.pageNum"
      :total-items="total"
      :items-per-page="pagination.pageSize"
      mode="simple"
      @change="pageChange"
    />
    <div class="right">
      <van-field style="width: 50px" class="total" disabled :value="total" />
      <van-field style="width: 80px" :formatter="formatter" v-model="jumper" format-trigger="onBlur" type="digit">
        <template #button>
          <van-button type="info" size="small" @click="handleJumper">跳转</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: [Number, String],
      required: true
    },
    pagination: {
      type: Object,
      default() {
        return {
          pageSize: 10,
          pageNum: 1
        }
      }
    }
  },
  data() {
    return {
      jumper: 1
    }
  },
  methods: {
    pageChange(pageNum) {
      this.pagination.pageNum = pageNum
      this.$emit('page-change')
    },
    handleJumper() {
      const pageNum = Number(this.jumper)
      console.log(pageNum)
      this.pagination.pageNum = pageNum
      this.$emit('page-change')
    },
    formatter(value) {
      const reg = /^[1-9]\d*$/
      if (reg.test(value) && value <= this.total) {
        return value
      } else {
        return 1
      }
    }
  },
  created() {
    this.currentPage = this.pagination.pageNum
  }
}
</script>

<style lang="less" scoped>
.pager {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  .left {
    flex: 5;
  }
  .right {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .total {
      color: #646566;
      opacity: 0.6;
    }
    margin: 0 5px;
  }
}
/deep/ .van-pagination__item::after {
  border-width: 0 0 0;
}
/deep/ .van-cell {
  padding: 0px;
}
</style>
