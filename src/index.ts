import digitConfiguration from "./config";
import { DigitPrinter } from "./DigitPrinter";
import { functionalDigitPrinter, functionalPrinterConfigValidator } from "./functionalDigitPrinter";

const ooPrinter = new DigitPrinter(digitConfiguration, 5);

ooPrinter.printDigits(21);

functionalPrinterConfigValidator(5)(digitConfiguration);
functionalDigitPrinter(digitConfiguration)(37);
