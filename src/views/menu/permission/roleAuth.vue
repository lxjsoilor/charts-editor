<template>
  <div>
    <div class="head">当前角色：{{ roleName }}</div>
    <el-tree
      ref="tree"
      class="body"
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
    <div class="foot">
      <el-button size="small" type="primary" @click="save">保存</el-button>
      <el-button size="small" @click="() => { this.$router.go(-1) }">返回</el-button>
    </div>
  </div>
</template>
<script>
import * as roleApi from '@/api/role'
import * as recordApi from '@/api/record'
import * as resourcesApi from '@/api/resources'
export default {
  data() {
    return {
      roleName: '',
      resourcesTree: [],
      systemNodeFlag: false
    }
  },

  mounted() {
    this.roleName = this.$route.query.name
    this.render()
  },

  methods: {
    async render() {
      // 获取数据
      var resource = await resourcesApi.getResourcesTree({ theme_id: this.$store.state.user.themeInfo.id, tree: 1 })
      this.resourcesTree = resource.data

      // 初始化数据
      this.systemNodeFlag = true
      var res = await roleApi.getResourcesByRoleId({ role_id: this.$route.query.id })
      this._updateResourceTree(res.data)
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

    async save() {
      var loading = this.$loading(); var resources_id = []; var checkedNodes = this.$refs.tree.getCheckedNodes(false, true)
      checkedNodes.map(node => { resources_id.push(node.id) })
      try {
        await resourcesApi.assignToRole({ role_id: this.$route.query.id, resources_id })
        loading.close()
        recordApi.addRecord({ title: ` 菜单 > 角色管理 > 权限设置`, detail: `角色ID:(${this.$route.query.id})` })
        this.$router.go(-1)
      } catch (error) {
        this
          .loading.close()
      }
    },

    clickHandler() {

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
    padding: 30px;
}
.foot{
    text-align: center;
}
</style>
