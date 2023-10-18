/*======================================================*/
/*								                                      */
/*  Database Script for setting up the database         */
/*								                                      */
/*======================================================*/
DROP Database LetsMakanTogether

Create Database LetsMakanTogether
GO

Use LetsMakanTogether
GO


/***************************************************************/
/***           Delete tables before creating                 ***/
-- Delete in order:
-- location
-- fooddetail
-- groupmeeting
-- meeting
-- groupregionpreference
-- groupfoodpreference
-- grouppicture
-- groupmember
-- groupchatmessages
-- groupchat
-- group
-- userregionpreference
-- userfoodpreference
-- userpicture
-- regionpreference
-- foodpreference
-- user
/***************************************************************/
/* Table: Location */
if exists(Select * from sysobjects
  where id = object_id('dbo.Location') and sysstat & 0xf = 3)
  drop table dbo.Location
GO

/* Table: FoodDetail */
if exists(Select * from sysobjects
  where id = object_id('dbo.FoodDetail') and sysstat & 0xf = 3)
  drop table dbo.FoodDetail
GO

/* Table: GroupMeeting */
if exists(Select * from sysobjects
  where id = object_id('dbo.GroupMeeting') and sysstat & 0xf = 3)
  drop table dbo.GroupMeeting
GO

/* Table: Meeting */
if exists(Select * from sysobjects
  where id = object_id('dbo.Meeting') and sysstat & 0xf = 3)
  drop table dbo.Meeting
GO

/* Table: GroupRegionPreference */
if exists(Select * from sysobjects
  where id = object_id('dbo.GroupRegionPreference') and sysstat & 0xf = 3)
  drop table dbo.GroupRegionPreference
GO

/* Table: GroupFoodPreference */
if exists(Select * from sysobjects
  where id = object_id('dbo.GroupFoodPreference') and sysstat & 0xf = 3)
  drop table dbo.GroupFoodPreference
GO

/* Table: GroupPicture */
if exists(Select * from sysobjects
  where id = object_id('dbo.GroupPicture') and sysstat & 0xf = 3)
  drop table dbo.GroupPicture
GO

/* Table: GroupMember */
if exists(Select * from sysobjects
  where id = object_id('dbo.GroupMember') and sysstat & 0xf = 3)
  drop table dbo.GroupMember
GO

/* Table: GroupChatMessages */
if exists(Select * from sysobjects
  where id = object_id('dbo.GroupChatMessages') and sysstat & 0xf = 3)
  drop table dbo.GroupChatMessages
GO

/* Table: GroupChat */
if exists(Select * from sysobjects
  where id = object_id('dbo.GroupChat') and sysstat & 0xf = 3)
  drop table dbo.GroupChat
GO

/* Table: Group */
if exists(Select * from sysobjects
  where id = object_id('dbo.[Group]') and sysstat & 0xf = 3)
  drop table dbo.[Group]
GO

/* Table: UserRegionPreference */
if exists(Select * from sysobjects
  where id = object_id('dbo.UserRegionPreference') and sysstat & 0xf = 3)
  drop table dbo.UserRegionPreference
GO

/* Table: UserFoodPreference */
if exists(Select * from sysobjects
  where id = object_id('dbo.UserFoodPreference') and sysstat & 0xf = 3)
  drop table dbo.UserFoodPreference
GO

/* Table: UserPicture */
if exists(Select * from sysobjects
  where id = object_id('dbo.UserPicture') and sysstat & 0xf = 3)
  drop table dbo.UserPicture
GO

/* Table: RegionPreference */
if exists(Select * from sysobjects
  where id = object_id('dbo.RegionPreference') and sysstat & 0xf = 3)
  drop table dbo.RegionPreference
GO

/* Table: FoodPreference */
if exists(Select * from sysobjects
  where id = object_id('dbo.FoodPreference') and sysstat & 0xf = 3)
  drop table dbo.FoodPreference
GO

/* Table: User */
if exists(Select * from sysobjects
  where id = object_id('dbo.[User]') and sysstat & 0xf = 3)
  drop table dbo.[User]
GO


/***************************************************************/
/***                     Creating tables                     ***/
/***************************************************************/
/* User Components */ 
/* Table: dbo.User */
CREATE TABLE dbo.[User]
(
  [UserID] 			              int                     IDENTITY (1,1),
  [UserName]			            varchar(50)		          NOT NULL,
  [Name]				              varchar(50) 	          NOT NULL,
  [Email]				              varchar(255)	          NOT NULL,
  [Age]					              int				              NOT NULL CHECK (Age >= 18 AND Age <= 100),
  [Gender]				            char(1)			            NOT NULL CHECK (Gender IN ('M','F')),
  [Password]			            varchar(50)		          NOT NULL,

  CONSTRAINT PK_User PRIMARY KEY NONCLUSTERED (UserID),
  CONSTRAINT UQ_User_UserName UNIQUE (UserName),
  CONSTRAINT UQ_User_Email UNIQUE (Email),
  CONSTRAINT CK_User_Age CHECK (Age >= 18 AND Age <= 100)
)
GO


/* Table: dbo.FoodPreference */
CREATE TABLE dbo.FoodPreference
(
  [FoodPreferenceID]          int                    IDENTITY (1,1),
  [FoodType]                  varchar(255)           NOT NULL,

  CONSTRAINT PK_Preference PRIMARY KEY NONCLUSTERED (FoodPreferenceID)
)
GO


/* Table: dbo.RegionPreference */
CREATE TABLE dbo.RegionPreference
(
  [RegionPreferenceID]        int                   IDENTITY (1,1),
  [RegionType]                varchar(255)          NOT NULL,
  
  CONSTRAINT PK_Region_Preference PRIMARY KEY NONCLUSTERED (RegionPreferenceID)
)
GO


/* Table: dbo.UserPicture */
CREATE TABLE dbo.UserPicture
(
  [PictureID]                 int                   IDENTITY (1,1),
  [PictureFile]               varchar(255)          NOT NULL,
  [UserID]                    int                   NOT NULL,

  CONSTRAINT PK_UserPicture PRIMARY KEY NONCLUSTERED (PictureID),
  CONSTRAINT FK_UserPicture_UserID FOREIGN KEY (UserID)
  REFERENCES dbo.[User](UserID)
)
GO


/* Table: dbo.UserFoodPreference */
CREATE TABLE dbo.UserFoodPreference -- contains food preferences linked to the userid
(
  [UserFoodPreferenceID]      int                   IDENTITY (1,1),
  [UserID]                    int                   NOT NULL,
  [FoodPreferenceID]          int                   NOT NULL,

  CONSTRAINT PK_User_Food_Preference PRIMARY KEY NONCLUSTERED (UserFoodPreferenceID),
  CONSTRAINT FK_User_Food_Preference_UserID FOREIGN KEY (UserID)
  REFERENCES dbo.[User](UserID),
  CONSTRAINT FK_UserPreference_FoodPreferenceID FOREIGN KEY (FoodPreferenceID)
  REFERENCES dbo.FoodPreference(FoodPreferenceID),
  CONSTRAINT UQ_User_Food_Preference UNIQUE (UserID, FoodPreferenceID)
)
GO


/* Table: UserRegionPreference */
CREATE TABLE dbo.UserRegionPreference -- contains region preferences linked to the userid
(
  [UserRegionPreferenceID]    int                  IDENTITY (1,1),
  [UserID]                    int                  NOT NULL,
  [RegionPreferenceID]        int                  NOT NULL,

  CONSTRAINT PK_User_Region_Preference PRIMARY KEY NONCLUSTERED (UserRegionPreferenceID),
  CONSTRAINT FK_User_Region_Preference_UserID FOREIGN KEY (UserID)
  REFERENCES dbo.[User](UserID),
  CONSTRAINT FK_UserPreference_RegionPreferenceID FOREIGN KEY (RegionPreferenceID)
  REFERENCES dbo.RegionPreference(RegionPreferenceID),
  CONSTRAINT UQ_User_Region_Preference UNIQUE (UserID, RegionPreferenceID)
)
GO


/* Group Components */
/* Table: Group */
CREATE TABLE dbo.[Group]
(
  [GroupID]                   int                   IDENTITY (1,1), 
  [GroupName]                 varchar(50)           NOT NULL,
  [GroupDesc]                 varchar(255)          NOT NULL,
  [Capacity]                  int                   NOT NULL,
  [GroupDate]                 DateTime              NOT NULL DEFAULT (getdate()),
  
  CONSTRAINT PK_Group PRIMARY KEY NONCLUSTERED (GroupID)
)
GO


/* Table: GroupChat */
CREATE TABLE dbo.GroupChat
(
  [GroupChatID]               int                   IDENTITY (1,1), 
  [GroupID]                   int                   NOT NULL, -- FK to Group
  [UserID]                    int                   NOT NULL, -- FK to User

  CONSTRAINT PK_GroupChat PRIMARY KEY NONCLUSTERED (GroupChatID),
  CONSTRAINT FK_GroupChat_GroupID FOREIGN KEY (GroupID)
  REFERENCES dbo.[Group](GroupID),
  CONSTRAINT FK_GroupChat_UserID FOREIGN KEY (UserID)
  REFERENCES dbo.[User](UserID)
)
GO


/* Table: GroupChatMessages */
CREATE TABLE dbo.GroupChatMessages
(
  [GroupChatMessagesID]       int                   IDENTITY (1,1), 
  [GroupChatID]               int                   NOT NULL, -- FK to GroupChat
  [UserID]                    int                   NOT NULL, -- FK to User
  [ChatDate]                  DateTime              NOT NULL DEFAULT (getdate()),
  [ChatMessage]               varchar(255)          NOT NULL,
  [Pinned]                    char(1)               NOT NULL DEFAULT ('N'),

  CONSTRAINT PK_GroupChatMessages PRIMARY KEY NONCLUSTERED (GroupChatMessagesID),
  CONSTRAINT FK_GroupChatMessages_GroupChatID FOREIGN KEY (GroupChatID)
  REFERENCES dbo.GroupChat(GroupChatID),
  CONSTRAINT FK_GroupChatMessages_UserID FOREIGN KEY (UserID)
  REFERENCES dbo.[User](UserID)
)
GO

/* Table: GroupMember */
CREATE TABLE dbo.GroupMember
(
  [GroupMemberID]             int                   IDENTITY (1,1), 
  [UserID]                    int                   NOT NULL, -- FK to User
  [GroupID]                   int                   NOT NULL, -- FK to Group
  -- [GroupDate]                 DateTime              NOT NULL DEFAULT (getdate()),
  
  CONSTRAINT PK_GroupMember PRIMARY KEY NONCLUSTERED (GroupMemberID),
  CONSTRAINT FK_GroupMember_UserID FOREIGN KEY (UserID)
  REFERENCES dbo.[User](UserID),
  CONSTRAINT FK_GroupMember_GroupID FOREIGN KEY (GroupID)
  REFERENCES dbo.[Group](GroupID)
)
GO


/* Table: GroupPicture */ 
CREATE TABLE dbo.GroupPicture
(
  [PictureID]                 int                   IDENTITY (1,1),
  [GroupID]                   int                   NOT NULL, -- FK to Group
  [PictureFile]               varchar(255)          NOT NULL,

  CONSTRAINT PK_GroupPicture PRIMARY KEY NONCLUSTERED (PictureID),
  CONSTRAINT FK_GroupPicture_GroupID FOREIGN KEY (GroupID)
  REFERENCES dbo.[Group](GroupID)
)
GO


/* Table: GroupPreference */
CREATE TABLE dbo.GroupFoodPreference -- contains food preferences linked to the groupid
(
  [GroupFoodPreferenceID]     int                   IDENTITY (1,1), 
  [GroupID]                   int                   NOT NULL, -- FK to Group
  [FoodPreferenceID]          int                   NOT NULL, -- FK to FoodPreference

  CONSTRAINT PK_Group_Food_Preference PRIMARY KEY NONCLUSTERED (GroupFoodPreferenceID),
  CONSTRAINT FK_Group_Food_Preference_GroupID FOREIGN KEY (GroupID)
  REFERENCES dbo.[Group](GroupID),
  CONSTRAINT FK_GroupPreference_FoodPreferenceID FOREIGN KEY (FoodPreferenceID)
  REFERENCES dbo.FoodPreference(FoodPreferenceID),
  CONSTRAINT UQ_Group_Food_Preference UNIQUE (GroupID, FoodPreferenceID)
)
GO


/* Table: GroupRegionPreference */
CREATE TABLE dbo.GroupRegionPreference -- contains region preferences linked to the groupid
(
  [GroupRegionPreferenceID]  int                    IDENTITY (1,1), 
  [GroupID]                  int                    NOT NULL, -- FK to Group
  [RegionPreferenceID]       int                    NOT NULL, -- FK to RegionPreference

  CONSTRAINT PK_Group_Region_Preference PRIMARY KEY NONCLUSTERED (GroupRegionPreferenceID),
  CONSTRAINT FK_Group_Region_Preference_GroupID FOREIGN KEY (GroupID)
  REFERENCES dbo.[Group](GroupID),
  CONSTRAINT FK_GroupPreference_RegionPreferenceID FOREIGN KEY (RegionPreferenceID)
  REFERENCES dbo.RegionPreference(RegionPreferenceID),
  CONSTRAINT UQ_Group_Region_Preference UNIQUE (GroupID, RegionPreferenceID)
)
GO


/* Table: Meeting */
CREATE TABLE dbo.Meeting
(
  [MeetingID]               int                     IDENTITY (1,1),
  [GroupID]                 int                     NOT NULL, -- FK to Group
  [MeetingDate]             DateTime                NOT NULL,
  [MeetingDescription]      varchar(255)            NOT NULL,

  CONSTRAINT PK_Meeting PRIMARY KEY NONCLUSTERED (MeetingID),
  CONSTRAINT FK_Meeting_GroupID FOREIGN KEY (GroupID)
  REFERENCES dbo.[Group](GroupID)
)
GO


/* Table: GroupMeeting */
CREATE TABLE dbo.GroupMeeting
(
  GroupMeetingID            int                     IDENTITY (1,1),
  GroupID                   int                     NOT NULL, -- FK to Group
  MeetingID                 int                     NOT NULL, -- FK to Meeting

  CONSTRAINT PK_GroupMeeting PRIMARY KEY NONCLUSTERED (GroupMeetingID),
  CONSTRAINT FK_GroupMeeting_GroupID FOREIGN KEY (GroupID)
  REFERENCES dbo.[Group](GroupID),
  CONSTRAINT FK_GroupMeeting_MeetingID FOREIGN KEY (MeetingID)
  REFERENCES dbo.Meeting(MeetingID)
)
GO


/* Table: FoodDetail */ 
-- Contains the details of the food the meeting will be about 
CREATE TABLE dbo.FoodDetail
(
  FoodID                int           IDENTITY (1,1),
  MeetingID             int           NOT NULL, -- FK to Meeting
  FoodName              varchar(50)   NOT NULL,
  FoodDescription       varchar(255)  NOT NULL,
  FoodPrice             decimal(5,2)  NOT NULL,

  CONSTRAINT PK_FoodDetails PRIMARY KEY NONCLUSTERED (FoodID),
  CONSTRAINT FK_FoodDetails_MeetingID FOREIGN KEY (MeetingID)
  REFERENCES dbo.Meeting(MeetingID)
)
GO


/* Table: MeetingLocation */
CREATE TABLE dbo.[Location]
(
  LocationID            int                   IDENTITY (1,1),
  MeetingID             int                   NOT NULL,
  LocationName          varchar(255)          NOT NULL,
  LocationAddress       varchar(255)          NOT NULL,
  Longitude             decimal(9,6)          NOT NULL,
  Latitude              decimal(9,6)          NOT NULL,

  CONSTRAINT PK_Location PRIMARY KEY NONCLUSTERED (LocationID),
  CONSTRAINT FK_Location_MeetingID FOREIGN KEY (MeetingID)
  REFERENCES dbo.Meeting(MeetingID)
)
GO


/***************************************************************/
/***                Populate Sample Data                     ***/
/***************************************************************/
-- data and entries are CASE SENSITIVE!!
SET IDENTITY_INSERT [dbo].[User] ON 
INSERT [dbo].[User] ([UserID], [UserName], [Name], [Email], [Age], [Gender], [Password]) VALUES (1, 'Sanrio123', 'Cinnamon', 'sanrio_cinnamon@gmail.com', 18, 'F', '123456')
INSERT [dbo].[User] ([UserID], [UserName], [Name], [Email], [Age], [Gender], [Password]) VALUES (2, 'Tanny23', 'Tom Tan', 'tantom@gmail.com', 24, 'M', 'ilovepeanuts')
INSERT [dbo].[User] ([UserID], [UserName], [Name], [Email], [Age], [Gender], [Password]) VALUES (3, 'Pancake77', 'Best Pancake', 'pancakemaybe@gmail.com', 22, 'M', 'ilovepancakes17')
INSERT [dbo].[User] ([UserID], [UserName], [Name], [Email], [Age], [Gender], [Password]) VALUES (4, 'Waffle12', 'Best Waffle', 'wafflechoco@gmail.com', 25, 'M', 'ilovechoco12')
SET IDENTITY_INSERT [dbo].[User] OFF

SET IDENTITY_INSERT [dbo].[FoodPreference] ON
INSERT [dbo].[FoodPreference] ([FoodPreferenceID], [FoodType]) VALUES (1, 'Western')
INSERT [dbo].[FoodPreference] ([FoodPreferenceID], [FoodType]) VALUES (2, 'Chinese')
INSERT [dbo].[FoodPreference] ([FoodPreferenceID], [FoodType]) VALUES (3, 'Japanese')
INSERT [dbo].[FoodPreference] ([FoodPreferenceID], [FoodType]) VALUES (4, 'Korean')
SET IDENTITY_INSERT [dbo].[FoodPreference] OFF

SET IDENTITY_INSERT [dbo].[RegionPreference] ON
INSERT [dbo].[RegionPreference] ([RegionPreferenceID], [RegionType]) VALUES (1, 'North')
INSERT [dbo].[RegionPreference] ([RegionPreferenceID], [RegionType]) VALUES (2, 'South')
INSERT [dbo].[RegionPreference] ([RegionPreferenceID], [RegionType]) VALUES (3, 'East')
INSERT [dbo].[RegionPreference] ([RegionPreferenceID], [RegionType]) VALUES (4, 'West')
SET IDENTITY_INSERT [dbo].[RegionPreference] OFF

SET IDENTITY_INSERT [dbo].[UserPicture] ON
INSERT [dbo].[UserPicture] ([PictureID], [PictureFile], [UserID]) VALUES (1, 'Chrysanthemum.jpg', 1)
INSERT [dbo].[UserPicture] ([PictureID], [PictureFile], [UserID]) VALUES (2, 'Desert.jpg', 2)
INSERT [dbo].[UserPicture] ([PictureID], [PictureFile], [UserID]) VALUES (3, 'Hydrangeas.jpg', 3)
INSERT [dbo].[UserPicture] ([PictureID], [PictureFile], [UserID]) VALUES (4, 'Jellyfish.jpg', 4)
SET IDENTITY_INSERT [dbo].[UserPicture] OFF

SET IDENTITY_INSERT [dbo].[UserFoodPreference] ON
INSERT [dbo].[UserFoodPreference] ([UserFoodPreferenceID], [UserID], [FoodPreferenceID]) VALUES (1, 1, 1)
INSERT [dbo].[UserFoodPreference] ([UserFoodPreferenceID], [UserID], [FoodPreferenceID]) VALUES (2, 1, 2)
INSERT [dbo].[UserFoodPreference] ([UserFoodPreferenceID], [UserID], [FoodPreferenceID]) VALUES (3, 2, 3)
INSERT [dbo].[UserFoodPreference] ([UserFoodPreferenceID], [UserID], [FoodPreferenceID]) VALUES (4, 3, 4)
SET IDENTITY_INSERT [dbo].[UserFoodPreference] OFF

SET IDENTITY_INSERT [dbo].[UserRegionPreference] ON
INSERT [dbo].[UserRegionPreference] ([UserRegionPreferenceID], [UserID], [RegionPreferenceID]) VALUES (1, 1, 1)
INSERT [dbo].[UserRegionPreference] ([UserRegionPreferenceID], [UserID], [RegionPreferenceID]) VALUES (2, 1, 2)
INSERT [dbo].[UserRegionPreference] ([UserRegionPreferenceID], [UserID], [RegionPreferenceID]) VALUES (3, 2, 3)
INSERT [dbo].[UserRegionPreference] ([UserRegionPreferenceID], [UserID], [RegionPreferenceID]) VALUES (4, 3, 4)
SET IDENTITY_INSERT [dbo].[UserRegionPreference] OFF

SET IDENTITY_INSERT [dbo].[Group] ON
INSERT [dbo].[Group] ([GroupID], [GroupName], [GroupDesc], [Capacity], [GroupDate]) VALUES (1, 'Western Food Lovers', 'For people who love western food', 4, '26-Apr-2019')
INSERT [dbo].[Group] ([GroupID], [GroupName], [GroupDesc], [Capacity], [GroupDate]) VALUES (2, 'Chinese Food Lovers', 'For people who love chinese food', 4, '28-Apr-2019')
INSERT [dbo].[Group] ([GroupID], [GroupName], [GroupDesc], [Capacity], [GroupDate]) VALUES (3, 'Japanese Food Lovers', 'For people who love japanese food', 4, '30-Apr-2019')
INSERT [dbo].[Group] ([GroupID], [GroupName], [GroupDesc], [Capacity], [GroupDate]) VALUES (4, 'Korean Food Lovers', 'For people who love korean food', 4, '02-May-2019')
SET IDENTITY_INSERT [dbo].[Group] OFF

SET IDENTITY_INSERT [dbo].[GroupChat] ON
INSERT [dbo].[GroupChat] ([GroupChatID], [GroupID], [UserID]) VALUES (1, 1, 1)
INSERT [dbo].[GroupChat] ([GroupChatID], [GroupID], [UserID]) VALUES (2, 2, 2)
INSERT [dbo].[GroupChat] ([GroupChatID], [GroupID], [UserID]) VALUES (3, 3, 3)
INSERT [dbo].[GroupChat] ([GroupChatID], [GroupID], [UserID]) VALUES (4, 4, 4)
SET IDENTITY_INSERT [dbo].[GroupChat] OFF

SET IDENTITY_INSERT [dbo].[GroupChatMessages] ON
INSERT [dbo].[GroupChatMessages] ([GroupChatMessagesID], [GroupChatID], [UserID], [ChatDate], [ChatMessage], [Pinned]) VALUES (1, 1, 1, '26-Apr-2019', 'Hi everyone!', 'N')
INSERT [dbo].[GroupChatMessages] ([GroupChatMessagesID], [GroupChatID], [UserID], [ChatDate], [ChatMessage], [Pinned]) VALUES (2, 2, 2, '28-Apr-2019', 'Hii everyone!', 'N')
INSERT [dbo].[GroupChatMessages] ([GroupChatMessagesID], [GroupChatID], [UserID], [ChatDate], [ChatMessage], [Pinned]) VALUES (3, 3, 3, '30-Apr-2019', 'Hello everyone!', 'N')
INSERT [dbo].[GroupChatMessages] ([GroupChatMessagesID], [GroupChatID], [UserID], [ChatDate], [ChatMessage], [Pinned]) VALUES (4, 4, 4, '02-May-2019', 'Helloo everyone!', 'N')
SET IDENTITY_INSERT [dbo].[GroupChatMessages] OFF

SET IDENTITY_INSERT [dbo].[GroupMember] ON
INSERT [dbo].[GroupMember] ([GroupMemberID], [UserID], [GroupID]) VALUES (1, 1, 1)
INSERT [dbo].[GroupMember] ([GroupMemberID], [UserID], [GroupID]) VALUES (2, 2, 2)
INSERT [dbo].[GroupMember] ([GroupMemberID], [UserID], [GroupID]) VALUES (3, 3, 3)
INSERT [dbo].[GroupMember] ([GroupMemberID], [UserID], [GroupID]) VALUES (4, 4, 4)
SET IDENTITY_INSERT [dbo].[GroupMember] OFF

SET IDENTITY_INSERT [dbo].[GroupPicture] ON
INSERT [dbo].[GroupPicture] ([PictureID], [GroupID], [PictureFile]) VALUES (1, 1, 'Chrysanthemum.jpg')
INSERT [dbo].[GroupPicture] ([PictureID], [GroupID], [PictureFile]) VALUES (2, 2, 'Desert.jpg')
INSERT [dbo].[GroupPicture] ([PictureID], [GroupID], [PictureFile]) VALUES (3, 3, 'Hydrangeas.jpg')
INSERT [dbo].[GroupPicture] ([PictureID], [GroupID], [PictureFile]) VALUES (4, 4, 'Jellyfish.jpg')
SET IDENTITY_INSERT [dbo].[GroupPicture] OFF

SET IDENTITY_INSERT [dbo].[GroupFoodPreference] ON
INSERT [dbo].[GroupFoodPreference] ([GroupFoodPreferenceID], [GroupID], [FoodPreferenceID]) VALUES (1, 1, 1)
INSERT [dbo].[GroupFoodPreference] ([GroupFoodPreferenceID], [GroupID], [FoodPreferenceID]) VALUES (2, 1, 2)
INSERT [dbo].[GroupFoodPreference] ([GroupFoodPreferenceID], [GroupID], [FoodPreferenceID]) VALUES (3, 2, 3)
INSERT [dbo].[GroupFoodPreference] ([GroupFoodPreferenceID], [GroupID], [FoodPreferenceID]) VALUES (4, 3, 4)
SET IDENTITY_INSERT [dbo].[GroupFoodPreference] OFF

SET IDENTITY_INSERT [dbo].[GroupRegionPreference] ON
INSERT [dbo].[GroupRegionPreference] ([GroupRegionPreferenceID], [GroupID], [RegionPreferenceID]) VALUES (1, 1, 1)
INSERT [dbo].[GroupRegionPreference] ([GroupRegionPreferenceID], [GroupID], [RegionPreferenceID]) VALUES (2, 1, 2)
INSERT [dbo].[GroupRegionPreference] ([GroupRegionPreferenceID], [GroupID], [RegionPreferenceID]) VALUES (3, 2, 3)
INSERT [dbo].[GroupRegionPreference] ([GroupRegionPreferenceID], [GroupID], [RegionPreferenceID]) VALUES (4, 3, 4)
SET IDENTITY_INSERT [dbo].[GroupRegionPreference] OFF

SET IDENTITY_INSERT [dbo].[Meeting] ON
INSERT [dbo].[Meeting] ([MeetingID], [GroupID], [MeetingDate], [MeetingDescription]) VALUES (1, 1, '26-Apr-2019', 'Western Food Lovers')
INSERT [dbo].[Meeting] ([MeetingID], [GroupID], [MeetingDate], [MeetingDescription]) VALUES (2, 2, '28-Apr-2019', 'Chinese Food Lovers')
INSERT [dbo].[Meeting] ([MeetingID], [GroupID], [MeetingDate], [MeetingDescription]) VALUES (3, 3, '30-Apr-2019', 'Japanese Food Lovers')
INSERT [dbo].[Meeting] ([MeetingID], [GroupID], [MeetingDate], [MeetingDescription]) VALUES (4, 4, '02-May-2019', 'Korean Food Lovers')
SET IDENTITY_INSERT [dbo].[Meeting] OFF

SET IDENTITY_INSERT [dbo].[GroupMeeting] ON
INSERT [dbo].[GroupMeeting] ([GroupMeetingID], [GroupID], [MeetingID]) VALUES (1, 1, 1)
INSERT [dbo].[GroupMeeting] ([GroupMeetingID], [GroupID], [MeetingID]) VALUES (2, 2, 2)
INSERT [dbo].[GroupMeeting] ([GroupMeetingID], [GroupID], [MeetingID]) VALUES (3, 3, 3)
INSERT [dbo].[GroupMeeting] ([GroupMeetingID], [GroupID], [MeetingID]) VALUES (4, 4, 4)
SET IDENTITY_INSERT [dbo].[GroupMeeting] OFF

SET IDENTITY_INSERT [dbo].[FoodDetail] ON
INSERT [dbo].[FoodDetail] ([FoodID], [MeetingID], [FoodName], [FoodDescription], [FoodPrice]) VALUES (1, 1, 'Chicken Chop', 'Chicken Chop with fries', 10.00)
INSERT [dbo].[FoodDetail] ([FoodID], [MeetingID], [FoodName], [FoodDescription], [FoodPrice]) VALUES (2, 2, 'Chicken Rice', 'Chicken Rice with soup', 5.00)
INSERT [dbo].[FoodDetail] ([FoodID], [MeetingID], [FoodName], [FoodDescription], [FoodPrice]) VALUES (3, 3, 'Sushi', 'Sushi with wasabi', 15.00)
INSERT [dbo].[FoodDetail] ([FoodID], [MeetingID], [FoodName], [FoodDescription], [FoodPrice]) VALUES (4, 4, 'Bibimbap', 'Bibimbap with kimchi', 12.00)
SET IDENTITY_INSERT [dbo].[FoodDetail] OFF

SET IDENTITY_INSERT [dbo].[Location] ON
INSERT [dbo].[Location] ([LocationID], [MeetingID], [LocationName], [LocationAddress], [Longitude], [Latitude]) VALUES (1, 1, 'KFC', '123 North Street', 103.851959, 1.290270)
INSERT [dbo].[Location] ([LocationID], [MeetingID], [LocationName], [LocationAddress], [Longitude], [Latitude]) VALUES (2, 2, 'MCD', '123 South Street', 103.851959, 1.290270)
INSERT [dbo].[Location] ([LocationID], [MeetingID], [LocationName], [LocationAddress], [Longitude], [Latitude]) VALUES (3, 3, 'Sushi Express', '123 East Street', 103.851959, 1.290270)
INSERT [dbo].[Location] ([LocationID], [MeetingID], [LocationName], [LocationAddress], [Longitude], [Latitude]) VALUES (4, 4, 'Bibimbap', '123 West Street', 103.851959, 1.290270)
SET IDENTITY_INSERT [dbo].[Location] OFF