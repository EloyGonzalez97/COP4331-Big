<?php
	
	require 'workout.php';
	$id = 1149198424;

	/////////////////////////////////////////////////////////////////////////////////////////////
	// admin only
	// This creates adds a workout to the database. This will only be allowed on admin users

	$workout = new workout();

	$workout->addWorkout($id, "0", "Inverted bicycle forearm curls", "This one is a real grinder", "TBA");

	$workout->removeWorkout($workoutID);

	/////////////////////////////////////////////////////////////////////////////////////////////




	/////////////////////////////////////////////////////////////////////////////////////////////
	// user
	// This should create two routines; One for monday and one for tuesday. Then it returns the
	// weekly schedule, removes tuesday's routine, and returns the weekly schedule.
	// Output should be MONDAY AND TUESDAY ROUTINES then MONDAY ROUTINE

	$workout = new workout();

	// creates the routine
	$routineID = $workout->addRoutine("Easy Workout Test", "Testing the functionality", 
										1, 999999);

	// add workouts to routine. must call everytime a workout is added to the routine. Will 
	// upodate it so you can pass JSON object of a routine if time allows

	$workout->defineRoutine($routineID, 0, 15, 25);

	$workout->addWeekly($accessID, $routineID, "Monday", $timestamp);

	$workout->defineRoutine($routineID, 0, 15, 25);

	$workout->addWeekly($accessID, $routineID, "Tuesday", $timestamp);

	$workout->getWeekly($id);

	$workout->removeRoutine($routineID);

	$workout->getWeekly($id);

	$workout->removeWeekly($accessID, $routineID, "Tuesday", $timestamp);

	$workout->getWeekly($id);

	/////////////////////////////////////////////////////////////////////////////////////////////


?>