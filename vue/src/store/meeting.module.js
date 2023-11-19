import MeetingService from '../services/meeting.service';

const state = {
    meetings: [],
};

const actions = {
    getMeeting({ commit }, GroupID) {
        return MeetingService.getMeeting(GroupID).then(
            response => {
                console.log(response.data);
                commit('meetingSuccess', response.data);
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    createMeeting({ rootState }, Meeting) {
        let GroupID = rootState.group.groups.GroupID;
        return MeetingService.createMeeting(GroupID, Meeting).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    editMeeting({ rootState }, Meeting) {
        let GroupID = rootState.group.groups.GroupID;
        return MeetingService.editMeeting(GroupID, Meeting.MeetingID, Meeting).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    }
};

const mutations = {
    meetingSuccess(state, meetings) {
        state.meetings = meetings;
    },
};

export const meeting = {
    namespaced: true,
    state,
    actions,
    mutations
};