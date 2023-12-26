-- Active: 1700278504603@@127.0.0.1@3306@propertyprospector
CREATE Table Users(
    userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR (30),
    lastName VARCHAR (50),
    emailAddress VARCHAR (200),
    password VARCHAR (30)
);

CREATE Table Clients(
    clientID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR (30),
    lastName VARCHAR (50),
    emailAddress VARCHAR (200),
    phoneNumber INTEGER,
    address VARCHAR (100),
    buyingOrSelling VARCHAR (20),
    reqBeds INTEGER,
    reqBaths INTEGER,
    reqLiving INTEGER,
    reqGarage VARCHAR (20),
    reqSuburb VARCHAR (100),
    userID INTEGER,
    Foreign Key (userID) REFERENCES Users(userID)
);

CREATE TABLE Properties(
    propertyID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userID INTEGER,
    Foreign Key (userID) REFERENCES Users(userID)
);

CREATE table OpenHomeAttendees(
    openHomeAttendeesID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    propertyID INTEGER,
    clientID INTEGER,
    Foreign Key (propertyID) REFERENCES Properties(propertyID),
    Foreign Key (clientID) REFERENCES Clients(clientID)
);