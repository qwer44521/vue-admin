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
// 上传头像
export function avatarUpload(data) {
  return request(
    {
      url: '/api/avatarupload',
      method: 'post',
      data
    }
  )
}
