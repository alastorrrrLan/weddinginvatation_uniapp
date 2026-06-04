<template>
  <div class="main-container"
       :style="{minHeight: windowHeight * 0.5 + 'px'}"
       @click="clickable ? click() : null"
  >
    <img
      :src="backgroundImgUrl"
      alt=""
      class="invitation-bg-image"
    >
    <img :src="contentImgUrl" alt="" class="title-container" mode="widthFix" />
  </div>
</template>

<script>
import {imageMap} from '../../utils/invitationUtil'
export default {
  name: 'InvitationCard',
  props: {
    backgroundImage: Object,
    infoImg: Object,
    height: String,
    width: String,
    contentImgWidth: String,
    mainHeight: String,
    clickable: Boolean
  },
  data () {
    return {
      windowWidth: wx.getSystemInfoSync().screenWidth,
      backgroundImgUrl: '',
      contentImgUrl: '',
      windowHeight: wx.getSystemInfoSync().screenHeight
    }
  },
  computed: {
  },

  methods: {
    getImageUrl (dataKey, cacheKey) {
      // 测试先不用缓存
      wx.cloud.getTempFileURL({fileList: [imageMap[this[cacheKey]]]}).then(res => {
        let url = ''
        if (res && res.fileList && res.fileList.length > 0 && res.fileList[0]) {
          url = res.fileList[0].tempFileURL ? res.fileList[0].tempFileURL : ''
          const fixParam = '?imageView2/0/1/99'
          url = url.includes('?') ? url + '&imageView2/0/1/99' : url + fixParam
          this[dataKey] = url
          wx.setStorageSync(this[cacheKey], {url, saveTime: Date.now()})
        }
      })
      // 查看缓存图片是否过期，到期时间一天
      // const cache = wx.getStorageSync(this[cacheKey])
      // if (cache && ((Date.now() - cache.saveTime) < 24 * 3600 * 1000)) {
      //   this[dataKey] = cache.url
      // } else {
      //   wx.cloud.getTempFileURL({fileList: [imageMap[this[cacheKey]]]}).then(res => {
      //     let url = ''
      //     if (res && res.fileList && res.fileList.length > 0 && res.fileList[0]) {
      //       url = res.fileList[0].tempFileURL ? res.fileList[0].tempFileURL : ''
      //       const fixParam = '?imageView2/0/1/99'
      //       url = url.includes('?') ? url + '&imageView2/0/1/99' : url + fixParam
      //       this[dataKey] = url
      //       wx.setStorageSync(this[cacheKey], {url, saveTime: Date.now()})
      //     }
      //   }
      //   )
      // }
    },
    click () {
      this.$emit('click')
    }
  },

  mounted () {
    this.getImageUrl('backgroundImgUrl', 'backgroundImage')
    this.getImageUrl('contentImgUrl', 'infoImg')
  }
}
</script>


<style scoped>
.main-container {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

}
.invitation-bg-image {
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
}
.title-container {
  z-index: 2;
  image-rendering: -webkit-optimize-contrast;
}
</style>
