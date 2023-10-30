
/* Setting up of Database */
-- Drop the database if it exists
DROP DATABASE IF EXISTS LetsMakanTogether;

-- Create the database
CREATE DATABASE LetsMakanTogether;

-- Use the newly created database
USE LetsMakanTogether;


/* Setting up of Tables */
-- Table: Users
CREATE TABLE Users (
  UserID INT AUTO_INCREMENT,
  Username VARCHAR(50) NOT NULL,
  `Name` VARCHAR(50) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Age INT NOT NULL,
  Gender CHAR(1) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  UNIQUE (Username),
  UNIQUE (Email),
  PRIMARY KEY (UserID)
);


-- Table: RegionPreference
CREATE TABLE RegionPreference (
  RegionPreferenceID INT AUTO_INCREMENT,
  RegionType VARCHAR(50) NOT NULL,
  PRIMARY KEY (RegionPreferenceID)
);


-- Table: FoodPreference
CREATE TABLE FoodPreference (
  FoodPreferenceID INT AUTO_INCREMENT,
  FoodType VARCHAR(50) NOT NULL,
  PRIMARY KEY (FoodPreferenceID)
);


-- Table: UserPicture
CREATE TABLE UserPicture (
  PictureID INT AUTO_INCREMENT,
  UserID INT NOT NULL,
  PictureFile VARCHAR(255) NOT NULL,
  PRIMARY KEY (PictureID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


-- Table: UserFoodPreference
CREATE TABLE UserFoodPreference (
  UserFoodPreferenceID INT AUTO_INCREMENT,
  UserID INT NOT NULL,
  FoodPreferenceID INT NOT NULL,
  PRIMARY KEY (UserFoodPreferenceID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (FoodPreferenceID) REFERENCES FoodPreference(FoodPreferenceID),
  UNIQUE KEY UQ_User_Food_Preference (UserID, FoodPreferenceID)
);


-- Table: UserRegionPreference
CREATE TABLE UserRegionPreference (
  UserRegionPreferenceID INT AUTO_INCREMENT,
  UserID INT NOT NULL,
  RegionPreferenceID INT NOT NULL,
  PRIMARY KEY (UserRegionPreferenceID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (RegionPreferenceID) REFERENCES RegionPreference(RegionPreferenceID),
  UNIQUE KEY UQ_User_Region_Preference (UserID, RegionPreferenceID)
);


-- Table: Groups
CREATE TABLE `Groups` (
  GroupID INT AUTO_INCREMENT,
  GroupName VARCHAR(50) NOT NULL,
  GroupDesc VARCHAR(255) NOT NULL,
  Capacity INT NOT NULL,
  GroupDate DATE NOT NULL,
  PRIMARY KEY (GroupID)
);


-- Table: GroupChat
CREATE TABLE GroupChat (
  GroupChatID INT AUTO_INCREMENT,
  GroupID INT NOT NULL,
  UserID INT NOT NULL,
  PRIMARY KEY (GroupChatID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


-- Table: GroupChatMessages
CREATE TABLE GroupChatMessages (
  GroupChatMessagesID INT AUTO_INCREMENT,
  GroupChatID INT NOT NULL,
  UserID INT NOT NULL,
  ChatDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ChatMessage VARCHAR(255) NOT NULL,
  Pinned CHAR(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (GroupChatMessagesID),
  FOREIGN KEY (GroupChatID) REFERENCES GroupChat(GroupChatID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


-- Table: GroupMember
CREATE TABLE GroupMember (
  GroupMemberID INT AUTO_INCREMENT,
  UserID INT NOT NULL,
  GroupID INT NOT NULL,
  PRIMARY KEY (GroupMemberID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID)
);


-- Table: GroupPicture
CREATE TABLE GroupPicture (
  PictureID INT AUTO_INCREMENT,
  GroupID INT NOT NULL,
  PictureFile VARCHAR(255) NOT NULL,
  PRIMARY KEY (PictureID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID)
);


-- Table: GroupFoodPreference
CREATE TABLE GroupFoodPreference (
  GroupFoodPreferenceID INT AUTO_INCREMENT,
  GroupID INT NOT NULL,
  FoodPreferenceID INT NOT NULL,
  PRIMARY KEY (GroupFoodPreferenceID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID),
  FOREIGN KEY (FoodPreferenceID) REFERENCES FoodPreference(FoodPreferenceID),
  UNIQUE KEY UQ_Group_Food_Preference (GroupID, FoodPreferenceID)
);


-- Table: GroupRegionPreference
CREATE TABLE GroupRegionPreference (
  GroupRegionPreferenceID INT AUTO_INCREMENT,
  GroupID INT NOT NULL,
  RegionPreferenceID INT NOT NULL,
  PRIMARY KEY (GroupRegionPreferenceID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID),
  FOREIGN KEY (RegionPreferenceID) REFERENCES RegionPreference(RegionPreferenceID),
  UNIQUE KEY UQ_Group_Region_Preference (GroupID, RegionPreferenceID)
);


-- Table: Meeting
CREATE TABLE Meeting (
  MeetingID INT AUTO_INCREMENT,
  GroupID INT NOT NULL,
  MeetingDate DATE NOT NULL,
  MeetingDescription VARCHAR(255) NOT NULL,
  PRIMARY KEY (MeetingID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID)
);


-- Table: GroupMeeting
CREATE TABLE GroupMeeting (
  GroupMeetingID INT AUTO_INCREMENT,
  GroupID INT NOT NULL,
  MeetingID INT NOT NULL,
  PRIMARY KEY (GroupMeetingID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID),
  FOREIGN KEY (MeetingID) REFERENCES Meeting(MeetingID)
);


-- Table: FoodDetail
CREATE TABLE FoodDetail (
  FoodID INT AUTO_INCREMENT,
  MeetingID INT NOT NULL,
  FoodName VARCHAR(50) NOT NULL,
  FoodDescription VARCHAR(255) NOT NULL,
  FoodPrice DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (FoodID),
  FOREIGN KEY (MeetingID) REFERENCES Meeting(MeetingID)
);


-- Table: Location
CREATE TABLE Location (
    LocationID INT AUTO_INCREMENT,
    MeetingID INT NOT NULL,
    LocationName VARCHAR(255) NOT NULL,
    LocationAddress VARCHAR(255) NOT NULL,
    Longitude DECIMAL(9 , 6 ) NOT NULL,
    Latitude DECIMAL(9 , 6 ) NOT NULL,
    PRIMARY KEY (LocationID),
    FOREIGN KEY (MeetingID) REFERENCES Meeting (MeetingID)
);


/* Start of generation of sample data */
-- Users
INSERT INTO Users (UserID, UserName, `Name`, Email, Age, Gender, `Password`) VALUES
(1, 'Sanrio123', 'Cinnamon', 'sanrio_cinnamon@gmail.com', 18, 'F', '$2y$10$y1B/5ZA3xKVpXM2rDt.ho.PHR2eRDL7fRAeWCn7N9HONFiB0TcYgu'),
(2, 'Tanny23', 'Tom Tan', 'tantom@gmail.com', 24, 'M', '$2y$10$ftvAzhHjM10IeIhyaRB1tOcX3O3h1aRgTryXhmBJ.l1ikgpJva8dq'),
(3, 'Pancake77', 'Best Pancake', 'pancakemaybe@gmail.com', 22, 'M', '$2y$10$hBTKGexS/gA0pLnoRJrkGemr9mO9uHPE7kVtuLvt96H26825vhLlC'),
(4, 'Waffle12', 'Best Waffle', 'wafflechoco@gmail.com', 25, 'M', '$2y$10$sh4MZ0SkKEqD4tjoxWukyuFXSruMIZkMyxBuGq9AUIu0nMX3BK9KG');

-- FoodPreference
INSERT INTO FoodPreference (FoodPreferenceID, FoodType) VALUES
(1, 'Western'),
(2, 'Chinese'),
(3, 'Japanese'),
(4, 'Korean');

-- RegionPreference
INSERT INTO RegionPreference (RegionPreferenceID, RegionType) VALUES
(1, 'North'),
(2, 'South'),
(3, 'East'),
(4, 'West'),
(5, 'Central');

-- UserPicture
INSERT INTO UserPicture (PictureID, PictureFile, UserID) VALUES
(1, 'Chrysanthemum.jpg', 1),
(2, 'Desert.jpg', 2),
(3, 'Hydrangeas.jpg', 3),
(4, 'Jellyfish.jpg', 4);

-- UserFoodPreference
INSERT INTO UserFoodPreference (UserFoodPreferenceID, UserID, FoodPreferenceID) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 4);

-- UserRegionPreference
INSERT INTO UserRegionPreference (UserRegionPreferenceID, UserID, RegionPreferenceID) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 4);

-- Groups
INSERT INTO `Groups` (GroupID, GroupName, GroupDesc, Capacity, GroupDate) VALUES
(1, 'Western Food Lovers', 'For people who love western food', 4, '2019-04-26'),
(2, 'Chinese Food Lovers', 'For people who love Chinese food', 4, '2019-04-28'),
(3, 'Japanese Food Lovers', 'For people who love Japanese food', 4, '2019-04-30'),
(4, 'Korean Food Lovers', 'For people who love Korean food', 4, '2019-05-02');

-- GroupChat
INSERT INTO GroupChat (GroupChatID, GroupID, UserID) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4);

-- GroupChatMessages
INSERT INTO GroupChatMessages (GroupChatMessagesID, GroupChatID, UserID, ChatDate, ChatMessage, Pinned) VALUES
(1, 1, 1, '2019-04-26', 'Hi everyone!', 'N'),
(2, 2, 2, '2019-04-28', 'Hii everyone!', 'N'),
(3, 3, 3, '2019-04-30', 'Hello everyone!', 'N'),
(4, 4, 4, '2019-05-02', 'Helloo everyone!', 'N');

-- GroupMember
INSERT INTO GroupMember (GroupMemberID, UserID, GroupID) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4);

-- GroupPicture
INSERT INTO GroupPicture (PictureID, GroupID, PictureFile) VALUES
(1, 1, 'Chrysanthemum.jpg'),
(2, 2, 'Desert.jpg'),
(3, 3, 'Hydrangeas.jpg'),
(4, 4, 'Jellyfish.jpg');

-- GroupFoodPreference
INSERT INTO GroupFoodPreference (GroupFoodPreferenceID, GroupID, FoodPreferenceID) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 4);

-- GroupRegionPreference
INSERT INTO GroupRegionPreference (GroupRegionPreferenceID, GroupID, RegionPreferenceID) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 3, 4);

-- Meeting
INSERT INTO Meeting (MeetingID, GroupID, MeetingDate, MeetingDescription) VALUES
(1, 1, '2019-05-03', 'Western food meetup'),
(2, 2, '2019-05-05', 'Chinese food meetup'),
(3, 3, '2019-05-07', 'Japanese food meetup'),
(4, 4, '2019-05-09', 'Korean food meetup');
