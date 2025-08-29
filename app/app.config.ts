import { marquee, pageSection } from '#build/ui'

export default defineAppConfig({
	ui: {
		colors: {
			primary: 'green',
			neutral: 'zinc',
		},
		pageGrid: {
			base: 'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8',
		},
		blogPost: {
			slots: {
				footer: 'm-2 min-w-0 flex-1 grow-0 flex',
			},
		},
		pageSection: {
			variants: {
				orientation: {
					vertical: {
						headline: 'justify-start',
						leading: 'justify-start',
						title: 'text-start',
						description: 'text-start',
						links: 'justify-start',
						features: 'sm:grid-cols-2 lg:grid-cols-3 gap-8',
					},
				},
			},
		},
	},
})
