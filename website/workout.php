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
		$sql = "CALL AddWorkout('" . $groupID . "','" . $name . "','" . $description . "','" . $imgloc . "')";
		if(mysqli_query($db, $sql)) {
			echo "The workout " . $name . "has been added";
		}
		
		//mysqli_free_result($result);
		unset($db);
	}

	public function removeWorkout($workoutID) {
		$db = $this->connect();
		$sql = "CALL RemoveWorkout('" . $workoutID . "')";
		if(mysqli_query($db, $sql)) {
			echo "workout with the id :" . $workoutID . "has been removed";
		}
		unset($db);
	}

	public function getWorkouts() {
		$db = $this->connect();
		$sql = "CALL GetWorkouts()";
		$result = mysqli_query($db, $sql);

		while($row = mysqli_fetch_assoc($result)) {		
			echo $row["WorkoutuscleGroup"];
			echo $row["WorkoutName"];
			echo $row["WorkoutDescription"];
			// parse the results then create JSON object for all workouts
		}
		unset($db);
	}

	public function addWeekly($accessID, $routineID, $weekday, $time) {
		$db = $this->connect();
		$sql = "CALL addWeeklySchedule('" . $accessID . "','" . $routineID . "','" . $weekday . "','" . $time . "')";
		mysqli_query($db, $sql);
		mysqli_free_result($result);
		mysqli_close($db);
	}

	public function removeWeekly($accessID, $routineID, $weekday, $time) {
		$db = $this->connect();
		$sql = "CALL removeWeeklySchedule('" . $accessID . "','" . $routineID . "','" . $weekday . "','" . $time . "')";
		mysqli_query($db, $sql);
		mysqli_free_result($result);
		mysqli_close($db);
	}

	public function getWeekly($userID) {
		$userID = $_SESSION["user"];
		$db = $this->connect();
		$sql = "CALL getWeeklySchedule('" . $accessID . "')";
		$result = mysqli_query($db, $sql);
		mysqli_free_result($result);
		mysqli_close($db);


		return $JsonWeekly;
	}

}

?>