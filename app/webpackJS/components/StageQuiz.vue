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
						title: 'Выбери, что тебе ближе:',
						answers: [
							'Плыть по течению',
							'Жить по своим правилам',
						],
					},
					2: {
						title: 'Ты легко можешь представить себе будущее, в котором все домашние роботы подключены к сети Tele2?',
						answers: [
							'Да',
							'Испытываю некоторые трудности',
							'Нет',
							'Что за ерунда. Какие роботы?',
						],
					},
					3: {
						title: 'Хотел бы ты совершить кругосветное путешествие на круизном лайнере?',
						answers: [
							'С удовольствием',
							'Нет. Это очень долго',
							'Нет. У меня морская болезнь',
						],
					},
					4: {
						title: 'Вспомни количество sim-карт в рекламе с нашим Боссом',
						answers: [
							'20-30',
							'31-40',
							'41-50',
							'51-60',
						],
					},
					5: {
						title: 'Представь, что ты уходишь от погони, и единственным выходом является полуразрушенный деревянный мост через реку. Сможешь ли ты пройти по нему?',
						answers: [
							'Нет, я лучше сдамся',
							'Рискну жизнью, если нет другого выхода',
							'Конечно, уже чувствую прилив адреналина!',
						],
					},
					6: {
						title: 'С чем у тебя ассоциируется Tele2?',
						answers: [
							'Другие правила',
							'Лучший мобильный оператор на Земле',
							'Чёрно-белые фотографии',
							'Стихотворные ролики по ТВ',
						],
					},
					7: {
						title: 'Цвет твоего настроения:',
						answers: [
							'Быстрый маджента',
							'Открытый тиффани',
							'По-новому зелёный',
							'Решительный оранжевый',
							'Мечтательный фиолетовый',
						],
					},
					8: {
						title: 'Заплываешь ли ты за буйки?',
						answers: [
							'Конечно',
							'Никогда',
							'Я не умею плавать',
						],
					},
					9: {
						title: 'В каком возрасте ты освоил езду на велосипеде?',
						answers: [
							'3-9',
							'9-15',
							'15-30',
							'Я до сих пор не умею',
						],
					},
					10: {
						title: 'Какое чувство у тебя вызывает 5G?',
						answers: [
							'Опасение…',
							'Гордость за человечество',
							'Мотивация на прогресс',
							'Эстетическое наслаждение',
						],
					},
					11: {
						title: 'Как часто ты мечтал о поездке в Сочи на карантине?',
						answers: [
							'Ни разу такого не было',
							'Частенько',
							'Почти каждый день',
						],
					},
					12: {
						title: 'Выбери фразу, которая бросилась тебе в глаза первой?',
						answers: [
							'Будь открытым',
							'Мечтай смело',
							'Прими вызов',
							'Смотри по-новому',
							'Думай быстро',
							'Выходи за рамки',
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
					num: this.activeQuestion,
					question: this.questions[this.activeQuestion].title,
					answer: this.currentAnswer,
				});

				// Next answer
				if (this.activeQuestion !== Object.keys(this.questions).length) {
					this.activeQuestion += 1;
					this.currentAnswer = '';
          this.currentAnswerId = '';
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

					this.$store.dispatch('setUser', response.data.data.user);

					// Launch specail questions
					// if (response.data.data.team.special_answer) {
					// 	this.$store.dispatch('setStage', 4);
					// } else {
					// 	this.$store.dispatch('setStage', 5);
					// }

					// Now always last step is next
					this.$store.dispatch('setStage', 5);
				}
				
			},
		},
	}
</script>

<style>

</style>