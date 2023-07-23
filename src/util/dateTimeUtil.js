export const formatDateTime = (str) => {
    let timestamp = Date.parse(str);
    let date = new Date(timestamp);
    return date.toLocaleString();
}

export const parseDate = (str) => {
    let timestamp = Date.parse(str);
    return new Date(timestamp);
}

export const convertMinutesToHours = (minutes) => {
    let hourStr, minStr;
    let hours = Math.floor(minutes / 60);
    hourStr = hours.toString();
    if (hours < 10) {
        hourStr += "0"
    }
    let redundancy = minutes - hours * 60;
    minStr = redundancy.toString();
    if (redundancy < 10) {
        minStr += "0"
    }
    return `${hourStr}:${minStr}:00`
}

export const calculateDuration = (startDateStr, endDateStr) => {
    let startTimeStamp = Date.parse(startDateStr);
    let endTimeStamp = Date.parse(endDateStr);
    return endTimeStamp - startTimeStamp;
}

export const calculateDurationByHMS = (startDateStr, endDateStr) => {
    let duration =  calculateDuration(startDateStr, endDateStr);
    return msToHMS (duration);
}

export const msToHMS = ( duration ) => {

    var milliseconds = parseInt((duration % 1000) / 100),
       seconds = parseInt((duration / 1000) % 60),
       minutes = parseInt((duration / (1000 * 60)) % 60),
       hours = parseInt((duration / (1000 * 60 * 60)) % 24);

     hours = (hours < 10) ? "0" + hours : hours;
     minutes = (minutes < 10) ? "0" + minutes : minutes;
     seconds = (seconds < 10) ? "0" + seconds : seconds;

     return hours + " giờ " + minutes + " phút " + seconds + " giây";
}