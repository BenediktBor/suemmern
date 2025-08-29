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
			fetch-priority="high"
			loading="eager"
			preload
			src="/logo.png"
		/>
	</NuxtLink>
</template>
