<script setup lang="ts">
const route = useRoute()

const seoTitle = 'Sportfreunde Sümmern e.V.'
const seoDescription =
	'Fußball in Iserlohn: Die Sportfreunde Sümmern sind ein Breitensportverein mit Kinder-, Jugend- und Seniorenfußball. Jetzt Teil unserer Gemeinschaft werden!'
useSeoMeta({
	title: seoTitle,
	ogTitle: seoTitle,
	description: seoDescription,
	ogDescription: seoDescription,
})

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('index').first()
})
</script>

<template>
	<ContentRenderer v-if="page" :value="page" />
</template>
