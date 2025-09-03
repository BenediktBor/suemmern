// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	css: ['./app/assets/main.css'],

	nitro: {
		preset: 'github-pages',
		prerender: {
			crawlLinks: true,
			routes: ['/jugend/trainer-werden/', '/jugend/kinderschutz/'],
		},
	},

	modules: [
		'@nuxtjs/seo',
		'@nuxt/scripts',
		'@nuxt/ui',
		'@nuxt/content',
		'@nuxtjs/mdc',
		'@nuxt/image',
		'@nuxtjs/i18n',
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
	i18n: {
		defaultLocale: 'de',
		locales: [
			{
				code: 'de',
			},
		],
	},
	site: {
		url: 'https://benediktbor.github.io/suemmern/',
		name: 'Sportfreunde Sümmern e.V.',
	},
	seo: {
		canonicalLowercase: false,
		canonicalQueryWhitelist: ['team', 'category'],
	},

	image: {
		densities: [1, 2],
		quality: 80,
		format: ['avif', 'webp'],
	},

	content: {
		experimental: {
			// sqliteConnector: 'native',
		},
	},
})
