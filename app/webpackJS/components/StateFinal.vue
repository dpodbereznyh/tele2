<template>
	<div class="main-screen__form_final">
		<p class="main-screen__form_final_title DisplayH6">
			Спасибо за регистрацию,<br> {{ user.name }}! Твой скилл:
		</p>
		<p class="main-screen__form_final_skill StencilH5">
			{{ skill }}
		</p>
		<p class="main-screen__form_description TextP">
			Прокачивай его на конференции, но не забывай про остальные навыки. За развитие своего скилла ты получаешь двойной бонус.
		</p>
		<p class="main-screen__form_description TextP">
			Как прокачать скилл? Участвуй во всех активностях, присылай доказательства выполнения заданий в Telegram и получай баллы. Награда ждёт тебя!
		</p>
		<ul class="main-screen__form_links">
			<li class="main-screen__form_link main-screen__telegram">
				<a href="#" class="TextVerySmall">
					Скачать Telegram
				</a>
			</li>
			<li class="main-screen__form_link main-screen__google-play">
				<a href="#" >
					<img src="/assets/app/img/main-screen/main-screen-form/google-play.svg" alt="image">
				</a>
			</li>
			<li class="main-screen__form_link main-screen__app-store order-3">
				<a href="#">
					<img src="/assets/app/img/main-screen/main-screen-form/app-store.svg" alt="image">
				</a>
			</li>
		</ul>
		<button 
			class="main-screen__form_btn btn TextP"
			@click.prevent="getContent"	
		>
			Что дальше?
		</button>
	</div>
</template>

<script>
	import Axios from 'axios';
	import { mapGetters } from 'vuex';

	export default {
		name: 'stage-final',

		data () {
			return {
				inserted: false,
			}
		},

		computed: {
			...mapGetters({
				user: 'user',
				skill: 'skill',
				specialAnswers: 'specialAnswers',
			}),
		},

		methods: {
			async getContent () {
				if (this.inserted) { return; }

				const params = {
					action: 'content/get',
					phone: this.user.phone,
				};

				if (Object.keys(this.specialAnswers).length > 0) {
					params.special_answer = JSON.stringify(this.specialAnswers);
				}

				const response = await Axios({
					method: 'get',
					url: '/assets/components/apitele2/action.php',
					params,
				});

				if (response.data.success && response.data.data.html) {
					const anchor = document.getElementsByClassName('js-content')[0];
					
					// function insertAfter(newNode, referenceNode) {
					// 	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
					// }
					ac.innerHTML = response.data.data.html;

					this.inserted = true;
				}
			},
		},
	}
</script>

<style>

</style>