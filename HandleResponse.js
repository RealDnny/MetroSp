export function HandleResponse(status, message, details = null) {
    return { status, message, details };
}
