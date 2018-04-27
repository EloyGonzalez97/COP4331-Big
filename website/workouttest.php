<?php
	
	require 'workout.php';
	require 'routine.php';

	$id = 1149198424;
	$workout = new workout();
	$workout->addWorkout(0, "test bicep workout", "mixture of everything", "TBA");
	$workout->addWorkout(0, "second workout test", "adding two at a time", "TBA");
	$workout->removeWorkout(98);
	$workout->getWorkouts();

	$routine = new routine();
	//$routine->addRoutine("Killer Bicep Workout", "All the classic" , 3, $id);
	$routine->defineRoutine(6, 13, 30, 155);
	$routine->defineRoutine(6, 13, 15, 175);
	$routine->removeRoutine(19);
?>