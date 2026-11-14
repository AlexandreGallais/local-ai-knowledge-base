---
title: "Command Line Interface Reference (part 1 of 4)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/command-line-interface.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Command Line Interface Reference

{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}
{%- from 'components/npx_tabs.macro.html' import npx_tabs %}

The ESLint Command Line Interface (CLI) lets you execute linting from the terminal. The CLI has a variety of options that you can pass to configure ESLint.

## Run the CLI

ESLint requires Node.js for installation. Follow the instructions in the Getting Started Guide to install ESLint.

Most users use `npx` to run ESLint on the command line like this:

{{ npx_tabs ({
    package: "eslint",
    args: ["[options]", "[file|dir|glob]*"]
}) }}

Such as:

{{ npx_tabs ({
    package: "eslint",
    args: ["file1.js", "file2.js"],
    comment: "Run on two files"
}) }}

or

{{ npx_tabs ({
    package: "eslint",
    args: ["lib/**"],
    comment: "Run on multiple files"
}) }}

Please note that when passing a glob as a parameter, it is expanded by your shell. The results of the expansion can vary depending on your shell, and its configuration. If you want to use node `glob` syntax, you have to quote your parameter (using double quotes if you need it to run in Windows), as follows:

{{ npx_tabs ({
    package: "eslint",
    args: ["\"lib/**\""]
}) }}

You can also omit the file arguments and ESLint will use `.`. For instance, these two lines perform the same operation:

{{ npx_tabs ({
    package: "eslint",
    args: ["."]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: []
}) }}

**Note:** You can also use alternative package managers such as Yarn or pnpm to run ESLint. For pnpm use `pnpm dlx eslint` and for Yarn use `yarn dlx eslint`.

## Pass <example-value> Values to an Option

Options that accept multiple values can be specified by repeating the option or with a comma-delimited list (other than `--ignore-pattern`, which does not allow the second style).

Examples of options that accept multiple values:

{{ npx_tabs ({
    package: "eslint",
    args: ["--global", "describe", "--global", "it",  "tests/"]
}) }}

OR

{{ npx_tabs ({
    package: "eslint",
    args: ["--global", "describe,it", "tests/"]
}) }}
