<script setup lang="ts">
const route = useRoute()
const itemsPerPage = 10
const currentPage = ref(1)

const categoryFilter = computed(() => {
	return route.query.category as string | undefined
})
const teamFilter = computed(() => {
	return route.query.team as string | undefined
})

const { data: page } = await useAsyncData(`${route.path}.page`, () => {
	return queryCollection('pages').path(`${route.path}`).first()
})
const { data: teams } = await useAsyncData(`${route.path}.teams`, () => {
	return queryCollection('teams').order('name', 'ASC').all()
})

const { data: totalPosts, refresh: refreshPostCount } = await useAsyncData(
	`${route.path}.${categoryFilter.value}.${teamFilter.value}.totalPosts`,
	() => {
		const builder = queryCollection('blog')
		if (categoryFilter.value) {
			builder.where('category', '=', categoryFilter.value)
		}
		if (teamFilter.value) {
			builder.where('teams', 'LIKE', `%"${teamFilter.value}"%`)
		}

		return builder.count()
	}
)

const totalPages = computed(() =>
	totalPosts.value ? totalPosts.value / itemsPerPage : 0
)

const { data: posts, refresh: refreshPosts } = await useAsyncData(
	`${route.path}.${categoryFilter.value}.${teamFilter.value}.posts`,
	() => {
		const builder = queryCollection('blog')
			.order('date', 'DESC')
			.limit(itemsPerPage)
			.skip(itemsPerPage * (currentPage.value - 1))

		if (categoryFilter.value) {
			builder.where('category', '=', categoryFilter.value)
		}
		if (teamFilter.value) {
			builder.where('team', '=', teamFilter.value)
		}

		return builder.all()
	}
)

async function refresh() {
	await Promise.allSettled([refreshPosts(), refreshPostCount()])
}
watch([currentPage, categoryFilter, teamFilter], () => refresh())

const links = computed(() => {
	if (categoryFilter.value === 'Jugend' && page.value?.links)
		return [
			{
				...page.value?.links?.[0],
				to: 'https://www.instagram.com/sportfreunde_suemmern_jugend/',
			},
			...page.value?.links.slice(1),
		]
	return page.value?.links
})
</script>

<template>
	<UPage>
		<UPageHeader
			:title="page?.title"
			:headline="page?.headline"
			:description="page?.description"
			:links="links"
		/>

		<UPageBody>
			<div class="flex items-center gap-2 mb-4">
				<USelectMenu
					class="w-64"
					:required="false"
					placeholder="Team auswählen..."
					:items="teams?.map((team) => team.name)"
					:modelValue="teamFilter"
					@update:modelValue="
						(val: string) => navigateTo(`/blog?team=${val}`)
					"
				/>
				<UButton
					v-if="teamFilter"
					label="Auswahl zurücksetzen"
					icon="i-lucide-x"
					variant="subtle"
					@click="
						() => {
							navigateTo('/blog')
						}
					"
				/>
			</div>

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

			<UPagination
				class="mt-2"
				v-if="totalPages > 1"
				v-model:page="currentPage"
				:itemsPerPage="itemsPerPage"
				:total="totalPages"
			/>
		</UPageBody>
	</UPage>
</template>
