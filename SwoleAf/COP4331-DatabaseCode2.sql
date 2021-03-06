#SwoleAF SQL Code
#Author: William Gross

#This is the SQL code to create the database, tables and procedures to run the SwoleAF website. There is a short description
#of what each procedure does above its declaration but I think the names are descriptive enough. The procedures are listed below for
#quick reference. To use these procedures, use CALL webalex_SwoleAF.<procedure name>:
#----------User Creation and Login----------
# CreateUser(UserName, Email, FirstName, LastName, Password)
# Login((UserName or Email), Password)
# GetUserInfo(UserID)
#----------Trainer Status----------
# CheckSecurityLvl(UserID)
# PromoteUser(UserID)
# DemoteUser(UserID)
#----------Workout Customization----------
# AddWorkout(MuscleGroup, Name, Full Description, Location of Reference Image)
# RemoveWorkout(WorkoutID)
# GetWorkouts()
# WorkoutLookup(WorkoutID)
# AddRoutine(Name, Full Description, Difficulty, ID of Creator)
# DefineRoutine(RoutineID, WorkoutID, Reps, Weight, Sets)
# RemoveFromRoutine(RoutineID, WorkoutID, Reps, Weight, Sets)
# RemoveRoutine(RoutineID)
# GetRoutines(UserID)
# GetPublicRoutines()
# AddWeeklySchedule(UserID, RoutineID, Weekday, Time)
# RemoveWeeklySchedule(UserID, RoutineId, Day of the week)
# GetWeeklySchedule(UserID) 



CREATE SCHEMA IF NOT EXISTS SwoleAF;

CREATE TABLE IF NOT EXISTS webalex_SwoleAF.Users
(
	UserID INT PRIMARY KEY,
	UserName VARCHAR(25) UNIQUE NOT NULL,
	Email VARCHAR(50) UNIQUE NOT NULL,
	FirstName VARCHAR(35) NOT NULL,
	LastName VARCHAR(35),
	PasswordCode VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS webalex_SwoleAF.Trusted
(
	TrustedID INT UNIQUE,
    FOREIGN KEY (TrustedID) REFERENCES webalex_SwoleAF.Users(UserID) ON DELETE CASCADE
);

#Here I create the Admin account and add it to trusted. The default ID is 0.
INSERT INTO webalex_SwoleAF.Users(
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
INSERT INTO webalex_SwoleAF.Trusted(TrustedID) VALUES (0);

CREATE TABLE IF NOT EXISTS webalex_SwoleAF.Routines
(
	RoutineID INT PRIMARY KEY AUTO_INCREMENT,
	RoutineName VARCHAR(45) NOT NULL,
	RoutineDescription TEXT NOT NULL,
	RoutineDifficulty TINYINT NOT NULL,
	RoutineCreator INT,
    FOREIGN KEY (RoutineCreator) REFERENCES webalex_SwoleAF.Users(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS webalex_SwoleAF.Workouts
(
	WorkoutID INT PRIMARY KEY AUTO_INCREMENT,
	WorkoutMuscleGroup TINYINT NOT NULL,
	WorkoutName VARCHAR(45) NOT NULL,
	WorkoutDescription TEXT NOT NULL,
	W_ImageAddress VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS webalex_SwoleAF.Routine_Workout
(
	RoutineID INT, 
	WorkoutID INT,
	Reps SMALLINT NOT NULL,
	Weight SMALLINT,
	Sets SMALLINT,
    FOREIGN KEY(RoutineID) REFERENCES Routines(RoutineID) ON DELETE CASCADE,
	FOREIGN KEY(WorkoutID) REFERENCES Workouts(WorkoutID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS webalex_SwoleAF.User_Routine
(
	UserID INT,
	RoutineID INT,
	Weekday TINYINT,
	StartTime TIME,
    FOREIGN KEY(UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
	FOREIGN KEY(RoutineID) REFERENCES Routines(RoutineID) ON DELETE CASCADE
);

DELIMITER \\
#returns the ID of the generated account. On an error, it returns -1. 
CREATE PROCEDURE webalex_SwoleAF.CreateUser(
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
		
	WHILE(SELECT COUNT(*) FROM webalex_SwoleAF.Users WHERE UserID = GeneratedID > 0)
    DO
		SET GeneratedID = RAND();
	END WHILE;
	INSERT INTO webalex_SwoleAF.Users(
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
#the accounts username or the email. Either one works.
CREATE PROCEDURE webalex_SwoleAF.Login(
	IN U_Name_Input VARCHAR(50),
    IN Password_Input VARCHAR(32)
)
BEGIN
	SELECT UserID, UserName, Email,	FirstName, LastName FROM Users WHERE Password_Input = PasswordCode AND (U_Name_Input = UserName OR U_Name_Input = Email);
END \\

#Gets the user info for a given UserID
CREATE PROCEDURE webalex_SwoleAF.GetUserInfo(
	IN AccessID
)
BEGIN
	SELECT UserName, Email,	FirstName, LastName FROM webalex_SwoleAF.Users WHERE AccessID = UserID;
END \\

#checks the security level of a given user
# 0 = normal user, 1 = trainer, 2 = admin
CREATE PROCEDURE webalex_SwoleAF.CheckSecurityLvl(UserID INT)
BEGIN
	DECLARE S_Level TINYINT;
	SET S_Level = 0;
	SET S_Level = IF((SELECT COUNT(*) FROM webalex_SwoleAF.Trusted WHERE TrustedID = UserID) > 0 , 1, 0);
	SET S_Level = IF(UserID = 0, 2, S_Level);
	SELECT S_Level;
END \\

#adds the supplied ID to the trusted table
CREATE PROCEDURE webalex_SwoleAF.PromoteUser(UserID INT)
BEGIN
	INSERT INTO webalex_SwoleAF.Trusted(TrustedID)VALUES(UserID);
END \\

#removes the supplied ID from the trusted table
CREATE PROCEDURE webalex_SwoleAF.DemoteUser(UserID INT)
BEGIN
	DELETE FROM webalex_SwoleAF.Trusted WHERE TrustedID = UserID;
END \\

#returns all of the workouts
CREATE PROCEDURE webalex_SwoleAF.GetWorkouts()
BEGIN
	SELECT 
		WorkoutID, 
		MuscleGroupLookup.MuscleGroupName, 
		WorkoutName, 
		WorkoutDescription,
		W_ImageAddress 
	FROM webalex_SwoleAF.Workouts 
	JOIN webalex_SwoleAF.MuscleGroupLookup ON MuscleGroupLookup.MuscleGroupID = Workouts.WorkoutMuscleGroup 
	ORDER BY WorkoutMuscleGroup ASC, WorkoutName ASC;
END \\

#creates a workout based on the given info
CREATE PROCEDURE webalex_SwoleAF.AddWorkout(
	IN Muscle_Group_Input TINYINT,
    IN Name_Input VARCHAR(45),
    IN Description_Input TEXT,
	IN Address_Input Varchar(60)
)
BEGIN
	INSERT INTO webalex_SwoleAF.Workouts(
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
CREATE PROCEDURE webalex_SwoleAF.RemoveWorkout(IN DropID INT)
BEGIN
	DELETE FROM webalex_SwoleAF.Workouts WHERE WorkoutID = DropID;
END \\

CREATE PROCEDURE webalex_SwoleAF.WorkoutLookup(IN WorkoutName_Input VARCHAR(45))
BEGIN
	SELECT WorkoutID FROM Workouts WHERE WorkoutName = WorkoutName_Input;
END \\

#Retrieves any routines created by the user or anyone that is
#found in the trusted table.
CREATE PROCEDURE webalex_SwoleAF.GetRoutines(IN AccessID INT)
BEGIN
	SELECT Routines.RoutineID, 
	Routines.RoutineName, 
	Routines.RoutineDescription, 
	Routines.RoutineDifficulty, 
	Routines.RoutineCreator, 
	Routine_Workout.WorkoutID, 
	Workouts.WorkoutName, 
	MuscleGroupLookup.MuscleGroupName, 
	Routine_Workout.Reps, 
	Routine_Workout.Weight, 
	Routine_Workout.Sets 
	FROM webalex_SwoleAF.Routines 
		JOIN Routine_Workout ON Routines.RoutineID = Routine_Workout.RoutineID 
		JOIN Workouts ON Routine_Workout.WorkoutID = Workouts.WorkoutID 
		JOIN MuscleGroupLookup on MuscleGroupLookup.MuscleGroupID = Workouts.WorkoutMuscleGroup 
	WHERE AccessID = Routines.RoutineCreator 
	OR EXISTS (SELECT * FROM Trusted WHERE Trusted.TrustedID = Routines.RoutineCreator) 
	ORDER BY RoutineCreator ASC, RoutineName ASC;
END \\

CREATE PROCEDURE webalex_SwoleAF.GetPublicRoutines()
BEGIN
	SELECT * FROM webalex_SwoleAF.Routines WHERE EXISTS (SELECT * FROM Trusted WHERE Trusted.TrustedID = Routines.RoutineCreator) ORDER BY RoutineCreator ASC, RoutineName ASC;
END \\

#Creates a routine in the routine table with the given info.
CREATE PROCEDURE webalex_SwoleAF.AddRoutine(
	IN Name_Input VARCHAR(45),
    IN Description_Input TEXT,
    IN Difficulty_Input TINYINT,
    IN AccessID INT
)
BEGIN
	INSERT INTO webalex_SwoleAF.Routines(
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
    SELECT LAST_INSERT_ID();
END \\

#Adds a set to the routine
CREATE PROCEDURE webalex_SwoleAF.DefineRoutine(
	IN RoutineID_Input INT,
    IN WorkoutID_Input INT,
    IN Reps_Input INT,
    IN Weights_Input INT,
	IN Sets_Input INT)
BEGIN
	INSERT INTO webalex_SwoleAF.Routine_Workout(
		RoutineID,
        WorkoutID,
        Reps,
        Weight,
	Sets
    )VALUES(
		RoutineID_Input,
        WorkoutID_Input,
        Reps_Input,
        Weights_Input,
	Sets_Input
    );
END \\

#removes a set from the routine
CREATE PROCEDURE webalex_SwoleAF.RemoveFromRoutine(
	IN RoutineID_Input INT,
    IN WorkoutID_Input INT,
    IN Reps_Input INT,
    IN Weights_Input INT,
	IN Sets_Input INT)
BEGIN
	DELETE FROM Routine_Workout 
    	WHERE RoutineID = RoutineID_Input AND
        	WorkoutID = WorkoutID_Input AND
            Weight = Weight_Input AND
            Reps = Reps_Input AND
	    Sets = Sets_Input;
END \\

#removes a routine from the routine table
CREATE PROCEDURE webalex_SwoleAF.RemoveRoutine(IN DropID INT)
BEGIN
	DELETE FROM webalex_SwoleAF.Routines WHERE RoutineID = DropID;
END \\

#retrieves the weekly schedule for a given user
CREATE PROCEDURE webalex_SwoleAF.GetWeeklySchedule(IN AccessID INT)
BEGIN
	SELECT 
		Weekday, 
		StartTime, 
        Routines.RoutineID, 
        RoutineName, 
        RoutineDescription,
        RoutineDifficulty, 
        Workouts.WorkoutID, 
        WorkoutName, 
        MuscleGroupLookup.MuscleGroupName, 
        Reps, 
        Weight, 
	Sets,
        WorkoutDescription, 
        W_ImageAddress 
        FROM User_Routine 
		JOIN Routines ON User_Routine.RoutineID = Routines.RoutineID
		JOIN Routine_Workout ON Routines.RoutineID = Routine_Workout.RoutineID
		JOIN Workouts ON Routine_Workout.WorkoutID = Workouts.WorkoutID
            JOIN MuscleGroupLookup ON Workouts.WorkoutMuscleGroup = MuscleGroupLookup.MuscleGroupID
	WHERE UserID = AccessID
    ORDER BY Weekday ASC;
END \\

#adds routines to a users weekly schedule
CREATE PROCEDURE webalex_SwoleAF.AddWeeklySchedule(
	IN AccessID INT, 
    IN RoutineID_Input INT,
    IN Weekday_Input TINYINT,
    IN Time_Input TIME
)
BEGIN
    INSERT INTO webalex_SwoleAF.User_Routine(
		UserID,
        RoutineID,
        Weekday,
        StartTime
	)VALUES(
		AccessID,
        RoutineID_Input,
        Weekday_Input,
        Time_Input
	);
END \\

#removes a routine from a users weekly schedule given the
#id and day that it was assigned
CREATE PROCEDURE webalex_SwoleAF.RemoveWeeklySchedule(
	AccessID INT,
    RoutineID_Input INT,
    WeekDay_Input TINYINT,
    Time_Input TIME
)
BEGIN
	DELETE FROM webalex_SwoleAF.User_Routine WHERE UserID = AccessID AND RoutineID_Input = RoutineID AND Weekday_Input = Weekday AND Time_Input = StartTime;
END \\

DELIMITER ;
