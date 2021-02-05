import store from '@/store'
import request from '@/utils/request'

export function addRecord(data){
    return request({
        url: '/admin/record/add',
        method: 'post',
        data: {
            theme_id: store.state.admin.themeInfo.id,
            user_no: store.state.admin.userInfo.user_no,
            user_name: store.state.admin.userInfo.user_name,
            ...data
        }
    })
}

export function listRecord(params){
    return request({
        url: '/admin/record/list',
        method: 'get',
        params
    })
}