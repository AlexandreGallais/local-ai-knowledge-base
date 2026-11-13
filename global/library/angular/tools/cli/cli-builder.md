---
title: "Angular CLI builders (part 1 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/cli/cli-builder.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Angular CLI builders

A number of Angular CLI commands run a complex process on your code, such as building, testing, or serving your application.
The commands use an internal tool called Architect to run _CLI builders_, which invoke another tool (bundler, test runner, server) to accomplish the desired task.
Custom builders can perform an entirely new task, or to change which third-party tool is used by an existing command.

This document explains how CLI builders integrate with the workspace configuration file, and shows how you can create your own builder.

HELPFUL: Find the code from the examples used here in this GitHub repository.

## CLI builders

The internal Architect tool delegates work to handler functions called _builders_.
A builder handler function receives two arguments:

| Argument  | Type             |
| :-------- | :--------------- |
| `options` | `JSONObject`     |
| `context` | `BuilderContext` |

The separation of concerns here is the same as with schematics, which are used for other CLI commands that touch your code (such as `ng generate`).

- The `options` object is provided by the CLI user's options and configuration, while the `context` object is provided by the CLI Builder API automatically.
- In addition to the contextual information, the `context` object also provides access to a scheduling method, `context.scheduleTarget()`.
  The scheduler executes the builder handler function with a given target configuration.

The builder handler function can be synchronous (return a value), asynchronous (return a `Promise`), or watch and return multiple values (return an `Observable`).
The return values must always be of type `BuilderOutput`.
This object contains a Boolean `success` field and an optional `error` field that can contain an error message.

Angular provides some builders that are used by the CLI for commands such as `ng build` and `ng test`.
Default target configurations for these and other built-in CLI builders can be found and configured in the "architect" section of the workspace configuration file, `angular.json`.
Also, extend and customize Angular by creating your own builders, which you can run directly using the `ng run` CLI command.

### Builder project structure

A builder resides in a "project" folder that is similar in structure to an Angular workspace, with global configuration files at the top level, and more specific configuration in a source folder with the code files that define the behavior.
For example, your `myBuilder` folder could contain the following files.

| Files                    | Purpose                                                                                                   |
| :----------------------- | :-------------------------------------------------------------------------------------------------------- |
| `src/my-builder.ts`      | Main source file for the builder definition.                                                              |
| `src/my-builder.spec.ts` | Source file for tests.                                                                                    |
| `src/schema.json`        | Definition of builder input options.                                                                      |
| `builders.json`          | Builders definition.                                                                                      |
| `package.json`           | Dependencies. See https://docs.npmjs.com/files/package.json. |
| `tsconfig.json`          | TypeScript configuration.              |

Builders can be published to `npm`, see Publishing your Library.

## Creating a builder

As an example, create a builder that copies a file to a new location.
To create a builder, use the `createBuilder()` CLI Builder function, and return a `Promise<BuilderOutput>` object.

File: `src/my-builder.ts (builder skeleton)`

```ts
import {BuilderContext, BuilderOutput, createBuilder} from '@angular-devkit/architect';
import {JsonObject} from '@angular-devkit/core';
```

Now let's add some logic to it.
The following code retrieves the source and destination file paths from user options and copies the file from the source to the destination \(using the Promise version of the built-in Node.js `copyFile()` function\).
If the copy operation fails, it returns an error with a message about the underlying problem.

File: `src/my-builder.ts (builder)`

```ts
import {BuilderContext, BuilderOutput, createBuilder} from '@angular-devkit/architect';
import {JsonObject} from '@angular-devkit/core';
```

### Handling output

By default, `copyFile()` does not print anything to the process standard output or error.
If an error occurs, it might be difficult to understand exactly what the builder was trying to do when the problem occurred.
Add some additional context by logging additional information using the `Logger` API.
This also lets the builder itself be executed in a separate process, even if the standard output and error are deactivated.

You can retrieve a `Logger` instance from the context.

File: `src/my-builder.ts (handling output)`

```ts
try {
  await fs.copyFile(options.source, options.destination);
} catch (err) {
  context.logger.error('Failed to copy file.');
  return {
    success: false,
    error: (err as Error).message,
  };
}
```

### Progress and status reporting

The CLI Builder API includes progress and status reporting tools, which can provide hints for certain functions and interfaces.

To report progress, use the `context.reportProgress()` method, which takes a current value, optional total, and status string as arguments.
The total can be any number. For example, if you know how many files you have to process, the total could be the number of files, and current should be the number processed so far.
The status string is unmodified unless you pass in a new string value.

In our example, the copy operation either finishes or is still executing, so there's no need for a progress report, but you can report status so that a parent builder that called our builder would know what's going on.
Use the `context.reportStatus()` method to generate a status string of any length.

HELPFUL: There's no guarantee that a long string will be shown entirely; it could be cut to fit the UI that displays it.

Pass an empty string to remove the status.

File: `src/my-builder.ts (progress reporting)`

```ts
context.reportStatus(`Copying ${options.source} to ${options.destination}.`);
try {
  await fs.copyFile(options.source, options.destination);
} catch (err) {
  context.logger.error('Failed to copy file.');
  return {
    success: false,
    error: (err as Error).message,
  };
}

context.reportStatus('Done.');
return {success: true};
```

## Builder input

You can invoke a builder indirectly through a CLI command such as `ng build`, or directly with the Angular CLI `ng run` command.
In either case, you must provide required inputs, but can let other inputs default to values that are pre-configured for a specific _target_, specified by a configuration, or set on the command line.

### Input validation

You define builder inputs in a JSON schema associated with that builder.
Similar to schematics, the Architect tool collects the resolved input values into an `options` object, and validates their types against the schema before passing them to the builder function.

For our example builder, `options` should be a `JsonObject` with two keys:
a `source` and a `destination`, each of which are a string.

You can provide the following schema for type validation of these values.

```json
{
  "$schema": "https://json-schema.org/schema",
  "type": "object",
  "properties": {
    "source": {
      "type": "string"
    },
    "destination": {
      "type": "string"
    }
  }
}
```

HELPFUL: This is a minimal example, but the use of a schema for validation can be very powerful.
For more information, see the JSON schemas website.

To link our builder implementation with its schema and name, you need to create a _builder definition_ file, which you can point to in `package.json`.

Create a file named `builders.json` that looks like this:

```json
{
  "builders": {
    "copy": {
      "implementation": "./dist/my-builder.js",
      "schema": "./src/schema.json",
      "description": "Copies a file."
    }
  }
}
```

In the `package.json` file, add a `builders` key that tells the Architect tool where to find our builder definition file.

```json
{
  "name": "@example/copy-file",
  "version": "1.0.0",
  "description": "Builder for copying files",
  "builders": "builders.json",
  "dependencies": {
    "@angular/build": "^21.2.0"
  }
}
```

The official name of our builder is now `@example/copy-file:copy`.
The first part of this is the package name and the second part is the builder name as specified in the `builders.json` file.

These values are accessed on `options.source` and `options.destination`.

File: `src/my-builder.ts (report status)`

```ts
await fs.copyFile(options.source, options.destination);
```

### Target configuration

A builder must have a defined target that associates it with a specific input configuration and project.

Targets are defined in the `angular.json` CLI configuration file.
A target specifies the builder to use, its default options configuration, and named alternative configurations.
Architect in the Angular CLI uses the target definition to resolve input options for a given run.

The `angular.json` file has a section for each project, and the "architect" section of each project configures targets for builders used by CLI commands such as 'build', 'test', and 'serve'.
By default, for example, the `ng build` command runs the builder `@angular/build:application` to perform the build task, and passes in default option values as specified for the `build` target in `angular.json`.

```json
{
  "myApp": {
    "...": "...",
    "architect": {
      "build": {
        "builder": "@angular/build:application",
        "options": {
          "outputPath": "dist/myApp",
          "index": "src/index.html",
          "...": "..."
        },
        "configurations": {
          "production": {
            "fileReplacements": [
              {
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.prod.ts"
              }
            ],
            "optimization": true,
            "outputHashing": "all",
            "...": "..."
          }
        }
      },
      "...": "..."
    }
  }
}
```

The command passes the builder the set of default options specified in the "options" section.
If you pass the `--configuration=production` flag, it uses the override values specified in the `production` configuration.
Specify further option overrides individually on the command line.

#### Target strings

The generic `ng run` CLI command takes as its first argument a target string of the following form.

```shell

project:target[:configuration]

```

|               | Details                                                                                                               |
| :------------ | :-------------------------------------------------------------------------------------------------------------------- |
| project       | The name of the Angular CLI project that the target is associated with.                                               |
| target        | A named builder configuration from the `architect` section of the `angular.json` file.                                |
| configuration | (optional) The name of a specific configuration override for the given target, as defined in the `angular.json` file. |

If your builder calls another builder, it might need to read a passed target string.
Parse this string into an object by using the `targetFromTargetString()` utility function from `@angular-devkit/architect`.
