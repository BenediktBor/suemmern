<script setup lang="ts">
const props = defineProps<{
	images: {
		src: string
		title?: string
		alt?: string
		width?: number
		height?: number
	}[]
}>()
</script>

<template>
	<UMarquee pause-on-hover :ui="{ root: `[--duration:120s]` }">
		<div v-for="(img, i) in images" class="w-48" :key="i">
			<h1 class="text-center text-xl font-bold text-pretty mb-2">
				{{ img.title ?? img.alt }}
			</h1>

			<NuxtImg
				class="w-48 rounded-lg"
				format="webp"
				:src="img.src"
				:alt="img.alt"
				loading="lazy"
				:width="img.width ?? 288"
				:height="img.height ?? 288"
				fit="cover"
				:placeholder="[img.width ?? 288, img.height ?? 288, 25, 5]"
			/>
		</div>
	</UMarquee>
</template>
