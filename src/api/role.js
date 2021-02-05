import request from '@/utils/request'

export function listRole(params){
    return request({
        url: '/admin/role/list',
        method: 'get',
        params
    })
}

export function addOrUpdateRole(data){
    return request({
        url: '/admin/role/addOrUpdate',
        method: 'post',
        data
    })
}

export function getResourcesByRoleId(params){
    return request({
        url: '/admin/role/listResources',
        method: 'get',
        params
    })
}

export function assignRoleToUser(data){
    return request({
        url: '/admin/role/assignToUser',
        method: 'post',
        data
    })
}

export function listUserByRoleId(){
    return request({
        url: '/admin/role/listUser',
        method: 'get',
        params
    })
}

export function removeRole(data){
	return request({
		url: '/admin/role/delete',
		method: 'post',
		data
	})
}