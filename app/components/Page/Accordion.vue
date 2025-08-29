<script setup lang="ts">
defineProps<{
	items: {
		icon?: string
		label: string
		content: string
		link?: {
			icon?: string
			label: string
			to: string
		}
	}[]
}>()
</script>

<template>
	<UPageCard variant="soft">
		<UAccordion :items="items" :unmount-on-hide="false">
			<template #body="{ item }">
				<p>{{ item.content }}</p>
				<div v-if="item.link" class="mt-4 flex flex-row-reverse">
					<UButton
						class="w-fit"
						variant="subtle"
						:label="item.link.label"
						:icon="item.link.icon"
						trailingIcon="i-lucide-arrow-right"
						:to="item.link.to"
					/>
				</div>
			</template>
		</UAccordion>
	</UPageCard>
</template>
