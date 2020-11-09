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
// 获取获取管理员列表
export function addAdministrators(data) {
  return request(
    {
      url: '/api/addAdmin',
      method: 'post',
      data
    }
  )
}
// 修改管理员信息
export function updateadmin(id, data) {
  return request(
    {
      url: '/api/updateadmin',
      method: 'post',
      data
    }
  )
}

// 根据id获取单个管理员信息
export function getadminById(id, data) {
  return request(
    {
      url: '/api/addAdmin',
      method: 'post',
      data
    }
  )
}
// 上传头像  暂时没有用到
export function avatarUpload(data) {
  return request(
    {
      url: '/api/avatarupload',
      method: 'post',
      data
    }
  )
}
