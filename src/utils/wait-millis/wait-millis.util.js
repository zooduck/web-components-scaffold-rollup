export const waitMillis = (delayMillis = 0) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delayMillis);
    });
};
