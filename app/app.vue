<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'

const route = useRoute()
const { data: navigation } = await useAsyncData('navigation', () =>
	queryCollectionNavigation('blog')
)
const { data: files } = useLazyAsyncData(
	'search',
	() => queryCollectionSearchSections('blog'),
	{
		server: false,
	}
)
const searchTerm = ref('')
</script>

<template>
	<UApp locale="de">
		<AppHeader />

		<UMain>
			<UContainer v-if="route.path !== '/'"><NuxtPage /></UContainer>
			<NuxtPage v-else />
		</UMain>

		<AppFooter />

		<ClientOnly>
			<LazyUContentSearch
				v-model:search-term="searchTerm"
				:color-mode="false"
				:files="files"
				:navigation="navigation"
				:fuse="{ resultLimit: 42 }"
			/>
		</ClientOnly>
	</UApp>
</template>
