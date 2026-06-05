<template>
  <div style="height: 100vh; width: 100%;">
    <invitation-tab :hidden="current !== 0"></invitation-tab>
    <guest-tab :hidden="current !== 1"></guest-tab>
    <tab-bar :current="current" @switch-tab="switchTab"/>
  </div>
</template>

<script>
import invitationCard from '../../components/invitation/invitationCard.vue'
import InvitationTab from '../../components/invitation/invitationTab.vue'
import TabBar from '../../components/tabBar.vue'
import GuestTab from '../../components/invitation/guestTab.vue'

export default {
  data () {
    return {
      current: 0
    }
  },

  components: {
    GuestTab,
    TabBar,
    InvitationTab,
    invitationCard
  },

  methods: {
    switchTab (index) {
      this.current = index
    }
  },

  mounted () {
  }
}
</script>

<style scoped>
</style>
