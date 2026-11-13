---
title: "Schematics for libraries (part 2 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/cli/schematics-for-libraries.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Schematics for libraries (part 2 of 3)

## Providing generation support

You can add a named schematic to your collection that lets your users use the `ng generate` command to create an artifact that is defined in your library.

We'll assume that your library defines a service, `my-service`, that requires some setup.
You want your users to be able to generate it using the following CLI command.

```shell

ng generate my-lib:my-service

```

To begin, create a new subfolder, `my-service`, in the `schematics` folder.

### Configure the new schematic

When you add a schematic to the collection, you have to point to it in the collection's schema, and provide configuration files to define options that a user can pass to the command.

1. Edit the `schematics/collection.json` file to point to the new schematic subfolder, and include a pointer to a schema file that specifies inputs for the new schematic.

   File: `projects/my-lib/schematics/collection.json (Schematics Collection)`

```json
{
  "$schema": "../../../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "ng-add": {
      "description": "Add my library to the project.",
      "factory": "./ng-add/index#ngAdd",
      "schema": "./ng-add/schema.json"
    },
    "my-service": {
      "description": "Generate a service in the project.",
      "factory": "./my-service/index#myService",
      "schema": "./my-service/schema.json"
    }
  }
}
```

1. Go to the `<lib-root>/schematics/my-service` folder.
1. Create a `schema.json` file and define the available options for the schematic.

   File: `projects/my-lib/schematics/my-service/schema.json (Schematic JSON Schema)`

```json
{
  "$schema": "https://json-schema.org/schema",
  "$id": "SchematicsMyService",
  "title": "My Service Schema",
  "type": "object",
  "properties": {
    "name": {
      "description": "The name of the service.",
      "type": "string"
    },
    "path": {
      "type": "string",
      "format": "path",
      "description": "The path to create the service.",
      "visible": false,
      "$default": {
        "$source": "workingDirectory"
      }
    },
    "project": {
      "type": "string",
      "description": "The name of the project.",
      "$default": {
        "$source": "projectName"
      }
    }
  },
  "required": ["name"]
}
```
   - _id_: A unique ID for the schema in the collection.
   - _title_: A human-readable description of the schema.
   - _type_: A descriptor for the type provided by the properties.
   - _properties_: An object that defines the available options for the schematic.

   Each option associates key with a type, description, and optional alias.
   The type defines the shape of the value you expect, and the description is displayed when the user requests usage help for your schematic.

   See the workspace schema for additional customizations for schematic options.

1. Create a `schema.ts` file and define an interface that stores the values of the options defined in the `schema.json` file.

   File: `projects/my-lib/schematics/my-service/schema.ts (Schematic Interface)`

```ts
export interface Schema {
  // The name of the service.
  name: string;

  // The path to create the service.
  path?: string;

  // The name of the project.
  project?: string;
}
```

   | Options | Details                                                                                                                                     |
   | :------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
   | name    | The name you want to provide for the created service.                                                                                       |
   | path    | Overrides the path provided to the schematic. The default path value is based on the current working directory.                             |
   | project | Provides a specific project to run the schematic on. In the schematic, you can provide a default if the option is not provided by the user. |

### Add template files

To add artifacts to a project, your schematic needs its own template files.
Schematic templates support special syntax to execute code and variable substitution.

1. Create a `files/` folder inside the `schematics/my-service/` folder.
1. Create a file named `__name@dasherize__.service.ts.template` that defines a template to use for generating files.
   This template will generate a service that already has Angular's `HttpClient` injected into an `http` property.

   ```ts

   import { Service } from '@angular/core';
   import { HttpClient } from '@angular/common/http';

   @Service()
   export class <%= classify(name) %>Service {
      private http = inject(HttpClient);
   }

   ```

   - The `classify` and `dasherize` methods are utility functions that your schematic uses to transform your source template and filename.
   - The `name` is provided as a property from your factory function.
     It is the same `name` you defined in the schema.

### Add the factory function

Now that you have the infrastructure in place, you can define the main function that performs the modifications you need in the user's project.

The Schematics framework provides a file templating system, which supports both path and content templates.
The system operates on placeholders defined inside files or paths that loaded in the input `Tree`.
It fills these in using values passed into the `Rule`.

For details of these data structures and syntax, see the Schematics README.

1. Create the main file `index.ts` and add the source code for your schematic factory function.
1. First, import the schematics definitions you will need.
   The Schematics framework offers many utility functions to create and use rules when running a schematic.

   File: `projects/my-lib/schematics/my-service/index.ts (Imports)`

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
```

1. Import the defined schema interface that provides the type information for your schematic's options.

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
```

1. To build up the generation schematic, start with an empty rule factory.

   File: `projects/my-lib/schematics/my-service/index.ts (Initial Rule)`

```ts
export function myService(options: MyServiceSchema): Rule {
  return (tree: Tree) => tree;
}
```

This rule factory returns the tree without modification.
The options are the option values passed through from the `ng generate` command.
