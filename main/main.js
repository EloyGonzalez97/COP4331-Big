var ul;
var li;
var classname;
var data = [4, 8, 15, 16, 23, 42];
var bicepNumber;
var tricepNumber;
var chestNumber;
var backNumber;
var absNumber;
var legsNumber;
var shoulderNumber;
var chestArray = ["Dumbbell Bench Press","Decline Dumbbell Bench Press", " Incline Dumbbell Bench Press", "Pushups", "Dumbbell Flyes", "Incline Dumbbell Press", "Low Cable Crossover", "Decline Dumbbell Flyes", "Dips - Chest Version", "Barbell Bench Press", "Decline Barbell Bench Press","Incline Barbell Bench Press", "Cable Crossover", "Smith Machine Bench Press", "Front Raise And Pullover", "Incline Dumbbell Flyes - With A Twist"];
var absArray = ["Leg Raises", "Flutter Kicks", "Plank", "Side Planks", "Russian Twists", "Hanging Leg Raises", "Weighted Sit Up", "Ab Wheel Rollout"];
var backArray = ["Lat Pulldown", "Rows", "Deadlifts"];
var bicepArray = ["Bicep Curl", "Hammer Curl", "Decline Curl", "Straight Barbell Curl", "Chin Ups"];
var legsArray = ["Leg Press", "Calf Raises", "Squats", "Lunges", "Box Jumps"];
var shoulderArray = ["Shoulder Press", "Side Raises", "Front Raises"];

function initSelects(){
    /*var myDiv = document.getElementById("container");

    //Create array of options to be added
    var array = ["Abs","Back","Biceps","Chest", "Legs", "Shoulders", "Triceps"];

    //Create and append select list
    var selectList = document.createElement("select");
    selectList.id = "workoutTypes";
    selectList.class = "workoutType";
    myDiv.appendChild(selectList);

    //Create and append the options
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement("option");
        option.value = array[i];
        option.text = array[i];
        selectList.appendChild(option); }*/
}
function addtoList() {
    document.getElementById('id01').style.display="none";
    var e = document.getElementById("workout");
    var workout =  e.options[e.selectedIndex].text;
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(workout));
    var im = document.createElement("IMG");
    im.setAttribute('src', '../images/delete.png');
    im.setAttribute("class", "delete");
    im.setAttribute("onclick", "flagDelete(this)");
    li.setAttribute("class", classname);
    li.appendChild(im);
    ul.insertBefore(li, ul.childNodes[2]);
}
$(document).ready(function(){
    
    initSelects();
    updateStatValues();
    checkCurrentTab();
    $("#workout").hide();
    $("a").on("click", function(e){
        e.preventDefault();
        localStorage.setItem('lastTab', $(e.target).attr('id'));
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        
    });
    $("#workoutTypes").change(function(){
        classname = $(this).val();
        $("#workout").empty();
        if(classname == "abs"){
            var startOption = document.createElement("option");
                startOption.value = "";
                startOption.selected = true;
                startOption.disabled = true;
                startOption.text = "Choose Workout:";
                $("#workout").append(startOption);
            for (var i = 0; i < absArray.length; i++) {
                var option = document.createElement("option");
                option.value = absArray[i];
                option.text = absArray[i];
                $("#workout").append(option);
            }
        }else if(classname == "chest"){
            var startOption = document.createElement("option");
                startOption.value = "";
                startOption.selected = true;
                startOption.disabled = true;
                startOption.text = "Choose Workout:";
                $("#workout").append(startOption);
            for (var i = 0; i < chestArray.length; i++) {
                var option = document.createElement("option");
                option.value = chestArray[i];
                option.text = chestArray[i];
                $("#workout").append(option);
            }
        }else if(classname == "bicep"){
            var startOption = document.createElement("option");
                startOption.value = "";
                startOption.selected = true;
                startOption.disabled = true;
                startOption.text = "Choose Workout:";
                $("#workout").append(startOption);
            for (var i = 0; i < bicepArray.length; i++) {
                var option = document.createElement("option");
                option.value = bicepArray[i];
                option.text = bicepArray[i];
                $("#workout").append(option);
            }
        }else if(classname == "back"){
                var startOption = document.createElement("option");
                startOption.value = "";
                startOption.selected = true;
                startOption.disabled = true;
                startOption.text = "Choose Workout:";
                $("#workout").append(startOption);
            for (var i = 0; i < backArray.length; i++) {
                var option = document.createElement("option");
                option.value = backArray[i];
                option.text = backArray[i];
                $("#workout").append(option);
            }
        }else if(classname == "legs"){
            var startOption = document.createElement("option");
                startOption.value = "";
                startOption.selected = true;
                startOption.disabled = true;
                startOption.text = "Choose Workout:";
                $("#workout").append(startOption);
            for (var i = 0; i < legsArray.length; i++) {
                var option = document.createElement("option");
                option.value = legsArray[i];
                option.text = legsArray[i];
                $("#workout").append(option);
            }
        }else if(classname == "shoulders"){
            var startOption = document.createElement("option");
                startOption.value = "";
                startOption.selected = true;
                startOption.disabled = true;
                startOption.text = "Choose Workout:";
                $("#workout").append(startOption);
            for (var i = 0; i < shoulderArray.length; i++) {
                var option = document.createElement("option");
                option.value = shoulderArray[i];
                option.text = shoulderArray[i];
                $("#workout").append(option);
            }
        }
        $("#workout").show();
    });

});
function checkCurrentTab(){
    var lastTab = localStorage.getItem('lastTab');
    $('#'+lastTab).addClass("active");
    $('#'+lastTab).siblings().removeClass("active");
    if(lastTab == "calendarTab"){
        document.getElementById('calendar').style.display = "block";
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "absolute";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('settings').style.display = "none";
    }else if(lastTab == "statTab"){
        document.getElementById('stats').style.visibility = "visible";
        document.getElementById('stats').style.position = "relative";
        document.getElementById('stats').style.top = "0px";
        document.getElementById('stats').style.left = "0px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('settings').style.display = "none";
    }else if(lastTab == "workTab"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "block";
        document.getElementById('settings').style.display = "none";
        
    }else if(lastTab == "settingsTab"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "absolute";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('settings').style.display = "block";
    }

}
function switchDiv(i) {
    if(i.toElement.innerText === "Calendar"){
        document.getElementById('calendar').style.display = "block";
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "absolute";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('workouts').style.display = "none";
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
        document.getElementById('settings').style.display = "none";
    }else if(i.toElement.innerText === "Workouts"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "block";
        document.getElementById('settings').style.display = "none";
    }else if(i.toElement.innerText === "Settings"){
        document.getElementById('stats').style.visibility = "hidden";
        document.getElementById('stats').style.position = "absolute";
        document.getElementById('stats').style.top = "-910px";
        document.getElementById('stats').style.left = "-910px";
        document.getElementById('calendar').style.display = "none";
        document.getElementById('workouts').style.display = "none";
        document.getElementById('settings').style.display = "block";
    }
    
}
function updateStatValues() {
    bicepNumber = $('.bicep').length;
    tricepNumber = $('.tricep').length;
    chestNumber = $('.chest').length;
    backNumber = $('.back').length;
    absNumber = $('.abs').length;
    legsNumber = $('.leg').length;
    shoulderNumber = $('.shoulder').length;
}
function deleteWorkout(){
    ul.removeChild(li);
}
function flag(r){
    document.getElementById('id01').style.display="block";
    ul = r.parentNode;
    console.log(ul);
}
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
                 colors: ['#F22613', '#00E640', '#ec8f6e', '#ffe100', '#ad3bcd', '#F89406', '#18dcff']
                };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}