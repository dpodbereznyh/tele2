import Vue from 'vue';
import Axios from 'axios';
import { store } from './store';
import { insertMarkup } from './utils';

Axios.defaults.xsrfHeaderName = "XSRF-TOKEN";

import App from './App';

global.Vue = Vue;
global.$axios = Axios;

let contentFetched = false;
let savedPhone = null;


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

		const phoneFormatted = `8${phone}`;
		if (phoneFormatted === savedPhone) { return; }

		savedPhone = phoneFormatted;

		const response = await Axios({
			method: 'get',
			url: '/assets/components/apitele2/action.php',
			params: {
				action: 'questions/get',
				phone: phoneFormatted,
			},
		});
		

		if (response.data && response.data.success && response.data.data.next) {
			store.dispatch('addUserField', {
				key: 'phone',
				value: phoneFormatted,
			});
			window.$apiCreateInstance();
		} else {
			if (contentFetched) { return; }

			const markupResponse = await Axios({
				method: 'get',
				url: '/assets/components/apitele2/action.php',
				params: {
					action: 'content/get',
					phone: phoneFormatted,
				},
			});

			if (markupResponse.data.success && markupResponse.data.data.html) {
				const markup = markupResponse.data.data.html;
				insertMarkup(markup);
				contentFetched = true;
			}

			const button = document.querySelector('[data-role="beginRegister"] button[type="submit"]');
			if (button) {
				button.classList.add('js-scroll-content');
			}
		}
	});
});