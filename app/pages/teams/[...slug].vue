<script setup>
import ErrorPage from '~/components/ErrorPage.vue'

const route = useRoute()
const { data: page } = await useAsyncData(`${route.path}.page`, () => {
	return queryCollection('pages').path('/blog/').first()
})

const { data: team, refresh } = await useAsyncData(
	`${route.path}.teamData`,
	async () => {
		const team = await queryCollection('teams').path(route.path).first()
		const coaches = await queryCollection('persons')
			.where('teams', 'LIKE', `%"${team.name}"%`)
			.order('position', 'DESC')
			.all()

		// In-place sort coaches. "Trainer" with badge should be first, then "Trainer", then "Co-Trainer", then everything else.
		coaches.sort((a, b) => {
			const getPriority = (coach) => {
				if (
					(coach.position === 'Trainer' ||
						coach.position === 'Trainerin') &&
					coach.badge
				)
					return 0
				if (
					coach.position === 'Trainer' ||
					coach.position === 'Trainerin'
				)
					return 1
				if (
					coach.position === 'Co-Trainer' ||
					coach.position === 'Co-Trainerin'
				)
					return 2
				return 3
			}

			return getPriority(a) - getPriority(b)
		})

		return {
			...team,
			coaches,
		}
	}
)
const seoTitle = computed(
	() => `${team.value?.name} - Sportfreunde Sümmern e.V.`
)
const seoDescription = computed(
	() =>
		`${team.value?.name} der Sportfreunde Sümmern: Infos zu Trainingszeiten, Trainern, Ergebnissen und Spielen im Kreis Iserlohn. Jetzt Team entdecken!`
)
useSeoMeta({
	title: seoTitle,
	ogTitle: seoTitle,
	description: seoDescription,
	ogDescription: seoDescription,
})

const practiceTimes = computed(() => {
	return (team.value?.practice ?? []).map((practice) => ({
		title: practice.day,
		description: practice.time,
		icon: 'i-lucide-clock',
	}))
})
const contact = {
	title: 'Kontakt',
	description:
		'Melde dich unter info@sportfreunde-suemmern.de bei uns oder direkt bei den unten genannten Ansprechpartner.',
	icon: 'i-lucide-mail',
}

const links = computed(() => {
	if (team.value?.category === 'Jugend' && page.value?.links)
		return [
			{
				...page.value?.links?.[0],
				to: 'https://www.instagram.com/sportfreunde_suemmern_jugend/',
			},
			...page.value?.links.slice(1),
		]
	return page.value?.links ?? []
})
</script>

<template>
	<UPage>
		<ErrorPage v-if="!team" />
		<template v-else>
			<UPageHeader :headline="team.league" :title="team.name">
				<template #headline>
					<UBadge
						class="mr-1"
						:label="team.category"
						variant="subtle"
						size="lg"
					/>
					{{ team.league }}
				</template>
				<UBreadcrumb
					class="my-2"
					:items="[
						{ label: 'TEAMS', to: '/teams' },
						{ label: team.name.toUpperCase() },
					]"
				/>

				<p
					v-if="team.description"
					class="text-lg text-pretty text-muted mt-4"
				>
					{{ team.description }}
				</p>
			</UPageHeader>

			<UPageBody>
				<UPageSection
					orientation="horizontal"
					reverse
					:title="
						practiceTimes && practiceTimes.length > 0
							? 'Trainingszeiten'
							: null
					"
					:features="practiceTimes.concat(contact)"
				>
					<!-- 16:9 image -->
					<NuxtImg
						:src="team.image"
						fit="cover"
						:width="512"
						:height="288"
						:placeholder="[512, 288, 25, 5]"
						:alt="`Mannschaftsbild der ${team.name}`"
						class="w-128 rounded-lg shadow-2xl"
					/>
				</UPageSection>

				<UPageSection
					v-if="team.coaches.length > 0"
					:title="team.contactPersonsTitle ?? 'Das Trainerteam'"
				>
					<UPageGrid
						:class="{
							'sm:grid-cols-2 lg:grid-cols-2':
								team.coaches.length <= 2,
							'sm:grid-cols-3 lg:grid-cols-3':
								team.coaches.length === 3,
							'sm:grid-cols-2 lg:grid-cols-4':
								team.coaches.length > 4,
						}"
					>
						<PersonCoach
							v-for="coach in team.coaches"
							:key="coach.id"
							:name="coach.name"
							:position="coach.position"
							:image="coach.image"
							:badge="coach.badge"
							:phone="coach.phone"
							:mail="coach.mail"
						/>
					</UPageGrid>
				</UPageSection>

				<ContentRenderer
					v-if="team?.body?.type === 'minimark'"
					:value="team"
				/>

				<BlogArticleList
					:title="page?.title"
					:headline="page?.headline"
					:description="page?.description"
					:team="team.name"
					:links="[
						...links,
						{
							label: 'Mehr Artikel',
							trailingIcon: 'i-lucide-arrow-right',
							variant: 'subtle',
							to: `/blog?team=${team.name}`,
						},
					]"
				/>
			</UPageBody>
		</template>
	</UPage>
</template>
