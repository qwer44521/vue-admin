<template>
  <div class="app-container">
    <div class="table">
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
      adminList: []
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
        console.log(response.data)
      })
    }
  }

}
</script>

<style scoped>

</style>
