import { lstatSync } from "fs";

export function isCorrectRuleType(file: string, rule: string): boolean {
  if (rule.includes(".") && lstatSync(file).isDirectory()) {
    return false;
  } else if (!rule.includes(".") && lstatSync(file).isFile()) {
    return false;
  }

  return true;
}
