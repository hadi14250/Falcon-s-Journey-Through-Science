/* Numeral helpers — convert Western digits to Eastern Arabic-Indic digits.
   Used everywhere the user-facing UI shows scores, XP, level numbers etc.
   Toggled via the `arabicNumerals` setting in the store. */

const EASTERN = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toArabicNumerals(s: string | number): string {
  return String(s).replace(/[0-9]/g, (d) => EASTERN[parseInt(d, 10)]);
}

/** Format a number/string with optional Arabic-numeral substitution. */
export function fmtNumber(value: string | number, arabic: boolean): string {
  return arabic ? toArabicNumerals(value) : String(value);
}
