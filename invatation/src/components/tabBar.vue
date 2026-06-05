<template>
  <div class="tab-bar-container" :style="{width: width + 'px'}">
    <div class="bar-container">
      <div v-for="(tab, index) in tabList" :key="tab.key">
        <div class="tab-item" @click="switchTab(index)">
          <img
            :src="index === current ? iconMap[tab.key + 'Active'] : iconMap[tab.key]"
            class="tab-img"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {imageMap} from '../utils/invitationUtil'

export default {
  name: 'TabBar',
  props: {
    current: Number
  },
  data () {
    return {
      currentTab: 0,
      width: wx.getAppBaseInfo().screenWidth,
      tabList: [
        {
          pagePath: '/pages/index/main',
          text: '邀请函',
          key: 'invitation'
        },
        {
          pagePath: '/pages/info/main',
          text: '宾客信息',
          key: 'guest'
        }
      ],
      iconMap: {
        invitation: imageMap.invitation,
        invitationActive: imageMap.invitationActive,
        guest: imageMap.guest,
        guestActive: imageMap.guestActive
      }
    }
  },
  methods: {
    switchTab (index) {
      this.$emit('switch-tab', index)
    }
  }
}
</script>


<style scoped>
.tab-bar-container {
  width: 100%;
  height: 65px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding-bottom: env(safe-area-inset-bottom);
}
.bar-container {
  display: flex;
  background-color: rgba(214, 230, 237, 0.8);
  border-color: aqua;
  width: 80%;
  border-radius: 30px;
  justify-content: space-around;
  align-items: center;
}
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tab-img {
  width: 60px;
  height: 70px;
}
</style>
