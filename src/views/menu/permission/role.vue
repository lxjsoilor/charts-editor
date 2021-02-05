<template>
    <div>
        <div class="head">
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
            <!-- <el-table-column
                prop="status"
                label="是否启用">
            </el-table-column> -->
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
                    <el-button @click="toAuthorize(scope.row)" type="text" size="small" v-identify="{name: 'edit_role'}">权限设置</el-button>
                    <el-button type="text" size="small" v-identify="{name: 'delete_role'}" @click="remove(scope.row.id)">删除</el-button>
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
                <el-button type="primary" @click="() => { createRole() } ">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import * as api from '@/api/role'
import { parseTime } from '@/utils/index'
import * as recordApi from '@/api/record'
export default {
    name: 'Role',
    data(){
        return{
            roleList: [],
            formTitle: '添加用户角色',
            dialogFormVisible: false,
            roleForm: {},
            pageSize: 20,
            orderBy: 1
        }
    },

    mounted(){
        this.render()
    },

    methods: {
        parseTime,
        render(){
            return new Promise(resolve => {
                api.listRole({
                    theme_id: this.$store.state.admin.themeInfo.id,
                    role_group: 0
                }).then(res => {
                    this.roleList = res.data
                    resolve()
                })
            })
        },

        showDialog(){
            this.roleForm = {
                role_name: '',
                role_desc: '',
                role_group: 0,
                status: 1
            }
            this.dialogFormVisible = true
        },

        /**
         * 创建角色
         */
        createRole(){
            if(!this.roleForm.role_name){
                return 	this.$message({
                    message: '角色名称不能为空',
                    type: 'warning'
                })
            }
            var data = {
                ...this.roleForm,
                theme_id: this.$store.state.admin.themeInfo.id,
                role_group: 0,
                status: 1
            }
            this.loading = this.$loading({ lock: true })
            api.addOrUpdateRole(data).then(() => {
                this.dialogFormVisible = false
                this.render().then(() => {
                    this.loading.close()
					this.$message({
						message: '角色创建成功',
						type: 'success'
                    })
                })

                recordApi.addRecord({
                    title: ` 菜单 > 角色管理 > 新增角色`,
                    detail: `新增角色:(${data.role_name})`
                })
            })
        },

        /**
         * 分配权限
         */
        toAuthorize(roleInfo){
            this.$router.push({
                path: '/admin/menu/permission/roleAuth',
                query: {
                    id: roleInfo.id,
                    name: roleInfo.role_name
                }
            })
        },

        /**
         * 删除角色
         */
        remove(id){
            this.$confirm('确认要删除该角色吗?').then(() => {
                api.removeRole({
                    role_id: id
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.render()
                })

                recordApi.addRecord({
                    title: ` 菜单 > 角色管理 > 删除角色`,
                    detail: `修改角色ID:(${id})`
                })
            })
        } 
    }
}
</script>
<style lang="scss" scoped>
.head{
    padding: 15px 0;
    text-align: right;
    .el-select{
        margin-left: 10px;
    }
}
</style>