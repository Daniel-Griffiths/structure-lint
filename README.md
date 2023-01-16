# Structure Lint 📁

A linter to check the directory/file structure of your projects.

![Tests](https://github.com/Daniel-Griffiths/structure-lint/actions/workflows/publish.yml/badge.svg)

## Install globally

```bash
npm install -g structure-lint
# Or Yarn
yarn global add structure-lint
```

## Install as a package

```bash
npm install structure-lint
# Or Yarn
yarn add structure-lint
```

Then add the following command to your package.json file:

```json
{
  "scripts": {
    "structure-lint": "structure-lint"
  }
}
```

## Usage

Create a `.structurelintrc` file in the root of your project. See the example config file below:

```json
{
  "root": "src",
  "rules": [
    "utils/*.ts",
    "hooks/*.ts",
    "interfaces/I*.ts",
    "components/**/*.tsx",
    "deeply/**/nested/**/folder/*.{tsx,ts,js}"
  ]
}
```
