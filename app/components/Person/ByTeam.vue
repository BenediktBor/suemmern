<script setup lang="ts">
const props = defineProps<{
	badge?: string
	team: string
	section?: {
		title: string
		headline?: string
		description?: string
		links?: Object[]
	}
}>()
const route = useRoute()

const { data: persons, refresh } = useAsyncData(
	`${route.path}.personsByTeam.${props.section?.title ?? useId()}`,
	async () => {
		return await queryCollection('persons')
			.where('teams', 'LIKE', `%"${props.team}"%`)
			.all()
	}
)

watch(
	() => [props.team],
	() => refresh()
)
</script>

<template>
	<UPageSection
		v-if="persons && persons.length > 0"
		:title="section?.title"
		:headline="section?.headline"
		:description="section?.description"
		:links="section?.links"
	>
		<UPageGrid class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			<PersonCoach
				v-for="(person, index) in persons"
				:key="person.id"
				:name="person.name"
				:position="person?.position"
				:image="person.image"
				:badge="props.badge !== undefined ? props.badge : person.badge"
				:phone="person.phone"
				:mail="person.mail"
				:since="person.since"
			/>
		</UPageGrid>
	</UPageSection>
</template>
