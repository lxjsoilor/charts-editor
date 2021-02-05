<template>
  <div class="hc-story-board">
    <el-button @click="addStoryBoard">新建故事板</el-button>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    methods: {
      addStoryBoard() {
        this.$router.push('/admin/analysis/storyboardAdd')
      }
    },
    computed: {
      ...mapGetters(['sidebar', 'avatar'])
    },
    beforeRouteLeave(to, from, next) {
      if (this.sidebar.opened) {
        this.$store.dispatch('app/toggleSideBar')
      }
      next()
    }
  }

</script>

<style>

</style>
