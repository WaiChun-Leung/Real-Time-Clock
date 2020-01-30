'use stric';
$(document).ready(function() {
	var displayClock = $("#displayClock p");
	var hideShowSecs = true;
	var formInt = 12;
	var setTheTime = false;
	var hour = 0;
	var minute = 0;
	var second = 0;
	var ampm = "";
	var specifiedSetTime;
	var manualSetTime;
	
	function updateTime(displaySeconds, timeConvert) {
		var radiosBtn = $("#twenty4, #twelve");
		for (var i = 0, length = radiosBtn.length; i < length; i++)
		{
		 if (radiosBtn[i].checked)
		 {
		  
		  if (radiosBtn[i].value == "24Hours") {
			formInt = 24;
		  }
		  else {
			formInt = 12;
		  }
		}
	}
	
		var radiosBtn = $("#hideSecs, #showSecs");
		for (var i = 0, length = radiosBtn.length; i < length; i++)
		{
			if (radiosBtn[i].checked)
			{
		  
			if (radiosBtn[i].value == "HideSeconds") {
				displaySeconds = false;
			}
			else {
				displaySeconds = true;
			}
		}
	}
	
		if (setTheTime === false) {
			var date = new Date();
			var conversion = "";
			var hr = date.getHours();
			if (timeConvert === 12) {
				if (hr > 12) {
					hr = hr % 12;
					conversion = "PM";
				} else {
					conversion = "AM";
				}
			} else {
				if (hr > 12) {
					conversion = "PM";
				} else {
					conversion = "AM";
				}
			}
			
			var mins = date.getMinutes();
			var secs = date.getSeconds();

			//Is to set "minsToUse" and "secsToUse" as the String value of mins and secs because both are a number value
			var minsToUse = "" + mins;
			var secsToUse = "" + secs;

			/*
			If the minsToUse and secsToUse the String is only 1 character long,
			like the number is 0,1,2,3,4,5,6,7,8,9, so it will show like 5:3:20 pm,
			but it didn't look good, so add the "0" before in each Sting if it is only have 1 character,
			after added, it will show like 5:03:20 pm
			*/
			if (minsToUse.length == 1) {
				minsToUse = "0" + minsToUse;
			}
			if (secsToUse.length == 1) {
				secsToUse = "0" + secsToUse;
			}

			/*
			It will check if it's 24 hour format or not,
			check is it "PM" format or not, if it's PM, then will change to PM and to 24 hour format
			*/
			if (formInt == 24) {
				if (conversion == "PM") {
					hr = hr + 12;
				}
				//it's 24 hour format, so if it is 24 hours, the time won't show PM and AM
				conversion = "";
			}

			var displayTime;
			if (displaySeconds === true) {
				displayTime = hr + " : " + minsToUse + " : " + secsToUse + " " + conversion;
            } else {
                displayTime = hr + " : " + minsToUse + " " + conversion;
            }
			
			displayClock.empty();
			displayClock.text(displayTime);
		} else {


		//The currentDate is to show the current date
		//milliSecsDiff is to count the currentDate and manualSetTime the millisecond different
		var currentDate = new Date();
		var milliSecsDiff = currentDate.getTime() - manualSetTime.getTime();

		//specifiedSetTime is the user enter the value of the time, then plus the milliSecsDiff value, and update the value to the newDate
		var newDate = new Date(specifiedSetTime.getTime() + milliSecsDiff);
		
		//getHours, etc is to get the value from the newDate, and set the value to hr, mins and secs
		var hr = newDate.getHours();
		var mins = newDate.getMinutes();
		var secs = newDate.getSeconds();
		var conversion = "AM";

		if (hr > 12) {
			hr = hr - 12;
			conversion = "PM";
		}

		var minsToUse = "" + mins;
		var secsToUse = "" + secs;

		if (minsToUse.length == 1) {
			minsToUse = "0" + minsToUse;
		}
		if (secsToUse.length == 1) {
			secsToUse = "0" + secsToUse;
		}

		if (formInt == 24) {
			if (conversion == "PM") {
				hr = hr + 12;
			}
			conversion = "";
		}

			var displayTime;
			if (displaySeconds === true) {
				displayTime = hr + " : " + minsToUse + " : " + secsToUse + " " + conversion;
			} else {
				displayTime = hr + " : " + minsToUse + " " + conversion;
			}


			displayClock.empty();
			displayClock.text(displayTime);
		}
	}
	
		/*
		Changed the milliseconds value to 100ms, is less than 1 second = 1000ms,
		So when every time clicking the radio of hide, show, 24 hours, 12 hours and "set the time" button,
		it will execute the code faster.
		*/
		var repeatFunction = setInterval(updateTime, 100, hideShowSecs, formInt);
		
		$("#hideSecs, #showSecs").on("change", function() {
			var repeatFunction = setInterval(updateTime, 100, hideShowSecs, formInt);
			if (this.value === "HideSeconds") {
				clearInterval(repeatFunction);
				hideShowSecs = false;
			} else {
				clearInterval(repeatFunction);
				hideShowSecs = true;
			}
		});
		
		$("#twenty4, #twelve").on("change", function() {
			var repeatFunction = setInterval(updateTime, 100, hideShowSecs, formInt);
			if (this.value === "24Hours") {
				clearInterval(repeatFunction);
				formInt = 24;
			} else {
				clearInterval(repeatFunction);
				formInt = 12;
			}
		});
		
		
	//When you click to the text of the time, it will show the input field and hide the time
	//So when the input field is show, you can enter the value
	$("#clock").click(function() {	
		$("#showHideInput").show();
		$("#clock").hide();
		
		//This will empty the input field every time when you click setTheTime button
		$("input:text").val(null);

	});	
		
	//This is when you click #setTheTime button again, it will show you enter the time and hide the input field
	$("#setTheTime").click(function(event){
	
	//This is check is the input field is it hidden, if true, don't do anythings, else will stop the user click the #setTheTime button
	if ($("#clock").is(":hidden"))	{
	}	
	else 
	{
		alert("To set the time click on the clock and enter the hours, minutes, seconds, and am/pm");
	}
		
		//This is when you click #setTheTime button again, it will show you enter the time and hide the input field
		$("#setTheTime").click(function(event){

		//This is check is the input field is it hidden, if true, don't do anythings
		if ($("#clock").is(":hidden")) {

			$("#showHideInput").hide();
			$("#clock").show();
				
			var temp = $("#enterHours").val();
			hour = parseInt(temp);
			temp = $("#enterMinutes").val();
			minute = parseInt(temp);
			temp = $("#enterSeconds").val();
			second = parseInt(temp);
			if (hour < 12) {
				ampm = $("#enterAmPm").val();
				} else {
				ampm = "PM";
				}


			/*
			Is to make sure the ampm variable is NOT null
			then change all to upper case, even the user input lower case or upper case
			It will still show the AM and PM to upper case, to make it all look same
			*/
			if (ampm) {
				ampm = ampm.toUpperCase();
			}

			//Always change to 24 hour clock for this hour variable, this variable will use for later below the "specifiedSetTime"
			if (hour < 12) {
				if (ampm === "PM") {
					hour = hour + 12;
				}
			}
				
			//Set "manualSetTime" to the current date/time (right now the date/time when the user press "setTheTime" button the time
			manualSetTime = new Date();
			
			/*
			Set "specifiedSetTime" to be the user they set by themselves the value
			Like if user input 5:35:30 pm, this will be the value of "specifiedSetTime"
			
			It will store the time properly with 24 hour for the hours
			And important to save these two different times, when they press the button and what time the user set to
			*/
			specifiedSetTime = new Date();
			specifiedSetTime.setHours(hour);
			specifiedSetTime.setMinutes(minute);
			specifiedSetTime.setSeconds(second);



			setTheTime = true;
			clearInterval(repeatFunction);
			repeatFunction = setInterval(updateTime, 100, hideShowSecs, formInt);
			
		} 
		
			// else will stop the user click the #setTheTime button
			else
			{
				event.preventDefault();
			}

		});
	});
	
});