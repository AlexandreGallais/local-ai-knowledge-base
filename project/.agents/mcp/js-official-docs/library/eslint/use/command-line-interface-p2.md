---
title: "Command Line Interface Reference (part 2 of 4)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/command-line-interface.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Command Line Interface Reference (part 2 of 4)

## Options

You can view all the CLI options by running `npx eslint -h`.

```txt
eslint [options] file.js [file.js] [dir]

Basic <example-value>:
  --no-config-lookup               Disable look up for eslint.config.*
  -c, --config path::String        Use this configuration instead of eslint.config.* look up
  --inspect-config                 Open the config inspector with the current configuration
  --ext [String]                   Specify additional file extensions to lint
  --global [String]                Define global variables
  --parser String                  Specify the parser to be used
  --parser-options Object          Specify parser options

Specify Rules and Plugins:
  --plugin [String]                Specify plugins
  --rule Object                    Specify rules

Fix Problems:
  --fix                            Automatically fix problems
  --fix-dry-run                    Automatically fix problems without saving the changes to the file system
  --fix-type Array                 Specify the types of fixes to apply (directive, problem, suggestion, layout)

Ignore Files:
  --no-ignore                      Disable use of ignore files and patterns
  --ignore-pattern [String]        Patterns of files to ignore

Use stdin:
  --stdin                          Lint code provided on <STDIN> - default: false
  --stdin-filename String          Specify filename to process STDIN as

Handle Warnings:
  --quiet                          Report errors only - default: false
  --max-warnings Int               Number of warnings to trigger nonzero exit code - default: -1

Output:
  -o, --output-file path::String   Specify file to write report to
  -f, --format String              Use a specific output format - default: stylish
  --color, --no-color              Force enabling/disabling of color

Inline configuration comments:
  --no-inline-config               Prevent comments from changing config or rules
  --report-unused-disable-directives  Adds reported errors for unused eslint-disable and eslint-enable directives
  --report-unused-disable-directives-severity String  Chooses severity level for reporting unused eslint-disable and eslint-enable directives - either: off, warn, error, 0, 1, or 2
  --report-unused-inline-configs String  Adds reported errors for unused eslint inline config comments - either: off, warn, error, 0, 1, or 2

Caching:
  --cache                          Only check changed files - default: false
  --cache-file path::String        Path to the cache file. Deprecated: use --cache-location - default: .eslintcache
  --cache-location path::String    Path to the cache file or directory
  --cache-strategy String          Strategy to use for detecting changed files in the cache - either: metadata or content - default: metadata

Suppressing Violations:
  --suppress-all                   Suppress all violations - default: false
  --suppress-rule [String]         Suppress specific rules
  --suppressions-location path::String  Specify the location of the suppressions file
  --prune-suppressions             Prune unused suppressions - default: false
  --pass-on-unpruned-suppressions  Ignore unused suppressions - default: false

Miscellaneous:
  --init                           Run config initialization wizard - default: false
  --env-info                       Output execution environment information - default: false
  --no-error-on-unmatched-pattern  Prevent errors when pattern is unmatched
  --exit-on-fatal-error            Exit with exit code 2 in case of fatal error - default: false
  --no-warn-ignored                Suppress warnings when the file list includes ignored files
  --pass-on-no-patterns            Exit with exit code 0 in case no file patterns are passed
  --debug                          Output debugging information
  -h, --help                       Show help
  -v, --version                    Output the version number
  --print-config path::String      Print the configuration for the given file
  --stats                          Add statistics to the lint report - default: false
  --flag [String]                  Enable a feature flag
  --mcp                            Start the ESLint MCP server
  --concurrency Int|String         Number of linting threads, auto to choose automatically, off for no multithreading - default: off
```

### Basic <example-value>

#### `--no-config-lookup`

Disables use of configuration from files.

- **Argument Type**: No argument.

##### `--no-config-lookup` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--no-config-lookup", "file.js"]
}) }}

#### `-c`, `--config`

This option allows you to specify an additional configuration file for ESLint (see Configure ESLint for more).

- **Argument Type**: String. Path to file.
- **Multiple Arguments**: No

##### `-c`, `--config` example

{{ npx_tabs ({
    package: "eslint",
    args: ["-c", "~/my.eslint.config.js", "file.js"]
}) }}

This example uses the configuration file at `~/my.eslint.config.js`, which is used instead of searching for an `eslint.config.js` file.

#### `--inspect-config`

This option runs `npx @eslint/config-inspector@latest` to start the config inspector. You can use the config inspector to better understand what your configuration is doing and which files it applies to. When you use this flag, the CLI does not perform linting.

- **Argument Type**: No argument.

##### `--inspect-config` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--inspect-config"]
}) }}

#### `--ext`

This option allows you to specify additional file extensions to lint.

- **Argument Type**: String. File extension.
- **Multiple Arguments**: Yes
- **Default Value**: By default, ESLint lints files with extensions `.js`, `.mjs`, `.cjs`, and additional extensions specified in the configuration file.

This option is primarily intended for use in combination with the `--no-config-lookup` option, since in that case there is no configuration file in which the additional extensions would be specified.

##### `--ext` example

{{ npx_tabs ({
    package: "eslint",
    args: [".", "--ext", ".ts"],
    comment: "Include .ts files"
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: [".", "--ext", ".ts", "--ext", ".tsx"],
    comment: "Include .ts and .tsx files"
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: [".", "--ext", ".ts,.tsx"],
    comment: "Also include .ts and .tsx files"
}) }}

#### `--global`

This option defines global variables so that they are not flagged as undefined by the `no-undef` rule.

- **Argument Type**: String. Name of the global variable. Any specified global variables are assumed to be read-only by default, but appending `:true` to a variable's name ensures that `no-undef` also allows writes.
- **Multiple Arguments**: Yes

##### `--global` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--global", "require,exports:true", "file.js"]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--global", "require", "--global", "exports:true"]
}) }}

#### `--parser`

This option allows you to specify a parser to be used by ESLint.

- **Argument Type**: String. Parser to be used by ESLint.
- **Multiple Arguments**: No
- **Default Value**: `espree`

##### `--parser` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--parser", "@typescript-eslint/parser", "file.ts"],
    comment: "Use TypeScript ESLint parser"
}) }}

#### `--parser-options`

This option allows you to specify parser options to be used by ESLint. The available parser options are determined by the parser being used.

- **Argument Type**: Key/value pair separated by colon (`:`).
- **Multiple Arguments**: Yes

##### `--parser-options` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--stdin", "--parser-options", "ecmaVersion:6"],
    comment: "fails with a parsing error",
    previousCommands: ["echo \'3 ** 4\'"]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--stdin", "--parser-options", "ecmaVersion:7"],
    comment: "succeeds, yay!",
    previousCommands: ["echo \'3 ** 4\'"]
}) }}

### Specify Rules and Plugins

#### `--plugin`

This option specifies a plugin to load.

- **Argument Type**: String. Plugin name. You can optionally omit the prefix `eslint-plugin-` from the plugin name.
- **Multiple Arguments**: Yes

Before using the plugin, you have to install it using npm.

##### `--plugin` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--plugin", "jquery", "file.js"]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--plugin", "eslint-plugin-mocha", "file.js"]
}) }}

#### `--rule`

This option specifies the rules to be used.

- **Argument Type**: Rules and their configuration specified with levn format.
- **Multiple Arguments**: Yes

These rules are merged with any rules specified with configuration files. If the rule is defined in a plugin, you have to prefix the rule ID with the plugin name and a `/`.

To ignore rules in configuration files and only run rules specified in the command line, use the `--rule` flag in combination with the `--no-config-lookup` flag.

##### `--rule` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--rule", "\'quotes: [error, double]\'"],
    comment: "Apply single rule"
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--rule", "\'guard-for-in: error\'", "--rule", "\'brace-style: [error, 1tbs]\'"],
    comment: "Apply multiple rules"
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--rule", "\'jquery/dollar-sign: error\'"],
    comment: "Apply rule from jquery plugin"
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--rule", "\'quotes: [error, double]\'", "--no-config-lookup"],
    comment: "Only apply rule from the command line"
}) }}

### Fix Problems

#### `--fix`

This option instructs ESLint to try to fix as many issues as possible. The fixes are made to the actual files themselves and only the remaining unfixed issues are output.

- **Argument Type**: No argument.

Not all problems are fixable using this option, and the option does not work in these situations:

1. This option throws an error when code is piped to ESLint.
1. This option has no effect on code that uses a processor, unless the processor opts into allowing autofixes.

If you want to fix code from `stdin` or otherwise want to get the fixes without actually writing them to the file, use the `--fix-dry-run` option.

##### `--fix` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--fix", "file.js"]
}) }}

#### `--fix-dry-run`

This option has the same effect as `--fix` with the difference that the fixes are not saved to the file system. Because the default formatter does not output the fixed code, you'll have to use another formatter (e.g. `--format json`) to get the fixes.

- **Argument Type**: No argument.

This makes it possible to fix code from `stdin` when used with the `--stdin` flag.

This flag can be useful for integrations (e.g. editor plugins) which need to autofix text from the command line without saving it to the filesystem.

##### `--fix-dry-run` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--stdin", "--fix-dry-run", "--format", "json"],
    previousCommands: ["getSomeText"]
}) }}

#### `--fix-type`

This option allows you to specify the type of fixes to apply when using either `--fix` or `--fix-dry-run`.

- **Argument Type**: String. One of the following fix types:
    1. `problem` - fix potential errors in the code
    1. `suggestion` - apply fixes to the code that improve it
    1. `layout` - apply fixes that do not change the program structure (AST)
    1. `directive` - apply fixes to inline directives such as `// eslint-disable`
- **Multiple Arguments**: Yes

This option is helpful if you are using another program to format your code, but you would still like ESLint to apply other types of fixes.

##### `--fix-type` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--fix", "--fix-type", "suggestion", "."]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--fix", "--fix-type", "suggestion", "--fix-type", "problem", "."]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--fix", "--fix-type", "suggestion,layout", "."]
}) }}

### Ignore Files

#### `--no-ignore`

Disables excluding of files from `--ignore-pattern` flags and the `ignores` property in configuration.

- **Argument Type**: No argument.

##### `--no-ignore` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--no-ignore", "file.js"]
}) }}

#### `--ignore-pattern`

This option allows you to specify patterns of files to ignore.

- **Argument Type**: String. The supported syntax is the same as for `ignores` patterns, which use minimatch syntax. You should quote your patterns in order to avoid shell interpretation of glob patterns.
- **Multiple Arguments**: Yes

##### `--ignore-pattern` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--ignore-pattern", "\"/lib/\"", "--ignore-pattern", "\"/src/vendor/*\"", "."]
}) }}

### Use stdin

#### `--stdin`

This option tells ESLint to read and lint source code from STDIN instead of from files. You can use this to pipe code to ESLint.

- **Argument Type**: No argument.

##### `--stdin` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--stdin"],
    previousCommands: ["cat myFile.js"]
}) }}

#### `--stdin-filename`

This option allows you to specify a filename to process STDIN as.

- **Argument Type**: String. Path to file.
- **Multiple Arguments**: No

This is useful when processing files from STDIN and you have rules which depend on the filename.

##### `--stdin-filename` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--stdin", "--stdin-filename", "myfile.js"],
    previousCommands: ["cat myFile.js"]
}) }}

### Handle Warnings

#### `--quiet`

This option allows you to disable reporting on warnings and running of rules set to warn. If you enable this option, only errors are reported by ESLint and only rules set to error will be run.

- **Argument Type**: No argument.

##### `--quiet` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--quiet", "file.js"]
}) }}

#### `--max-warnings`

This option allows you to specify a warning threshold, which can be used to force ESLint to exit with an error status if there are too many warning-level rule violations in your project.

- **Argument Type**: Integer. The maximum number of warnings to allow. To prevent this behavior, do not use this option or specify `-1` as the argument.
- **Multiple Arguments**: No

Normally, if ESLint runs and finds no errors (only warnings), it exits with a success exit status. However, if `--max-warnings` is specified and the total warning count is greater than the specified threshold, ESLint exits with an error status.

**Important:**
When used alongside `--quiet`, this will cause rules marked as warn to still be run, but not reported.

##### `--max-warnings` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--max-warnings", "10", "file.js"]
}) }}
