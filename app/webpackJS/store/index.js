import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		stage: 1,
		user: {},
		answers: [],
		skill: '',
		specialAnswers: {},
	},

	getters: {
		stage: (state) => state.stage,
		user: (state) => state.user,
		answers: (state) => state.answers,
		skill: (state) => state.skill,
		specialAnswers: (state) => state.specialAnswers,
		user: (state) => state.user,
	},

	mutations: {
		SET_STAGE (state, stage) {
			state.stage = stage;
		},
		ADD_USER_FIELD (state, { key, value }) {
			Vue.set(state.user, key, value);
		},
		ADD_ANSWER (state, answer) {
			state.answers.push(answer);
		},
		ADD_SPECIAL_ANSWER (state, { key, value }) {
			Vue.set(state.specialAnswers, key, value);
		},
		SET_SKILL (state, value) {
			state.skill = value;
		},
		SET_USER (state, user) {
			Vue.set(state, 'user', user);
		},
	},

	actions: {
		setStage ({ commit }, stage) {
			commit('SET_STAGE', stage);
		},
		addUserField ({ commit }, { key, value }) {
			commit('ADD_USER_FIELD', {
				key,
				value,
			});
		},
		addAnswer ({ commit }, answer) {
			commit('ADD_ANSWER', answer);
		},
		addSpecialAnswer ({ commit }, { key, value }) {
			commit('ADD_SPECIAL_ANSWER', {
				key,
				value,
			});
		},
		setSkill ({ commit }, value) {
			commit('SET_SKILL', value);
		},
		setUser ({ commit }, user) {
			commit('SET_USER', user);
		},
	},
});

export { store };
