import { shallowMount } from '@vue/test-utils'
import TwoDigitsDisplay from '@/components/TwoDigitsDisplay.vue';

describe('TwoDigitsDisplay', () => {
	describe('Default Rendering (no-props)', () => {
		it('renders two zeros "00"', () => {
			const wrapper = shallowMount(TwoDigitsDisplay, { propsData: {} });

			expect(wrapper.text()).toMatch('00');
		});
	});

	describe('prop: number', () => {
		describe('a valid number 0-99', () => {
			it('displays the number', () => {
				const wrapper = shallowMount(TwoDigitsDisplay, { propsData: {number: 7} });
	
				expect(wrapper.text()).toMatch('7');
			});
			
			it('pads one digit numbers with a zero', () => {
				const wrapper = shallowMount(TwoDigitsDisplay, { propsData: {number: 7} });
	
				expect(wrapper.text()).toEqual('07');
			});
		});

		describe('invalid number', () => {
			let errorSpy;
			let warnSpy;

			beforeEach (() => {
				errorSpy = jest.spyOn(console, 'error').mockImplementation((errMsg) => {
					return errMsg;
				});

				warnSpy = jest.spyOn(console, 'warn').mockImplementation((warnMsg) => {
					return warnMsg;
				});
			});
			
			afterEach (() => {
				errorSpy.mockRestore();
				warnSpy.mockRestore();
			});

			it('logs an error when `number` is not a number', () => {
				shallowMount(TwoDigitsDisplay, { propsData: {number: "6"} });

				expect(errorSpy).toHaveBeenCalledTimes(1);
				expect(errorSpy.mock.calls[0][0]).toMatch('Expected Number, got String');
			});

			it('logs an error when `number` a number out of range 0-99', () => {
				shallowMount(TwoDigitsDisplay, { propsData: {number: 100} });

				expect(errorSpy).toHaveBeenCalledTimes(1);
				expect(errorSpy.mock.calls[0][0]).toMatch('validator check failed');

				expect(warnSpy).toHaveBeenCalledTimes(1);
				expect(warnSpy.mock.calls[0][0]).toMatch('out of range 0-99');
			});
		});
		
	});

	describe('onClick', () => {
		it('runs its clickHandler', () => {
			const wrapper = shallowMount(TwoDigitsDisplay);

			wrapper.trigger('click');
			
			expect(wrapper.emitted().click).toBeTruthy();
		});
	});
});
