<template>
  <div class="main-container"
       :style="{minHeight: windowHeight * 0.5 + 'px'}"
       @click="clickable ? click() : null"
  >
    <img
      :src="imageMap[backgroundImage]"
      alt=""
      class="invitation-bg-image"
    >
    <img :src="imageMap[infoImg]" alt="" class="title-container" mode="widthFix" />
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
    imageMap () {
      return imageMap
    }
  },

  methods: {
    click () {
      this.$emit('click')
    }
  },

  mounted () {
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
