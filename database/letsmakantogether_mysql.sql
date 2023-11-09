
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
  Gender VARCHAR(50) NOT NULL,
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
  OwnerID INT NOT NULL,
  GroupName VARCHAR(50) NOT NULL,
  GroupDesc VARCHAR(255) NOT NULL,
  PRIMARY KEY (GroupID),
  FOREIGN KEY (OwnerID) REFERENCES Users(UserID)
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
  PlaceID VARCHAR(255) NOT NULL,
  MeetingDate DATETIME NOT NULL,
  MeetingAddress VARCHAR(255) NOT NULL,
  MeetingDesc VARCHAR(255) NOT NULL,
  MeetingPlace VARCHAR(255) NOT NULL,
  PRIMARY KEY (MeetingID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID)
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
(1, 'Sanrio123', 'Cinnamon', 'sanrio_cinnamon@gmail.com', 18, 'Female', '$2y$10$y1B/5ZA3xKVpXM2rDt.ho.PHR2eRDL7fRAeWCn7N9HONFiB0TcYgu'),
(2, 'Tanny23', 'Tom Tan', 'tantom@gmail.com', 24, 'Male', '$2y$10$ftvAzhHjM10IeIhyaRB1tOcX3O3h1aRgTryXhmBJ.l1ikgpJva8dq'),
(3, 'Pancake77', 'Best Pancake', 'pancakemaybe@gmail.com', 22, 'Male', '$2y$10$hBTKGexS/gA0pLnoRJrkGemr9mO9uHPE7kVtuLvt96H26825vhLlC'),
(4, 'Waffle12', 'Best Waffle', 'wafflechoco@gmail.com', 25, 'Male', '$2y$10$sh4MZ0SkKEqD4tjoxWukyuFXSruMIZkMyxBuGq9AUIu0nMX3BK9KG');

-- FoodPreferenceRegionPreference
INSERT INTO FoodPreference (FoodPreferenceID, FoodType) VALUES
(1, 'Chinese Cuisine'),
(2, 'Fusion Food'),
(3, 'Hawker Food'),
(4, 'Indian Cuisine'),
(5, 'Italian Cuisine'),
(6, 'Japanese Cuisine'),
(7, 'Korean Cuisine'),
(8, 'Kosher'),
(9, 'Local (Singaporean) Cuisine'),
(10, 'Malay Cuisine'),
(11, 'Mediterranean'),
(12, 'Pub Food'),
(13, 'Street Food'),
(14, 'Thai Cuisine'),
(15, 'Alcohol'),
(16, 'Drinks Only'),
(17, 'Allergen-Specific'),
(18, 'Dairy-Free'),
(19, 'Farm-to-Table'),
(20, 'Gluten-Free'),
(21, 'Health Food'),
(22, 'Halal'),
(23, 'High Fibre'),
(24, 'High Protein'),
(25, 'Ketogenic'),
(26, 'Low-Carb'),
(27, 'Low-Fat'),
(28, 'Low-Sodium'),
(29, 'Low-Sugar'),
(30, 'Non-Alcoholic'),
(31, 'Organic'),
(32, 'Paleo'),
(33, 'Pescatarian'),
(34, 'Plant-Based'),
(35, 'Seafood'),
(36, 'Superfoods'),
(37, 'Vegan'),
(38, 'Vegetarian'),
(39, 'Zero Waste'),
(40, 'Artisan Food'),
(41, 'BBQ'),
(42, 'Baked Goods & Pastries'),
(43, 'Brunch'),
(44, 'Buffet'),
(45, 'Café'),
(46, 'Comfort Food'),
(47, 'Desserts'),
(48, 'Fine Dining'),
(49, 'Fruits & Salads'),
(50, 'High Tea');

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
INSERT INTO `Groups` (GroupID, OwnerID, GroupName, GroupDesc) VALUES
(1, 1, 'Grass', 'Join our weekend gatherings in Singapore as we, a community of vegetarians, embark on a journey to explore exciting vegetarian dining options. Come along and discover fresh plant-based delights with us each weekend!'),
(2, 2, 'Beer Kakis', 'We\'re a fun-loving bunch of pub enthusiasts! Come join us for Friday night experiences in Singapore as we explore the city\'s vibrant pub scene. Join our quest to discover all great pubs in town and unwind every week. NO SEH NO GO HOME!'),
(3, 3, 'Sushi lovers', 'Sushi is love. Sushi is life.'),
(4, 4, 'Caifan Gang', 'JIA FAN ZHE GE NA GE!!! Join us as we are on a hunt for cheap and nice caifan!');

-- GroupChat
INSERT INTO GroupChat (GroupChatID, GroupID, UserID) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4);

-- GroupChatMessages
INSERT INTO GroupChatMessages (GroupChatMessagesID, GroupChatID, UserID, ChatDate, ChatMessage, Pinned) VALUES
(1, 1, 1, '2023-10-22 10:17:52', 'Hi everyone!', 'N'),
(2, 2, 2, '2023-10-22 10:17:52', 'Hii everyone!', 'N'),
(3, 3, 3, '2023-10-22 10:17:52', 'Hello everyone!', 'N'),
(4, 4, 4, '2023-10-22 10:17:52', 'Helloo everyone!', 'N');

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
(1, 1, 38),
(2, 2, 15),
(3, 3, 6),
(4, 4, 9),
(5, 1, 31);

-- GroupRegionPreference
INSERT INTO GroupRegionPreference (GroupRegionPreferenceID, GroupID, RegionPreferenceID) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4);

-- Meeting
INSERT INTO Meeting (MeetingID, GroupID, PlaceID, MeetingDate, MeetingAddress, MeetingDesc, MeetingPlace) VALUES
(1, 1, 'hIJFzUYYm8Z2jERs4gjq8fcHCA','2023-12-12 11:30:00', '930 Yishun Avenue 2, #B2-09/11, Northpoint City North Wing, 930 Yishun Ave 2, #B2-09/11, Singapore 769098', 'Let\'s have some quick bites at Green Dot! We will be going Greendot @ Northpoint. No need to be super punctual, but it will be super crowded at noon.', 'Greendot'),
(2, 2, 'hIJFzUYYm8Z2jERs4gjq8fcHCA','2023-10-11 22:00:00', '165 Tg Pagar Rd, Amara Hotel, Singapore 088539', 'I managed to book for 8 pax. Join us to unwind after work.', 'Jigger & Pony'),
(3, 3, 'hIJFzUYYm8Z2jERs4gjq8fcHCA','2023-11-30 18:00:00', '78 Airport Boulevard B2-227/228 Jewel, Singapore Changi Airport, 819666', 'Legit best sushi here. We will go in pax of 6s. 20% discount available!' ,'Sushiro Jewel Changi'),
(4, 4, 'hIJFzUYYm8Z2jERs4gjq8fcHCA','2023-11-01 11:30:00', '#01-180 Yuhua Market & Food Centre, 347 Jurong East Ave 1, S600347', 'Super budget friendly, tons of options, but might be sold out at 1pm. So don\'t be late and join us at 11.30!' ,'Lam Chan Mixed Veg Rice');
