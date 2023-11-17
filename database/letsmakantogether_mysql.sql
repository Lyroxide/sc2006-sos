
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
  Username VARCHAR(39) NOT NULL,
  `Name` VARCHAR(100) NOT NULL,
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
  GroupName VARCHAR(100) NOT NULL,
  GroupDesc VARCHAR(3000) NOT NULL,
  PRIMARY KEY (GroupID),
  FOREIGN KEY (OwnerID) REFERENCES Users(UserID)
);


-- Table: GroupChatMessages
CREATE TABLE GroupChatMessage (
  GroupChatMessageID INT AUTO_INCREMENT,
  GroupID INT NOT NULL,
  UserID INT NOT NULL,
  MessageDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  Message VARCHAR(3000) NOT NULL,
  PRIMARY KEY (GroupChatMessageID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID) ON DELETE CASCADE,
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


-- Table: GroupMember
CREATE TABLE GroupMember (
  GroupMemberID INT AUTO_INCREMENT,
  UserID INT NOT NULL,
  GroupID INT NOT NULL,
  PRIMARY KEY (GroupMemberID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID) ON DELETE CASCADE
);


-- Table: GroupPicture
CREATE TABLE GroupPicture (
  PictureID INT AUTO_INCREMENT,
  GroupID INT NOT NULL,
  PictureFile VARCHAR(255) NOT NULL,
  PRIMARY KEY (PictureID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID) ON DELETE CASCADE
);


-- Table: GroupFoodPreference
CREATE TABLE GroupFoodPreference (
  GroupFoodPreferenceID INT AUTO_INCREMENT,
  GroupID INT NOT NULL,
  FoodPreferenceID INT NOT NULL,
  PRIMARY KEY (GroupFoodPreferenceID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID) ON DELETE CASCADE,
  FOREIGN KEY (FoodPreferenceID) REFERENCES FoodPreference(FoodPreferenceID),
  UNIQUE KEY UQ_Group_Food_Preference (GroupID, FoodPreferenceID)
);


-- Table: GroupRegionPreference
CREATE TABLE GroupRegionPreference (
  GroupRegionPreferenceID INT AUTO_INCREMENT,
  GroupID INT NOT NULL,
  RegionPreferenceID INT NOT NULL,
  PRIMARY KEY (GroupRegionPreferenceID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID) ON DELETE CASCADE,
  FOREIGN KEY (RegionPreferenceID) REFERENCES RegionPreference(RegionPreferenceID),
  UNIQUE KEY UQ_Group_Region_Preference (GroupID, RegionPreferenceID)
);


-- Table: Meeting
CREATE TABLE Meeting (
  MeetingID INT AUTO_INCREMENT,
  GroupID INT NOT NULL,
  PlaceID VARCHAR(27) NOT NULL,
  MeetingDate DATETIME NOT NULL,
  MeetingAddress VARCHAR(255) NOT NULL,
  MeetingDesc VARCHAR(3000) NOT NULL,
  MeetingPlace VARCHAR(255) NOT NULL,
  PRIMARY KEY (MeetingID),
  FOREIGN KEY (GroupID) REFERENCES `Groups`(GroupID) ON DELETE CASCADE
);


-- Table: ResetPasswordToken
CREATE TABLE ResetPasswordToken (
    Email VARCHAR(255) NOT NULL,
    ResetToken VARCHAR(255) NOT NULL,
    PRIMARY KEY (Email)
);


/* Start of generation of sample data */
-- Users
INSERT INTO Users (UserID, Username, `Name`, Email, Age, Gender, `Password`) VALUES
(1, 'Sanrio123', 'Cinnamon', 'sanrio_cinnamon@gmail.com', 18, 'Female', '$2y$10$y1B/5ZA3xKVpXM2rDt.ho.PHR2eRDL7fRAeWCn7N9HONFiB0TcYgu'),
(2, 'Tanny23', 'Tom Tan', 'tantom@gmail.com', 24, 'Male', '$2y$10$ftvAzhHjM10IeIhyaRB1tOcX3O3h1aRgTryXhmBJ.l1ikgpJva8dq'),
(3, 'Pancake77', 'Best Pancake', 'pancakemaybe@gmail.com', 22, 'Male', '$2y$10$hBTKGexS/gA0pLnoRJrkGemr9mO9uHPE7kVtuLvt96H26825vhLlC'),
(4, 'Waffle12', 'Best Waffle', 'wafflechoco@gmail.com', 25, 'Male', '$2y$10$sh4MZ0SkKEqD4tjoxWukyuFXSruMIZkMyxBuGq9AUIu0nMX3BK9KG'),
(5, 'kevin', 'Kevin', 'kevintanyonghow@gmail.com', 23, 'Animal', '$2y$10$y1B/5ZA3xKVpXM2rDt.ho.PHR2eRDL7fRAeWCn7N9HONFiB0TcYgu');


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
INSERT INTO UserPicture (PictureID, UserID, PictureFile) VALUES
(1, 1, 'Grass.jpg'),
(2, 2, 'Beer.jpg'),
(3, 3, 'Sushi.jpg'),
(4, 4, 'Cai.png');


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


-- GroupChatMessages
INSERT INTO GroupChatMessage (GroupChatMessageID, GroupID, UserID, MessageDate, Message) VALUES
(1, 1, 1, '2023-10-22 10:17:52', 'Hi everyone!'),
(2, 2, 2, '2023-10-22 10:17:52', 'Hii everyone!'),
(3, 3, 3, '2023-10-22 10:17:52', 'Hello everyone!'),
(4, 4, 4, '2023-10-22 10:17:52', 'Helloo everyone!'),
(5, 1, 2, '2023-10-22 10:27:52', 'wassup');


-- GroupMember
INSERT INTO GroupMember (GroupMemberID, UserID, GroupID) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 2, 1);


-- GroupPicture
INSERT INTO GroupPicture (PictureID, GroupID, PictureFile) VALUES
(1, 1, 'Grass.jpg'),
(2, 2, 'Beer.jpg'),
(3, 3, 'Sushi.jpg'),
(4, 4, 'Cai.png');


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
(2, 2, 'ChIJ36AdBg0Z2jERvFl0QFoqZ0E','2023-10-11 22:00:00', '165 Tg Pagar Rd, Amara Hotel, Singapore 088539', 'I managed to book for 8 pax. Join us to unwind after work.', 'Jigger & Pony'),
(3, 3, 'ChIJQ51o40Y92jERStkiz0uY78w','2023-11-30 18:00:00', '78 Airport Boulevard B2-227/228 Jewel, Singapore Changi Airport, 819666', 'Legit best sushi here. We will go in pax of 6s. 20% discount available!' ,'Sushiro Jewel Changi'),
(4, 4, 'ChIJZfromh8Q2jER5-7OVxJevCk','2023-11-01 11:30:00', '347 Jurong East Ave 1, #01-180, Singapore 600347', 'Super budget friendly, tons of options, but might be sold out at 1pm. So don\'t be late and join us at 11.30!' ,'Lam Chan Mixed Veg Rice');

-- Meetings for Group 1: Grass
INSERT INTO Meeting (GroupID, PlaceID, MeetingDate, MeetingAddress, MeetingDesc, MeetingPlace) VALUES
(1, '', '2023-01-15 12:30:00', '101 Veg Location, Veggie Lane, Singapore 123456', 'Healthy Eating Gathering', 'Veggie Delight'),
(1, '', '2023-02-10 11:45:00', '202 Green Terrace, Plant-Based Park, Singapore 654321', 'Plant-Based Buffet Meetup', 'Green Buffet'),
(1, '', '2023-03-21 13:00:00', '333 Veggie Boulevard, Singapore 789101', 'Farmers Market Luncheon', 'Market Bites'),
(1, '', '2023-04-18 12:00:00', '404 Salad Street, Singapore 223344', 'Salad Social', 'Salad Bowl Bistro'),
(1, '', '2023-01-15 12:30:00', '101 Veg Location, Veggie Lane, Singapore 123456', 'Healthy Eating Gathering', 'Veggie Delight'),
(1, '', '2023-02-10 11:45:00', '202 Green Terrace, Plant-Based Park, Singapore 654321', 'Plant-Based Buffet Meetup', 'Green Buffet'),
(1, '', '2023-03-21 13:00:00', '333 Veggie Boulevard, Singapore 789101', 'Farmers Market Luncheon', 'Market Bites'),
(1, '', '2023-04-18 12:00:00', '404 Salad Street, Singapore 223344', 'Salad Social', 'Salad Bowl Bistro'),
(1, 'ChIJtcxff28U2jER1Ux43_QFQ2I','2023-12-12 11:30:00', '930 Yishun Avenue 2, #B2-09/11, Northpoint City North Wing, 930 Yishun Ave 2, #B2-09/11, Singapore 769098', 'Let\'s have some quick bites at Green Dot! We will be going Greendot @ Northpoint. No need to be super punctual, but it will be super crowded at noon.', 'Greendot');