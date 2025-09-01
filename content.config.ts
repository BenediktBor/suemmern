import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const sectionLink = z.object({
	label: z.string(),
	icon: z.string().optional(),
	trailingIcon: z.string().optional(),
	variant: z.string().optional(),
	to: z.string(),
	color: z.string().optional(),
})

const card = z.object({
	title: z.string(),
	description: z.string(),
	icon: z.string(),
	to: z.string().optional(),
})

const headline = {
	title: z.string(),
	headline: z.string(),
	description: z.string(),
}

export default defineContentConfig({
	collections: {
		index: defineCollection({
			type: 'page',
			source: 'index.md',
			schema: z.object({}),
		}),
		pages: defineCollection({
			type: 'page',
			source: {
				include: '**/*.md',
				exclude: ['index.md', 'blog/**/*.md', 'teams/**/*.md'],
			},
			schema: z.object({
				...headline,
				head: z
					.object({
						description: z.string().optional(),
					})
					.optional(),
				image: z
					.object({
						src: z.string(),
						alt: z.string(),
						width: z.number().optional(),
						height: z.number().optional(),
					})
					.optional(),
				features: z.array(card).optional(),
				links: z.array(
					z.object({
						label: z.string().optional(),
						icon: z.string().optional(),
						to: z.string(),
						target: z.literal('_blank').optional(),
					})
				),
				icon: z.string().optional(),
				order: z.number().optional(),
				toc: z.boolean().optional(),
				cta: sectionLink.optional(),
			}),
		}),
		blog: defineCollection({
			type: 'page',
			source: 'blog/**/*.md',
			schema: z.object({
				date: z.string(),
				images: z
					.array(
						z.object({
							src: z.string(),
							alt: z.string(),
							title: z.string().optional(),
							width: z.number().optional(),
							height: z.number().optional(),
						})
					)
					.optional(),
				category: z.string().optional(),
				team: z.string().optional(),
			}),
		}),
		persons: defineCollection({
			type: 'data',
			source: 'persons/*.yml',
			schema: z.object({
				position: z.string().optional(),
				badge: z.string().optional(),
				name: z.string(),
				image: z.string().optional(),
				teams: z.array(z.string()).optional(),
				phone: z.string().optional(),
				mail: z.string().optional(),
				since: z.string().optional(),
			}),
		}),
		teams: defineCollection({
			type: 'page',
			source: {
				include: 'teams/**/*.md',
				exclude: ['teams/index.yml'],
			},
			schema: z.object({
				name: z.string(),
				order: z.number(),
				category: z.string(),
				image: z.string().optional(),
				league: z.string().optional(),
				contactPersonsTitle: z.string().optional(),
				practice: z
					.array(
						z.object({
							day: z.string(),
							time: z.string(),
						})
					)
					.optional(),
				coaches: z.array(z.string()).optional(),
			}),
		}),
		teamsIndex: defineCollection({
			type: 'data',
			source: 'teams.yml',
			schema: z.object({
				...headline,
			}),
		}),
	},
})
