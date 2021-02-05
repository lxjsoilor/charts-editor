<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#304156"
      text-color="#F2F6FC"
      active-text-color="#FFFFFF"
      :style="{top: showTopBar ? 0 : '-50px'}"
    >
      <div class="avatar fl">
        <img src="@/assets/img/logo.png">
        <b>虎彩 · 智策平台</b>
      </div>
      <el-submenu index="2">
        <template slot="title">{{ selThemeName }}</template>
        <el-menu-item
          v-for="(item, index) in themeList"
          :key="item.id"
          :index="'2-' + index"
          @click="() => switchTheme(index)"
        >{{ item.theme_name }}
        </el-menu-item>
      </el-submenu>
      <div class="avatar" title="全屏" @click="fullscreen"><svg-icon icon-class="screen" style="font-size: 20px;" /></div>
      <div class="avatar" title="首页" @click="() => { showHomePage() }"><svg-icon icon-class="home" style="font-size: 20px;" /></div>
      <div ref="dashboard" class="avatar user-info">
        <svg-icon icon-class="user" />
        <div v-show="dashboard_visiable" class="dashboard">
          <div>工号：<b>{{ $store.state.user.userInfo.user_no }}</b></div>
          <div>姓名：<b>{{ $store.state.user.userInfo.user_name }}</b></div>
          <div>公司：<b>{{ $store.state.user.userInfo.company_desc ? $store.state.user.userInfo.company_desc : '未知' }}</b></div>
          <div>部门：<b>{{ $store.state.user.userInfo.department_desc ? $store.state.user.userInfo.department_desc : '未知' }}</b></div>
          <div>当前IP：<b>{{ ip_address }}</b></div>
          <div>上次登录时间：<b>{{ $store.state.user.userInfo.last_login }}</b></div>
          <div> <el-button type="text" @click="login"><svg-icon icon-class="admin" style="font-size: 20px;" /> &nbsp 登录后台</el-button> </div>
          <div> <el-button type="text" @click="() => { showPasswordStat = true }"><svg-icon icon-class="password" style="font-size: 16px;color: #FFF;" /> &nbsp 修改密码</el-button> </div>
        </div>
      </div>
      <div class="avatar" title="退出" @click="logout"><svg-icon icon-class="logout" style="font-size: 20px;" /></div>
    </el-menu>

    <div v-show="isFull" class="zoom-out" title="退出全屏" @click="quitFullscreen"><svg-icon icon-class="zoom-out" style="font-size: 25px;" /></div>

    <!-- 修改密码弹窗 -->
    <el-dialog title="修改密码" :visible.sync="showPasswordStat" width="30%">
      <span class="password-tips">提示：系统默认密码为123</span>
      <el-form label-width="80px">
        <el-form-item label="原密码">
          <el-input v-model="oldPassword" type="password" />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newPassword" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPassword()">修改密码</el-button>
          <el-button @click="()=>{ showPasswordStat = false }">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import * as userApi from '@/api/user'
import { getYourIP } from '@/utils/index'
import md5 from 'js-md5'

export default {
  name: 'TopTab',

  props: {
    isFull: {
      type: Boolean,
      default: false
    },
    selTheme: {
      type: String,
      default: ''
    }
  },

  computed:{
    selThemeName(){
      return this.selThemeTop || this.selTheme || this.$store.state.user.themeInfo.theme_name
    }
  },

  data() {
    return {
      showTopBar: true,
      themeList: [],
      ip_address: '',
      dashboard_visiable: false,
      showPasswordStat: false,
      oldPassword: '',
      newPassword: '',
      selThemeTop: ''
    }
  },

  watch: {
    isFull: function(newVal, oldVal) {
      this.showTopBar = !newVal || this.isFixed
    }
  },

  mounted() {
    this.init()
    this.$refs.dashboard.onmouseenter = this.switchDashboard.bind(this)
    this.$refs.dashboard.onmouseleave = this.switchDashboard.bind(this)
  },

  beforeDestroy() {
    this.$refs.dashboard.onmouseenter = null
    this.$refs.dashboard.onmouseleave = null
  },

  methods: {
    init() {
      // 获取该用户的所有主题
      userApi.getThemeByUserId({
        id: this.$store.state.user.userInfo.id
      }).then(res => {
        this.themeList = res.data
      }).catch(function(err) {
        console.log(err)
      })

      // 获取当前内网IP地址
      getYourIP().then(ip_address => {
        this.ip_address = ip_address
        this.$store.dispatch('user/setIpAddress', ip_address)
      }).catch(function(err) {
        console.log(err)
      })
    },

    /**
         * 切换主题
         */
    switchTheme(index) {
      // clearInterval(this.timer)
      window.location.hash = ''
      this.selThemeTop = this.themeList[index].theme_name;
      this.$store.dispatch('user/switchTheme', this.themeList[index]).then(() => {
        this.$forceUpdate()
        this.$event.$emit('switchTheme', {})
      }).catch(function(err) {
        console.log(err)
      })
    },

    /**
         * 退出登录
         */
    logout() {
      // clearInterval(this.timer)
      this.$store.dispatch('user/logout')
      this.$router.push({
        path: '/login'
      })
    },

    /**
         * 全屏
         */
    fullscreen() {
      const ele = document.documentElement
      if (ele.requestFullscreen) {
        ele.requestFullscreen()
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen()
      } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen()
      } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen()
      }
    },

    /**
         * 返回首页
         */
    showHomePage() {
      this.$event.$emit('showHomePage', {})
    },

    /**
         * 登录后台
         */
    login() {
      this.loading = this.$loading()
      this.$store.dispatch('admin/login', {
        user_no: this.$store.state.user.userInfo.user_no.toString(),
        theme_id: this.$store.state.user.themeInfo.id
      }).then(() => {
        var roles = []
        this.loading.close()
        this.$store.dispatch('permission/generateRoutes', this.$store.state.admin.roles).then(accessedRoutes => {
          // 动态挂载路由
          this.$router.addRoutes(accessedRoutes)
          this.password = ''
          this.$router.push({
            path: '/admin/menu/configuration'
          })
        }).catch(function(err) {
          console.log(err)
        })
      }).catch(_ => {
        this.loading.close()
      })
    },

    /**
         * 修改密码
         */
    submitPassword() {
      if (md5(this.oldPassword) != this.$store.state.user.userInfo.password) {
        return this.$message({
          message: '原密码错误',
          type: 'warning'
        })
      }
      if (this.newPassword == '') {
        return this.$message({
          message: '新密码不能为空',
          type: 'warning'
        })
      }
      userApi.updateUser({
        id: this.$store.state.user.userInfo.id,
        password: this.newPassword
      }).then(res => {
        this.showPasswordStat = false
        this.$message({
          message: '密码修改成功',
          type: 'success'
        })
        this.logout()
      }).catch(err => {
        this.$message({
          message: '密码修改失败',
          type: err
        })
      })
    },

    switchDashboard() {
      this.dashboard_visiable = !this.dashboard_visiable
    },

    quitFullscreen() {
      if (document.exitFullScreen) {
        document.exitFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (element.msExitFullscreen) {
        element.msExitFullscreen()
      }
    }

  }
}
</script>
<style lang="scss">
.el-menu-demo{
    position: fixed;
    left: 0;
    width: 100%;
    height: 40px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    transition: top 1s;
    z-index: 2;
    .el-submenu__title{
        height: 39px;
        line-height: 38px;
    }
    .el-menu-item{
        height: 39px;
        line-height: 38px;
        color: #fff;
    }
    i{
        margin: 0 2px;
        color: #C0C4CC;
        font-size: 20px;
    }
    .avatar{
        height: 39px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #fff;
        margin: 0 12px;
        cursor: pointer;
    }
    .fl{
        position: absolute;
        left: 10px;
        font-size: 15px;
        img{
            height: 30px;
            margin-right: 10px;
        }
    }

    .user-info{
        position: relative;
        .dashboard{
            position: absolute;
            top: 39px;
            right: -80px;
            background-color: #304156;
            color: #fff;
            padding: 10px 20px;
            text-align: center;
            width: 240px;
            line-height: 30px;
            div{
                display: flex;
                justify-content: center;
            }
            div:nth-last-child(2){
                margin-top: 10px;
                border-top: 1px solid #ccc;
            }
        }
    }
}
.zoom-out{
    position: fixed;
    right: 10px;
    bottom: 50px;
    background-color: rgba(48, 65, 86, 0.75);
    padding: 12px;
    border-radius: 50%;
    cursor: pointer;
}
.el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 40px;
    line-height: 40px;
    border-bottom-color: #304156 !important;
}
.el-menu.el-menu--horizontal{
    border-bottom: none;
}

.el-menu--popup-bottom-start{
    margin-top: 0;
}

.password-tips{
    position: relative;
    top: -20px;
    left: 27px;
    color: #999;
}
</style>
