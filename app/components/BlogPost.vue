<script setup lang="ts">
const props = defineProps<{
	title: string
	date: string
	image?: string
	path?: string
	description?: string
	to: string
	category?: string
	badge?: {
		color: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
		label: string
	}
}>()

const excerpt = computed(() => {
	return props.description
		? props.description.split('. ').slice(0, 2).join('. ')
		: ''
})
</script>

<template>
	<UBlogPost
		:title="props.title"
		:date="props.date"
		:image="props.image ?? '/logo.png'"
		:to="props.to"
		:description="excerpt"
		:badge="props.badge"
		variant="subtle"
		hydrate-never
	>
		<template #footer>
			<div class="grow-1 w-full" />
			<UButton
				trailing-icon="i-lucide-arrow-right"
				class="grow-0 w-fit"
				label="Weiterlesen"
				size="md"
				color="neutral"
				variant="subtle"
				:to="props.to"
			/>
		</template>
	</UBlogPost>
</template>
