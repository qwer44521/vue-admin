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
