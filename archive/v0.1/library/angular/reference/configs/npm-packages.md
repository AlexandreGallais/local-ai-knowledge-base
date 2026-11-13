---
title: "Workspace npm dependencies"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/reference/configs/npm-packages.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Workspace npm dependencies

The Angular Framework, Angular CLI, and components used by Angular applications are packaged as npm packages and distributed using the npm registry.

You can download and install these npm packages by using the npm CLI client.
By default, Angular CLI uses the npm client.

HELPFUL: See Local Environment Setup for information about the required versions and installation of `Node.js` and `npm`.

If you already have projects running on your machine that use other versions of Node.js and npm, consider using nvm to manage the multiple versions of Node.js and npm.

## `package.json`

`npm` installs the packages identified in a `package.json` file.

The CLI command `ng new` creates a `package.json` file when it creates the new workspace.
This `package.json` is used by all projects in the workspace, including the initial application project that is created by the CLI when it creates the workspace.
Libraries created with `ng generate library` will include their own `package.json` file.

Initially, this `package.json` includes _a starter set of packages_, some of which are required by Angular and others that support common application scenarios.
You add packages to `package.json` as your application evolves.

## Default Dependencies

The following Angular packages are included as dependencies in the default `package.json` file for a new Angular workspace.
For a complete list of Angular packages, see the API reference.

| Package name                                                     | Details                                                                                                                                                                                        |
| :--------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@angular/common`                          | The commonly-needed services, pipes, and directives provided by the Angular team.                                                                                                              |
| `@angular/compiler`                                              | Angular's template compiler. It understands Angular templates and can convert them to code that makes the application run.                                                                     |
| `@angular/compiler-cli`                                          | Angular's compiler which is invoked by the Angular CLI's `ng build` and `ng serve` commands. It processes Angular templates with `@angular/compiler` inside a standard TypeScript compilation. |
| `@angular/core`                              | Critical runtime parts of the framework that are needed by every application. Includes all metadata decorators such as `@Component`, dependency injection, and component lifecycle hooks.      |
| `@angular/forms`                            | Support for both template-driven and reactive forms. See Introduction to forms.                                                    |
| `@angular/platform-browser`      | Everything DOM and browser related, especially the pieces that help render into the DOM.                                                                                                       |
| `@angular/router`                          | The router module navigates among your application pages when the browser URL changes. For more information, see Routing and Navigation.                                      |
| `@angular/cli`         | Contains the Angular CLI binary for running `ng` commands.                                                                                                                                     |
| `@angular/build` | Contains default CLI builders for bundling, testing, and serving Angular applications and libraries.                                                                                           |
| `rxjs`                     | A library for reactive programming using `Observables`.                                                                                                                                        |
| `typescript`         | The TypeScript compiler, language server, and built-in type definitions.                                                                                                                       |
