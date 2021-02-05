import request from '@/utils/request'

export function getResourcesTree(params) {
  return request({
    url: '/home/resources/list',
    method: 'get',
    params
  })
}

export function addOrUpResources(data) {
  return request({
    url: '/admin/resources/addOrUpdate',
    method: 'post',
    data
  })
}

export function deleteResources(data) {
  return request({
    url: '/admin/resources/delete',
    method: 'post',
    data
  })
}

export function assignToRole(data) {
  return request({
    url: '/admin/resources/assignToRole',
    method: 'post',
    data
  })
}

export function assignToUser(data) {
  return request({
    url: '/admin/resources/assignToUser',
    method: 'post',
    data
  })
}

export function getResourcesDetail(params) {
  return request({
    url: '/home/resources/detail',
    method: 'get',
    params
  })
}
