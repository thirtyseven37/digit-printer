export class DigitPrinter {
    private readonly digitHeight;
    private readonly config;

    public constructor(config: Object, digitHeight: number) {
        this.digitHeight = digitHeight;

        Object.values(config).forEach(this.validateConfigElement);
        this.config = config;
    }

    public printDigits = (inputNumber: number): void => {
        const inputNumberAsDigitArray = inputNumber
            .toString()
            .split("")
            .map(this.singleDigitToDigitConfigArray);

        let result = "";
        for (let lineNumber = 0; lineNumber < this.digitHeight; lineNumber++) {
            result += this.prepareResultLine(inputNumberAsDigitArray, lineNumber);
            if (lineNumber !== this.digitHeight - 1) {
                result += "\r\n";
            }
        }

        console.log(result);
    };

    private prepareResultLine = (inputNumberAsDigitArray: string[][], lineNumber: number): string => {
        let line = "";
        for (let i = 0; i < inputNumberAsDigitArray.length; i++) {
            line += inputNumberAsDigitArray[i][lineNumber];
            if (i !== inputNumberAsDigitArray.length - 1) {
                line += " "
            }
        }

        return line;
    };

    private validateConfigElement = (singleDigitConfig: string[]): void => {
        if (singleDigitConfig.length !== this.digitHeight) {
            throw new Error(`Every digit in config should have height of ${this.digitHeight} digit!`);
        }

        let digitFirstLineLength = singleDigitConfig[0].length;
        singleDigitConfig.forEach((digitLine: string) => {
            if (digitLine.length !== digitFirstLineLength) {
                throw new Error("Every line in digit should have same length!")
            }
        })
    };

    private singleDigitToDigitConfigArray = (digit: string): string[] => {
        if (!this.config.hasOwnProperty(digit)) {
            throw new Error(`Missing digit configuration for digit! [${digit}]`);
        }

        return this.config[digit];
    };
}
