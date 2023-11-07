import User from './User.js';
import Group from './Group.js';
import RegionPreference from './RegionPreference.js';
import FoodPreference from './FoodPreference.js';
import UserFoodPreference from './UserFoodPreference.js';
import UserRegionPreference from './UserRegionPreference.js';
//import GroupChat from './GroupChat.js';
//import GroupChatMessages from './GroupChatMessages.js';
import GroupMember from './GroupMember.js';
import GroupPicture from './GroupPicture.js';
import GroupFoodPreference from './GroupFoodPreference.js';
import GroupRegionPreference from './GroupRegionPreference.js';
import Meeting from './Meeting.js';
import Location from './Location.js';

export const setupAssociations = () => {
    User.hasMany(UserFoodPreference, { foreignKey: 'UserID' });
    UserFoodPreference.belongsTo(User, { foreignKey: 'UserID' });

    User.hasMany(UserRegionPreference, { foreignKey: 'UserID' });
    UserRegionPreference.belongsTo(User, { foreignKey: 'UserID' });


    User.hasMany(GroupMember, { foreignKey: 'UserID' });
    GroupMember.belongsTo(User, { foreignKey: 'UserID' });

    //User.hasMany(GroupChat, { foreignKey: 'UserID' });
    //GroupChat.belongsTo(User, { foreignKey: 'UserID' });

    //User.hasMany(GroupChatMessages, { foreignKey: 'UserID' });
    //GroupChatMessages.belongsTo(User, { foreignKey: 'UserID' });

    Group.hasMany(GroupMember, { foreignKey: 'GroupID' });
    GroupMember.belongsTo(Group, { foreignKey: 'GroupID' });

    Group.hasOne(GroupPicture, { foreignKey: 'GroupID' });
    GroupPicture.belongsTo(Group, { foreignKey: 'GroupID' });

    Group.hasMany(GroupFoodPreference, { foreignKey: 'GroupID' });
    GroupFoodPreference.belongsTo(Group, { foreignKey: 'GroupID' });

    Group.hasMany(GroupRegionPreference, { foreignKey: 'GroupID' });
    GroupRegionPreference.belongsTo(Group, { foreignKey: 'GroupID' });

    //Group.hasMany(GroupChat, { foreignKey: 'GroupID' });
    //GroupChat.belongsTo(Group, { foreignKey: 'GroupID' });

    Group.hasMany(Meeting, { foreignKey: 'GroupID' });
    Meeting.belongsTo(Group, { foreignKey: 'GroupID' });

    Meeting.hasOne(Location, { foreignKey: 'MeetingID' });
    Location.belongsTo(Meeting, { foreignKey: 'MeetingID' });

    FoodPreference.hasMany(UserFoodPreference, { foreignKey: 'FoodPreferenceID' });
    UserFoodPreference.belongsTo(FoodPreference, { foreignKey: 'FoodPreferenceID' });

    RegionPreference.hasMany(UserRegionPreference, { foreignKey: 'RegionPreferenceID' });
    UserRegionPreference.belongsTo(RegionPreference, { foreignKey: 'RegionPreferenceID' });

    FoodPreference.hasMany(GroupFoodPreference, { foreignKey: 'FoodPreferenceID' });
    GroupFoodPreference.belongsTo(FoodPreference, { foreignKey: 'FoodPreferenceID' });

    RegionPreference.hasMany(GroupRegionPreference, { foreignKey: 'RegionPreferenceID' });
    GroupRegionPreference.belongsTo(RegionPreference, { foreignKey: 'RegionPreferenceID' });

    //GroupChat.hasMany(GroupChatMessages, { foreignKey: 'GroupChatID' });
    //GroupChatMessages.belongsTo(GroupChat, { foreignKey: 'GroupChatID' });
};