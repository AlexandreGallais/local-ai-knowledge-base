---
title: "Customizing"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/docs/user-guide/customize.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# Customizing

The standard config turns on about half of the built-in rules. Stylelint is capable of so much more. We recommend using the standard config as a foundation and building on top of it.

You can catch unknown identifiers across files, such as animation names, custom properties, or custom media queries, by combining the `referenceFiles` configuration property with the `no-unknown-animations`, `no-unknown-custom-properties`, and `no-unknown-custom-media` rules:

```diff
{
  "extends": ["stylelint-config-standard"],
+ "referenceFiles": [
+   "<example-value>"
+ ],
+ "rules": {
+   "no-unknown-animations": true,
+   "no-unknown-custom-properties": true,
+   "no-unknown-custom-media": true
+ }
}
```

Many of the other rules allow you to:

- ensure even more consistency by disallowing things
- manage complexity in your code by setting limits

These conventions are typically specific to you and your project.

For example, if you only want to allow:

- `%`, `deg`, `px`, `rem`, `ms` units generally
- `px` for borders
- `rem` for paddings and gaps

You can use the `unit-allowed-list` and `declaration-property-unit-allowed-list` rules:

```diff
{
  "extends": ["stylelint-config-standard"],
+ "rules": {
+   "declaration-property-unit-allowed-list": {
+     "/^border/": ["px"],
+     "/^padding|^gap/": ["rem"]
+   },
+   "unit-allowed-list": ["%", "deg", "px", "rem", "ms"]
+ }
}
```

Or you can enforce the `oklch()` color notation using the `color-named`, `color-no-hex`, and `function-disallowed-list` rules:

```diff
{
  "extends": ["stylelint-config-standard"],
+ "rules": {
+   "color-named": "never",
+   "color-no-hex": true,
+   "function-disallowed-list": ["rgb", "hsl", "hwb", "lch"]
+ }
}
```

Or you can limit the number of ID selectors using the `selector-max-id` rule:

```diff
{
  "extends": ["stylelint-config-standard"],
+ "rules": {
+   "selector-max-id": 0
+ }
}
```

These are just some of the things you can do with the built-in rules. It's possible to configure them to enforce strict conventions and keep your CSS under control.

## Custom rules

In addition to the built-in rules, there are custom rules that you can plug into Stylelint.

Custom rules are typically written by communities to support methodologies, toolsets, non-standard CSS features, or very specific use cases.

You can add custom rules to your config by extending a shared config that includes them or by using a plugin directly. For example, you can order your properties into groups by extending the recess order config:

```diff
{
  "extends": [
-   "stylelint-config-standard"
+   "stylelint-config-standard",
+   "stylelint-config-recess-order"
  ]
}
```

Or alphabetize them by extending the alphabetical order config:

```diff
{
  "extends": [
-   "stylelint-config-standard"
+   "stylelint-config-standard",
+   "stylelint-config-alphabetical-order"
  ]
}
```

Or you can use the order plugin directly if, for example, you want to specify your own order:

```diff
{
  "extends": ["stylelint-config-standard"],
+ "plugins": ["stylelint-order"],
+ "rules": {
+   "order/properties-order": [
+     "transform",
+     "top",
+     "color"
+   ]
+ }
}
```

Custom rules do all sorts; from helping you use Baseline effectively to strict scales for numeric values. You'll find more shared configs and plugins of custom rules listed in Awesome Stylelint.

You can also write your own custom rules within a plugin. This is particularly useful if you have specific needs or conventions you want to enforce.

## Strictness

We recommend you craft a config that strictly enforces your conventions and then use configuration comments to disable specific rules when needed. You needn't shy away from using them as they are an integral part of Stylelint.

You can use the `report*` properties in your config to ensure your comments aren't useless and descriptionless:

```diff
{
  "extends": ["stylelint-config-standard"],
+ "reportDescriptionlessDisables": true,
+ "reportInvalidScopeDisables": true,
+ "reportNeedlessDisables": true
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
