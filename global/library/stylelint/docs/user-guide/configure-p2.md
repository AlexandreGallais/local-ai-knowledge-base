---
title: "Configuring (part 2 of 2)"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/docs/user-guide/configure.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# Configuring (part 2 of 2)

## `extends`

You can extend an existing configuration (whether your own or a third-party one). Configurations can bundle plugins, custom syntaxes, options, and configure rules. They can also extend other configurations.

For example, stylelint-config-standard is one of our official configs that you can extend.

When one configuration extends another, it starts with the other's properties and then adds to and overrides what's there.

For example, to extend the stylelint-config-standard and then change the alpha values to numbers and turn off the `selector-class-pattern` rule:

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "alpha-value-notation": "number",
    "selector-class-pattern": null
  }
}
```

You can extend an array of existing configurations, with each item in the array taking precedence over the previous item (so the second item overrides rules in the first, the third item overrides rules in the first and the second, and so on, the last item overrides everything else).

For example, with `stylelint-config-standard`, then layer `myExtendableConfig` on top of that, and then override the `alpha-value-notation` rule:

```json
{
  "extends": ["stylelint-config-standard", "./myExtendableConfig"],
  "rules": {
    "alpha-value-notation": "number"
  }
}
```

The value of `"extends"` is a "locater" (or an array of "locaters") that is ultimately `require()`d. It can fit whatever format works with Node's `require.resolve()` algorithm. That means a "locater" can be:

- the name of a module in `node_modules` (e.g. `stylelint-config-standard`; that module's `main` file must be a valid JSON configuration)
- an absolute path to a file (which makes sense if you're creating a JS object in a Node.js context and passing it in) with a `.js` or `.json` extension.
- a relative path to a file with a `.js` or `.json` extension, relative to the referencing configuration (e.g. if configA has `extends: "../configB"`, we'll look for `configB` relative to configA).

You'll find more configs in Awesome Stylelint and on the npm registry.

## `plugins`

Plugins are custom rules or sets of custom rules built to support methodologies, toolsets, _non-standard_ CSS features, or very specific use cases.

For example, stylelint-order is a popular plugin pack to order things like properties within declaration blocks.

Plugins are often included within shared configs that you can extend. For example, the stylelint-config-standard-scss config includes the stylelint-scss plugin.

To use a plugin directly, add a `"plugins"` array to your config, containing either plugin objects or "locaters" identifying the plugins you want to use. As with `extends`, above, a "locater" can be either a:

- npm module name
- absolute path
- path relative to the invoking configuration file

Once the plugin is declared, within your `"rules"` object _you'll need to add options_ for the plugin's rule(s), just like any standard rule. Look at the plugin's documentation to know what the rule name should be.

```json
{
  "plugins": ["../special-rule.js"],
  "rules": {
    "plugin-namespace/special-rule": "everything"
  }
}
```

A "plugin" can provide a single rule or a set of rules. If the plugin you use provides a set, invoke the module in your `"plugins"` configuration value, and use the rules it provides in `"rules"`. For example:

```json
{
  "plugins": ["../some-rule-set.js"],
  "rules": {
    "some-rule-set/first-rule": "everything",
    "some-rule-set/second-rule": "nothing",
    "some-rule-set/third-rule": "everything"
  }
}
```

You'll find more plugins in Awesome Stylelint and on the npm registry.

## `customSyntax`

Specify a custom syntax to use on your code. More info.

## `overrides`

Using the `overrides` property, you can specify what subset of files to apply a configuration to.

For example, to use the:

- `postcss-scss` syntax for all `.scss` files
- `percentage` notation for all alpha values in all `.css` files in the `components` and `pages` directories

```json
{
  "rules": {
    "alpha-value-notation": "number"
  },
  "overrides": [
    {
      "files": ["*.scss", "**/*.scss"],
      "customSyntax": "postcss-scss"
    },
    {
      "files": ["components/**/*.css", "pages/**/*.css"],
      "rules": {
        "alpha-value-notation": "percentage"
      }
    }
  ]
}
```

The value of the `overrides` property is an array of objects. Each object:

- must contain a `files` property, which is an array of glob patterns that specify which files the configuration should be applied to
- should contain at least one other regular configuration property, such as `customSyntax`, `rules`, `extends`, etc.
- may contain a `name` property to provide a description of the override's purpose

The `customSyntax` property will be replaced, whereas `plugins`, `extends`, `rules`, etc. will be appended.

Patterns are applied against the file path relative to the directory of the config file. For example, if your config file has the path `/project-foo/.stylelintrc.js` and the file you want to lint has the path `/project-foo/components/bar.css`, then the pattern provided in `.stylelintrc.js` will be executed against the relative path `components/bar.css`.

Overrides have higher precedence than regular configurations. Multiple overrides within the same config are applied in order. That is, the last override block in a config file always has the highest precedence.

## `processors`

> **Warning:**
> This is an experimental feature. The API may change in the future.
>
> This `processors` property was removed in 15.0.0, but has revived for post-processing. Note that this is different from the previous behavior.

Processors are functions that hook into Stylelint's pipeline.
Currently, processors contains only two properties: a string `name` and a function `postprocess`. `postprocess` runs after all rules have been evaluated. This function receives the `result` object of the linting process and can modify it.

For example, you can use a processor to remap the result location. Below processor expands the warning location for 'color-no-hex' rule to the entire CSS declaration. A warning for a hex color in a rule like `a { color: #111; }` would originally point to the hex color itself (e.g., line 1, columns 12-16). After processing, the warning will encompass the entire declaration (e.g., line 1, columns 5-16).

```json
{
  "rules": { "color-no-hex": true },
  "processors": ["path/to/my-processor.js"]
}
```

```js
// my-processor.js

/** @type {import("stylelint").Processor} */
export default function myProcessor() {
  return {
    name: "remap-color-no-hex",

    postprocess(result, root) {
      const updatedWarnings = result.warnings.map((warning) => {
        if (warning.rule !== "color-no-hex") {
          return warning;
        }

        let updatedWarning = { ...warning };

        root?.walk((node) => {
          const { start, end } = node.source;

          if (
            node.type === "decl" &&
            start.line <= warning.line &&
            end.line >= warning.endLine &&
            start.column <= warning.column &&
            end.column >= warning.endColumn
          ) {
            updatedWarning = {
              ...updatedWarning,
              line: start.line,
              endLine: end.line,
              column: start.column,
              endColumn: end.column
            };

            return false;
          }
        });

        return updatedWarning;
      });

      result.warnings = updatedWarnings;
    }
  };
}
```

## `defaultSeverity`

You can set the default severity level for all rules that do not have a severity specified in their secondary options. For example, you can set the default severity to `"warning"`:

```json
{
  "defaultSeverity": "warning"
}
```

## `report*`

These `report*` properties provide extra validation for `stylelint-disable` comments. This can help enforce useful and well-documented disables.

The available reports are:

- `reportDescriptionlessDisables`
- `reportInvalidScopeDisables`
- `reportNeedlessDisables`
- `reportUnscopedDisables`

They are configured like rules. They can have one of three values:

- `null` (to turn the configuration off)
- `true` or `false` (the primary option)
- an array with two values (`[primary option, secondary options]`)

The following secondary options are available:

- `"except"` takes an array of rule names for which the primary option should be inverted.
- `"severity"` adjusts the level of error emitted for the rule, as above.

For example, this produces errors for needless disables of all rules except `selector-max-type`:

```json
{
  "reportNeedlessDisables": [true, { "except": ["selector-max-type"] }]
}
```

And this emits warnings for disables of `unit-allowed-list` that don't have a description:

```json
{
  "reportDescriptionlessDisables": [
    false,
    {
      "except": ["unit-allowed-list"],
      "severity": "warning"
    }
  ]
}
```

### `reportDescriptionlessDisables`

Report `stylelint-disable` comments without a description. A `report*` property.

For example:

```json
{
  "reportDescriptionlessDisables": true
}
```

More info.

### `reportInvalidScopeDisables`

Report `stylelint-disable` comments that don't match rules that are specified in the configuration object. A `report*` property.

For example:

```json
{
  "reportInvalidScopeDisables": true
}
```

More info.

### `reportNeedlessDisables`

Report `stylelint-disable` comments that don't match any lints that need to be disabled. A `report*` property.

For example:

```json
{
  "reportNeedlessDisables": true
}
```

More info.

### `reportUnscopedDisables`

Report configuration comments that are not scoped to at least one rule. A `report*` property.

For example:

```json
{
  "reportUnscopedDisables": true
}
```

More info.

## `configurationComment`

You can set what configuration comments like `/* stylelint-disable */` start with. This can be useful if you use multiple instances of Stylelint with different configurations.

For example, to have an instance of Stylelint disable rules with `/* stylelint-foo-instance-disable */` instead of the default `/* stylelint-disable */`:

```json
{
  "configurationComment": "stylelint-foo-instance"
}
```

## `ignoreDisables`

Ignore `stylelint-disable` (e.g. `/* stylelint-disable block-no-empty */`) comments.

For example:

```json
{
  "ignoreDisables": true
}
```

More info.

## `ignoreFiles`

You can provide a glob or array of globs to ignore specific files.

For example, you can ignore all JavaScript files:

```json
{
  "ignoreFiles": ["**/*.js"]
}
```

Stylelint ignores the `node_modules` directory by default. However, this is overridden if `ignoreFiles` is set.

If the globs are absolute paths, they are used as is. If they are relative, they are analyzed relative to

- `configBasedir`, if it's provided;
- the config's filepath, if the config is a file that Stylelint found and loaded;
- or `process.cwd()`.

> **Note:**
> This is **not an efficient method for ignoring lots of files**. If you want to ignore a lot of files efficiently, use `.stylelintignore` or adjust your files globs.

## `allowEmptyInput`

Stylelint does not throw an error when the glob pattern matches no files.

For example:

```json
{
  "allowEmptyInput": true
}
```

> **Note:**
> This config option should not be overridden on a per-file basis.

More info.

## `cache`

Store the results of processed files so that Stylelint only operates on the changed ones.

For example:

```json
{
  "cache": true
}
```

> **Note:**
> This config option should not be overridden on a per-file basis.

More info.

## `fix`

Automatically fix, where possible, problems reported by rules.

For example:

```json
{
  "fix": true
}
```

> **Note:**
> This config option should not be overridden on a per-file basis.

More info.

## `formatter`

Specify the formatter to format your results.

Options are:

- The name of a provided formatter.
  ```json
  {
    "formatter": "string"
  }
  ```
- A path to a custom formatter function.
  ```json
  {
    "formatter": "path/to/customformatter.js"
  }
  ```
- A formatter function.
  ```js
  export default {
    formatter: () => {
      /* ... */
    }
  };
  ```

You'll find more formatters in Awesome Stylelint and on the npm registry.

More info.

## `maxWarnings`

Set a limit to the number of warnings accepted.

For example:

```json
{
  "maxWarnings": 0
}
```

> **Note:**
> This config option should not be overridden on a per-file basis.

More info.
