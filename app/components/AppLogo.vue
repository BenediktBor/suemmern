<script setup lang="ts">
defineProps({
	class: String,
	linkClass: String,
})
</script>

<template>
	<NuxtLink :class="linkClass" to="/">
		<NuxtImg :class="class" src="/logo.png" />
	</NuxtLink>
</template>
