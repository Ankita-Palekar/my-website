<?php

require_once 'PhpMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->SMTPDebug = 3;                               // Enable verbose debug output
$mail->Debugoutput = 'html';
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'ankitapalekar.cool@gmail.com';                 // SMTP username
$mail->Password = 'Ankita-123-#';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to

$mail->setFrom($_POST['email'], 'Mailer');
$mail->addAddress('453ankitapalekar@gmail.com', 'Ankita Palekar');
$mail->addReplyTo('453ankitapalekar@gmail.com', 'Reply to');
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Mail from ' . $_POST['email'] . " via website";
$mail->Body = $_POST['message'];

if (!$mail->send()) {
    $array = array('errorMsg' => 'Message could not be sent.' . 'Mailer Error: ' . $mail->ErrorInfo);
} else {
    $array = array('successMsg' => 'Message has been sent');
}

echo json_encode($array);
