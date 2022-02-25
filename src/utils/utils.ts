export const addAdditionalNulls = (value: string): string => {
    if (value.length === 0) {
        return '00';
    }
    if (value.length === 1) {
        return '0' + value;
    }
    return value;
}

export const uid = function (): string {
    return String(Math.floor(Math.random() * Math.floor(Math.random() * Date.now())))
}