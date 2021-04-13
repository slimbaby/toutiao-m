<template>
  <div class="home-container">
    <div class="page-nav-bar">
      <van-button icon="search" type="primary" round>搜索</van-button>
    </div>
    <!-- tab栏区域 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list :channel="item"></article-list>
      </van-tab>

      <template slot="nav-right">
        <div class="more">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="more1"></div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article_list.vue'
export default {
  name: 'home',
  components: { ArticleList },
  props: {},
  data () {
    return {
      // tab栏默认页面
      active: 0,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserChannels()
  },
  mounted () {},
  methods: {
    async getUserChannels () {
      try {
        const { data: res } = await getUserChannels()
        this.channels = res.data.channels
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.page-nav-bar {
  background-color: #3296fa;
  height: 92px;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-button {
    width: 554px;
    height: 64px;
    background-color: #5babfb;
    border: none;
  }
}
/deep/ .van-tab {
  border-right: 1px solid #ccc;
  min-width: 200px;
  height: 82px;
}
/deep/ .van_tabs__line {
  width: 30px;
  height: 6px;
  background-color: #5babfb;
}
.more {
  width: 66px;
  height: 80px;
  position: fixed;
  right: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
.more1 {
  min-width: 66px;
  height: 80px;
}
.home-container {
  padding-bottom: 100px;
}
</style>
