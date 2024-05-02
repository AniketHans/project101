export function logInfo(message) {
    console.log(message);
}

export function logError(err, errorMessage = "") {
    console.error(errorMessage, err);
}
