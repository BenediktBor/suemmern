<script setup lang="ts">
const props = defineProps<{
	name: string
	image?: string
	position?: string
	badge?: string
	phone?: string
	mail?: string
	since?: string
}>()
</script>

<template>
	<UCard
		:ui="{
			root: 'flex flex-col',
			body: 'grow-1',
			footer: 'flex flex-col gap-2',
		}"
		variant="subtle"
	>
		<template #header>
			<div class="w-full grid">
				<NuxtImg
					:src="props.image"
					width="192"
					height="192"
					:placeholder="[192, 192, 25, 5]"
					:alt="`Bild von ${props.name}`"
					class="rounded-full h-48 w-48 place-self-center"
				/>
			</div>
		</template>

		<template #default>
			<h1 class="text-3xl font-bold mb-2 text-center">
				{{ props.name }}
			</h1>

			<div class="mb-1 flex gap-2 items-center justify-center">
				<h2 v-if="props.position" class="text-primary font-semibold">
					{{ props.position }}
				</h2>
				<UBadge
					v-if="props.badge"
					:label="props.badge"
					variant="subtle"
					size="lg"
				/>
			</div>
		</template>

		<template v-if="props.phone || props.mail || props.since" #footer>
			<div v-if="props.phone" class="flex items-center gap-2">
				<UIcon name="i-lucide-phone" />
				<span>
					{{ props.phone }}
				</span>
			</div>
			<div v-if="props.mail" class="flex items-center gap-2">
				<UIcon name="i-lucide-mail" />
				<a :href="`mailto:${props.mail}`" class="wrap-anywhere">
					{{ props.mail }}
				</a>
			</div>
			<div v-if="props.since" class="flex items-center gap-2">
				<UIcon name="i-lucide-calendar" />
				<span>seit {{ props.since }}</span>
			</div>
		</template>
	</UCard>
</template>
