<script setup lang="ts">
const props = defineProps<{
	image: {
		src: string
		alt: string
	}
	list: {
		image: {
			icon?: string
			src?: string
			alt?: string
		}
		title?: string
		description: string
	}[]
	reverse?: boolean
	startIndex?: number
}>()
</script>

<template>
	<UPageGrid class="pt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
		<UPageList>
			<div
				v-for="(item, index) in props.list"
				:key="index"
				class="m-2 flex gap-4 items-center flex-row"
			>
				<NuxtImg
					v-if="item.image.src"
					class="w-16 h-16 rounded-full object-cover"
					:src="item.image.src"
					:alt="item.image.alt"
				/>
				<div
					v-else-if="item.image.icon"
					class="shrink-0 flex items-center justify-center bg-primary rounded-full w-16 h-16"
				>
					<UIcon class="bg-white size-10" :name="item.image.icon" />
				</div>

				<span>
					<span class="text-primary opacity-40 font-bold text-6xl">
						{{ (props.startIndex ?? 0) + index + 1 }}.
					</span>
					<span class="z-10">{{ item.description }}</span>
				</span>
			</div>
		</UPageList>
		<NuxtImg
			class="rounded-lg shadow-2xl place-self-center"
			:class="{
				'order-first': props.reverse,
			}"
			:src="props.image.src"
			:alt="props.image.alt"
		/>
	</UPageGrid>
</template>
