import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/api/allroles',
    method: 'get'
  })
}
export function addRoles(data) {
  return request({
    url: '/api/addroles',
    method: 'post',
    data
  })
}
export function updateRoles(id, data) {
  return request({
    url: '/api/updateRoles',
    method: 'post',
    data
  })
}
