import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class GroupService {
    getAllGroups() {
        return axios.get(API_URL + 'groups', { headers: authHeader() });
    }

}

export default new GroupService();