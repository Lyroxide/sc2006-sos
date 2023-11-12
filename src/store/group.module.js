import UserService from '../services/user.service';
import GroupService from '../services/group.service.js';

const state = {
    groups: [],
};

const actions = {
    async getGroupDetails({ commit }, GroupID) {
        try {
            const response = await GroupService.getGroupDetails(GroupID);
            commit('groupsSuccess', response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
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
    createGroupFoodPreference(_, { GroupID, pref }) {
        return GroupService.createGroupFoodPreference(GroupID, pref).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    editGroupFoodPreference({ rootState }, pref) {
        let GroupID = rootState.group.groups.GroupID;
        return GroupService.editGroupFoodPreference(GroupID, pref).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    createGroupRegionPreference(_, { GroupID, pref }) {
        return GroupService.createGroupRegionPreference(GroupID, pref).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    editGroupRegionPreference({ rootState }, pref) {
        let GroupID = rootState.group.groups.GroupID;
        return GroupService.editGroupRegionPreference(GroupID, pref).then(
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
    deleteGroup(GroupID) {
        console.log(GroupID);
        return GroupService.deleteGroup(GroupID).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    leaveGroup({ rootState }, GroupID) {
        let UserID = rootState.auth.user.id;
        return GroupService.leaveGroup(UserID, GroupID).then(
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
    groupsSuccess(state, groupDetails) {
        state.groups = groupDetails; // use singular if it's for a specific group's details
    },
}

export const group = {
    namespaced: true,
    state,
    actions,
    mutations
};