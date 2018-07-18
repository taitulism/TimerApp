<template>
	<div class="Timer" v-scroll="scrollHandler">
		<div class="top">
			<TwoDigitsDisplay v-if="!isInputMode"
				:display="padMinutes"
				@click="setInputMode"
			/>
			<TwoDigitsInput v-else
				:value="minutes"
				@change="updateMinutes"
				@blur="setDisplayMode"
				@done="setDisplayMode"
			/>
		</div>
		<div class="buttons">
			<div class="button-container">
				<button
					class="main-btn"
					:class="{running: isOn}"
					@click="mainBtnClicked">{{mainBtnText}}
				</button>
			</div>
			<div class="button-container">
				<button class="sub-btn" @click="subBtnClicked">{{subBtnText}}</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import TwoDigitsDisplay from './TwoDigitsDisplay.vue';
	import TwoDigitsInput from './TwoDigitsInput.vue';
	// import Button from './Button.vue';

	const STOPWATCH_MODE = 0;
	const TIMER_MODE = 1;

	export default {
		name: 'Timer',
		components: {
			TwoDigitsDisplay,
			TwoDigitsInput,
			// Button,
		},
		computed: {
			...mapGetters([
				'clockHours',
				'clockMinutes',
				'clockSeconds',
			]),
			padMinutes () {
				return this.padWithZero(this.minutes);
			},
			mode () {
				if (!this.isOn && this.minutes) {
					return TIMER_MODE;
				}

				return STOPWATCH_MODE;
			},
		},
		data() {
			const ison = this.isOn;
			return {
				minutes: 0,
				isInputMode: false,
				timerRef: null,
				isOn: false,
				startTimeMs: null,
				mainBtnText: 'Start',
				subBtnText: 'Reset',
				mainBtnClasses: {
					'running': ison,
				},
			};
		},
		methods: {
			mainBtnClicked () {
				if (this.isOn) {
					return this.stop();
				}

				this.isOn = true;
				this.mainBtnText = 'Stop';
				this.startTimeMs = this.mode === STOPWATCH_MODE ? +(new Date()) : this.minutes;

				this.timerRef = setInterval(() => {
					this.stopwatchTick();
				}, 100);
			},

			subBtnClicked () {
				this.minutes = 0;
			},

			timerTick () {
				if (!this.isOn) {
					return;
				}

				const curMs = +(new Date())
				const msPassed = this.minutes;
				const dif = currentTimeMs - this.startTimeMs;

				if (dif > 990) {
					document.title = this.minutes + 1;
					
					this.minutes += 1;
					this.startTimeMs = currentTimeMs;
				}
			},

			stopwatchTick () {
				if (!this.isOn) {
					return;
				}

				const currentTimeMs = +(new Date());
				const dif = currentTimeMs - this.startTimeMs;

				if (dif > 990) {
					document.title = this.minutes + 1;
					
					this.minutes += 1;
					this.startTimeMs = currentTimeMs;
				}
			},

			stop () {
				this.isOn = false;

				clearInterval(this.timerRef);

				// reset values
				this.timerRef = null;
				
				this.mainBtnText = 'Start';
			},
			setInputMode () {
				this.isInputMode = true;
			},
			setDisplayMode () {
				this.isInputMode = false;
			},
			updateMinutes (newMinutes) {
				const newNum = parseInt(newMinutes, 10);
				
				if (this.isValid(newNum)) {
					this.minutes = newNum;

					return;
				}

				if (newNum > 99) {
					this.minutes = 99;
				}
				else {
					this.minutes = 0;
				}
			},
			scrollHandler(ev) {
				console.log(222, ev);
				// this.scrolled = window.scrollY > 0;
			},
			padWithZero (num) {
				if (num < 10) {
					return `0${num}`;
				}

				return String(num);
			},
			isValid (num) {
				if (!this.isNumber(num)) return false;

				if (isInRange(num, 0, 99)) return true;

				return false;
			},
			isNumber (val) {
				if (typeof val !== 'number') return false;

				// typeof NaN === 'number'
				// Number.isNaN() checks if the given value is itself a type NaN
				// while window.isNaN() tries to convert the value into a number (e.g. `Number(val)`).
				if (Number.isNaN(val)) return false;

				return true;
			}
		},
	}

	function isInRange (num, min, max) {
		return (num >= min) && (num <= max);
	}
</script>

<style scoped lang="scss">
	.Timer {
		--btn-height: 50px;

		display: flex;
		flex-direction: column;
    	align-items: center;
		/* height: 200%;
		overflow: hidden; */
	}

	.top {
		text-align: center;
	}

	.buttons {
		text-align: center;
	}

	.button-container {
		margin: 10px auto;
	}

	.main-btn {
		height: 75px;
		min-width: 6em;
		border: 0 none;
		outline: 0 none;
		margin: 0;
		padding: 0;
		border-radius: 3px;
		font-size: 2em;
		background-color: #25a225;
		color: inherit;


		&.running {
			background-color: #bd1d1d;
		}
	}
	
	.sub-btn {
		height: var(--btn-height);
		min-width: 100%;
		border: 1px solid #79df79;
		outline: 0 none;
		margin: 0;
		padding: 0;
		border-radius: 3px;
		font-size: 2em;
		background-color: inherit;
		color: #79df79;
		vertical-align: top;
		font-size: 1.5em;
	}
</style>