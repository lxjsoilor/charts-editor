<template>
  <el-container class="container">
    <el-header height="50px" class="tips"><b>温馨提示!</b> 本模块功能配置主题门户首页和左侧菜单；菜单深度为3.</el-header>
    <el-main>
      <div class="block">
        <div class="row tree-head">
          <span class="title title_0">菜单名称</span>
          <span class="grid">菜单类型</span>
          <span class="grid">启用</span>
          <span class="grid">公开</span>
          <span class="grid">创建时间</span>
          <span class="grid">操作</span>
        </div>
        <div class="row home">
          <span class="title title_0" style="text-align:left;padding-left: 20px;">首页</span>
          <span class="grid">首页</span>
          <span class="grid">
            <el-switch
              :disabled="true"
              :value="true"
            />
          </span>
          <span class="grid">
            <el-switch
              :disabled="true"
              :value="true"
            />
          </span>
          <span class="grid" style="margin-right: 6px;" />
          <span class="btn-group" style="text-align:left;">
            <el-button
              v-identify="{name: 'add_resources_2'}"
              type="success"
              size="mini"
              @click="() => createResources({type: 0, id: 0})"
            >
              创建一级菜单
            </el-button>
            <el-button
              v-identify="{name: 'add_resources_2'}"
              type="primary"
              size="mini"
              @click="toEditHome"
            >
              编辑
            </el-button>
          </span>
        </div>
        <el-tree
          :data="resourcesList"
          node-key="id"
          default-expand-all
          :draggable="true"
          :expand-on-click-node="false"
          :allow-drop="(draggingNode, dropNode, type) => draggingNode.data.pid == dropNode.data.pid && (type == 'prev' || type == 'next')"
          :indent="24"
          @node-drag-end="dragEndHandler"
        >
          <span slot-scope="{ node, data }" class="row">
            <span :class="['title', 'title_' + data.type]">{{ data.menu_title }}</span>
            <span class="grid">
              <template v-if="data.type == 1">一级菜单</template>
              <template v-else-if="data.type == 2">二级菜单</template>
              <template v-else>三级菜单</template>
            </span>
            <span class="grid">
              <el-switch
                v-model="data.status"
                v-identify="{name: 'edit_resources'}"
                :active-value="1"
                :inactive-value="0"
                @change="value => switchChangeHandler(data, value, 'status')"
              />
            </span>
            <span class="grid">
              <el-switch
                v-model="data.public"
                v-identify="{name: 'edit_resources'}"
                :active-value="1"
                :inactive-value="0"
                @change="value => switchChangeHandler(data, value, 'public')"
              />
            </span>
            <span class="grid">{{ parseTime(data.update_time, '{y}-{m}-{d}') }}</span>
            <span class="btn-group">
              <el-button
                v-if="data.type == 1"
                v-identify="{name: 'add_resources_2'}"
                type="success"
                size="mini"
                @click="() => createResources(data)"
              >
                创建二级菜单
              </el-button>
              <el-button
                v-if="data.type == 2"
                v-identify="{name: 'add_resources_3'}"
                type="success"
                size="mini"
                @click="() => createResources(data)"
              >
                创建三级菜单
              </el-button>
              <el-button
                v-identify="{name: 'edit_resources'}"
                type="primary"
                size="mini"
                @click="() => editResources(data)"
              >
                编辑
              </el-button>
              <el-button
                v-identify="{name: 'delete_resources'}"
                type="warning"
                size="mini"
                @click="() => deleteResources(data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </el-main>

    <resources-dialog
      ref="form"
      :layer-title="layerTitle"
      :dialog-visible="dialogVisible"
      :resources-data="resourcesForm"
      @close="() => { this.dialogVisible = false }"
      @renderList="renderList"
    />

  </el-container>
</template>

<script>
import * as api from '@/api/resources'
import * as recordApi from '@/api/record'
import { getHomeInfo } from '@/api/theme'
import { RecursiveSearch, parseTime } from '@/utils/index'
import eventBus from '@/utils/eventBus'
import ResourcesDialog from './dialog'
export default {
  name: 'Configuration',

  components: {
    ResourcesDialog
  },
  data() {
    return {
      dialogVisible: false,
      layerTitle: '编辑菜单',
      resourcesList: [],
      resourcesForm: {}
    }
  },

  mounted() {
    this.render()
    eventBus.$on('change-theme', () => {
      this.render()
    })
  },

  beforeDestroy() {
    eventBus.$off('change-theme')
  },

  methods: {
    parseTime,

    render() {
      return new Promise(resolve => {
        api.getResourcesTree({
          theme_id: this.$store.state.admin.themeInfo.id,
          tree: 1
        }).then(list => {
          this.resourcesList = list.data
          resolve()
        })
      })
    },

    renderList(){
      this.render()
      this.dialogVisible = false
    },

    /**
		 * 切换状态：启用/禁用  公开/私有
		 */
    switchChangeHandler(data, value, key) {
      if (value == 0 && data.type != 3) {
        var root = RecursiveSearch(this.resourcesList, 'id', data.id)
        if (root.children && root.children.length > 0) {
          var res = RecursiveSearch(root.children, key, 1)
          if (res !== false) {
            data[key] = 1
            return this.$message({
              message: '尚有未关闭的子节点，请先关闭子节点',
              type: 'warning'
            })
          }
        }
      }
      this.resourcesForm = data
      this.$refs.form.submitForm(this.resourcesForm)
    },

    /**
		 * 创建菜单
		 */
    createResources(data) {
      this.resourcesForm = {
        type: data.type + 1,
        menu_title: '',
        open_type: 0,
        public: 0,
        pid: data.id,
        links: [
          {
            url: '',
            origin: '',
            verify: 0,
            verify_account: '',
            start_time: '',
            end_time: '',
            start_time_radio: 1,
            end_time_radio: 1,
            start_day: 0,
            end_day: 0
          }
        ],
        user_id: this.$store.state.admin.userInfo.id,
        theme_id: this.$store.state.admin.themeInfo.id
      }
      switch (data.type) {
        case 0:
          this.layerTitle = '添加一级菜单'
          break
        case 1:
          this.layerTitle = data.menu_title + '：添加二级菜单'
          break
        case 2:
          this.layerTitle = data.menu_title + '：添加三级菜单'
          break
      }
      this.operation = 'create'
      this.dialogVisible = true
    },

    /**
		 * 编辑菜单
		 */
    editResources(data) {
      this.layerTitle = '编辑菜单：' + data.menu_title
      if (data.links.length == 0) {
        data.links = [
          {
            url: '',
            origin: 'Tableau',
            verify: 0,
            verify_account: '',
            start_time: '',
            end_time: '',
            start_time_radio: 1,
            end_time_radio: 1,
            start_day: 0,
            end_day: 0
          }
        ]
      }
      this.resourcesForm = data
      this.operation = 'edit'
      this.dialogVisible = true
    },
    /**
		 * 删除菜单
		 */
    deleteResources(data) {
      if (data.type != 3) {
        var root = RecursiveSearch(this.resourcesList, 'id', data.id)
        if (root.children && root.children.length > 0) {
          var res = RecursiveSearch(root.children, 'theme_id', this.$store.state.admin.themeInfo.id)
          if (res !== false) {
            return this.$message({
              message: '尚有未删除的子节点，请先删除子节点',
              type: 'warning'
            })
          }
        }
      }
      this.$confirm('您确定要删除该选项吗？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteResources({ id: data.id }).then(res => {
          // 删除成功后刷新
          this.render().then(() => {
            this.$message({
              message: '菜单删除成功',
              type: 'success'
            })
          })

          recordApi.addRecord({
            title: `自定义菜单 > 删除${data.type}级菜单`,
            detail: `菜单标题： ${data.menu_title}`
          })
        })
      }).catch(err => null)
    },

    dragEndHandler(draggingNode, dropNode, type) {
      this.resourcesForm = draggingNode.data
      if (type == 'after') {
        this.resourcesForm.resources_order = dropNode.data.resources_order - 1
      } else if (type == 'before') {
        this.resourcesForm.resources_order = dropNode.data.resources_order + 1
      }
      this.$refs.form.submitForm(this.resourcesForm)
    },

    /**
		 * 编辑首页
		 */
    toEditHome() {
      this.loading = this.$loading()
      getHomeInfo({
        theme_id: this.$store.state.admin.themeInfo.id
      }).then(res => {
        if (res.data) {
          this.resourcesForm = res.data
        } else {
          this.resourcesForm = {
            type: 0,
            menu_title: '首页',
            open_type: 0,
            public: 1,
            pid: -1,
            links: [
              {
                url: '',
                origin: '',
                verify: 0,
                verify_account: '',
                start_time: '',
                end_time: '',
                start_time_radio: 1,
                end_time_radio: 1,
                start_day: 0,
                end_day: 0
              }
            ],
            user_id: this.$store.state.admin.userInfo.id,
            theme_id: this.$store.state.admin.themeInfo.id
          }
        }
        this.layerTitle = '编辑首页'
        this.operation = 'edit'
        this.dialogVisible = true
        this.loading.close()
      })
    }

  }
}
</script>

<style lang="scss">
body{
	background-color: #eee;
}
.container{
	min-height: 100vh;
	width: 1100px;
	margin: 10px auto;
	background-color: #fff;
	box-shadow: 0 0 5px #eee;
	border: 1px solid #ddd;
	padding: 20px 10px;
}
.tips{
	background-color: rgb(198, 226, 255);
	line-height: 50px;
}
.tree-head{
	height: 40px;
	border-bottom: 1px solid #eee;
	margin-bottom: 10px;
}
.row{
	width: 100%;
	.title{
		display: inline-block;
		width: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.title_0{
		width: 192px;
		text-align: center;
	}
	.title_1{
		margin-right: 48px;
	}
	.title_2{
		margin-right: 24px;
	}
	.grid{
		display: inline-block;
		width: 100px;
		text-align: center;
	}
	.btn-group{
		display: inline-block;
		width: 250px;
		text-align: right;
		margin-left: 20px;
	}
}
.el-tree-node__content{
	height: 40px;
	border-bottom: 1px dotted #eee;
}
.home{
	padding-bottom: 5px;
	border-bottom: 1px solid #eee;
}
</style>
