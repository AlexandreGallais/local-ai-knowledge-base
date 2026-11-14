---
title: "Angular application build system (part 2 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/cli/build-system-migration.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Angular application build system (part 2 of 3)

## New features

One of the main benefits of the application build system is the improved build and rebuild speed.
However, the new application build system also provides additional features not present in the `browser` builder.

IMPORTANT: The new features of the `application` builder described here are incompatible with the `@angular-devkit/build-angular:karma` test builder by default because it is using the `browser` builder internally.
Users can opt-in to use the `application` builder by setting the `builderMode` option to `application` for that builder.
The `@angular/build:karma` and `@angular/build:unit-test` builders always use the `application` builder.
If you notice any issues, please report them here.

### Build-time value replacement with `define`

The `define` option allows identifiers present in the code to be replaced with another value at build time.
This is similar to the behavior of Webpack's `DefinePlugin` which was previously used with some custom Webpack configurations that used third-party builders.
The option can either be used within the `angular.json` configuration file or on the command line.
Configuring `define` within `angular.json` is useful for cases where the values are constant and able to be checked in to source control.

Within the configuration file, the option is in the form of an object.
The keys of the object represent the identifier to replace and the values of the object represent the corresponding replacement value for the identifier.
An example is as follows:

```json
  "build": {
    "builder": "@angular/build:application",
    "options": {
      ...
      "define": {
          "SOME_NUMBER": "5",
          "ANOTHER": "'this is a string literal, note the extra single quotes'",
          "REFERENCE": "globalThis.someValue.noteTheAbsentSingleQuotes"
      }
    }
  }
```

HELPFUL: All replacement values are defined as strings within the configuration file.
If the replacement is intended to be an actual string literal, it should be enclosed in single quote marks.
This allows the flexibility of using any valid JSON type as well as a different identifier as a replacement.

The command line usage is preferred for values that may change per build execution such as the git commit hash or an environment variable.
The CLI will merge `--define` values from the command line with `define` values from `angular.json`, including both in a build.
Command line usage takes precedence if the same identifier is present for both.
For command line usage, the `--define` option uses the format of `IDENTIFIER=VALUE`.

```shell
ng build --define SOME_NUMBER=5 --define "ANOTHER='these will overwrite existing'"
```

Environment variables can also be selectively included in a build.
For non-Windows shells, the quotes around the hash literal can be escaped directly if preferred.
This example assumes a bash-like shell but similar behavior is available for other shells as well.

```shell
export MY_APP_API_HOST="http://example.com"
export API_RETRY=3
ng build --define API_HOST=\'$MY_APP_API_HOST\' --define API_RETRY=$API_RETRY
```

For either usage, TypeScript needs to be aware of the types for the identifiers to prevent type-checking errors during the build.
This can be accomplished with an additional type definition file within the application source code (`src/types.d.ts`, for example) with similar content:

```ts
declare const SOME_NUMBER: number;
declare const ANOTHER: string;
declare const GIT_HASH: string;
declare const API_HOST: string;
declare const API_RETRY: number;
```

The default project configuration is already setup to use any type definition files present in the project source directories.
If the TypeScript configuration for the project has been altered, it may need to be adjusted to reference this newly added type definition file.

IMPORTANT: This option will not replace identifiers contained within Angular metadata such as a Component or Directive decorator.

### File extension loader customization

IMPORTANT: This feature is only available with the `application` builder.

Some projects may need to control how all files with a specific file extension are loaded and bundled into an application.
When using the `application` builder, the `loader` option can be used to handle these cases.
The option allows a project to define the type of loader to use with a specified file extension.
A file with the defined extension can then be used within the application code via an import statement or dynamic import expression.
The available loaders that can be used are:

- `text` - inlines the content as a `string` available as the default export
- `binary` - inlines the content as a `Uint8Array` available as the default export
- `file` - emits the file at the application output path and provides the runtime location of the file as the default export
- `dataurl` - inlines the content as a data URL.
- `base64` - inlines the content as a Base64-encoded string.
- `empty` - considers the content to be empty and will not include it in bundles

The `empty` value, while less common, can be useful for compatibility of third-party libraries that may contain bundler-specific import usage that needs to be removed.
One case for this is side-effect imports (`import 'my.css';`) of CSS files which has no effect in a browser.
Instead, the project can use `empty` and then the CSS files can be added to the `styles` build option or use some other injection method.

The loader option is an object-based option with the keys used to define the file extension and the values used to define the loader type.

An example of the build option usage to inline the content of SVG files into the bundled application would be as follows:

```json
  "build": {
    "builder": "@angular/build:application",
    "options": {
      ...
      "loader": {
        ".svg": "text"
      }
    }
  }
```

An SVG file can then be imported:

```ts
import contents from './some-file.svg';

console.log(contents); // <svg>...</svg>
```

Additionally, TypeScript needs to be aware of the module type for the import to prevent type-checking errors during the build. This can be accomplished with an additional type definition file within the application source code (`src/types.d.ts`, for example) with the following or similar content:

```ts
declare module '*.svg' {
  const content: string;
  export default content;
}
```

The default project configuration is already setup to use any type definition files (`.d.ts` files) present in the project source directories. If the TypeScript configuration for the project has been altered, the tsconfig may need to be adjusted to reference this newly added type definition file.

### Import attribute loader customization

For cases where only certain files should be loaded in a specific way, per file control over loading behavior is available.
This is accomplished with a `loader` import attribute that can be used with both import statements and expressions.
The presence of the import attribute takes precedence over all other loading behavior including JS/TS and any `loader` build option values.
For general loading for all files of an otherwise unsupported file type, the `loader` build option is recommended.

For the import attribute, the following loader values are supported:

- `text` - inlines the content as a `string` available as the default export
- `binary` - inlines the content as a `Uint8Array` available as the default export
- `file` - emits the file at the application output path and provides the runtime location of the file as the default export
- `dataurl` - inlines the content as a data URL.
- `base64` - inlines the content as a Base64-encoded string.

An additional requirement to use import attributes is that the TypeScript `module` option must be set to `esnext` or `preserve` to allow TypeScript to successfully build the application code.
New projects use `preserve` by default, so no change is needed.

At this time, TypeScript does not support type definitions that are based on import attribute values.
The use of `@ts-expect-error`/`@ts-ignore` or the use of individual type definition files (assuming the file is only imported with the same loader attribute) is currently required.
As an example, an SVG file can be imported as text via:

```ts
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import contents from './some-file.svg' with {loader: 'text'};
```

The same can be accomplished with an import expression inside an async function.

```ts
async function loadSvg(): Promise<string> {
  // @ts-expect-error TypeScript cannot provide types based on attributes yet
  return import('./some-file.svg', {with: {loader: 'text'}}).then((m) => m.default);
}
```

For the import expression, the `loader` value must be a string literal to be statically analyzed.
A warning will be issued if the value is not a string literal.

The `file` loader is useful when a file will be loaded at runtime through either a `fetch()`, setting to an image elements `src`, or other similar method.

```ts
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import imagePath from './image.webp' with {loader: 'file'};

console.log(imagePath); // media/image-ULK2SIIB.webp
```

The `base64` loader is useful when a file needs to be embedded directly into the bundle as an encoded string that can later be used to construct a Data URL.

```ts
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import logo from './logo.png' with {loader: 'base64'};

console.log(logo); // "iVBORw0KGgoAAAANSUhEUgAA..."
```

The `dataurl` loader to inline assets as complete Data URLs.

```ts
// @ts-expect-error TypeScript cannot provide types based on attributes yet
import icon from './icon.svg' with {loader: 'dataurl'};

console.log(icon); // "data:image/svg+xml;..."
```

For production builds as shown in the code comment above, hashing will be automatically added to the path for long-term caching.

HELPFUL: When using the development server and using a `loader` attribute to import a file from a Node.js package, that package must be excluded from prebundling via the development server `prebundle` option.

### Import/export conditions

Projects may need to map certain import paths to different files based on the type of build.
This can be particularly useful for cases such as `ng serve` needing to use debug/development specific code but `ng build` needing to use code without any development features/information.
Several import/export conditions are automatically applied to support these project needs:

- For optimized builds, the `production` condition is enabled.
- For non-optimized builds, the `development` condition is enabled.
- For browser output code, the `browser` condition is enabled.

An optimized build is determined by the value of the `optimization` option.
When `optimization` is set to `true` or more specifically if `optimization.scripts` is set to `true`, then the build is considered optimized.
This classification applies to both `ng build` and `ng serve`.
In a new project, `ng build` defaults to optimized and `ng serve` defaults to non-optimized.

A useful method to leverage these conditions within application code is to combine them with subpath imports.
By using the following import statement:

```ts
import {verboseLogging} from '#logger';
```

The file can be switched in the `imports` field in `package.json`:

```json
{
  ...
  "imports": {
    "#logger": {
      "development": "./src/logging/debug.ts",
      "default": "./src/logging/noop.ts"
    }
  }
}
```

For applications that are also using SSR, browser and server code can be switched by using the `browser` condition:

```json
{
  ...
  "imports": {
    "#crashReporter": {
      "browser": "./src/browser-logger.ts",
      "default": "./src/server-logger.ts"
    }
  }
}
```

These conditions also apply to Node.js packages and any defined `exports` within the packages.

HELPFUL: If currently using the `fileReplacements` build option, this feature may be able to replace its usage.
