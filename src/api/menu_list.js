import request from '@/utils/request'

// 获取菜单列表
export function getMenuList() {
  return request(
    {
      url: '/api/menus',
      method: 'get'
    }
  )
}

// 新增菜单
export function addMenu(data) {
  return request(
    {
      url: '/api/addmenu',
      method: 'post',
      data
    }
  )
}
