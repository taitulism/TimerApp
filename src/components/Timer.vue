<template>
	<div class="Timer">
		<ClockDisplay />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import ClockDisplay from './ClockDisplay.vue';

	export default {
		name: 'Timer',
		components: {
			ClockDisplay,
		},
		computed: mapGetters([
			'clockHours',
			'clockMinutes',
			'clockSeconds',
		])
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.Timer {
		
	}
</style>