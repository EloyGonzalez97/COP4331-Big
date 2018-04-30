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
		$jsonRow = array();
		$db = $this->connect();
		$sql = "CALL GetWorkouts()";
		$result = mysqli_query($db, $sql);

		// test print. comment out when json is returned
		/*while($row = mysqli_fetch_assoc($result)) {		
			echo $row["WorkoutuscleGroup"];
			echo $row["WorkoutName"];
			echo $row["WorkoutDescription"];
			// parse the results then create JSON object for all workouts
		}*/

		
		while($r = mysqli_fetch_assoc($result)) {
			$jsonRow[] = $r;
 		}
 		
		unset($db);

		return $jsonRow;
	}

}

?>