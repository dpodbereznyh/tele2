<template>
	<div class="main-screen__form_second">
		<form
			class="main-screen__form_second_wrap w-100"
			@submit.prevent="onSubmit"
		>	
			<div>
				<p>
					Введите свой размер одежды
				</p>
				<input type="text" name="clothes_size" placeholder="(например: S, M, L, XL, XXL)" required class="main-screen__form_input main-screen__form_input-second">
			</div>
			<div>
				<input type="text" name="shoe_size" placeholder="размер обуви" required class="main-screen__form_input main-screen__form_input-second">
			</div>
			<button type="submit" class="main-screen__form_btn btn TextP">
				Дальше
			</button>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'stage-special',

		methods: {
			onSubmit (event) {
				const form = event.target;
				const formData = new FormData(form);

				for (var key of formData.keys()) {
					this.$store.dispatch('addSpecialAnswer', {
						key,
						value: formData.get(key),
					});
				}

				this.$store.dispatch('setStage', 5);
			},
		},
	}
</script>

<style>

</style>