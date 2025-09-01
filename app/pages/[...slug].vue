<script setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, async () => {
	return queryCollection('pages').path(`${route.path}`).first()
})

const seoTitle = computed(
	() =>
		`${page.value?.head?.title ?? page.value?.title} - Sportfreunde Sümmern e.V.`
)
const seoDescription = computed(
	() => page.value?.head?.description ?? page.value?.description
)
useSeoMeta({
	title: seoTitle,
	ogTitle: seoTitle,
	description: seoDescription,
	ogDescription: seoDescription,
})

const breadcrumbs = computed(() => {
	const pathSegments = route.path.split('/').filter((e) => e !== '')
	let tmp = []
	let path = '/'

	for (let i = 0; i < pathSegments.length; i++) {
		path += pathSegments[i] + '/'

		tmp.push({
			label: pathSegments[i].toUpperCase().replace('-', ' '),
			to: path,
		})
	}

	return tmp
})
</script>

<template>
	<UPage>
		<div
			v-if="page"
			class="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3 lg:grid-rows-1 gap-y-8 lg:gap-x-8 pb-4 border-b border-default"
		>
			<div v-if="page.image" class="mt-8 grid">
				<div class="w-full place-self-center">
					<NuxtImg
						:src="page.image.src"
						:alt="page.image.alt"
						fit="cover"
						:width="page.image.width ?? 512"
						:height="page.image.height ?? 288"
						:placeholder="[
							page.image.width ?? 512,
							page.image.height ?? 288,
							25,
							5,
						]"
						class="w-full object-cover rounded-lg shadow-2xl"
					/>

					<UButton
						v-if="page.cta"
						class="mt-8"
						size="xl"
						block
						:icon="page.cta.icon"
						:trailingIcon="page.cta.trailingIcon"
						:label="page.cta.label"
						:to="page.cta.to"
						variant="subtle"
					/>
				</div>
			</div>

			<UPageHeader
				:class="{
					'border-none': true,
					'col-span-2': !!page.image,
					'col-span-3': !page.image,
				}"
				:title="page.title"
				:headline="page.headline"
				:links="page.links"
				:ui="{ container: 'flex flex-col h-full' }"
			>
				<template #default>
					<UBreadcrumb
						v-if="breadcrumbs.length > 1"
						class="my-2"
						:items="breadcrumbs"
					/>

					<p
						v-if="page.description"
						class="text-lg text-pretty text-muted mt-4"
					>
						{{ page.description }}
					</p>

					<span v-if="page.features" class="grow-1 shrink-1" />
					<UPageGrid
						v-if="page.features"
						class="pt-4 grid-cols-1"
						:class="{
							'sm:grid-cols-2 lg:grid-cols-2':
								page.features.length === 2,
							'sm:grid-cols-3 lg:grid-cols-3':
								page.features.length > 2,
						}"
					>
						<UPageCard
							v-for="(card, index) in page.features"
							:key="index"
							v-bind="card"
							:spotlight="!!card.to"
							:variant="!!card.to ? 'outline' : 'soft'"
						/>
					</UPageGrid>
				</template>
			</UPageHeader>
		</div>

		<UPageBody>
			<ContentRenderer v-if="page" :value="page" />
			<ErrorPage v-else />
		</UPageBody>

		<template v-if="page?.toc && page?.body?.toc?.links?.length" #right>
			<UContentToc :title="page.title" :links="page.body.toc.links" />
		</template>
	</UPage>
</template>
