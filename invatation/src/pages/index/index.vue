<template>
    <div class="invitation-container">
      <invitation-card
        background-image="backgroundImage"
        info-img="invitationImage"
      />
      <invitation-card
        background-image="otherBackgroundImage"
        info-img="timelineImage"
      />
      <invitation-card
        background-image="otherBackgroundImage"
        info-img="dressCodeImage"
      />
      <invitation-card
        background-image="otherBackgroundImage"
        info-img="weddingvenueImage"
        :clickable="true"
        @click="gotoLocation"
      />
      <invitation-card
        background-image="otherBackgroundImage"
        info-img="hintImage"
      />
      <invitation-card
        background-image="otherBackgroundImage"
        info-img="blessingImage"
      />
    </div>
</template>

<script>
import invitationCard from '../../components/invitation/invitationCard.vue'
import {commonVar, commonString, dbKeyMap} from '../../utils/CommonVar'

export default {
  data () {
    return {
      windowWidth: wx.getAppBaseInfo().screenWidth,
      locationMap: null
    }
  },

  components: {
    invitationCard
  },

  methods: {
    gotoLocation () {
      if (!this.locationMap) {
        this.getLocation(() => {
          wx.openLocation({...this.locationMap, scale: 16, name: '鉴宽山房'})
        })
      } else {
        wx.openLocation({...this.locationMap, scale: 16, name: '鉴宽山房'})
      }
    },
    getLocation (cb) {
      const key = commonVar.qqmapKey
      wx.request({
        url: commonVar.locationAPI + `${encodeURIComponent(commonString.locationKeyword)}&key=${key}`,
        success: (res) => {
          if (res.statusCode === 200) {
            if (res && res.data && res.data.result && res.data.result.location) {
              const {lat, lng} = res.data.result.location
              this.locationMap = {latitude: lat, longitude: lng}
              cb && cb(res)
            }
          }
        },
        fail: (err) => {
          console.error('err', err)
        }
      })
    }
  },

  mounted () {
    // 初始化地图经纬度
    const db = wx.cloud.database()
    db.collection(dbKeyMap.location).get({
      success: res => {
        if (res.data && res.data.length > 0) {
          this.locationMap = res.data[0].location
        } else {
          this.getLocation(() => {
            db.collection(dbKeyMap.location).add({
              data: {
                location: {
                  latitude: this.locationMap.latitude,
                  longitude: this.locationMap.longitude
                }
              }
            })
          })
        }
      }
    })
  }
}
</script>

<style scoped>
.invitation-container {
  height: auto;
  display: flex;
  flex-direction: column;
}

</style>
