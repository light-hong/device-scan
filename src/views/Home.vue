<template>
  <div class="home">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <template #title>
            <div>
              标题1
              <van-uploader>
                <van-button type="primary">扫码</van-button>
              </van-uploader>
            </div>
          </template>
          内容
        </van-collapse-item>
        <van-collapse-item title="标题2" name="2" icon="shop-o">内容</van-collapse-item>
      </van-collapse>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      activeNames: ['1'],
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
  },
}
</script>
<style lang="less" scoped>
.home {
  .title {
    font-size: 30px;
    font-weight: bold;
  }
  .content {
    font-size: 20px;
  }
}
</style>
