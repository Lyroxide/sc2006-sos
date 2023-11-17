import GroupService from '../services/group.service.js';
import UserService from '../services/user.service';

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
    getAllGroupMembers({ rootState }) {
        let GroupID = rootState.group.groups.GroupID;
        return GroupService.getAllGroupMembers(GroupID).then(
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
    // createGroup({ rootState }, Group) {
    //     let UserID = rootState.auth.user.id;
    //     return GroupService.createGroup(UserID, Group).then(
    //         response => {
    //             return Promise.resolve(response.data);
    //         },
    //         error => {
    //             return Promise.reject(error);
    //         }
    //     );
    // },

    createGroup({ rootState }, Group) {
        let UserID = rootState.auth.user.id;
        let formData = new FormData();
        formData.append('UserID', UserID);
        formData.append('GroupName', Group.GroupName);
        formData.append('GroupDesc', Group.GroupDesc);
        formData.append('foodPref', JSON.stringify(Group.foodPref));
        formData.append('regionPref', Group.regionPref);
        if (Group.selectedFile) {
            // console.log("selected file: ");
            // console.log(Group.selectedFile);
            // console.log("end selected file");
            formData.append('groupPicture', Group.selectedFile);
        }
        return GroupService.createGroup(formData).then(
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
    deleteGroup({rootState}) {
        let GroupID = rootState.group.groups.GroupID;
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
    searchGroups(_, searchPayload) {
        return GroupService.searchGroups(searchPayload).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    getGroupPictureFilePath({ commit }, groupId) {
        return GroupService.getGroupPicture(groupId).then(
            response => {
                //console.log(response.data)
                commit('SET_GROUP_PICTURE_FILE_PATH', { groupId, filePath:response.data.PictureFile });
                //console.log("Demons")
                //console.log(response.data.PictureFile);
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    }
    

};

import { toRaw } from 'vue';

const mutations = {
    groupsSuccess(state, groupDetails) {
        state.groups = groupDetails; // use singular if it's for a specific group's details
    },
    SET_GROUP_PICTURE_FILE_PATH(state, { groupId, filePath }) {
        const rawGroups = toRaw(state.groups);
        if (Array.isArray(rawGroups)) {
            const group = rawGroups.find(group => group.GroupID === groupId);
            if (group) {
                group.pictureFilePath = filePath;
            }
        }
    }
}

export const group = {
    namespaced: true,
    state,
    actions,
    mutations
};