<?php
	class User {
		
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
		
		public static function withLogin($username, $password) {
			$instance = new self();
			$db = $instance->connect();

			$instance->login($db, $username, $password);

			return $instance;
		}

		public static function withSignup($username, $email, $firstname, $lastname, $password) {
			$instance = new self();
			$db = $instance->connect();

			$instance->signup($db, $username, $email, $firstname, $lastname, $password);



			return $instance;
		}

		public function login($db, $username, $password) {
			
			
			
			$response = array("error" => FALSE);
			$sql = "CALL Login('" . $username . "','" . $password . "')";
			$result = mysqli_query($db, $sql);

      		if($result->num_rows > 0) {
				
				$row = $result->fetch_assoc();
				$id = $row["UserID"];
				echo $id;
				session_start();
				$_SESSION['user'] = $id;
				
				
        		
			} 
		}	

		public function signup($db, $username, $email, $firstname, $lastname, $password) {
			$sql = "CALL CreateUser('" . $username . "','" . $email . "',
			'" . $firstname . "','" . $lastname . "','" . $password . "')";
			$result = mysqli_query($db, $sql);

			if($result->num_rows > 0) {
				$row = $result->fetch_assoc();
				$id = $row["GeneratedID"];
				echo $id;
				session_start();
				$_SESSION['user'] = $id;
			} 

		}
	}
?>
