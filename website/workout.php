<?php

class Workout {

	public function __construct() {

	}

	public function connect() {
			static $db;

			if(!isset($db)) {
				$db = mysqli_connect("localhost", "webalex", "vr8aTp573L", "webalex_SwoleAF");
			}

			if($db === false) {
				return mysqli_connect_error();
			}

			return $db;
		}

	public function getID() {
		return $_SESSION["user"];
	}

	public function addWorkout($groupID, $name, $description, $imgloc) {
		$db = $this->connect();
		$sql = "CALL AddWorkout('"  . $groupID . "','" . $name . "','" . $description . "','" . $imgloc . "')";

		if(mysqli_query($db, $sql)) {
			echo "workout " . $name . " added";
			echo "NICE";
		} else {
			echo "NOT NICE";
		}

	}

	public function removeWorkout($workoutID) {
		$db = $this->connect();
		$sql = "CALL RemoveWorkout('" . $workoutID . "')";
		if(mysqli_query($db, $sql)) {
			echo "remove works";
		} else {
			echo "remove doesnt work";
		}
	}

	public function getWorkouts() {
		$db = $this->connect();
		$sql = "CALL GetWorkouts()";
		$result = mysqli_query($db, $sql);
		while($row = mysqli_fetch_assoc($result)) {
			// parse the results then create JSON object for all workouts
			echo $row["WorkoutID"] . $row["WorkoutMuscleGroup"] . $row["WorkoutName"] . $row["WorkoutDescription"] . $row["W_ImageAddress"] . "\n";
		}
	}

	public function addRoutine($name, $description, $difficulty, $accessID) { 
		$db = $this->connect();
		$sql = "CALL AddRoutine('" . $name . "','" . $description . "','" . $difficulty . "','" . $accessID . "')";
		$result = mysqli_query($db, $sql);
		echo $result;

		$rtn = 0;
		return $rtn;
	}

	public function defineRoutine($routineID, $workoutID, $reps, $weight) {
		$db = $this->connect();
		$sql = "CALL DefineRoutine('" . $routineID . "','" . $workoutID . "','" . $reps . "','" . $weight . "')";
		mysqli_query($db, $sql);
	}

	public function removeRoutine($routineID) {
		$db = $this->connect();
		$sql = "CALL removeRoutine('" . $routineID . "')";
		mysqli_query($db, $sql);
	}

	public function getRoutines($accessID) {
		$db = $this->connect();
		$sql = "CALL GetRoutines('" . $accessID . "')";
		$result = mysqli_query($db, $sql);
	}

	public function addWeekly($accessID, $routineID, $weekday, $time) {
		$db = $this->connect();
		$sql = "CALL addWeeklySchedule('" . $accessID . "','" . $routineID . "','" . $weekday . "','" . $time . "')";
		mysqli_query($db, $sql);
	}

	public function removeWeekly($accessID, $routineID, $weekday, $time) {
		$db = $this->connect();
		$sql = "CALL removeWeeklySchedule('" . $accessID . "','" . $routineID . "','" . $weekday . "','" . $time . "')";
		mysqli_query($db, $sql);
	}

	public function getWeekly($userID) {
		$userID = $_SESSION["user"];
		$db = $this->connect();
		$sql = "CALL getWeeklySchedule('" . $accessID . "')";
		$result = mysqli_query($db, $sql);


		return $JsonWeekly;
	}

}

?>