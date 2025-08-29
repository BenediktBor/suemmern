// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	css: ['./app/assets/main.css'],

	modules: [
		'@nuxt/image',
		'@nuxt/scripts',
		'@nuxt/ui',
		'@nuxt/content',
		'@nuxtjs/mdc',
	],

	app: {
		head: {
			title: 'Sportfreunde Sümmern e.V.',
			htmlAttrs: {
				lang: 'de',
			},
		},
	},

	content: {
		experimental: {
			sqliteConnector: 'native',
		},
	},
})
