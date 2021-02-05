<template>
  <div>
    <div v-show="showOver" class="m-over-click" @click="overHideMenu" />

    <div ref="menuContainer" class="trigger-zoom" :style="{top: !isFull ? '40px' : 0, height: !isFull ? 'calc(100vh - 40px)' : '100vh'}">
      <el-menu
        default-active="2"
        class="vertical-menu"
        background-color="#304156"
        text-color="#F2F6FC"
        active-text-color="#FFFFFF"
        :unique-opened="true"
        :style="{left: showMenu ? '-25px' : '-200px', width: '200px'}"
      >
        <div class="top_menu">
          <input
            v-show="showSearchInput"
            v-model="searchText"
            type="text"
            @keyup.enter="searchMenu"
            @keyup.esc="() => { searchText = '' ; showSearchInput = false; }"
          >
          <svg-icon icon-class="sub-menu" style="float: right;" @click="fixMenu" />
          <svg-icon v-show="!showSearchInput && isFixed == '1'" icon-class="fix" style="float: right;" @click="fixMenu" />
          <svg-icon v-show="!showSearchInput && isFixed == '0'" icon-class="unfix" style="float: right;" @click="fixMenu" />
          <svg-icon icon-class="magnifier" style="float: right; margin-right: 10px;" @click.stop="searchMenu" />
        </div>
        <el-menu-item>
          <el-submenu v-for="(item, index) in menuList" :key="item.id" :index="index.toString()">
            <template slot="title">
              <div :title="item.menu_title" @click="changeMenu(item, true)">
                <div v-if="item.children && item.children.length > 0">
                  <svg-icon icon-class="collection" style="margin-left: 5px;" /> {{ item.menu_title }}
                </div>
                <div v-else @touchstart.stop="() => { showMenu = false }">
                  {{ item.menu_title }}
                </div>
              </div>
            </template>
            <el-submenu v-for="(subItem, subIndex) in item.children" :key="subItem.id" :index="index + '-' + subIndex">
              <template slot="title">
                <div :title="subItem.menu_title" @click="changeMenu(subItem, true)">
                  <div v-if="subItem.children && subItem.children.length > 0">
                    <svg-icon icon-class="collection" style="margin-left: 5px;" /> {{ subItem.menu_title }}
                  </div>
                  <div v-else @touchstart.stop="() => { showMenu = false }">
                    {{ subItem.menu_title }}
                  </div>
                </div>
              </template>
              <el-menu-item
                v-for="(cellItem, cellIndex) in subItem.children"
                :key="cellItem.id"
                :index="index + '-' + subIndex + '-' + cellIndex"
                :title="cellItem.menu_title"
                @click="changeMenu(cellItem, true)"
              >
                <div @touchstart.stop="() => { showMenu = false }">
                  <svg-icon v-show="subItem.children && subItem.children.length > 0" icon-class="file" style="margin-left: 5px;" /> {{ cellItem.menu_title }}
                </div>
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu-item>
        <!-- <div class="icon-1" @click="() => showMenu = !showMenu">
                    <i v-if="showMenu" class="el-icon-arrow-left"></i>
                    <i v-else class="el-icon-arrow-right"></i>
                </div> -->
      </el-menu>

      <div class="arrow-tips" @click.stop="() => { showMenu = true }">
        <svg-icon icon-class="right" />
      </div>
    </div>

    <div
      v-show="subMenuList.length > 0"
      class="sub_menu_wrap"
      :style="{
        top: !isFull ? '40px' : 0,
        width: showMenu ? 'calc(100% - 175px)' : '100%',
        opacity: showSubMenu ? 1 : 0
      }"
    >
      <div ref="subMenuWrap" class="sub_menu_wrap_inner">
        <ul ref="subMenu" class="sub_menu clearfix" :style="{ left: offsetX + 'px' }" @mousedown.capture="mouseDownHandler" @mouseup.capture="() => { clientX = null }" @mouseleave.capture="() => { clientX = null }" @mousemove.capture="mousemoveHandler">
          <li v-for="(item, index) in subMenuList" :key="item.id" :class="{active: counter == index}" @click.stop="() => { counter = index; $emit('change', item, index) }">{{ item.title }}</li>
        </ul>
      </div>
    </div>

    <div v-show="subMenuList.length > 0" class="pull-icon" :style="{top: isFull ? '10px' : '50px'}">
      <svg-icon :icon-class="showSubMenu ? 'pull-up' : 'pull-down'" @click.stop="() => { changeSubMenu(!showSubMenu) }" />
    </div>

  </div>
</template>
<script>
import * as userApi from '@/api/user'
import * as themeApi from '@/api/theme'
import * as resourcesAPi from '@/api/resources'
var menuList = []
export default {
  name: 'MenuList',

  props: {
    isFull: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showMenu: true,
      isFixed: sessionStorage.getItem('isFixed') || '0',
      homeResources: {},
      menuList: [],
      showSearchInput: false,
      searchText: '',
      subMenuList: [],
      counter: 0,
      showSubMenu: true,
      obj: {},
      clientX: null,
      offsetX: 0,
      showOver: false
    }
  },

  watch: {
    isFull: function(newVal, oldVal) {
      this.showMenu = !newVal || this.isFixed == '1'
    },
    $route(to, from) {
      // this.init()
    }
  },

  mounted() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if(flag){
      this.showOver = true
    }

    this.init()
    this.$event.$on('showHomePage', () => {
      this.changeMenu(this.homeResources)
    })
    this.$event.$on('switchTheme', () => {
      this.render()
    })
  },

  beforeDestroy() {
    this.$refs.menuContainer.onmouseenter = null
    this.$refs.menuContainer.onmouseleave = null
  },

  methods: {
    init() {
      this.$refs.menuContainer.onmouseenter = this.switchMenuStat.bind(this, true)
      this.$refs.menuContainer.onmouseleave = this.switchMenuStat.bind(this, false)
      
      // 如果初始化携带id，进行反查，展现对应的看板和菜单
      if (window.location.hash.indexOf('id=') != -1) {
        var resources_id = window.location.hash.slice(window.location.hash.indexOf('id=') + 3)
        resourcesAPi.getResourcesDetail({ id: resources_id }).then(res => {
          const _id = res.data && res.data.theme_id
          if (_id) {
            userApi.getThemeByUserId({
              id: this.$store.state.user.userInfo.id
            }).then(res => {
              const _list = res.data
              for (let i = 0; i < _list.length; i++) {
                if (_id === _list[i].id) {
                  this.$store.dispatch('user/switchTheme', _list[i]).then(() => {
                    this.$emit('changeSelTheme', _list[i].theme_name);
                    this.render()
                  }).catch(function(err) {
                    console.log(err)
                  })
                  break
                }
              }
            }).catch(function(err) {
              console.log(err)
            })
          } else {
            this.render()
          }
        })
      } else {
        //是否有浏览过的租户id
        userApi.getUserHistory({
          id: this.$store.state.user.userInfo.id
        }).then(timeList => {
          if(timeList.data.length && timeList.data[0].theme_id != 1){
              userApi.getThemeByUserId({
                id: this.$store.state.user.userInfo.id
              }).then(res => {
                const _list = res.data
                for (let i = 0; i < _list.length; i++) {
                  if (timeList.data[0].theme_id == _list[i].id) {
                    this.$store.dispatch('user/switchTheme', _list[i]).then(() => {
                      console.log('>>>>>>>>>', _list[i])
                      this.$emit('changeSelTheme', _list[i].theme_name);
                      this.render()
                    }).catch(function(err) {
                      console.log(err)
                    })
                    break
                  }
                }
              }).catch(function(err) {
                console.log(err)
              })
          } else {
            userApi.getThemeByUserId({
              id: this.$store.state.user.userInfo.id
            }).then(res => {
              const _list = res.data;
              for (let i = 0; i < _list.length; i++) {
                const item = _list[i];
                if(item.id!=1){
                  this.$store.dispatch('user/switchTheme', item).then(() => {
                    this.$emit('changeSelTheme', item.theme_name);
                    this.render()
                  }).catch(function(err) {
                    console.log(err)
                  })
                  break
                }
              }
            }).catch(function(err) {
              console.log(err)
            })
          }
        }).catch(function(err) {
          console.log(err)
        })
        
      }
    },

    render() {
      // 查询用户可以查看的资源
      userApi.listResourcesMenu({
        theme_id: this.$store.state.user.themeInfo.id,
        user_id: this.$store.state.user.userInfo.id,
        // isOwner: this.$store.state.user.userInfo.isOwner || this.$store.state.user.userInfo.admin ? 1 : 0,
        isOwner: this.$store.state.user.userInfo.admin ? 1 : 0,
        tree: 1
      }).then(res => {
        this.menuList = menuList = res.data
      }).catch(function(err) {
        console.log(err)
      })

      // 根据url对应资源id跳转到对应页面
      if (window.location.hash.indexOf('id=') != -1) {
        var resources_id = window.location.hash.slice(window.location.hash.indexOf('id=') + 3)
        resourcesAPi.getResourcesDetail({ id: resources_id }).then(res => {
          this.changeMenu(res.data)
        }).catch(function(err) {
          console.log(err)
        })
      }

      // 获取首页信息
      themeApi.getHomeInfo({
        theme_id: this.$store.state.user.themeInfo.id
      }).then(result => {
        if (result.data) {
          this.homeResources = result.data
          if (window.location.hash.indexOf('id=') == -1) {
            this.changeMenu(result.data)
          }
        }
      }).catch(function(err) {
        console.log(err)
      })
    },

    // 固定/取消固定 左边菜单栏
    fixMenu() {
      if (this.isFixed == '1') {
        this.isFixed = '0'
        this.$refs.menuContainer.onmouseenter = this.switchMenuStat.bind(this, true)
        this.$refs.menuContainer.onmouseleave = this.switchMenuStat.bind(this, false)
      } else {
        this.isFixed = '1'
        this.$refs.menuContainer.onmouseenter = null
        this.$refs.menuContainer.onmouseleave = null
      }
      sessionStorage.setItem('isFixed', this.isFixed)
      // this.changeMenu(this.currentResources)
      if (!this.isFixed) {
        this.$emit('switch-fix', false)
      } else {
        this.$emit('switch-fix', true)
      }
    },

    switchMenuStat(stat) {
      // 如果已经固定左边栏，则不给收缩
      if (this.isFixed == '1') return
      this.showMenu = stat
    },

    /**
         * 切换菜单
         */
    changeMenu(resources, flag) {
      // 打卡方式，查看是否是新窗口打开
      if (flag && resources.open_type) {
        window.open(`#/?id=${resources.id}`, '_blank')
        return
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this._changeMenu(resources)
      }, 1000)
    },

    async _changeMenu(resources) {
      this.$store.dispatch('user/addHistory', resources.id)
      this.currentResources = resources
      window.location.hash = `#/?id=${resources.id}`
      if (!resources) {
        this.isFree = true
        this.iframeUrl = ''
        return
      }

      // 查看有没有权限
      // 超级管理员不用判断权限
      // 资源是公开的，并且当前租户非示例租户，需要判断用户是否属于当前租户
      // 资源是非公开的，不管是示例租户还是非示例租户，都需要判断用户是否属于当前租户
      console.log(resources, this.$store.state.user)
      if ((!this.$store.state.user.userInfo.admin && resources.public == 1 && this.$store.state.user.themeInfo.id != 1) || (!this.$store.state.user.userInfo.admin && resources.public != 1)) {
        const userList = await userApi.listResourcesMenu({
          theme_id: this.$store.state.user.themeInfo.id,
          user_id: this.$store.state.user.userInfo.id,
          isOwner: this.$store.state.user.userInfo.admin ? 1 : 0,
          tree: ''
        })
        const themeDetail = await userApi.getThemeDetail({ theme_id: resources.theme_id })
        let hasUserId = false
        for (let i = 0; i < userList.data.length; i++) {
          if (userList.data[i].id == resources.id) {
            hasUserId = true
            break
          }
        }
        if (!hasUserId) {
          this.$emit('noPower', themeDetail.data)
          return
        }
      }

      document.title = `${resources.menu_title} - ${this.$store.state.user.themeInfo.theme_name} - 虎彩 · 智策平台`
      clearInterval(this.timer)
      var links = resources.links; var counter = 0
      // if (!links || links.length == 0) return
      if (!links || links.length == 0) {
        this.$emit('noLink')
        this.subMenuList = []
      }
      if (links.length == 1) {
        this.changeSubMenu(false)
        this.subMenuList = []
        this.$emit('change', links[0])
      }
      if (links.length > 1) {
        this.changeSubMenu(true)
        this.subMenuList = links
        // 染完轮播列表后设置left，已达到居中目的
        this.$nextTick(() => {
          this._setMenuPostion()
        })
        this.$emit('change', links[counter++])
        // 设置了轮播间隔 且间隔大于3000毫秒
        if (resources.delay && resources.delay >= 3000) {
          this.timer = setInterval(() => {
            if (counter >= links.length) {
              counter = 0
            }
            this.counter = counter
            this.$emit('change', links[counter])
            counter++
          }, resources.delay)
        }
      }
    },

    /**
         * 渲染完轮播列表后设置left，已达到居中目的s
         */
    _setMenuPostion() {
      this.offsetX = 0
      this.$nextTick(() => {
        var wrapWidth = this.$refs.subMenuWrap.clientWidth
        var contentWidth = this.$refs.subMenu.clientWidth
        this.offsetX = wrapWidth - contentWidth < 0 ? 0 : (wrapWidth - contentWidth) / 2
      })
    },

    /**
         * 搜索过滤
         */
    searchMenu() {
      if (!this.showSearchInput) {
        this.showSearchInput = true
        if (!this.isFixed) this.fixMenu()
        this.searchText = ''
        return
      }
      if (this.searchText) {
        var result = []
        RecursiveFilteMenu(menuList, this.searchText)
        function RecursiveFilteMenu(arr, key) {
          arr.map(item => {
            if (item.menu_title.indexOf(key) != -1) {
              result.push(item)
            } else if (Array.isArray(item.children)) {
              RecursiveFilteMenu(item.children, key)
            }
          })
        }
        this.menuList = result
        this.showSearchInput = false
      } else {
        this.menuList = menuList
        this.showSearchInput = false
      }
    },

    mouseDownHandler(e) {
      if (this.$refs.subMenu.clientWidth >= this.$refs.subMenuWrap.clientWidth) {
        this.clientX = e.clientX
      }
    },

    mousemoveHandler(e) {
      if (this.clientX === null) return
      var offsetX = e.clientX - this.clientX
      this.offsetX = this.offsetX + offsetX > 0 ? 0 : this.offsetX + offsetX
      this.clientX = e.clientX
    },

    changeSubMenu(value) {
      this.showSubMenu = value
      this.$parent.changeSubMenu(value)
    },

    overHideMenu() {
      this.showOver = false
      if (!this.isFixed) {
        this.showMenu = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.m-over-click{
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.trigger-zoom{
    position: fixed;
    width: 5px;
    left: 0;
    height: 100vh;
    z-index: 1;
    .vertical-menu{
        position: absolute;
        padding-bottom: 50px;
        width: 100%;
        height: 100%;
        top: 0;
        transition: left 1s;
        overflow-y: scroll;
        z-index: 1;
    }
}

.icon-1{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: calc(50vh - 30px);
    left: 250px;
    width: 40px;
    height: 60px;
    font-size: 30px;
    background-color: rgba(0,0,0,.1)
}

.top_menu{
    height: 40px;
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    input{
        width: 78%;
        margin-right: 5px;
        margin-top: -5px;
        height: 25px;
        line-height: 28px;
        border-radius: 5px;
        background-color: rgb(48, 49, 51);
        border: none;
        outline: none;
        font-size: 12px;
        padding: 0 5px;
        color: #ccc;
        letter-spacing: 2px;
    }
}

.arrow-tips{
    position: absolute;
    top: 0px;
    left: 5px;
    font-size: 36px;
    font-weight: bold;
    cursor: pointer;
    color: #999;
}
.arrow-tips:hover{
    color: #203146;
}

.sub_menu_wrap{
    width: 90%;
    background-color: rgba(82, 99, 120, 0.9);
    right: 0;
    position: fixed;
    padding: 0 40px 0 20px;
    margin: 0;
    transition: all 1s;
    overflow: hidden;
    .sub_menu_wrap_inner{
        width: 100%;
        height: 40px;
        overflow: hidden;
        position: relative;
        .sub_menu{
            position: absolute;

            padding: 0;
            margin: 0;
            li{
                float: left;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                padding: 0 20px;
                color: #FFF;
                border-right: 1px solid #405166;
                cursor: pointer;
                -webkit-user-select:none;
                -moz-user-select:none;
                -ms-user-select:none;
                user-select:none;
                &:hover{
                    background-color: #fff;
                    border-color: #fff;
                    color: #304156;
                }

                &:nth-last-child(1){
                    border-right: none;
                }
            }
            .active{
                background-color: rgb(148, 165, 186);
                color: #304156;
                font-weight: bold;
            }
        }
    }
}

.pull-icon{
    cursor: pointer;
    right: 10px;
    position: fixed;
    font-size: 20px;
    color: #ccc;
    z-index: 2;
}
.pull-icon:hover{
    color: #203146;
}

</style>

<style>
.el-menu{
    border-right: none;
}
.el-menu-item, .el-submenu__title{
    height: 40px;
    line-height: 40px;
}
.el-submenu__icon-arrow::before{
    content: ''
}
::-webkit-scrollbar-track {
    background-color: rgba(0,0,0,0);
}

</style>
