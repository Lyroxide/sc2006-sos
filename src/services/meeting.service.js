import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from './docker.ip.js';

class MeetingService {
    getMeeting(GroupID) {
        return axios.get(API_URL + `meetings/groups/${GroupID}`,{ headers: authHeader() });
    }

    createMeeting(GroupID, Meeting) {
        let data = { GroupID, Meeting }
        return axios.post(API_URL + 'meetings', data, { headers: authHeader() });
    }

    editMeeting(GroupID, MeetingID, Meeting) {
        return axios.put(API_URL + `meetings/${MeetingID}`, Meeting, { headers: authHeader() });
    }
}

export default new MeetingService();