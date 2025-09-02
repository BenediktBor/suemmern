<script setup lang="ts">
const route = useRoute()

const categoryFilter = computed(() => {
	return route.query.category as string | undefined
})

const seoTitle = 'Teams - Sportfreunde Sümmern e.V.'
const seoDescription =
	'Unsere Teams im Überblick: Die Sportfreunde Sümmern stellen Jugend- und Seniorenmannschaften in allen Altersklassen im Kreis Iserlohn. Jetzt entdecken!'
useSeoMeta({
	title: seoTitle,
	ogTitle: seoTitle,
	description: seoDescription,
	ogDescription: seoDescription,
})

const { data: page } = await useAsyncData(`${route.path}.page`, () => {
	return queryCollection('teamsIndex').first()
})

const { data: teams, refresh: refreshPosts } = await useAsyncData(
	`${route.path}.${categoryFilter.value}.teams`,
	() => {
		const builder = queryCollection('teams')

		if (categoryFilter.value) {
			builder.where('category', '=', categoryFilter.value)
		}

		builder.order('order', 'ASC')

		return builder.all()
	}
)

watch([categoryFilter], () => refreshPosts())
</script>

<template>
	<UPage>
		<UPageHeader
			:title="page?.title"
			:headline="page?.headline"
			:description="page?.description"
		/>

		<UPageBody>
			<div class="flex items-center gap-2 mb-4">
				<USelectMenu
					class="w-64"
					:required="false"
					placeholder="Team auswählen..."
					:searchInput="{
						placeholder: 'Suche...',
					}"
					:items="['Herren', 'Frauen', 'Jugend', 'Sonstige']"
					:modelValue="categoryFilter"
					@update:modelValue="
						(val: string) => navigateTo(`/teams?category=${val}`)
					"
				/>
				<UButton
					v-if="categoryFilter"
					label="Auswahl zurücksetzen"
					icon="i-lucide-x"
					variant="subtle"
					@click="
						() => {
							navigateTo('/teams')
						}
					"
				/>
			</div>

			<UPageGrid>
				<TeamCard
					v-for="team in teams"
					:key="team.id"
					:name="team.name"
					:league="team.league"
					:image="team.image"
					:path="team.path"
					:category="team.category"
				/>
			</UPageGrid>
		</UPageBody>
	</UPage>
</template>
