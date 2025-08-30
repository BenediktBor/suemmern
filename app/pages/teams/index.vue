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
				<UPageCard
					v-for="team in teams"
					:header="team.name"
					orientation="vertical"
					:to="team.path"
					spotlight
				>
					<template #title>
						<div class="flex items-center gap-2">
							<UBadge
								:label="team.category"
								variant="subtle"
								size="lg"
							/>
							<h3
								v-if="team.league"
								class="text-primary font-semibold"
							>
								{{ team.league }}
							</h3>
						</div>

						<h2 class="text-3xl font-bold mb-2 wrap-anywhere">
							{{ team.name }}
						</h2>
					</template>
					<NuxtPicture
						:src="team.image"
						:alt="`Mannschaftsbild der ${team.name}`"
						format="avif,webp"
						class="w-96 rounded-lg"
						:width="512"
						:height="288"
						:placeholder="[512, 288, 25, 5]"
					/>
				</UPageCard>
			</UPageGrid>
		</UPageBody>
	</UPage>
</template>
