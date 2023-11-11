import UserService from '../services/user.service';

const state = JSON.parse(localStorage.getItem('user'));

const actions = {
    getUserDetails({ rootState }) {
        let UserID = rootState.auth.user.id;
        return UserService.getUserDetails(UserID).then(
            response => {
                console.log(response.data);
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
    getUserRegionPreferences({ rootState }) {
        let UserID = rootState.auth.user.id;
        return UserService.getUserRegionPreferences(UserID).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        )
    },
    editUserRegionPreferences({ rootState }, pref) {
        let UserID = rootState.auth.user.id;
        return UserService.editUserRegionPreferences(UserID, pref).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        )
    },
    updateUserPassword({ rootState }, newPassword) {
        let UserID = rootState.auth.user.id;
        return UserService.updateUserPassword(UserID, newPassword).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    
    checkCurrentPassword({ rootState }, hashedPassword) {
        let UserID = rootState.auth.user.id;
        return UserService.checkCurrentPassword(UserID, hashedPassword).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
            );
    },
    /*
    hashPassword({ rootState }, password) {
        let UserID = rootState.auth.user.id;
        return UserService.hashPassword(UserID, password).then(
            response => {
            return Promise.resolve(response.data);
            },
            error => {
            return Promise.reject(error);
            }
        );
    },
    */
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