<template>
    <div class="detail" v-loading.body="loading">
      <div class="back" @click="close"><i class="el-icon-error" style="color: #ffffff;font-size: 30px"></i></div>
      <div class="img">
        <img :src="host + 'Uploads/'+ img" alt="" @click="zoomIn" id="img">
      </div>
    </div>
</template>

<script>
export default {
  name: 'd',
  data () {
    return {
      host: '/',
      cid: '',
      loading: false,
      img: null,
      zoom: false
    }
  },
  mounted () {
    this.loading = true
    let formdata = new FormData()
    formdata.append('id', this.$route.params.id)
    let url = this.host + 'Api/Pinyin/cardDetail'
    this.post(url, formdata, res => {
      this.loading = false
      if (res.status) {
        this.cid = res.info.cid
        this.img = res.info.thumb
      }
    })
  },
  methods: {
    post (url, data, fn) {
      let obj = new XMLHttpRequest()
      obj.open('POST', url, true)
      obj.onreadystatechange = function () {
        if (+obj.readyState === 4 && (+obj.status === 200 || +obj.status === 304 || obj.status === 0)) {
          fn.call(this, JSON.parse(obj.responseText))
        }
      }
      obj.send(data)
    },
    close () {
      this.$router.push({path: '/list/' + this.cid})
    },
    zoomIn (e) {
      if (this.zoom) {
        e.target.style.width = '100%'
        this.zoom = false
      } else {
        e.target.style.width = '150%'
        this.zoom = true
      }
    }
  }
}
</script>

<style scoped>
  .detail {
    flex: 1;
    background-color: #ffffff;
    display: flex;
    z-index: 0;
  }
  .detail .back{
    background-color: #212121;
    border-radius: 20px;
    position: fixed;
    left: 10px;
    top: 10px;
    padding: 1px;
    z-index: 1;
  }
  .detail .img{
    position: relative;
    width: 100%;
    height: 90%;
  }
  .detail .img img{
    width: 100%;
    height: auto;
  }
</style>
