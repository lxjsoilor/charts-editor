<template>
  <el-dialog
    :title="layerTitle"
    :visible.sync="dialogVisible"
    width="1200px"
    :before-close="handleClose"
  >
    <el-form ref="resourcesForm" :model="resourcesForm" label-width="80px" class="form demo-ruleForm">
      <el-form-item label="菜单标题">
        <el-col :span="12">
          <el-input v-model="resourcesForm.menu_title" type="text" placeholder="请输入菜单标题" maxlength="20" show-word-limit />
        </el-col>
      </el-form-item>

      <el-form-item label="打开方式">
        <el-select v-model="resourcesForm.open_type" placeholder="请选择打开方式">
          <el-option label="当前窗口" :value="0" />
          <el-option label="新窗口" :value="1" />
        </el-select>
      </el-form-item>

      <el-form-item v-show="resourcesForm.links && resourcesForm.links.length > 1" label="轮播延时">
        <el-col :span="4">
          <el-input v-model="resourcesForm.delay" type="number"><template slot="append">毫秒</template></el-input>
        </el-col>
        <el-col :span="8"><span style="margin-left: 10px; color: #999;">* 建议不要小于3000, 设置为 0 即关闭自动轮播</span></el-col>
      </el-form-item>

      <el-form-item v-for="(link, index) in resourcesForm.links" :key="index" label="链接地址" :inline="true">
        <el-row type="flex" justify="space-between">
          <el-col :span="18">
            <el-input v-model="link.url" placeholder="请输入地址">
              <template slot="prepend">地址</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" style="margin-top: 10px;">
          <el-col :span="8">
            <el-input v-model="link.title" placeholder="链接标题">
              <template slot="prepend">标题</template>
            </el-input>
          </el-col>

          <el-col :span="4">
            <el-select v-model="link.origin" placeholder="系统来源" @change="value => { changeOriginStatus(value, index) }">
              <el-option label="空模板" value="" />
              <el-option label="Tableau" value="Tableau" />
              <el-option label="SAC" value="SAC" />
              <el-option label="PowerBI" value="PowerBI" />
            </el-select>
          </el-col>

          <el-col :span="9">
            <el-switch
              v-model="link.verify"
              :disabled="link.origin == ''"
              :active-value="1"
              :inactive-value="0"
              active-text="登录"
              inactive-text="免登录"
            />
            <el-select v-model="link.verify_account" style="width: 180px;" :disabled="!link.verify" placeholder="登录账号" @change="value => { changeVerifyStatus(value, index) }">
              <template v-for="item in accountList">
                <template v-if="link.origin=='SAC'">
                  <el-option v-if="item.type==='SAC'" :key="item.account" :label="item.account" :value="item.account" />
                </template>
                <template v-else-if="link.origin=='PowerBI'">
                  <el-option v-if="item.type==='PowerBI'" :key="item.account" :label="item.account" :value="item.account" />
                </template>
                <template v-else>
                  <el-option v-if="!item.type" :key="item.account" :label="item.account" :value="item.account" />
                </template>
                <!-- <el-option v-if="link.origin=='SAC'?(item.type==='SAC'):(!item.type)" :key="item.account" :label="item.account" :value="item.account" /> -->
              </template>
              <!-- <el-option v-for="item in accountList" :key="item.account" :label="item.account" :value="item.account" /> -->
              <el-option label="新建账号" :value="0" />
            </el-select>
            <el-button v-if="link.origin=='SAC'&&link.verify_account"
                type="primary"
                size="small"
                @click="openEditPass(link)"
              >
                修改密码
            </el-button>
          </el-col>

          <el-col :span="1.5">
            <el-button
              :disabled="!link.url"
              icon="el-icon-plus"
              circle
              @click="addLink"
            />
            <el-button
              icon="el-icon-delete"
              circle
              @click="() => { resourcesForm.links.splice(index, 1) }"
            />
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="12">
            <el-row type="flex" style="margin-top: 10px;">
              <el-col :span="10">
                <el-select v-model="link.start_time" placeholder="请选择开始时间" @change="cheackLinkTime(link)">
                  <el-option
                    v-for="item in timeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-radio v-model="link.start_time_radio" label="1" class="time-radio" @change="cheackLinkTime(link)">提前</el-radio>
                <el-radio v-model="link.start_time_radio" label="2" class="time-radio" @change="cheackLinkTime(link)">推后</el-radio>
              </el-col>
              <el-col :span="5">
                <el-input v-model="link.start_day" placeholder="" @change="cheackLinkTime(link)">
                  <template slot="append">天</template>
                </el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row type="flex" style="margin-top: 10px;">
              <el-col :span="10">
                <el-select v-model="link.end_time" placeholder="请选择结束时间" @change="cheackLinkTime(link)">
                  <el-option
                    v-for="item in timeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-radio v-model="link.end_time_radio" label="1" class="time-radio" @change="cheackLinkTime(link)">提前</el-radio>
                <el-radio v-model="link.end_time_radio" label="2" class="time-radio" @change="cheackLinkTime(link)">推后</el-radio>
              </el-col>
              <el-col :span="5">
                <el-input v-model="link.end_day" placeholder="" @change="cheackLinkTime(link)">
                  <template slot="append">天</template>
                </el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="公开">
        <el-switch
          v-model="resourcesForm.public"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">保存</el-button>
        <el-button @click="() => { $emit('close') }">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      width="30%"
      title="请登录"
      :visible.sync="innerVisible"
      append-to-body
    >
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="accountForm.account" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="accountForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="verifyAccount">登录</el-button>
          <el-button size="small" @click="() => { innerVisible = false }">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      width="30%"
      title="修改密码"
      :visible.sync="showEditPass"
      append-to-body
    >
      <el-form label-width="80px">
        <el-form-item label="密码">
          <el-input v-model="editPassForm.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="editPassword">确定</el-button>
          <el-button size="small" @click="() => { showEditPass = false }">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .time-radio{
    margin-right: 5px;
  }
</style>

<script>
import eventBus from '@/utils/eventBus'
import * as api from '@/api/resources'
import * as accountApi from '@/api/account'
import * as recordApi from '@/api/record'

export default {
  name: 'ResourcesDialog',

  props: {
    resourcesData: {
      type: Object,
      default: {}
    },
    layerTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      resourcesForm: {},
      accountList: [],
      accountForm: {},
      innerVisible: false,

      timeList: [{
        value: '1',
        label: '现在时间'
      }, {
        value: '2',
        label: '本周一'
      }, {
        value: '3',
        label: '本月第一天'
      }, {
        value: '4',
        label: '本季第一天'
      }, {
        value: '5',
        label: '本年第一天'
      }],

      showEditPass: false,
      editPassForm: {},
      editPassAccount: '',
      //存储旧数据
      saveFirstResources: {}
    }
  },

  watch: {
    resourcesData(newVal) {
      console.log('数据', newVal)
      this.resourcesForm = newVal
      //存储旧数据
      this.saveFirstResources = JSON.parse(JSON.stringify(newVal))
    }
  },

  created() {
    this.init()
    eventBus.$on('change-theme', () => {
      this.init()
    })
  },

  methods: {
    init() {
      accountApi.list({
        theme_id: this.$store.state.admin.themeInfo.id
      }).then(res => {
        this.accountList = res.data
      })
    },

    handleClose() {
      if (this.resourcesForm.menu_title) {
        return this.$confirm('数据尚未保存，确定要关闭吗？')
          .then(_ => {
            this.$emit('renderList')
          }).catch(_ => {})
      }
      this.$emit('renderList')
    },

    changeVerifyStatus(value, index) {
      if (value == 0) {
        this.accountForm = {
          account: '',
          password: ''
        }
        this.innerVisible = true
        this.resourcesForm.links[index].verify_account = this.prevValue || this.accountList[0].account
        this.selectIndex = index
      }else{
        this.prevValue = value
      }
    },

    changeOriginStatus(value, index) {
      if(value && this.saveFirstResources.links[index].origin !== value){
        this.resourcesForm.links[index].verify_account = ''
      }else{
        this.resourcesForm.links[index].verify_account = this.saveFirstResources.links[index].verify_account
      }
    },

    /**
		 * 验证账号是否正确
		 */
    verifyAccount() {
      if(this.resourcesForm.links[this.selectIndex].origin === 'SAC'){
        accountApi.sacAuthorize({
          theme_id: this.$store.state.admin.themeInfo.id,
          admin_id: this.$store.state.admin.userInfo.id,
          credentials: {
            name: this.accountForm.account,
            password: this.accountForm.password,
            type: this.resourcesForm.links[this.selectIndex].origin
          }
        }).then(res => {
          accountApi.list({
            theme_id: this.$store.state.admin.themeInfo.id
          }).then(res => {
            this.accountList = res.data
          })
          this.resourcesForm.links[this.selectIndex].verify_account = this.accountForm.account
          this.innerVisible = false
        })
      }else if(this.resourcesForm.links[this.selectIndex].origin === 'PowerBI'){
        accountApi.powerBiAuthorize({
          theme_id: this.$store.state.admin.themeInfo.id,
          admin_id: this.$store.state.admin.userInfo.id,
          credentials: {
            name: this.accountForm.account,
            password: this.accountForm.password,
            type: this.resourcesForm.links[this.selectIndex].origin
          }
        }).then(res => {
          accountApi.list({
            theme_id: this.$store.state.admin.themeInfo.id
          }).then(res => {
            this.accountList = res.data
          })
          this.resourcesForm.links[this.selectIndex].verify_account = this.accountForm.account
          this.innerVisible = false
        })
      }else{
        accountApi.authorize({
          theme_id: this.$store.state.admin.themeInfo.id,
          admin_id: this.$store.state.admin.userInfo.id,
          credentials: {
            name: this.accountForm.account,
            password: this.accountForm.password,
            site: {
              contentUrl: 'HC_Tableau_Server'
            }
          }
        }).then(res => {
          accountApi.list({
            theme_id: this.$store.state.admin.themeInfo.id
          }).then(res => {
            this.accountList = res.data
          })
          this.resourcesForm.links[this.selectIndex].verify_account = this.accountForm.account
          this.innerVisible = false
        })
      }
    },

    submitForm(data) {
      const consData = data || this.resourcesForm
      // if(this.resourcesForm.type == 3){
      var legalWithLinks = consData.links.reduce((accumlator, accruentValue) => (accumlator && accruentValue.url), true)
      if (!legalWithLinks) {
        return this.$message({
          type: 'warning',
          message: '请不要输入空链接'
        })
      }
      // }
      this.loading = this.$loading()
      api.addOrUpResources(consData).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.loading.close()
        this.$emit('close')
      })
      recordApi.addRecord({
        title: consData.type > 0 ? `自定义菜单 > 添加/编辑${consData.type}级菜单` : '编辑首页',
        detail: `菜单标题： ${consData.menu_title}`
      })
    },

    /**
		 * 添加一条链接
		 */
    addLink() {
      this.resourcesForm.links.push({
        url: '',
        title: '',
        origin: '',
        verify: 0,
        verify_account: '',
        start_time: '',
        end_time: '',
        start_time_radio: 1,
        end_time_radio: 1,
        start_day: 0,
        end_day: 0
      })
    },

    /**
		 * 校验开始日期不能大于结束日期
		 */
    cheackLinkTime(link) {
      let startData = ''
      let endData = ''
      let ajstartData = ''
      let ajendData = ''
      if (link.start_time && link.end_time) {
        startData = this.getDataYMD(link.start_time)
        endData = this.getDataYMD(link.end_time)
        ajstartData = this.daysJian(startData, link.start_time_radio === '1' ? -link.start_day : link.start_day)
        ajendData = this.daysJian(endData, link.end_time_radio === '1' ? -link.end_day : link.end_day)
        if (new Date(ajstartData.replace(/-/g, '\/')) > (new Date(ajendData.replace(/-/g, '\/')))) {
          this.$message({
            type: 'warning',
            message: '开始时间必须小于结束时间'
          })
          return false
        }
      }
    },

    /**
		 * 打开修改密码
		 */
    openEditPass(link){
      this.showEditPass = true
      this.editPassAccount = link.verify_account
    },

    /**
		 * 修改SAC账号密码
		 */
    editPassword(){
      accountApi.sacAuthorize({
        theme_id: this.$store.state.admin.themeInfo.id,
        admin_id: this.$store.state.admin.userInfo.id,
        credentials: {
          name: this.editPassAccount,
          password: this.editPassForm.password,
          type: 'SAC'
        }
      }).then(res => {
        accountApi.list({
          theme_id: this.$store.state.admin.themeInfo.id
        }).then(res => {
          this.accountList = res.data
        })
        this.showEditPass = false
      })
    },

    /**
		 * 获取日期
		 */
    getDataYMD(type) {
      let date = ''
      if (type === '1') {
        date = this.getNow()
      } else if (type === '2') {
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
    daysJian(dateStr, num) {
      var date = new Date(dateStr)
      date.setDate(date.getDate() + Number(num))
      return this.timeFormat(date)
    },
    /**
		 * 格式化年月日
		 */
    timeFormat(date) {
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
    getWeekone() {
      var date = new Date()
      var weekday = date.getDay() || 7
      date.setDate(date.getDate() - weekday + 1)
      return this.timeFormat(date)
    },
    /**
		 * 获取本月第一天
		 */
    getMonone() {
      var date = new Date()
      date.setDate(1)
      return this.timeFormat(date)
    },
    /**
		 * 获取本季第一天
		 */
    getQuarterone() {
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
    getYearone() {
      var date = new Date()
      date.setDate(1)
      date.setMonth(0)
      return this.timeFormat(date)
    }
  }
}
</script>
