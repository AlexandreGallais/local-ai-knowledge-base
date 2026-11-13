---
title: "Configuration Files (part 2 of 4)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/configure/configuration-files.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Configuration Files (part 2 of 4)

## Configuration Objects

Each configuration object contains all of the information ESLint needs to execute on a set of files. Each configuration object is made up of these properties:

- `name` - A name for the configuration object. This is used in error messages and config inspector to help identify which configuration object is being used. (Naming Convention)
- `basePath` - A string specifying the path to a subdirectory to which the configuration object should apply to. It can be a relative or an absolute path.
- `files` - An array of glob patterns indicating the files that the configuration object should apply to. If not specified, the configuration object applies to all files matched by any other configuration object.
- `ignores` - An array of glob patterns indicating the files that the configuration object should not apply to. If not specified, the configuration object applies to all files matched by `files`. If `ignores` is used without any other keys in the configuration object, then the patterns act as global ignores and it gets applied to every configuration object.
- `extends` - An array of strings, configuration objects, or configuration arrays that contain additional configuration to apply.
- `language` - A string specifying the language used for linting, in the format `"pluginName/languageName"`, e.g. `"markdown/commonmark"`. (default: `"js/js"` for JavaScript)
- `languageOptions` - An object containing settings related to how the specified language is configured for linting. For JavaScript, the settings are:
    - `ecmaVersion` - The version of ECMAScript to support. May be any year (i.e., `2022`) or version (i.e., `5`). Set to `"latest"` for the most recent supported version. (default: `"latest"`)
    - `sourceType` - The type of JavaScript source code. Possible values are `"script"` for traditional script files, `"module"` for ECMAScript modules (ESM), and `"commonjs"` for CommonJS files. (default: `"module"` for `.js` and `.mjs` files; `"commonjs"` for `.cjs` files)
    - `globals` - An object specifying additional objects that should be added to the global scope during linting.
    - `parser` - An object containing a `parse()` method or a `parseForESLint()` method. (default: `espree`)
    - `parserOptions` - An object specifying additional options that are passed directly to the `parse()` or `parseForESLint()` method on the parser. The available options are parser-dependent.
- `linterOptions` - An object containing settings related to the linting process.
    - `noInlineConfig` - A Boolean value indicating if inline configuration is allowed.
    - `reportUnusedDisableDirectives` - A severity string indicating if and how unused disable and enable directives should be tracked and reported. For legacy compatibility, `true` is equivalent to `"warn"` and `false` is equivalent to `"off"`. (default: `"warn"`).
    - `reportUnusedInlineConfigs` - A severity string indicating if and how unused inline configs should be tracked and reported. (default: `"off"`)
- `processor` - Either an object containing `preprocess()` and `postprocess()` methods or a string indicating the name of a processor inside of a plugin (i.e., `"pluginName/processorName"`).
- `plugins` - An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
- `rules` - An object containing the configured rules. When `files` or `ignores` are specified, these rule configurations are only available to the matching files.
- `settings` - An object containing name-value pairs of information that should be available to all rules.
