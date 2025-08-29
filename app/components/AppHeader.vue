<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui/components/NavigationMenu.vue'

const route = useRoute()

const { data } = await useAsyncData('navigationData', async () => {
	const [youth, seniorMale, female, pages] = await Promise.all([
		queryCollection('teams')
			.order('order', 'ASC')
			.where('category', '=', 'Jugend')
			.all(),
		queryCollection('teams')
			.order('order', 'ASC')
			.where('category', '=', 'Herren')
			.all(),
		queryCollection('teams')
			.order('order', 'ASC')
			.where('category', '=', 'Frauen')
			.all(),
		queryCollectionNavigation('pages', ['icon', 'order']).order(
			'order',
			'ASC'
		),
	])

	return {
		youth,
		seniorMale,
		female,
		pages,
	}
})
const teams = computed(() =>
	data.value
		? {
				youth: data.value.youth,
				seniorMale: data.value.seniorMale,
				female: data.value.female,
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
		label: 'Herren',
		icon: 'i-lucide-users',
		to: '/teams?category=Herren',
		active:
			route.path.endsWith('/teams') && route.query.category === 'Herren',

		children: (teams.value?.seniorMale ?? []).map((team) => ({
			label: team.name,
			to: team.path,
		})),
	},
	{
		label: 'Frauen',
		icon: 'i-lucide-users',
		to: '/teams?category=Frauen',
		active:
			route.path.endsWith('/teams') && route.query.category === 'Frauen',
		children: (teams.value?.female ?? []).map((team) => ({
			label: team.name,
			to: team.path,
		})),
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
</script>

<template>
	<UHeader :ui="{ title: 'items-center gap-2' }">
		<template #title>
			<AppLogo class="h-12" />

			<span class="max-lg:flex hidden xl:flex flex-col">
				<span class="font-medium relative top-1">Sportfreunde</span>
				<span class="relative bottom-1">Sümmern e.V.</span>
			</span>
		</template>

		<UNavigationMenu :items="items" />

		<template #body>
			<UNavigationMenu
				orientation="vertical"
				mode="drawer"
				:items="items"
			/>
		</template>

		<template #right>
			<UColorModeButton />
		</template>
	</UHeader>
</template>
