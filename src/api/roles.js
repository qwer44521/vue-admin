import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/api/allroles',
    method: 'get'
  })
}
