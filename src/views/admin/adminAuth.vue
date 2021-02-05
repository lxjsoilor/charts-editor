<template>
    <div class="container">
        <div class="head">当前管理员：{{user_name}}</div>

        <div class="body clearfix">
            <div class="l">
                <el-tag style="margin: 15px;">角色</el-tag>
                <el-checkbox-group v-model="checkRoles" >
                    <el-checkbox v-for="item in roles" :label="item.id" :key="item.id" @change="value => roleChangeHandler(value, item.id)">{{item.role_name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="r">
                <el-tag type="success" style="margin: 15px;">权限</el-tag>
                <el-checkbox-group v-model="checkAccesses">
                    <el-checkbox v-for="item in options" :label="item.id" :key="item.id">{{item.remark}}</el-checkbox>
                </el-checkbox-group>
            </div>
        </div>

        <div class="btn-group">
            <el-button type="info" size="small">清空</el-button>
            <el-button type="success" size="small" @click="save">保存</el-button>
        </div>
    </div>
</template>
<script>
import * as api from '@/api/admin'
import { listRole } from '@/api/role'
export default {
    name: 'AdminAuth',

    data(){
        return {
            user_name: '',
            checkAll: false,
            options: [],
            roles: [],
            checkRoles: [],
            checkAccesses: []
        }
    },

    mounted(){
        this.user_name = this.$route.query.name

        api.getAccessList().then(res => {
            this.options = res.data
            api.getAccessList({
                admin_id: this.$route.query.id,
                theme_id: this.$store.state.admin.themeInfo.id
            }).then(data => {
                this.checkAccesses = data.data.reduce((acc, curValue) => ([...acc, curValue.id]), [])
            })
        })


        listRole({
            theme_id: this.$store.state.admin.themeInfo.id,
            role_group: 1
        }).then(res => {
            this.roles = res.data
        })

        // api.getRoleByAdminId({
        //     id: this.$route.query.id,
        //     theme_id: this.$store.state.admin.themeInfo.id
        // }).then(res => {
        //     res.data.map(item => {
        //         this.checkRoles.push(item)
        //     })
        // })
    },

    methods: {

        roleChangeHandler(value, role_id){
            api.getAccessList({
                role_id
            }).then(res => {
                var checkAccesses = [...this.checkAccesses]
                res.data.map(item => {
                    if(value){
                        if(checkAccesses.indexOf(item.id) == -1){
                            checkAccesses.push(item.id)
                        }
                    }else{
                        if(checkAccesses.indexOf(item.id) != -1){
                            checkAccesses.splice(checkAccesses.indexOf(item.id), 1)
                        } 
                    }
                })
                this.checkAccesses = checkAccesses
            })
        },

        save(){
            this.loading = this.$loading()
            api.assignAccessToAdmin({
                admin_id: this.$route.query.id,
                theme_id: this.$store.state.admin.themeInfo.id,
                access_id: this.checkAccesses
            }).then(res => {
                this.loading.close()
                this.$router.go(-1)
            })    
        }
    }
}
</script>
<style lang="scss" scoped>
.el-checkbox{
    margin: 15px;
}
.btn-group{
    margin-top: 50px;
    text-align: center;
}
.body{
    .l{
        width: 40%;
        float: left;
    }
    .r{
        width: 50%;
        float: right;
    }
}
</style>