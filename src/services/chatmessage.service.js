import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from './docker.ip.js';

class ChatMessageService {
    getAllChatMessages(GroupID) {
        return axios.get(API_URL + `messages/${GroupID}`,{ headers: authHeader() });
    }

    sendChatMessage(UserID, GroupID, Message) {
        let data = { UserID, GroupID, Message }
        console.log(data);
        return axios.post(API_URL + `messages`, data, { headers: authHeader() });
    }
}

export default new ChatMessageService();