---
title: "Creating libraries (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/libraries/creating-libraries.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Creating libraries

This page provides a conceptual overview of how to create and publish new libraries to extend Angular functionality.

If you find that you need to solve the same problem in more than one application \(or want to share your solution with other developers\), you have a candidate for a library.
A simple example might be a button that sends users to your company website, that would be included in all applications that your company builds.

## Getting started

Use the Angular CLI to generate a new library skeleton in a new workspace with the following commands.

```shell

ng new my-workspace --no-create-application
cd my-workspace
ng generate library my-lib

```

**Naming your library**

You should be very careful when choosing the name of your library if you want to publish it later in a public package registry such as npm.
See Publishing your library.

Avoid using a name that is prefixed with `ng-`, such as `ng-library`.
The `ng-` prefix is a reserved keyword used by the Angular framework and its libraries.
The `ngx-` prefix is preferred as a convention used to denote that the library is suitable for use with Angular.
It is also an excellent indication to consumers of the registry to differentiate between libraries of different JavaScript frameworks.

The `ng generate` command creates the `projects/my-lib` folder in your workspace, which contains a component.

HELPFUL: For more details on how a library project is structured, refer to the Library project files section of the Project File Structure guide.

Use the monorepo model to use the same workspace for multiple projects.
See Setting up for a multi-project workspace.

When you generate a new library, the workspace configuration file, `angular.json`, is updated with a project of type `library`.

```json

"projects": {
  …
  "my-lib": {
    "root": "projects/my-lib",
    "sourceRoot": "projects/my-lib/src",
    "projectType": "library",
    "prefix": "lib",
    "architect": {
      "build": {
        "builder": "@angular/build:ng-packagr",
        …

```

Build, test, and lint the project with CLI commands:

```shell

ng build my-lib --configuration development
ng test my-lib
ng lint my-lib

```

Notice that the configured builder for the project is different from the default builder for application projects.
This builder, among other things, ensures that the library is always built with the AOT compiler.

To make library code reusable you must define a public API for it.
This "user layer" defines what is available to consumers of your library.
A user of your library should be able to access public functionality \(such as service providers and general utility functions\) through a single import path.

The public API for your library is maintained in the `public-api.ts` file in your library folder.
Anything exported from this file is made public when your library is imported into an application.

Your library should supply documentation \(typically a README file\) for installation and maintenance.

## Entry points

An _entry point_ is a module specifier that consumers import from, together with the public API that specifier exposes.
Every library has one _primary entry point_, and can add any number of _secondary entry points_.

The primary entry point is the package itself.
The `ng-package.json` file at the root of the library configures it, and `lib.entryFile` names the file that defines its public API.

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/my-lib",
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}
```

Consumers import the primary entry point by the package name:

```ts
import {ThemeService} from 'my-lib';
```

A secondary entry point is a directory inside the library with its own `ng-package.json` file.
The path of that directory relative to the library root defines the import subpath.
For example, a `button` directory makes `my-lib/button` available to consumers:

```ts
import {ButtonComponent} from 'my-lib/button';
```

Angular packages use this same structure.
For example, `@angular/core` is the primary entry point and `@angular/core/testing` is a secondary entry point of the same package.

HELPFUL: For an architectural overview of how entry points enable code splitting and define chunk boundaries in the Angular Package Format, see Entrypoints and code splitting.

### Adding a secondary entry point

Create a directory inside the library with its own `ng-package.json` and public API file:

```text
projects/my-lib/
├── ng-package.json      (primary entry point: my-lib)
├── package.json
├── src/
│   ├── public-api.ts
│   └── lib/ …
└── button/
    ├── ng-package.json  (secondary entry point: my-lib/button)
    └── src/
        ├── public-api.ts
        └── button.ts
```

The secondary `ng-package.json` configures only the entry point itself:

```json
{
  "$schema": "../../../node_modules/ng-packagr/ng-entrypoint.schema.json",
  "lib": {
    "entryFile": "src/public-api.ts"
  }
}
```

IMPORTANT: A secondary `ng-package.json` accepts only the `lib` options. Package-wide options such as `dest` and `assets` belong in the `ng-package.json` at the library root and apply to every entry point.

You do not need to register the secondary entry point anywhere else.
During the build, `ng-packagr` automatically discovers every `ng-package.json` under the library root and derives the import subpath from its directory path (for example, `button/` becomes `my-lib/button` and `testing/harness/` becomes `my-lib/testing/harness`).

To import a secondary entry point from an application in the same workspace, add a wildcard path mapping in the workspace `tsconfig.json`.
By default, `ng generate library` maps only the package root, which does not cover subpaths:

```json
{
  "compilerOptions": {
    "paths": {
      "my-lib": ["./dist/my-lib"],
      "my-lib/*": ["./dist/my-lib/*"]
    }
  }
}
```

IMPORTANT: When importing code from another entry point in the same library, always use its package import path (for example, `import {ThemeService} from 'my-lib'`) instead of a relative path. `ng-packagr` builds each entry point separately in dependency order, so relative imports across entry points and circular dependencies between entry points will fail the build.

## Refactoring parts of an application into a library

To make your solution reusable, you need to adjust it so that it does not depend on application-specific code.
Here are some things to consider in migrating application functionality to a library.

- Declarations such as components and pipes should be designed as stateless, meaning they don't rely on or alter external variables.
  If you do rely on state, you need to evaluate every case and decide whether it is application state or state that the library would manage.

- Any observables that the components subscribe to internally should be cleaned up and disposed of during the lifecycle of those components
- Components should expose their interactions through inputs for providing context, and outputs for communicating events to other components

- Check all internal dependencies.
  - For custom classes or interfaces used in components or service, check whether they depend on additional classes or interfaces that also need to be migrated
  - Similarly, if your library code depends on a service, that service needs to be migrated
  - If your library code or its templates depend on other libraries \(such as Angular Material, for instance\), you must configure your library with those dependencies

- Consider how you provide services to client applications.
  - Services should declare their own providers, rather than declaring providers in the NgModule or a component.
    Declaring a provider makes that service _tree-shakable_.
    This practice lets the compiler leave the service out of the bundle if it never gets injected into the application that imports the library.
    For more about this, see Tree-shakable providers.

  - If you register global service providers expose a `provideXYZ()` provider function.
  - If your library provides optional services that might not be used by all client applications, support proper tree-shaking for that case by using the lightweight token <example-value> pattern

## Integrating with the CLI using code-generation schematics

A library typically includes _reusable code_ that defines components, services, and other Angular artifacts \(pipes, directives\) that you import into a project.
A library is packaged into an npm package for publishing and sharing.
This package can also include schematics that provide instructions for generating or transforming code directly in your project, in the same way that the CLI creates a generic new component with `ng generate component`.
A schematic that is packaged with a library can, for example, provide the Angular CLI with the information it needs to generate a component that configures and uses a particular feature, or set of features, defined in that library.
One example of this is Angular Material's navigation schematic which configures the CDK's BreakpointObserver and uses it with Material's MatSideNav and MatToolbar components.

Create and include the following kinds of schematics:

- Include an installation schematic so that `ng add` can add your library to a project
- Include generation schematics in your library so that `ng generate` can scaffold your defined artifacts \(components, services, tests\) in a project
- Include an update schematic so that `ng update` can update your library's dependencies and provide migrations for breaking changes in new releases

What you include in your library depends on your task.
For example, you could define a schematic to create a dropdown that is pre-populated with canned data to show how to add it to an application.
If you want a dropdown that would contain different passed-in values each time, your library could define a schematic to create it with a given configuration.
Developers could then use `ng generate` to configure an instance for their own application.

Suppose you want to read a configuration file and then generate a form based on that configuration.
If that form needs additional customization by the developer who is using your library, it might work best as a schematic.
However, if the form will always be the same and not need much customization by developers, then you could create a dynamic component that takes the configuration and generates the form.
In general, the more complex the customization, the more useful the schematic approach.

For more information, see Schematics Overview and Schematics for Libraries.

## Publishing your library

Use the Angular CLI and the npm package manager to build and publish your library as an npm package.

Angular CLI uses a tool called ng-packagr to create packages from your compiled code that can be published to npm.
See Building libraries with Ivy for information on the distribution formats supported by `ng-packagr` and guidance on how
to choose the right format for your library.

You should always build libraries for distribution using the `production` configuration.
This ensures that generated output uses the appropriate optimizations and the correct package format for npm.

```shell

ng build my-lib
cd dist/my-lib
npm publish

```

## Managing assets in a library

In your Angular library, the distributable can include additional assets like theming files, Sass mixins, or documentation \(like a changelog\).
For more information copy assets into your library as part of the build and embed assets in component styles.

IMPORTANT: When including additional assets like Sass mixins or pre-compiled CSS.
You need to add these manually to the conditional "exports" in the `package.json` of the primary entrypoint.

`ng-packagr` will merge handwritten `"exports"` with the auto-generated ones, allowing for library authors to configure additional export subpaths, or custom conditions.

```json

"exports": {
  ".": {
    "sass": "./_index.scss",
  },
  "./theming": {
    "sass": "./_theming.scss"
  },
  "./prebuilt-themes/indigo-pink.css": {
    "style": "./prebuilt-themes/indigo-pink.css"
  }
}

```

The above is an extract from the @angular/material distributable.

## Peer dependencies

Angular libraries should list any `@angular/*` dependencies the library depends on as peer dependencies.
This ensures that when modules ask for Angular, they all get the exact same module.
If a library lists `@angular/core` in `dependencies` instead of `peerDependencies`, it might get a different Angular module instead, which would cause your application to break.
