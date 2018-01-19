<template>
  <div class="list">
    <v-header></v-header>
    <div class="content" v-loading.body="loading">
      <div class="menu">
        <router-link to="/" class='menu-title'><img src="../assets/back.png" alt="返回"> 返回
        </router-link>
        <span class="category">{{ category }}</span>
        <router-link to="/" class='menu-title'><img src="../assets/home.png" alt="首页"> 首页</router-link>
      </div>
      <ul class="wrapper">
        <li v-for="(item, index) in info" v-bind:key="index"
            :class="[index % 2 === 0?'white':'green']"
            :title="item.title"
            @click="detail(item.id)">
          <i class="el-icon-arrow-right" style="font-weight: bold;color: #adadad"></i><span class="space">{{ item.title }}</span>
        </li>
      </ul>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import footer from '@/components/footer'
import header from '@/components/header'

const Host = '/Api/Pinyin/'
export default {
  name: 'list',
  components: {
    'v-footer': footer,
    'v-header': header
  },
  data () {
    return {
      category: '',
      cid: '',
      title: '',
      info: '',
      loading: false
    }
  },
  created () {
    let formdata = new FormData()
    formdata.append('cid', this.$route.params.cid)
    this.loading = true
    let url = Host + 'category'
    this.post(url, formdata, res => {
      this.loading = false
      if (res.status) {
        this.category = res.info['category']
        this.info = res.info['list']
      } else {
        console.log(res.info)
      }
    })
  },
  methods: {
    post (url, data, fn) { // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
      let obj = new XMLHttpRequest()
      obj.open('POST', url, true)
      obj.onreadystatechange = function () {
        if (+obj.readyState === 4 && (+obj.status === 200 || +obj.status === 304 || +obj.status === 0)) { // 304未修改
          fn.call(this, JSON.parse(obj.responseText))
        }
      }
      obj.send(data)
    },
    detail (el) {
      this.$router.push({path: '/detail/' + el})
    }
  }
}
</script>
<style scoped>
  .list {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .list .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .list .content .menu {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 15px;
    color: #fff;
    background-color: #7fbe28;
  }

  .list .content .menu .menu-title {
    font-size: 13px;
    color: #fff;
    text-decoration: none;
  }

  .list .content .menu .menu-title img {
    width: 13px;
    height: 13px;
    margin-bottom: -1px;
  }

  .list .content .wrapper {
    flex: 1;
    overflow-y: auto;
    margin: 0;
    padding: 0;
    color: #000507;
  }

  .list .content .wrapper li {
    padding: 10px;
  }

  .list .content .wrapper .white {
    background-color: #fff;
    margin: 3px;
    border-radius: 3px;
  }

  .list .content .wrapper .green {
    background-color: #c7ed91;
    margin: 3px;
    border-radius: 3px;
  }
</style>
