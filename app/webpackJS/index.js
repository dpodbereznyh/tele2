import Vue from 'vue';
import Axios from 'axios';
import { store } from './store';

Axios.defaults.xsrfHeaderName = "XSRF-TOKEN";

import App from './App';

global.Vue = Vue;
global.$axios = Axios;


window.$apiCreateInstance = () => {
	new Vue({
		el: '#app',
		store,
		render: h => h (App),
	});
};

window.$(function() {
	$(document).on('submit', '[data-role="beginRegister"]', async (event) => {
		event.preventDefault();

		const form = event.target;
		const phone = window.$(form.querySelector('[name="phone"]')).inputmask('unmaskedvalue');

		if (phone.length !== 10) { return; }

		const response = await Axios({
			method: 'get',
			url: '/assets/components/apitele2/action.php',
			params: {
				action: 'questions/get',
				phone,
			},
		});

		

		if (response.data && response.data.success && response.data.data.next) {
			store.dispatch('addUserField', {
				key: 'phone',
				value: `8${phone}`,
			});
			window.$apiCreateInstance();
		}
	});
});