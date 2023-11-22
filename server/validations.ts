export function isStringAndNotEmpty(...values: any[]) {
    return values.filter((value) => typeof value !== "string" || value.length === 0).length > 0
}

export function isNumberAndNotZero(...values: any[]) {
    return values.filter((value) => typeof value != "number" || value < 1).length > 0
}