<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
    </el-table>
  </div>
</template>

<script>
import { getMenuList } from '@/api/menu_list'

export default {
  name: 'MenusList',
  data() {
    return {
      // 菜单表格数据
      menuList: []
    }
  },
  created() {
    this.getMenu()
  },
  methods: {
    getMenu() {
      getMenuList().then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

</style>
