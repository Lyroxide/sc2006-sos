import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from './docker.ip.js';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserDetails(UserID) {
        return axios.get(API_URL + `users/${UserID}`, { headers: authHeader() });
    }

    editUserDetails(UserID, user) {
        return axios.put(API_URL + `users/${UserID}`, user, { headers: authHeader() });
    }

    getUserFoodPreferences(UserID) {
        return axios.get(API_URL + `user-food-preferences/${UserID}`, { headers: authHeader() });
    }

    editUserFoodPreferences(UserID, pref) {
        let data = { UserID, pref }
        return axios.put(API_URL + 'user-food-preferences', data, { headers: authHeader() });
    }

    getUserRegionalPreferences(UserID) {
        return axios.get(API_URL + `user-regional-preferences/${UserID}`, { headers: authHeader() });
    }

    editUserRegionalPreferences(UserID, pref) {
        let data = { UserID, pref }
        return axios.put(API_URL + 'user-regional-preferences', data, { headers: authHeader() });
    }

    getGroupDetails(UserID) {
        return axios.get(API_URL + 'groups', { headers: authHeader() });
    } //still unsure how to tackle this get request

    joinGroup(GroupID, UserID) {
        let data = { GroupID, UserID }
        return axios.post(API_URL + `group-members`, data, {headers: authHeader()});
    }

    getOwnGroups(UserID) {
        return axios.get(API_URL + `group-members/user/${UserID}`,{ headers: authHeader() });
    }

}

export default new UserService();