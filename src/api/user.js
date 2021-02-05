import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params
  })
}

export function addUser(data) {
  return request({
    url: '/admin/user/add',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/admin/user/update',
    method: 'post',
    data
  })
}

export function getResourcesByUserId(params) {
  return request({
    url: '/admin/user/listResources',
    method: 'get',
    params
  })
}

export function getRolesByUserId(params) {
  return request({
    url: '/admin/user/listRole',
    method: 'get',
    params
  })
}

export function getThemeByUserId(params) {
  return request({
    url: '/home/user/listTheme',
    method: 'get',
    params
  })
}

export function searchUser(params) {
  return request({
    url: '/admin/employee/search',
    method: 'get',
    params
  })
}

export function removeUser(data) {
  return request({
    url: '/admin/user/delete',
    method: 'post',
    data
  })
}

export function changeUserStatus(data) {
  return request({
    url: '/admin/user/changeStatus',
    method: 'post',
    data
  })
}

export function addHistory(params) {
  return request({
    url: '/home/user/addHistory',
    method: 'get',
    params
  })
}

export function getViews(params) {
  return request({
    url: '/admin/statistic/views',
    method: 'get',
    params
  })
}

export function getAccessRecord(params) {
  return request({
    url: '/admin/statistic/accessRecord',
    method: 'get',
    params
  })
}

export function getUserInfo(params) {
  return request({
    url: '/home/user/getUserInfo',
    method: 'get',
    params
  })
}

export function getThemeDetail(params) {
  return request({
    url: '/home/user/getThemeDetail',
    method: 'get',
    params
  })
}

export function getUserRources(params) {
  return request({
    url: '/admin/user/getUserRources',
    method: 'get',
    params
  })
}

export function listResourcesMenu(params) {
  return request({
    url: '/admin/user/listResourcesMenu',
    method: 'get',
    params
  })
}

export function getUserHistory(params) {
  return request({
    url: '/home/user/getUserHistory',
    method: 'get',
    params
  })
}
