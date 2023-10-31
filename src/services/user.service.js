import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getGroupDetails() {
        return axios.get(API_URL + 'group', { headers: authHeader() });
    }

    joinGroup(GroupID, UserID) {
        let data = { GroupID, UserID }
        return axios.post(API_URL + `group-members`, data, {headers: authHeader()});
    }

}

export default new UserService();