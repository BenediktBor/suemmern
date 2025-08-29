<script setup lang="ts">
import { type ButtonProps, type PageFeatureProps } from '@nuxt/ui'

const props = defineProps<{
	title: string
	headline?: string
	description?: string
	image?: { src: string; alt: string }
	list?: PageFeatureProps[]
	links?: ButtonProps[]
}>()
</script>

<template>
	<UPageSection
		class="mt-12"
		:title="props.title"
		:headline="props.headline"
		:orientation="props.image ? 'horizontal' : undefined"
		:ui="{ root: 'border-0' }"
		:links="props.links"
		:features="props.list?.map((f) => ({ ...f, variant: 'outline' }))"
	>
		<template #description>
			<slot name="default">{{ props.description }}</slot>
		</template>

		<NuxtImg
			v-if="props.image"
			:src="props.image.src"
			:alt="props.image.alt"
			class="w-128 rounded-lg shadow-2xl"
		/>
	</UPageSection>
</template>
