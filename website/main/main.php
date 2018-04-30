<?php
    require 'workout.php';
    require 'routine.php';
    require 'weekly.php';
    require 'routinefunction.php';

    session_start();

    $id = $_SESSION['user'];
    echo $id;

    if($id == null){
        header("Location: http://COP4331.hosted.nfoservers.com");
    }

    $weekly = new weekly();
    $jObject = $weekly->getWeekly($id);

    $workout = new workout();
    $workoutObject = $workout->getWorkouts();

    $routine = new routine();
    $routineObject = $routine->getRoutines($id);

   if(isset($_POST['action'])) {
        $action = $_POST['action'];
        switch($action) {
            case 'deleteWorkout' :
                $workID = (int)$_POST['workout'];
                $routineID = (int)$_POST['routine'];
                $reps = (int)$_POST['reps'];
                $weight = (int)$_POST['weight'];
                $sets = (int)$_POST['sets'];
                $remove = new routinefunction();
                $remove->removeFromRoutine($routineID, $workID, $reps, $weight, $sets);
                echo "done";
                break;
             case 'addWorkout' :
                $workID = (int)$_POST['workout'];
                $routineID = (int)$_POST['routine'];
                $reps = (int)$_POST['reps'];
                $weight = (int)$_POST['weight'];
                $sets = (int)$_POST['sets'];
                $add = new routinefunction();
                $add->defineRoutine($routineID, $workID, $reps, $weight, $sets);
                echo "done";
        }
    }
    if(isset($_POST['logout'])) {
        $_SESSION = array();
        header("Location: http://COP4331.hosted.nfoservers.com");
    }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>SwoleAF</title>
    <link rel="stylesheet" type="text/css" href="main.css">

</head>
<body>
    <div class="sidenav">
        <div class = "row"><label class = "name"> John Smith</label></div>
        <br>
        <img src="../images/avatar.png" class="avatar" alt = "avatar" width="80" height="80">
        <br><br>
      <a href="#" class="sidelist active" id="calendarTab"><img src="../images/calendar.png" alt = "calendar" class ="sideIcon" width="15" height="15" onclick="switchDiv(0)">Schedule</a>
      <a href="#" class="sidelist" id="workTab"><img src="../images/deadlift-white.png" alt = "workout"  class ="sideIcon" width="15" height="15" onclick="switchDiv(2)">Workouts</a>
    <a href="#" class="sidelist" id="routineTab"><img src="../images/routine.png" alt = "routine"  class ="sideIcon" width="15" height="15" onclick="switchDiv(3)">Routines</a>
    <a href="#" class="sidelist" id="statTab"><img src="../images/graph.png" alt = "graph"  class ="sideIcon" width="15" height="15" onclick="switchDiv(1)">Stats</a>
    </div>
    <div class="topnav">
        <img src="../images/logoW.png" alt = "logo" width="150" height="30" style="margin-top: 5px; display: block; margin-left:50%; margin-right:auto;">
        <a href="" style = "float: right; color: #fff; margin-top:-30px;"><img src="../images/logout.png" alt = "logout"  onClick="logout();" class ="sideIcon" width="25" height="25"></a>
    </div>
    <div id="main">
        <div id="id01" class="modal">
            <form class="modal-content animate" action = "" method="post">
                          <br>
                          <img src="../images/logo.png" alt = "logo" width="140" height="30" style="margin-top: 5px; margin-left: auto; margin-right:auto; display:block;">
                          <span onclick="resetForm();" class="close" title="Close Modal">&times;</span>
                          <div class="container">
                              <select class = "workoutType" id="workoutTypes">
                                  <option selected disabled>Choose Workout Type</option>
                                  <option value="abs">Abs</option>
                                  <option value="back">Back</option>
                                  <option value="bicep">Bicep</option>
                                  <option value="chest">Chest</option>
                                  <option value="leg">Legs</option>
                                  <option value="shoulders">Shouders</option>
                                  <option value="triceps">Triceps</option>
                            </select>
                              <br><br>
                              <select class = "workoutType" id = "workout">
                                  <option selected disabled>Choose Workout:</option>
                            </select>
                              <br>
                              <div id = "check" class="check">
                                  <input type="radio" name="sets" id= "radioBtn" value="multiple" onclick="showInfo(true);">Varying Sets
                                  <input type="radio" name="sets" id= "radioBtn" value="same" onclick="showInfo(false);">Same Sets
                              </div>
                              <br>
                              <div class = "infoBox" id = "infoBox">
                                  <label>Sets:</label><input type="text" class = "infoInput" id="setVal">
                                  <label>Reps:</label><input type="text" class = "infoInput" id="repVal">
                                  <label>Weight:</label><input type="text" class = "infoInput" id="weightVal">
                              </div>
                              <div class = "infoBox" id = "infoBox2">
                                  <img src="../images/add.png" alt = "add"  class ="addSet" width="20" height="20" onclick="addSet()" >
                                  <label style = "float:right">Add Set</label>
                                  <br>
                                  <br>
                                  <div class = "setInfo" id = "setInfo">
                                      
                                  </div>
                              </div>
                              <br>
                              <button type="submit" onclick= "addtoList()" name = "homeBtn" class = "btn" id = "addbtn" style = "width: 100%;">Add</button>
                            </div>


            </form>
        </div>
        <div id="calendar" data-params="<?php echo htmlspecialchars(json_encode($jObject), ENT_QUOTES, 'UTF-8'); ?>">
            <ul class = "Monday" id = "Monday">
                <p class = "ulTitle">Monday</p>
                <p id = "date0" class = "date"></p>
                <img src="../images/add.png" class="add" alt = "add" onclick="flag(this);">
            </ul>
            <ul class = "Tuesday" id = "Tuesday">
                <p class = "ulTitle">Tuesday</p>
                <p id = "date1" class = "date"></p>
                <img src="../images/add.png" class="add" alt = "add" onclick="flag(this);">
            </ul>
            <ul class = "Wednesday" id = "Wednesday">
                <p class = "ulTitle">Wednesday</p>
                <p id = "date2" class = "date"></p>
                <img src="../images/add.png" class="add" alt = "add" onclick="flag(this);">
            </ul>
            <ul class = "Thursday" id = "Thursday">
                <p class = "ulTitle">Thursday <p id = "date3" class = "date"></p></p>
                <img src="../images/add.png" class="add" alt = "add" onclick="flag(this);">
            </ul>
            <ul class = "Friday" id = "Friday">
                <p class = "ulTitle">Friday</p>
                <p id = "date4" class = "date"></p>
                <img src="../images/add.png" class="add" alt = "add" onclick="flag(this);">
            </ul>
            <ul class = "Saturday" id = "Saturday">
                <p class = "ulTitle">Saturday</p>
                <p id = "date5" class = "date"></p>
                <img src="../images/add.png" class="add" alt = "add" onclick="flag(this);">
            </ul>
            <ul class = "Sunday" id = "Sunday">
                <p class = "ulTitle">Sunday</p>
                <p id = "date6" class = "date"></p>
                <img src="../images/add.png" class="add" alt = "add" onclick="flag(this);">
            </ul>

        </div>
        <div id="stats">
            <div class="wrapper">
                <div id="piechart"></div>
                <div id="barchart"></div>
                <div class= "volume">
                    <div class = "volumeContainer">
                        <label class="volumeTitle">WHY DOES VOLUME MATTER?</label>
                        <p class = "volumeInfo"><strong>MUSCLE GAIN</strong>: Generally, a moderate number of sets and reps per exercise leads to the quickest gains in pure size. Using lower reps builds strength and increases the size of the proteins inside muscle fibers, while higher reps increases the fluid inside the muscle; for maximum size, you’ll need to take advantage of both adaptations. Generally speaking, 3–6 sets of 6–12 reps per exercise does the trick.  </p>
                        <p class = "volumeInfo"><strong>FAT LOSS</strong>:There are many ways to design a fat-loss program—the volume can be made high to burn lots of calories or low to maintain muscle mass while cutting calories from your diet—but the sets are usually four or fewer per exercise. In fact, you can even perform a circuit of several exercises with just one or two sets for <br> each. That way, you can train the whole body in a fast, time-efficient workout.  </p>
                        <p class = "volumeInfo"><strong>STRENGTH GAIN</strong>: Heavy weights means low reps. By keeping your reps low, you can often perform a large number of sets (which also increases size). However, with extreme loads, you won’t be able to recover from multiple sets, so a lower number is OK. Try 3–5 sets of five reps or fewer per exercise. </p>
                    </div>
                </div>
                
            </div>
        </div>
    
        <div id="workouts" data-params="<?php echo htmlspecialchars(json_encode($workoutObject), ENT_QUOTES, 'UTF-8'); ?>">
            <div class = "chstWorkouts-slides" id = "chestWorkouts">
                <div class = "slideWrapper">
                <label class = "slideTitle" >Chest</label>
                <ul id="chstSlides" class = "slidecontainer"></ul>
                <div class = "arrows">
                    <img class = "arrowL" src = "../images/arrow-right.png" onclick= "goLeft(this);">
                    <img class = "arrowR" src = "../images/arrow-right.png" onclick= "goRight(this);">
                </div>
                </div>
                <div class = "wrkDescription" id = "wrkDescription">
                    <span onclick="removeDescription(this);" class="close" style="margin-top: 0px; color:#fff;" title="Close Modal">&times;</span>
                    <div class = "pickedInfo" id = "pickedInfo">
                        <label class = "pickedTitle"></label>
                        <p id = "pickedDescription"></p>
                        
                    </div>
                    <div class = "instruction" id = "instruction">
                        
                    </div>
                </div>
            </div>
            <div class = "bckWorkouts-slides" id = "bckWorkouts">
                <div class = "slideWrapper">
                <label class = "slideTitle" >Back</label>
                <ul id="bckSlides" class = "slidecontainer"></ul>
                <div class = "arrows">
                    <img class = "arrowL" src = "../images/arrow-right.png" onclick= "goLeft(this);">
                    <img class = "arrowR" src = "../images/arrow-right.png" onclick= "goRight(this);">
                </div>
                </div>
                <div class = "wrkDescription" id = "wrkDescription">
                    <span onclick="removeDescription(this);" class="close" style="margin-top: 0px; color:#fff;" title="Close Modal">&times;</span>
                    <div class = "pickedInfo" id = "pickedInfo">
                        <label class = "pickedTitle"></label>
                        <p id = "pickedDescription"></p>
                    </div>
                    <div class = "instruction" id = "instruction">
                </div>
            </div>
            </div>
            <div class = "bcpWorkouts-slides" id = "bcpWorkouts">
                <div class = "slideWrapper">
                <label class = "slideTitle" >Bicep</label>
                <ul id="bcpSlides" class = "slidecontainer"></ul>
                <div class = "arrows">
                    <img class = "arrowL" src = "../images/arrow-right.png" onclick= "goLeft(this);">
                    <img class = "arrowR" src = "../images/arrow-right.png" onclick= "goRight(this);">
                </div>
                </div>
                <div class = "wrkDescription" id = "wrkDescription">
                    <span onclick="removeDescription(this);" class="close" style="margin-top: 0px; color:#fff;" title="Close Modal">&times;</span>
                    <div class = "pickedInfo" id = "pickedInfo">
                        <label class = "pickedTitle"></label>
                        <p id = "pickedDescription"></p>
                    </div>
                    <div class = "instruction" id = "instruction">
                    </div>
                </div>
            </div>
            <div class = "lgsWorkouts-slides" id = "lgsWorkouts">
                <div class = "slideWrapper">
                <label class = "slideTitle" >Legs</label>
                <ul id="lgsSlides" class = "slidecontainer"></ul>
                <div class = "arrows">
                    <img class = "arrowL" src = "../images/arrow-right.png" onclick= "goLeft(this);">
                    <img class = "arrowR" src = "../images/arrow-right.png" onclick= "goRight(this);">
                </div>
                </div>
                <div class = "wrkDescription" id = "wrkDescription">
                    <span onclick="removeDescription(this);" class="close" style="margin-top: 0px; color:#fff;" title="Close Modal">&times;</span>
                    <div class = "pickedInfo" id = "pickedInfo">
                        <label class = "pickedTitle"></label>
                        <p id = "pickedDescription"></p>
                    </div>
                    <div class = "instruction" id = "instruction">
                    </div>
                </div>
            </div>
            <div class = "abWorkouts-slides" id = "abWorkouts">
                <div class = "slideWrapper">
                <label class = "slideTitle" >Abs</label>
                <ul id="abSlides" class = "slidecontainer"></ul>
                <div class = "arrows">
                    <img class = "arrowL" src = "../images/arrow-right.png" onclick= "goLeft(this);">
                    <img class = "arrowR" src = "../images/arrow-right.png" onclick= "goRight(this);">
                </div>
                </div>
                <div class = "wrkDescription" id = "wrkDescription">
                    <span onclick="removeDescription(this);" class="close" style="margin-top: 0px; color:#fff;" title="Close Modal">&times;</span>
                    <div class = "pickedInfo" id = "pickedInfo">
                        <label class = "pickedTitle"></label>
                        <p id = "pickedDescription"></p>
                    </div>
                    <div class = "instruction" id = "instruction">
                    </div>
                </div>
            </div>
            <div class = "shldWorkouts-slides" id = "shldWorkouts">
                <div class = "slideWrapper">
                <label class = "slideTitle" >Shoulders</label>
                <ul id="shldSlides" class = "slidecontainer"></ul>
                <div class = "arrows">
                    <img class = "arrowL" src = "../images/arrow-right.png" onclick= "goLeft(this);">
                    <img class = "arrowR" src = "../images/arrow-right.png" onclick= "goRight(this);">
                </div>
                </div>
                <div class = "wrkDescription" id = "wrkDescription">
                    <span onclick="removeDescription(this);" class="close" style="margin-top: 0px; color:#fff;" title="Close Modal">&times;</span>
               
                    <div class = "pickedInfo" id = "pickedInfo">
                        <label class = "pickedTitle"></label>
                        <p id = "pickedDescription"></p>
                    </div>
                    <div class = "instruction" id = "instruction">
                    </div>
                </div>
            </div>
            <div class = "tcpWorkouts-slides" id = "tcpWorkouts">
                <div class = "slideWrapper">
                <label class = "slideTitle" >Tricep</label>
                <ul id="tcpSlides" class = "slidecontainer"></ul>
                <div class = "arrows">
                    <img class = "arrowL" src = "../images/arrow-right.png" onclick= "goLeft(this);">
                    <img class = "arrowR" src = "../images/arrow-right.png" onclick= "goRight(this);">
                </div>
                </div>
                <div class = "wrkDescription" id = "wrkDescription">
                    <span onclick="removeDescription(this);" class="close" style="margin-top: 0px; color:#fff;" title="Close Modal">&times;</span>
               
                    <div class = "pickedInfo" id = "pickedInfo">
                        <label class = "pickedTitle"></label>
                        <p id = "pickedDescription"></p>
                    </div>
                    <div class = "instruction" id = "instruction">
                    </div>
                </div>
            </div>
            <div id="id02" class="modal">
            <form class="modal-content animate" action = "" method="post">
                          <br>
                          <img src="../images/logo.png" alt = "logo" width="140" height="30" style="margin-top: 5px; margin-left: auto; margin-right:auto; display:block;">
                          <span onclick="resetForm();" class="close" title="Close Modal">&times;</span>
                          <div class="container">
                              <label id = "addTitle"></label>
                              <select class = "day" id="days">
                                  <option selected disabled>Choose Day:</option>
                                  <option value="Monday">Monday</option>
                                  <option value="Tuesday">Tuesday</option>
                                  <option value="Wednesday">Wednesday</option>
                                  <option value="Thursday">Thursday</option>
                                  <option value="Friday">Friday</option>
                                  <option value="Saturday">Saturday</option>
                                  <option value="Sunday">Sunday</option>
                            </select>
                              <br><br>
                              <div id = "checkB" class="check">
                                  <input type="radio" name="sets" id= "radioBtn" value="multiple" onclick="showInfoCal(true);">Varying Sets
                                  <input type="radio" name="sets" id= "radioBtn" value="same" onclick="showInfoCal(false);">Same Sets
                              </div>
                              <br>
                              <div class = "infoBox" id = "infoBoxB">
                                  <label>Sets:</label><input type="text" class = "infoInput" id="setVal">
                                  <label>Reps:</label><input type="text" class = "infoInput" id="repVal">
                                  <label>Weight:</label><input type="text" class = "infoInput" id="weightVal">
                              </div>
                              <div class = "infoBox" id = "infoBox2B">
                                  <img src="../images/add.png" alt = "add"  class ="addSet" width="20" height="20" onclick="addSetCal()" >
                                  <label style = "float:right">Add Set</label>
                                  <br>
                                  <br>
                                  <div class = "setInfo" id = "setInfo">
                                      
                                  </div>
                              </div>
                              <br>
                              <button type="submit" onclick= "addtoCalendar()" name = "calBtn" class = "btn" id = "addbtn" style = "width: 100%;">Add</button>
                            </div>


            </form>
        </div>
        </div>
        <div id="routines" data-params="<?php echo htmlspecialchars(json_encode($routineObject), ENT_QUOTES, 'UTF-8'); ?>">
            <div id="id03" class="modal">
            <form class="modal-content animate" action = "" method="post">
                          <br>
                          <img src="../images/logo.png" alt = "logo" width="140" height="30" style="margin-top: 5px; margin-left: auto; margin-right:auto; display:block;">
                          <span onclick="resetForm();" class="close" title="Close Modal">&times;</span>
                          <div class="container">
                              <select class = "day" id="daysB">
                                  <option selected disabled>Choose Day:</option>
                                  <option value="Monday">Monday</option>
                                  <option value="Tuesday">Tuesday</option>
                                  <option value="Wednesday">Wednesday</option>
                                  <option value="Thursday">Thursday</option>
                                  <option value="Friday">Friday</option>
                                  <option value="Saturday">Saturday</option>
                                  <option value="Sunday">Sunday</option>
                            </select>
                              <br><br>
                              <div id = "checkC" class="check">
                                  <input type="radio" name="routine" id= "radioBtn" value="append" onclick="appendRoutine(true);">Add to Workout
                                  <input type="radio" name="routine" id= "radioBtn" value="replace" onclick="appendRoutine(false);">Replace Workout
                              </div>
                              <br><br>
                              <button type="submit" onclick= "addRoutine()" name = "rtnBtn" class = "btn" id = "addbtn" style = "width: 100%;">Add</button>
                </div>  
            </form>
            </div>
            <div class = "rtnWrapper">
                 <label class = "slideTitle">Beginner</label>
                 <div class = "rtnSlides" id = "beginner">
                </div>
                <div class = "arrows">
                    <img class = "arrowL" style = "margin-top: -220px; height:200px; left: 190px;" src = "../images/arrow-right.png" onclick= "goLeft(this);">
                    <img class = "arrowR" style = "margin-top: -220px; height: 200px;" src = "../images/arrow-right.png" onclick= "goRight(this);">
                </div>
            </div>
            <div class = "rtnWrapper">
                    <label class = "slideTitle">Intermediate</label>
                    <div class= "rtnSlides" id = "intermediate">
                    </div>
                </div>
            <div class = "rtnWrapper">
                <label class = "slideTitle">Advanced</label>
                <div class= "rtnSlides"  id = "advanced"></div>
                </div>
        </div>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="main.js"></script>
    <script src="https://apis.google.com/js/client.js?onload=init"></script>
    </body>
</html>