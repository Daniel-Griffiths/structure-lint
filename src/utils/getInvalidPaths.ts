import glob from "fast-glob";
import minimatch from "minimatch";

import { IConfig } from "../interfaces/IConfig";
import { isCorrectRuleType } from "./isCorrectRuleType";
import { getSubsequentPaths } from "./getSubsequentPaths";

export function getInvalidPaths({ root, rules }: IConfig) {
  return glob.sync([`${root}/**`]).filter((file) => {
    return !rules
      .flatMap((rule) => `${root}/${rule}`)
      .flatMap(getSubsequentPaths)
      .some((rule) => {
        if (!isCorrectRuleType(file, rule)) return false;

        return minimatch(file, rule, {
          noglobstar: true,
        });
      });
  });
}
