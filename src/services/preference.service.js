import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from './docker.ip.js';

class PreferenceService {
    getAllFoodPreferences() {
        return axios.get(API_URL + 'food-preferences', { headers: authHeader() });
    }

    getAllRegionPreferences() {
        return axios.get(API_URL + 'region-preferences', { headers: authHeader() })
    }
}

export default new PreferenceService();