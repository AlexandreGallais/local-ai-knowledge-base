---
title: "Configuring (part 1 of 2)"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/docs/user-guide/configure.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# Configuring

Stylelint expects a configuration object.

Starting from the current working directory, Stylelint searches upwards until it finds a `stylelint.config.js` file that exports one. You can use the `--config` or `configFile` options to short-circuit the search.

The style of export depends on your default module system configuration for Node.js, e.g., `"type": "module"` in your `package.json` file. You can use the `stylelint.config.mjs` or `stylelint.config.cjs` filename to be explicit.

Example `stylelint.config.js` file:

```js
/** @type {import('stylelint').Config} */
export default {
  rules: {
    "block-no-empty": true
  }
};
```

For TypeScript codebases, you can also use the `stylelint.config.ts` filename and the `satisfies` operator to ensure type safety:

```ts
import type { Config } from "stylelint";

export default {
  rules: {
    "block-no-empty": true
  }
} satisfies Config;
```

> **Note:**
> Stylelint currently supports other configuration locations and formats, but we may remove these in the future:
>
> - `.stylelintrc.js` file using `export default` or `module.exports`
> - `.stylelintrc.mjs` file using `export default`
> - `.stylelintrc.cjs` file using `module.exports`
> - `.stylelintrc` file in YAML or JSON format
> - `.stylelintrc.yml` or `.stylelintrc.yaml` file
> - `.stylelintrc.json` file
> - `stylelint` property in `package.json`

The configuration object has the following properties:

## `rules`

Rules determine what the linter looks for and complains about. There are over 100 rules built into Stylelint. _No rules are turned on by default._

The `rules` property is _an object whose keys are rule names and values are rule configurations_. For example:

```json
{
  "rules": {
    "color-no-invalid-hex": true
  }
}
```

Each rule configuration fits one of the following formats:

- `null` (to turn the rule off)
- a single value (the primary option)
- an array with two values (`[primary option, secondary options]`)

Specifying a primary option turns on a rule.

Many rules provide secondary options for further customization. To set secondary options, use a two-member array. For example:

```json
{
  "rules": {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global"]
      }
    ]
  }
}
```

You can add any number of keys to the object. For example, you can:

- turn off `block-no-empty`
- turn on `unit-allowed-list` with a primary option
- turn on `alpha-value-notation` with a primary and secondary option

```json
{
  "rules": {
    "block-no-empty": null,
    "unit-allowed-list": ["em", "rem", "%", "s"],
    "alpha-value-notation": ["percentage", { "exceptProperties": ["opacity"] }]
  }
}
```

Some rules accept regular expressions (regex) in the `"/regex/"` format. If you surround a string option with `"/"`, it'll be interpreted as a regex. For example, `"/.+/"` matches any string. You can specify a regex literal in JavaScript, such as `/.+/`, rather than a string with `"/"`.

The `"/regex/"` format is also available in some object keys. For example, when `{ "/^margin/": ["px"] }` is given, the key <example-value> `margin`, `margin-top`, `margin-inline`, etc.

The `*-pattern` rules translate the given string without `"/"` into a regex, like `"^foo"` into `new RegExp("^foo")`. In this case, you can directly specify a regex literal in JavaScript, such as `/^foo/`.

You can enforce these common cases:

- kebab-case: `^(a-z*)(-[a-z0-9]+)*$`
- lowerCamelCase: `^a-z+$`
- snake\_case: `^(a-z*)(_[a-z0-9]+)*$`
- UpperCamelCase: `^A-Z+$`

Or enforce a prefix using a positive lookbehind regex. For example, `(?<=foo-)` to prefix with `foo-`.

### `disableFix`

You can set the `disableFix` secondary option to disable autofix _on a per-rule basis_.

For example:

```json
{
  "rules": {
    "color-function-notation": ["modern", { "disableFix": true }]
  }
}
```

### `message`

You can use the `message` secondary option to deliver a custom message when a rule is violated.

For example, the following rule configuration would substitute in custom messages:

```json
{
  "rules": {
    "custom-property-pattern": [
      "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      {
        "message": "Expected custom property name to be kebab-case"
      }
    ]
  }
}
```

Some rules support message arguments. For example, the `color-no-hex` rule has one argument:

```js
export default {
  rules: {
    "color-no-hex": [
      true,
      {
        message: (hex) => `Don't use hex colors like "${hex}"`
      }
    ]
  }
};
```

And the `declaration-property-value-disallowed-list` rule has two:

```js
export default {
  rules: {
    "declaration-property-value-disallowed-list": [
      {
        "font-weight": ["normal", "bold"],
        "font-style": ["italic", "oblique"]
      },
      {
        message: (property, value) => {
          switch (property) {
            case "font-weight":
              return `Use "var(--font-weight-${value})" instead`;
            case "font-style":
              return `Use "class: 'italic'" instead`;
            default:
              return `Disallowed value "${value}" for property "${property}"`;
          }
        }
      }
    ]
  }
};
```

With config formats that don't support a function, like JSON, you can use a simplifed `printf`-like format (e.g., `%s`).

```json
{
  "rules": {
    "color-no-hex": [
      true,
      {
        "message": "Don't use hex colors like \"%s\""
      }
    ]
  }
}
```

With the JavaScript format, you can use both a `printf`-like format and a function.

Alternately, you can write a custom formatter for maximum control if you need serious customization.

### `url`

You can use the `url` secondary option to provide a custom link to external docs. These urls can then be displayed in custom formatters.

For example:

```json
{
  "rules": {
    "color-no-hex": [true, { "url": "https://example.org/your-custom-doc" }]
  }
}
```

### `reportDisables`

You can set the `reportDisables` secondary option to report any `stylelint-disable` comments for this rule, effectively disallowing authors to opt-out of it.

For example:

```json
{
  "rules": {
    "color-no-invalid-hex": [true, { "reportDisables": true }]
  }
}
```

The report is considered to be a lint error.

### `severity`

You can use the `severity` secondary option to adjust any specific rule's severity.

The available values for `severity` are:

- `"warning"`
- `"error"` (default)

For example:

```json
{
  "rules": {
    "number-max-precision": [
      2,
      {
        "ignoreUnits": ["em"],
        "severity": "warning"
      }
    ]
  }
}
```

Reporters may use these severity levels to display problems or exit the process differently.

Some rules support message arguments. For these rules, it is possible to use a function for `severity`, which would accept these arguments, allowing you to adjust the severity based on these arguments.

This function must return `"error"`, `"warning"`, or `null`. When it would return `null`, the `defaultSeverity` would be used.

For example, given:

```js
export default {
  rules: {
    "selector-disallowed-list": [
      ["a > .foo", "/\\[data-.+]/"],
      {
        severity: (selector) => {
          return selector.includes("a > .foo") ? "error" : "warning";
        }
      }
    ]
  }
};
```

The following pattern is reported as an error:

```css
a > .foo {}
```

But the following pattern would be reported as a warning:

```css
a[data-auto="1"] {}
```

## `languageOptions`

You can customize the syntax and specify the directionality.

### `syntax`

You can extend or modify the default CSS syntax to customize the following aspects:

- `atRules`: Define custom at-rules with specific `prelude` and `descriptors` syntax
- `cssWideKeywords`: Extend the list of CSS-wide keywords with custom values
- `properties`: Customize the syntax of specific properties
- `types`: Extend or modify type definitions used in property values
- `units`: Extend unit categories with custom units

This is used by rules, such as `declaration-property-value-no-unknown` and `at-rule-prelude-no-invalid`, when checking for unknown or invalid things.

```json
{
  "languageOptions": {
    "syntax": {
      "atRules": {
        "example": {
          "comment": "Example at-rule",
          "prelude": "<custom-ident>",
          "descriptors": {
            "foo": "<number>",
            "bar": "<color>"
          }
        }
      },
      "cssWideKeywords": ["my-global-value"],
      "properties": { "top": "| <--foo()>" },
      "types": { "--foo()": "--foo( <length-percentage> )" },
      "units": { "length": ["--foo"] }
    }
  },
  "rules": {
    "at-rule-descriptor-no-unknown": true,
    "at-rule-descriptor-value-no-unknown": true,
    "at-rule-prelude-no-invalid": true,
    "declaration-property-value-no-unknown": true
  }
}
```

#### `AtRules`

You can customize at-rules by defining their expected prelude and descriptors.
For example, to support a new at-rule `@foo` with specific descriptors:

```json
{
  "languageOptions": {
    "syntax": {
      "atRules": {
        "foo": {
          "prelude": "<custom-ident>",
          "descriptors": {
            "bar": "<number>",
            "baz": "<color>"
          }
        }
      }
    }
  }
}
```

When `at-rule-descriptor-no-unknown` is enabled, the following patterns are considered problems:

```css
@foo custom-ident { qux: 10; }
```

When `at-rule-descriptor-value-no-unknown` is enabled, the following patterns are considered problems:

```css
@foo custom-ident { bar: red; }
```

In both cases, the following pattern is _not_ considered a problem:

```css
@foo custom-ident { bar: 10; baz: red; }
```

#### `cssWideKeywords`

You can add custom global keywords that are accepted as valid property values.
For example, to add `-moz-initial` to the wide keywords:

```json
{
  "languageOptions": {
    "syntax": {
      "cssWideKeywords": ["-moz-initial"]
    }
  }
}
```

When `declaration-property-value-no-unknown` is enabled, the following patterns are considered problems:

```css
a { color: foo; }
```

The following patterns are _not_ considered problems:

```css
a { color: -moz-initial; }
```

#### `properties`

You can extend or modify the syntax for specific properties.
For example, to support a custom `foo` property that accepts `<color>` values:

```json
{
  "languageOptions": {
    "syntax": {
      "properties": { "foo": "<color>" }
    }
  }
}
```

When `declaration-property-value-no-unknown` is enabled, The following patterns are considered problems:

```css
a { foo: 10px; }
```

The following patterns are _not_ considered problems:

```css
a { foo: red; }
```

#### `types`

You can extend or modify the syntax for specific types.
For example, to support a new function `--foo()` that accepts `<length-percentage>` values and use it within the top property:

```json
{
  "languageOptions": {
    "syntax": {
      "types": { "--foo()": "--foo( <length-percentage> )" },
      "properties": { "top": "| <--foo()>" }
    }
  }
}
```

When `declaration-property-value-no-unknown` is enabled, the following patterns are considered problems:

```css
a { top: --foo(red); }
```

The following patterns are _not_ considered problems:

```css
a { top: --foo(10px); }
```

#### `units`

You can extend unit categories (`angle`, `decibel`, `flex`, `frequency`, `length`, `resolution`, `semitones`, and `time`) with custom units.
For example, to add a custom `--foo` unit to the `length` category:

```json
{
  "languageOptions": {
    "syntax": {
      "units": { "length": ["--foo"] }
    }
  }
}
```

When `declaration-property-value-no-unknown` is enabled, the following patterns are considered problems:

```css
a { top: 10--bar; }
```

The following patterns are _not_ considered problems:

```css
a { top: 10--foo; }
```

### `directionality`

Specify the direction of the block and inline axes. This is used by rules, such as `property-layout-mappings`, to provide direction-aware problem messages and autofixes.

You must specify both `block` and `inline`, and they must be on perpendicular axes:

- `top-to-bottom`
- `bottom-to-top`
- `left-to-right`
- `right-to-left`

For example, to configure for latin languages:

```json
{
  "languageOptions": {
    "directionality": {
      "block": "top-to-bottom",
      "inline": "left-to-right"
    }
  }
}
```

So that `margin-left` maps to `margin-inline-start`, and `margin-bottom` maps to `margin-block-end`.

For a right-to-left language, set `"inline": "right-to-left"`. The mapping changes: `margin-left` now maps to `margin-inline-end` instead.

## `referenceFiles`

You can specify reference files that provide additional information (like animations, custom properties, and custom media queries) that are useful to rules, such as those that check for unknown things like `no-unknown-custom-properties`.

For example:

```json
{
  "referenceFiles": "<example-value>"
}
```

For CSS bundles, you can specify a PostCSS plugin with the `loader` property:

```json
{
  "referenceFiles": {
    "files": "entrypoint.css",
    "loader": "postcss-import"
  }
}
```

Rules use the bundle's source order, including for the linted file when the bundle includes it.

For non-CSS files, you should use an object form with a `customSyntax` property:

```json
{
  "referenceFiles": {
    "files": "<example-value>",
    "customSyntax": "postcss-scss"
  }
}
```

You can also use an array to specify multiple entries:

```json
{
  "referenceFiles": [
    "<example-value>",
    {
      "files": ["<example-value>", "<example-value>"],
      "customSyntax": "postcss-scss"
    }
  ]
}
```

Each entry can be:

- a string or array of glob patterns specifying which files to parse
- an object that
  - must contain a `files` property (a string or an array of glob patterns)
  - may contain a `customSyntax` property
  - may contain a `loader` property (a PostCSS plugin to bundle CSS)

You can also use `referenceFiles` inside `overrides` to scope reference files to specific file patterns.
