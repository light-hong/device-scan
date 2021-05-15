<template>
  <div class="home">
    <form action="/">
      <van-search
        v-model="params.MaterialCode"
        show-action
        placeholder="请输入物料编码搜索"
        @search="onSearch"
        @clear="onSearch"
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
    <van-collapse class="list" v-model="activeName" accordion>
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
              <van-cell title="国际编码" title-style="flex: none;" :value="item.InternalCode || '/'" />
              <van-cell title="物料编码" title-style="flex: none;" :value="item.MaterialCode || '/'" />
              <van-cell title="品牌" title-style="flex: none;" :value="item.UsedBrandName || '/'" />
              <van-cell title="型号" title-style="flex: none;" :value="item.UsedTypeName || '/'" />
              <van-cell title="类型" title-style="flex: none;" :value="item.Model || '/'" />
              <van-cell title="厂家编码" title-style="flex: none;" :value="item.FactoryCode || '/'" />
            </div>
          </div>
        </van-collapse-item>
        <div class="ocr-btn">
          <van-uploader
            :max-size="10000 * 1024"
            @oversize="onOversize"
            result-type="file"
            :after-read="(file) => afterRead(file, item)"
          >
            <van-button size="mini" type="primary">识别</van-button>
          </van-uploader>
        </div>
      </div>
      <div v-if="list.length === 0" class="no-data">暂无数据</div>
    </van-collapse>
    <van-pager @page-change="pageChange" :total="total" :pagination="pagination"></van-pager>
    <van-overlay class="ocr-loading" :show="showOverlay">
      <van-loading type="spinner" color="#1989fa">识别中...</van-loading>
    </van-overlay>
  </div>
</template>

<script>
import { Toast } from 'vant'

import { materialList, materialCodeOcr, materialUpdate } from '@a/home'

export default {
  name: 'Home',
  data() {
    return {
      params: {
        MaterialCode: '',
        UsedBrand: '',
        Model: '',
        InternalCode: ''
      },
      pagination: {
        pageSize: 10,
        pageNum: 1
      },
      showPoup: false,
      list: [],
      total: 0,
      activeName: '',
      showOverlay: false
    }
  },
  methods: {
    onSearch() {
      console.log(this.params)
      this.pagination.pageNum = 1
      this.getList()
    },
    handleMore() {
      this.showPoup = true
    },
    cancelPoup() {
      this.showPoup = false
      this.clickOverlay()
      this.getList()
    },
    clickOverlay() {
      this.params.UsedBrand = ''
      this.params.Model = ''
      this.params.InternalCode = ''
    },
    paramsConfirm() {
      this.showPoup = false
      this.pagination.pageNum = 1
      this.getList()
    },
    pageChange() {
      this.getList()
    },
    async afterRead(file, material) {
      this.showOverlay = true
      const MaterialCode = material.MaterialCode
      const res = await materialCodeOcr({ file: file.file })
      if (res.code === 0) {
        if (res.data.length === 1) {
          const InternalCode = res.data[0].text[0]
          console.log(InternalCode)
          const res1 = await materialUpdate({
            MaterialCode,
            InternalCode
          })
          console.log(res1)
          if (res1.code === 0) {
            Toast({
              message: '国际编码更新成功！',
              duration: 3000
            })
            this.getList()
          } else {
            Toast({
              message: res1.msg,
              duration: 3000
            })
          }
        } else {
          Toast({
            message: '请确保只有一个条形码，请重新识别!',
            duration: 3000
          })
        }
      } else {
        Toast({
          message: '条形码有误，请重新识别!',
          duration: 3000
        })
      }
      this.showOverlay = false
    },
    onOversize() {
      Toast('文件大小不能超过10MB')
    },
    async getList() {
      const params = this.generateParams(this.params)
      const body = Object.assign(params, this.pagination)
      const res = await materialList(body)
      console.log(res)
      this.list = res.list
      this.total = res.total
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
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  .list {
    flex: 1;
    .no-data {
      color: #646566;
      opacity: 0.5;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
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
  .ocr-loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
