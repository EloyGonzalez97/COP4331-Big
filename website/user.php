<?php

class User {	

	private $dbusername = "webalex";
	private $dbpassword = "vr8aTp573L"
	private $dbhost = "localhost";
	private $dbname = "webalex_SwoleAF";

	private $userID; 
	private $securityLevel; 

	public function __construct() {
		$database = new PDO("mysql:host = $dbhost; dbname = $dbname", $dbusername, $dbpassword);
		$database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$database->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	}

	public static function withLogin($username, $password) {
		$instance = new self();
		$instance->login($username, $password);
	}

	public static function withSignUp($username, $email, $firstname, $lastname, $password) {
		$instance = new self();
		$instance->signup($username, $email, $firstname, $lastname, $password);
		$instance->login($username, $password);
	}

	public function signup($username, $email, $firstname, $lastname, $password) {
		$sql = "CALL CreateUser('" . $username . '",'" . $email . '",'" . $firstname . '",'" . $lastname . '",'" . $password . '")";
		$stmt = $database->prepare($sql);
		$stmt->execute();
	}

	public function login($username, $password) {
		$sql = "CALL Login('" . $username . '",'" . $password . '")";
		$stmt = $database->prepare($sql);
		$stmt->execute();

		if($stmt->rowCount() > 0) {
			$user = $stmt->fetch(PDO::FETCH_ASSOC);
			$userID = $user["UserID"];
			session_start();
			$_SESSION["ID"] = $user["UserID"];
		} else {
			header('Content-type: application/json');
			echo '{"error":"Incorrect Username/Password combination"}';
		}

		$instance->checkSecLevel();
	}

	public function checkSecLevel() {
		$sql = "CALL CheckSecurityLevel('" . $userID . "')";
		$stmt = $database->prepare($sql);
		$stmt->execute();
		$securityLevel = $stmt->fetch(PDO::FETCH_ASSOC);
	}

	public function logout() {
		session_destroy();
	}

}
