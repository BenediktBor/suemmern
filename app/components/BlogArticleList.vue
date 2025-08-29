<script setup lang="ts">
const props = defineProps<{
	title?: string
	description?: string
	headline?: string
	links?: Object[]
	team?: string
	category?: string
}>()

const { data: posts, refresh } = useAsyncData(
	`postsForBlogArticleList.${props.category ?? 'all'}.${props.team ?? 'allTeams'}`,
	async () => {
		const queryBuilder = queryCollection('blog')

		if (props.category) queryBuilder.where('category', '=', props.category)
		if (props.team) queryBuilder.where('team', '=', props.team)

		return await queryBuilder.order('date', 'DESC').limit(3).all()
	}
)

watch(
	() => [props.category, props.team],
	() => refresh()
)
</script>

<template>
	<UPageSection
		v-if="posts && posts.length > 0"
		:title="props.title"
		:headline="props.headline"
		:description="props.description"
		:links="props.links"
	>
		<UBlogPosts>
			<BlogPost
				v-for="post in posts"
				:key="post.path"
				:title="post.title"
				:date="post.date"
				:description="post.description"
				:image="post.images?.[0]?.src ?? '/logo.png'"
				:to="post.path"
				:badge="
					post.category
						? {
								color: 'primary',
								label: post.category,
							}
						: undefined
				"
			/>
		</UBlogPosts>
	</UPageSection>
</template>
