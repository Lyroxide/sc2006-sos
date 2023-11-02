import UserService from '../services/user.service';
import GroupService from '../services/group.service.js';

const state = {
    groups: [],
};

const actions = {
    getGroupDetails(GroupID) {
        return GroupService.getGroupDetails(GroupID).then(
            response => {
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
    getOwnGroups({ rootState }) {
        let UserID = rootState.auth.user.id;
        return UserService.getOwnGroups(UserID).then(
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
    },
    createGroup({ rootState }, Group) {
        let UserID = rootState.auth.user.id;
        return GroupService.createGroup(UserID, Group).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    editGroup(Group) {
        return GroupService.editGroup(Group).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    deleteGroup(Group) {
        return GroupService.deleteGroup(Group).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    leaveGroup({ rootState }, Group) {
        let UserID = rootState.auth.user.id;
        return GroupService.leaveGroup(UserID, Group).then(
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