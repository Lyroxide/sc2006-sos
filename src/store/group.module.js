import UserService from '../services/user.service';

const state = {
    groups: [],
};

const actions = {
    getGroupDetails({ commit }) {
        return UserService.getGroupDetails().then(
            response => {
                commit('groupsSuccess', response.data);
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    joinGroup(_, groupId) {
        return UserService.joinGroup(groupId).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
};

const mutations = {
    groupsSuccess(state, groups) {
        state.groups = groups;
    },
};

export const group = {
    namespaced: true,
    state,
    actions,
    mutations
};