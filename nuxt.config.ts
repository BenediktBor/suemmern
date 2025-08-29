// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	css: ['./app/assets/main.css'],

	nitro: { preset: 'github-pages' },

	modules: [
		'@nuxtjs/seo',
		'@nuxt/scripts',
		'@nuxt/ui',
		'@nuxt/content',
		'@nuxtjs/mdc',
		'@nuxt/image',
	],

	app: {
		baseURL: process.env.NUXT_APP_BASE_URL ?? '/',
		head: {
			title: 'Sportfreunde Sümmern e.V.',
			htmlAttrs: {
				lang: 'de',
			},
		},
	},

	image: {},
	content: {
		experimental: {
			// sqliteConnector: 'native',
		},
	},
})
