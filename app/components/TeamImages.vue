<script setup lang="ts">
const props = defineProps<{
	title?: string
	description?: string
	headline?: string
	links?: Object[]
	category?: string
}>()

const { data: teams, refresh } = useAsyncData(
	'teamImagesAutoScroller',
	async () => {
		const queryBuilder = queryCollection('teams')

		if (props.category) queryBuilder.where('category', '=', props.category)

		return await queryBuilder.select('image', 'id', 'path', 'name').all()
	}
)

watch(
	() => [props.category],
	() => refresh()
)
</script>

<template>
	<UPageSection
		:title="props.title"
		:headline="props.headline"
		:description="props.description"
		:links="props.links"
	>
		<UMarquee pause-on-hover :ui="{ root: `[--duration:120s]` }">
			<NuxtLink v-for="team in teams" :key="team.id" :to="team.path">
				<h1 class="text-center text-xl font-bold text-pretty mb-2">
					{{ team.name }}
				</h1>
				<NuxtImg 
					class="h-48 rounded-lg" 
					:src="team.image" 
					:alt="`Mannschaftsfoto ${team.name} - Sportfreunde Sümmern`" 
				/>
			</NuxtLink>
		</UMarquee>
	</UPageSection>
</template>
