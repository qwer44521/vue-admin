import request from '@/utils/request'

// 获取获取管理员列表
export function getAdminList() {
  return request(
    {
      url: '/api/administrstor',
      method: 'get'
    }
  )
}
// 获取获取管理员列表
export function getAdminRoles() {
  return request(
    {
      url: '/api/adminroles',
      method: 'get'
    }
  )
}
