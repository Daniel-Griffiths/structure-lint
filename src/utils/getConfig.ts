import { readFileSync } from "fs";
import { IConfig } from "../interfaces/IConfig";

export function getConfig(): IConfig {
  try {
    const config = readFileSync(".structurelintrc", "utf8");
    return JSON.parse(config);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
