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
          <el-form-item label="上传头像" prop="avatar">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="所属角色" prop="roles">
            <template>
              <el-radio-group v-model="radio">
                <el-radio :label="3">备选项</el-radio>
                <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
              </el-radio-group>
            </template>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--      新增或修改结束-->
    </div>
  </div>
</template>

<script>
import { getAdminList } from '@/api/administrators'

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
      radio: 3
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
      this.open = true
      this.title = '添加角色'
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }

}
</script>

<style scoped>

</style>
