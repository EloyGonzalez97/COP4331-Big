<?php

	class JsonHandler {

		function getRequestInfo() {
    		return json_decode(file_get_contents('php://input'), true);
  		}

  		function sendAsJson($obj) {
    		header('Content-type: application/json');
    		echo $obj;
  		}
  		function returnWithError($error) {
    		$ret = '{"id":0,"firstName":"","lastName":"","error":"' . $error . '"}';
    		sendAsJson($ret);
  		}
  		function returnWithInfo($id, $firstName, $lastName) {
    		$ret = '{"id":"' . $id . '","firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
    		sendAsJson($ret);
  		}

	}

?>