$(window).load(function(){
    if (navigator.appVersion.indexOf("Chrome/") != -1) {
    document.getElementById("custom-input").style.marginLeft = "30px";	
    }
    PopUpShow();   
    
});
function HideMainPart(){
$("#m-count").hide();
}
function PopUpShow(){
    $("#m-popup").show();
}
function PopUpHide_Main(){
    $("#m-popup").hide();
    }         
function inputFocus(i){
    if(i.value==i.defaultValue){ i.value=""; i.style.color="#000"; }
}
function inputBlur(i){
    if(i.value==""){ i.value=i.defaultValue; i.style.color="#888"; }
}
function Validate(){
	var flag = 1;
	var d = new Date();
	var n = d.getHours();
	var start = document.getElementById('clc-1').value;
	var finish = document.getElementById('clc-2').value;
	var wh = finish - start ;
	var weekday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday",
                "Friday","Saturday");
   	var workdays = getWeekdaysInMonth(d.getMonth(), d.getYear()); 
   	
	if (n >= start && n < finish) {
		if (wh<0) {
		flag = 0; 
		alert("Check working hours!");
		}
	}
	else
	{
		flag = 0; 
		alert("Works only when you are at work!");
	}	
	if (weekday[d.getDay()] != "Sunday" && weekday[d.getDay()] != "Saturday"){
		var vs=document.getElementById("custom-input").value;
    		if (vs == "Digits only..")
    		{
    			flag = 0; 
       			alert("Fill month salary!");
   			}
   			else
   			{
   				if (isNumber(vs)){
   				
   				if(!isInt(vs)) {
   				 	var s = vs + '';
					s =s.replace('.', '');
					s = parseInt(s);
					
    if (confirm("Your month salary: "+s+"?") == true) {
        vs = s;
    } else {
    flag = 0;
        alert("Salary format should be: 2000, 3400, 5567...");

    }
					   				}
   				}
   				else
   				{
   				flag = 0;
   				alert("Salary format should be: 2000, 3400, 5567...");
   				}
   			}	
	} 
	else
	{
		flag = 0;
		alert("Weekend is now. Come here on Monday!");
	}	
	if (flag == 1){
    $("#m-popup").hide();
    	var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    h = h-document.getElementById('clc-1').value;
    var sabsval = h*60*60 + m*60 +s;

    loadstatscounters(workdays, wh, sabsval);
    }  
    }

function loadstatscounters(workdays, wrk, sabsval){
	document.getElementById("m-count").style.visibility = "visible";
	document.body.style.backgroundColor = "#c5c5c5";
	
	$("#m-count").show();
	$(".gr-lab-c").letterfx({"fx":"fall","words":true,"timing":200});
	SpentTimeAtWork();
	TodayEarned(workdays, wrk);
	EarnedByNothing(workdays, wrk, sabsval);
	LeftTimeAtWork();
	TodayWillEarn(workdays, wrk);
	
}
//StatCounters
function SpentTimeAtWork() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    h = h-document.getElementById('clc-1').value;
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt-1').innerHTML = h+":"+m+":"+s;
    var t = setTimeout(function(){SpentTimeAtWork() },500);
}
function TodayEarned(workdays, wrk) {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    h = h-document.getElementById('clc-1').value;
    var absval = h*60*60 + m*60 +s;
    m = checkTime(m);
    s = checkTime(s);  
    var abswrkd = ((workdays*wrk)*60)*60;
    var perabs = document.getElementById("custom-input").value;
    var s_d = perabs / workdays;
     s_d = s_d.toFixed(5);
    var s_h = s_d / wrk;
    s_h = s_h.toFixed(5);   
    var s_m = s_h / 60;  
    s_m = s_m.toFixed(5);  
    var s_s = s_m / 60;  
    s_s = s_s.toFixed(5); 
    var ern = absval*s_s;
    document.getElementById('txt-2').innerHTML = ern.toFixed(2);
    var t = setTimeout(function(){TodayEarned(workdays, wrk) },500);
}
//MAIN COUNTER
function EarnedByNothing(workdays, wrk, sabsval) {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    h = h-document.getElementById('clc-1').value;
    var absval = h*60*60 + m*60 +s+1;
    m = checkTime(m);
    s = checkTime(s);   
    var abswrkd = ((workdays*wrk)*60)*60;   
    var perabs = document.getElementById("custom-input").value;
    var s_d = perabs / workdays;
     s_d = s_d.toFixed(5);
    var s_h = s_d / wrk;
    s_h = s_h.toFixed(5);  
    var s_m = s_h / 60;  
    s_m = s_m.toFixed(5); 
    var s_s = s_m / 60;  
    s_s = s_s.toFixed(5);
    var ern = (absval-sabsval)*s_s;    
    document.getElementById('txt-3').innerHTML = ern.toFixed(5);    
    var t = setTimeout(function(){EarnedByNothing(workdays, wrk, sabsval) },500);
}

function LeftTimeAtWork() {
  var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    h = h-document.getElementById('clc-2').value+1;
    h=h*(-1);
    m = 60-m;
    s=60 -s;
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt-4').innerHTML = h+":"+m+":"+s;
    var t = setTimeout(function(){LeftTimeAtWork() },500);
}

function TodayWillEarn(workdays, wrk) {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    h = h-document.getElementById('clc-2').value;
    h=h*(-1);
    m = 60-m;
    s=60 -s;
    var absval = h*60*60 + m*60 +s;
    m = checkTime(m);
    s = checkTime(s);   
    var abswrkd = ((workdays*wrk)*60)*60;   
    var perabs = document.getElementById("custom-input").value;
    var s_d = perabs / workdays;
    s_d = s_d.toFixed(5);
    var s_h = s_d / wrk;
    s_h = s_h.toFixed(5);  
    var s_m = s_h / 60;  
    s_m = s_m.toFixed(5); 
    var s_s = s_m / 60;  
    s_s = s_s.toFixed(5);
    var ern = absval*s_s;
    document.getElementById('txt-5').innerHTML = ern.toFixed(2);
    var t = setTimeout(function(){TodayWillEarn(workdays, wrk)  },500);
}

//Helpers
function getWeekdaysInMonth(month, year) {
var days = daysInMonth(month, year);
var weekdays = 0;
for(var i=0; i< days; i++) {
    if (isWeekday(year, month, i+1)) weekdays++;
}
return weekdays;
}
function isWeekday(year, month, day) {
var day = new Date(year, month, day).getDay();
return day !=0 && day !=6;
}
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function isInt(n){
         return n % 1 === 0;
}
function checkTime(i) {
    if (i<10) {i = "0" + i};
    return i;
}