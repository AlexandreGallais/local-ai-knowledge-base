---
title: "Schematics for libraries (part 1 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/cli/schematics-for-libraries.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Schematics for libraries

When you create an Angular library, you can provide and package it with schematics that integrate it with the Angular CLI.
With your schematics, your users can use `ng add` to install an initial version of your library,
`ng generate` to create artifacts defined in your library, and `ng update` to adjust their project for a new version of your library that introduces breaking changes.

All three types of schematics can be part of a collection that you package with your library.

## Creating a schematics collection

To start a collection, you need to create the schematic files.
The following steps show you how to add initial support without modifying any project files.

1. In your library's root folder, create a `schematics` folder.
1. In the `schematics/` folder, create an `ng-add` folder for your first schematic.
1. At the root level of the `schematics` folder, create a `collection.json` file.
1. Edit the `collection.json` file to define the initial schema for your collection.

   File: `projects/my-lib/schematics/collection.json (Schematics Collection)`

```json
{
  "$schema": "../../../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "ng-add": {
      "description": "Add my library to the project.",
      "factory": "./ng-add/index#ngAdd",
      "schema": "./ng-add/schema.json"
    }
  }
}
```
   - The `$schema` path is relative to the Angular Devkit collection schema.
   - The `schematics` object describes the named schematics that are part of this collection.
   - The first entry is for a schematic named `ng-add`.
     It contains the description, and points to the factory function that is called when your schematic is executed.

1. In your library project's `package.json` file, add a "schematics" entry with the path to your schema file.
   The Angular CLI uses this entry to find named schematics in your collection when it runs commands.

File: `projects/my-lib/package.json (Schematics Collection Reference)`

```json
{
  "name": "my-lib",
  "version": "0.0.1",
```

The initial schema that you have created tells the CLI where to find the schematic that supports the `ng add` command.
Now you are ready to create that schematic.

## Providing installation support

A schematic for the `ng add` command can enhance the initial installation process for your users.
The following steps define this type of schematic.

1. Go to the `<lib-root>/schematics/ng-add` folder.
1. Create a `schema.json` file to define the options that the schematic accepts.

   File: `projects/my-lib/schematics/ng-add/schema.json (ng-add Schema)`

```json
{
  "$schema": "https://json-schema.org/schema",
  "$id": "SchematicsMyLibNgAdd",
  "title": "MyLib ng add Schema",
  "type": "object",
  "properties": {
    "project": {
      "type": "string",
      "description": "Name of the project.",
      "$default": {
        "$source": "projectName"
      }
    }
  }
}
```

1. Create a `schema.ts` file to define an interface for the options defined in the `schema.json` file.

   File: `projects/my-lib/schematics/ng-add/schema.ts (ng-add Schema Interface)`

```ts
export interface Schema {
  // Name of the project.
  project: string;
}
```

1. Create the main file, `index.ts`, and add the source code for your schematic factory function.

   File: `projects/my-lib/schematics/ng-add/index.ts (ng-add Rule Factory)`

```ts
import {Rule} from '@angular-devkit/schematics';
import {addRootImport} from '@schematics/angular/utility';
import {Schema} from './schema';

export function ngAdd(options: Schema): Rule {
  // Add an import `MyLibModule` from `my-lib` to the root of the user's project.
  return addRootImport(
    options.project,
    ({code, external}) => code`${external('MyLibModule', 'my-lib')}`,
  );
}
```

The Angular CLI will install the latest version of the library automatically, and this example is taking it a step further by adding the `MyLibModule` to the root of the application. The `addRootImport` function accepts a callback that needs to return a code block. You can write any code inside of the string tagged with the `code` function and any external symbol have to be wrapped with the `external` function to ensure that the appropriate import statements are generated.

### Define dependency type

Use the `save` option of `ng-add` to configure if the library should be added to the `dependencies`, the `devDependencies`, or not saved at all in the project's `package.json` configuration file.

File: `projects/my-lib/package.json (ng-add Reference)`

```json
"ng-add": {
  "save": "devDependencies"
},
```

Possible values are:

| Values              | Details                                 |
| :------------------ | :-------------------------------------- |
| `false`             | Don't add the package to `package.json` |
| `true`              | Add the package to the dependencies     |
| `"dependencies"`    | Add the package to the dependencies     |
| `"devDependencies"` | Add the package to the devDependencies  |

## Building your schematics

To bundle your schematics together with your library, you must configure the library to build the schematics separately, then add them to the bundle.
You must build your schematics _after_ you build your library, so they are placed in the correct directory.

- Your library needs a custom TypeScript configuration file with instructions on how to compile your schematics into your distributed library
- To add the schematics to the library bundle, add scripts to the library's `package.json` file

Assume you have a library project `my-lib` in your Angular workspace.
To tell the library how to build the schematics, add a `tsconfig.schematics.json` file next to the generated `tsconfig.lib.json` file that configures the library build.

1. Edit the `tsconfig.schematics.json` file to add the following content.

   File: `projects/my-lib/tsconfig.schematics.json (TypeScript Config)`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "lib": ["es2018", "dom"],
    "declaration": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noUnusedParameters": true,
    "noUnusedLocals": true,
    "rootDir": "schematics",
    "outDir": "../../dist/my-lib/schematics",
    "skipDefaultLibCheck": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "target": "es6",
    "types": ["jasmine", "node"]
  },
  "include": ["schematics/**/*"],
  "exclude": ["schematics/*/files/**/*"]
}
```

   | Options   | Details                                                                                                          |
   | :-------- | :--------------------------------------------------------------------------------------------------------------- |
   | `rootDir` | Specifies that your `schematics` folder contains the input files to be compiled.                                 |
   | `outDir`  | Maps to the library's output folder. By default, this is the `dist/my-lib` folder at the root of your workspace. |

1. To make sure your schematics source files get compiled into the library bundle, add the following scripts to the `package.json` file in your library project's root folder \(`projects/my-lib`\).

   File: `projects/my-lib/package.json (Build Scripts)`

```json
// #docplaster
{
  "name": "my-lib",
  "version": "0.0.1",
  "scripts": {
    "build": "tsc -p tsconfig.schematics.json",
    "postbuild": "copyfiles schematics/*/schema.json schematics/*/files/** schematics/collection.json ../../dist/my-lib/"
  },
  "peerDependencies": {
    "@angular/common": "^22.0.0",
    "@angular/core": "^22.0.0"
  },
  "schematics": "./schematics/collection.json",
  "ng-add": {
    "save": "devDependencies"
  },
  "devDependencies": {
    "copyfiles": "file:../../node_modules/copyfiles",
    "typescript": "file:../../node_modules/typescript"
  }
}
```
   - The `build` script compiles your schematic using the custom `tsconfig.schematics.json` file
   - The `postbuild` script copies the schematic files after the `build` script completes
   - Both the `build` and the `postbuild` scripts require the `copyfiles` and `typescript` dependencies.
     To install the dependencies, navigate to the path defined in `devDependencies` and run `npm install` before you run the scripts.
