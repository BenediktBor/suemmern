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
		:image="
			{
				src: props.image ?? '/logo.png',
				width: 512,
				height: 288,
				alt: props.title,
				fit: 'cover',
				placeholder: [512, 288, 25, 5],
				loading: 'lazy',
			} as any
		"
		:to="props.to"
		:description="excerpt"
		:badge="props.badge"
		variant="subtle"
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
