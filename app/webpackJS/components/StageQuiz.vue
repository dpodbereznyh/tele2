<template>
	<form 
		class="main-screen__form_questions"
		@submit.prevent="handleAnswer"
	>
		<p class="main-screen__form_questions_title DisplayH6">
			Вопрос {{ activeQuestion }} / {{ Object.keys(questions).length }}
		</p>
		<div 
			class="main-screen__form_questions_image"
			v-if="questions[activeQuestion] && questions[activeQuestion].image"
		>
			<img 
				:src="questions[activeQuestion].image" 
				alt="image"
			>
		</div>
		<p 
			class="main-screen__form_description TextH4"
			v-if="questions[activeQuestion] && questions[activeQuestion].title"
		>
			{{ questions[activeQuestion].title }}
		</p>
		<div class="main-screen__form_questions-wrap">
			<label
				class="main-screen__form_questions_label TextVerySmall"
				v-for="(item, index) in questions[activeQuestion].answers"
				:key="index"
				:for="`answer:${index}`"
			>
				<input
					:id="`answer:${index}`"
					type="radio"
					name="answer"
					class="main-screen__form_questions_input"
					v-model="currentAnswer"
					:value="item"
				>
				<span>{{ item }}</span>
			</label>
		</div>
		<button type="submit" class="main-screen__form_btn main-screen__form_btn-questions btn TextP">
			Далее
		</button>
	</form>
</template>

<script>
	import Axios from 'axios';
	import { mapGetters } from 'vuex';

	export default {
		name: 'stage-quiz',

		data () {
			return {
				activeQuestion: 1,
				currentAnswer: '',
				questions: {
					1: {
						title: 'Я без труда могу представить образ несуществующего предмета или явления.',
						answers: [
							'Да',
							'Испытываю некоторые трудности',
							'Не всегда',
							'Нет',
						],
					},
					2: {
						title: 'На этой картинке человек бежит  к тебе или от тебя?',
						image: '/assets/app/img/main-screen/main-screen-form/image3.jpg',
						answers: [
							'Ко мне',
							'От меня',
						],
					},
				},
			}
		},

		computed: {
			...mapGetters({
				user: 'user',
				answers: 'answers',
			}),
		},

		methods: {
			async handleAnswer () {
				if (!this.currentAnswer) { return; }
				
				this.$store.dispatch('addAnswer', {
					key: this.activeQuestion,
					value: this.currentAnswer,
				});

				// Next answer
				if (this.activeQuestion !== Object.keys(this.questions).length) {
					this.activeQuestion += 1;
					this.currentAnswer = '';
				} else {
					// Regiser
					const params = {
						action: 'users/register',
						...this.user,
						answers: JSON.stringify(this.answers),
					};

					const response = await Axios({
						method: 'get',
						url: '/assets/components/apitele2/action.php',
						params,
					});

					if (!response.data.success || !response.data.data) {
						return;
					}

					this.$store.dispatch('setSkill', response.data.data.team.name);

					console.log(typeof response.data.data.team.special_answer);

					// Launch specail questions
					if (response.data.data.team.special_answer) {
						this.$store.dispatch('setStage', 4);
					} else {
						this.$store.dispatch('setStage', 5);
					}
				}
				
			},
		},
	}
</script>

<style>

</style>