import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from './docker.ip.js';

class MeetingService {
    getMeeting(GroupID) {
        return axios.get(API_URL + `meetings/groups/${GroupID}`,{ headers: authHeader() });
    }

    createMeeting(Group) {
        return axios.post(API_URL + 'meetings', Group, { headers: authHeader() });
    }

    /*editMeeting(GroupID, Meeting) {
        return axios.put(API_URL + `meetings/groups/${GroupID}`, Meeting, { headers: authHeader() });
    } */
    editMeeting(GroupID, MeetingID, Meeting) {
        return axios.put(API_URL + `meetings/${MeetingID}`, Meeting, { headers: authHeader() });
    }
}

export default new MeetingService();