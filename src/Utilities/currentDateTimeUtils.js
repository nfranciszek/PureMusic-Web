export function getCurrentDateTime() {
    const currentDate = new Date();

    // Get date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const date = String(currentDate.getDate()).padStart(2, '0');

    // Get time components
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // Assemble the formatted date and time
    const formattedDateTime = `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}


export function getTalkCircleEntryTime() {
    const currentDate = new Date();

    // Get date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const date = String(currentDate.getDate()).padStart(2, '0');

    // Get time components
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    // Assemble the formatted date and time
    const formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milliseconds}`;

    return formattedDateTime;
}



export function getDateOfAction() {
    const currentDate = new Date();

    // Get date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const date = String(currentDate.getDate()).padStart(2, '0');

    // Get time components
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // Assemble the formatted date and time
    const formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}