import request from '@/utils/request'

export function login(data){
    return request({
		url: '/admin/admin/login',
		method: 'post',
		data
	})
}

export function logout(){
	return request({
		url: '/admin/admin/logout',
		method: 'post'
	})
}

export function getAdminList(params){
	return request({
		url: '/admin/admin/list',
		method: 'get',
		params
	})
}

export function getRoleByAdminId(params){
	return request({
		url: '/admin/admin/listRole',
		method: 'get',
		params
	})
}

export function getAccessList(params){
	return request({
		url: '/admin/access/list',
		method: 'get',
		params
	})
}

export function addAdmin(data){
	return request({
		url: '/admin/admin/add',
		method: 'post',
		data
	})
}

export function updateAdmin(data){
	return request({
		url: '/admin/admin/update',
		method: 'post',
		data
	})
}

export function removeAdmin(params){
	return request({
		url: '/admin/admin/remove',
		method: 'get',
		params
	})
}

export function assignAccessToRole(data){
	return request({
		url: '/admin/access/assignToRole',
		method: 'post',
		data
	})
}

export function assignAccessToAdmin(data){
	return request({
		url: '/admin/access/assignToAdmin',
		method: 'post',
		data
	})
}

export function getThemeList(params){
	return request({
		url: '/admin/admin/getThemeList',
		method: 'get',
		params
	})
}

export function changeAdminStatus(data){
	return request({
		url: '/admin/admin/changeStatus',
		method: 'post',
		data
	})
}