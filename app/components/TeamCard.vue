<script setup lang="ts">
defineProps<{
	name: string
	league?: string
	image?: string
	path: string
	category?: string
}>()
</script>

<template>
	<UPageCard :header="name" orientation="vertical" :to="path" spotlight>
		<template #title>
			<div class="flex items-center gap-2">
				<UBadge :label="category" variant="subtle" size="lg" />
				<h3 v-if="league" class="text-primary font-semibold">
					{{ league }}
				</h3>
			</div>

			<h2 class="text-3xl font-bold mb-2 wrap-anywhere">
				{{ name }}
			</h2>
		</template>
		<NuxtImg
			:src="image"
			:alt="`Mannschaftsbild der ${name}`"
			class="w-96 rounded-lg"
			fit="cover"
			:width="512"
			:height="288"
			:placeholder="[512, 288, 25, 5]"
		/>
	</UPageCard>
</template>
