export default function datePrettier(timestamp, isDateTime = true) {
    if (!timestamp) return '-';

    const date = new Date(parseInt(timestamp));

    if (isNaN(date.getTime())) {
        return '-';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    if (isDateTime) {
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    } else {
        return `${hours}:${minutes}`;
    }
}
