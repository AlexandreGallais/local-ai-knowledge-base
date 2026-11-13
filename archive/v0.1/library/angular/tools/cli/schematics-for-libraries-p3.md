---
title: "Schematics for libraries (part 3 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/cli/schematics-for-libraries.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Schematics for libraries (part 3 of 3)

## Define a generation rule

You now have the framework in place for creating the code that actually modifies the user's application to set it up for the service defined in your library.

The Angular workspace where the user installed your library contains multiple projects \(applications and libraries\).
The user can specify the project on the command line, or let it default.
In either case, your code needs to identify the specific project to which this schematic is being applied, so that you can retrieve information from the project configuration.

Do this using the `Tree` object that is passed in to the factory function.
The `Tree` methods give you access to the complete file tree in your workspace, letting you read and write files during the execution of the schematic.

### Get the project configuration

1. To determine the destination project, use the `workspaces.readWorkspace` method to read the contents of the workspace configuration file, `angular.json`.
   To use `workspaces.readWorkspace` you need to create a `workspaces.WorkspaceHost` from the `Tree`.
   Add the following code to your factory function.

   File: `projects/my-lib/schematics/my-service/index.ts (Schema Import)`

```ts
import {
  Rule,
  Tree,
  SchematicsException,
  apply,
  url,
  applyTemplates,
  move,
  chain,
  mergeWith,
} from '@angular-devkit/schematics';

import {strings, normalize, virtualFs, workspaces} from '@angular-devkit/core';

import {Schema as MyServiceSchema} from './schema';

function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new SchematicsException('File not found.');
      }
      return virtualFs.fileBufferToString(data);
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}

export function myService(options: MyServiceSchema): Rule {
  return async (tree: Tree) => {
    const host = createHost(tree);
    const {workspace} = await workspaces.readWorkspace('/', host);
```

   Be sure to check that the context exists and throw the appropriate error.

1. Now that you have the project name, use it to retrieve the project-specific configuration information.

   File: `projects/my-lib/schematics/my-service/index.ts (Project)`

```ts
const project = options.project != null ? workspace.projects.get(options.project) : null;
if (!project) {
  throw new SchematicsException(`Invalid project name: ${options.project}`);
}

const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';
```

   The `workspace.projects` object contains all the project-specific configuration information.

1. The `options.path` determines where the schematic template files are moved to once the schematic is applied.

   The `path` option in the schematic's schema is substituted by default with the current working directory.
   If the `path` is not defined, use the `sourceRoot` from the project configuration along with the `projectType`.

   File: `projects/my-lib/schematics/my-service/index.ts (Project Info)`

```ts
if (options.path === undefined) {
  options.path = `${project.sourceRoot}/${projectType}`;
}
```

### Define the rule

A `Rule` can use external template files, transform them, and return another `Rule` object with the transformed template.
Use the templating to generate any custom files required for your schematic.

1. Add the following code to your factory function.

   File: `projects/my-lib/schematics/my-service/index.ts (Template transform)`

```ts
const templateSource = apply(url('./files'), [
  applyTemplates({
    classify: strings.classify,
    dasherize: strings.dasherize,
    name: options.name,
  }),
  move(normalize(options.path as string)),
]);
```

   | Methods            | Details                                                                                                                                                                                                                                          |
   | :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `apply()`          | Applies multiple rules to a source and returns the transformed source. It takes 2 arguments, a source and an array of rules.                                                                                                                     |
   | `url()`            | Reads source files from your filesystem, relative to the schematic.                                                                                                                                                                              |
   | `applyTemplates()` | Receives an argument of methods and properties you want make available to the schematic template and the schematic filenames. It returns a `Rule`. This is where you define the `classify()` and `dasherize()` methods, and the `name` property. |
   | `classify()`       | Takes a value and returns the value in title case. For example, if the provided name is `my service`, it is returned as `MyService`.                                                                                                             |
   | `dasherize()`      | Takes a value and returns the value in dashed and lowercase. For example, if the provided name is MyService, it is returned as `my-service`.                                                                                                     |
   | `move()`           | Moves the provided source files to their destination when the schematic is applied.                                                                                                                                                              |

1. Finally, the rule factory must return a rule.

   File: `projects/my-lib/schematics/my-service/index.ts (Chain Rule)`

```ts
return chain([mergeWith(templateSource)]);
```

   The `chain()` method lets you combine multiple rules into a single rule, so that you can perform multiple operations in a single schematic.
   Here you are only merging the template rules with any code executed by the schematic.

See a complete example of the following schematic rule function.

File: `projects/my-lib/schematics/my-service/index.ts`

```ts
// #docplaster
import {
  Rule,
  Tree,
  SchematicsException,
  apply,
  url,
  applyTemplates,
  move,
  chain,
  mergeWith,
} from '@angular-devkit/schematics';

import {strings, normalize, virtualFs, workspaces} from '@angular-devkit/core';

import {Schema as MyServiceSchema} from './schema';

function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new SchematicsException('File not found.');
      }
      return virtualFs.fileBufferToString(data);
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}

export function myService(options: MyServiceSchema): Rule {
  return async (tree: Tree) => {
    const host = createHost(tree);
    const {workspace} = await workspaces.readWorkspace('/', host);

    const project = options.project != null ? workspace.projects.get(options.project) : null;
    if (!project) {
      throw new SchematicsException(`Invalid project name: ${options.project}`);
    }

    const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';

    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}`;
    }

    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name,
      }),
      move(normalize(options.path as string)),
    ]);

    return chain([mergeWith(templateSource)]);
  };
}
```

For more information about rules and utility methods, see Provided Rules.

## Running your library schematic

After you build your library and schematics, you can install the schematics collection to run against your project.
The following steps show you how to generate a service using the schematic you created earlier.

### Build your library and schematics

From the root of your workspace, run the `ng build` command for your library.

```shell

ng build my-lib

```

Then, you change into your library directory to build the schematic

```shell

cd projects/my-lib
npm run build

```

### Link the library

Your library and schematics are packaged and placed in the `dist/my-lib` folder at the root of your workspace.
For running the schematic, you need to link the library into your `node_modules` folder.
From the root of your workspace, run the `npm link` command with the path to your distributable library.

```shell

npm link dist/my-lib

```

### Run the schematic

Now that your library is installed, run the schematic using the `ng generate` command.

```shell

ng generate my-lib:my-service --name my-data

```

In the console, you see that the schematic was run and the `my-data.service.ts` file was created in your application folder.

```shell

CREATE src/app/my-data.service.ts (208 bytes)

```
