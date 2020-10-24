import request from '@/utils/request'

export function getMenuList() {
  return request(
    {
      url: '/api/menus',
      method: 'get'
    }
  )
}
