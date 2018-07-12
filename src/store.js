import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		gclockSeconds: 0,
		gclockMinutes: 0,
		gclockHours: 0,
	},
	getters: {
		clockHours (state) {
			return padWithZero(state.gclockHours);
		},
		clockMinutes (state) {
			return padWithZero(state.gclockMinutes);
		},
		clockSeconds (state) {
			return padWithZero(state.gclockSeconds);
		},
	},
	mutations: {
		setClockHours () {

		},
		setClockMinutes () {

		},
		setClockSeconds () {

		},
	},
	actions: {

	}
});

function padWithZero (num) {
	if (num < 10) {
		return `0${num}`;		
	}

	return num;
}
