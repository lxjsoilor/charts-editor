<template>
    <div class="container">
        <div class="head-r">
            <el-button type="info" size="small" @click="() => { showDialog() }">添加角色</el-button>
            <el-select v-model="pageSize" placeholder="显示条数" size="small">
                <el-option label="10条" :value="10"></el-option>
                <el-option label="20条" :value="20"></el-option>
                <el-option label="50条" :value="50"></el-option>
            </el-select>
            <el-select v-model="orderBy" placeholder="排序方式" size="small" :disabled="true">
                <el-option label="人员数量" :value="1"></el-option>
                <el-option label="创建时间" :value="2"></el-option>
            </el-select>
        </div>
        <el-table :data="roleList" cell-class-name="cell" style="width: 100%;">
            <el-table-column
                prop="role_name"
                label="角色名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="role_desc"
                label="角色描述"
                width="180">
            </el-table-column>
            <el-table-column
                prop="count"
                label="成员数量">
            </el-table-column>
            <el-table-column
                prop="status"
                label="是否启用">
            </el-table-column>
            <el-table-column
                prop="update_time"
                label="添加时间">
                <template slot-scope="scope">
                    {{parseTime(scope.row.update_time)}}
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <el-button type="text" size="small">查看</el-button>
                    <el-button @click="toAuthorize(scope.row)" type="text" size="small">权限设置</el-button>
                    <el-button @click="() => { showDialog(scope.row) }" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
            <el-form :model="roleForm">
                <el-form-item label="角色名称" label-width="80px">
                    <el-input v-model="roleForm.role_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" label-width="80px">
                    <el-input
                        type="textarea"
                        :rows="4"
                        :max="50"
                        resize="none"
                        placeholder="请输入内容"
                        v-model="roleForm.role_desc">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="() => { createOrUpdate() } ">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { parseTime } from '@/utils/index'
import * as api from '@/api/role'
export default {
    name: 'AdminRole',
    data(){
        return {
            roleList: [],
            roleForm: {},
            dialogFormVisible: false,
            formTitle: '',
            pageSize: 20,
            orderBy: 1
        }
    },

    mounted(){
        this.init()
    },

    methods: {
        parseTime,

        init(){
            return new Promise(resolve => {
                api.listRole({
                    theme_id: this.$store.state.admin.themeInfo.id,
                    role_group: 1
                }).then(res => {
                    this.roleList = res.data
                    resolve()
                })
            })
        },

        showDialog(roleInfo){
            if(roleInfo){
                this.roleForm = {
                    id: roleInfo.id,
                    role_name: roleInfo.role_name,
                    role_desc: roleInfo.role_desc
                }
                this.formTitle = '编辑角色:' + roleInfo.role_name
            }else{
                this.roleForm = {
                    role_name: '',
                    role_desc: ''
                }
                this.formTitle = '添加角色'
            }
            this.dialogFormVisible = true
        },

        createOrUpdate(){
            if(!this.roleForm.role_name){
                return 	this.$message({
                    message: '角色名称不能为空',
                    type: 'warning'
                })
            }
            var data = {
                ...this.roleForm,
                theme_id: this.$store.state.admin.themeInfo.id,
                role_group: 1,
                status: 1
            }
            this.loading = this.$loading({ lock: true })
            api.addOrUpdateRole(data).then(() => {
                this.dialogFormVisible = false
                this.init().then(() => {
                    this.loading.close()
					this.$message({
						message: '操作成功',
						type: 'success'
                    })
                })
            }).catch(_ => {
                this.loading.close()
            })
        },

        toAuthorize(roleInfo){
            this.$router.push({
                path: '/admin/setting/roleAuth',
                query: {
                    name: roleInfo.role_name,
                    id: roleInfo.id
                }
            })
        }

    }
}
</script>