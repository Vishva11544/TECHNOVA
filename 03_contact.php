<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Database Connection
    $conn = new mysqli(
    "localhost",
    "root",
    "",
    "technova_db"
);

    // Check Connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get Form Data
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $message = trim($_POST['message']);

    // Prepare Statement (Secure)
    $stmt = $conn->prepare(
        "INSERT INTO contact_messages (name, email, message)
         VALUES (?, ?, ?)"
    );

    $stmt->bind_param("sss", $name, $email, $message);

    // Execute Query
    if ($stmt->execute()) {
        echo "
<script>
            alert('Message sent successfully!');
            window.location.href='01_index.html';
        </script>
        ";
    } else {
        echo "
        <script>
            alert('Error sending message!');
            window.history.back();
        </script>
        ";
    }

    $stmt->close();
    $conn->close();
}
?>