<?php

if (isset($_POST["submit"])) {
  $name = $_POST["name"];
  $subject = $_POST["subject"];
  $mailFrom = $_POST["mail"];
  $message = $_POST["message"];   
  
  $mailTo = "mayo123456789@azet.sk";
  $headers = "From: F41C0N-site";
  $txt = "New e-mail from".$name".\n\n".$message;

  mail($mailTo, $subject, $txt, $headers);
  header("location: index.php?mailsent");
}

?>