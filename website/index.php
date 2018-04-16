<?php    
    require 'user.php';
    
    if(isset($_POST['loginBtn'])){ //check if form was submitted
      $username = $_POST['loginUser']; //get input text
      $password = $_POST['passLogin']; //get input text
      $user = User::withLogin($username, md5($password));
        echo var_dump($_SESSION['user']);    
        if($_SESSION['user'] !== null){
            header("Location: http://COP4331.hosted.nfoservers.com/main/main.html");
        }
    } 
    else if(isset($_POST['signBtn'])){
        $userName = $_POST['userName'];
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email'];
        $pass = $_POST['password'];
        $user = User::withSignup($userName, $email, $firstName, $email, md5($pass));
        echo var_dump($_SESSION['user']);   
        if($_SESSION['user'] !== null){
            header("Location: http://COP4331.hosted.nfoservers.com/main/main.html");
        }
    }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>SwoleAF</title>
    <link rel="stylesheet" type="text/css" href="index.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
</head>
<body>
    <div class="topnav">
    <img src="images/logoW.png" alt = "logo" width="150" height="30" style="margin-top: 5px; margin-left:100px; padding-top: 15px;">
      <button class = "topBtn" onclick="document.getElementById('id01').style.display='block'" type="button">Log In</button>
        <button class = "topBtn" onclick="document.getElementById('id02').style.display='block'" type="button">Sign Up</button>
        <a href="trainerpage.html">Trainer</a>
    </div>
    
    <section class="introsection">
        <div id="id01" class="modal">
            <form class="modal-content animate" action = "" method="post">
                          <br>
                          <img src="images/logo.png" alt = "logo" width="140" height="30" style="margin-top: 5px; margin-left: auto; margin-right:auto; display:block;">
                          <label class = "errorTitle" id = "errorDiv">Error</label>
                          <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
                          <div class="container">
                              <input type="text" style = "height: 50px; width: 100%;" placeholder="Username" id="uname" name = "loginUser" required>
                                <br><br>
                              <input type="password" style = "height: 50px; width: 100%;" placeholder="Password" id="psw" name = "passLogin" required>
                                <br><br>
                              <button type="submit" name="loginBtn" class = "btn" id = "loginbtn" style = "width: 100%; margin-left: 0;">Login</button>
                            </div>


            </form>
        </div>
        <div id="id02" class="modal">
            <form class="modal-content animate" method = "post" action="">
                          <br>
                          <img src="images/logo.png" alt = "logo" width="140" height="30" style="margin-top: 5px; margin-left: auto; margin-right:auto; display:block;">
                          <label class = "errorTitle" id = "errorDiv">Error</label>
                          <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">&times;</span>
                          <div class="container">
                            <input type="text" style = "width: 100%; height: 30px;" id="username" name = "userName" placeholder = "Username">
                            <br><br>
                            <input type="text" style = "width: 100%; height: 30px;" id="firstname" name = "firstName" placeholder = "First name">
                            <br><br>
                            <input type = "text" style = "width: 100%; height: 30px;" placeholder="Last name" id="lastname" name = "lastName">
                            <br><br>
                            <input type = "text" style = "width: 100%; height: 30px;" placeholder="Email/Username" id="email" name = "email">
                            <br><br>
                            <input type="password" style = "width: 100%; height: 30px;" placeholder="Password" id="pass" name="password">
                            <br><br>
                            <div class="col-xs-6">
                            <div class ="input-group">
                                <span class="input-group-btn">
                                    <button class="btn" name = "signBtn" type="submit" style = "width: 100%; margin-left: 0;"><span>Sign Up</span></button>
                            </span>
                            </div>
                            </div>  
                        </div>


            </form>
        </div>
        <div class = "gradient">
            <label class = "titleText"> Stay Motivated. Get Strong.</label>
        </div>
    </section>
    <section class ="info-section0">
        <div class = "info">
        <label  class = "titleSubtext" > Effortlessly integrate workouts into your life by organizing your routines into our easy-to-use calendar. Customize your own workouts and share them with other fitness enthusiasts.</label>
        </div>
    </section>
    <section class ="info-section1">
        <label class = "info-section-header">NEVER FORGET A WORKOUT</label> 
        <br><br>
        <label class = "info-section-description"> Search and find any workout to add onto your routine calendar. Always keep track of new routines.</label>
        <br>
        <label class = "info-section-description"> Implement custom-made workouts from other users and trainers.</label>
        <br><br><br><br><br>    
        <img src="images/bicep-curl.png" class="info1Pics" alt = "curl" width="200" height="200">
        <img src="images/calendar2.png" class="info1Pics" alt = "calendar" width="200" height="200">
        <img src="images/deadlift.png" class="info1Pics" alt = "deadlift" width="200" height="200">
    
    </section>
    <section class ="info-section2">
        <label class = "info-section-header" style ="color: #fff;">STATISTICAL REPORTS ON YOUR ROUTINES</label> 
        <br><br>
        <label class = "info-section-description" style ="color: #fff;"> See reports on total number of different workouts done, with stats on total volume of each workout.</label>
        <br>
        <label class = "info-section-description" style ="color: #fff;"> Data is always presented in an easy and understandable format.</label>
        <br><br><br><br><br>    
        <img src="images/graph.png" class="info2Pics" alt = "graph" width="200" height="200">
        <img src="images/datatable.png" class="info2Pics" alt = "table" width="200" height="200">
    
    </section>
    <script src="index.js"></script>
</body>
</html>