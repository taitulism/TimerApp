import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.directive('scroll', {
	inserted: (elm, binding) => {
		const fn = (ev) => {
			if (binding.value(ev, elm)) {
				window.removeEventListener('scroll', fn);
			}
		}

		window.addEventListener('scroll', fn);
	}
});

new Vue({
	store,
	render: html => html(App)
}).$mount('#app')
