

export const pad = (val) => {
    const newVal = String(val);
    if (newVal.length === 1) {
        return "0" + newVal;
    }
    return newVal;
}