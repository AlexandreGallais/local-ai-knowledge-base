---
title: "Configure ESLint"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/configure/index.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Configure ESLint

ESLint is designed to be flexible and configurable for your use case. You can turn off every rule and run only with basic <example-value> validation or mix and match the bundled rules and your custom rules to fit the needs of your project. There are two primary ways to configure ESLint:

1. **Configuration Comments** - use JavaScript comments to embed configuration information directly into a file.
2. **Configuration Files** - use a JavaScript file to specify configuration information for an entire directory and all of its subdirectories. This can be in the form of an `eslint.config.js` file which ESLint will look for and read automatically, or you can specify a configuration file on the command line.

Here are some of the options that you can configure in ESLint:

- **Globals** - the additional global variables your script accesses during execution.
- **Rules** - which rules are enabled and at what error level.
- **Plugins** - which third-party plugins define additional rules, languages, configs, etc. for ESLint to use.

All of these options give you fine-grained control over how ESLint treats your code.

## Table of Contents

**Configuration Files**

- Configuration File Format
- Configuration Objects
- Configure Shared Settings
- Configuration File Resolution

**Configure Language Options**

- Specify JavaScript Options
- Specify Globals

**Configure Rules**

- Configure Rules
- Disable Rules

**Configure Plugins**

- Configure Plugins
- Specify a Processor

**Configure a Parser**

- Configure a Custom Parser

**Ignore Files**

- Ignore Files
- Ignore Directories
- Unignore Files and Directories
- Ignored File Warnings
