<template>
	<div class="main-screen__form_second">
		<form
			class="main-screen__form_second_wrap"
			@submit.prevent="onSubmit"
		>
			<input type="text" name="surname" placeholder="Фамилия" required class="main-screen__form_input main-screen__form_input-second">
			<input type="text" name="name" placeholder="Имя" required class="main-screen__form_input main-screen__form_input-second">
			<input type="email" name="email" placeholder="Email" required class="main-screen__form_input main-screen__form_input-second">
			<input type="text" name="city" placeholder="Город" required class="main-screen__form_input">
			<button type="submit" class="main-screen__form_btn btn TextP">
				Регистрация
			</button>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'stage-register',

		methods: {
			onSubmit (event) {
				const form = event.target;
				const formData = new FormData(form);

				for (var key of formData.keys()) {
					this.$store.dispatch('addUserField', {
						key,
						value: formData.get(key),
					});
				}

				this.$store.dispatch('setStage', 2);
			},
		},
	}
</script>

<style>

</style>