<template>
  <div class="container">
    <div class="head">
      <el-button type="info" size="small" @click="() => { showDialog(1) }">添加管理员</el-button>
    </div>
    <el-table :data="adminList" style="width: 100%" cell-class-name="cell">
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
          <el-switch :value="scope.row.admin_theme.status == 1" @change="() => { switchChangeHandler(scope.row, scope.$index) }" />
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
            type="success"
            size="mini"
            @click="() => changePermission(scope.row)"
          >
            权限设置
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="() => showDialog(2, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="warning"
            size="mini"
            @click="() => remove(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" width="400px">
      <div class="tips">提示: 管理员必须是当前租户下的用户。</div>
      <el-form label-width="80px" width="240px">
        <el-form-item label="用户">
          <el-select :disabled="adminForm.id" :value="adminForm.user_name" placeholder="选择用户" @change="index => { adminForm = userList[index] }">
            <el-option v-for="(item, index) in userList" :key="item.id" :label="item.user_name" :value="index" />
          </el-select>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="password" type="password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="!(adminForm.id && password)" @click="() => { submitForm() } ">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as adminApi from '@/api/admin'
import * as userApi from '@/api/user'
import { parseTime } from '@/utils/index'
import { Promise } from 'q'
export default {
  name: 'Admin',

  data() {
    return {
      adminList: [],
      userList: [],
      formTitle: '',
      dialogFormVisible: false,
      password: '',
      adminForm: {}
    }
  },

  mounted() {
    userApi.list({
      theme_id: this.$store.state.admin.themeInfo.id
    }).then(res => {
      this.userList = res.data
    })
    this.init()
  },

  methods: {

    parseTime,

    init() {
      return new Promise(resolve => {
        adminApi.getAdminList({
          theme_id: this.$store.state.admin.themeInfo.id
        }).then(res => {
          this.adminList = res.data
          resolve()
        })
      })
    },

    changePermission(adminData) {
      this.$router.push({
        path: '/admin/setting/adminAuth',
        query: {
          name: adminData.user_name,
          id: adminData.id
        }
      })
    },

    showDialog(type, adminInfo) {
      if (type == 1) {
        this.formTitle = '新增管理员'
        this.adminForm = {}
        this.password = ''
        this.dialogFormVisible = true
      } else if (type == 2) {
        this.formTitle = `编辑管理员: ${adminInfo.user_name}`
        this.adminForm = adminInfo
        this.password = ''
        this.dialogFormVisible = true
      }
    },

    submitForm() {
      if (!this.password) {
        return 	this.$message({
          message: '登录密码不能为空',
          type: 'warning'
        })
      }
      var { user_no, user_name, email, department, department_desc, company, 	company_desc, job, job_desc } = this.adminForm
      this.loading = this.$loading({ lock: true })
      adminApi.addAdmin({
        theme_id: this.$store.state.admin.themeInfo.id,
        user_no,
        user_name,
        email,
        department,
        department_desc,
        company,
        company_desc,
        job,
        job_desc,
        password: this.password
      }).then(() => {
        this.init().then(_ => {
          this.loading.close()
          this.dialogFormVisible = false
          this.$message({
            message: '创建管理员成功',
            type: 'success'
          })
        })
      })
    },

    remove(id) {
      adminApi.removeAdmin({
        id,
        theme_id: this.$store.state.admin.themeInfo.id
      }).then(_ => {
        this.init().then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      })
    },

    switchChangeHandler(data, index) {
      data.admin_theme.status = !data.admin_theme.status
      adminApi.changeAdminStatus({
        admin_id: data.id,
        theme_id: this.$store.state.admin.themeInfo.id,
        status: Number(data.admin_theme.status)
      }).then(res => {
        this.adminList.splice(index, 1, data)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tips{
    background-color: #eee;
    color: #999;
    padding: 0 0 0 30px;
    margin-bottom: 15px;
}
</style>
