---
title: "Angular workspace configuration (part 1 of 4)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/reference/configs/workspace-config.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Angular workspace configuration

The `angular.json` file at the root level of an Angular workspace provides workspace-wide and project-specific configuration defaults. These are used for build and development tools provided by the Angular CLI.
Path values given in the configuration are relative to the root workspace directory.

## General JSON structure

At the top-level of `angular.json`, a few properties configure the workspace and a `projects` section contains the remaining per-project configuration options.
You can override Angular CLI defaults set at the workspace level through defaults set at the project level.
You can also override defaults set at the project level using the command line.

The following properties, at the top-level of the file, configure the workspace.

| Properties       | Details                                                                                                                                                                                        |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `version`        | The configuration-file version.                                                                                                                                                                |
| `newProjectRoot` | Path where new projects are created through tools like `ng generate application` or `ng generate library`. Path can be absolute or relative to the workspace directory. Defaults to `projects` |
| `cli`            | A set of options that customize the Angular CLI. See Angular CLI configuration options below.                                               |
| `schematics`     | A set of schematics that customize the `ng generate` sub-command option defaults for this workspace. See schematics below.                              |
| `projects`       | Contains a subsection for each application or library in the workspace, with project-specific configuration options.                                                                           |

The initial application that you create with `ng new app-name` is listed under "projects":

When you create a library project with `ng generate library`, the library project is also added to the `projects` section.

HELPFUL: The `projects` section of the configuration file does not correspond exactly to the workspace file structure.

- The initial application created by `ng new` is at the top level of the workspace file structure.
- Other applications and libraries are under the `projects` directory by default.

For more information, see Workspace and project file structure.

## Angular CLI configuration options

The following properties are a set of options that customize the Angular CLI.

| Property               | Details                                                                                                                                                                    | Value type                            | Default value |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------ | :------------ |
| `analytics`            | Share anonymous usage data with the Angular Team. A boolean value indicates whether or not to share data, while a UUID string shares data using a pseudonymous identifier. | `boolean` \| `string`                 | `false`       |
| `cache`                | Control persistent disk cache used by Angular CLI Builders.                                                                          | Cache options       | `{}`          |
| `schematicCollections` | List schematics collections to use in `ng generate`.                                                                                                                       | `string[]`                            | `[]`          |
| `packageManager`       | The preferred package manager tool to use.                                                                                                                                 | `npm` \| `pnpm` \| `yarn` \| `bun`    | `npm`         |
| `warnings`             | Control Angular CLI specific console warnings.                                                                                                                             | Warnings options | `{}`          |

### Cache options

| Property      | Details                                                                                                                                                                                                                                       | Value type               | Default value    |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------- | :--------------- |
| `enabled`     | Configure whether disk caching is enabled for builds.                                                                                                                                                                                         | `boolean`                | `true`           |
| `environment` | Configure in which environment disk cache is enabled._ `ci` enables caching only in continuous integration (CI) environments._ `local` enables caching only _outside_ of CI environments.\* `all` enables caching everywhere. | `local` \| `ci` \| `all` | `local`          |
| `path`        | The directory used to stored cache results.                                                                                                                                                                                                   | `string`                 | `.angular/cache` |

### Warnings options

| Property          | Details                                                                         | Value type | Default value |
| :---------------- | :------------------------------------------------------------------------------ | :--------- | :------------ |
| `versionMismatch` | Show a warning when the global Angular CLI version is newer than the local one. | `boolean`  | `true`        |

## Project configuration options

The following top-level configuration properties are available for each project, under `projects['project-name']`.

| Property      | Details                                                                                                                                                                                                               | Value type                                                      | Default value   |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- | :-------------- |
| `root`        | The root directory for this project's files, relative to the workspace directory. Empty for the initial application, which resides at the top level of the workspace.                                                 | `string`                                                        | None (required) |
| `projectType` | One of "application" or "library" An application can run independently in a browser, while a library cannot.                                                                                                          | `application` \| `library`                                      | None (required) |
| `sourceRoot`  | The root directory for this project's source files.                                                                                                                                                                   | `string`                                                        | `''`            |
| `prefix`      | A string that Angular prepends to selectors when generating new components, directives, and pipes using `ng generate`. Can be customized to identify an application or feature area.                                  | `string`                                                        | `'app'`         |
| `i18n`        | Internationalization options for the project. Defines the source locale and additional locales to build. See Define locales in the build configuration. | See i18n options                               | `{}`            |
| `schematics`  | A set of schematics that customize the `ng generate` sub-command option defaults for this project. See the Generation schematics section.                                                              | See schematics                                   | `{}`            |
| `architect`   | Configuration defaults for Architect builder targets for this project.                                                                                                                                                | See Configuring builder targets | `{}`            |

## i18n options

Use the `i18n` project option to define the application's source locale and any additional locales to build.

| Property       | Details                                                                                                                              | Value type                                              | Default value |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ | :------------ |
| `sourceLocale` | The locale used in the application source code. Can be a locale identifier string or a configuration object. | `string` \| sourceLocale object | `"en-US"`     |
| `locales`      | A map of locale identifiers to translation files or locale configuration objects.                                  | `object`                                                | `{}`          |

### `sourceLocale` object

Pass an object instead of a string to customize the output directory or base HREF for the source locale:

| Property   | Details                                                                                                                                       | Value type | Default value |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :------------ |
| `code`     | The source locale identifier.                                                                                                                 | `string`   | `"en-US"`     |
| `baseHref` | Overrides the HTML `<base href>` for this locale. The output directory name stays as the locale code. Cannot be used together with `subPath`. | `string`   | Locale code   |
| `subPath`  | Sets both the output directory name and the HTML `<base href>` for this locale. Cannot be used together with `baseHref`.                      | `string`   | Locale code   |

### Locale object

Each `locales` entry can be a path string, an array of paths, or an object:

| Property      | Details                                                                                                                                             | Value type             | Default value |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :------------ |
| `translation` | Path or paths to the translation file(s) for this locale.                                                                                           | `string` \| `string[]` |               |
| `baseHref`    | Overrides the HTML `<base href>` for this locale. The output directory name stays as the locale identifier. Cannot be used together with `subPath`. | `string`               | Locale code   |
| `subPath`     | Sets both the output directory name and the HTML `<base href>` for this locale. Cannot be used together with `baseHref`.                            | `string`               | Locale code   |

HELPFUL: Use `subPath` rather than `baseHref` when you also need to rename the output directory — for example, to output to `de-DE/` instead of `de/`.

## Schematics

Angular schematics are instructions for modifying a project by adding new files or modifying existing files.
These can be configured by mapping the schematic name to a set of default options.

The "name" of a schematic is in the format: `<schematic-package>:<schematic-name>`.
Schematics for the default Angular CLI `ng generate` sub-commands are collected in the package `@schematics/angular`.
For example, the schematic for generating a component with `ng generate component` is `@schematics/angular:component`.

The fields given in the schematic's schema correspond to the allowed command-line argument values and defaults for the Angular CLI sub-command options.
You can update your workspace schema file to set a different default for a sub-command option. For example, to disable `standalone` in `ng generate component` by default:

```json
{
  "projects": {
    "my-app": {
      "schematics": {
        "@schematics/angular:component": {
          "standalone": false
        }
      }
    }
  }
}
```
