export function successMsg(msg: any) {
    return { status: 'success', msg: msg, statusBolean: true }
}

export function errorMsg(msg: any) {
    return { status: 'error', msg: msg, statusBolean: false }
}