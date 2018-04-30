<?php
	
class RoutineFunction {
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

	public function removeFromRoutine($RoutineID, $WorkoutID, $Reps, $Weight, $Sets) {
		$db = $this->connect();
		$sql = "CALL RemoveFromRoutine('" . $RoutineID . "','" . $WorkoutID . "','" . $Reps . "','" . $Weight . "','" . $Sets . "')";
		if(mysqli_query($db, $sql)) {
			echo "Successfully removed the workout from your routine";
		} else {
			echo "failed to delete the workout from the routine";
		}
		unset($db);
	}

	public function defineRoutine($routineID, $workoutID, $reps, $weight, $Sets) {
		$db = $this->connect();
		$sql = "CALL DefineRoutine('" . $routineID . "','" . $workoutID . "','" . $reps . "','" . $weight . "','" . $Sets . "')";
		if(mysqli_query($db, $sql)) {
			echo "Successfully added the workout to your routine";
		} else {
			echo "it failed";
		}
		unset($db);
	}
}
	

?>