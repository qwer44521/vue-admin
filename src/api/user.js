import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/info',
    method: 'get'
    // params: { token }
  })
}

// 获取角色路由菜单  2020-10-18  zjj添加
export function getAuthMenu() {
  return request({
    url: '/api/authmenu',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
