---
title: "Angular CLI builders (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/cli/cli-builder.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Angular CLI builders (part 2 of 2)

## Schedule and run

Architect runs builders asynchronously.
To invoke a builder, you schedule a task to be run when all configuration resolution is complete.

The builder function is not executed until the scheduler returns a `BuilderRun` control object.
The CLI typically schedules tasks by calling the `context.scheduleTarget()` function, and then resolves input options using the target definition in the `angular.json` file.

Architect resolves input options for a given target by taking the default options object, then overwriting values from the configuration, then further overwriting values from the overrides object passed to `context.scheduleTarget()`.
For the Angular CLI, the overrides object is built from command line arguments.

Architect validates the resulting options values against the schema of the builder.
If inputs are valid, Architect creates the context and executes the builder.

For more information see Workspace Configuration.

HELPFUL: You can also invoke a builder directly from another builder or test by calling `context.scheduleBuilder()`.
You pass an `options` object directly to the method, and those option values are validated against the schema of the builder without further adjustment.

Only the `context.scheduleTarget()` method resolves the configuration and overrides through the `angular.json` file.

### Default architect configuration

Let's create a simple `angular.json` file that puts target configurations into context.

You can publish the builder to npm (see Publishing your Library), and install it using the following command:

```shell

npm install @example/copy-file

```

If you create a new project with `ng new builder-test`, the generated `angular.json` file looks something like this, with only default builder configurations.

```json
{
  "projects": {
    "builder-test": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "outputPath": "dist/builder-test",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json"
          },
          "configurations": {
            "production": {
              "optimization": true,
              "aot": true
            }
          }
        }
      }
    }
  }
}
```

### Adding a target

Add a new target that will run our builder to copy a file.
This target tells the builder to copy the `package.json` file.

- We will add a new target section to the `architect` object for our project
- The target named `copy-package` uses our builder, which you published to `@example/copy-file`.
- The options object provides default values for the two inputs that you defined.
  - `source` - The existing file you are copying.
  - `destination` - The path you want to copy to.

```json
{
  "projects": {
    "builder-test": {
      "architect": {
        "copy-package": {
          "builder": "@example/copy-file:copy",
          "options": {
            "source": "package.json",
            "destination": "package-copy.json"
          }
        }
        // Existing targets...
      }
    }
  }
}
```

### Running the builder

To run our builder with the new target's default configuration, use the following CLI command.

```shell

ng run builder-test:copy-package

```

This copies the `package.json` file to `package-copy.json`.

Use command-line arguments to override the configured defaults.
For example, to run with a different `destination` value, use the following CLI command.

```shell

ng run builder-test:copy-package --destination=package-other.json

```

This copies the file to `package-other.json` instead of `package-copy.json`.
Because you did not override the _source_ option, it will still copy from the default `package.json` file.

## Testing a builder

Use integration testing for your builder, so that you can use the Architect scheduler to create a context, as in this example.
In the builder source directory, create a new test file `my-builder.spec.ts`. The test creates new instances of `JsonSchemaRegistry` (for schema validation), `TestingArchitectHost` (an in-memory implementation of `ArchitectHost`), and `Architect`.

Here's an example of a test that runs the copy file builder.
The test uses the builder to copy the `package.json` file and validates that the copied file's contents are the same as the source.

File: `src/my-builder.spec.ts`

```ts
import {Architect} from '@angular-devkit/architect';
import {TestingArchitectHost} from '@angular-devkit/architect/testing';
import {schema} from '@angular-devkit/core';
import {promises as fs} from 'fs';
import {join} from 'path';

describe('Copy File Builder', () => {
  let architect: Architect;
  let architectHost: TestingArchitectHost;

  beforeEach(async () => {
    const registry = new schema.CoreSchemaRegistry();
    registry.addPostTransform(schema.transforms.addUndefinedDefaults);

    // TestingArchitectHost() takes workspace and current directories.
    // Since we don't use those, both are the same in this case.
    architectHost = new TestingArchitectHost(__dirname, __dirname);
    architect = new Architect(architectHost, registry);

    // This will either take a Node package name, or a path to the directory
    // for the package.json file.
    await architectHost.addBuilderFromPackage(join(__dirname, '..'));
  });

  it('can copy files', async () => {
    // A "run" can have multiple outputs, and contains progress information.
    const run = await architect.scheduleBuilder('@example/copy-file:copy', {
      source: 'package.json',
      destination: 'package-copy.json',
    });

    // The "result" member (of type BuilderOutput) is the next output.
    const output = await run.result;

    // Stop the builder from running. This stops Architect from keeping
    // the builder-associated states in memory, since builders keep waiting
    // to be scheduled.
    await run.stop();

    // Expect that the copied file is the same as its source.
    const sourceContent = await fs.readFile('package.json', 'utf8');
    const destinationContent = await fs.readFile('package-copy.json', 'utf8');
    expect(destinationContent).toBe(sourceContent);
  });
});
```

HELPFUL: When running this test in your repo, you need the `ts-node` package.
You can avoid this by renaming `my-builder.spec.ts` to `my-builder.spec.js`.

### Watch mode

Most builders to run once and return. However, this behavior is not entirely compatible with a builder that watches for changes (like a devserver, for example).
Architect can support watch mode, but there are some things to look out for.

- To be used with watch mode, a builder handler function should return an `Observable`.
  Architect subscribes to the `Observable` until it completes and might reuse it if the builder is scheduled again with the same arguments.

- The builder should always emit a `BuilderOutput` object after each execution.
  Once it's been executed, it can enter a watch mode, to be triggered by an external event.
  If an event triggers it to restart, the builder should execute the `context.reportRunning()` function to tell Architect that it is running again.
  This prevents Architect from stopping the builder if another run is scheduled.

When your builder calls `BuilderRun.stop()` to exit watch mode, Architect unsubscribes from the builder's `Observable` and calls the builder's teardown logic to clean up.
This behavior also allows for long-running builds to be stopped and cleaned up.

In general, if your builder is watching an external event, you should separate your run into three phases.

| Phases     | Details                                                                                                                                                                                                                                       |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Running    | The task being performed, such as invoking a compiler. This ends when the compiler finishes and your builder emits a `BuilderOutput` object.                                                                                                  |
| Watching   | Between two runs, watch an external event stream. For example, watch the file system for any changes. This ends when the compiler restarts, and `context.reportRunning()` is called.                                                          |
| Completion | Either the task is fully completed, such as a compiler which needs to run a number of times, or the builder run was stopped (using `BuilderRun.stop()`). Architect executes teardown logic and unsubscribes from your builder's `Observable`. |

## Summary

The CLI Builder API provides a means of changing the behavior of the Angular CLI by using builders to execute custom logic.

- Builders can be synchronous or asynchronous, execute once or watch for external events, and can schedule other builders or targets.
- Builders have option defaults specified in the `angular.json` configuration file, which can be overwritten by an alternate configuration for the target, and further overwritten by command line flags
- The Angular team recommends that you use integration tests to test Architect builders. Use unit tests to validate the logic that the builder executes.
- If your builder returns an `Observable`, it should clean up the builder in the teardown logic of that `Observable`.
