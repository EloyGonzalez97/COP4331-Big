<?php

class Weekly {

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


	public function addWeekly($accessID, $routineID, $weekday, $time) {
		$db = $this->connect();
		$sql = "CALL addWeeklySchedule('" . $accessID . "','" . $routineID . "','" . $weekday . "','" . $time . "')";
		if(mysqli_query($db, $sql)) {
			echo "successfully added a routine to your weekly schedule";
		}
		unset($db);
	}

	public function removeWeekly($accessID, $routineID, $weekday, $time) {
		$db = $this->connect();
		$sql = "CALL RemoveWeeklySchedule('" . $accessID . "','" . $routineID . "','" . $weekday . "','" . $time . "')";
		if(mysqli_query($db, $sql)) {
			echo "successfully removed from your weekly schedule";
		}
		unset($db);
	}

	public function getWeekly($userID) {
		$jsonWeek = array();
		$db = $this->connect();
		$sql = "CALL GetWeeklySchedule('" . $userID . "')";
		$result = mysqli_query($db, $sql);


		while($r = mysqli_fetch_assoc($result)) {
			$jsonWeek[] = $r;
 		}

 		json_encode($jsonWeek);
 		var_dump($jsonWeek);
 		

		unset($db);


		//return $JsonWeekly;
	}
}