<template>
  <div class="bg">
    <!-- 顶部菜单栏 -->
    <top-tab :is-full="isFull" :selTheme="selTheme" />

    <div class="over-power-bi top" :class="{'hide':!powerBiUrl}"/>
    <div class="over-power-bi right" :class="{'hide':!powerBiUrl}"/>

    <!-- 左边菜单栏 -->
    <menu-list ref="menu" :is-full="isFull" @noLink="noLink" @noPower="noPower" @change="changeLink" @switch-fix="MenuFixdChange" @changeSelTheme="changeSelTheme" />

    <!-- 无需登录地址 通过ifrmae直接展示 -->
    <template v-if="isFree">
      <iframe
        v-if="iframeUrl"
        :style="{
          width: innerPageWidth,
          height: innerPageHeight,
          marginTop: innerPageTop,
          marginLeft: innerPageLeft
        }"
        :src="iframeUrl"
        frameborder="0"
      />
      <div v-else class="empty">
        <img v-if="is403" src="@/assets/404_images/403.png" alt="" class="img-403">
        <svg-icon v-else icon-class="empty" style="font-size: 80px;float: right;" />
        <p v-if="is403">当前页面无权限浏览，请联系{{ is403 }}重新设置</p>
        <p v-else>当前页面为空，请联系管理员重新设置</p>
      </div>
    </template>
    <template v-else>
      <iframe
        v-if="sacUrl"
        :style="{
          width: innerPageWidth,
          height: innerPageHeight,
          marginTop: innerPageTop,
          marginLeft: innerPageLeft
        }"
        :src="sacUrl"
        frameborder="0"
      />
      <iframe
        v-else-if="powerBiUrl"
        id="powerBiIframe"
        :style="{
          width: innerPageWidth,
          height: innerPageHeight,
          marginTop: innerPageTop,
          marginLeft: innerPageLeft
        }"
        :src="powerBiUrl"
        frameborder="0"
      />
      <div v-else ref="vizContainer" :style="{width: innerPageWidth, height: innerPageHeight, marginTop: innerPageTop, marginLeft: innerPageLeft, overflow: 'hidden'}" />
    </template>
  </div>
</template>
<script>
import * as userApi from '@/api/user'
import { getToken } from '@/api/permission'
import MenuList from './components/MenuList'
import TopTab from './components/TopTab'
import * as accountApi from '@/api/account'

export default {

  components: {
    MenuList,
    TopTab
  },
  data() {
    return {
      iframeUrl: '',
      isFree: true,
      isFull: false,
      menuFixed: false,
      showSubMenu: true,
      is403: false,

      selTheme: '',
      sacUrl: '',
      powerBiUrl: '',
    }
  },

  computed: {
    innerPageHeight: function() {
      let height = '100vh'
      height += !this.isFull ? ' - 50px' : ''
      height += this.showSubMenu ? ' - 40px' : ''
      return `calc( ${height} )`
    },
    innerPageWidth: function() {
      return this.menuFixed ? 'calc(100vw - 175px)' : '100vw'
    },
    innerPageTop: function() {
      var subMenuHeight = this.showSubMenu ? 40 : 0
      var topTabHeight = !this.isFull ? 40 : 0
      return subMenuHeight + topTabHeight + 'px'
    },
    innerPageLeft: function() {
      return this.menuFixed ? '175px' : 0
    }
  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.windowResizeHandler)
  },

  methods: {
    changeSelTheme(name) {
      this.selTheme = name
    },
    /**
         * 初始化
         */
    init() {
      // 监听全屏切换
      window.addEventListener('resize', this.windowResizeHandler)
    },

    noPower(info) {
      this.isFree = true
      this.iframeUrl = ''
      this.is403 = info.manager
      // document.getElementsByTagName('iframe')[0] && (document.getElementsByTagName('iframe')[0].parentNode.removeChild(document.getElementsByTagName('iframe')[0]))
    },

    noLink() {
      this.isFree = true
      this.iframeUrl = ''
      // document.getElementsByTagName('iframe')[0] && (document.getElementsByTagName('iframe')[0].parentNode.removeChild(document.getElementsByTagName('iframe')[0]))
    },

    /**
         * 切换地址
         */
    changeLink(link) {
      const that = this
      // 免登录
      if (link.origin=='') {
        this.isFree = true
        this.$nextTick(() => {
          this.iframeUrl = link.url.startsWith('http') ? link.url : 'http://' + link.url
        })
        return
      }
      this.isFree = false;
      this.sacUrl = '';
      this.powerBiUrl = '';
      // 登录
      this.$nextTick(() => {
        if(link.origin == 'Tableau'){
          this.$refs.vizContainer.innerHTML = ''
          var subContainer = window.document.createElement('div')
          this.$refs.vizContainer.appendChild(subContainer)
          var documentWidth = document.documentElement.clientWidth || document.body.clientWidth
          var documentHeight = document.documentElement.clientHeight || document.body.clientHeight
          var innerPageWidth = this.menuFixed ? (documentWidth - 175) : documentWidth
          var innerPageHeight = documentHeight - (this.showSubMenu ? 40 : 0) - (!this.isFull ? 50 : 0)
          var options = {
            width: innerPageWidth,
            height: innerPageHeight,
            hideTabs: true,
            onFirstInteractive: function() {
              yearFilter(link)
              refreshReport()
              setInterval(refreshReport, 60 * 1000 * 30)
              yearFilter(link)
            }
          }
          var subUrl = link.url.slice(link.url.indexOf('views/') + 6)
          this.getToken(link.verify_account).then(token => {
            /**
                      *var url = `http://tableau.hucai.com/trusted/${token}/t/HC_Tableau_Server/views/${subUrl}`
                      */
            var url = `http://tableau.hucai.com/trusted/${token}/t/HC_Tableau_Server/views/${subUrl}`
            window.viz = new window.tableau.Viz(subContainer, url, options)
            window.viz.addEventListener(window.tableau.TableauEventName.STORY_POINT_SWITCH, yearFilter)
          }).catch(function(err) {
            console.log(err)
          })
        }else if(link.origin == 'SAC'){
          accountApi.connectJump({
            theme_id: this.$store.state.user.themeInfo.id,
            admin_id: this.$store.state.user.userInfo.id,
            account: link.verify_account,
            url: link.url
          }).then(res => {
            if(res.code){
              this.sacUrl = encodeURI(`http://sso.hucai.com/auth/realms/hucais/protocol/one-pass?client_id=hucais-sac&token=${res.data}&redirect_url=${link.url}`)
            }else{
              this.$message({
                type: 'warning',
                message: '获取SAC地址出错'
              })
            }
          })
        }else if(link.origin == 'PowerBI'){
          //获取预览地址
          accountApi.powerBiLogin({
            theme_id: this.$store.state.user.themeInfo.id,
            account: link.verify_account,
            url: link.url
          }).then(res => {
            if(res.code){
              this.powerBiUrl = res.url;
            }else{
              console.log('获取地址失败');
            }
          })
        }
      })
    },

    /**
         * powerBi类型连接，ifram加载完成执行
         */
    powerBiIframeCn(){
      // 获取iframe的window对象
      let topWin = window.top.document.getElementById("powerBiIframe").contentWindow;
      console.log('想操作http://mbi.hucai.com下的内容：',topWin);
    },

    /**
         * 鉴权
         */
    getToken(account) {
      return new Promise(resolve => {
        getToken({
          ip: this.$store.state.user.ip_address,
          account
        }).then(res => {
          resolve(res.data)
        }).catch(function(err) {
          console.log(err)
        })
      })
    },

    /**
         * 监听F11全屏
         */
    windowResizeHandler() {
      var isFull = Math.abs(window.screen.height - window.document.documentElement.clientHeight) <= 17
      if (isFull != this.isFull) {
        this.isFull = isFull
        this._resizeInnerPage()
      }
    },

    changeSubMenu(status) {
      this.showSubMenu = status
      // this._resizeInnerPage()
    },

    MenuFixdChange(status) {
      this.menuFixed = status
      this._resizeInnerPage()
    },

    _resizeInnerPage() {
      var documentWidth = document.documentElement.clientWidth || document.body.clientWidth
      var documentHeight = document.documentElement.clientHeight || document.body.clientHeight
      var innerPageWidth = this.menuFixed ? (documentWidth - 175) : documentWidth
      var innerPageHeight = documentHeight - (this.showSubMenu ? 40 : 0) - (!this.isFull ? 50 : 0)
      this.isFree || (window.viz && window.viz.setFrameSize(innerPageWidth, innerPageHeight))
    }
  }
}

function refreshReport() {
  /* var sheet = viz.getWorkbook().getActiveSheet();
    alert(sheet.getName());*/
  window.viz.refreshDataAsync()
  // yearFilter()
}

// 原来获取时间的方式
function yearFilter(year) {
  var _YesterDay = moment().subtract(2, 'days') // 昨天
  var workbook = window.viz.getWorkbook()
  var worksheet = workbook.getActiveSheet()
  if (year.start_time && year.start_time) {
    // console.log('yearFilter时间设置', year)
    workbook.changeParameterValueAsync('开始日期', new Date(getDataObj.getLinkTime(year).startDate))
    workbook.changeParameterValueAsync('结束日期', new Date(getDataObj.getLinkTime(year).endDate))
  } else {
    // console.log('原来yearFilter时间设置:开始时间', getDataObj.timeFormat(new Date(Date.UTC(moment().format('YYYY'), moment().format('MM') - 1))), '结束时间' + getDataObj.timeFormat(new Date(Date.UTC(moment().format('YYYY'), moment().format('MM') - 1, moment().format('DD')))))
    workbook.changeParameterValueAsync('开始日期', new Date(Date.UTC(_YesterDay.format('YYYY'), '1' - 1, '1')))
    workbook.changeParameterValueAsync('结束日期', new Date(Date.UTC(moment().format('YYYY'), moment().format('MM') - 1, moment().format('DD'))))
  }
}
// 新增的时间获取
var getDataObj = {
  getLinkTime: function(link) {
    let startData = ''
    let endData = ''
    let ajstartData = ''
    let ajendData = ''
    startData = this.getDataYMD(link.start_time)
    endData = this.getDataYMD(link.end_time)
    ajstartData = this.daysJian(startData, link.start_time_radio === '1' ? -link.start_day : link.start_day)
    ajendData = this.daysJian(endData, link.end_time_radio === '1' ? -link.end_day : link.end_day)
    // console.log(ajstartData, ajendData)
    return {
      startDate: this.timeUTC(ajstartData),
      endDate: this.timeUTC(ajendData)
    }
  },
  /**
   * 获取日期
   */
  getDataYMD: function(type) {
    let date = ''
    if (type === '1') {
      date = this.getNow()
    } if (type === '2') {
      date = this.getWeekone()
    } else if (type === '3') {
      date = this.getMonone()
    } else if (type === '4') {
      date = this.getQuarterone()
    } else if (type === '5') {
      date = this.getYearone()
    }
    return date
  },
  /**
   * 日期加减天数
   */
  daysJian: function(dateStr, num) {
    var date = new Date(dateStr.replace('-', '/'))
    date.setDate(date.getDate() + Number(num))
    return this.timeFormat(date)
  },
  /**
   * 转时间戳
   */
  timeUTC: function(dateStr) {
    var date = new Date(dateStr.replace('-', '/'))
    var y = date.getFullYear() // 年
    var m = date.getMonth() + 1 // 月
    var d = date.getDate() // 日
    return Date.UTC(y, m - 1, d)
  },
  /**
   * 格式化年月日
   */
  timeFormat: function(date) {
    var y = date.getFullYear() // 年
    var m = date.getMonth() + 1 // 月
    var d = date.getDate() // 日
    return y + '-' + (m<10?('0'+m):m) + '-' + (d<10?('0'+d):d)
  },
  /**
   * 获取现在时间
   */
  getNow() {
    var date = new Date()
    return this.timeFormat(date)
  },
  /**
   * 获取本周一
   */
  getWeekone: function() {
    var date = new Date()
    var weekday = date.getDay() || 7
    date.setDate(date.getDate() - weekday + 1)
    return this.timeFormat(date)
  },
  /**
   * 获取本月第一天
   */
  getMonone: function() {
    var date = new Date()
    date.setDate(1)
    return this.timeFormat(date)
  },
  /**
   * 获取本季第一天
   */
  getQuarterone: function() {
    var date = new Date()
    var month = date.getMonth()
    if (month < 3) {
      date.setMonth(0)
    } else if (month > 2 && month < 6) {
      date.setMonth(3)
    } else if (month > 5 && month < 9) {
      date.setMonth(6)
    } else if (month > 8 && month < 11) {
      date.setMonth(9)
    }
    date.setDate(1)
    return this.timeFormat(date)
  },
  /**
   * 获取本年第一天
   */
  getYearone: function() {
    var date = new Date()
    date.setDate(1)
    date.setMonth(0)
    return this.timeFormat(date)
  }
}
</script>
<style lang="scss">
.bg{
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    overflow: hidden;
}
.empty{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666;
}
.img-403{
  display: inline-block;
  width: 80px;
}
.over-power-bi{
  position: absolute;
  z-index: 1;
  overflow: hidden;
  opacity: 0;
  &.hide{
    display: none;
  }
  &.top{
    top: 0;
    left: 0;
    width: 55%;
    height: 70px;
  }
  &.right{
    top: 50%;
    right: 0;
    width: 80px;
    height: 180px;
    margin-top: -90px;
  }
}
</style>
