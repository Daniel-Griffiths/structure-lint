import mockFilesystem from "mock-fs";

import { getConfig } from "../src/utils/getConfig";
import { isCorrectRuleType } from "../src/utils/isCorrectRuleType";
import { getFileExtensions } from "../src/utils/getFileExtensions";
import { getSubsequentPaths } from "../src/utils/getSubsequentPaths";

/**
 * Prevent process.exit calls from killing jest
 */
jest.spyOn(process, "exit").mockImplementation((code: number): never => {
  return null as never;
});

afterEach(mockFilesystem.restore);

it("can take a path rule and get all subsequent paths", async () => {
  mockFilesystem({
    "components/really/long/_/path/structure/Example.tsx": "",
  });

  expect(
    getSubsequentPaths("components/really/long/**/path/structure/*.{tsx,js}")
  ).toStrictEqual([
    "components",
    "components/really",
    "components/really/long",
    "components/really/long/**",
    "components/really/long/**/path",
    "components/really/long/**/path/structure",
    "components/really/long/**/path/structure/*.{tsx,js}",
  ]);
});

it("can check if a path matches the rule type", async () => {
  mockFilesystem({
    "components/button/Button.tsx": "",
  });

  expect(isCorrectRuleType("components/button", "components/button")).toBe(
    true
  );

  expect(
    isCorrectRuleType("components/button", "components/button/*.tsx")
  ).toBe(false);

  expect(
    isCorrectRuleType("components/button/Button.tsx", "components/button/*")
  ).toBe(false);

  expect(
    isCorrectRuleType("components/button/Button.tsx", "components/button/*.tsx")
  ).toBe(true);
});

it("can get an array of file extensions from a rule", async () => {
  expect(getFileExtensions("components/folder")).toStrictEqual([]);
  expect(getFileExtensions("components/folder/*.ts")).toStrictEqual([]);
  expect(getFileExtensions("components/folder/*.{ts}")).toStrictEqual(["ts"]);
  expect(getFileExtensions("components/folder/*.{ts,tsx}")).toStrictEqual([
    "ts",
    "tsx",
  ]);
});

it("can parse the config file", async () => {
  const config = {
    root: "src",
    rules: ["components/**/*.ts"],
  };

  mockFilesystem({
    ".structurelintrc": JSON.stringify(config),
  });

  expect(getConfig()).toStrictEqual(config);

  mockFilesystem({
    ".wrongfilename": JSON.stringify(config),
  });

  getConfig();
  expect(process.exit).toHaveBeenLastCalledWith(1);
});
