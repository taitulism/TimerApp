<template>
	<div id="app">
		<Timer />
	</div>
</template>

<script>
	import Timer from './components/Timer.vue'

	export default {
		name: 'app',
		components: {
			Timer
		}
	}
</script>

<style lang="scss">
	html, body {
		height: 100%;
		margin: 0;
		padding: 0;
		font-size: 16px;
		font-family: arial;
	}

	#app {
		color: white;
		background-color: #252525;
		height: 100%;
	}
</style>