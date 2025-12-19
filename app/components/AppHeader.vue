<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui/components/NavigationMenu.vue'

const route = useRoute()

const { data } = await useAsyncData('navigationData', async () => {
	const [youth, senior, pages] = await Promise.all([
		queryCollection('teams')
			.order('order', 'ASC')
			.where('category', '=', 'Jugend')
			.all(),
		queryCollection('teams')
			.order('order', 'ASC')
			.where('category', '=', 'Senioren')
			.all(),
		queryCollectionNavigation('pages', ['icon', 'order']).order(
			'order',
			'ASC'
		),
	])

	return {
		youth,
		senior,
		pages,
	}
})
const teams = computed(() =>
	data.value
		? {
				youth: data.value.youth,
				senior: data.value.senior,
			}
		: null
)
const pages = computed(() => data.value?.pages || [])
const mainPages = computed(() => {
	const youthSection = pages.value.find(
		(page) => page.path === '/verein'
	)?.children
	if (!youthSection) return []

	return youthSection
		.filter((page) => page.path.startsWith('/verein/'))
		.map((page) => ({
			label: page.title,
			to: page.path,
			icon: page.icon,
		}))
})
const youthPages = computed(() => {
	const youthSection = pages.value.find(
		(page) => page.path === '/jugend'
	)?.children
	if (!youthSection) return []

	return youthSection
		.filter((page) => page.path.startsWith('/jugend/'))
		.map((page) => ({
			label: page.title,
			to: page.path,
			icon: page.icon,
			children: page.children
				?.filter((subpage) => subpage.path !== page.path)
				.map((subpage) => ({
					label: subpage.title,
					to: subpage.path,
					icon: subpage.icon,
				})),
		}))
})
const seniorenPages = computed(() => {
	const seniorenSection = pages.value.find(
		(page) => page.path === '/senioren'
	)?.children
	if (!seniorenSection) return []

	return seniorenSection
		.filter((page) => page.path.startsWith('/senioren/'))
		.map((page) => ({
			label: page.title,
			to: page.path,
			icon: page.icon,
			children: page.children
				?.filter((subpage) => subpage.path !== page.path)
				.map((subpage) => ({
					label: subpage.title,
					to: subpage.path,
					icon: subpage.icon,
				})),
		}))
})

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: 'Unser Verein',
		icon: 'i-heroicons-user-group',
		to: '/',
		children: [
			{
				label: 'Aktuelles',
				icon: 'i-heroicons-newspaper',
				to: '/blog',
				active:
					route.path.endsWith('/blog') &&
					route.query.category === undefined,
			},
			...mainPages.value,
			{
				label: 'Vereinsshop',
				icon: 'i-mdi-cart-outline',
				to: 'https://team.jako.com/de-de/team/sf_suemmern/',
				target: '_blank',
			},
			{
				label: 'Spielplan & Ergebnisse',
				icon: 'i-lucide-calendar',
				to: 'https://www.fussball.de/verein/sf-suemmern-westfalen/-/id/00ES8GN8PK00000AVV0AG08LVUPGND5I#!/',
				target: '_blank',
			},
		],
	},
	{
		label: 'Senioren',
		icon: 'i-lucide-users',
		to: '/senioren',
		children: [
			{
				label: 'Aktuelles',
				icon: 'i-heroicons-newspaper',
				to: '/blog?category=Senioren',
				active:
					route.path.endsWith('/blog') &&
					route.query.category === 'Senioren',
			},
			{
				label: 'Teams',
				icon: 'i-heroicons-user-group',
				to: '/teams?category=Senioren',
				active:
					route.path.endsWith('/teams') &&
					route.query.category === 'Senioren',

				children: (teams.value?.senior ?? []).map((team) => ({
					label: team.name,
					to: team.path,
				})),
			},
			...seniorenPages.value,
		],
	},

	{
		label: 'Jugend',
		icon: 'i-carbon-pedestrian-child',
		to: '/jugend',
		children: [
			{
				label: 'Aktuelles',
				icon: 'i-heroicons-newspaper',
				to: '/blog?category=Jugend',
				active:
					route.path.endsWith('/blog') &&
					route.query.category === 'Jugend',
			},
			{
				label: 'Teams',
				icon: 'i-heroicons-user-group',
				to: '/teams?category=Jugend',
				active:
					route.path.endsWith('/teams') &&
					route.query.category === 'Jugend',

				children: (teams.value?.youth ?? []).map((team) => ({
					label: team.name,
					to: team.path,
				})),
			},
			...youthPages.value,
		],
	},
	{
		label: 'Weitere Abteilungen',
		icon: 'i-tabler-gymnastics',
		to: '/teams?category=Sonstige',
		active:
			route.path.endsWith('/teams') &&
			route.query.category === 'Sonstige',
	},
])

const hideCTA = computed(() => {
	return [
		'/verein/probetraining/',
		'/verein/probetraining',
		'/verein/mitglied-werden/',
		'/verein/mitglied-werden',
		'/jugend/probetraining/',
		'/jugend/probetraining',
	].includes(route.path)
})
</script>

<template>
	<UHeader :ui="{ title: 'items-center gap-2' }">
		<template #title>
			<NuxtPicture
				class="h-12 w-12"
				width="96"
				height="96"
				format="avif,webp"
				fetchpriority="high"
				loading="eager"
				preload
				src="/logo.png"
				alt="Logo der Sportfreunde Sümmern e.V."
			/>

			<span class="max-lg:flex hidden xl:flex flex-col">
				<span class="font-medium relative top-1">Sportfreunde</span>
				<span class="relative bottom-1">Sümmern e.V.</span>
			</span>
		</template>

		<UNavigationMenu :items="items" />

		<template #body>
			<UButton
				class="mb-4"
				variant="subtle"
				size="lg"
				block
				icon="i-fluent-emoji-high-contrast-soccer-ball"
				trailingIcon="i-lucide-arrow-right"
				label="Jetzt Probetraining vereinbaren"
				to="/verein/probetraining/"
			/>
			<UNavigationMenu
				orientation="vertical"
				mode="drawer"
				:items="items"
			/>
		</template>

		<template #right>
			<UButton
				v-if="!hideCTA"
				class="hidden lg:inline-flex"
				variant="subtle"
				icon="i-fluent-emoji-high-contrast-soccer-ball"
				trailingIcon="i-lucide-arrow-right"
				label="Probetraining"
				to="/verein/probetraining/"
			/>
			<UColorModeButton />
		</template>
	</UHeader>
</template>
