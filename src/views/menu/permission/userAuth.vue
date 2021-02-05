<template>
  <div>
    <div class="head">当前用户：<b>{{ userName }}</b></div>
    <div class="body clearfix">
      <div class="left">
        <div class="head">角色分配</div>
        <el-table
          :data="roleData"
          style="width: 100%"
        >
          <el-table-column
            prop="id"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.selected" @change="e => roleChangeHandler(scope.row.id, e)">{{ scope.row.id }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="role_name"
            label="角色名称"
            width="120"
          />
          <el-table-column
            prop="role_desc"
            label="职能描述"
          />
        </el-table>
      </div>
      <div class="right">
        <div class="head">资源分配</div>
        <el-tree
          ref="tree"
          :data="resourcesTree"
          show-checkbox
          :default-expand-all="true"
          node-key="id"
          :check-strictly="systemNodeFlag"
          @check="clickHandler"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <span>{{ data.menu_title }}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="foot">
      <el-button size="small" type="primary" @click="save">保存</el-button>
      <el-button size="small" @click="() => { this.$router.go(-1) }">返回</el-button>
    </div>
  </div>
</template>
<script>
import * as userApi from '@/api/user'
import * as recordApi from '@/api/record'
import * as roleApi from '@/api/role'
import * as resourcesApi from '@/api/resources'
import { uniqueArr } from '@/utils/index'
export default {
  data() {
    return {
      userName: '',
      roleData: [],
      resourcesTree: [],
      systemNodeFlag: false
    }
  },

  mounted() {
    this.userName = this.$route.query.name
    this.init()
  },

  methods: {
    async init() {
      try {
        // 获取角色列表
        var roles = await roleApi.listRole({ theme_id: this.$store.state.admin.themeInfo.id, role_group: 0 })
        var rolesAlready = await userApi.getRolesByUserId({ id: this.$route.query.id })
        roles.data.map((item, index) => {
          const curRole = roles.data[index]
          curRole.selected = rolesAlready.data.includes(item.id)
          curRole.resourceIds = curRole.resources.reduce((acculator, val) => {
            acculator.push(val.id)
            return acculator
          }, [])
        })
        this.roleData = roles.data
      } catch (error) {
        this.$message.error('角色数据获取失败')
      }

      try {
        // 读取资源列表 -- 树状展示
        var res = await resourcesApi.getResourcesTree({ theme_id: this.$store.state.admin.themeInfo.id, tree: 1 })
        this.resourcesTree = res.data
      } catch (error) {
        this.$message.error('资源数据获取失败')
      }

      try {
        // 读取用户拥有资源ID
        var res = await userApi.getResourcesByUserId({ user_id: this.$route.query.id, theme_id: this.$store.state.admin.themeInfo.id })
        this._updateResourceTree(res.data)
      } catch (error) {
        this.$message.error('用户数据获取失败')
      }
    },

    /**
         * 单独分配权限
         */
    clickHandler(item, data, c) {
      this.roleData.map((val, index) => {
        val.resourceIds.includes(item.id) && val.selected && (val.selected = false)
      })
      this.roleData = this.roleData
    },

    /**
         * 根据角色进行权限分配
         */
    async roleChangeHandler(roleId, value) {
      var loading = this.$loading({ lock: true })
      var checkedNodes = this.$refs.tree.getCheckedNodes()
      try {
        this.systemNodeFlag = true
        var res = await roleApi.getResourcesByRoleId({ role_id: roleId })
        loading.close()
        if (value) {
          checkedNodes = checkedNodes.concat(res.data)
        } else {
          res.data.map(item => {
            checkedNodes.map((node, index) => {
              node.id == item.id && checkedNodes.splice(index, 1)
            })
          })
        }
        this._updateResourceTree(checkedNodes)
      } catch (error) {
        loading.close()
      }
    },

    async _updateResourceTree(checkNodes) {
      var nodes = []
      checkNodes.map(node => {
        var isRoot = checkNodes.reduce((acculator, value) => {
          return acculator || node.id == value.pid
        }, false)
        !isRoot && nodes.push(node)
      })
      this.$refs.tree.setCheckedNodes(nodes)
      this.systemNodeFlag = false
    },

    /**
         * 保存：角色权限优先级 > 单独配置优先级
         */
    async save() {
      const loading = this.$loading({ lock: true })
      var role_id = []; var resources_id = []; var checkedNodes = this.$refs.tree.getCheckedNodes(false, true)
      checkedNodes.map(node => { resources_id.push(node.id) })
      this.roleData.map(role => {
        if (role.selected) {
          const tmp = []
          role_id.push(role.id)
          resources_id.map((resourceId, index) => {
            !role.resourceIds.includes(resourceId) && tmp.push(resourceId)
          })
          resources_id = tmp
        }
      })
      try {
        await roleApi.assignRoleToUser({ role_id, user_id: this.$route.query.id, theme_id: this.$store.state.admin.themeInfo.id })
        await resourcesApi.assignToUser({ resources_id, user_id: this.$route.query.id, theme_id: this.$store.state.admin.themeInfo.id })
        loading.close()
        recordApi.addRecord({ title: ` 菜单 > 用户管理 > 权限设置`, detail: `修改用户权限：用户ID(${this.$route.query.id})` })
        this.$message.success('权限设置成功')
        this.$router.go(-1)
      } catch (error) {
        this.$message.error('权限设置失败')
        loading.close()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.head{
    padding: 15px;
    border-bottom: 1px solid #eee;
}
.body{
    padding: 15px;
    .left{
        width: 50%;
        float: left;
    }
    .right{
        width: 40%;
        float: right;
    }
    .head{
        padding: 10px 15px;
        margin-bottom: 15px;
        font-weight: 600;
    }
}

.foot{
    text-align: center;
}
</style>
