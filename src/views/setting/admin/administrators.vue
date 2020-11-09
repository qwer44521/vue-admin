<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAdd">添加角色</el-button>
    <div class="table">
      <!--       表格主题-->
      <el-table
        :data="adminList"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="180"
        />
        <el-table-column
          prop="username"
          label="用户名"
        />
        <el-table-column
          prop="nickname"
          label="昵称"
        />
        <el-table-column
          prop="r_name"
          label="角色"
        />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status ? 'success' : 'danger'"
              disable-transitions
            >{{ scope.row.status | filterStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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
      <!--      表格结束-->
      <!--      弹出层新增或者修改-->
      <el-dialog :title="title" :visible.sync="open" width="750px">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入用户名" show-password />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :key="1" :label="1">启用</el-radio>
              <el-radio :key="0" :label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所属角色" prop="roles">
            <template>
              <el-select v-model="form.roles_id" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.r_name"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button>取 消</el-button>
        </div>
      </el-dialog>
      <!--      新增或修改结束-->
    </div>
  </div>
</template>

<script>
import { getAdminList, getAdminRoles, updateadmin, addAdministrators } from '@/api/administrators'
export default {
  name: 'Administrators',
  filters: {
    filterStatus: function(value) {
      switch (value) {
        case 0:
          return '禁用'
        case 1:
          return '正常'
        default:
          return '-- --'
      }
    }
  },
  data() {
    return {
      // 管理员列表
      adminList: [],
      // 表单数据
      form: {},
      // 弹出层标题
      title: '',
      // 弹出层初始化
      open: false,
      // 图片信息
      fileList: [],
      // 单选框
      options: [
      ],
      roles_id: []
    }
  },
  created() {
    this.getAdmin()
  },
  methods: {
    // 获取管理员列表
    getAdmin() {
      getAdminList().then(response => {
        this.adminList = response.data
        // console.log(response.data)
      })
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.getRolesSelect()
      this.open = true
      this.title = '添加角色'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      this.getRolesSelect()
      this.defaultKeys = row.roles_id || []
      // this.$nextTick(() => {
      //   this.getMenuTreeselect(row.buttons, this.defaultKeys)
      // })
      this.form = {
        id: row.id,
        nickname: row.nickname,
        username: row.username,
        password: undefined,
        status: row.status,
        roles_id: row.roles_id,
        remark: row.remark
      }
      // this.buttons = row.buttons
      this.open = true
      this.title = '修改角色'
    },
    /** 查询角色下拉菜单 */
    getRolesSelect() {
      getAdminRoles().then(reponse => {
        console.log(reponse.data)
        this.options = reponse.data
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            // this.form.idm = this.getMenuAllCheckedKeys()
            updateadmin(this.form.id, this.form).then(response => {
              console.log(response)
              this.open = false
              this.getAdmin()
            })
          } else {
            addAdministrators(this.form).then(response => {
              console.log(response)
              this.open = false
              this.getAdmin()
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
        nickname: undefined,
        username: undefined,
        password: undefined,
        status: 1,
        roles_id: [],
        remark: undefined
      }
      this.buttons = []
      this.resetForm('form')
    }

  }

}
</script>

<style scoped>

</style>
