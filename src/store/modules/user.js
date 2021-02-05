import { login, logout } from '@/api/permission'
import { setSymbol, removeSymbol } from '@/utils/auth'
import { resetRouter } from '@/router'
import router from '@/router'
import { storeMaker } from '@/utils/index'
import { getResourcesDetail } from '@/api/resources'
import { addHistory } from '@/api/user'

const state = storeMaker({
  // 当前登录主题ID
  themeInfo: {},
  userInfo: {},
  ip_address: ''
})

const mutations = {
  SET_USER_INFO: (state, userInfo) => {
    // state.userInfo = userInfo
    state.userInfo = { ...state.userInfo,  ...userInfo}
  },
  SET_THEME_INFO: (state, themeInfo) => {
    state.themeInfo = themeInfo
  },
  SET_IP: (state, ip_address) => {
    state.ip_address = ip_address
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { user_no, password, theme_id } = userInfo
    return new Promise((resolve, reject) => {
      login({ user_no: user_no.trim(), password: password, theme_id }).then(response => {
        // 登录失败
        if (response.code == 0) {
          removeSymbol('home_user_no')
          removeSymbol('home_psd')
          resetRouter()
          resolve(response)
          return
          // return router.replace('/login')
        }
        const { data } = response
        // 保存账号密码到cookie中
        setSymbol('home_user_no', user_no)
        setSymbol('home_psd', password)

        // 多个主题，默认展示第一个
        if (data.themes.length > 0) {
          var themeInfo
          data.themes.map(theme => {
            if (theme.id == theme_id) {
              themeInfo = theme
            }
          })
          themeInfo = themeInfo || data.themes[0]
          commit('SET_THEME_INFO', themeInfo)
          data.isOwner = data.user_no == data.themes[0].manager_id
        }
        commit('SET_USER_INFO', data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 插入浏览记录
  addHistory({ commit, state }, resources_id) {
    if (!state.userInfo.id || !state.themeInfo.id) return false
    return new Promise((resolve, reject) => {
      addHistory({
        user_id: state.userInfo.id,
        theme_id: state.themeInfo.id,
        resources_id
      })
    })
  },

  // 退出登录，清空标识
  logout({ commit, state }) {
    commit('SET_USER_INFO', {})
    commit('SET_THEME_INFO', {})
    removeSymbol('home_user_no')
    removeSymbol('home_password')
    resetRouter()
  },

  // 切换主题
  switchTheme({ commit, state }, themeInfo) {
    var userInfo = { ...state.userInfo }
    userInfo.isOwner = userInfo.user_no == themeInfo.manager_id
    commit('SET_THEME_INFO', themeInfo)
    commit('SET_USER_INFO', userInfo)
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_USER_INFO', {})
      commit('SET_THEME_INFO', {})
      removeSymbol('home_user_no')
      removeSymbol('home_password')
      resolve()
    })
  },

  setIpAddress({ commit }, ip) {
    commit('SET_IP', ip)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

