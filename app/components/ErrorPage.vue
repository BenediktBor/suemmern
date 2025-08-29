<template>
	<UError
		:error="{
			statusCode: 404,
			statusMessage: 'Seite nicht gefunden',
			message:
				'Die angeforderte Seite existiert nicht oder wurde entfernt.',
		}"
		:clear="{
			label: 'Zurück zur Startseite',
			icon: 'i-lucide-arrow-left',
			variant: 'subtle',
		}"
	/>
</template>
