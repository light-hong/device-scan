<template>
  <div class="home">
    <form action="/">
      <van-search
        v-model="params.MaterialCode"
        show-action
        placeholder="请输入物料编码搜索"
        @search="onSearch"
        action-text="更多条件"
        @cancel="handleMore"
      />
    </form>
    <van-popup @click-overlay="clickOverlay" v-model="showPoup" position="top">
      <van-cell-group>
        <van-field v-model="params.UsedBrand" label="品牌" placeholder="请输入品牌" />
        <van-field v-model="params.Model" label="型号" placeholder="请输入型号" />
        <van-field v-model="params.InternalCode" label="国际编码" placeholder="请输入国际编码" />
      </van-cell-group>
      <div class="poup-btn">
        <van-button style="width: 90px" round type="default" size="small" @click="cancelPoup">取 消</van-button>
        <van-button style="width: 90px" round type="info" size="small" @click="paramsConfirm">确 定</van-button>
      </div>
    </van-popup>
    <van-collapse v-model="activeName" accordion>
      <div v-for="(item, index) in list" :key="index" class="list-item">
        <van-collapse-item :name="item.MaterialCode">
          <template #title>
            <div class="list-title">
              <span>{{item.MaterialName}}</span>
            </div>
          </template>
          <div class="content">
            <div class="left">
              <van-image width="64" height="64" :src="item.Pic" />
            </div>
            <div class="right">
              <van-cell title="物料编码" title-style="flex: none;" :value="item.MaterialCode || '/'" />
              <van-cell title="品牌" title-style="flex: none;" :value="item.UsedBrandName || '/'" />
              <van-cell title="型号" title-style="flex: none;" :value="item.UsedTypeName || '/'" />
              <van-cell title="类型" title-style="flex: none;" :value="item.Model || '/'" />
              <van-cell title="厂家编码" title-style="flex: none;" :value="item.FactoryCode || '/'" />
            </div>
          </div>
        </van-collapse-item>
        <div class="ocr-btn">
          <van-uploader :before-read="beforeRead">
            <van-button size="mini" type="primary">识别</van-button>
          </van-uploader>
        </div>
      </div>
    </van-collapse>
    <van-pager></van-pager>
  </div>
</template>

<script>
import { materialList } from '@a/home'

export default {
  name: 'Home',
  data() {
    return {
      params: {
        MaterialCode: '',
        UsedBrand: '',
        Model: '',
        InternalCode: '',
        pageSize: 10,
        pageNum: 1
      },
      showPoup: false,
      list: [],
      activeName: ''
    }
  },
  methods: {
    handleOcr() {
      console.log(555)
    },
    onSearch() {
      console.log(this.params)
    },
    handleMore() {
      this.showPoup = true
    },
    cancelPoup() {
      this.showPoup = false
      this.clickOverlay()
    },
    clickOverlay() {
      this.params.UsedBrand = ''
      this.params.Model = ''
      this.params.InternalCode = ''
    },
    paramsConfirm() {
      console.log(this.params)
    },
    async getList() {
      const body = this.generateParams(this.params)
      const res = await materialList(body)
      console.log(res)
      this.list = res.list
    },
    generateParams(data, type = 'obj') {
      if (type === 'str') {
        let dataStr = ''
        Object.keys(data).forEach((key) => {
          if (data[key] && data[key] !== 0 && data[key] !== false) {
            dataStr += key + '=' + data[key] + '&'
          }
        })
        if (dataStr !== '') {
          dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        }
        return dataStr
      } else {
        const params = { ...this.params }
        for (const key in params) {
          if (params[key] !== false && params[key] !== 0 && !params[key]) {
            delete params[key]
          }
        }
        return params
      }
    },
    beforeRead(e) {
      e.stopPropagation()
    }
  },
  created() {
    this.getList()
  }
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
  .poup-btn {
    margin: 5px;
    display: flex;
    justify-content: space-evenly;
  }
  .list-item {
    position: relative;
    .list-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        flex: 1;
        display: inline-block;
        margin-right: 100px;
      }
    }
    .ocr-btn {
      position: absolute;
      // transform: translateY(-50%);
      top: 0;
      right: 90px;
      display: inline-block;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right {
        flex: 1;
      }
    }
  }
}
</style>
