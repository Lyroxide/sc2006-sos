import axios from 'axios';
import { API_URL } from './docker.ip.js';


class AuthService {

    login(user) {
        return axios
            .post(API_URL + "auth/users", {
                loginInput: user.loginInput,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + "users", {
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            age: user.age,
            gender: user.gender
        });
    }
}

export default new AuthService();
