<script setup lang="ts">
import AppLogo from '~/components/AppLogo.vue'
import { type ButtonProps } from '@nuxt/ui/components/Button.vue'

const props = defineProps<{
	title: string
	headline: string
	description: string
	links?: ButtonProps[]
}>()
</script>

<template>
	<UPageHero
		:headline="props.headline"
		:title="props.title"
		:description="props.description"
		orientation="horizontal"
		:links="props.links"
	>
		<template #headline>
			<NuxtPicture
				class="h-48 w-48 sm:h-64 sm:w-64"
				width="192"
				height="192"
				format="avif,webp"
				fetchpriority="high"
				loading="eager"
				preload
				src="/logo.png"
				alt="Logo der Sportfreunde Sümmern e.V."
			/>

			<h1 class="mt-4 text-2xl text-primary font-bold">
				Herzlich Willkommen bei den
			</h1>
		</template>
		<!-- <template #title>
				<div class="inline-flex items-center gap-4">
					<AppLogo linkClass="shrink-0 " class="h-24 w-24" />
					<span class="shrink">Sportfreunden Sümmern e.V.</span>
				</div>
			</template> -->
		<template #default>
			<div class="place-self-center">
				<video
					class="object-cover h-max max-h-164 rounded-lg shadow-2xl"
					src="/media/intro.mp4"
					muted
					loop
					autoplay
					playsinline
					poster="/media/intro-poster.png"
				/>

				<div class="mt-2 text-center text-dimmed font-extralight">
					<span>Video von</span>
					<NuxtLink
						class="text-primary"
						to="https://www.instagram.com/m.k.flyingshots"
						target="_blank"
					>
						Moritz Kruse
					</NuxtLink>
				</div>
			</div>
		</template>
	</UPageHero>
</template>
