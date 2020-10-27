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
// 根据id获取单个菜单数据
export function getMenu(id) {
  return request(
    {
      url: '/api/getmenu?id=' + id,
      method: 'get'
    }
  )
}
// 修改菜单
export function updateMenu(id, data) {
  return request(
    {
      url: '/api/updatemenu?id=' + id,
      method: 'post',
      data
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
// 获取后台菜单结构
export function menuSelect() {
  return request(
    {
      url: '/api/menuselect',
      method: 'get'
    }
  )
}
