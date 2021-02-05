<template>
  <div>
    <div class="head-r">
      <el-button type="info" size="small" @click="() => { showDialog(1) }">添加用户</el-button>
      <el-select v-model="pageSize" placeholder="显示条数" size="small">
        <el-option label="10条" :value="10" />
        <el-option label="20条" :value="20" />
        <el-option label="50条" :value="50" />
      </el-select>
      <el-select v-model="orderBy" placeholder="排序方式" size="small" :disabled="true">
        <el-option label="登录时间" :value="1" />
        <el-option label="创建时间" :value="2" />
      </el-select>
    </div>
    <el-table :data="userList" style="width: 100%" cell-class-name="cell">
      <el-table-column
        prop="user_no"
        width="110px"
        label="工号"
      />
      <el-table-column
        prop="user_name"
        label="姓名"
      />
      <el-table-column
        prop="company_desc"
        label="公司"
      />
      <el-table-column
        prop="department_desc"
        label="部门"
      />
      <el-table-column
        prop="email"
        width="80px"
        label="是否启用"
      >
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.user_theme.status == 1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="value => switchChangeHandler(scope.row, scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="last_login"
        label="最后登录时间"
      >
        <template slot-scope="scope">
          {{ parseTime(scope.row.update_time, '{y}-{m}-{d}') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="创建时间"
      >
        <template slot-scope="scope">
          {{ parseTime(scope.row.update_time, '{y}-{m}-{d}') }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="260px"
      >
        <template slot-scope="scope">
          <el-button
            v-identify="{name: 'assign_resources_user'}"
            type="success"
            size="mini"
            @click="() => changePermission(scope.row)"
          >
            权限设置
          </el-button>
          <el-button
            v-identify="{name: 'edit_user'}"
            type="primary"
            size="mini"
            @click="() => showDialog(2, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-identify="{name: 'delete_user'}"
            type="warning"
            size="mini"
            @click="() => remove(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" width="400px">
      <el-form ref="userForm" :model="userForm" :rules="userFormRules" label-width="80px" width="240px">
        <el-form-item label="员工工号">
          <el-row type="flex" justify="space-between">
            <el-col :span="14">
              <el-input v-model="userForm.user_no" :disabled="existed" />
            </el-col>
            <el-col :span="3">
              <el-button type="text" :disabled="existed" @click="search">搜索</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="text" :disabled="operation == 'edit'" @click="clear">清空</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input v-model="userForm.user_name" disabled />
        </el-form-item>
        <el-form-item label="所属公司">
          <el-input v-model="userForm.company_desc" disabled />
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="userForm.department_desc" disabled />
        </el-form-item>
        <el-form-item label="岗位">
          <el-input v-model="userForm.job_desc" disabled />
        </el-form-item>
        <el-form-item v-if="operation == 'edit'" label="重置密码" prop="new_pass">
          <el-input v-model="userForm.new_pass" />
        </el-form-item>
        <el-form-item v-if="operation == 'edit'" label="重复密码" prop="repeat_pass">
          <el-input v-model="userForm.repeat_pass" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="!existed" @click="() => { submitForm('userForm') }">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as api from '@/api/user'
import * as adminApi from '@/api/admin'
import * as recordApi from '@/api/record'
import { parseTime } from '@/utils/index'
export default {
  name: 'User',
  data() {
    var validateNo = (rule, value, callback) => {
      var reg = /^[0-9]*$/
      if (!reg.test(value) || value.toString().length != 8) {
        callback(new Error('请输入8位数字工号'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '' && this.userForm.new_pass) {
        callback(new Error('请再次输入密码'))
      } else if (this.userForm.new_pass && value !== this.userForm.new_pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userList: [],
      pageSize: 20,
      orderBy: 1,
      formTitle: '',
      dialogFormVisible: false,
      userForm: {},
      existed: false,
      operation: '',

      userFormRules: {
        repeat_pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },

  mounted() {
    this.render()
  },

  methods: {
    parseTime,
    render() {
      api.list({
        theme_id: this.$store.state.admin.themeInfo.id,
        admin: 1
      }).then(res => {
        this.userList = res.data
      })
    },
    showDialog(opreate, userData) {
      if (opreate == 1) {
        this.dialogFormVisible = true
        this.formTitle = '新增员工'
        this.operation = 'create'
        this.clear()
      } else if (opreate == 2) {
        this.formTitle = '编辑员工信息'
        this.operation = 'edit'
        this.userForm = {
          ...userData,
          // 新增密码修改方式
          new_pass: '',
          repeat_pass: ''
        }
        this.existed = true
        this.dialogFormVisible = true
      }
    },
    changePermission(userData) {
      this.$router.push({
        path: '/admin/menu/permission/userAuth',
        query: {
          name: userData.user_name,
          id: userData.id
        }
      })
    },
    submitForm(formName) {
      this.loading = this.$loading({ lock: true })
      // 创建
      if (this.operation == 'create') {
        var data = {
          ...this.userForm,
          status: 1,
          theme_id: this.$store.state.user.themeInfo.id
        }
        api.addUser(data).then(res => {
          this.dialogFormVisible = false
          // 创建成功后刷新
          this.render().then(() => {
            this.$message({
              message: '用户创建成功',
              type: 'success'
            })
            this.loading.close()
          })
        }).catch(() => {
          this.loading.close()
        })
        // 更新
      } else if (this.operation == 'edit') {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            // 更新时把久密码干掉，不要一起更新
            if (this.userForm.password) {
              delete this.userForm.password
            }
            api.updateUser(this.userForm).then(res => {
              this.dialogFormVisible = false
              this.render().then(() => {
                this.$message({
                  message: '员工信息更新成功',
                  type: 'success'
                })
                this.loading.close()
              })
            }).catch(err => {
              this.loading.close()
            })
          } else {
            this.loading.close()
            return false
          }
        })
      }

      recordApi.addRecord({
        title: ` 菜单 > 权限设置 > 新增用户`,
        detail: `新增用户：工号(${this.userForm.user_no}),姓名(${this.userForm.user_name})`
      })
    },
    /**
         * 通过工号去employee检索数据
         */
    search() {
      api.searchUser({
        user_no: this.userForm.user_no
      }).then(res => {
        var { data } = res
        if (data) {
          this.existed = true
          this.userForm.user_name = data.SNAME
          this.userForm.department = data.ZZ_SIJI
          this.userForm.department_desc = data.ZZ_SIJI_DESC
          this.userForm.company = data.BUKRS
          this.userForm.company_desc = data.BUKRS_DESC
          this.userForm.job = data.PLANS
          this.userForm.job_desc = data.PLANS_DESC
        } else {
          this.$message({
            message: '系统中找不到该用户',
            type: 'warning'
          })
        }
      })
    },
    remove(user) {
      this.$confirm('确认删除此用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除的用户如果是管理员，则提示不给删除
        adminApi.getAdminList({
          theme_id: this.$store.state.admin.themeInfo.id
        }).then(res => {
          const list = res.data
          const filterItem = list.filter(item => item.user_no == user.user_no)
          if (filterItem.length) {
            this.$message({
              message: '该用户是管理员，不能删除',
              type: 'warning'
            })
          } else {
            api.removeUser({
              theme_id: this.$store.state.user.themeInfo.id,
              user_id: user.id
            }).then(res => {
              this.$message({
                message: '员工删除成功',
                type: 'success'
              })
              this.render()
            })
            recordApi.addRecord({
              title: ` 菜单 > 权限设置 > 删除用户`,
              detail: `删除用户：工号(${user.user_no}),姓名(${user.user_name})`
            })
          }
        })
      })
    },
    clear() {
      this.existed = false
      this.userForm = {
        user_no: '',
        user_name: '',
        email: null,
        department: '',
        remark: '',
        employee_id: ''
      }
    },
    switchChangeHandler(data, index) {
      data.user_theme.status = !data.user_theme.status
      this.loading = this.$loading()
      api.changeUserStatus({
        theme_id: this.$store.state.user.themeInfo.id,
        user_id: data.id,
        status: Number(data.user_theme.status)
      }).then(res => {
        this.loading.close()
        this.userList.splice(index, 1, data)
      })
    }
  }
}
</script>
<style lang="scss">
.cell{
    text-align: center;
}
</style>
