<script setup lang="ts">
const props = defineProps<{
	names: { name: string; as?: string; badge?: string }[]
	section?: {
		title: string
		headline?: string
		description?: string
		links?: Object[]
	}
}>()
const route = useRoute()

const { data: persons } = useAsyncData(
	`${route.path}.personsByNames.${props.section?.title ?? useId()}`,
	async () => {
		const persons = await queryCollection('persons')
			.orWhere((query) =>
				props.names.reduce(
					(query, { name }) => query.where('name', '=', name),
					query
				)
			)
			.all()

		const sortedPersons = []
		for (let i = 0; i < props.names.length; i++) {
			const person = persons.find(
				({ name }) => name === props.names[i]?.name
			)

			if (person) sortedPersons.push(person)
		}

		return sortedPersons
	}
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
				:position="props.names[index]?.as ?? person?.position"
				:image="person.image"
				:badge="
					props.names[index]?.badge !== undefined
						? props.names[index]?.badge
						: person?.badge
				"
				:phone="person.phone"
				:mail="person.mail"
			/>
		</UPageGrid>
	</UPageSection>
</template>
