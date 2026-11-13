---
title: "Creating libraries (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/libraries/creating-libraries.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Creating libraries (part 2 of 2)

## Using your own library in applications

You don't have to publish your library to the npm package manager to use it in the same workspace, but you do have to build it first.

To use your own library in an application:

- Build the library.
  You cannot use a library before it is built.

```shell
  ng build my-lib
```

- In your applications, import from the library by name:

```ts
import {myExport} from 'my-lib';
```

### Building and rebuilding your library

The build step is important if you haven't published your library as an npm package and then installed the package back into your application from npm.
For instance, if you clone your git repository and run `npm install`, your editor shows the `my-lib` imports as missing if you haven't yet built your library.

HELPFUL: When you import something from a library in an Angular application, Angular looks for a mapping between the library name and a location on disk.
When you install a library package, the mapping is in the `node_modules` folder.
When you build your own library, it has to find the mapping in your `tsconfig` paths.

Generating a library with the Angular CLI automatically adds its path to the `tsconfig` file.
The Angular CLI uses the `tsconfig` paths to tell the build system where to find the library.

For more information, see Path mapping overview.

You can rebuild your library whenever you make changes to it, but this extra step takes time.
_Incremental builds_ functionality improves the library-development experience.
Every time a file is changed a partial build is performed that emits the amended files.

Incremental builds can be run as a background process in your development environment.
To take advantage of this feature add the `--watch` flag to the build command:

```shell

ng build my-lib --watch

```

IMPORTANT: The CLI `build` command uses a different builder and invokes a different build tool for libraries than it does for applications.

- The build system for applications, `@angular/build`, is based on `esbuild`, and is included in all new Angular CLI projects
- The build system for libraries is based on `ng-packagr`.
  It is only added to your dependencies when you add a library using `ng generate library my-lib`.

The two build systems support different things, and even where they support the same things, they do those things differently.
This means that the TypeScript source can result in different JavaScript code in a built library than it would in a built application.

For this reason, an application that depends on a library should only use TypeScript path mappings that point to the _built library_.
TypeScript path mappings should _not_ point to the library source `.ts` files.

### Linking libraries for local development

This section explains how to use your package manager's local linking feature
(such as `npm link` or `pnpm link`) to test a standalone Angular library with an external application during
local development, without relying on the monorepo workspace structure or publishing to the npm registry.

NOTE: If your library and application are in the same Angular workspace (a monorepo setup), the standard monorepo workflow automatically handles the linking and is generally more efficient. This local linking approach is best when:

- You are developing a standalone library and need to test changes with an external, consuming application.
- You are testing library changes in a consuming application outside the monorepo workspace.

#### Configuring the consuming application

To use linked libraries, you need to configure your application's `angular.json` file with the following settings:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "preserveSymlinks": true
          },
          "configurations": {
            "development": {
              "sourceMap": {
                "scripts": true,
                "styles": true,
                "vendor": true
              }
            }
          }
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "options": {
            "prebundle": {
              "exclude": ["my-lib"]
            }
          }
        }
      }
    }
  }
}
```

**Configuration options explained:**

- `preserveSymlinks: true`: Instructs the build system to follow the symlinks created by your package manager's linking command instead of resolving to the symlink's original location. This is essential to avoid multiple copies of the dependent node packages.
- `sourceMap.vendor`: Enabling vendor source maps (especially `vendor: true`) for easier debugging of linked library code.
- `prebundle.exclude`: By default, the Angular CLI can pre-bundle all node dependencies. Excluding your library ensures that the linked source code is properly watched and rebuilt when changes occur.

## Publishing libraries

There are two distribution formats to use when publishing a library:

| Distribution formats        | Details                                                                                                                                                                                                                                                                                                                                  |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Partial-Ivy \(recommended\) | Contains portable code that can be consumed by Ivy applications built with any version of Angular from v12 onwards.                                                                                                                                                                                                                      |
| Full-Ivy                    | Contains private Angular Ivy instructions, which are not guaranteed to work across different versions of Angular. This format requires that the library and application are built with the _exact_ same version of Angular. This format is useful for environments where all library and application code is built directly from source. |

For publishing to npm use the partial-Ivy format as it is stable between patch versions of Angular.

Avoid compiling libraries with full-Ivy code if you are publishing to npm because the generated Ivy instructions are not part of Angular's public API, and so might change between patch versions.

## Ensuring library version compatibility

The Angular version used to build an application should always be the same or greater than the Angular versions used to build any of its dependent libraries.
For example, if you had a library using Angular version 13, the application that depends on that library should use Angular version 13 or later.
Angular does not support using an earlier version for the application.

If you intend to publish your library to npm, compile with partial-Ivy code by setting `"compilationMode": "partial"` in `tsconfig.prod.json`.
This partial format is stable between different versions of Angular, so is safe to publish to npm.
Code with this format is processed during the application build using the same version of the Angular compiler, ensuring that the application and all of its libraries use a single version of Angular.

Avoid compiling libraries with full-Ivy code if you are publishing to npm because the generated Ivy instructions are not part of Angular's public API, and so might change between patch versions.

If you've never published a package in npm before, you must create a user account.
Read more in Publishing npm Packages.

## Consuming partial-Ivy code outside the Angular CLI

An application installs many Angular libraries from npm into its `node_modules` directory.
However, the code in these libraries cannot be bundled directly along with the built application as it is not fully compiled.
To finish compilation, use the Angular linker.

For applications that don't use the Angular CLI, the linker is available as a Babel plugin.
The plugin is to be imported from `@angular/compiler-cli/linker/babel`.

The Angular linker Babel plugin supports build caching, meaning that libraries only need to be processed by the linker a single time, regardless of other npm operations.

Example of integrating the plugin into a custom webpack build by registering the linker as a Babel plugin using babel-loader.

File: `webpack.config.mjs`

```js
import linkerPlugin from '@angular/compiler-cli/linker/babel';

export default {
```

HELPFUL: The Angular CLI integrates the linker plugin automatically, so if consumers of your library are using the CLI, they can install Ivy-native libraries from npm without any additional configuration.
