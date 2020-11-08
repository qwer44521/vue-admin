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
            v-if="scope.row.id !== 1"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            v-if="scope.row.id !== 1"
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
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名称" prop="r_name">
          <el-input v-model="form.r_name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="英文标识" prop="roles">
          <el-input v-model="form.roles" placeholder="请输入英文标识" />
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
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRoles, addRoles, updateRoles } from '@/api/roles'
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
      // 表单规则验证
      rules: {
        r_name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        roles: [
          { required: true, message: '英文标识不能为空', trigger: 'blur' }
        ]
      },
      // 节点数据
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      // 是否显示弹出层
      open: false,
      // tree关联状态
      checkStrictly: false,
      // 权限管理的菜单项
      menuOptions: [],
      idm: []
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
      // var that = this
      this.checkStrictly = true
      menuSelect().then(response => {
        // 处理菜单选项的id
        // that.idm.push(response.data.id)
        // // response.data.children.foreach(function(item, index) {
        // //   that.idm.push(item.id)
        // // })
        // console.log(response.data)
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
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      const checkedKeys = this.$refs.menu.getHalfCheckedKeys()
      // 半选中的菜单节点
      const halfCheckedKeys = this.$refs.menu.getCheckedKeys()
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
      return checkedKeys
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.getMenuTreeselect()
      this.open = true
      this.title = '添加角色'
    },
    checkBtn(node) {
      if (this.buttons.length > 0) {
        const has = this.buttons.filter((item, key) => {
          if (item.menu_id === node.data.menu_id) {
            this.buttons[key].btns = node.data.buttons
            return true
          }
        })
        if (has.length === 0) {
          this.buttons.push({ 'menu_id': node.data.menu_id })
        }
      } else {
        this.buttons.push({ 'menu_id': node.data.menu_id })
      }
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      this.defaultKeys = row.idm || []
      this.$nextTick(() => {
        this.getMenuTreeselect(row.buttons, this.defaultKeys)
      })
      this.form = {
        id: row.id,
        roles: row.roles,
        r_name: row.r_name,
        status: row.status,
        idm: row.idm,
        buttons: row.buttons,
        remark: row.remark
      }
      this.buttons = row.buttons
      this.open = true
      this.title = '修改角色'
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            this.form.idm = this.getMenuAllCheckedKeys()
            updateRoles(this.form.id, this.form).then(response => {
              this.open = false
              this.getList()
            })
          } else {
            this.form.idm = this.getMenuAllCheckedKeys()
            console.log(this.form)
            addRoles(this.form).then(response => {
              console.log(response)
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    // 表单重置
    reset() {
      // if (this.$refs.menu !== undefined) {
      //   this.$refs.menu.setCheckedKeys([])
      // }
      this.form = {
        id: undefined,
        r_name: undefined,
        status: 0,
        idm: [],
        remark: undefined
      }
      this.buttons = []
      this.resetForm('form')
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    }
  }

}
</script>

<style scoped>

</style>
