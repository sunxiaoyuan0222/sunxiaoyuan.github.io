import request from '@/utils/request.js'

// 获取表单分组
export function login(userId) {
  return request({
    url: `sys/auth/login/ignore/${userId}`,
    method: 'get'
  })
}
