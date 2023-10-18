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


/* User Components */ 
/* Table: dbo.User */
CREATE TABLE dbo.User
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

  CONSTRAINT PK_Preference PRIMARY KEY NONCLUSTERED (RegionPreferenceID)
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
  REFERENCES dbo.User(UserID)
)
GO


/* Table: dbo.UserFoodPreference */
CREATE TABLE dbo.UserFoodPreference -- contains food preferences linked to the userid
(
  [UserFoodPreferenceID]      int                   IDENTITY (1,1),
  [UserID]                    int                   NOT NULL,
  [FoodPreferenceID]          int                   NOT NULL,

  CONSTRAINT PK_UserPreference PRIMARY KEY NONCLUSTERED (UserFoodPreferenceID),
  CONSTRAINT FK_UserPreference_UserID FOREIGN KEY (UserID)
  REFERENCES dbo.User(UserID),
  CONSTRAINT FK_UserPreference_FoodPreferenceID FOREIGN KEY (FoodPreferenceID)
  REFERENCES dbo.FoodPreference(FoodPreferenceID),
  CONSTRAINT UQ_UserPreference UNIQUE (UserID, FoodPreferenceID)
)
GO


/* Table: UserRegionPreference */
CREATE TABLE dbo.UserRegionPreference -- contains region preferences linked to the userid
(
  [UserRegionPreferenceID]    int                  IDENTITY (1,1),
  [UserID]                    int                  NOT NULL,
  [RegionPreferenceID]        int                  NOT NULL,

  CONSTRAINT PK_UserPreference PRIMARY KEY NONCLUSTERED (UserRegionPreferenceID),
  CONSTRAINT FK_UserPreference_UserID FOREIGN KEY (UserID)
  REFERENCES dbo.User(UserID),
  CONSTRAINT FK_UserPreference_RegionPreferenceID FOREIGN KEY (RegionPreferenceID)
  REFERENCES dbo.RegionPreference(RegionPreferenceID),
  CONSTRAINT UQ_UserPreference UNIQUE (UserID, RegionPreferenceID)
)
GO


/* Group Components */
/* Table: Group */
CREATE TABLE dbo.Group
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
  REFERENCES dbo.Group(GroupID),
  CONSTRAINT FK_GroupChat_UserID FOREIGN KEY (UserID)
  REFERENCES dbo.User(UserID)
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
  REFERENCES dbo.User(UserID)
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
  REFERENCES dbo.User(UserID),
  CONSTRAINT FK_GroupMember_GroupID FOREIGN KEY (GroupID)
  REFERENCES dbo.Group(GroupID)
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
  REFERENCES dbo.Group(GroupID)
)
GO


/* Table: GroupPreference */
CREATE TABLE dbo.GroupFoodPreference -- contains food preferences linked to the groupid
(
  [GroupFoodPreferenceID]     int                   IDENTITY (1,1), 
  [GroupID]                   int                   NOT NULL, -- FK to Group
  [FoodPreferenceID]          int                   NOT NULL, -- FK to FoodPreference

  CONSTRAINT PK_GroupPreference PRIMARY KEY NONCLUSTERED (GroupFoodPreferenceID),
  CONSTRAINT FK_GroupPreference_GroupID FOREIGN KEY (GroupID)
  REFERENCES dbo.Group(GroupID),
  CONSTRAINT FK_GroupPreference_FoodPreferenceID FOREIGN KEY (FoodPreferenceID)
  REFERENCES dbo.FoodPreference(FoodPreferenceID),
  CONSTRAINT UQ_GroupPreference UNIQUE (GroupID, FoodPreferenceID)
)
GO


/* Table: GroupRegionPreference */
CREATE TABLE dbo.GroupRegionPreference -- contains region preferences linked to the groupid
(
  [GroupRegionPreferenceID]  int                    IDENTITY (1,1), 
  [GroupID]                  int                    NOT NULL, -- FK to Group
  [RegionPreferenceID]       int                    NOT NULL, -- FK to RegionPreference

  CONSTRAINT PK_GroupPreference PRIMARY KEY NONCLUSTERED (GroupRegionPreferenceID),
  CONSTRAINT FK_GroupPreference_GroupID FOREIGN KEY (GroupID)
  REFERENCES dbo.Group(GroupID),
  CONSTRAINT FK_GroupPreference_RegionPreferenceID FOREIGN KEY (RegionPreferenceID)
  REFERENCES dbo.RegionPreference(RegionPreferenceID),
  CONSTRAINT UQ_GroupPreference UNIQUE (GroupID, RegionPreferenceID)
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
  REFERENCES dbo.Group(GroupID)
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
  REFERENCES dbo.Group(GroupID),
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