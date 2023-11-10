import ChatMessageService from '../services/chatmessage.service.js';

const actions = {
    getAllChatMessages({ rootState }) {
        let GroupID = rootState.group.groups.GroupID;
        return ChatMessageService.getAllChatMessages(GroupID).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
    sendChatMessage({ rootState }, Message) {
        let UserID = rootState.auth.user.id;
        let GroupID = rootState.group.groups.GroupID;
        return ChatMessageService.sendChatMessage(UserID, GroupID, Message).then(
            response => {
                return Promise.resolve(response.data);
            },
            error => {
                return Promise.reject(error);
            }
        );
    },
};



export const chatMessage = {
    namespaced: true,
    actions,
};