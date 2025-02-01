export const getCurrentDate = () => {
    let now = new Date()
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");

    return `${now.getFullYear()}-${month}-${day}`;
}

export const getCurrentTimeZone = () => {
    let now = new Date()
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");

    return `T${hours}:${minutes}:${seconds}Z`
}