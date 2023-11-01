import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from './docker.ip.js';

class GroupService {
    getAllGroups() {
        return axios.get(API_URL + 'groups', { headers: authHeader() });
    }

    createGroup(UserID, Group) {
        let data = { UserID, Group };
        return axios.post(API_URL + 'groups', data, { headers: authHeader() });
    }

    editGroup(Group) {
        return axios.put(API_URL + 'groups', Group, { headers: authHeader() });
    }

    deleteGroup(Group) {
        return axios.delete(API_URL + 'groups', Group, { headers: authHeader()});
    }

    leaveGroup(UserID, Group) {
        return axios.delete(API_URL + 'group-members', Group, { headers: authHeader() });
    }

}

export default new GroupService();