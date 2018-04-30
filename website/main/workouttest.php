<?php
	
	require 'workout.php';
	require 'routine.php';
	require 'weekly.php';

	$id = 1149198424;

	//echo $_SESSION['user'];
	$workout = new workout();
	//$workout->addWorkout(0, "test bicep workout", "mixture of everything", "TBA");
	//$workout->addWorkout(0, "second workout test", "adding two at a time", "TBA");
	//$workout->removeWorkout(98);
	var_dump($workout->getWorkouts());

	//echo "\n";

	$routine = new routine();
	//echo $id;
	//$routine->addRoutine("Killer Bicep Workout TWo", "The id wont enter" , 3, $id);
	//$routine->defineRoutine(6, 13, 30, 155);
	//$routine->defineRoutine(6, 13, 15, 175);
	//$routine->removeRoutine(19);
	var_dump($routine->getRoutines($id));

	echo "\n";

	$weekly = new weekly();
	//$weekly->addWeekly($id, 6, 1, "02:15:45");
	//$weekly->removeWeekly($id, 6, 1, "02:15:45");
	//$weekly->getWeekly($id);
?>