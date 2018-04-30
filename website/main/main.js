var ul;
var li;
var workout;
var classname;
var multiple;
var append;
var bicepNumber = 0;
var tricepNumber = 0;
var chestNumber = 0;
var backNumber = 0;
var absNumber = 0;
var legsNumber = 0;
var shoulderNumber = 0;
var setNum = 0;
var mondayVolume = [0,0,0,0,0,0];
var tuesdayVolume = [0,0,0,0,0,0];
var wednesdayVolume = [0,0,0,0,0,0];
var thursdayVolume = [0,0,0,0,0,0];
var fridayVolume = [0,0,0,0,0,0];
var saturdayVolume = [0,0,0,0,0,0];
var sundayVolume = [0,0,0,0,0,0];
var globWorkoutID;
var globalDay;
var chestArray = [];
var bicepArray = [];
var shoulderArray = [];
var absArray = [];
var legsArray = [];
var tricepArray = [];
var backArray = [];

//chart
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawBarChart);
$(document).ready(function(){

    updateStatValues();
    checkCurrentTab();
    setDates();
    $("#workout").hide();
    $("#infoBox").hide();
    $("#infoBox2").hide();
    $("#check").hide();
    $("#infoBoxB").hide();
    $("#infoBox2B").hide();
    $("#checkB").hide();
    $("#checkC").hide();

    var myJson = $('#calendar').data('params');
    createCalendar(myJson);

    var workJson = $('#workouts').data('params');
    initWorkouts(workJson);

    for(var i = 0; i < workJson.length; i++){
        switch(workJson[i]['MuscleGroupName']){

            case 'bicep':
                bicepArray.push([workJson[i]['WorkoutName'], workJson[i]['WorkoutID']]);
                break;
            case 'chest':
                chestArray.push([workJson[i]['WorkoutName'], workJson[i]['WorkoutID']]);
                break;
            case 'back':
                backArray.push([workJson[i]['WorkoutName'], workJson[i]['WorkoutID']]);
                break;
            case 'abs':
                absArray.push([workJson[i]['WorkoutName'], workJson[i]['WorkoutID']]);
               break;
            case 'leg':
                legsArray.push([workJson[i]['WorkoutName'], workJson[i]['WorkoutID']]);
                break;
            case 'shoulders':
                shoulderArray.push([workJson[i]['WorkoutName'], workJson[i]['WorkoutID']]);
                break;
            case 'triceps':
                 tricepArray.push([workJson[i]['WorkoutName'], workJson[i]['WorkoutID']]);
                break;
        }
    }

    var routJson = $('#routines').data('params');
    initRoutines(routJson);

    $("a").on("click", function(e){
        e.preventDefault();
        sessionStorage.setItem('lastTab', $(e.target).attr('id'));
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        
    });
    $("#workoutTypes").change(function(){
        classname = $(this).val();
        $("#workout").empty();
        var startOption = document.createElement("option");
        startOption.value = "";
        startOption.selected = true;
        startOption.disabled = true;
        startOption.text = "Choose Workout:";
        $("#workout").append(startOption);
        if(classname ==="abs"){
            for (var i = 0; i < absArray.length; i++) {
                var option = document.createElement("option");
                option.value = absArray[i][0];
                option.text = absArray[i][0];
                option.setAttribute("workout-id", absArray[i][1]);
                $("#workout").append(option);
            }
        }else if(classname ==="chest"){
            for (var i = 0; i < chestArray.length; i++) {
                var option = document.createElement("option");
                option.value = chestArray[i][0];
                option.text = chestArray[i][0];
                option.setAttribute("workout-id", chestArray[i][1]);
                $("#workout").append(option);
            }
        }else if(classname ==="bicep"){
            for (var i = 0; i < bicepArray.length; i++) {
                var option = document.createElement("option");
                option.value = bicepArray[i][0];
                option.text = bicepArray[i][0];
                option.setAttribute("workout-id", bicepArray[i][1]);
                $("#workout").append(option);
            }
        }else if(classname ==="back"){
            for (var i = 0; i < backArray.length; i++) {
                var option = document.createElement("option");
                option.value = backArray[i][0];
                option.text = backArray[i][0];
                option.setAttribute("workout-id", backArray[i][1]);
                $("#workout").append(option);
            }
        }else if(classname ==="leg"){
            for (var i = 0; i < legsArray.length; i++) {
                var option = document.createElement("option");
                option.value = legsArray[i][0];
                option.text = legsArray[i][0];
                option.setAttribute("workout-id", legsArray[i][1]);
                $("#workout").append(option);
            }
        }else if(classname ==="shoulders"){
            for (var i = 0; i < shoulderArray.length; i++) {
                var option = document.createElement("option");
                option.value = shoulderArray[i][0];
                option.text = shoulderArray[i][0];
                option.setAttribute("workout-id", shoulderArray[i][1]);
                $("#workout").append(option);
            }
        }else if(classname ==="triceps"){     
            for (var i = 0; i < tricepArray.length; i++) {
                var option = document.createElement("option");
                option.value = tricepArray[i][0];
                option.text = tricepArray[i][0];
                option.setAttribute("workout-id", tricepArray[i][1]);
                $("#workout").append(option);
            }
        }
        $("#workout").show();
    });
    $("#workout").change(function(){
        globWorkoutID = $(this)[0].selectedOptions[0].attributes[1].value;
        $("#check").show();
        if((classname ==="abs" && ($(this).val().includes("Cable") || $(this).val().includes("Medicine"))) || $(this).val().includes("Plank")){
            $("#weightVal").hide();
        }else{
            $("#weightVal").show();
        }
    });
    $("#days").change(function(){
        $("#checkB").show();
        globalDay = $(this)[0].selectedOptions[0].value;
    });
    $("#daysB").change(function(){
        $("#checkC").show();
    });

});

/* Creates the weekly calendar*/

function createCalendar(myJson){
    console.log(myJson);
    var day;
    for(var i = 0; i < myJson.length; i++)
    {
        switch (parseInt(myJson[i]['Weekday'])) {
            case 0:
                day = "Monday";
                break;
            case 1:
                day = "Tuesday";
                break;
            case 2:
                day = "Wednesday";
                break;
            case 3:
                day = "Thursday";
                break;
            case 4:
                day = "Friday";
                break;
            case 5:
                day = "Saturday";
                break;
            case 6:
                day = "Sunday";
                break;
        }
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(myJson[i]['WorkoutName']));
        var im = document.createElement("IMG");
        im.setAttribute('src', '../images/delete.png');
        im.setAttribute("class", "delete");
        im.setAttribute("onclick", "flagDelete(this)");
        li.setAttribute("class", myJson[i]['MuscleGroupName']);
        classname = myJson[i]['MuscleGroupName'];
        li.setAttribute("workout-id", parseInt(myJson[i]['WorkoutID']));
        li.setAttribute("data-routine", parseInt(myJson[i]['RoutineID']));
        var sets = myJson[i]['Sets'];
        var reps = myJson[i]['Reps'];
        var weight = myJson[i]['Weight'];
        var volume = (parseInt(reps) * parseInt(weight)*parseInt(sets));
        li.setAttribute("data-volume", volume.toString());
        li.setAttribute("reps", reps);
        li.setAttribute("sets", sets);
        li.setAttribute("weight", weight);
        li.setAttribute("onclick", "showWorkoutInfo(this)");
        li.appendChild(im);
        var ul = document.getElementById(day);
        ul.insertBefore(li, ul.childNodes[4]);
        ul.setAttribute("day-routine", myJson[i]['RoutineID']);
        addVolume(volume, true, day);
    }
}
function initRoutines(routines){
    console.log(routines);
    const begin = document.getElementById("beginner");
    const interm = document.getElementById("intermediate");
    const advanced = document.getElementById("advanced");
    var hash = new Set();
    var globUL;
    for(let i = 0; i<routines.length; i++){
        let dom;
        switch(parseInt(routines[i]['RoutineDifficulty'])){
            case 1:
                dom = begin;
                break;
            case 2:
                dom = interm;
                break;
            case 3:
                dom = advanced;
                break;
        }
        if(typeof dom !== 'undefined') {
            if(!hash.has(routines[i]['RoutineID'])) {
                hash.add(routines[i]['RoutineID']);
                const title = routines[i]['RoutineName'];
                const desc = routines[i]['RoutineDescription'];
                let lab = document.createElement("LABEL");
                lab.innerText = title;
                lab.setAttribute("class", "rtnTitle");
                let ul = document.createElement("UL");
                ul.setAttribute("routine-id", routines[i]['RoutineID']);
                ul.setAttribute("class", "rtnList");
                let rtDiv = document.createElement("DIV");
                let des = document.createElement("P");
                des.innerText = desc;
                let im = document.createElement("IMG");
                im.setAttribute('src', '../images/add.png');
                im.setAttribute("class", "add");
                im.setAttribute("onclick", "flagRoutine(this)");

                rtDiv.appendChild(des);
                rtDiv.setAttribute("class", "rtnDescription");
                ul.appendChild(lab);
                ul.appendChild(rtDiv);
                ul.appendChild(im);
                globUL = ul;
            }

            var li = document.createElement("LI");
            li.setAttribute("workout-id", routines[i]['WorkoutID']);
            li.setAttribute("class", routines[i]['MuscleGroupName']);
            li.setAttribute("reps", routines[i]['Reps']);
            li.innerText = routines[i]['WorkoutName'];
            li.setAttribute("sets", routines[i]['Sets']);
            li.setAttribute("weight", routines[i]['Weight']);
            li.setAttribute("onclick", "showWorkoutInfo(this)");
            var temp = document.createElement("LABEL");
            li.appendChild(temp);
            globUL.insertBefore(li, globUL.childNodes[1]);
            dom.appendChild(globUL);
        }
    }
}
/*Show the radio buttons and the sets on the calendar page */
function showInfo(bool){
    multiple = bool;
    if(multiple ===true){
        $("#infoBox2").show();
        $("#infoBox").hide();
    }else{
        $("#infoBox").show();
        $("#infoBox2").hide();
    }
}
/*Show the radio buttons and the sets on the workout page */
function showInfoCal(bool){
    multiple = bool;
    if(multiple ===true){
        $("#infoBox2B").show();
        $("#infoBoxB").hide();
    }else{
        $("#infoBoxB").show();
        $("#infoBox2B").hide();
    }
}
/*Add sets from the calendar page */
function addSet(){
    setNum++;
    var setBox = document.getElementById("infoBox2");
    var div = document.createElement("div");
    div.setAttribute('class', 'setInfo');
    div.innerHTML = "Set:"+setNum+" <label>Reps:</label><input type='text' class = 'infoInput' id='repVal'> <label>Weight:</label><input type='text' class = 'infoInput' id='weightVal'>";
    setBox.appendChild(div);
}
/*Add sets from workout page */
function addSetCal(){
    setNum++;
    var setBox = document.getElementById("infoBox2B");
    var div = document.createElement("div");
    div.setAttribute('class', 'setInfo');
    div.innerHTML = "Set:"+setNum+" <label>Reps:</label><input type='text' class = 'infoInput' id='repVal'> <label>Weight:</label><input type='text' class = 'infoInput' id='weightVal'>";
    setBox.appendChild(div);
}
function addRoutine(){
    var volume = 0;
    var day = document.getElementById('daysB').value;
    var cal = document.getElementById(day);
    if(append || cal.childNodes.length <= 2 ){
        for(var i = 0; i < ul.childNodes.length; i++){
            var temp = ul.childNodes[i];
            if(temp.tagName === "LI"){
                var im = document.createElement("IMG");
                im.setAttribute('src', '../images/delete.png');
                im.setAttribute("class", "delete");
                im.setAttribute("onclick", "flagDelete(this)");
                var li = document.createElement("LI");
                li.setAttribute("class", temp.className);
                classname = temp.className;
                li.setAttribute("data-volume", temp.getAttribute("data-volume"));
                volume = parseInt(temp.getAttribute("data-volume")) || 0;
                addVolumeR(volume, day, true);
                li.setAttribute("data-set", temp.getAttribute("data-set"));
                li.setAttribute("onclick", "showWorkoutInfo(this)");
                li.appendChild(im);
                li.appendChild(document.createTextNode(temp.innerText));
                cal.insertBefore(li, cal.childNodes[4]);

               $.ajax({
                    type: "POST",
                    url: 'main.php',
                    data: {
                        action: 'addWorkout',
                        workout: temp.getAttribute("workout-id"),
                        routine: cal.getAttribute("day-routine"),
                        reps: temp.getAttribute("reps"),
                        weight: temp.getAttribute("weight"),
                        sets: temp.getAttribute("sets")
                    }
                });
            }
        }
    }else{
        for(var i = 0; i < cal.childNodes.length; i++){
            if(cal.childNodes[i].tagName === "LI"){
                $.ajax({
                    type: "POST",
                    url: 'main.php',
                    data: {
                        action: 'addWorkout',
                        workout: cal.childNodes[i].getAttribute("workout-id"),
                        routine: cal.getAttribute("day-routine"),
                        reps: cal.childNodes[i].getAttribute("reps"),
                        weight: cal.childNodes[i].getAttribute("weight"),
                        sets: cal.childNodes[i].getAttribute("sets")
                    }
                });
                cal.childNodes[i].removeChild();
            }   
        }
        for(var i = 0; i < ul.childNodes.length; i++){
            var temp = ul.childNodes[i];
            if(temp.tagName === "LI"){
                var im = document.createElement("IMG");
                im.setAttribute('src', '../images/delete.png');
                im.setAttribute("class", "delete");
                im.setAttribute("onclick", "flagDelete(this)");
                var li = document.createElement("LI");
                li.setAttribute("class", temp.className);
                classname = temp.className;
                li.setAttribute("data-volume", temp.getAttribute("data-volume"));
                volume = parseInt(temp.getAttribute("data-volume")) || 0;
                addVolumeR(volume, day, true);
                li.setAttribute("data-set", temp.getAttribute("data-set"));
                li.setAttribute("onclick", "showWorkoutInfo(this)");
                li.appendChild(im);
                li.appendChild(document.createTextNode(temp.innerText));
                cal.insertBefore(li, cal.childNodes[4]);
                $.ajax({
                   type: "POST",
                   url: 'main.php',
                   data: {
                       action: 'addWorkout',
                       workout: temp.getAttribute("workout-id"),
                       routine: cal.getAttribute("day-routine"),
                       reps: temp.getAttribute("reps"),
                       weight: temp.getAttribute("weight"),
                       sets: temp.getAttribute("sets")
                   }
               });
            }
        }
    }
    addVolume(volume, true, day);
    resetForm();
    document.location.reload(true);
}
function appendRoutine(bool){
    append = bool;
}
/*Initiate each workout type in there respective slides, public workouts not custom*/
function initWorkouts(workJson){
    var chestS = document.getElementById("chstSlides");
    var backS = document.getElementById("bckSlides");
    var bicepS = document.getElementById("bcpSlides");
    var tricepS = document.getElementById("tcpSlides");
    var shoulderS = document.getElementById("shldSlides");
    var legS = document.getElementById("lgsSlides");
    var abS = document.getElementById("abSlides");
    for (var i = 0; i < workJson.length; i++) {
        var workout = workJson[i]['WorkoutName']
        var li = document.createElement("li");
        var im = document.createElement("IMG");
        im.setAttribute('src', workJson[i]['W_ImageAddress']);
        im.setAttribute('onerror', "this.src='../Workouts/imagenotfound.png'");
        im.setAttribute("class", "slidePic");
        im.setAttribute("onclick", "showWorkout(this)");
        im.setAttribute("alt", workJson[i]['WorkoutID']);
        im.setAttribute("title", workout);
        im.setAttribute("workDsc", workJson[i]['WorkoutDescription'])
        var im2 = document.createElement("IMG");
        im2.setAttribute('src', '../images/add.png');
        im2.setAttribute("class", "addPic");
        im2.setAttribute("onclick", "addPic(this)");
        im2.setAttribute("alt", workJson[i]['WorkoutID']);
        li.appendChild(im);
        li.appendChild(im2);
        var lab = document.createElement("LABEL");
        lab.innerHTML = "<br /> "+workout;
        lab.setAttribute("class", "workoutTitle");
        li.appendChild(lab);

        switch(workJson[i]['MuscleGroupName']){

            case 'bicep':
                bicepS.appendChild(li);
                break;
            case 'chest':
                chestS.appendChild(li);
                break;
            case 'back':
                backS.appendChild(li);
                break;
            case 'abs':
                abS.appendChild(li);
                break;
            case 'leg':
                legS.appendChild(li);
                break;
            case 'shoulders':
                shoulderS.appendChild(li);
                break;
            case 'triceps':
                tricepS.appendChild(li);
                break;
        }
    }

}
/*Creates sets, reps, and weight values as a JSON string when on calendar page */
function setValues(){
    var volume =  0;
    var data;
    var routineID = parseInt(ul.getAttribute("day-routine"));
    if(multiple ===false){
        var box = document.getElementById("infoBox");
        var sets = box.childNodes[2].value;
        var reps = box.childNodes[5].value;
        var weights = box.childNodes[8].value;
        if(routineID > 0) {
            $.ajax({
                type: "POST",
                url: 'main.php',
                data: {
                    action: 'addWorkout',
                    workout: parseInt(globWorkoutID),
                    routine: routineID,
                    reps: reps,
                    weight: weights,
                    sets: sets
                }
            })
                .done();
        }

        volume += sets*reps*weights;
    }else{
        var box = document.getElementById("infoBox2");
        var list = box.querySelectorAll(".setInfo");
        for(var i =0; i<list.length; i++) {
            if(list[i].innerText !== "") {
                var reps = list[i].childNodes[2].value;
                var weights = list[i].childNodes[5].value;
                volume += reps * weights;
                if (routineID > 0) {
                    $.ajax({
                        type: "POST",
                        url: 'main.php',
                        data: {
                            action: 'addWorkout',
                            workout: parseInt(globWorkoutID),
                            routine: routineID,
                            reps: reps,
                            weight: weights,
                            sets: 1
                        }
                    })
                        .done();
                }
            }
        }
    }
    return volume;
}
/*Creates sets, reps, and weight values as a JSON string when on workout page */
function setValuesCal(){
    var volume =  0;
    var data;
    var routineID = parseInt(document.getElementById(globalDay).getAttribute("day-routine"));
    if(multiple ===false){
        var box = document.getElementById("infoBoxB");
        var sets = box.childNodes[2].value;
        var reps = box.childNodes[5].value;
        var weights = box.childNodes[8].value;
        volume += sets*reps*weights;
        if(routineID > 0) {
            $.ajax({
                type: "POST",
                url: 'main.php',
                data: {
                    action: 'addWorkout',
                    workout: parseInt(globWorkoutID),
                    routine: routineID,
                    reps: reps,
                    weight: weights,
                    sets: sets
                }
            })
                .done();
        }
    }else{
        var box = document.getElementById("infoBox2B");
        var list = box.querySelectorAll(".setInfo");
        for(var i =0; i<list.length; i++) {
            if(list[i].innerText !== "") {
                var reps = list[i].childNodes[2].value;
                var weights = list[i].childNodes[5].value;
                volume += reps * weights;
                if (routineID > 0) {
                    $.ajax({
                        type: "POST",
                        url: 'main.php',
                        data: {
                            action: 'addWorkout',
                            workout: parseInt(globWorkoutID),
                            routine: routineID,
                            reps: reps,
                            weight: weights,
                            set: 1
                        }
                    })
                        .done();
                }
            }
        }
    }
    return volume;
}

/*Adds workout to calendar, with set data, and specific photo and info, when on calendar page*/
function addtoList() {
    var volume = setValues();
    addVolume(volume, true, ul.className);
    resetForm();
    document.location.reload(true);
}
/* Opens up modal to add the workout to the calendar from the workout page */
function addPic(pic){
    globWorkoutID = pic.alt;
    classname = pic.parentNode.parentNode.parentNode.childNodes[1].innerText.toLowerCase();
    workout = pic.parentNode.childNodes[2].innerText;
    document.getElementById('id02').style.display="block";
    var lab = document.getElementById('addTitle');
    lab.innerText = workout;
}
/*Adds workout to calendar, with set data, and specific photo and info, when on workout page*/
function addtoCalendar(){
     var volume = setValuesCal();
    document.getElementById('id02').style.display="none";
    var e = document.getElementById("days");
    var day =  e.options[e.selectedIndex].text;
    ul = document.getElementById(day);
    addVolume(volume, true, day);
    resetForm();
    document.location.reload(true);
}
/* Adds or deletes volume from the volume array, array of volumes for each day. What stats are based upon
    Each day has an index for workout type, checks which day it is and which workout to see which index to add or
    delete from.
*/
function addVolume(volume, add, day){
    if(day === "Monday"){
        if(classname ==="chest"){
            if(add === true){
                mondayVolume[0] += volume; 
            }else{
                mondayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                mondayVolume[1] += volume;
            }else{
                mondayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                mondayVolume[2] += volume;
            }else{
                mondayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                mondayVolume[3] += volume;
            }else{
                mondayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                mondayVolume[4] += volume;
            }else{
                mondayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                mondayVolume[5] += volume;
            }else{
                mondayVolume[5] -= volume;
            }
        }
    }else if(day === "Tuesday"){
        if(classname ==="chest"){
            if(add === true){
                tuesdayVolume[0] += volume; 
            }else{
                tuesdayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                tuesdayVolume[1] += volume;
            }else{
                tuesdayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                tuesdayVolume[2] += volume;
            }else{
                tuesdayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                tuesdayVolume[3] += volume;
            }else{
                tuesdayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                tuesdayVolume[4] += volume;
            }else{
                tuesdayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                tuesdayVolume[5] += volume;
            }else{
                tuesdayVolume[5] -= volume;
            }
        }
    }else if(day === "Wednesday"){
       if(classname ==="chest"){
            if(add === true){
                wednesdayVolume[0] += volume; 
            }else{
                wednesdayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                wednesdayVolume[1] += volume;
            }else{
                wednesdayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                wednesdayVolume[2] += volume;
            }else{
                wednesdayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                wednesdayVolume[3] += volume;
            }else{
                wednesdayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                wednesdayVolume[4] += volume;
            }else{
                wednesdayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                wednesdayVolume[5] += volume;
            }else{
                wednesdayVolume[5] -= volume;
            }
        }
    }else if(day === "Thursday"){
        if(classname ==="chest"){
            if(add === true){
                thursdayVolume[0] += volume; 
            }else{
                thursdayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                thursdayVolume[1] += volume;
            }else{
                thursdayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                thursdayVolume[2] += volume;
            }else{
                thursdayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                thursdayVolume[3] += volume;
            }else{
                thursdayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                thursdayVolume[4] += volume;
            }else{
                thursdayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                thursdayVolume[5] += volume;
            }else{
                thursdayVolume[5] -= volume;
            }
        }
    }else if(day === "Friday"){
         if(classname ==="chest"){
            if(add === true){
                fridayVolume[0] += volume; 
            }else{
                fridayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                fridayVolume[1] += volume;
            }else{
                fridayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                fridayVolume[2] += volume;
            }else{
                fridayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                fridayVolume[3] += volume;
            }else{
                fridayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                fridayVolume[4] += volume;
            }else{
                fridayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                fridayVolume[5] += volume;
            }else{
                fridayVolume[5] -= volume;
            }
        }
    }else if(day === "Saturday"){
        if(classname ==="chest"){
            if(add === true){
                saturdayVolume[0] += volume; 
            }else{
                saturdayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                saturdayVolume[1] += volume;
            }else{
                saturdayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                saturdayVolume[2] += volume;
            }else{
                saturdayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                saturdayVolume[3] += volume;
            }else{
                saturdayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                saturdayVolume[4] += volume;
            }else{
                saturdayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                saturdayVolume[5] += volume;
            }else{
                saturdayVolume[5] -= volume;
            }
        }
    }else if(day === "Sunday"){
        if(classname ==="chest"){
            if(add === true){
                sundayVolume[0] += volume; 
            }else{
                sundayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                sundayVolume[1] += volume;
            }else{
                sundayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                sundayVolume[2] += volume;
            }else{
                sundayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                sundayVolume[3] += volume;
            }else{
                sundayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                sundayVolume[4] += volume;
            }else{
                sundayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                sundayVolume[5] += volume;
            }else{
                sundayVolume[5] -= volume;
            }
        }
    }
    drawBarChart(); //updates volume chart
}
function addVolumeR(volume, day, add){
    if(day === "Monday"){
        if(classname ==="chest"){
            if(add === true){
                mondayVolume[0] += volume; 
            }else{
                mondayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                mondayVolume[1] += volume;
            }else{
                mondayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                mondayVolume[2] += volume;
            }else{
                mondayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                mondayVolume[3] += volume;
            }else{
                mondayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                mondayVolume[4] += volume;
            }else{
                mondayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                mondayVolume[5] += volume;
            }else{
                mondayVolume[5] -= volume;
            }
        }
    }else if(day === "Tuesday"){
        if(classname ==="chest"){
            if(add === true){
                tuesdayVolume[0] += volume; 
            }else{
                tuesdayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                tuesdayVolume[1] += volume;
            }else{
                tuesdayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                tuesdayVolume[2] += volume;
            }else{
                tuesdayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                tuesdayVolume[3] += volume;
            }else{
                tuesdayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                tuesdayVolume[4] += volume;
            }else{
                tuesdayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                tuesdayVolume[5] += volume;
            }else{
                tuesdayVolume[5] -= volume;
            }
        }
    }else if(day === "Wednesday"){
       if(classname ==="chest"){
            if(add === true){
                wednesdayVolume[0] += volume; 
            }else{
                wednesdayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                wednesdayVolume[1] += volume;
            }else{
                wednesdayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                wednesdayVolume[2] += volume;
            }else{
                wednesdayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                wednesdayVolume[3] += volume;
            }else{
                wednesdayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                wednesdayVolume[4] += volume;
            }else{
                wednesdayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                wednesdayVolume[5] += volume;
            }else{
                wednesdayVolume[5] -= volume;
            }
        }
    }else if(day === "Thursday"){
        if(classname ==="chest"){
            if(add === true){
                thursdayVolume[0] += volume; 
            }else{
                thursdayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                thursdayVolume[1] += volume;
            }else{
                thursdayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                thursdayVolume[2] += volume;
            }else{
                thursdayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                thursdayVolume[3] += volume;
            }else{
                thursdayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                thursdayVolume[4] += volume;
            }else{
                thursdayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                thursdayVolume[5] += volume;
            }else{
                thursdayVolume[5] -= volume;
            }
        }
    }else if(day === "Friday"){
         if(classname ==="chest"){
            if(add === true){
                fridayVolume[0] += volume; 
            }else{
                fridayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                fridayVolume[1] += volume;
            }else{
                fridayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                fridayVolume[2] += volume;
            }else{
                fridayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                fridayVolume[3] += volume;
            }else{
                fridayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                fridayVolume[4] += volume;
            }else{
                fridayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                fridayVolume[5] += volume;
            }else{
                fridayVolume[5] -= volume;
            }
        }
    }else if(day === "Saturday"){
        if(classname ==="chest"){
            if(add === true){
                saturdayVolume[0] += volume; 
            }else{
                saturdayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                saturdayVolume[1] += volume;
            }else{
                saturdayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                saturdayVolume[2] += volume;
            }else{
                saturdayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                saturdayVolume[3] += volume;
            }else{
                saturdayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                saturdayVolume[4] += volume;
            }else{
                saturdayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                saturdayVolume[5] += volume;
            }else{
                saturdayVolume[5] -= volume;
            }
        }
    }else if(day === "Sunday"){
        if(classname ==="chest"){
            if(add === true){
                sundayVolume[0] += volume; 
            }else{
                sundayVolume[0] -= volume;
            }
        }else if(classname ==="bicep"){
            if(add === true){
                sundayVolume[1] += volume;
            }else{
                sundayVolume[1] -= volume;
            }
        }else if(classname ==="back"){
            if(add === true){
                sundayVolume[2] += volume;
            }else{
                sundayVolume[2] -= volume;
            }
        }else if(classname ==="leg"){
            if(add === true){
                sundayVolume[3] += volume;
            }else{
                sundayVolume[3] -= volume;
            }
        }else if(classname ==="shoulders"){
            if(add === true){
                sundayVolume[4] += volume;
            }else{
                sundayVolume[4] -= volume;
            }
        }else if(classname ==="triceps"){
            if(add === true){
                sundayVolume[5] += volume;
            }else{
                sundayVolume[5] -= volume;
            }
        }
    }
    drawBarChart(); //updates volume chart
}
function logout(){
    $.ajax({
        type: "POST",
        url: 'main.php',
        data: {logout: 'logout'}})
        .done();
    window.location.href = "http://cop4331.hosted.nfoservers.com";
}
/* Show the sets, rep and weights of workout on the calendar */
function showWorkoutInfo(workout){
    var holder = workout.parentNode.parentNode;
    if(workout.childNodes.length > 2){
        workout.childNodes[2].remove();
        workout.style.marginBottom = "1px";
    }else{
    var sets = workout.getAttribute("sets");
    var reps = workout.getAttribute("reps");
    var weight = workout.getAttribute("weight");
    var div = document.createElement("DIV");
    div.setAttribute("class", "setDiv");
    var label1 = document.createElement("lab");
    var label2 = document.createElement("lab");
    var label3 = document.createElement("lab");
    label1.innerHTML = "Set(s):"+sets+ " ";
    label2.innerHTML = "Reps:"+reps+ " ";
    label3.innerHTML = "Weight:"+weight+"<br><br>";
    div.appendChild(label1);
    div.appendChild(label2);
    div.appendChild(label3);
    workout.appendChild(div);
    }
    
}
/*Show info on the workout, including youtube videos for tutorial. Multiple youtube videos are 
  returned to ensure there is at least one correct tutorial video;
*/
function showWorkout(r){
    var title = r.getAttribute("title");
    var workout = r;
    var workoutSlide = r.parentNode.parentNode.parentNode.parentNode;
    var slide = workoutSlide.childNodes[3];
    var description = workout.getAttribute("workDsc");
    slide.childNodes[3].childNodes[1].innerText = title;
    slide.childNodes[3].childNodes[3].innerText = description;
    slide.style.display = "block";
    workoutSlide.style.marginBottom = "650px";
    var vidDiv = slide.childNodes[5];
    if(vidDiv.childNodes.length > 1)
    {
        for(var i = 1; i<vidDiv.childNodes.length; i++){
            vidDiv.childNodes[i].remove();
        }
    }
    var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent(title.toString()+"tutorial").replace(/%20/g, "+"),
            maxResults: 1,
            topicId: "/m/027x7n",
            safeSearch:"moderate",
            publishedAfter: "2008-01-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $.each(results.items, function(index, item) {
              var frame = document.createElement("IFRAME");
              frame.setAttribute("class", "video");
              frame.setAttribute('allowFullScreen', '');
              frame.src = "https://www.youtube.com/embed/"+item.id.videoId;
                vidDiv.append(frame);
            
          });
       });
   
   
}
/* Initiate the google youtube api, with api key from google developers console */
function init() {
    gapi.client.setApiKey("AIzaSyA8k8Xn0vTTuDvq2UC6outWO1Uhzj5GM2o");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}
/* Remove the info of the workout clicked on on the workout page*/
function removeDescription(r){
    var workoutSlide = r.parentNode.parentNode;
    var slide = workoutSlide.childNodes[3];
    slide.style.display = "none";
    workoutSlide.style.marginBottom = "350px";
    var vidDiv = slide.childNodes[5];
    for(var i = 1; i<vidDiv.childNodes.length; i++){
        vidDiv.childNodes[i].remove();
    }
}
/* Reset all the fields*/ 
function resetForm(){
    document.getElementById("id01").style.display = "none";
    document.getElementById("id02").style.display = "none";
    document.getElementById("id03").style.display = "none";
    $('#workout').prop('selectedIndex', 0);
    $('#days').prop('selectedIndex', 0);
    $('#daysB').prop('selectedIndex', 0);
    $('#workout').hide();
    $('#check').hide();
    $('#checkB').hide();
    $('#checkC').hide();
    $("#infoBox").hide();
    $("#infoBox2").hide();
    $("#infoBoxB").hide();
    $("#infoBox2B").hide();
    $("#radioBtn").attr("checked", false);
    $("#setVal").val('');
    $("#repVal").val('');
    $("#weightVal").val('');
    $(".setInfo").remove();
    $("#workoutTypes").prop('selectedIndex', 0);
    var checka = document.getElementById('check');
    checka.childNodes[1].checked = false;
    checka.childNodes[3].checked = false;
    var checkb = document.getElementById('checkB');
    checkb.childNodes[1].checked = false;
    checkb.childNodes[3].checked = false;
    var checkc = document.getElementById('checkC');
    checkc.childNodes[1].checked = false;
    checkc.childNodes[3].checked = false;
    setNum = 0;
}
/* Makes sure last tab is not lost after refresh */
function checkCurrentTab(){
    var lastTab = sessionStorage.getItem('lastTab');
    $('#'+lastTab).addClass("active");
    $('#'+lastTab).siblings().removeClass("active");
    if(lastTab ==="calendarTab"){
        document.getElementById('calendar').style.display = "block";
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "absolute";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "none";
    }else if(lastTab ==="statTab"){
        document.getElementById('stats').style.visibility = "visible";
        document.getElementById('stats').style.position = "relative";
        document.getElementById('stats').style.top = "0px";
        document.getElementById('stats').style.left = "0px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "none";
    }else if(lastTab ==="workTab"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "block";
        document.getElementById('routines').style.display = "none";
    }else if(lastTab ==="routineTab"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "block";
    }
}
/* Switches the page when clicked on side navigation bar */
function switchDiv(i) {
    if(i.toElement.innerText === "Schedule"){
        document.getElementById('calendar').style.display = "block";
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "absolute";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "none";
        
    }else if(i.toElement.innerText === "Stats"){
        updateStatValues();
        drawChart();
        document.getElementById('stats').style.visibility = "visible";
        document.getElementById('stats').style.position = "relative";
        document.getElementById('stats').style.top = "0px";
        document.getElementById('stats').style.left = "0px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "none";
    }else if(i.toElement.innerText === "Workouts"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "block";
        document.getElementById('routines').style.display = "none";
    }else if(i.toElement.innerText === "Routines"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "block";
    }
}
/*Update values for the weekly distribution pie chart */
function updateStatValues() {

    window.addEventListener('load', function () {
        var cal = document.getElementById("calendar");

        let list = cal.getElementsByClassName("bicep");
        for (let i = 0; i<list.length; i++){
            bicepNumber += parseInt(list[i].getAttribute("sets"));
        }
        list = cal.getElementsByClassName("triceps");
        for (let i = 0; i<list.length; i++){
            tricepNumber += parseInt(list[i].getAttribute("sets"));
        }
        list = cal.getElementsByClassName("chest");
        for (let i = 0; i<list.length; i++){
            chestNumber += parseInt(list[i].getAttribute("sets"));
        }
        list = cal.getElementsByClassName("back");
        for (let i = 0; i<list.length; i++){
            backNumber += parseInt(list[i].getAttribute("sets"));
        }
        list = cal.getElementsByClassName("abs");
        for (let i = 0; i<list.length; i++){
            absNumber += parseInt(list[i].getAttribute("sets"));
        }
        list = cal.getElementsByClassName("leg");
        for (let i = 0; i<list.length; i++){
            legsNumber += parseInt(list[i].getAttribute("sets"));
        }
        list = cal.getElementsByClassName("shoulders");
        for (let i = 0; i<list.length; i++){
            shoulderNumber += parseInt(list[i].getAttribute("sets"));
        }
    })

}
/* Removes workout from calendar and deletes volume */
function deleteWorkout(){
    classname = li.className;
    var deleteId = li.getAttribute("workout-id");
    ul.removeChild(li);

    var routineID = parseInt(li.getAttribute("data-routine"));
    var sets =  parseInt(li.getAttribute("sets"));
    var reps =  parseInt(li.getAttribute("reps"));
    var weight =  parseInt(li.getAttribute("weight"));
    var volume = sets*reps*weight;

    $.ajax({
        type: "POST",
        url: 'main.php',
        data: {action: 'deleteWorkout', workout: deleteId, routine: routineID, reps: reps, weight: weight, sets: sets}})
        .done();

    addVolume(volume, false, ul.className);
}
/*Sets date on the calendar for each day*/
function setDates(){
    var d = new Date();
    var month  = d.getMonth();
    var year = d.getFullYear();
    var start = d.getDay();
    var date = d.getDate();
    for(var i = start; i <= 6; i++ ){
        document.getElementById("date"+i).innerText = month+"/"+date+"/"+year;
        date++;
    }
    date = d.getDate()-1;
    for(var i = start-1; i >= 0; i--){
        document.getElementById("date"+i).innerText = month+"/"+date+"/"+year;
        date--;
    }
}
/*Scrolls left on slide*/
function goLeft(r){
    var par  = r.parentNode.parentNode.childNodes[3];
    par.scrollLeft -= 800;
}
/*Scrolls right on slide*/
function goRight(r){
    var par  = r.parentNode.parentNode.childNodes[3];
    par.scrollLeft += 800;
}

/* Sets which day that was picked to add workout to */
function flag(r){
    document.getElementById('id01').style.display="block";
    ul = r.parentNode;
}
/*Flags the workout that will be deleted*/
function flagDelete(r){
    li = r.parentNode;
    ul = r.parentNode.parentNode;
    deleteWorkout();
}
function flagRoutine(r){
    document.getElementById('id03').style.display="block";
    ul = r.parentNode;
}
$(function(){
    $("a").bind("click", switchDiv);
});


// Draw the chart and set the chart values
function drawChart() {
var data = google.visualization.arrayToDataTable([
  ['Workout Type', 'Amount exercised'],
  ['Chest', chestNumber],
  ['Bicep', bicepNumber],
  ['Tricep', tricepNumber],
  ['Back', backNumber],
  ['Shoulder', shoulderNumber],
  ['Legs', legsNumber],
  ['Abs', absNumber]
]);

  // Optional; add a title and set the width and height of the chart
  var options = {'title':'Weekly Workout Distribution', 
                 'width':1000, 'height':600, 
                 backgroundColor: 'transparent', 
                 legendTextStyle: { color: '#FFF',fontName: 'Arial Black', fontSize: '20' },
                 titleTextStyle: { color: '#FFF',fontName: 'Arial Black',  fontSize: '30' },
                 chartArea: {fontFamily: 'Arial Black'},
                 colors: ['#F22613', '#00E640', '#f44242', '#ffe100', '#ad3bcd', '#FF8300', '#18dcff']
                };

  // Display the chart inside the <div> element with id="piechart"
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}
function drawBarChart(){
    if(typeof google.visualization !== 'undefined') {
        var data = google.visualization.arrayToDataTable([
            [{label: 'Day', type: 'string'},
                {label: 'Chest', type: 'number'},
                {label: 'Bicep', type: 'number'},
                {label: 'Back', type: 'number'},
                {label: 'Legs', type: 'number'},
                {label: 'Shoulders', type: 'number'},
                {label: 'Triceps', type: 'number'}],
            ["Monday", mondayVolume[0], mondayVolume[1], mondayVolume[2], mondayVolume[3], mondayVolume[4], mondayVolume[5]],
            ["Tuesday", tuesdayVolume[0], tuesdayVolume[1], tuesdayVolume[2], tuesdayVolume[3], tuesdayVolume[4], tuesdayVolume[5]],
            ["Wednesday", wednesdayVolume[0], wednesdayVolume[1], wednesdayVolume[2], wednesdayVolume[3], wednesdayVolume[4], wednesdayVolume[5]],
            ["Thursday", thursdayVolume[0], thursdayVolume[1], thursdayVolume[2], thursdayVolume[3], thursdayVolume[4], thursdayVolume[5]],
            ["Friday", fridayVolume[0], fridayVolume[1], fridayVolume[2], fridayVolume[3], fridayVolume[4], fridayVolume[5]],
            ["Saturday", saturdayVolume[0], saturdayVolume[1], saturdayVolume[2], saturdayVolume[3], saturdayVolume[4], saturdayVolume[5]],
            ["Sunday", sundayVolume[0], sundayVolume[1], sundayVolume[2], sundayVolume[3], sundayVolume[4], sundayVolume[5]]
        ]);
        var options = {
            title: "Daily Workout Volume by Pound",
            width: 900,
            height: 600,
            backgroundColor: 'transparent',
            legendTextStyle: {color: '#FFF'},
            titleTextStyle: {color: '#FFF', fontName: 'Arial Black', fontSize: '30'},
            chartArea: {fontFamily: 'Arial Black'},
            legend: {position: "top"},
            isStacked: true,
            hAxis: {textStyle: {color: "#FFFFFF"}},
            vAxis: {textStyle: {color: "#FFFFFF"}},
            bar: {groupWidth: "95%"},
            series: [
                {color: '#F22613'},
                {color: '#00E640'},
                {color: '#ffe100'},
                {color: '#FF8300'},
                {color: '#ad3bcd'},
                {color: '#f44242'}
            ]
        };
        var chart = new google.visualization.BarChart(document.getElementById("barchart"));
        chart.draw(data, options);
    }
}