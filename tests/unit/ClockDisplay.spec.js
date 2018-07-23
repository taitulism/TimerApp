import { shallowMount } from '@vue/test-utils'
import ClockDisplay from '@/components/ClockDisplay.vue';

describe('ClockDisplay', () => {
	describe('Default Rendering (no-props)', () => {
		it('renders a zeroed clock', () => {
			const wrapper = shallowMount(ClockDisplay, { propsData: {} });

			expect(wrapper.text()).toMatch('00:00:00');
		});
	});

	describe('Rendering with props', () => {
		describe('seconds', () => {
			it('renders the seconds on the right', () => {
				const wrapper = shallowMount(ClockDisplay, { propsData: {seconds: 33} });

				expect(wrapper.text()).toEqual('00:00:33');
			});

			it('pads with zero one-digit-numbers', () => {
				const wrapper = shallowMount(ClockDisplay, { propsData: {seconds: 3} });

				expect(wrapper.text()).toEqual('00:00:03');
			});
		});

		describe('minutes', () => {
			it('renders the minutes on the middle', () => {
				const wrapper = shallowMount(ClockDisplay, { propsData: {minutes: 22} });

				expect(wrapper.text()).toEqual('00:22:00');
			});

			it('pads with zero one-digit-numbers', () => {
				const wrapper = shallowMount(ClockDisplay, { propsData: {minutes: 2} });

				expect(wrapper.text()).toEqual('00:02:00');
			});
		});

		describe('hours', () => {
			it('renders the hours on the left', () => {
				const wrapper = shallowMount(ClockDisplay, { propsData: {hours:11} });

				expect(wrapper.text()).toEqual('11:00:00');
			});

			it('pads with zero one-digit-numbers', () => {
				const wrapper = shallowMount(ClockDisplay, { propsData: {hours: 1} });

				expect(wrapper.text()).toEqual('01:00:00');
			});
		});
	});

	describe('when passed with invalid props\n\t (NaN or number out of range)', () => {
		let spy;

		beforeEach (() => {
			spy = jest.spyOn(console, 'error').mockImplementation((errMsg) => {
				return errMsg;
			});
		});
		
		afterEach (() => {
			spy.mockRestore();
		});

		describe('invalid seconds', () => {
			it('logs an error when `seconds` is not a number', () => {
				shallowMount(ClockDisplay, { propsData: {seconds: 'hi'} });

				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls[0][0]).toMatch('Expected Number, got String');
			});

			it('logs an error when `seconds` a number out of range 0-59', () => {
				shallowMount(ClockDisplay, { propsData: {seconds: 60} });

				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls[0][0]).toMatch('validator check failed');
			});
		});

		describe('invalid minutes', () => {
			it('logs an error when `minutes` is not a number', () => {
				shallowMount(ClockDisplay, { propsData: {minutes: 'hi'} });

				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls[0][0]).toMatch('Expected Number, got String');
			});

			it('logs an error when `minutes` a number out of range 0-59', () => {
				shallowMount(ClockDisplay, { propsData: {minutes: 60} });

				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls[0][0]).toMatch('validator check failed');
			});
		});

		describe('invalid hours', () => {
			it('logs an error when `hours` is not a number', () => {
				shallowMount(ClockDisplay, { propsData: {hours: 'hi'} });

				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls[0][0]).toMatch('Expected Number, got String');
			});

			it('logs an error when `hours` a number out of range 0-23', () => {
				shallowMount(ClockDisplay, { propsData: {hours: 24} });

				expect(spy).toHaveBeenCalledTimes(1);
				expect(spy.mock.calls[0][0]).toMatch('validator check failed');
			});
		});
	});
});

/*		
	import Vuex from 'vuex'
	import { createLocalVue } from '@vue/test-utils'
	const localVue = createLocalVue();
	localVue.use(Vuex);

	describe('', () => {
		let store;
			
		beforeEach(() => {
			store = new Vuex.Store({
				state: {
					clockSeconds: 0,
					clockMinutes: 0,
					clockHours: 0,
				},
				getters: {
					clockHours (state) {
						return padWithZero(state.clockHours);
					},
					clockMinutes (state) {
						return padWithZero(state.clockMinutes);
					},
					clockSeconds (state) {
						return padWithZero(state.clockSeconds);
					},
				}
			})
		}); 

		it('', () => {
			// const wrapper = shallowMount(ClockDisplay, { store, localVue });
		});
	});
*/
