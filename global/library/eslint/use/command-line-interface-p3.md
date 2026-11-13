---
title: "Command Line Interface Reference (part 3 of 4)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/command-line-interface.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Command Line Interface Reference (part 3 of 4)

### Output

#### `-o`, `--output-file`

Write the output of linting results to a specified file.

- **Argument Type**: String. Path to file.
- **Multiple Arguments**: No

##### `-o`, `--output-file` example

{{ npx_tabs ({
    package: "eslint",
    args: ["-o", "./test/test.html"]
}) }}

#### `-f`, `--format`

This option specifies the output format for the console.

- **Argument Type**: String. One of the built-in formatters or a custom formatter.
- **Multiple Arguments**: No
- **Default Value**: `stylish`

If you are using a custom formatter defined in a local file, you can specify the path to the custom formatter file.

An npm-installed formatter is resolved with or without `eslint-formatter-` prefix.

When specified, the given format is output to the console. If you'd like to save that output into a file, you can do so on the command line like so:

{{ npx_tabs ({
    package: "eslint",
    args: ["-f", "json", "file.js", ">", "results.json"],
    comment: "Saves the output into the `results.json` file."
}) }}

##### `-f`, `--format` example

Use the built-in `json` formatter:

{{ npx_tabs ({
    package: "eslint",
    args: ["--format", "json", "file.js"]
}) }}

Use a local custom formatter:

{{ npx_tabs ({
    package: "eslint",
    args: ["-f", "./customformat.js", "file.js"]
}) }}

Use an npm-installed formatter:

{{ npm_tabs({
    command: "install",
    packages: ["eslint-formatter-pretty"],
    args: []
}) }}

Then run one of the following commands

{{ npx_tabs ({
    package: "eslint",
    args: ["-f", "pretty", "file.js"]
}) }}

or alternatively

{{ npx_tabs ({
    package: "eslint",
    args: ["-f", "eslint-formatter-pretty", "file.js"]
}) }}

#### `--color` and `--no-color`

These options force the enabling/disabling of colorized output.

- **Argument Type**: No argument.

You can use these options to override the default behavior, which is to enable colorized output unless no TTY is detected, such as when piping `eslint` through `cat` or `less`.

**Warning:**

When neither `--color` nor `--no-color` is specified, the formatter may decide whether to colorize the output based on the runtime environment. For example, when using the default `stylish` formatter under Node.js, `FORCE_COLOR`, `NO_COLOR`, or `NODE_DISABLE_COLORS` environment variables may affect whether colors are used.

##### `--color` and `--no-color` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--color", "file.js", "|", "cat"]
}) }}

{{ npx_tabs ({
    package: "eslint",
    args: ["--no-color", "file.js"]
}) }}

### Inline Configuration Comments

#### `--no-inline-config`

This option prevents inline comments like `/*eslint-disable*/` or
`/*global foo*/` from having any effect.

- **Argument Type**: No argument.

This allows you to set an ESLint config without files modifying it. All inline config comments are ignored, such as:

- `/*eslint-disable*/`
- `/*eslint-enable*/`
- `/*global*/`
- `/*eslint*/`
- `// eslint-disable-line`
- `// eslint-disable-next-line`

##### `--no-inline-config` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--no-inline-config", "file.js"]
}) }}

#### `--report-unused-disable-directives`

This option causes ESLint to report directive comments like `// eslint-disable-line` when no errors would have been reported on that line anyway.

- **Argument Type**: No argument.

This can be useful to prevent future errors from unexpectedly being suppressed, by cleaning up old `eslint-disable` and `eslint-enable` comments which are no longer applicable.

**Warning:**
When using this option, it is possible that new errors start being reported whenever ESLint or custom rules are upgraded.

For example, suppose a rule has a bug that causes it to report a false positive, and an `eslint-disable` comment is added to suppress the incorrect report. If the bug is then fixed in a patch release of ESLint, the `eslint-disable` comment becomes unused since ESLint is no longer generating an incorrect report. This results in a new reported error for the unused directive if the `--report-unused-disable-directives` option is used.

##### `--report-unused-disable-directives` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--report-unused-disable-directives", "file.js"]
}) }}

#### `--report-unused-disable-directives-severity`

Same as `--report-unused-disable-directives`, but allows you to specify the severity level (`error`, `warn`, `off`) of the reported errors. Only one of these two options can be used at a time.

- **Argument Type**: String. One of the following values:
    1. `off` (or `0`)
    1. `warn` (or `1`)
    1. `error` (or `2`)
- **Multiple Arguments**: No
- **Default Value**: By default, `linterOptions.reportUnusedDisableDirectives` configuration setting is used (which defaults to `"warn"`).

##### `--report-unused-disable-directives-severity` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--report-unused-disable-directives-severity", "warn", "file.js"]
}) }}

#### `--report-unused-inline-configs`

This option causes ESLint to report inline config comments like `/* eslint rule-name: "error" */` whose rule severity and any options match what's already been configured.

- **Argument Type**: String. One of the following values:
    1. `off` (or `0`)
    1. `warn` (or `1`)
    1. `error` (or `2`)
- **Multiple Arguments**: No
- **Default Value**: By default, `linterOptions.reportUnusedInlineConfigs` configuration setting is used (which defaults to `"off"`).

This can be useful to keep files clean and devoid of misleading clutter.
Inline config comments are meant to change ESLint's behavior in some way: if they change nothing, there is no reason to leave them in.

##### `--report-unused-inline-configs` example

```shell
npx eslint --report-unused-inline-configs error file.js
```

### Caching

#### `--cache`

Store the info about processed files in order to only operate on the changed ones. Enabling this option can dramatically improve ESLint's run time performance by ensuring that only changed files are linted.
The cache is stored in `.eslintcache` by default.

- **Argument Type**: No argument.

If you run ESLint with `--cache` and then run ESLint without `--cache`, the `.eslintcache` file will be deleted. This is necessary because the results of the lint might change and make `.eslintcache` invalid. If you want to control when the cache file is deleted, then use `--cache-location` to specify an alternate location for the cache file.

Autofixed files are not placed in the cache. Subsequent linting that does not trigger an autofix will place it in the cache.

ESLint determines whether a cached result is still valid from the file itself (its contents or metadata, depending on `--cache-strategy`) and the configuration. It does not track dependencies between files, so a file's cached results are reused even when another file it depends on has changed. Rules whose results depend on other files can therefore report stale results. This includes type-aware rules, such as those in `@typescript-eslint/eslint-plugin`, and rules that resolve imports across modules, such as those in `eslint-plugin-import` and `eslint-plugin-import-x`.

For example, if a module is changed in a way that introduces a problem in an unchanged file that imports it, `--cache` does not report that problem until the importing file or the configuration changes. The opposite can also happen: a problem that has already been fixed in another file continues to be reported. Run ESLint without `--cache` when you need accurate results from such rules. See Can I use ESLint's `--cache` with typescript-eslint? for more details.

##### `--cache` example

{{ npx_tabs ({
    package: "eslint",
    args: ["--cache", "file.js"]
}) }}

#### `--cache-file`

**Deprecated**: Use `--cache-location` instead.

Path to the cache file. If none specified `.eslintcache` is used. The file is created in the directory where the `eslint` command is executed.

#### `--cache-location`

Specify the path to the cache location. Can be a file or a directory.

- **Argument Type**: String. Path to file or directory. If a directory is specified, a cache file is created inside the specified folder. The name of the file is based on the hash of the current working directory, e.g.: `.cache_hashOfCWD`.
- **Multiple Arguments**: No
- **Default Value**: If no location is specified, `.eslintcache` is used. The file is created in the directory where the `eslint` command is executed.

If the directory for the cache does not exist make sure you add a trailing `/` on \*nix systems or `\` on Windows. Otherwise, the path is assumed to be a file.

##### `--cache-location` example

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--cache", "--cache-location", "\"/Users/user/.eslintcache/\""]
}) }}

#### `--cache-strategy`

Strategy for the cache to use for detecting changed files.

- **Argument Type**: String. One of the following values:
    1. `metadata`
    1. `content`
- **Multiple Arguments**: No
- **Default Value**: `metadata`

The `content` strategy can be useful in cases where the modification time of your files changes even if their contents have not. For example, this can happen during git operations like `git clone` because git does not track file modification time.

##### `--cache-strategy` example

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--cache", "--cache-strategy", "content"]
}) }}

### Suppress Violations

#### `--suppress-all`

Suppresses existing violations, so that they are not being reported in subsequent runs. It allows you to enable one or more lint rules and be notified only when new violations show up. The suppressions are stored in `eslint-suppressions.json` by default, unless otherwise specified by `--suppressions-location`. The file gets updated with the new suppressions.

- **Argument Type**: No argument.

##### `--suppress-all` example

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--suppress-all"]
}) }}

#### `--suppress-rule`

Suppresses violations for specific rules, so that they are not being reported in subsequent runs. Similar to `--suppress-all`, the suppressions are stored in `eslint-suppressions.json` by default, unless otherwise specified by `--suppressions-location`. The file gets updated with the new suppressions.

- **Argument Type**: String. Rule ID.
- **Multiple Arguments**: Yes

##### `--suppress-rule` example

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--suppress-rule", "no-console", "--suppress-rule", "indent"]
}) }}

#### `--suppressions-location`

Specify the path to the suppressions location. Can be a file or a directory.

- **Argument Type**: String. Path to file or directory. If a directory is specified, a suppressions file is created inside the specified folder. The name of the file is based on the hash of the current working directory, e.g.: `suppressions_hashOfCWD`
- **Multiple Arguments**: No
- **Default Value**: If no location is specified, `eslint-suppressions.json` is used. The file is created in the directory where the `eslint` command is executed.

##### `--suppressions-location` example

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--suppressions-location", "\".eslint-suppressions-example.json\""]
}) }}

#### `--prune-suppressions`

Prune unused suppressions from the suppressions file. This option is useful when you addressed one or more of the suppressed violations.

- **Argument Type**: No argument.

##### `--prune-suppressions` example

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--prune-suppressions"]
}) }}

#### `--pass-on-unpruned-suppressions`

Ignore unused suppressions. By default, ESLint exits with exit code `2` and displays an error message if there are unused suppressions in the suppressions file. When you use this flag, unused suppressions do not affect the exit code and ESLint doesn't output an error about unused suppressions.

- **Argument Type**: No argument.

##### `--pass-on-unpruned-suppressions` example

{{ npx_tabs ({
    package: "eslint",
    args: ["\"src/**/*.js\"", "--pass-on-unpruned-suppressions"]
}) }}
