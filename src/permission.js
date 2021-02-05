import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getSymbol } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getResourcesDetail } from '@/api/resources'

// function existRouter(target, sources){
// 	var exists = false
// 	sources.map(item => {
// 		console.log(item.name);

// 		if(item.name == target.name){
// 			exists = true
// 		}else if(item.children){
// 			exists = exists || existRouter(target, item.children)
// 		}
// 	})
// 	return exists
// }

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
	// start progress bar
	NProgress.start()

	// set page title
	document.title = getPageTitle(to.meta.title)

	//判断是否登录前台
	// const isUser = getSymbol('home') && JSON.stringify(store.state.user.userInfo) != '{}'
	// if(!getSymbol('home_user_no'))

	//判断是否登录后台
	// const isAdmin = getSymbol('admin') && JSON.stringify(store.state.admin.userInfo) != '{}'
	// const isAdmin = true

	//登录前台
	if(to.path == '/'){
		//cookie中有登录标识
		if(to.query.user && to.query.password){
			//通过连接中的用户名和密码登录
			await store.dispatch('user/login', {
				user_no: to.query.user,
				password: to.query.password
			})
			return next()
		}
		if(getSymbol('home_user_no')){
			//store中用户数据丢失，重新调用登录
			if(JSON.stringify(store.state.user.userInfo) == '{}'){
				await store.dispatch('user/login', {
					user_no: getSymbol('home_user_no'),
					password: getSymbol('home_psd')
				})
      }
      console.log('111')
			next()
		}else{
			/* has no token*/
			if (whiteList.indexOf(to.path) !== -1) {
				// in the free login whitelist, go directly
				next()
			} else {
				// other pages that do not have permission to access are redirected to the login page.
				var redirectUrl = `/login?redirect=${to.path}`
				for (const key in to.query) {
					redirectUrl += `&${key}`
					redirectUrl += `=${to.query[key]}`
        }
        console.log('222')

				next(redirectUrl)
				NProgress.done()
			}
		}
	//登录后台
	}else if(to.path.startsWith('/admin')){
		//cookie中有登录标识
		if(getSymbol('admin_user_no')){
			//store中用户数据丢失，重新调用登录
			if(JSON.stringify(store.state.admin.userInfo) == '{}'){
				await store.dispatch('admin/login', {
					user_no: getSymbol('admin_user_no'),
					theme_id: getSymbol('admin_theme_id')
				})
				const accessedRoutes = await store.dispatch("permission/generateRoutes", store.state.admin.roles)
				//动态挂载路由
				router.addRoutes(accessedRoutes)
			}
			next()
		}else{
			/* has no token*/
			if (whiteList.indexOf(to.path) !== -1) {
				// in the free login whitelist, go directly
				next()
			} else {
				// other pages that do not have permission to access are redirected to the login page.
        var redirectUrl = `/login?redirect=${to.path}`
        console.log(333)
				next(redirectUrl)
        NProgress.done()
			}
		}
	}else{
		/* has no token*/
		if (whiteList.indexOf(to.path) !== -1) {
			// in the free login whitelist, go directly
			next()
		} else {
			// other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      console.log('444')

			NProgress.done()
		}
	}


})

router.afterEach(() => {
	// finish progress bar
	NProgress.done()
})
