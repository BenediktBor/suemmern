<script setup lang="ts">
import { de } from '@nuxt/ui/locale'

const route = useRoute()
</script>

<template>
	<UApp :locale="de">
		<AppHeader />

		<UMain>
			<UContainer v-if="route.path !== '/'"><NuxtPage /></UContainer>
			<NuxtPage v-else />
		</UMain>

		<LazyAppFooter hydrate-on-visible />
	</UApp>
</template>
