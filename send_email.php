<?php 

// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// /* Exception class. */
// require 'PHPMailer-master\src\Exception.php';

// /* The main PHPMailer class. */
// require 'PHPMailer-master\src\PHPMailer.php';

// /* SMTP class, needed if you want to use SMTP. */
// require 'PHPMailer-master\src\SMTP.php';

// $email = new PHPMailer(TRUE);
// /* ... */

// /* Create a new PHPMailer object. Passing TRUE to the constructor enables exceptions. */
// $mail = new PHPMailer(TRUE);

// /* Open the try/catch block. */
// try {
//      $mail->Host       = "relay-hosting.secureserver.net";
// $mail->Port       = 25;                   
// $mail->SMTPDebug  = 0;
// $mail->SMTPSecure = "none";                 
// $mail->SMTPAuth   = false;
// $mail->Username   = "brian@brianveitch.com";
// $mail->Password   = "Edward83!";
//    /* Set the mail sender. */
//    $mail->setFrom('beveitch@gmail.com', 'Darth Vader');

//    /* Add a recipient. */
//    $mail->addAddress('brian@brianveitch.com', 'Lord Commander');

//    /* Set the subject. */
//    $mail->Subject = 'Force';

//    /* Set the mail message body. */
//    $mail->Body = 'There is a great disturbance in the Force.';

//    /* Finally send the mail. */
//    $mail->send();
//    echo "<h1>Sent</h1>";
// }
// catch (Exception $e)
// {
//    /* PHPMailer exception. */
//    echo $e->errorMessage();
// }
// catch (\Exception $e)
// {
//    /* PHP exception (note the backslash to select the global namespace Exception class). */
//    echo $e->getMessage();
// }

$to      = 'beveitch@gmail.com';
$subject = 'the subject';
$message = 'hello';
$headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers)

?>