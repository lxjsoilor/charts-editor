import request from '@/utils/request'

export function login(data) {
	return request({
		url: '/home/permission/login',
		method: 'post',
		data
	})
}

export function logout() {
	return request({
		url: '/home/permission/logout',
		method: 'post'
	})
}

export function getToken(data){
    return request({
		url: '/home/permission/authenticate',
        method: 'post',
        data
	})
}