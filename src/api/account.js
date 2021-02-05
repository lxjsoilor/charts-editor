import request from '@/utils/request'
import axios from 'axios'

export function save(data){
    return request({
		url: '/admin/account/save',
		method: 'post',
		data
	})
}

export function list(params){
    return request({
		url: '/admin/account/list',
		method: 'get',
		params
	})
}

export function authorize(data){
    return request({
		url: '/admin/account/authorize',
		method: 'post',
		data
	})
}

export function sacAuthorize(data){
	return request({
		url: '/admin/account/sacAuthorize',
		method: 'post',
		data
	})
}

export function connectJump(params){
	return request({
		url: '/admin/account/connectJump',
		method: 'get',
		params
	})
}

export function powerBiAuthorize(data){
	return request({
		url: '/admin/account/powerBiAuthorize',
		method: 'post',
		data
	})
}

export function powerBiLogin(data){
	return request({
		url: '/admin/account/powerBiLogin',
		method: 'post',
		data
	})
}