export const formatDateTime = (str) => {
    let timestamp = Date.parse(str);
    let date = new Date(timestamp);
    return date.toUTCString();
}