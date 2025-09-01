<script setup lang="ts">
import { type ButtonProps } from '@nuxt/ui/components/Button.vue'
import { type PageFeatureProps } from '@nuxt/ui/components/PageFeature.vue'

const props = defineProps<{
	title: string
	headline?: string
	description?: string
	image?: { src: string; alt: string; portrait?: boolean }
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
			fit="cover"
			:width="props.image.portrait ? 288 : 512"
			:height="props.image.portrait ? 512 : 288"
			:placeholder="[
				props.image.portrait ? 288 : 512,
				props.image.portrait ? 512 : 288,
				25,
				5,
			]"
			class="rounded-lg shadow-2xl place-self-center"
			:class="{
				'w-128': !props.image.portrait,
			}"
		/>
	</UPageSection>
</template>
