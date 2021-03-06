import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'

import Tree from '@/components/Content/tree'
import List from '@/components/Content/list'
import My from '@/components/Content/my'

import TreeForm from '@/components/Content/tree-form'

import Details from '@/components/Content/details'

import Welcome from '@/components/User/welcome'
import Login from '@/components/User/Login/login'
import Reg from '@/components/User/Login/reg'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '',
      component: HomePage,
      meta: {
        title: '族谱'
      },
      children: [
        {
          path: '/',
          component: Tree,
          meta: {
            title: '族谱',
            LoginRequire: true
          }
        }, {
          path: '/tree',
          component: Tree,
          name: 'tree',
          meta: {
            title: '族谱',
            LoginRequire: true
          }
        }, {
          path: '/list',
          component: List,
          name: 'list',
          meta: {
            title: '成员列表',
            LoginRequire: true
          }
        }, {
          path: '/my',
          component: My,
          name: 'my',
          meta: {
            title: '个人中心',
            LoginRequire: true
          }
        }
      ]
    }, {
      path: '/login',
      component: Login,
      name: 'login',
      meta: {
        title: '登陆',
        LoginRequire: false
      }
    }, {
      path: '/reg',
      component: Reg,
      name: 'reg',
      meta: {
        title: '注册',
        LoginRequire: false
      }
    }, {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      meta: {
        title: '欢迎',
        LoginRequire: false
      }
    }, {
      path: '/details/:id(\\d+)',
      component: Details,
      meta: {
        title: '详情',
        LoginRequire: true
      }
    }, {
      path: '/tree-form/:id(\\d+)',
      component: TreeForm,
      meta: {
        title: '编辑',
        LoginRequire: true
      }
    }
  ]
})
