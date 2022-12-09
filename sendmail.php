<?php 
    use PHPMailer/PHPMailer/PHPMailer;
    use PHPMailer/PHPMailer/Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail -> CharSet = 'UTF-8';
    $mail -> setLanguage('ru', 'phpmailer/language/');
    $mail ->IsHTML(true);

    $mail ->setFrom('vadimlazuk33@gmail.com', 'Valdemar');
    $mail -> addAddress('vameatlaz33@gmail.com');
    $mail ->Subject = 'Hello! This Vadim';

    $body = '<h1>Your message!</h1>';

    if(trim(!empty($_POST['name']))){0
        $body.='<p><strong>Name</strong>'.$_POST['name'].'</p>';
    }

    if(trim(!empty($_POST['email']))){0
        $body.='<p><strong>Email</strong>'.$_POST['email'].'</p>';
    }

    if(!empty($_FILES['image']['tmp_name'])){
        $filePath = __DIR__ ."/files/".$_FILES['image']['name'];

        if(copy($_FILES['image']['tmp-name'], $filePath)){
            $fileAttach = $filePath;
            $body.='<p><strong>Photo in message</strong>';
            $mail->addAttachment($fileAttach);
        }
    }

    $mail ->Body = $body;
    if(!$mail->send()){
        $message = 'Error';
    }else{
        $message='All good!'
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>    