<template>
	<div class="TwoDigitsDisplay" @click="$emit('click')">
		{{display}}
	</div>
</template>

<script>
	export default {
		name: 'TwoDigitsDisplay',
		props: ['display'],
	}
</script>

<style scoped lang="scss">
	.TwoDigitsDisplay {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 150px;
		text-align: center;
		font-size: 100px;
	}
</style>