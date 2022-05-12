#!/usr/bin/env node
import { getConfig } from "./utils/getConfig";
import { getInvalidPaths } from "./utils/getInvalidPaths";

const config = getConfig();
const invalidPaths = getInvalidPaths(config);

if (invalidPaths.length) {
  invalidPaths.forEach((errorPath) => console.log(`❌ "${errorPath}"`));
  process.exit(1);
}

console.log(`🎉 All checked paths pass!`);
