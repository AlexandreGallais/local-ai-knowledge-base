---
title: "Customizing"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/docs/user-guide/customize.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# Customizing

Stylelint is capable of so much more than what the standard config turns on. We recommend using it as a foundation and building on top of it.

## Built-in rules

The standard config turns on most of the built-in rules that avoid errors, but fewer than half of those that enforce conventions, as conventions are typically specific to you and your project.

### Avoid errors

You can catch unknown identifiers across files, such as animation names, custom properties, or custom media queries, by combining the `referenceFiles` configuration property with the `no-unknown-animations`, `no-unknown-custom-properties`, and `no-unknown-custom-media` rules:

```diff
 {
-  "extends": ["stylelint-config-standard"]
+  "extends": ["stylelint-config-standard"],
+  "referenceFiles": [
+    "<example-value>"
+  ],
+  "rules": {
+    "no-unknown-animations": true,
+    "no-unknown-custom-properties": true,
+    "no-unknown-custom-media": true
+  }
 }
```

### Enforce conventions

There are no rules for specific best practices, such as requiring relative units for font sizes, as best practices go out of date. Instead, you configure general rules with your own conventions.

You can enforce the use of custom properties. For example, if your `tokens.css` contains:

```css
:root {
  --color-text: oklch(20% 0 0);
  --spacing-m: 1rem;
  --radii-m: 2px;
}
```

And you want to:

- require custom properties for `<color>` and `<length>` values, except `0`, `transparent` and `currentcolor`
- allow only `--spacing-*` custom properties in `margin` and `padding` properties
- allow only `--radii-*` custom properties in the border radius properties

You can combine the `referenceFiles` configuration property with the `value-type-custom-property-required-list` and `declaration-property-custom-property-allowed-list` rules:

```diff
 {
-  "extends": ["stylelint-config-standard"]
+  "extends": ["stylelint-config-standard"],
+  "referenceFiles": ["<example-value>"],
+  "rules": {
+    "declaration-property-custom-property-allowed-list": {
+      "/^(margin|padding)/": ["/^--spacing-/"],
+      "/radius$/": ["/^--radii-/"]
+    },
+    "value-type-custom-property-required-list": [
+      ["color", "length"],
+      { "ignoreValues": ["0", "transparent", "currentcolor"] }
+    ]
+  }
 }
```

Given:

```css
a {
  border-radius: var(--spacing-m);
  color: red;
}
```

`--spacing-m` is reported by `declaration-property-custom-property-allowed-list` because it isn't a `--radii-*` custom property, and `red` by `value-type-custom-property-required-list` because it isn't a custom property.

Many of the other rules allow you to:

- ensure even more consistency by disallowing things
- manage complexity in your code by setting limits

For example, if you only want to allow:

- `%`, `deg`, `px`, `rem`, `ms` units generally
- `px` for borders
- `rem` for paddings and gaps

You can use the `unit-allowed-list` and `declaration-property-unit-allowed-list` rules:

```diff
 {
-  "extends": ["stylelint-config-standard"]
+  "extends": ["stylelint-config-standard"],
+  "rules": {
+    "declaration-property-unit-allowed-list": {
+      "/^border/": ["px"],
+      "/^padding|^gap/": ["rem"]
+    },
+    "unit-allowed-list": ["%", "deg", "px", "rem", "ms"]
+  }
 }
```

Or you can enforce the `oklch()` color notation using the `color-named`, `color-no-hex`, and `function-disallowed-list` rules:

```diff
 {
-  "extends": ["stylelint-config-standard"]
+  "extends": ["stylelint-config-standard"],
+  "rules": {
+    "color-named": "never",
+    "color-no-hex": true,
+    "function-disallowed-list": ["rgb", "hsl", "hwb", "lch"]
+  }
 }
```

Or you can limit the number of ID selectors using the `selector-max-id` rule:

```diff
 {
-  "extends": ["stylelint-config-standard"]
+  "extends": ["stylelint-config-standard"],
+  "rules": {
+    "selector-max-id": 0
+  }
 }
```

#### Subsets of files

You can apply rules to a subset of files using the `overrides` configuration property.

For example, to disallow:

- class selectors in `tokens.css`
- type selectors in components

You can use the `selector-max-class` and `selector-max-type` rules:

```diff
 {
-  "extends": ["stylelint-config-standard"]
+  "extends": ["stylelint-config-standard"],
+  "overrides": [
+    {
+      "files": ["<example-value>"],
+      "rules": {
+        "selector-max-class": 0
+      }
+    },
+    {
+      "files": ["components/**/*.css"],
+      "rules": {
+        "selector-max-type": 0
+      }
+    }
+  ]
 }
```

These are just some of the things you can do with the built-in rules. It's possible to configure them to enforce strict conventions and keep your CSS consistent and under control.

## Custom rules

In addition to the built-in rules, there are custom rules that you can plug into Stylelint.

Custom rules are typically written by communities to support methodologies, toolsets, non-standard CSS features, or very specific use cases.

You can add custom rules to your config by extending a shared config that includes them or by using a plugin directly. For example, you can order your properties into groups by extending the recess order config:

```diff
 {
   "extends": [
-    "stylelint-config-standard"
+    "stylelint-config-standard",
+    "stylelint-config-recess-order"
   ]
 }
```

Or alphabetize them by extending the alphabetical order config:

```diff
 {
   "extends": [
-    "stylelint-config-standard"
+    "stylelint-config-standard",
+    "stylelint-config-alphabetical-order"
   ]
 }
```

Or you can use the order plugin directly if, for example, you want to specify your own order:

```diff
 {
-  "extends": ["stylelint-config-standard"]
+  "extends": ["stylelint-config-standard"],
+  "plugins": ["stylelint-order"],
+  "rules": {
+    "order/properties-order": [
+      "transform",
+      "top",
+      "color"
+    ]
+  }
 }
```

Custom rules do all sorts; from helping you use Baseline effectively to strict scales for numeric values. You'll find more shared configs and plugins of custom rules listed in Awesome Stylelint.

You can also write your own custom rules within a plugin. This is particularly useful if you have specific needs or conventions you want to enforce.

## Strictness

We recommend you craft a config that strictly enforces your conventions, add `overrides` for the ones that apply to only some files, and then use configuration comments to disable specific rules when needed.

You can use the `report*` properties in your config to ensure your comments aren't useless and descriptionless:

```diff
 {
-  "extends": ["stylelint-config-standard"]
+  "extends": ["stylelint-config-standard"],
+  "reportDescriptionlessDisables": true,
+  "reportInvalidScopeDisables": true,
+  "reportNeedlessDisables": true
 }
```

Each of these properties is configurable if you need to add exceptions to them.

You can also use the `reportDisables` secondary property to disallow disables on a per-rule basis.

## Using Stylelint

You can use our Visual Studio Code extension, or one of the other integrations listed in Awesome Stylelint, to get instant feedback in your code editor. This is the quickest way to see and resolve problems.

You don't have to use the CLI either; we also provide a Node.js API, or you can use one of the other integrations or task runners listed in Awesome Stylelint.

Whichever you choose, there are many options in Stylelint that you can use to customize how Stylelint works. For example, you'll likely want to use the `--fix` option to automatically fix as many problems as possible:

```shell
stylelint "**/*.css" --fix
```

You may also want to look into the:

- `--cache` option to improve performance
- `--formatter` option to customize the output
