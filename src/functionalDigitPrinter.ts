import * as R from "ramda";

const singleDigitToDigitConfigArray = (digitConfiguration) => (digit: string): string[] => {
    if (!digitConfiguration.hasOwnProperty(digit)) {
        throw new Error(`Missing digit configuration for digit! [${digit}]`);
    }

    return digitConfiguration[digit];
};

const validateSingleConfigDigit = (digitHeight) => (singleDigitConfig: string[]): void => {
    if (singleDigitConfig.length !== digitHeight) {
        throw new Error(`Every digit in config should have height of ${digitHeight} digit!`);
    }

    let digitFirstLineLength = singleDigitConfig[0].length;
    singleDigitConfig.forEach((digitLine: string) => {
        if (digitLine.length !== digitFirstLineLength) {
            throw new Error("Every line in digit should have same length!")
        }
    })
};

export const functionalPrinterConfigValidator: (digitHeight: number) => (configuration: any) => void =
    (digitHeight) =>
        R.pipe(
            R.values,
            R.map(
                R.tap(validateSingleConfigDigit(digitHeight))
            )
        );

export const functionalDigitPrinter: (configuration: any) => (numberToPrint: number) => void =
    (digitConfiguration) => R.pipe(
        R.toString,
        R.split(""),
        R.map(singleDigitToDigitConfigArray(digitConfiguration)),
        R.transpose,
        R.map(R.join(" ")),
        R.join("\r\n"),
        console.log
    );
