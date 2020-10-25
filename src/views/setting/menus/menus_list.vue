<template>
  <div class="app-container">
    <el-button type="primary" plain>添加菜单</el-button>
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
      <!--      菜单列表结束-->
    </div>
    <!--侧边弹窗-->
    <div class="box">
      <el-drawer
        ref="drawer"
        title="我嵌套了 Form !"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="ltr"
        custom-class="demo-drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="活动名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" :loading="loading" @click="$refs.drawer.closeDrawer()">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
    <!--侧边弹窗-->
  </div>
</template>

<script>
import { getMenuList } from '@/api/menu_list'

export default {
  name: 'MenusList',
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
      // 表单数据
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      timer: null
    }
  },
  created() {
    this.getMenu()
  },
  methods: {
    getMenu() {
      getMenuList().then(response => {
        this.menusList = response.data
      })
    },
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
        })
        .catch(_ => {})
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    }
  }
}
</script>

<style scoped>

</style>
