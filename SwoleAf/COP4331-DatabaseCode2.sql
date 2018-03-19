#SwoleAF SQL Code
#Author: William Gross

#This is the SQL code to create the database, tables and procedures to run the SwoleAF website. There is a short description
#of what each procedure does above its declaration but I think the names are descriptive enough. The only ones that I believe
#need more complete descriptions are marked with a *. They are covered in the README. The procedures are listed below for
#quick reference. To user on, use CALL SwoleAF.<procedure name>:
#----------User Creation and Login----------
# CreateUser(UserName, Email, FirstName, LastName, Password)
# Login((UserName or Email), Password)
#----------Trainer Status----------
# CheckSecurityLvl(UserID)
# PromoteUser(UserID)
# DemoteUser(UserID)
#----------Workout Customization----------
# AddWorkout(MuscleGroup, Name, Full Description, Location of Reference Image)
# RemoveWorkout(WorkoutID)
# GetWorkouts()
# *AddRoutine(Name, Full Description, Difficulty, ID of Creator, JSON string)
# RemoveRoutine(RoutineID)
# GetRoutines(UserID)
# *AddWeeklySchedule(UserID, JSON string)
# RemoveWeeklySchedule(UserID, RoutineId, Day of the week)
# GetWeeklySchedule(UserID) 



CREATE SCHEMA IF NOT EXISTS SwoleAF;

CREATE TABLE IF NOT EXISTS SwoleAF.Users
(
	UserID INT PRIMARY KEY,
	UserName VARCHAR(25) UNIQUE NOT NULL,
	Email VARCHAR(50) UNIQUE NOT NULL,
	FirstName VARCHAR(35) NOT NULL,
	LastName VARCHAR(35),
	PasswordCode VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS SwoleAF.Trusted
(
	TrustedID INT,
    FOREIGN KEY (TrustedID) REFERENCES SwoleAF.Users(UserID) ON DELETE CASCADE
);

#Here I create the Admin account and add it to trusted. The default ID is 0.
INSERT INTO SwoleAF.Users(
		UserID,
		UserName,
		Email,
		FirstName,
		LastName,
		PasswordCode
	)VALUES(
		0, 
		'ADMIN',
		'N/A',
		'Swole',
		'King',
		MD5('KingsOfSwoleAF')
);
INSERT INTO SwoleAF.Trusted(TrustedID) VALUES (0);

CREATE TABLE IF NOT EXISTS SwoleAF.Routines
(
	RoutineID INT PRIMARY KEY AUTO_INCREMENT,
	RoutineName VARCHAR(45) NOT NULL,
	RoutineDescription TEXT NOT NULL,
	RoutineDifficulty TINYINT NOT NULL,
	RoutineCreator INT,
    FOREIGN KEY (RoutineCreator) REFERENCES SwoleAF.Users(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SwoleAF.Workouts
(
	WorkoutID INT PRIMARY KEY AUTO_INCREMENT,
	WorkoutMuscleGroup TINYINT NOT NULL,
	WorkoutName VARCHAR(45) NOT NULL,
	WorkoutDescription TEXT NOT NULL,
	W_ImageAddress VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS SwoleAF.Routine_Workout
(
	RoutineID INT, 
	WorkoutID INT,
	Reps SMALLINT NOT NULL,
	Weight SMALLINT,
    FOREIGN KEY(RoutineID) REFERENCES Routines(RoutineID) ON DELETE CASCADE,
	FOREIGN KEY(WorkoutID) REFERENCES Workouts(WorkoutID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS SwoleAF.User_Routine
(
	UserID INT,
	RoutineID INT,
	Weekday TINYINT,
	StartTime TIME,
    FOREIGN KEY(UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
	FOREIGN KEY(RoutineID) REFERENCES Routines(RoutineID) ON DELETE CASCADE
);

DELIMITER \\

#Creates users with the provided info. Last name isn't required. This procedure
#returns the ID of the generated account. On an error, it returns -1. 
CREATE PROCEDURE SwoleAF.CreateUser(
    U_Name_Input VARCHAR(25),
	Email_Input VARCHAR(50),
	F_Name_Input VARCHAR(35),
	L_Name_Input VARCHAR(35),
	Password_Input VARCHAR(32)
)
BEGIN
	DECLARE GeneratedID INT;
    DECLARE CONTINUE HANDLER FOR 1062
		SET GeneratedID = -1;
    SET GeneratedID = (RAND() * 2000000000 + 1);
		
	WHILE(SELECT COUNT(*) FROM SwoleAF.Users WHERE UserID = GeneratedID > 0)
    DO
		SET GeneratedID = RAND();
	END WHILE;
	INSERT INTO SwoleAF.Users(
		UserID,
		UserName,
		Email,
		FirstName,
		LastName,
		PasswordCode
	)VALUES(
		GeneratedID, 
		U_Name_Input,
		Email_Input,
		F_Name_Input,
		L_Name_Input,
		Password_Input
	);
	SELECT GeneratedID;
END \\

#Returns the ID associated with the given info. The username input can be either
#the account's username or the email. Either one works.
CREATE PROCEDURE SwoleAF.Login(
	IN U_Name_Input VARCHAR(50),
    IN Password_Input VARCHAR(32)
)
BEGIN
	SELECT UserID FROM Users WHERE Password_Input = PasswordCode AND (U_Name_Input = UserName OR U_Name_Input = Email);
END \\

#checks the security level of a given user
# 0 = normal user, 1 = trainer, 2 = admin
CREATE PROCEDURE SwoleAF.CheckSecurityLvl(UserID INT)
BEGIN
	DECLARE Level;
	SET Level = 0;
	SET Level = IF(UserID EXISTS(SELECT * FROM SwoleAF.Trusted), 1, 0);
	SET Level = IF(UserID = 0, 2, 0);
	SELECT Level;
END \\

#adds the supplied ID to the trusted table
CREATE PROCEDURE SwoleAF.PromoteUser(UserID INT)
BEGIN
	INSERT INTO SwoleAF.Trusted(TrustedID)VALUES(UserID);
END \\

#removes the supplied ID from the trusted table
CREATE PROCEDURE SwoleAF.DemoteUser(UserID INT)
BEGIN
	DELETE FROM SwoleAF.Trusted WHERE TrustedID = UserID;
END \\

#returns all of the workouts
CREATE PROCEDURE SwoleAF.GetWorkouts()
BEGIN
	SELECT * FROM SwoleAF.Workouts ORDER BY WorkoutMuscleGroup ASC, WorkoutName DESC;
END \\

#creates a workout based on the given info
CREATE PROCEDURE SwoleAF.AddWorkout(
	IN Muscle_Group_Input TINYINT,
    IN Name_Input VARCHAR(45),
    IN Description_Input TEXT,
	IN Address_Input Varchar(60)
)
BEGIN
	INSERT INTO SwoleAF.Workouts(
		WorkoutMuscleGroup,
        WorkoutName,
        WorkoutDescription,
        W_ImageAddress
    )VALUES(
		Muscle_Group_Input,
        Name_Input,
        Description_Input,
        Address_Input
    );
END \\

#removes a workout from the workout table
CREATE PROCEDURE SwoleAF.RemoveWorkout(IN DropID INT)
BEGIN
	DELETE FROM SwoleAF.Workouts WHERE WorkoutID = DropID;
END \\

#Retrieves any routines created by the user or anyone that is
#found in the trusted table.
CREATE PROCEDURE SwoleAF.GetRoutines(IN AccessID INT)
BEGIN
	SELECT * FROM SwoleAF.Routines WHERE RoutineCreator = AccessID OR EXISTS (SELECT * FROM Trusted) ORDER BY RoutineName DESC;
END \\

#Creates a routine in the routine table with the given info.
#Also creates the appropriate links in the routine_workout
#table using the json input.
CREATE PROCEDURE SwoleAF.AddRoutine(
	IN Name_Input VARCHAR(45),
    IN Description_Input TEXT,
    IN Difficulty_Input TINYINT,
    IN AccessID INT,
    IN WorkoutData JSON
)
BEGIN
	DECLARE Counter INT;
    DECLARE Len INT;
    DECLARE NewID INT;
    DECLARE TempCode INT;
    DECLARE TempReps INT; 
    DECLARE TempWeight INT;
    SET Counter = 0;
    SET Len = JSON_LENGTH(WorkoutData, '$.Workouts');
	INSERT INTO SwoleAF.Routines(
		RoutineName,
        RoutineDescription,
        RoutineDifficulty,
        RoutineCreator
    )VALUES(
		Name_Input,
        Description_Input,
        Difficulty_Input,
        AccessID
    );
    SET NewID = LAST_INSERT_ID();
    WHILE Counter < Len
    DO
		SET TempCode = JSON_EXTRACT(WorkoutData, CONCAT('$.Workouts[', Counter, '][0]'));
        SET TempReps = JSON_EXTRACT(WorkoutData, CONCAT('$.Workouts[', Counter, '][1]'));
        SET TempWeight = IF(JSON_TYPE(JSON_EXTRACT(WorkoutData, CONCAT('$.Workouts[', Counter, '][2]'))) = "NULL",
							NULL,
                            JSON_EXTRACT(WorkoutData, CONCAT('$.Workouts[', Counter, '][2]')));
        INSERT INTO SwoleAF.Routine_Workout(
			RoutineID,
            WorkoutID,
            Reps,
            Weight
        )VALUES(
			NewID,
            TempCode,
            TempReps,
            TempWeight
        );
        SET Counter = Counter + 1;
    END WHILE;
END \\

#removes a routine from the routine table
CREATE PROCEDURE SwoleAF.RemoveRoutine(IN DropID INT)
BEGIN
	DELETE FROM SwoleAF.Routines WHERE RoutineID = DropID;
END \\

#retrieves the weekly schedule for a given user
CREATE PROCEDURE SwoleAF.GetWeeklySchedule(IN AccessID INT)
BEGIN
	SELECT * FROM User_Routine 
		JOIN Routines ON User_Routine.RoutineID = Routines.RoutineID
		JOIN Routine_Workout ON Routines.RoutineID = Routine_Workout.RoutineID
		JOIN Workouts ON Routine_Workout.WorkoutID = Workouts.WorkoutID
	WHERE UserID = AccessID
    ORDER BY Weekday ASC;
END \\

#adds routines to a users weekly schedule
CREATE PROCEDURE SwoleAF.AddWeeklySchedule(
	IN AccessID INT, 
    IN ScheduleData JSON
)
BEGIN
	DECLARE Counter INT;
    DECLARE Len INT;
    DECLARE TempID INT;
    DECLARE TempWeekday TINYINT;
    DECLARE TempTimeString VARCHAR(10);
    DECLARE TempTime TIME;
    SET Counter = 0;
    SET Len = JSON_LENGTH(ScheduleData, '$.Schedule');
   
    WHILE Counter < Len 
    DO
		SET TempID = JSON_EXTRACT(ScheduleData, CONCAT('$.Schedule[', Counter, '][0]'));
        SET TempWeekday = JSON_EXTRACT(ScheduleData, CONCAT('$.Schedule[', Counter, '][1]'));
        SET TempTimeString = JSON_EXTRACT(ScheduleData, CONCAT('$.Schedule[', Counter, '][2]'));
        SET TempTime = STR_TO_DATE(TempTimeString, '"%H:%i"'); 
        INSERT INTO SwoleAF.User_Routine(
			UserID,
            RoutineID,
            Weekday,
            StartTime
        )VALUES(
			AccessID,
            TempID,
            TempWeekday,
            TempTime
        );
        
        SET Counter = Counter + 1;
    END WHILE;
END \\

#removes a routine from a users weekly schedule given the
#id and day that it was assigned
CREATE PROCEDURE SwoleAF.RemoveWeeklySchedule(
	AccessID INT,
    RoutineID_Input INT,
    WeekDay_Input TINYINT
)
BEGIN
	DELETE FROM SwoleAF.User_Routine WHERE UserID = AccessID AND RoutineID_Input = RoutineID AND Weekday_Input = Weekday;
END \\

DELIMITER ;
