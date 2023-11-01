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
    getAllRegionalPreferences() {
        return PreferenceService.getAllRegionalPreferences().then(
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