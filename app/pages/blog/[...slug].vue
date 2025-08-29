<script setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('blog').path(route.path).first()
})

const headerImage = computed(() => page.value.images?.[0])
</script>

<template>
	<UPage>
		<div
			v-if="page"
			class="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3 lg:grid-rows-1 gap-y-8 lg:gap-x-8"
		>
			<div v-if="headerImage" class="grid">
				<NuxtImg
					:src="headerImage.src"
					:alt="headerImage.alt"
					class="place-self-center mt-4 w-full object-cover rounded-lg shadow-2xl"
				/>
			</div>

			<UPageHeader
				:class="{
					'col-span-2': !!headerImage,
					'col-span-3': !headerImage,
				}"
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
		</div>

		<UPageBody v-if="page">
			<ContentRenderer :value="page" />
			<ImageGallery
				v-if="page.images && page.images.length > 1"
				:images="page.images"
			/>
		</UPageBody>
		<ErrorPage v-else />
	</UPage>
</template>
