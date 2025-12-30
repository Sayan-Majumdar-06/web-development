const form = document.querySelector(".set-timer-form");
let endDate_value = 0, endTime_value = 0, endTime = 0, startTime = 0;

let day_timer = document.querySelector("#countdown-days");
let hours_timer = document.querySelector("#countdown-hours");
let minutes_timer = document.querySelector("#countdown-minutes");
let seconds_timer = document.querySelector("#countdown-seconds");

let progress_bar = document.querySelector("#progress-bar");

let x;
function handleSubmit(event) {
	event.preventDefault();
	const form = event.target;
    const formData = new FormData(form);

    endDate_value = formData.get("endDate");
    endTime_value = formData.get("endTime");

    if(!endDate_value || !endTime_value) {
        alert("Please select a ending date and time !");
    }

    endTime = new Date(endDate_value + "T" + endTime_value).getTime();
    startTime = new Date().getTime();

    if(endTime <= startTime) {
        alert("Can't set a timer for an earlier date and time !");
    }

    x = setInterval(updateTimer, 1000);

    function updateTimer() {
        const now = new Date().getTime();

        let elapsedTime = now - startTime;
        let pendingTime = endTime - now;
        let totalTime = endTime - startTime;

        if(pendingTime <= 10000) { 
            day_timer.style.color = "red";
            hours_timer.style.color = "red";
            minutes_timer.style.color = "red";  
            seconds_timer.style.color = "red";
        }

        let days = Math.floor(pendingTime / (1000*60*60*24));
        let hours = Math.floor((pendingTime % (1000*60*60*24)) / (1000*60*60));
        let minutes = Math.floor(((pendingTime % (1000*60*60*24)) % (1000*60*60)) / (1000*60));
        let seconds = Math.floor((((pendingTime % (1000*60*60*24)) % (1000*60*60)) % (1000*60)) / (1000));

        day_timer.innerHTML = days;
        hours_timer.innerHTML = hours;
        minutes_timer.innerHTML = minutes;  
        seconds_timer.innerHTML = seconds;

        let progress = (elapsedTime / totalTime)*100;
        progress_bar.style.width = progress + "%";

        if(pendingTime <= 0) { 
            clearInterval(x);
            day_timer.style.color = "whitesmoke";
            hours_timer.style.color = "whitesmoke";
            minutes_timer.style.color = "whitesmoke";  
            seconds_timer.style.color = "whitesmoke";
            day_timer.innerHTML = "0";
            hours_timer.innerHTML = "0";
            minutes_timer.innerHTML = "0";  
            seconds_timer.innerHTML = "0";
            progress_bar.style.width = "0%";
        }
    }
}

form.addEventListener("submit", handleSubmit);




