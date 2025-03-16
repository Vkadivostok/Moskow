<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $phone = strip_tags(trim($_POST["phone"]));
    $message = strip_tags(trim($_POST["message"]));
    $captcha = intval($_POST["captcha"]);
    
    if ($captcha !== 8) {
        http_response_code(400);
        echo "Ошибка: неверный ответ на капчу.";
        exit;
    }
    
    $to = "advokat_kv@mail.ru";
    $subject = "Новая заявка от $name";
    $email_content = "Имя: $name\n";
    $email_content .= "Телефон: $phone\n";
    $email_content .= "Сообщение:\n$message\n";
    
    $headers = "From: $name <$phone>";
    
    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo "Спасибо! Ваше сообщение отправлено.";
    } else {
        http_response_code(500);
        echo "Произошла ошибка. Попробуйте позже.";
    }
} else {
    http_response_code(403);
    echo "Доступ запрещен.";
}
?>