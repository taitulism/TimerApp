<template>
	<div id="app">
		<Clock :showSeconds="true"/>
		<Timer />
	</div>
</template>

<script>
	import Timer from './components/Timer.vue'
	import Clock from './components/Clock.vue'

	export default {
		name: 'app',
		components: {
			Clock,
			Timer,
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