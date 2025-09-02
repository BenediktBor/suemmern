<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui/components/Tabs.vue'

const props = defineProps<{
	title?: string
	description?: string
	headline?: string
	links?: Object[]
}>()

const age = ref(4)

const { data: teams, refresh } = useAsyncData(
	`teamFinder.allTeams`,
	async () => {
		const queryBuilder = queryCollection('teams')

		return await queryBuilder.order('order', 'ASC').all()
	}
)

watch(age, () => refresh())

const eligibleTeams = computed(() => {
	return (
		teams.value?.filter((team) => {
			if (!team.age) return true
			const { min, max } = team.age
			return (!min || age.value >= min) && (!max || age.value <= max)
		}) || []
	)
})

const tabs = ref<TabsItem[]>([
	{
		icon: 'i-lucide-layout-dashboard',
		label: 'Überblick',
		value: 'overview',
	},
	{
		icon: 'i-lucide-calendar',
		label: 'Nach Alter',
		value: 'byAge',
	},
])
const currentTab = ref('overview')
</script>

<template>
	<UPageSection
		:title="props.title"
		:headline="props.headline"
		:description="props.description"
		:links="props.links"
	>
		<UTabs
			v-model="currentTab"
			:items="tabs"
			variant="pill"
			color="primary"
			default-value="overview"
			:content="false"
		/>

		<template v-if="currentTab === 'overview'">
			<slot />
		</template>
		<template v-else-if="currentTab === 'byAge'">
			<UFormField label="Alter">
				<UInputNumber v-model="age" :min="4" :max="99" />
			</UFormField>

			<UPageGrid class="mt-4">
				<TeamCard
					v-for="team in eligibleTeams"
					:key="team.id"
					:name="team.name"
					:image="team.image"
					:league="team.league"
					:category="team.category"
					:path="team.path"
				/>
			</UPageGrid>
		</template>
	</UPageSection>
</template>
