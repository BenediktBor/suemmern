<script setup lang="ts">
defineProps({
	class: String,
	linkClass: String,
})
</script>

<template>
	<NuxtLink :class="linkClass" to="/">
		<NuxtImg
			:class="class"
			format="webp"
			fetch-priority="high"
			loading="eager"
			preload
			src="/logo.png"
			alt="Logo der Sportfreunde Sümmern e.V."
		/>
	</NuxtLink>
</template>
