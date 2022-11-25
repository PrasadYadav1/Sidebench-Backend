export const leadingZero = (num: number): string => {
    let newNuum = num.toString();
    // eslint-disable-next-line no-plusplus
    for (let i: number = newNuum.length; i < 6; i++) {
        newNuum = `0${newNuum}`;
    }
    return newNuum;
};
