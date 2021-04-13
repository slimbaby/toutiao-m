<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="successText" success-duration="1000">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      successText: '',
      refreshing: false,
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false
    }
  },
  methods: {
    // 下拉刷新的方法
    async onRefresh () {
      try {
        const res = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        this.list.unshift(...res.data.data.results)
        this.refreshing = false
        this.successText = `更新了${res.data.data.results.length}条数据`
      } catch (err) {}
    },
    // 首屏数据加载
    async onLoad () {
      try {
        const res = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        this.list.push(...res.data.data.results)
        this.timestamp = res.data.data.pre_timestamp
        this.loading = false
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
</style>
