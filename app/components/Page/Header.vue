<script setup lang="ts">
const props = defineProps<{
	title: string
	headline?: string
	description?: string
}>()
</script>

<template>
	<UPageHeader
		class="mt-12"
		:title="props.title"
		:headline="props.headline"
		:description="props.description"
		:ui="{ root: 'border-0' }"
	/>
</template>
