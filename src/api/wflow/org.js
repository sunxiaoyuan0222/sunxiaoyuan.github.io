import request from '@/utils/request.js'


// 查询组织架构树
export function getOrgTree(param) {
  return request({
    url: 'wflow/org/tree',
    method: 'get',
    params: param
  })
}

// 查询系统角色
export function getRole() {
  return request({
    url: 'wflow/org/role',
    method: 'get'
  })
}

// 搜索人员
export function getUserByName(param) {
  return request({
    url: 'wflow/org/tree/user/search',
    method: 'get',
    params: param
  })
}

// 搜索人员
export function getUserDepts(userId) {
  return request({
    url: `wflow/org/user/${userId}/dept`,
    method: 'get'
  })
}

// 获取审批代理人
export function getUserAgent() {
  return request({
    url: `wflow/org/user/agent`,
    method: 'get'
  })
}

// 获取审批代理人
export function setUserAgent(params) {
  return request({
    url: `wflow/org/user/agent`,
    method: 'put',
    data: params
  })
}

// 获取审批代理人
export function cancelUserAgent() {
  return request({
    url: `wflow/org/user/agent`,
    method: 'delete'
  })
}

export default {
  getOrgTree, getUserByName, getRole,
  getUserDepts, getUserAgent, setUserAgent, cancelUserAgent
}
