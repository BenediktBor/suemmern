// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	css: ['./app/assets/main.css'],

	nitro: { preset: 'github-pages' },

	modules: [
		'@nuxt/image',
		'@nuxt/scripts',
		'@nuxt/ui',
		'@nuxt/content',
		'@nuxtjs/mdc',
	],

	app: {
		baseURL: '/suemmern/',
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
