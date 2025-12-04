export const getTime = (date_string) => {

    // exm - '2025-09-16T19:03:30.557+00:00'
    const date = new Date(date_string);
    // Get components
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed
    let year = date.getFullYear();

    // let hours = date.getHours();
    // let minutes = date.getMinutes().toString().padStart(2, '0');
    // let seconds = date.getSeconds().toString().padStart(2, '0');

    // let ampm = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'

    // Final format: day/month/year - hh:mm:ss am/pm
    // const formatted = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds} ${ampm}`;
    const formatted = `${day}/${month}/${year}`;

    return formatted;
};