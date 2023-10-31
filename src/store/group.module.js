import UserService from '../services/user.service';
import GroupService from '../services/group.service.js';

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
    joinGroup({ rootState }, GroupID) {
        let UserID = rootState.auth.user.id;
        return UserService.joinGroup(GroupID, UserID).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    getAllGroups() {
        return GroupService.getAllGroups().then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        )
    }
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