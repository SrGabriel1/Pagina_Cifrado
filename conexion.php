<?php
    $server = 'localhost';
    $user = 'root';
    $pass = '';
    $db = 'paginasi';
    $conectar = new mysqli($server, $user, $pass, $db);

    if($conectar->connect_errno){
            die("Conexion Fallida" . $conectar->connect-errno);
    }else{
        echo "";
    }



?>