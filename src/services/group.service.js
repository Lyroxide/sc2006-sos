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


}

export default new GroupService();