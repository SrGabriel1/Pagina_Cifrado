<?php

include("conexion.php");

if(isset($_POST['register'])){
    if(
    strlen($_POST['name']) >= 1 &&
    strlen($_POST['email']) >= 1 &&
    strlen($_POST['phone']) >= 1 &&
    strlen($_POST['password']) >= 1 
    ){
        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $phone = trim($_POST['phone']);
        $paswword = trim($_POST['password']);
        $fecha = date("d/m/y");


        $consulta = "INSERT INTO datos(nombre,email,telefono,contraseña,fecha)
        VALUES('$name', '$email', '$phone', '$paswword', '$fecha')";
        
        $resultado = mysqli_query($conectar, $consulta);
        if($resultado){
          ?>
          <h3 class="sucess" >Tu registro se a completado</h3>
          <?php      
        }else{
            ?>
            <h3 class="error">Ocurrio un error</h3>
            <?php
        }

    }else{
        ?>
        <h3 class="error">Llena todos los campos</h3>
        <?php
    }
}

?>