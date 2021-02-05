<template>
  <div class="navbar" :style="{width: 'calc(100% - ' + (sidebar.opened ? '210px' : '54px') + ')'}">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <b>{{ $store.state.admin.themeInfo.theme_name }}</b>
          <i class="el-icon-arrow-down el-icon--right" />
        </div>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item v-for="item in themeList" :key="item.id">
            <span style="display:block;" @click="() => { switchTheme(item) }">{{ item.theme_name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="avatar-wrapper" style="margin: 0 10px;" title="返回前台" @click="backHome">
        <span style="font-size: 24px; color:#606266;">
          <svg-icon icon-class="home-black" />
        </span>
        <span style="font-size: 14px; position: relative; top: -2px; color:#606266;" />
      </div>

      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
          <span style="font-size: 16px; ">
            <svg-icon icon-class="user" />
          </span>
          <span>
            <b>{{ $store.state.admin.userInfo.user_name }}</b>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <div class="admin-info">工号 : {{ $store.state.admin.userInfo.user_no }}</div>
            <div class="admin-info">姓名 : {{ $store.state.admin.userInfo.user_name }}</div>
            <div
              class="admin-info"
            >公司 : {{ $store.state.admin.userInfo.company_desc ? $store.state.admin.userInfo.company_desc : '未知' }}</div>
            <div
              class="admin-info"
            >职位 : {{ $store.state.user.userInfo.job_desc ? $store.state.user.userInfo.job_desc : '未知' }}</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div
              class="admin-info"
              style="height: 36px;border-top: 1px solid #eee;margin-top: 10px;"
            >
              <el-button type="text" @click="logout">
                <svg-icon icon-class="back" />退出
              </el-button>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { login } from '@/api/admin'
import { getThemeList } from '@/api/admin'
import { resetRouter } from '@/router/index'
import eventBus from '@/utils/eventBus'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      themeList: []
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  mounted() {
    getThemeList({
      id: this.$store.state.admin.userInfo.id
    }).then(res => {
      this.themeList = res.data
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('admin/logout')
      this.$router.replace('/login')
    },
    /**
     * 删除主题
     */
    switchTheme(themeInfo) {
      this.$store.dispatch('user/switchTheme', themeInfo)
      this.$store
        .dispatch('admin/login', {
          user_no: this.$store.state.admin.userInfo.user_no.toString(),
          theme_id: themeInfo.id
        })
        .then(() => {
          this.$store
            .dispatch(
              'permission/generateRoutes',
              this.$store.state.admin.roles
            )
            .then(accessedRoutes => {
              resetRouter()
              this.$forceUpdate()
              // 动态挂载路由
              this.$router.addRoutes(accessedRoutes)
              eventBus.$emit('change-theme')
              this.$router.replace({
                path: `/admin/menu/configuration`
              })
            })
        })
    },
    backHome() {
      this.$store.dispatch('admin/resetToken').then(() => {
        this.$router.replace({
          path: '/'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: fixed;
  background: #fff;
  z-index: 1;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin: 0 10px;
      display: flex;
      align-items: center;
      .avatar-wrapper {
        position: relative;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="scss">
.el-popper {
  margin-top: 5px !important;
  padding: 5px 0;
}
.admin-info {
  text-align: center;
  font-size: 14px;
  height: 28px;
  line-height: 28px;
}
</style>
