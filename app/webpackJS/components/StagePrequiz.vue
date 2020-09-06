<template>
	<div class="main-screen__form_third">
		<div class="main-screen__form_third-slogan-wrap">
			<p class="main-screen__form_third-slogan StencilH3 purple">
				МЕЧТАЙ СМЕЛО
			</p>
			<p class="main-screen__form_third-slogan StencilH3 red">
				ПРИМИ ВЫЗОВ
			</p>
			<p class="main-screen__form_third-slogan StencilH3 yellow">
				СМОТРИ ПО-НОВОМУ
			</p>
			<p class="main-screen__form_third-slogan StencilH3 green">
				БУДЬ ОТКРЫТЫМ
			</p>
			<p class="main-screen__form_third-slogan StencilH3 pink">
				ДУМАЙ БЫСТРО
			</p>
		</div>
		<p class="main-screen__form_description TextP">
			Вся конференция — ода этим 5 скиллам. Они расширяют границы твоего сознания и позволяют действовать out of the box.
		</p>
		<p class="main-screen__form_description TextP">
			Хочешь узнать, какой скилл в твоей зоне развития? Тогда жми на кнопку «Пройти тест»‎. Отвечай честно и быстро!
		</p>
		<button 
			class="main-screen__form_btn btn TextP"
			@click.prevent="launchQuiz"
		>
			Пройти тест
		</button>
	</div>
</template>

<script>
	export default {
		name: 'stage-prequiz',

		methods: {
			launchQuiz () {
				this.$store.dispatch('setStage', 3);
			},
		},
	}
</script>

<style>

</style>