---
title: "Configuration Migration Guide (part 1 of 3)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/configure/migration-guide.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}
{%- from 'components/npx_tabs.macro.html' import npx_tabs %}

This guide provides an overview of how you can migrate your ESLint configuration file from the eslintrc format (typically configured in `.eslintrc.js` or `.eslintrc.json` files) to the new flat config format (typically configured in an `eslint.config.js` file).

To learn more about the flat config format, refer to this blog post.

For reference information on flat configuration files, refer to flat configuration files.

## Migrate Your Config File

To get started, use the configuration migrator on your existing configuration file (`.eslintrc`, `.eslintrc.json`, `.eslintrc.yml`), like this:

{{ npx_tabs({
    package: "@eslint/migrate-config",
    args: [".eslintrc.json"]
}) }}

This will create a starting point for your `eslint.config.js` file but is not guaranteed to work immediately without further modification. It will, however, do most of the conversion work mentioned in this guide automatically.

**Important:**
The configuration migrator doesn't yet work well for `.eslintrc.js` files. If you are using `.eslintrc.js`, the migration results in a config file that matches the evaluated output of your configuration and won't include any functions, conditionals, or anything other than the raw data represented in your configuration.

## Start Using Flat Config Files

The flat config file format has been the default configuration file format since ESLint v9.0.0. You can start using the flat config file format without any additional configuration.

To use flat config with ESLint v8, place a `eslint.config.js` file in the root of your project **or** set the `ESLINT_USE_FLAT_CONFIG` environment variable to `true`.

## Things That Haven’t Changed between Configuration File Formats

While the configuration file format has changed from eslintrc to flat config, the following has stayed the same:

- Syntax for configuring rules.
- Syntax for configuring processors.
- The CLI, except for the flag changes noted in CLI Flag Changes.
- Global variables are configured the same way, but on a different property (see Configure Language Options).
