<template>
	<div class="Clock">
		<div class="clock-segment clock-segment-hours">{{HH}}</div>
		<div class="clock-colons clock-colons-main" :class="{hide: hideMainColons}">:</div>
		<div class="clock-segment clock-segment-minutes">{{MM}}</div>
		<template v-if="showSeconds">
			<div class="clock-colons clock-colons-seconds">:</div>		
			<div class="clock-segment clock-segment-seconds">{{SS}}</div>
		</template>
	</div>
</template>

<script>
	import TM from '../time-machine';

	export default {
		name: 'Clock',
		props: {
			showSeconds: false,
		},
		data () {
			return {
				clockIntervalRef: null,
				blinkIntervalRef: null,
				hideMainColons: false,
				hours: 0,
				minutes: 0,
				seconds: 0,
			};
		},
		computed: {
			HH () {
				return TM.pad(this.hours);
			},
			MM () {
				return TM.pad(this.minutes);
			},
			SS () {
				return TM.pad(this.seconds);
			},
		},
		created () {
			this.setClock();

			this.clockIntervalRef = setInterval(this.setClock, 1000);

			// blink main colons (:) when no seconds
			if (!this.showSeconds) {
				this.blinkIntervalRef = setInterval(this.toggleColonsBlink, 500);
			}
		},
		methods: {
			setClock () {
				const [hours, minutes, seconds] = TM.getClockValues();

				this.hours = hours;
				this.minutes = minutes;
				this.seconds = seconds;
			},
			toggleColonsBlink () {
				this.hideMainColons = !this.hideMainColons;
			},
		},
		beforeDestroyed () {
			clearInterval(this.clockIntervalRef);
			this.blinkIntervalRef && clearInterval(this.blinkIntervalRef);
		},
	}
</script>

<style scoped lang="scss">
	.Clock {
		display: flex;
		justify-content: center;
		align-items: baseline;
		padding: 10px;
		font-size: 50px;
	}

	.clock-segment {
		&.clock-segment-seconds {
			font-size: 0.7em;
		}
	}

	.clock-colons {
		&.hide {
			visibility: hidden;
		}

		&.clock-colons-seconds {
			font-size: 0.7em;
		}
	}
</style>
