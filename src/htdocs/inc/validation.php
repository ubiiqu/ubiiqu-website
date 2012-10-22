<?php
error_reporting(0);
ini_set('display_errors', 'off');

header("Content-Type: application/json; charset=utf-8");

$json = array();
$json['status'] = false;

$errors = array();
if($_POST) {

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

		include "class.phpmailer.php";

		$mail = new phpmailer();
		$mail->AddAddress('manuel.bieh@ubiiqu.com', 'ubiiqu Team');
		$mail->Subject = 'Message via ubiiqu.com';
		$mail->Body = $_POST['msg'];
		$mail->Send();

		$header  = 'MIME-Version: 1.0' . "\r\n";
		$header .= 'Content-type: text/plain; charset=utf-8' . "\r\n";
		$header .= 'From:  ' . $_POST['name'] . ' <' . $_POST['email'] . '>' . "\r\n";
		$header .= 'To: Manuel <info@ubiiqu.com>' . "\r\n";

		mail('info@ubiiqu.com', 'Message via ubiiqu.com', $_POST['msg'], $header);

		file_put_contents(
			dirname(__FILE__) . '/mail/' . date('Y-m-d_H-i') . '_' . md5($_POST['email']) . '.txt', 
			'FROM: ' . $_POST['name'] . ' <' . $_POST['email'] . '>' . "\n" .
			'MESSAGE: ' . "\n" .
			$_POST['msg']
		);

		$json['status'] = true;
		$json['message'] = 'Thank you for your message!';

	}

}

$response = json_encode($json);

if(isset($_REQUEST['xhr'])) {
	echo $response;
}
