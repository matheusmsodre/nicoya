var timerElements = document.getElementsByClassName('offer__timer');

Array.from(timerElements).forEach(function(timerElement) {
    var initialTime = timerElement.innerText.split(':');
    var minutes = parseInt(initialTime[0], 10);
    var seconds = parseInt(initialTime[1], 10);

    var countdown = setInterval(function() {
        if (minutes === 0 && seconds === 0) {
            clearInterval(countdown);
        } else {
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
            }
            var formattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            timerElement.innerText = formattedTime;
        }
    }, 1000);
});