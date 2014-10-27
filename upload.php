<?php
// A list of permitted file extensions.
$allowed = array('png', 'jpg', 'jpeg', 'gif','zip');
if (!empty($_FILES)) {
	$file = array_pop($_FILES);

	if (!empty($file) && $file['error'] == 0) {
		$extension = pathinfo($file['name'], PATHINFO_EXTENSION);

		if (!in_array(strtolower($extension), $allowed)) {
			echo '{"status":"error1"}';
			exit;
		}

		if (move_uploaded_file($file['tmp_name'], 'uploads/' . $file['name'])) {
			echo '{"status":"success","image":"' . $file['name'] . '"}';
			exit;
		}
	}

}

echo '{"status":"error2"}';
exit;