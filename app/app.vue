<script setup lang="ts">
const route = useRoute()
</script>

<template>
	<UApp locale="de">
		<AppHeader />

		<UMain>
			<UContainer v-if="route.path !== '/'"><NuxtPage /></UContainer>
			<NuxtPage v-else />
		</UMain>

		<LazyAppFooter hydrate-on-visible />
	</UApp>
</template>
