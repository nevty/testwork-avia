export function convertMinsToHrs(mins,format) {
    let h = (Math.floor(mins / 60));
    let m = mins % 60;
    if (format === "dotted") {
        return convertToDouble(h,m);
    }
    if (format === "hm") {
        return `${h}ч ${m}м`;
    }
    return `${h}h ${m}m`;
}

export function convertToDouble(hours,minutes) {
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes}`;
}

export function countArrivalTime(startDate,minutes) {
    let newDate = new Date(startDate.getTime() + minutes * 60000);
    return convertToDouble(newDate.getHours(),newDate.getMinutes())
}

