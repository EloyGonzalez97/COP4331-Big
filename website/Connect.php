<?php
	
	$username = "vr8aTp573L";
	$password = "webalex";
	$options = array(
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
	);

	$conn = new PDO('mysql:host=localhost;dbname=webalex_project_two', 
				$username, $password, $options);
	
?>