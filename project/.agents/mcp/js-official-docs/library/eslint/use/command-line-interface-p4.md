---
title: "Command Line Interface Reference (part 4 of 4)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/command-line-interface.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Command Line Interface Reference (part 4 of 4)

### Miscellaneous

#### `--init`

This option runs `npm init @eslint/config` to start the config initialization wizard. It's designed to help new users quickly create an `eslint.config.js` file by answering a few questions. When you use this flag, the CLI does not perform linting.

- **Argument Type**: No argument.

The resulting configuration file is created in the current directory.

##### `--init` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--init"]
}) }}

#### `--env-info`

This option outputs information about the execution environment, including the version of Node.js, npm, and local and global installations of ESLint.

- **Argument Type**: No argument.

The ESLint team may ask for this information to help solve bugs. When you use this flag, the CLI does not perform linting.

##### `--env-info` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--env-info"]
}) }}

#### `--no-error-on-unmatched-pattern`

This option prevents errors when a quoted glob pattern is unmatched. This does not prevent errors when your shell can't match a glob.

- **Argument Type**: No argument.

##### `--no-error-on-unmatched-pattern` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--no-error-on-unmatched-pattern", "--ext", ".ts", "\"lib/*\""]
}) }}

#### `--exit-on-fatal-error`

This option causes ESLint to exit with exit code 2 if one or more fatal parsing errors occur. Without this option, ESLint reports fatal parsing errors as rule violations.

- **Argument Type**: No argument.

##### `--exit-on-fatal-error` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--exit-on-fatal-error", "file.js"]
}) }}

#### `--no-warn-ignored`

This option suppresses both `File ignored by default` and `File ignored because of a matching ignore pattern` warnings when an ignored filename is passed explicitly. It is useful when paired with `--max-warnings 0` as it will prevent exit code 1 due to the aforementioned warning.

- **Argument Type**: No argument.

##### `--no-warn-ignored` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--no-warn-ignored", "--max-warnings", "0", "ignored-file.js"]
}) }}

#### `--pass-on-no-patterns`

This option allows ESLint to exit with code 0 when no file or directory patterns are passed. Without this option, ESLint assumes you want to use `.` as the pattern.

- **Argument Type**: No argument.

##### `--pass-on-no-patterns` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--pass-on-no-patterns"]
}) }}

#### `--debug`

This option outputs debugging information to the console. Add this flag to an ESLint command line invocation in order to get extra debugging information while the command runs.

- **Argument Type**: No argument.

This information is useful when you're seeing a problem and having a hard time pinpointing it. The ESLint team may ask for this debugging information to help solve bugs.

##### `--debug` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--debug", "test.js"]
}) }}

#### `-h`, `--help`

This option outputs the help menu, displaying all of the available options. All other options are ignored when this is present. When you use this flag, the CLI does not perform linting.

- **Argument Type**: No argument.

##### `-h`, `--help` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--help"]
}) }}

#### `-v`, `--version`

This option outputs the current ESLint version onto the console. All other options are ignored when this is present. When you use this flag, the CLI does not perform linting.

- **Argument Type**: No argument.

##### `-v`, `--version` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--version"]
}) }}

#### `--print-config`

This option outputs the configuration to be used for the file passed. When present, no linting is performed and only config-related options are valid. When you use this flag, the CLI does not perform linting.

- **Argument Type**: String. Path to file.
- **Multiple Arguments**: No

##### `--print-config` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--print-config", "file.js"]
}) }}

#### `--stats`

This option adds a series of detailed performance statistics (see Stats type) such as the _parse_-, _fix_- and _lint_-times (time per rule) to `result` objects that are passed to the formatter (see Stats CLI usage).

- **Argument Type**: No argument.

This option is intended for use with custom formatters that display statistics. It can also be used with the built-in `json` formatter.

##### `--stats` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--stats", "--format", "json", "file.js"]
}) }}

#### `--flag`

This option enables one or more feature flags for ESLint.

- **Argument Type**: String. A feature identifier.
- **Multiple Arguments**: Yes

##### `--flag` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--flag", "x_feature", "file.js"]
}) }}

#### `--mcp`

This option starts the ESLint MCP server for use with AI agents.

- **Argument Type**: No argument.
- **Multiple Arguments**: No

##### `--mcp` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--mcp"]
}) }}

#### `--concurrency`

This option controls the number of worker threads used to lint files.

- **Argument Type**: Int|String. A positive integer, `auto` or `off`.
- **Multiple Arguments**: No
- **Default Value**: `off`

The value `off` causes all files to be linted in the main thread. The value `auto` attempts to determine the best setting automatically.

##### `--concurrency` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--concurrency", "auto"]
}) }}

## Exit Codes

When linting files, ESLint exits with one of the following exit codes:

- `0`: Linting was successful and there are no linting errors. If the `--max-warnings` flag is set to `n`, the number of linting warnings is at most `n`.
- `1`: Linting was successful and there is at least one linting error, or there are more linting warnings than allowed by the `--max-warnings` option.
- `2`: Linting was unsuccessful due to a configuration problem or an internal error.
