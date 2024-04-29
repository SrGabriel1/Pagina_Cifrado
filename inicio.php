<?php

if(isset($_POST['iniciar'])){
    if(isset($_POST['username']) && isset($_POST['password'])){
        include("conexion.php");

        $username = trim($_POST['username']);
        $password = trim($_POST['password']);

        $consulta = "SELECT * FROM datos WHERE nombre = ? AND contraseña = ?";
        $stmt = mysqli_prepare($conectar, $consulta);
        mysqli_stmt_bind_param($stmt, "ss", $username, $password);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);

        if(mysqli_stmt_num_rows($stmt) > 0){
            echo "<p>Inicio de sesión exitoso. Redirigiendo...</p>";
            // Puedes agregar una redirección mediante JavaScript después de mostrar el mensaje
            echo "<script>window.location.replace('index.html');</script>";
            exit();
        } else {
            ?>
            <h3 class="error">Ocurrio un error</h3>
            <?php
        }

        mysqli_stmt_close($stmt);
        mysqli_close($conectar);
    } else {
        ?>
        <h3 class="error">Llena todos los campos</h3>
        <?php
    }
}
?>