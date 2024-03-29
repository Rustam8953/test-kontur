<?php

    include_once './db.php';
    include_once './user.php';
    
    $database = new DataBase();
    $db = $database->getConn();

    $user = new User($db);

    $named = $_POST['name'];
    $telephone = $_POST['telephone'];
    $email = $_POST['email'];
    $comment = $_POST['message'];

    $user->name = $named;
    $user->telephone = $telephone;
    $user->email = $email;
    $user->message = $comment;

    if($user->create()) {
        $message = "Заявка успешно оставлена!";
    } else {
        $message = "Ошибка отправки! Попробуйте позже!";
    }

    $response = ["message" => $message];
    header('Content-type: application/json');
    echo json_encode($response);

?>