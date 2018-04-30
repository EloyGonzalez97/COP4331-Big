<?php

class Routine {

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

	public function addRoutine($name, $description, $difficulty, $accessID) { 
		$db = $this->connect();
		$sql = "CALL AddRoutine('" . $name . "','" . $description . "','" . $difficulty . "','" . $accessID . "')";
		if(mysqli_query($db, $sql)) {
			echo "Successfully created a new routine for the user: " . $accessID;
		}
		unset($db);
	}

	public function defineRoutine($routineID, $workoutID, $reps, $weight) {
		$db = $this->connect();
		$sql = "CALL DefineRoutine('" . $routineID . "','" . $workoutID . "','" . $reps . "','" . $weight . "')";
		if(mysqli_query($db, $sql)) {
			echo "Successfully added the workout to your routine";
		}
		unset($db);
	}

	public function removeRoutine($routineID) {
		$db = $this->connect();
		$sql = "CALL removeRoutine('" . $routineID . "')";
		if(mysqli_query($db, $sql)) {
			echo "Successfully removed the routine with id: " . $routineID;
		}
		unset($db);
	}

	public function getRoutines($accessID) {
		$routineRow = array();
		$db = $this->connect();
		$sql = "CALL GetRoutines('" . $accessID . "')";
		$result = mysqli_query($db, $sql);
		
		/*while($row = mysqli_fetch_assoc($result)) {		
			echo $row["RountineID"];
			echo $row["RoutineName"];
			echo $row["Routineescription"];
			echo $row["RountineDifficulty"];
			echo $row["RoutineCreator"];
			echo "\n\n";
			// parse the results then create JSON object for all workouts
		}*/

		while($r = mysqli_fetch_assoc($result)) {
			$routineRow[] = $r;
 		}

		unset($db);

		return $routineRow;
	}

}