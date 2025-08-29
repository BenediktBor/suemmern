<script setup lang="ts">
interface Card {
	title: string
	description?: string
	icon?: string
	to?: string
}

defineProps<{
	features: Card[]
}>()
</script>

<template>
	<UPageGrid
		v-if="features"
		class="pt-8 grid-cols-1"
		:class="{
			'sm:grid-cols-2 lg:grid-cols-2': features.length === 2,
			'sm:grid-cols-3 lg:grid-cols-3': features.length === 3,
			'sm:grid-cols-2 lg:grid-cols-4': features.length > 4,
		}"
	>
		<UPageCard
			v-for="(card, index) in features"
			:key="index"
			v-bind="card"
			:spotlight="!!card.to"
			:variant="!!card.to ? 'outline' : 'soft'"
		/>
	</UPageGrid>
</template>
