<template>
	<input
		ref="elm"
		type="text"
		class="TwoDigitsInput" 
		:value="getValue()"
		@focus="$event.target.select()"
		@input="handleChange"
		@blur="$emit('blur', $event.target.value)"
		@keyup.enter="$emit('done', $event.target.value)"
	/>
</template>

<script>
	// const editingKeys = ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace'];

	export default {
		name: 'TwoDigitsInput',
		props: {
			value: {
				default: "0",
			},
		},
		methods: {
			getValue () {
				return this.value
			},
			handleChange (ev) {
				const target = ev.target;

				this.$emit('change', target.value);

				if (target.value !== this.value) {
					target.value = this.value;
				}
			},
		},
		mounted () {
			// Selecting the text
			this.$refs.elm.focus();
		},
	}

	// function isInRange (number, min, max) {
	// 	return (number >= min) && (number <= max);
	// }
</script>

<style scoped lang="scss">
	.TwoDigitsInput {
		text-align: center;
		font-size: 100px;
		width: 25%;
		padding: 0;
		margin: 0 auto;
		border: 0 none;
		outline: 0 none;
		height: 150px;
		background-color: inherit;
		color: inherit;
		border-bottom: 1px solid;
	}
</style>