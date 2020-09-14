<template>
	<div class="main-screen__form_final">
		<p class="main-screen__form_final_title DisplayH6">
			Спасибо за регистрацию,<br> {{ user.name }}!
		</p>
		<!-- <p class="main-screen__form_final_skill StencilH5">
			{{ skill }}
		</p> -->
		<p class="main-screen__form_description TextP">
      Скоро ты узнаешь скилл, который будешь прокачивать на конференции, а пока скачивай Telegram. Самую важную информацию ты будешь получать именно там. Команда организаторов самостоятельно добавит тебя в Telegram-канал, в котором ты получишь подробную инструкцию.		</p>
		<!-- <p class="main-screen__form_description TextP">
			Как прокачать скилл? Участвуй во всех активностях, присылай доказательства выполнения заданий в Telegram и получай баллы. Награда ждёт тебя!
		</p> -->
		<button 
			class="main-screen__form_btn btn TextP"
			@click.prevent="getContent"	
		>
			Что дальше?
		</button>
		<ul class="main-screen__form_links">
			<!-- <li class="main-screen__form_link main-screen__telegram">
				Скачать Telegram
			</li> -->
			<li class="main-screen__form_link main-screen__google-play">
				<a href="https://play.google.com/store/apps/details?id=org.telegram.messenger" target="_blank" rel="noopener noreferrer nofollow">
					<img src="/assets/app/img/main-screen/main-screen-form/google-play-badge.png" alt="image">
				</a>
			</li>
			<li class="main-screen__form_link main-screen__app-store order-3">
				<a href="https://apps.apple.com/ru/app/telegram-messenger/id686449807" target="_blank" rel="noopener noreferrer nofollow">
					<img src="/assets/app/img/main-screen/main-screen-form/app-store.svg" alt="image">
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import Axios from 'axios';
	import { mapGetters } from 'vuex';
	import { insertMarkup } from '../utils';

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
					params.extra_answers = JSON.stringify(this.specialAnswers);
				}

				const response = await Axios({
					method: 'get',
					url: '/assets/components/apitele2/action.php',
					params,
				});

				if (response.data.success && response.data.data.html) {
					const markup = response.data.data.html;
					insertMarkup(markup);
					this.inserted = true;
				}
			},
		},
	}
</script>

<style>

</style>