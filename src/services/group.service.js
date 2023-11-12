import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from './docker.ip.js';

class GroupService {
    getAllGroups() {
        return axios.get(API_URL + 'groups', { headers: authHeader() });
    }

    getGroupDetails(GroupID) {

        return axios.get(API_URL + `groups/${GroupID}`, { headers: authHeader() });
    }

    createGroup(UserID, Group) {
        let data = { UserID, Group };
        return axios.post(API_URL + 'groups', data, { headers: authHeader() });
    }

    createGroupFoodPreference(GroupID, pref) {
        let data = { GroupID, pref };
        return axios.post(API_URL + 'group-food-preferences', data, { headers: authHeader() });
    }

    editGroupFoodPreference(GroupID, pref) {
        let data = { GroupID, pref };
        return axios.post(API_URL + 'group-food-preferences', data, { headers: authHeader() });
    }

    createGroupRegionPreference(GroupID, pref) {
        let data = { GroupID, pref };
        return axios.post(API_URL + 'group-region-preferences', data, { headers: authHeader() });
    }

    editGroupRegionPreference(GroupID, pref) {
        let data = { GroupID, pref };
        return axios.post(API_URL + 'group-region-preferences', data, { headers: authHeader() });
    }

    editGroup(Group) {
        return axios.put(API_URL + 'groups', Group, { headers: authHeader() });
    }

    deleteGroup(GroupID) {
        console.log(GroupID);
        return axios.delete(API_URL + `groups/${GroupID}`, { headers: authHeader()});
    }

    leaveGroup(UserID, GroupID) {
        console.log(UserID, GroupID)
        return axios.delete(API_URL + 'group-members', GroupID, { headers: authHeader() });
    }

    searchGroups(searchPayload) {
        return axios.post(API_URL + 'groups/search', searchPayload, { headers: authHeader() });
    }


}

export default new GroupService();