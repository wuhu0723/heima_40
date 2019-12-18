// 这个文件主要用于处理与新闻相关的业务
// 1.引入axios
import axios from '@/utils/myaxios.js'

// 2. 获取指定栏目的所有新闻数据
export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 3.根据文章id获取文章的详情
export const getArticleDetail = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 4. 文章点赞和取消点赞
export const likeArticleById = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 4. 文章收藏和取消收藏
export const collectArticleById = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}
