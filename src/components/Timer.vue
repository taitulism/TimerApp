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
					:class="{running: isRunning}"
					@click="mainBtnClicked">{{mainBtnText}}
				</button>
			</div>
			<div class="button-container">
				<button
					class="sub-btn"
					:class="{disabled: disableReset}"
					@click="subBtnClicked"
				>
					{{subBtnText}}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import TM from '../time-machine';
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
		data() {
			return {
				minutes: 0,
				isInputMode: false,
				timerRef: null,
				isOn: false,
				isPaused: false,
				startTimeMs: 0,
				mainBtnText: 'Start',
				subBtnText: 'Reset',
				mode: STOPWATCH_MODE,
			};
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
			isOff () {
				return !this.isOn;
			},
			isRunning () {
				return this.isOn && !this.isPaused;
			},
			disableReset () {
				return this.minutes === 0;
			},
		},
		methods: {
			mainBtnClicked () {
				if (this.isOn && !this.isPaused) {
					return this.stop();
				}

				this.mainBtnText = 'Stop';
				this.startTimeMs = this.startTimeMs || TM.getNow();

				if (this.mode === STOPWATCH_MODE) {
					this.startStopwatch();
				}
				else {
					this.mode = TIMER_MODE;
					this.startTimer();
				}
				
				this.isOn = true;
				this.isPaused = false;
			},
			
			startStopwatch () {
				this.timerRef = setInterval(this.stopwatchTick, 100);
			},

			startTimer () {
				this.timerRef = setInterval(this.timerTick, 1000);
			},

			subBtnClicked () {
				this.reset();
			},

			timerTick () {
				if (this.isOff) return;

				const currentTimeMs = TM.getNow();
				const timerMs = this.minutes * 60 * 1000;

				const diff = currentTimeMs - this.startTimeMs;
				const difMin = diff / 1000;

				if (diff < timerMs) {
					// const minsPassed = Math.floor(difMin);

					this.minutes -= 1;

					document.title = this.minutes;
				}
				else {
					this.stop();
					this.reset();
					// alert('Time\'s up!')
				}
			},

			stopwatchTick () {
				if (this.isOff) return;

				const currentTimeMs = +(new Date());
				const diff = currentTimeMs - this.startTimeMs;

				if (diff > 990) {
					document.title = this.minutes + 1;
					
					this.minutes += 1;
					this.startTimeMs = currentTimeMs;
				}
			},

			stop () {
				this.isPaused = true;
				
				clearInterval(this.timerRef);
				
				this.timerRef = null;
				this.mainBtnText = 'Start';
			},
			
			reset () {
				if (this.isPaused) {
					this.isOn = false;
					this.isPaused = false;
				}

				this.startTimeMs = 0;
				this.minutes = 0;
				document.title = '0';
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
				}
				else if (newNum > 99) {
					this.minutes = 99;
				}
				else {
					this.minutes = 0;
				}

				this.mode = TIMER_MODE;
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

		&.disabled {
			border: 1px solid gray;
			color: gray;
		}
	}
</style>