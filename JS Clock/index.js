
const animate = (time, steps) => {
    return `rotateZ(${(360 * time) / steps}deg)`;
};

const toggleBackground = (imgPath) => {
    // clock background will toggle between a night image and a day image
    const clockBackground = document.documentElement.style.getPropertyValue('--clock-background-image');
    console.log('clockBackground', clockBackground)
    if (clockBackground){
        document.documentElement.style.removeProperty('--clock-background-image');
        document.documentElement.style.removeProperty('--handle-color');
        document.documentElement.style.removeProperty('--marker--color');
        return;
    }
    document.documentElement.style.setProperty('--clock-background-image', `url(${imgPath})`);
    document.documentElement.style.setProperty('--handle-color', `hsla(208, 100%, 31%, 1)`);
    document.documentElement.style.setProperty('--marker-color', `hsla(208, 100%, 31%, 1)`);
}

(() => {

    // image that will be set when hours handle go through twelve hours marker
    const dayImage = '../images/background-sky.avif';
    const secondTime = 1000; // number of miliseconds in a second
    // can be used to test the clock at a different speed
    
    const secondsHandle = document.querySelector(".seconds");
    const minutesHandle = document.querySelector(".minutes");
    const hoursHandle = document.querySelector(".hours");
    
    const date = new Date();
    const clock = { // current time object
        seconds: date.getSeconds(),
        minutes: date.getMinutes(),
        hours: date.getHours(),
    };

    if (clock.hours > 6 && clock.hours < 18 ){ // clock background will depend on the hour of the day
        toggleBackground(dayImage);
    }

    // set current time
    secondsHandle.style.transform = animate(clock.seconds, 60);
    minutesHandle.style.transform = animate(clock.minutes, 60);
    hoursHandle.style.transform = animate(clock.hours, 12);

    setInterval(() => {
        clock.seconds = (clock.seconds + 1) % 60;
        secondsHandle.style.transform = animate(clock.seconds, 60);

        if (clock.seconds == 0) { 
            // minutes handle will advance when seconds
            // handle go through twelve hours marker

            clock.minutes = (clock.minutes + 1) % 60;
            minutesHandle.style.transform = animate(clock.minutes, 60);
            
            if (clock.minutes == 0) {
                // to advance hours handle same logic as for minutes is used
                clock.hours = (clock.hours + 1) % 12;
                hoursHandle.style.transform = animate(clock.hours, 12);
                if(clock.hours == 18 || clock.hours == 6 ){
                    toggleBackground(dayImage)
                }
            }
        }
    }, secondTime);

})();


