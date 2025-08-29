export default defineNuxtRouteMiddleware((to, from) => {
	if (to.path === '/verein/' || to.path === '/verein') {
		return navigateTo('/')
	}
})
