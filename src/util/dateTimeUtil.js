import dayjs from "dayjs";
dayjs().format()

export const formatDateTime = (str) => {
    let day = dayjs(str);
    return day.format('DD/MM/YYYY HH:mm:ss');
}

export const parseDate = (str) => {
    if (str == null) return null
    let timestamp = Date.parse(str);
    return new Date(timestamp);
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

export const parseDayjs = (str) => {
    if (str == null) return null
    return dayjs(str);
}

export const dayjsToString = (day) => {
    if (day == null) return null
    return day.format('YYYY-MM-DDTHH:mm:ss');
}