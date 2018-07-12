<template>
	<div class="ClockDisplay">
		{{HH}}:{{MM}}:{{SS}}
	</div>
</template>

<script>
	export default {
		name: 'ClockDisplay',
		props: {
			seconds: {
				type: Number,
				default: 0,
				required: false,
				validator: (raw) => {
					const val = parseInt(raw, 10);

					return isInRange(val, 0, 59);
				}
			},
			minutes: {
				type: Number,
				default: 0,
				required: false,
				validator: (raw) => {
					const val = parseInt(raw, 10);

					return isInRange(val, 0, 59);
				}
			},
			hours: {
				type: Number,
				default: 0,
				required: false,
				validator: (raw) => {
					const val = parseInt(raw, 10);

					return isInRange(val, 0, 23);
				}
			},
		},
		computed: {
			HH () {
				return this.padWithZero(this.hours);
			},
			MM () {
				return this.padWithZero(this.minutes);
			},
			SS () {
				return this.padWithZero(this.seconds);
			},
		},
		methods: {
			padWithZero (num) {
				if (num < 10) {
					return `0${num}`;
				}

				return num;
			}
		}
	}

	function isInRange (num, min, max) {
		return (num >= min) && (num <= max);
	}
</script>

<style scoped lang="scss">
	.ClockDisplay {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 150px;
		text-align: center;
		font-size: 100px;
	}
</style>