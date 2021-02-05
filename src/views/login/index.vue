<template>
  <div class="login-container" :class="isMobile ? 'cont-mob': ''" :style="{'background-image': 'url('+login_bg+')', 'background-size': bzine}">
    <img src="@/assets/img/login_logo.png" alt="" class="login-logo">
    <div class="login-main">
      <div class="login-main-l">
        <h3 class="title">虎彩 · 智策平台</h3>
        <p class="en-intro">Wise policy platform</p>
        <p class="zh-intro">让决策更智能，让决策更高效</p>
      </div>
      <div class="login-main-r">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <!-- <div class="title-container">
            <h3 class="title">虎彩 · 智策平台</h3>
          </div> -->
          <h4 class="welcome-tit">欢迎登录</h4>

          <el-form-item prop="username">
            <span class="svg-container user">
              <img src="@/assets/img/login_user.png" alt="">
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入用户账号"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item class="last" prop="password">
            <span class="svg-container pass">
              <img src="@/assets/img/login_pass.png" alt="">
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入用户密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            class="login-sub"
            @click.native.prevent="handleLogin"
          >登录</el-button>

        </el-form>
      </div>
    </div>
    <p class="footer-box">Copyright © 1988-2020 虎彩印艺股份有限公司 版权所有© 粤ICP备11055918号</p>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getResourcesDetail } from '@/api/resources'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '' || !validUsername(value)) {
        callback(new Error('请输入6位数字工号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value && value.length == 0) {
        callback(new Error('请输入密码'))
      } else if(value.length < 8) {
        callback(new Error('密码不能小于8位'))
      } else {
        callback()
        let regPwd = /^\S*(?=\S{8,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
        if (!regPwd.test(value)) {
          callback(new Error('密码必须包含大写字母、小写字母、数字和特殊字符'))
        } else {
          callback()
        }
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      login_bg: require('../../assets/img/login_bg.jpg')
    }
  },
  computed: {
    isMobile() {
      return this.$isMobile()
    },
    bzine() {
      const _w = window.innerWidth
      const _h = window.innerHeight
      const _seek = 3840 / 2160
      if (_w / _h < _seek) {
        return 'auto 100%'
      } else {
        return '100% auto'
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      // if (this.$route.query.id) {
      // 	var resources = await getResourcesDetail({ id: this.$route.query.id })
      // 	var theme_id = resources.data.theme_id
      // }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', {
            user_no: this.loginForm.username,
            password: this.loginForm.password
            // theme_id
          }).then((res) => {
            if (res.code) {
              this.$router.push({
                path: '/',
                query: {
                  id: this.$route.query.id
                }
              })
              this.loading = false
            } else {
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #222;
$cursor: #222;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-repeat: no-repeat;
  background-position: center center;
  .login-logo{
    position: absolute;
    left: 56px;
    top: 40px;
    width: 240px;
  }
  .login-main{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -160px 0  0 -440px;
    width: 880px;
    height: 320px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    z-index: 1;
  }

  .login-main-l{
    margin-right: 360px;
    color: #fff;
    .title{
      position: relative;
      font-size:48px;
      font-weight:600;
      color:#fff;
      line-height:48px;
      font-weight: normal;
      padding: 80px 0 60px;
      margin: 0;
    }
    p{
      margin: 0;
      font-weight: normal;
    }
    .en-intro{
      font-size:28px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:28px;
      padding-top: 0;
    }
    .zh-intro{
      font-size:20px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:20px;
      padding-top: 12px;
    }
  }

  .login-main-r{
    position: absolute;
    right: 0;
    top: 0;
    width:360px;
    height:320px;
    background:#fff;
    border-radius:8px;
    overflow: hidden;
  }

  .el-input {
    display: block;
    margin-left: 32px;
    height: 36px;
    width: auto;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 0 5px 0 0;
      color: $light_gray;
      height: 36px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border-bottom: 1px solid #8DB6D2;
    color: #AFB1B3;
    margin-bottom: 15px;
    &.last {
      margin-bottom: 40px;
    }
  }
  .el-form-item__content{
    line-height: 36px;
  }
  .footer-box{
    position: absolute;
    bottom:10px;
    left: 50%;
    width:480px;
    height:32px;
    line-height: 32px;
    text-align: center;
    background:#002138;
    border-radius:4px;
    font-size:12px;
    font-weight:400;
    color:#fff;
    margin: 0 0 0 -240px;
    opacity: 0.4;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    padding: 40px 30px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    position: absolute;
    left: 0;
    top: 0;
    color: $dark_gray;
    width: 32px;
    &.user{
      img{
        position: relative;
        top: 4px;
        width: 18px;
      }
    }
    &.pass{
      img{
        position: relative;
        top: 4px;
        left: 2px;
        width: 14px;
      }
    }
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .welcome-tit{
    font-size:20px;
    color:#0067AD;
    line-height:20px;
    text-align: center;
    margin: 0 0 30px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 4px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .login-sub{
    width: 100%;
    background: #0067AD;
    border-color: #0067AD;
    &:hover {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
  }
  &.cont-mob{
    .login-main{
      width: 90%;
      margin-left: -45%;
    }
    .login-main-l{
      display: none;
    }
    .login-main-r{
      width: 100%;
    }
  }
}
</style>
