import PreferenceService from '../services/preference.service.js';

const actions = {
    getAllFoodPreferences() {
        return PreferenceService.getAllFoodPreferences().then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    getAllRegionPreferences() {
        return PreferenceService.getAllRegionPreferences().then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
};



export const preference = {
    namespaced: true,
    actions,
};