<script setup lang="ts">
import { type ButtonProps } from '@nuxt/ui/components/Button.vue'
import { set } from '@nuxt/ui/runtime/utils/index.js'

const props = defineProps<{
	title: string
	headline: string
	description: string
	links?: ButtonProps[]
}>()

const isVideoPlaying = ref(import.meta.env.SSR ? true : false) // Assume video is playing on server-side to avoid blur being added to element by default

useHead({
	link: [
		{
			rel: 'preload',
			as: 'image',
			href: '/media/intro-poster.webp',
			fetchpriority: 'high',
		},
	],
})
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

		<template #default>
			<div class="place-self-center">
				<video
					class="object-cover h-max max-h-164 rounded-lg shadow-2xl transition-all duration-300 ease-in-out"
					:class="{ 'blur-xs': !isVideoPlaying }"
					width="369"
					height="656"
					src="/media/intro.mp4"
					muted
					loop
					autoplay
					playsinline
					poster="/media/intro-poster.webp"
					preload="none"
					loading="lazy"
					@play="isVideoPlaying = true"
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
