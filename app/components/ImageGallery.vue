<script setup lang="ts">
defineProps<{
	images: { src: string; title?: string; alt?: string }[]
}>()
</script>

<template>
	<UCarousel
		v-slot="{ item: image }"
		arrows
		:items="images"
		class="min-w-full max-w-xs mx-auto"
		:autoplay="{
			delay: 4000,
			stopOnInteraction: false,
			stopOnFocusIn: false,
		}"
		:ui="{ item: 'basis-1/4' }"
	>
		<UModal :title="image.title ?? image.alt" fullscreen>
			<NuxtImg
				:src="image.src"
				:alt="image.alt"
				width="320"
				height="320"
				class="rounded-lg"
			/>

			<template #body>
				<NuxtImg
					:src="image.src"
					:alt="image.alt"
					class="w-full h-full object-contain"
				/>
			</template>
		</UModal>
	</UCarousel>
</template>
