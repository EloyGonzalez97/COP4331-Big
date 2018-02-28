var ul;
var li;
var workout;
var classname;
var setData;
var bicepBool;
var tricepBool;
var chestBool;
var backBool;
var absBool;
var legsBool;
var shoulderBool;
var multiple;
var bicepNumber;
var tricepNumber;
var chestNumber;
var backNumber;
var absNumber;
var legsNumber;
var shoulderNumber;
var setNum = 0;
var mondayVolume = [0,1000,0,0,0,0];
var tuesdayVolume = [0,0,0,2500,0,0];
var wednesdayVolume = [0,0,1215,0,0,0];
var thursdayVolume = [0,0,0,0,0,0];
var fridayVolume = [0,0,0,0,0,0];
var saturdayVolume = [2300,0,0,0,0,0];
var sundayVolume = [0,0,0,0,980,0];
var chestArray = ["Dumbbell Bench Press","Decline Dumbbell Bench Press", " Incline Dumbbell Bench Press", "Pushups", "Dumbbell Flyes", "Incline Dumbbell Press", "Low Cable Crossover", "Decline Dumbbell Flyes", "Dips - Chest Version", "Barbell Bench Press", "Decline Barbell Bench Press","Incline Barbell Bench Press", "Cable Crossover", "Smith Machine Bench Press", "Front Raise And Pullover", "Incline Dumbbell Flyes"];
var absArray = ["Leg Raises", "Flutter Kicks", "Plank", "Side Planks", "Russian Twists", "Hanging Leg Raises", "Sit Up", "Ab Wheel Rollout"];
var backArray = ["Lat Pulldown", "Seated Row", "Deadlifts", "Single Arm Dumbbell Row", "Bent-over Row"];
var bicepArray = ["Bicep Curl", "Hammer Curl", "Incline Dumbbell Curl", "Straight Barbell Curl", "Chinups"];
var legsArray = ["Leg Press", "Calf Raises", "Squats", "Barbell Squats", "Lunges", "Box Jumps"];
var shoulderArray = ["Shoulder Dumbbell Press", "Side Lateral Raises", "Front Delt Raises" , "Upright Row", "Rear-Delt Fly"];
var tricepArray = ["Dips", "Tricep Overhead Extension", "Tricep Pushdown", "Tricep Extension", "Dumbbell Tricep KickBacks"];

$(document).ready(function(){
    
    initWorkouts();
    updateStatValues();
    checkCurrentTab();
    $("#workout").hide();
    $("#infoBox").hide();
    $("#infoBox2").hide();
    $("#check").hide();
    $("#infoBoxB").hide();
    $("#infoBox2B").hide();
    $("#checkB").hide();
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
        if(classname == "abs"){
            for (var i = 0; i < absArray.length; i++) {
                var option = document.createElement("option");
                option.value = absArray[i];
                option.text = absArray[i];
                $("#workout").append(option);
            }
        }else if(classname == "chest"){
            for (var i = 0; i < chestArray.length; i++) {
                var option = document.createElement("option");
                option.value = chestArray[i];
                option.text = chestArray[i];
                $("#workout").append(option);
            }
        }else if(classname == "bicep"){
            for (var i = 0; i < bicepArray.length; i++) {
                var option = document.createElement("option");
                option.value = bicepArray[i];
                option.text = bicepArray[i];
                $("#workout").append(option);
            }
        }else if(classname == "back"){
            for (var i = 0; i < backArray.length; i++) {
                var option = document.createElement("option");
                option.value = backArray[i];
                option.text = backArray[i];
                $("#workout").append(option);
            }
        }else if(classname == "leg"){
            for (var i = 0; i < legsArray.length; i++) {
                var option = document.createElement("option");
                option.value = legsArray[i];
                option.text = legsArray[i];
                $("#workout").append(option);
            }
        }else if(classname == "shoulders"){
            for (var i = 0; i < shoulderArray.length; i++) {
                var option = document.createElement("option");
                option.value = shoulderArray[i];
                option.text = shoulderArray[i];
                $("#workout").append(option);
            }
        }else if(classname == "triceps"){     
            for (var i = 0; i < tricepArray.length; i++) {
                var option = document.createElement("option");
                option.value = tricepArray[i];
                option.text = tricepArray[i];
                $("#workout").append(option);
            }
        }
        $("#workout").show();
    });
    $("#workout").change(function(){
        $("#check").show();
        if(classname == "abs" || $(this).val().includes("ups") || $(this).val().includes("Dips") ){
            $("#weightVal").hide();
        }else{
            $("#weightVal").show();
        }
    });
    $("#days").change(function(){
        $("#checkB").show();   
    });

});
/*Show the radio buttons and the sets on the calendar page */
function showInfo(bool){
    multiple = bool;
    console.log(multiple);
    if(multiple == true){
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
    console.log(multiple);
    if(multiple == true){
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
/*Initiate each workout type in there respective slides, public workouts not custom*/
function initWorkouts(){
    var chestS = document.getElementById("chstSlides");
    var backS = document.getElementById("bckSlides");
    var bicepS = document.getElementById("bcpSlides");
    var tricepS = document.getElementById("tcpSlides");
    var shoulderS = document.getElementById("shldSlides");
    var legS = document.getElementById("lgsSlides");
    var abS = document.getElementById("abSlides");
   for (var i = 0; i < chestArray.length; i++) {
       var li = document.createElement("li");
       var im = document.createElement("IMG");
       im.setAttribute('src', '../Workouts/Chest/'+chestArray[i]+'.png');
       im.setAttribute('onerror', "this.src='../Workouts/imagenotfound.png'");
       im.setAttribute("class", "slidePic");
       im.setAttribute("onclick", "showWorkout(this)");
       im.setAttribute("alt", chestArray[i])
       var im2 = document.createElement("IMG");
       im2.setAttribute('src', '../images/add.png');
       im2.setAttribute("class", "addPic");
       im2.setAttribute("onclick", "addPic(this)");
       li.appendChild(im);
       li.appendChild(im2);
       var lab = document.createElement("LABEL");
       lab.innerHTML = "<br /> "+chestArray[i];
       li.appendChild(lab);
       chestS.appendChild(li);
   }
    for (var i = 0; i < backArray.length; i++) {
       var li = document.createElement("li");
       var im = document.createElement("IMG");
       im.setAttribute('src', '../Workouts/Back/'+backArray[i]+'.png');
        im.setAttribute('onerror', "this.src='../Workouts/imagenotfound.png'");
       im.setAttribute("class", "slidePic");
        im.setAttribute("onclick", "showWorkout(this)");
       im.setAttribute("alt", backArray[i])
       var im2 = document.createElement("IMG");
       im2.setAttribute('src', '../images/add.png');
       im2.setAttribute("class", "addPic");
       im2.setAttribute("onclick", "addPic(this)");
       li.appendChild(im);
       li.appendChild(im2);
       var lab = document.createElement("LABEL");
       lab.innerHTML = "<br /> "+backArray[i];
       li.appendChild(lab);
       backS.appendChild(li);
   }
     for (var i = 0; i < bicepArray.length; i++) {
       var li = document.createElement("li");
       var im = document.createElement("IMG");
       im.setAttribute('src', '../Workouts/Bicep/'+bicepArray[i]+'.png');
        im.setAttribute('onerror', "this.src='../Workouts/imagenotfound.png'");
       im.setAttribute("class", "slidePic");
        im.setAttribute("onclick", "showWorkout(this)");
       im.setAttribute("alt", bicepArray[i])
       var im2 = document.createElement("IMG");
       im2.setAttribute('src', '../images/add.png');
       im2.setAttribute("class", "addPic");
       im2.setAttribute("onclick", "addPic(this)");
       li.appendChild(im);
       li.appendChild(im2);
       var lab = document.createElement("LABEL");
       lab.innerHTML = "<br /> "+bicepArray[i];
       li.appendChild(lab);
       bicepS.appendChild(li);
   }
    for (var i = 0; i < tricepArray.length; i++) {
       var li = document.createElement("li");
       var im = document.createElement("IMG");
       im.setAttribute('src', '../Workouts/Tricep/'+tricepArray[i]+'.png');
        im.setAttribute('onerror', "this.src='../Workouts/imagenotfound.png'");
       im.setAttribute("class", "slidePic");
       im.setAttribute("onclick", "showWorkout(this)");    
       im.setAttribute("alt", tricepArray[i])
       var im2 = document.createElement("IMG");
       im2.setAttribute('src', '../images/add.png');
       im2.setAttribute("class", "addPic");
       im2.setAttribute("onclick", "addPic(this)");
       li.appendChild(im);
       li.appendChild(im2);
       var lab = document.createElement("LABEL");
       lab.innerHTML = "<br /> "+tricepArray[i];
       li.appendChild(lab);
       tricepS.appendChild(li);
   }
    for (var i = 0; i < shoulderArray.length; i++) {
       var li = document.createElement("li");
       var im = document.createElement("IMG");
       im.setAttribute('src', '../Workouts/Shoulder/'+shoulderArray[i]+'.png');
        im.setAttribute('onerror', "this.src='../Workouts/imagenotfound.png'");
       im.setAttribute("class", "slidePic");
        im.setAttribute("onclick", "showWorkout(this)");
       im.setAttribute("alt", shoulderArray[i])
       var im2 = document.createElement("IMG");
       im2.setAttribute('src', '../images/add.png');
       im2.setAttribute("class", "addPic");
       im2.setAttribute("onclick", "addPic(this)");
       li.appendChild(im);
       li.appendChild(im2);
       var lab = document.createElement("LABEL");
       lab.innerHTML = "<br /> "+shoulderArray[i];
       li.appendChild(lab);
       shoulderS.appendChild(li);
   }
    for (var i = 0; i < legsArray.length; i++) {
       var li = document.createElement("li");
       var im = document.createElement("IMG");
       im.setAttribute('src', '../Workouts/Legs/'+legsArray[i]+'.png');
        im.setAttribute('onerror', "this.src='../Workouts/imagenotfound.png'");
       im.setAttribute("class", "slidePic");
        im.setAttribute("onclick", "showWorkout(this)");
       im.setAttribute("alt", legsArray[i])
       var im2 = document.createElement("IMG");
       im2.setAttribute('src', '../images/add.png');
       im2.setAttribute("class", "addPic");
       im2.setAttribute("onclick", "addPic(this)");
       li.appendChild(im);
       li.appendChild(im2);
       var lab = document.createElement("LABEL");
       lab.innerHTML = "<br /> "+legsArray[i];
       li.appendChild(lab);
       legS.appendChild(li);
   }
    for (var i = 0; i < absArray.length; i++) {
       var li = document.createElement("li");
       var im = document.createElement("IMG");
       im.setAttribute('src', '../Workouts/Abs/'+absArray[i]+'.png');
        im.setAttribute('onerror', "this.src='../Workouts/imagenotfound.png'");
       im.setAttribute("class", "slidePic");
        im.setAttribute("onclick", "showWorkout(this)");
       im.setAttribute("alt", absArray[i])
       var im2 = document.createElement("IMG");
       im2.setAttribute('src', '../images/add.png');
       im2.setAttribute("class", "addPic");
       im2.setAttribute("onclick", "addPic(this)");
       li.appendChild(im);
       li.appendChild(im2);
       var lab = document.createElement("LABEL");
       lab.innerHTML = "<br /> "+absArray[i];
       li.appendChild(lab);
       abS.appendChild(li);
   }
    
}
/*Creates sets, reps, and weight values as a JSON string when on calendar page */
function setValues(){
    var volume =  0;
    var data;
    if(multiple == false){
        var box = document.getElementById("infoBox");
        var sets = box.childNodes[2].value;
        var reps = box.childNodes[5].value;
        var weights = box.childNodes[8].value;
        volume += sets*reps*weights;
        setData = JSON.stringify([{Set: sets, Reps: reps, Weight: weights}]);
    }else{
        var box = document.getElementById("infoBox2");
        var list = box.querySelectorAll(".setInfo");
        console.log(list);
        for(var i =0; i<list.length; i++) {
            if(list[i].innerText !== ""){
                console.log(list[i]);
                var reps = list[i].childNodes[2].value;
                var weights = list[i].childNodes[5].value;
                volume += reps*weights;
                if(list[0].innerText == ""){
                    var dataTemp = [{Set: i, Reps: reps, Weight: weights}];
                }else{
                    var dataTemp = [{Set: i+1, Reps: reps, Weight: weights}];
                }
                if(data == null){
                    data = dataTemp;
                }else{
                    data = data.concat(dataTemp);
                }
            }
        }
        setData = JSON.stringify(data);
    }
    return volume;
}
/*Creates sets, reps, and weight values as a JSON string when on workout page */
function setValuesCal(){
    var volume =  0;
    var data;
    if(multiple == false){
        var box = document.getElementById("infoBoxB");
        var sets = box.childNodes[2].value;
        var reps = box.childNodes[5].value;
        var weights = box.childNodes[8].value;
        volume += sets*reps*weights;
        setData = JSON.stringify([{Set: sets, Reps: reps, Weight: weights}]);
    }else{
        var box = document.getElementById("infoBox2B");
        var list = box.querySelectorAll(".setInfo");
        console.log(list);
        for(var i =0; i<list.length; i++) {
            if(list[i].innerText !== ""){
                console.log(list[i]);
                var reps = list[i].childNodes[2].value;
                var weights = list[i].childNodes[5].value;
                volume += reps*weights;
                if(list[0].innerText == ""){
                    var dataTemp = [{Set: i, Reps: reps, Weight: weights}];
                }else{
                    var dataTemp = [{Set: i+1, Reps: reps, Weight: weights}];
                }
                if(data == null){
                    data = dataTemp;
                }else{
                    data = data.concat(dataTemp);
                }
            }
        }
        setData = JSON.stringify(data);
    }
    return volume;
}
/*Adds workout to calendar, with set data, and specific photo and info, when on calendar page*/
function addtoList() {
    var volume = setValues();
    document.getElementById('id01').style.display="none";
    var e = document.getElementById("workout");
    workout =  e.options[e.selectedIndex].text;
    var li = document.createElement("li");
    var im = document.createElement("IMG");
    im.setAttribute('src', '../images/delete.png');
    im.setAttribute("class", "delete");
    im.setAttribute("onclick", "flagDelete(this)");
    var div = document.createElement("DIV");
    div.setAttribute("class", "setDiv");
    li.setAttribute("class", classname);
    li.setAttribute("data-volume", volume.toString());
    li.setAttribute("data-set", setData);
    li.setAttribute("onclick", "showWorkoutInfo(this)");
    li.appendChild(im);
    li.appendChild(document.createTextNode(workout));
    ul.insertBefore(li, ul.childNodes[2]);
    
    addVolume(volume, true);
    resetForm();
}
/* Opens up modal to add the workout to the calendar from the workout page */
function addPic(pic){
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
    console.log(ul);
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(workout));
    var im = document.createElement("IMG");
    im.setAttribute('src', '../images/delete.png');
    im.setAttribute("class", "delete");
    im.setAttribute("onclick", "flagDelete(this)");
    li.setAttribute("class", classname);
    li.setAttribute("data-volume", volume.toString());
    li.setAttribute("data-set", setData);
    li.setAttribute("onclick", "showWorkoutInfo(this)");
    li.appendChild(im);
    ul.insertBefore(li, ul.childNodes[2]);
    
    addVolume(volume, true);
    resetForm();
}
/* Adds or deletes volume from the volume array, array of volumes for each day. What stats are based upon
    Each day has an index for workout type, checks which day it is and which workout to see which index to add or
    delete from.
*/
function addVolume(volume, add){
    var day = ul.className;
    if(day === "Monday"){
        if(classname == "chest"){
            if(add === true){
                mondayVolume[0] += volume; 
            }else{
                mondayVolume[0] -= volume;
            }
        }else if(classname == "bicep"){
            if(add === true){
                mondayVolume[1] += volume;
            }else{
                mondayVolume[1] -= volume;
            }
        }else if(classname == "back"){
            if(add === true){
                mondayVolume[2] += volume;
            }else{
                mondayVolume[2] -= volume;
            }
        }else if(classname == "leg"){
            if(add === true){
                mondayVolume[3] += volume;
            }else{
                mondayVolume[3] -= volume;
            }
        }else if(classname == "shoulders"){
            if(add === true){
                mondayVolume[4] += volume;
            }else{
                mondayVolume[4] -= volume;
            }
        }else if(classname == "triceps"){
            if(add === true){
                mondayVolume[5] += volume;
            }else{
                mondayVolume[5] -= volume;
            }
        }
    }else if(day === "Tuesday"){
        if(classname == "chest"){
            if(add === true){
                tuesdayVolume[0] += volume; 
            }else{
                tuesdayVolume[0] -= volume;
            }
        }else if(classname == "bicep"){
            if(add === true){
                tuesdayVolume[1] += volume;
            }else{
                tuesdayVolume[1] -= volume;
            }
        }else if(classname == "back"){
            if(add === true){
                tuesdayVolume[2] += volume;
            }else{
                tuesdayVolume[2] -= volume;
            }
        }else if(classname == "leg"){
            if(add === true){
                tuesdayVolume[3] += volume;
            }else{
                tuesdayVolume[3] -= volume;
            }
        }else if(classname == "shoulders"){
            if(add === true){
                tuesdayVolume[4] += volume;
            }else{
                tuesdayVolume[4] -= volume;
            }
        }else if(classname == "triceps"){
            if(add === true){
                tuesdayVolume[5] += volume;
            }else{
                tuesdayVolume[5] -= volume;
            }
        }
    }else if(day === "Wednesday"){
       if(classname == "chest"){
            if(add === true){
                wednesdayVolume[0] += volume; 
            }else{
                wednesdayVolume[0] -= volume;
            }
        }else if(classname == "bicep"){
            if(add === true){
                wednesdayVolume[1] += volume;
            }else{
                wednesdayVolume[1] -= volume;
            }
        }else if(classname == "back"){
            if(add === true){
                wednesdayVolume[2] += volume;
            }else{
                wednesdayVolume[2] -= volume;
            }
        }else if(classname == "leg"){
            if(add === true){
                wednesdayVolume[3] += volume;
            }else{
                wednesdayVolume[3] -= volume;
            }
        }else if(classname == "shoulders"){
            if(add === true){
                wednesdayVolume[4] += volume;
            }else{
                wednesdayVolume[4] -= volume;
            }
        }else if(classname == "triceps"){
            if(add === true){
                wednesdayVolume[5] += volume;
            }else{
                wednesdayVolume[5] -= volume;
            }
        }
    }else if(day === "Thursday"){
        if(classname == "chest"){
            if(add === true){
                thursdayVolume[0] += volume; 
            }else{
                thursdayVolume[0] -= volume;
            }
        }else if(classname == "bicep"){
            if(add === true){
                thursdayVolume[1] += volume;
            }else{
                thursdayVolume[1] -= volume;
            }
        }else if(classname == "back"){
            if(add === true){
                thursdayVolume[2] += volume;
            }else{
                thursdayVolume[2] -= volume;
            }
        }else if(classname == "leg"){
            if(add === true){
                thursdayVolume[3] += volume;
            }else{
                thursdayVolume[3] -= volume;
            }
        }else if(classname == "shoulders"){
            if(add === true){
                thursdayVolume[4] += volume;
            }else{
                thursdayVolume[4] -= volume;
            }
        }else if(classname == "triceps"){
            if(add === true){
                thursdayVolume[5] += volume;
            }else{
                thursdayVolume[5] -= volume;
            }
        }
    }else if(day === "Friday"){
         if(classname == "chest"){
            if(add === true){
                fridayVolume[0] += volume; 
            }else{
                fridayVolume[0] -= volume;
            }
        }else if(classname == "bicep"){
            if(add === true){
                fridayVolume[1] += volume;
            }else{
                fridayVolume[1] -= volume;
            }
        }else if(classname == "back"){
            if(add === true){
                fridayVolume[2] += volume;
            }else{
                fridayVolume[2] -= volume;
            }
        }else if(classname == "leg"){
            if(add === true){
                fridayVolume[3] += volume;
            }else{
                fridayVolume[3] -= volume;
            }
        }else if(classname == "shoulders"){
            if(add === true){
                fridayVolume[4] += volume;
            }else{
                fridayVolume[4] -= volume;
            }
        }else if(classname == "triceps"){
            if(add === true){
                fridayVolume[5] += volume;
            }else{
                fridayVolume[5] -= volume;
            }
        }
    }else if(day === "Saturday"){
        if(classname == "chest"){
            if(add === true){
                saturdayVolume[0] += volume; 
            }else{
                saturdayVolume[0] -= volume;
            }
        }else if(classname == "bicep"){
            if(add === true){
                saturdayVolume[1] += volume;
            }else{
                saturdayVolume[1] -= volume;
            }
        }else if(classname == "back"){
            if(add === true){
                saturdayVolume[2] += volume;
            }else{
                saturdayVolume[2] -= volume;
            }
        }else if(classname == "leg"){
            if(add === true){
                saturdayVolume[3] += volume;
            }else{
                saturdayVolume[3] -= volume;
            }
        }else if(classname == "shoulders"){
            if(add === true){
                saturdayVolume[4] += volume;
            }else{
                saturdayVolume[4] -= volume;
            }
        }else if(classname == "triceps"){
            if(add === true){
                saturdayVolume[5] += volume;
            }else{
                saturdayVolume[5] -= volume;
            }
        }
    }else if(day === "Sunday"){
        if(classname == "chest"){
            if(add === true){
                sundayVolume[0] += volume; 
            }else{
                sundayVolume[0] -= volume;
            }
        }else if(classname == "bicep"){
            if(add === true){
                sundayVolume[1] += volume;
            }else{
                sundayVolume[1] -= volume;
            }
        }else if(classname == "back"){
            if(add === true){
                sundayVolume[2] += volume;
            }else{
                sundayVolume[2] -= volume;
            }
        }else if(classname == "leg"){
            if(add === true){
                sundayVolume[3] += volume;
            }else{
                sundayVolume[3] -= volume;
            }
        }else if(classname == "shoulders"){
            if(add === true){
                sundayVolume[4] += volume;
            }else{
                sundayVolume[4] -= volume;
            }
        }else if(classname == "triceps"){
            if(add === true){
                sundayVolume[5] += volume;
            }else{
                sundayVolume[5] -= volume;
            }
        }
    }
    drawBarChart(); //updates volume chart
}
/* Show the sets, rep and weights of workout on the calendar */
function showWorkoutInfo(workout){
    console.log(workout);
    if(workout.childNodes.length > 2){
        workout.childNodes[2].remove();
        workout.style.marginBottom = "1px";
    }else{
    var info = JSON.parse(workout.getAttribute("data-set"));
    console.log(info[0]);
    var div = document.createElement("DIV");
    div.setAttribute("class", "setDiv");
    for(var i = 0; i<info.length; i++){
        var label1 = document.createElement("lab"); 
        var label2 = document.createElement("lab"); 
        var label3 = document.createElement("lab"); 
        label1.innerHTML = "Set:" + info[i].Set+" ";
        label2.innerHTML = "Reps:"+info[i].Reps+ " ";
        label3.innerHTML = "Weight:"+info[i].Weight+"<br><br>";
        div.appendChild(label1);
        div.appendChild(label2);
        div.appendChild(label3);
    }
        workout.appendChild(div);
    }
    
}
/*Show info on the workout, including youtube videos for tutorial. Multiple youtube videos are 
  returned to ensure there is at least one correct tutorial video;
*/
function showWorkout(r){
    var title = r.alt;
    var workout = r;
    var workoutSlide = r.parentNode.parentNode.parentNode.parentNode;
    var slide = workoutSlide.childNodes[3];
    slide.childNodes[3].childNodes[1].innerText = title;
    slide.style.display = "block";
    workoutSlide.style.marginBottom = "650px";
    var vidDiv = slide.childNodes[5];
    if(vidDiv.childNodes.length > 1)
    {
        for(var i = 1; i<vidDiv.childNodes.length; i++){
            vidDiv.childNodes[i].remove();
        }
    }
    console.log(vidDiv.childNodes.length);
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
              frame.src = "//www.youtube.com/embed/"+item.id.videoId;
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
    $('#workout').prop('selectedIndex', 0);
    $('#days').prop('selectedIndex', 0);
    $('#workout').hide();
    $('#check').hide();
    $('#checkB').hide();
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
    setNum = 0;
}
/* Makes sure last tab is not lost after refresh */
function checkCurrentTab(){
    var lastTab = sessionStorage.getItem('lastTab');
    $('#'+lastTab).addClass("active");
    $('#'+lastTab).siblings().removeClass("active");
    if(lastTab == "calendarTab"){
        document.getElementById('calendar').style.display = "block";
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "absolute";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "none";
        document.getElementById('settings').style.display = "none";
    }else if(lastTab == "statTab"){
        document.getElementById('stats').style.visibility = "visible";
        document.getElementById('stats').style.position = "relative";
        document.getElementById('stats').style.top = "0px";
        document.getElementById('stats').style.left = "0px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "none";
        document.getElementById('settings').style.display = "none";
    }else if(lastTab == "workTab"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "block";
        document.getElementById('routines').style.display = "none";
        document.getElementById('settings').style.display = "none";
        
    }else if(lastTab == "routineTab"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "block";
        document.getElementById('settings').style.display = "none";
        
    }
    else if(lastTab == "settingsTab"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "absolute";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "none";
        document.getElementById('settings').style.display = "block";
    }

}
/* Switches the page when clicked on side navigation bar */
function switchDiv(i) {
    if(i.toElement.innerText === "Calendar"){
        document.getElementById('calendar').style.display = "block";
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "absolute";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "none";
        document.getElementById('settings').style.display = "none";
        
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
        document.getElementById('settings').style.display = "none";
    }else if(i.toElement.innerText === "Workouts"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "block";
        document.getElementById('routines').style.display = "none";
        document.getElementById('settings').style.display = "none";
    }else if(i.toElement.innerText === "Routines"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "block";
        document.getElementById('settings').style.display = "none";
    }
    else if(i.toElement.innerText === "Settings"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "absolute";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('routines').style.display = "none";
        document.getElementById('settings').style.display = "block";
    }
    
}
/*Update values for the weekly distribution pie chart */
function updateStatValues() {
    bicepNumber = $('.bicep').length;
    tricepNumber = $('.tricep').length;
    chestNumber = $('.chest').length;
    backNumber = $('.back').length;
    absNumber = $('.abs').length;
    legsNumber = $('.leg').length;
    shoulderNumber = $('.shoulder').length;
}
/* Removes workout from calendar and deletes volume */
function deleteWorkout(){
    var volume = parseInt(li.getAttribute("data-volume"));
    classname = li.className;
    ul.removeChild(li);
    addVolume(volume, false);
    
}
/* Sets which day that was picked to add workout to */
function flag(r){
    document.getElementById('id01').style.display="block";
    ul = r.parentNode;
    console.log(ul);
}
/*Flags the workout that will be deleted*/
function flagDelete(r){
    li = r.parentNode;
    ul = r.parentNode.parentNode;
    console.log(ul);
    deleteWorkout();
}
$(function(){
    $("a").bind("click", switchDiv);
});

//chart
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawBarChart);

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
    var data = google.visualization.arrayToDataTable([
        ["Day", "Chest", "Bicep", "Back","Legs","Shoulders", "Triceps"],
        ["Monday", mondayVolume[0],mondayVolume[1],mondayVolume[2],mondayVolume[3],mondayVolume[4],mondayVolume[5]],
        ["Tuesday", tuesdayVolume[0],tuesdayVolume[1],tuesdayVolume[2],tuesdayVolume[3],tuesdayVolume[4],tuesdayVolume[5]],
        ["Wednesday", wednesdayVolume[0],wednesdayVolume[1],wednesdayVolume[2],wednesdayVolume[3],wednesdayVolume[4],wednesdayVolume[5]],
        ["Thursday", thursdayVolume[0],thursdayVolume[1],thursdayVolume[2],thursdayVolume[3],thursdayVolume[4],thursdayVolume[5]],
        ["Friday", fridayVolume[0],fridayVolume[1],fridayVolume[2],fridayVolume[3],fridayVolume[4],fridayVolume[5]],
        ["Saturday", saturdayVolume[0],saturdayVolume[1],saturdayVolume[2],saturdayVolume[3],saturdayVolume[4],saturdayVolume[5]],
        ["Sunday", sundayVolume[0],sundayVolume[1],sundayVolume[2],sundayVolume[3],sundayVolume[4],sundayVolume[5]]
      ]);
      var options = {
        title: "Daily Workout Volume by Pound",
        width: 900,
        height: 600,
        backgroundColor: 'transparent',
        legendTextStyle: { color: '#FFF'},
        titleTextStyle: { color: '#FFF',fontName: 'Arial Black',  fontSize: '30' },
        chartArea: {fontFamily: 'Arial Black'},
        legend: { position: "top" },
        isStacked: true,
        hAxis: { textStyle: {color: "#FFFFFF"}},
        vAxis: { textStyle: {color: "#FFFFFF"}},
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