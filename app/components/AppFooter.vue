<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui/components/NavigationMenu.vue'

const items: NavigationMenuItem[] = [
	{
		label: 'Impressum',
		to: '/about/impressum',
	},
	{
		label: 'Datenschutz',
		to: '/about/datenschutz',
	},
	{
		label: 'Cookie-Richtlinie',
		to: '/about/cookies',
	},
]
</script>

<template>
	<UFooter>
		<template #left>
			<p class="text-muted text-sm">
				Copyright © {{ new Date().getFullYear() }}
			</p>
		</template>

		<UNavigationMenu :items="items" variant="link" />

		<template #right>
			<UButton
				icon="i-simple-icons-instagram"
				color="neutral"
				variant="ghost"
				to="https://instagram.com/sportfreunde_suemmern/"
				target="_blank"
				aria-label="Discord"
			/>
			<UButton
				icon="i-simple-icons-facebook"
				color="neutral"
				variant="ghost"
				to="https://www.facebook.com/sportfreundesuemmern/"
				target="_blank"
				aria-label="X"
			/>
			<UButton
				icon="i-simple-icons-whatsapp"
				color="neutral"
				variant="ghost"
				to="https://whatsapp.com/channel/0029VanrlOqDeON7QPi8XE3o"
				target="_blank"
				aria-label="GitHub"
			/>
			<UButton
				icon="i-material-symbols-sports-soccer"
				color="neutral"
				variant="ghost"
				to="https://www.fussball.de/verein/sf-suemmern-westfalen/-/id/00ES8GN8PK00000AVV0AG08LVUPGND5I#!/"
				target="_blank"
				aria-label="GitHub"
			/>
		</template>
	</UFooter>
</template>
