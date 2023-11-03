import UserService from '../services/user.service';

const state = JSON.parse(localStorage.getItem('user'));

const actions = {
    getUserDetails({ rootState }) {
        let UserID = rootState.auth.user.id;
        return UserService.getUserDetails(UserID).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    editUserDetails({ rootState }, { commit }, user) {
        let UserID = rootState.auth.user.id;
        return UserService.editUserDetails(UserID, user).then(
            response => {
                commit('editSuccess');
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        )
    },
    getUserFoodPreferences({ rootState }) {
        let UserID = rootState.auth.user.id;
        return UserService.getUserFoodPreferences(UserID).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        )
    },
    editUserFoodPreferences({ rootState }, pref) {
        let UserID = rootState.auth.user.id;
        return UserService.editUserFoodPreferences(UserID, pref).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        )
    },
    getUserRegionalPreferences({ rootState }) {
        let UserID = rootState.auth.user.id;
        return UserService.getUserRegionalPreferences(UserID).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        )
    },
    editUserRegionalPreferences({ rootState }, pref) {
        let UserID = rootState.auth.user.id;
        return UserService.editUserRegionalPreferences(UserID, pref).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        )
    },
};

const mutations = {
    editSuccess(state, user) {
        state.user = user;
    },
};

export const user = {
    namespaced: true,
    state,
    actions,
    mutations
};