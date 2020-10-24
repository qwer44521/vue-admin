import { asyncRoutes, constantRoutes } from '@/router'
import { getAuthMenu } from '@/api/user'
import Layout from '@/layout'
/**
 * 这里是设置后台动态路由，处理数据格式    2020.10.24，
 * @param routes
 * @returns {[]}
 */
export function filterAsyncRoutes(routes) {
  const res = []
  routes.forEach(route => {
    const component = route.component
    const tmp = {
      path: route.path,
      // component: route.component === 'layout' ? Layout : () => import([`@/views${component}`]),
      component: route.component === 'layout' ? Layout : (resolve) => require([`@/views${component}`], resolve), // 解决因为版本问题无法加载动态路由的问题 zjj 2020-10-24
      redirect: route.redirect || undefined,
      name: route.name,
      meta: {},
      children: route.children || undefined
    }
    tmp.meta.title = route.title
    if (route.hidden === 1) {
      tmp.hidden = false
    } else {
      tmp.hidden = true
    }
    if (route.ico) {
      tmp.meta.icon = route.ico
    }
    if (tmp.children) {
      if (tmp.children.length) {
        tmp.alwaysShow = true
      }
      tmp.children = filterAsyncRoutes(tmp.children)
    }
    res.push(tmp)
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
/**
 * 动态路由挂载，处理数据
 * @type {{generateRoutes({commit?: *}): Promise<unknown>}}
 */
const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      getAuthMenu().then(response => {
        const { data } = response
        const accessedRoutes = filterAsyncRoutes(data).concat(asyncRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
