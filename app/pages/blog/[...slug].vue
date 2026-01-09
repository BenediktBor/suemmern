<script setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('blog').path(route.path).first()
})

const headerImage = computed(() => page.value.images?.[0])
</script>

<template>
	<UPage class="max-w-4xl mx-auto">
		<UPageHeader
			:title="page.title"
			:headline="page.headline"
			:links="page.links"
		>
			<template #default>
				<!-- <UBreadcrumb
						v-if="breadcrumbs.length > 1"
						class="my-2"
						:items="breadcrumbs"
					/> -->
				<div class="my-2 flex gap-2 items-center">
					<NuxtLink
						v-if="page.category"
						:to="`/blog?category=${page.category}`"
					>
						<UBadge :label="page.category" variant="subtle" />
					</NuxtLink>
					<NuxtLink
						v-if="page.team"
						:to="`/teams/${page.team.toLowerCase().replace(' ', '-')}`"
					>
						<UBadge :label="page.team" variant="subtle" />
					</NuxtLink>

					<time>{{ page.date }}</time>
				</div>

				<p
					v-if="page.description"
					class="text-lg text-pretty text-muted mt-4"
				>
					{{ page.description }}
				</p>
			</template>
		</UPageHeader>

		<UPageBody v-if="page">
			<UCarousel
				v-if="page.images"
				v-slot="{ item }"
				:dots="page.images.length > 1"
				:arrows="page.images.length > 1"
				:items="page.images"
				class="my-2 w-full max-w-2xl mx-auto"
				:ui="{ item: 'grid place-items-center' }"
			>
				<NuxtImg :src="item.src" :alt="item.alt" class="rounded-lg" />
			</UCarousel>

			<ContentRenderer class="pt-4" :value="page" />
		</UPageBody>
		<ErrorPage v-else />
	</UPage>
</template>
