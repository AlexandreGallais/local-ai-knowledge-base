---
title: "Angular application build system (part 1 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/cli/build-system-migration.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Angular application build system

In v17 and higher, the new build system provides an improved way to build Angular applications. This new build system includes:

- A modern output format using ESM, with dynamic import expressions to support lazy module loading.
- Faster build-time performance for both initial builds and incremental rebuilds.
- Newer JavaScript ecosystem tools such as esbuild and Vite.
- Integrated SSR and prerendering capabilities.
- Automatic global and component stylesheet hot replacement.

This new build system is stable and fully supported for use with Angular applications.
You can migrate to the new build system with applications that use the `browser` builder.
If using a custom builder, please refer to the documentation for that builder on possible migration options.

IMPORTANT: The existing webpack-based build system and `browser` builder are deprecated.
Applications can temporarily continue to use the `browser` builder and projects can opt-out of migrating during an update, but the Angular team recommends migrating to the new build system.

## For new applications

New applications will use this new build system by default via the `application` builder.

## For existing applications

Both automated and manual procedures are available depending on the requirements of the project.
Since v18, the update process to a new major version asks if you would like to migrate existing applications to use the new build system via the automated migration.
Prior to migrating, please consider reviewing the Known Issues section as it may contain relevant information for your project.

HELPFUL: Remember to remove any CommonJS assumptions in the application server code if using SSR such as `require`, `__filename`, `__dirname`, or other constructs from the CommonJS module scope. All application code should be ESM compatible. This does not apply to third-party dependencies.

### Automated migration (Recommended)

The automated migration will adjust both the application configuration within `angular.json` as well as code and stylesheets to remove previous webpack-specific feature usage.
While many changes can be automated and most applications will not require any further changes, each application is unique and there may be some manual changes required.
After the migration, please attempt a build of the application as there could be new errors that will require adjustments within the code.
The errors will attempt to provide solutions to the problem when possible and the later sections of this guide describe some of the more common situations that you may encounter.
When updating to a new major version via `ng update`, you will be asked to execute the migration.
This migration is entirely optional and can also be run manually at anytime after an update via the following command:

```shell

ng update @angular/cli --name use-application-builder

```

The migration does the following:

- Converts existing `browser` or `browser-esbuild` target to `application`
- Removes any previous SSR builders (because `application` does that now).
- Updates configuration accordingly.
- Merges `tsconfig.server.json` with `tsconfig.app.json` and adds the TypeScript option `"esModuleInterop": true` to ensure `express` imports are ESM compliant.
- Updates application server code to use new bootstrapping and output directory structure.
- Removes any webpack-specific builder stylesheet usage such as the tilde or caret in `@import`/`url()` and updates the configuration to provide equivalent behavior
- Converts to use the new lower dependency `@angular/build` Node.js package if no other `@angular-devkit/build-angular` usage is found.

### Manual migration

Additionally for existing projects, you can manually opt-in to use the new builder on a per-application basis with two different options.
Both options are considered stable and fully supported by the Angular team.
The choice of which option to use is a factor of how many changes you will need to make to migrate and what new features you would like to use in the project.

- The `browser-esbuild` builder builds only the client-side bundle of an application designed to be compatible with the existing `browser` builder that provides the preexisting build system.
  This builder provides equivalent build options, and in many cases, it serves as a drop-in replacement for existing `browser` applications.
- The `application` builder covers an entire application, such as the client-side bundle, as well as optionally building a server for server-side rendering and performing build-time prerendering of static pages.

The `application` builder is generally preferred as it improves server-side rendered (SSR) builds, and makes it easier for client-side rendered projects to adopt SSR in the future.
However it requires a little more migration effort, particularly for existing SSR applications if performed manually.
If the `application` builder is difficult for your project to adopt, `browser-esbuild` can be an easier solution which gives most of the build performance benefits with fewer breaking changes.

#### Manual migration to the compatibility builder

A builder named `browser-esbuild` is available within the `@angular-devkit/build-angular` package that applications using the `browser` builder already depend on.
You can try out the new build system for applications that use the `browser` builder.
If using a custom builder, please refer to the documentation for that builder on possible migration options.

The compatibility option was implemented to minimize the amount of changes necessary to initially migrate your applications.
This is provided via an alternate builder (`browser-esbuild`).
You can update the `build` target for any application target to migrate to the new build system.

The following is what you would typically find in `angular.json` for an application:

```json
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
...
```

Changing the `builder` field is the only change you will need to make.

```json
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser-esbuild",
...
```

#### Manual migration to the new `application` builder

A builder named `application` is also available within the `@angular-devkit/build-angular` package.
New applications created via `ng new` use the same builder from the `@angular/build` package (`@angular/build:application`).

The following is what you would typically find in `angular.json` for an application:

```json
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
...
```

Changing the `builder` field is the first change you will need to make.

```json
...
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:application",
...
```

Once the builder name has been changed, options within the `build` target will need to be updated.
The following list discusses all the `browser` builder options that will need to be adjusted.

- `main` should be renamed to `browser`.
- `polyfills` should be an array, rather than a single file.
- `buildOptimizer` should be removed, as this is covered by the `optimization` option.
- `resourcesOutputPath` should be removed, this is now always `media`.
- `vendorChunk` should be removed, as this was a performance optimization which is no longer needed.
- `commonChunk` should be removed, as this was a performance optimization which is no longer needed.
- `ngswConfigPath` should be renamed to `serviceWorker`.

If the application is not using SSR currently, this should be the final step to allow `ng build` to function.
After executing `ng build` for the first time, there may be new warnings or errors based on behavioral differences or application usage of webpack-specific features.
Many of the warnings will provide suggestions on how to remedy that problem.
If it appears that a warning is incorrect or the solution is not apparent, please open an issue on GitHub.
Also, the later sections of this guide provide additional information on several specific cases as well as current known issues.

For applications new to SSR, the Angular SSR Guide provides additional information regarding the setup process for adding SSR to an application.

For applications that are already using SSR, additional adjustments will be needed to update the application server to support the new integrated SSR capabilities.
The `application` builder now provides the integrated functionality for all of the following preexisting builders:

- `app-shell`
- `prerender`
- `server`
- `ssr-dev-server`

The `ng update` process will automatically remove usages of the `@nguniversal` scope packages where some of these builders were previously located.
The new `@angular/ssr` package will also be automatically added and used with configuration and code being adjusted during the update.
The `@angular/ssr` package supports the `browser` builder as well as the `application` builder.

## Executing a build

Once you have updated the application configuration, builds can be performed using `ng build` as was previously done.
Depending on the choice of builder migration, some of the command line options may be different.
If the build command is contained in any `npm` or other scripts, ensure they are reviewed and updated.
For applications that have migrated to the `application` builder and that use SSR and/or prererending, you also may be able to remove extra `ng run` commands from scripts now that `ng build` has integrated SSR support.

```shell

ng build

```

## Starting the development server

The development server will automatically detect the new build system and use it to build the application.
To start the development server no changes are necessary to the `dev-server` builder configuration or command line.

```shell

ng serve

```

You can continue to use the command line options you have used in the past with the development server.

HELPFUL: With the development server, you may see a small Flash of Unstyled Content (FOUC) on startup as the server initializes.
The development server attempts to defer processing of stylesheets until first use to improve rebuild times.
This will not occur in builds outside the development server.

### Hot module replacement

Hot Module Replacement (HMR) is a technique used by development servers to avoid reloading the entire page when only part of an application is changed.
The changes in many cases can be immediately shown in the browser which allows for an improved edit/refresh cycle while developing an application.
While general JavaScript-based hot module replacement (HMR) is currently not supported, several more specific forms of HMR are available:

- **global stylesheet** (`styles` build option)
- **component stylesheet** (inline and file-based)
- **component template** (inline and file-based)

The HMR capabilities are automatically enabled and require no code or configuration changes to use.
Angular provides HMR support for both file-based (`templateUrl`/`styleUrl`/`styleUrls`) and inline (`template`/`styles`) component styles and templates.
The build system will attempt to compile and process the minimal amount of application code when it detects a stylesheet only change.

If preferred, the HMR capabilities can be disabled by setting the `hmr` development server option to `false`.
This can also be changed on the command line via:

```shell

ng serve --no-hmr

```

### Vite as a development server

The usage of Vite in the Angular CLI is currently within a _development server capacity only_. Even without using the underlying Vite build system, Vite provides a full-featured development server with client side support that has been bundled into a low dependency npm package. This makes it an ideal candidate to provide comprehensive development server functionality. The current development server process uses the new build system to generate a development build of the application in memory and passes the results to Vite to serve the application. The usage of Vite, much like the Webpack-based development server, is encapsulated within the Angular CLI `dev-server` builder and currently cannot be directly configured.

### Prebundling

Prebundling provides improved build and rebuild times when using the development server.
Vite provides prebundling capabilities that are enabled by default when using the Angular CLI.
The prebundling process analyzes all the third-party project dependencies within a project and processes them the first time the development server is executed.
This process removes the need to rebuild and bundle the project's dependencies each time a rebuild occurs or the development server is executed.

In most cases, no additional customization is required. However, some situations where it may be needed include:

- Customizing loader behavior for imports within the dependency such as the `loader` option
- Symlinking a dependency to local code for development such as `npm link`
- Working around an error encountered during prebundling of a dependency

The prebundling process can be fully disabled or individual dependencies can be excluded if needed by a project.
The `dev-server` builder's `prebundle` option can be used for these customizations.
To exclude specific dependencies, the `prebundle.exclude` option is available:

```json
    "serve": {
      "builder": "@angular/build:dev-server",
      "options": {
        "prebundle": {
          "exclude": ["some-dep"]
        }
      },
```

By default, `prebundle` is set to `true` but can be set to `false` to fully disable prebundling.
However, excluding specific dependencies is recommended instead since rebuild times will increase with prebundling disabled.

```json
    "serve": {
      "builder": "@angular/build:dev-server",
      "options": {
        "prebundle": false
      },
```
