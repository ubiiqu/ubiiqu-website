<?php
error_reporting(0);
header("Content-Type: application/json; charset=utf-8");
//title, name, email, msg
$errors = array();
if($_POST) {

	if(strlen($_POST['title']) < 2) {
	//	$errors[] = 'Please provide an email address.';
	}

	if(strlen($_POST['name']) < 2) {
		$errors[] = 'Please tell us your name.';
		$highlight[] = '#name';
	}

	if(strlen($_POST['email']) < 9 || strpos($_POST['email'], '@') === false) {
		$errors[] = 'Please provide an email address.';
		$highlight[] = '#email';
	}

	if(strlen($_POST['msg']) < 10) {
		$errors[] = 'Please enter a message.';
		$highlight[] = '#msg';
	}

	$json = array();
	if(is_array($errors) && !empty($errors)) {

		$json['errors'] = $errors;
		$json['highlight'] = $highlight;
		$json['status'] = false;

	} else {

		include "phpmailer.php";

		$mail = new phpmailer();
		$mail->AddAddress('manuel.bieh@ubiiqu.com', 'ubiiqu Team');
		$mail->Subject = 'Message via ubiiqu.com';
		$mail->Body = $_POST['msg'];
		$json['status'] = true;
		$json['message'] = 'Thank you for your message!';

	}

} else {

	$json['status'] = false;

}

$response = json_encode($json);

if(isset($_REQUEST['xhr'])) {
	echo $response;
}