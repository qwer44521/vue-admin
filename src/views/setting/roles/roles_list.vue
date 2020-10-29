<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAdd">添加角色</el-button>
    <!--    表格主题结构-->
    <el-table :data="role_list" style="width: 100%">
      <el-table-column prop="id" label="ID" width="50" />
      <el-table-column prop="r_name" label="角色名" />
      <el-table-column prop="roles" label="英文标识" />
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status ? 'success' : 'info'"
            disable-transitions
          >{{ scope.row.status ? '启用' : '停用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="750px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="form.role_name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :key="1" :label="1">启用</el-radio>
            <el-radio :key="0" :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree
            ref="menu"
            :data="menuOptions"
            show-checkbox
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
            :check-strictly="checkStrictly"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span v-if="data.children === undefined || data.children.length === 0" class="custom-tree-node-btns" />
            </span>
          </el-tree>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getRoles } from '@/api/roles'
import { menuSelect } from '@/api/menu_list'
export default {
  name: 'RolesList',
  data() {
    return {
      role_list: [],
      // 弹出层标题
      title: '',
      // 表单参数
      form: {},
      // 是否显示弹出层
      open: false,
      // tree关联状态
      checkStrictly: false,
      // 权限管理的菜单项
      menuOptions: [],
      // 节点数据
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 获取角色列表*/
    getList() {
      getRoles().then(response => {
        this.role_list = response.data
      })
    },
    // 查询菜单的树形结构
    /** 查询菜单树结构 */
    getMenuTreeselect(buttons = [], defaultKeys = null) {
      this.checkStrictly = true
      menuSelect().then(response => {
        console.log(response)
        this.menuOptions = this.mergeTreeButton(response.data, buttons)
        if (defaultKeys && defaultKeys.length > 0) {
          this.$refs.menu.setCheckedKeys(defaultKeys)
        }
        this.checkStrictly = false
      })
    },
    /** 组合次菜单 button */
    mergeTreeButton(tree, buttons = []) {
      tree.forEach((item, key) => {
        tree[key].buttons = []
        buttons.filter(_item => {
          if (_item.menu_id === item.menu_id) {
            tree[key].buttons = _item.btns
            return true
          }
        })
        if (item.children && item.children.length > 0) {
          this.mergeTreeButton(item.children, buttons)
        }
      })
      return tree
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.getMenuTreeselect()
      this.open = true
      this.title = '添加角色'
    }
  }

}
</script>

<style scoped>

</style>
