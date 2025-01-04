export function successMsg(msg: string) {
    return { status: 'success', msg: msg, statusBolean: true }
}

export function errorMsg(msg: string) {
    return { status: 'error', msg: msg, statusBolean: false }
}