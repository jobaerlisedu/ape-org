<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields and sanitize input
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    // Check availability of data
    if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Handle error
        echo "<script type='text/javascript'>alert('Please fill all the fields correctly.'); window.history.back();</script>";
        exit;
    }

    // Recipient email address
    $recipient = "info@cprdbd.org";

    // Email headers
    $email_headers = "From: $name <$email>";

    // Send the email
    if (mail($recipient, "New Contact Message: $subject", $message, $email_headers)) {
        // Success
        echo "<script type='text/javascript'>alert('Thank you! Your message has been sent.'); window.location.href = 'contact.html';</script>";
    } else {
        // Failure
        echo "<script type='text/javascript'>alert('Oops! Something went wrong and we couldn\'t send your message.'); window.history.back();</script>";
    }

} else {
    // Not a POST request
    header("Location: contact.html");
}
?>
