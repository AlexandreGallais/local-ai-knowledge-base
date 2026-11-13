---
title: "The Angular CLI"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/cli/overview.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# The Angular CLI

The Angular CLI is a command-line interface tool which allows you to scaffold, develop, test, deploy, and maintain Angular applications directly from a command shell.

Angular CLI is published on npm as the `@angular/cli` package and includes a binary named `ng`. Commands invoking `ng` are using the Angular CLI.

**Try Angular without local setup**

If you are new to Angular, you might want to start with Try it now!, which introduces the essentials of Angular in the context of a ready-made basic online store app for you to examine and modify.
This standalone tutorial takes advantage of the interactive StackBlitz environment for online development.
You don't need to set up your local environment until you're ready.

  **Getting Started**
    Install Angular CLI to create and build your first app.

  **Command Reference**
    Discover CLI commands to make you more productive with Angular.

  **Schematics**
    Create and run schematics to generate and modify source files in your application automatically.

  **Builders**
    Create and run builders to perform complex transformations from your source code to generated build outputs.

## CLI command-language syntax

Angular CLI roughly follows Unix/POSIX conventions for option syntax.

### Boolean options

Boolean options have two forms: `--this-option` sets the flag to `true`, `--no-this-option` sets it to `false`.
You can also use `--this-option=false` or `--this-option=true`.
If neither option is supplied, the flag remains in its default state, as listed in the reference documentation.

### Array options

Array options can be provided in two forms: `--option value1 value2` or `--option value1 --option value2`.

### Key/value options

Some options like `--define` expect an array of `key=value` pairs as their values.
Just like array options, key/value options can be provided in two forms:
`--define 'KEY_1="value1"' KEY_2=true` or `--define 'KEY_1="value1"' --define KEY_2=true`.

### Relative paths

Options that specify files can be given as absolute paths, or as paths relative to the current working directory, which is generally either the workspace or project root.
