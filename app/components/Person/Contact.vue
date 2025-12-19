<script setup lang="ts">
const props = defineProps<{
	name: string
	as?: string
	badge?: string
	reverse?: boolean
	section?: {
		title: string
		headline?: string
		description?: string
		links?: Object[]
	}
}>()
const route = useRoute()

const { data: contact, refresh } = useAsyncData(
	`${route.path}.contactPersonByName.${useId()}`,
	async () => {
		return await queryCollection('persons')
			.where('name', '=', props.name)
			.first()
	}
)

watch(
	() => [props.name],
	() => refresh()
)
</script>

<template>
	<UPageSection
		v-if="contact"
		:title="section?.title"
		:headline="section?.headline"
		:description="section?.description"
		:links="section?.links"
		orientation="horizontal"
		:reverse="props.reverse"
	>
		<PersonCoach
			:name="contact.name"
			:position="props.as ?? contact.position"
			:image="contact.image"
			:badge="props.badge !== undefined ? props.badge : contact.badge"
			:phone="contact.phone"
			:mail="contact.mail"
		/>
	</UPageSection>
</template>
