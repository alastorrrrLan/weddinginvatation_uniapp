<script>
import {imageMap} from '../../utils/invitationUtil'
import {dbKeyMap} from '../../utils/CommonVar'

export default {
  name: 'GuestTab',
  props: {
    hidden: Boolean
  },
  data () {
    return {
      windowWidth: wx.getAppBaseInfo().screenWidth,
      windowHeight: wx.getAppBaseInfo().screenHeight,
      formData: {
        name: '',
        number: '',
        stay: '',
        childrenNumber: '',
        petsNumber: ''
      },
      originalFormData: {
        name: '',
        number: '',
        stay: '',
        childrenNumber: '',
        petsNumber: ''
      },
      stayList: [
        '留宿', '不留宿'
      ],
      showSelect: false,
      hasSubmitted: false
    }
  },
  methods: {
    changeSelect (stayValue) {
      this.formData.stay = stayValue
      this.showSelect = false
    },
    async getUserForm () {
      const db = this.$db
      db.collection(dbKeyMap.guestInformation).where({
        _openid: db.command.eq(wx.cloud.DYNAMIC_OPENID)
      }).get({
        success: res => {
          if (res.data.length > 0) {
            const info = res.data[0]
            this.formData.name = info.name
            this.formData.number = info.number
            this.formData.stay = info.stay
            this.formData.childrenNumber = info.childrenNumber
            this.formData.petsNumber = info.petsNumber
            this.hasSubmitted = true
            this.originalFormData.name = info.name
            this.originalFormData.number = info.number
            this.originalFormData.stay = info.stay
            this.originalFormData.childrenNumber = info.childrenNumber
            this.originalFormData.petsNumber = info.petsNumber
          }
        }
      })
    },
    onSubmit () {
      if (this.buttonDisabled) {
        return
      }
      wx.showLoading({
        mask: true
      })
      const db = this.$db
      db.collection(dbKeyMap.guestInformation).where({
        _openid: db.command.eq(wx.cloud.DYNAMIC_OPENID)
      }).get({
        success: async res => {
          const submitInfo = {...this.formData}
          if (res.data.length > 0) {
            await db.collection(dbKeyMap.guestInformation).doc(res.data[0]._id).update({data: submitInfo})
          } else {
            await db.collection(dbKeyMap.guestInformation).add({data: submitInfo})
          }
          wx.hideLoading()
          wx.showToast({title: '已严肃收到🫡'})
          this.originalFormData.name = this.formData.name
          this.originalFormData.number = this.formData.number
          this.originalFormData.stay = this.formData.stay
          this.originalFormData.childrenNumber = this.formData.childrenNumber
          this.originalFormData.petsNumber = this.formData.petsNumber
          this.hasSubmitted = true
        },
        fail: err => {
          console.log('err', err)
        }
      })
    }
  },
  computed: {
    selectedIcon () {
      return imageMap.selected
    },
    buttonDisabled () {
      if (this.hasSubmitted) {
        return this.formData.name === '' ||
        this.formData.stay === '' ||
        this.formData.number === '' ||
        this.formData.childrenNumber === '' ||
        this.formData.petsNumber === '' ||
        (
          this.originalFormData.stay === this.formData.stay &&
            this.originalFormData.childrenNumber === this.formData.childrenNumber &&
            this.originalFormData.petsNumber === this.formData.petsNumber &&
            this.originalFormData.name === this.formData.name &&
            this.originalFormData.number === this.formData.number
        )
      }
      return this.formData.name === '' ||
        this.formData.stay === '' ||
        this.formData.number === '' ||
        this.formData.childrenNumber === '' ||
        this.formData.petsNumber === ''
    }
  },
  mounted () {
    this.getUserForm()
  }
}
</script>

<template>
  <div
    :style="{display: hidden ? 'none' : ''}"
    class="information-container"
  >
    <form @submit="" class="form-container" :style="{height: windowHeight + 'px', width: windowWidth + 'px'}">
      <div class="form-item-container">
        <label class="form-item-label">来者何人？</label>
        <div class="brush-container">
          <input type="text" v-model="formData.name" placeholder="请输入姓名" class="input"/>
        </div>
      </div>
      <div class="form-item-container" style="margin-top: 10px;">
        <label class="form-item-label">结伴几员？（仅限大人）</label>
        <div class="brush-container">
          <input v-model="formData.number" class="input" type="number" placeholder="请输入随行人数"/>
        </div>
      </div>
      <div class="form-item-container" style="margin-top: 10px;">
        <label class="form-item-label">人类幼崽几何？</label>
        <div class="brush-container">
          <input v-model="formData.childrenNumber" class="input" type="number" placeholder="请输入小朋友人数"/>
        </div>
      </div>
      <div class="form-item-container" style="margin-top: 10px;">
        <label class="form-item-label">毛孩子几位？</label>
        <div class="brush-container">
          <input v-model="formData.petsNumber" class="input" type="number" placeholder="请输入携带宠物数量"/>
        </div>
      </div>
      <div class="form-item-container" style="margin-top: 10px;">
        <label class="form-item-label">落脚留宿否？</label>
        <div class="brush-container" @click="showSelect=true">
          {{formData.stay}}
        </div>
      </div>
    </form>
    <div class="button-container">
      <div class="btn-brush" :class="buttonDisabled ? 'btn-disabled' : ''" @click="onSubmit">
        确定提交
      </div>
    </div>
    <div v-if="showSelect" class="mask" @click="showSelect=false">
      <div class="popover" @click.stop>
        <div class="opt" v-for="item in stayList" :key="item" @click="changeSelect(item)">
          <img :src="selectedIcon" alt="" v-show="item===formData.stay" class="selected-icon">
          {{item}}
        </div>
      </div>
    </div>
    <img
      class="information-bg"
      src="cloud://cloud1-d1giw0qij607a4b14.636c-cloud1-d1giw0qij607a4b14-1439949452/invitationImg/otherBg.png"
      alt=""
    >
  </div>
</template>

<style scoped>
.information-container {
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.form-container {
  flex: 1;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 32px;
}
.information-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.form-item-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
}
.brush-container {
  position: relative;
  filter: drop-shadow(0px 0 1px #333) drop-shadow(1px 1px 1px #333);
  width: 100%;
  background: #ffffff;
  /* 多层clip-path分段不规则，模拟毛笔蘸墨参差不齐边缘 */
  clip-path: polygon(
    1% 3%, 99% 1%,
    98% 4%, 99% 96%,
    97% 99%, 2% 97%,
    0 95%, 2% 2%
  );
  /* 多层内外阴影 = 墨迹扩散+毛边毛刺 */
  box-shadow:
    1rpx 0 1rpx #111,
    -1rpx 0 1rpx #222,
    0 1rpx 1rpx #1a1a1a,
    0 -1rpx 1rpx #252525,
    2rpx 2rpx 3rpx rgba(0,0,0,0.18),
    -1rpx -1rpx 2rpx rgba(0,0,0,0.1);
  /* 毛边模糊羽化，毛笔晕墨效果 */
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.form-item-label {
  font-family: cute-font;
  font-weight: 600; /* 加粗 */
  letter-spacing:2px; /* 字间距拉开更可爱 */
  width: 100%;
  height: 80rpx;
  border: none;
  outline: none;
  background: transparent;
  font-size: 20px;
  padding: 0 10px;
  color: #be000c;
}
.input {
  font-family: cute-font;
  font-weight: 400; /* 加粗 */
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.popover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 20rpx 20rpx 0 0;
}
.opt {
  height: 150rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 90rpx;
  font-size: 50rpx;
  font-family: cute-font;
  background: #ffffff;
  border-bottom: #1a1a1a 1px solid;
}
.selected-icon {
  width: 50rpx;
  height: 50rpx;
  margin-right: 20rpx;
}
.button-container {
  z-index: 2;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.btn-brush{
  clip-path: polygon(
    1% 3%, 99% 1%,
    98% 4%, 99% 96%,
    97% 99%, 2% 97%,
    0 95%, 2% 2%
  );
  /* 多层内外阴影 = 墨迹扩散+毛边毛刺 */
  box-shadow:
    1rpx 0 1rpx #111,
    -1rpx 0 1rpx #222,
    0 1rpx 1rpx #1a1a1a,
    0 -1rpx 1rpx #252525,
    2rpx 2rpx 3rpx rgba(0,0,0,0.18),
    -1rpx -1rpx 2rpx rgba(0,0,0,0.1);
  filter: drop-shadow(0px 0 1px #333) drop-shadow(1px 1px 1px #333);
  position: relative;
  padding:16rpx 40rpx;
  background:#ff7828;
  border:none;
  font-family: cute-font;
  font-weight: 600; /* 加粗 */
  color: #f5600a;
  font-size: 32rpx;
  /* 四层阴影拼成白边 */
  text-shadow:
    1px 1px #fff,
    -1px 1px #fff,
    1px -1px #fff,
    -1px -1px #fff;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  /* 笔刷锯齿边缘：伪元素做毛边外扩 */
}
.btn-brush::before{
  content:"";
  position:absolute;
  inset:-6rpx;
  background-image: radial-gradient(#ff7828 2px,transparent 2px);
  background-size:6rpx 6rpx;
  z-index:-1;
  border-radius:12rpx;
  filter: blur(1rpx);
}
.btn-brush:active {
  opacity: 0.8;
}
.btn-disabled {
  opacity: 0.2;
}
.btn-disabled:active {
  opacity: 0.2;
}
</style>
