import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';


class AuthService {

    login(user) {
        return axios
            .post(API_URL + "auth/users", {
                username: user.username,
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
