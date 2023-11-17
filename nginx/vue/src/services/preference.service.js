import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from './docker.ip.js';

class PreferenceService {
    getAllFoodPreferences() {
        return axios.get(API_URL + 'food-preferences', { headers: authHeader() });
    }

    getAllRegionalPreferences() {
        return axios.get(API_URL + 'regional-preferences', { headers: authHeader() })
    }
}

export default new PreferenceService();