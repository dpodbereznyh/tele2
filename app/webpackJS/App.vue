<template>
	<div class="h-100">
		<stage-register v-if="stage === 1" />
		<stage-prequiz v-if="stage === 2" />
		<stage-quiz v-if="stage === 3" />
		<stage-special v-if="stage === 4" />
		<stage-final v-if="stage === 5" />
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	import StageRegister from './components/StageRetister';
	import StagePrequiz from './components/StagePrequiz';
	import StageQuiz from './components/StageQuiz';
	import StageSpecial from './components/StageSpecial';
	import StageFinal from './components/StateFinal';

	export default {
		name: 'app',

		components: {
			StageRegister,
			StagePrequiz,
			StageQuiz,
			StageSpecial,
			StageFinal,
		},

		computed: {
			...mapGetters({
				stage: 'stage',
			}),
		},
	}
</script>

<style>

</style>