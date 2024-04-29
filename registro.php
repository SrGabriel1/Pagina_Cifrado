<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <form method= "post">
        <h2>Hola</h2>
        <p>Inicia tu registro</p>

        <div class= "input-wrapper">
            <input type="text" name="name" placeholder="Nombre">
            <img class="input-icon" src="img/name.svg" alt="">
        </div>
        <div class= "input-wrapper">
            <input type="email" name="email" placeholder="Email">
            <img class="input-icon" src="img/email.svg" alt="">
        </div>
        <div class= "input-wrapper">
            <input type="telefono" name="phone" placeholder="Telefono">
            <img class="input-icon" src="img/phone.svg" alt="">
        </div>
        <div class= "input-wrapper">
            <input type="password" name="password" placeholder="Constraseña">
            <img class="input-icon" src="img/password.svg" alt="">
        </div>

        <input class="btn" type="submit" name="register" value = "Enviar">
        <p>Ya tienes cuenta? <a href="login.php" id="crear-cuenta">Log in</a></p>
        </form>
        <?php
            include("register.php");
        ?>
</body>
</html>