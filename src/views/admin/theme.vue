<template>
  <div class="container">
    <div class="header">
      <el-button size="small" @click="() => { showDialog(1) }">添加租户</el-button>
    </div>
    <el-table :data="themeList" style="width: 100%" cell-class-name="cell">
      <el-table-column
        prop="id"
        width="80"
        label="租户ID"
      />
      <el-table-column
        prop="theme_name"
        label="租户名称"
      />
      <el-table-column
        prop="department"
        label="部门"
      />
      <el-table-column
        prop="manager"
        label="创建者"
      />
      <el-table-column
        prop="status"
        width="80px"
        label="是否启用"
      >
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status == 1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="value => switchChangeHandler(scope.row, scope.$index)"
          />
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
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="() => showDialog(2, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="() => delTheme(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" width="400px">
      <el-form ref="themeForm" :model="themeForm" label-width="100px" width="240px">
        <el-form-item label="员工工号">
          <el-row type="flex" justify="space-between">
            <el-col :span="14">
              <el-input v-model="themeForm.manager_id" :disabled="existed" />
            </el-col>
            <el-col :span="3">
              <el-button type="text" :disabled="existed" @click="search">搜索</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="text" :disabled="operation == 'edit'" @click="clear">清空</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="租户名称">
          <el-input v-model="themeForm.theme_name" width="120" />
        </el-form-item>
        <el-form-item label="管理员名称">
          <el-input v-model="themeForm.manager" width="120" disabled />
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="themeForm.department" width="120" disabled />
        </el-form-item>
        <el-form-item label="租户描述">
          <el-input v-model="themeForm.remark" resize="none" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="!(existed && themeForm.theme_name)" @click="() => { submitForm('themeForm') } ">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/theme'
import * as resourcesApi from '@/api/resources'
import { searchUser } from '@/api/user'
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      themeList: [],
      dialogFormVisible: false,
      themeForm: {},
      formTitle: '',
      existed: false,
      operation: ''
    }
  },

  mounted() {
    this.render()
  },

  methods: {
    parseTime,

    render() {
      api.listTheme({
        pageNo: 1,
        pageSize: 10
      }).then(res => {
        this.themeList = res.data.rows
      })
    },

    showDialog(opreate, themeData) {
      if (opreate == 1) {
        this.dialogFormVisible = true
        this.formTitle = '新增租户'
        this.operation = 'create'
        this.clear()
      } else if (opreate == 2) {
        this.formTitle = '编辑租户'
        this.operation = 'edit'
        this.existed = false
        this.themeForm = {
          ...themeData
        }
        this.dialogFormVisible = true
      }
    },

    submitForm(formName) {
      this.loading = this.$loading()
      // 创建
      if (this.operation == 'create') {
        api.addOrUpdateTheme(this.themeForm).then(res => {
          this.dialogFormVisible = false
          // 创建成功后刷新
          this.render()
          this.$message({
            message: '租户创建成功',
            type: 'success'
          })
          this.loading.close()
        }).catch(() => {
          this.loading.close()
        })
        // 更新
      } else if (this.operation == 'edit') {
        api.addOrUpdateTheme(this.themeForm).then(res => {
          this.dialogFormVisible = false
          this.render()
          this.$message({
            message: '员工信息更新成功',
            type: 'success'
          })
          this.loading.close()
        }).catch(err => {
          this.loading.close()
        })
      }
    },

    /**
         * 通过工号去employee检索数据
         */
    search() {
      searchUser({
        user_no: this.themeForm.manager_id
      }).then(res => {
        var { data } = res
        if (data) {
          this.existed = true
          this.themeForm.manager = data.SNAME ? data.SNAME : '佚名'
          this.themeForm.department = data.ZZ_SIJI_DESC ? data.ZZ_SIJI_DESC : '未知'
          this.themeForm.managerInfo = data
        } else {
          this.$message({
            message: '系统中找不到该用户',
            type: 'warning'
          })
        }
      })
    },
    /**
         * 清空表单
         */
    clear() {
      this.existed = false
      this.themeForm = {
        theme_name: '',
        department: '',
        manager_id: '',
        manager: ''
      }
    },

    switchChangeHandler(data, index) {
      data.status = Number(!data.status)
      this.themeList.splice(index, 1, data)
      this.loading = this.$loading()
      api.addOrUpdateTheme(data).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.loading.close()
      })
    },

    delTheme(data) {
      console.log(this.$store.state.user, data)
      this.$alert('是否确定删除该租户', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            this.cheackDel(data)
          }
        }
      })
    },

    async cheackDel(data) {
      console.log(data)
      // 查找该租户下有没有用户
      const idList = await api.getUserByThemeId({
        theme_id: data.id
      })
      // 查找该租户下有没有自建菜单
      const resourcesList = await resourcesApi.getResourcesTree({
        theme_id: data.id,
        tree: 1
      })

      if (idList.data.length < 2 && !resourcesList.data) {
        api.deleteTheme({
          theme_id: data.id,
          user_no: data.manager_id
        }).then(res => {
          this.render()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      } else {
        this.$message({
          message: '该租户下有用户和菜单，无法删除',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style lang="scss">
.header{
    padding: 15px 50px;
    text-align: right;
}
</style>
