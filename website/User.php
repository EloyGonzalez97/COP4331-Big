<?php
	
	require_once($_SERVER['DOCUMENT_ROOT'] . 'Connect.php');

	class User {

		private $fname;
		private $lname;
		private $username;
		private $email;
		private $password;

		public function __construct($FirstName, $LastName, $username, $email, $password) {

			if($conn->connect_error) {
				die($conn->connect_error);
			}

			try {
				$InsertUser = "INSERT QUERY GOES HERE";
				$conn->exec($InsertUser);
				echo "Account Created. Welcome " . $fname . $lname;
			} catch(PDOException $e) {
				echo $e->getMessage();
			}

			login();
			
		}	

		public function delete($username, $password) {
			if($conn->connect_error) {
				die($conn->connect_error);
			}

			try {
				$deleteUser = "DELETE QUERY GOES HERE";
				$conn->exec($deleteUser);
				echo "Account Deleted. You'll be missed! :(");
			} catch(PDOException $e) {
				echo $e->getMessage();
			}			
		}

		public function edit($FirstName, $LastName, $username, $email, $password) {

			if($conn->connect_error) {
				die($conn->connect_error);
			}

			try {
				$updateUser = "UPDATE QUERY GOES HERE";
				$conn->exec($updateUser);
				echo "Account changes have been made";
			} catch(PDOException $e) {
				echo $e->getMessage();
			}

		}

		public function getID($username, $password) {

			if($conn->connect_error) {
				die($conn->connect_error);
			}

			try {
				$getID = "GET ID QUERY GOES HERE";
				$conn->exec($getID);
				$ID = $conn->fetch(PDO::FETCH_ASSOC);
				return $ID;
			} catch(PDOException $e) {
				echo $e->getMessage();
			}

		}

		public function login($username, $password) {

			if($conn->connect_error) {
				die($conn->connect_error);
			}

			try {
				$login = "CHECK EMAIL AND PASSWORD QUERY";
				$conn->exec($login);
				$ID = $conn->fetch(PDO::FETCH_ASSOC);
				return $ID;
			} catch(PDOException $e) {
				echo $e->getMessage();
			}

		}

		public function createSession($ID) {

		}
	}

	$conn->close();

?>