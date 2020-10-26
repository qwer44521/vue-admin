<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAdd">添加菜单</el-button>
    <!--    <el-form :inline="true">-->
    <!--      <el-form-item>-->
    <!--&lt;!&ndash;        <el-button&ndash;&gt;-->
    <!--&lt;!&ndash;          type="primary"&ndash;&gt;-->
    <!--&lt;!&ndash;          icon="el-icon-plus"&ndash;&gt;-->
    <!--&lt;!&ndash;          size="mini"&ndash;&gt;-->
    <!--&lt;!&ndash;          @click="handleAdd"&ndash;&gt;-->
    <!--&lt;!&ndash;        >新增&ndash;&gt;-->
    <!--&lt;!&ndash;        </el-button>&ndash;&gt;-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->
    <!--    菜单列表主题-->
    <div class="table">
      <el-table :data="menusList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="40" />
        <el-table-column prop="title" label="名称" width="180" />
        <el-table-column prop="name" label="唯一标识" />
        <el-table-column prop="path" label="路径" />
        <el-table-column prop="component" label="组件" />
        <el-table-column prop="redirect" label="跳转路径">
          <template slot-scope="scope">
            {{ scope.row.redirect || '--' }}
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="60px" />
        <el-table-column prop="hidden" label="菜单状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.hidden ? 'danger' : 'success'"
              disable-transitions
            >{{ scope.row.hidden | filterHidden }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!--      表单结束-->
      <!--      添加修改菜单-->
      <el-dialog title="title" :visible.sync="dialogFormVisible" width="600px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="上级菜单">
                <treeselect
                  v-model="form.pid"
                  :options="menuOptions"
                  :normalizer="normalizer"
                  :show-count="true"
                  placeholder="选择上级菜单"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="菜单标题" prop="title">
                <el-input v-model="form.title" placeholder="请输入菜单标题" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示排序" prop="sort">
                <el-input-number v-model="form.sort" controls-position="right" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="菜单图标">
                <el-popover
                  placement="bottom-start"
                  width="460"
                  trigger="click"
                  @show="$refs['iconSelect'].reset()"
                >
                  <IconSelect ref="iconSelect" @selected="selected" />
                  <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                    <svg-icon
                      v-if="form.icon"
                      slot="prefix"
                      :icon-class="form.icon"
                      class="el-input__icon"
                      style="height: 32px;width: 16px;"
                    />
                    <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                  </el-input>
                </el-popover>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="英文标识" prop="menuName">
                <el-input v-model="form.name" placeholder="请输入路由名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="路由地址" prop="path">
                <el-input v-model="form.path" placeholder="请输入路由地址" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组件路径" prop="component">
                <el-input v-model="form.component" placeholder="请输入组件路径" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="跳转路径" prop="redirect">
                <el-input v-model="form.redirect" placeholder="请输入跳转路径" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="菜单状态">
                <el-radio-group v-model="form.hidden">
                  <el-radio :key="0" :label="0">显示</el-radio>
                  <el-radio :key="1" :label="1">隐藏</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getMenuList, menuSelect } from '@/api/menu_list'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import IconSelect from '@/components/IconSelect'
export default {
  name: 'MenusList',
  components: { Treeselect, IconSelect },
  filters: {
    filterHidden: function(value) {
      switch (value) {
        case 0:
          return '显示'
        case 1:
          return '隐藏'
        default:
          return '-- --'
      }
    }
  },
  data() {
    return {
      // 菜单表格数据
      menusList: [],
      // 菜单选项
      menuOptions: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      dialogFormVisible: false,
      // 表单参数
      form: {},
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getMenu()
  },
  methods: {
    selected(name) {
      this.form.icon = name
    },
    getMenu() {
      getMenuList().then(response => {
        this.menusList = response.data
      })
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        pid: 0,
        name: undefined,
        icon: undefined,
        sort: 0,
        hidden: 0,
        redirect: ''
      }
      this.resetForm('form')
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.title,
        children: node.children
      }
    },
    /** 查询菜单下拉树结构 */
    getTreeselect() {
      menuSelect().then(response => {
        this.menuOptions = []
        const menu = { id: 0, title: '主类目', children: [] }
        menu.children = response.data
        this.menuOptions.push(menu)
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset()
      this.getTreeselect()
      if (row != null) {
        this.form.pid = row.id
      }
      this.dialogFormVisible = true
      this.title = '添加菜单'
    }
  }
}
</script>
<style scoped>

</style>
