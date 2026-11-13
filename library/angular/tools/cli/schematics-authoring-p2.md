---
title: "Authoring schematics (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/cli/schematics-authoring.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Authoring schematics (part 2 of 2)

## Collection contents

The top level of the root project folder for a collection contains configuration files, a `node_modules` folder, and a `src/` folder.
The `src/` folder contains subfolders for named schematics in the collection, and a schema, `collection.json`, which describes the collected schematics.
Each schematic is created with a name, description, and factory function.

```json
{
  "$schema": "../node_modules/@angular-devkit/schematics/collection-schema.json",
  "schematics": {
    "hello-world": {
      "description": "A blank schematic.",
      "factory": "./hello-world/index#helloWorld"
    }
  }
}
```

- The `$schema` property specifies the schema that the CLI uses for validation.
- The `schematics` property lists named schematics that belong to this collection.
  Each schematic has a plain-text description, and points to the generated entry function in the main file.

- The `factory` property points to the generated entry function.
  In this example, you invoke the `hello-world` schematic by calling the `helloWorld()` factory function.

- The optional `schema` property points to a JSON schema file that defines the command-line options available to the schematic.
- The optional `aliases` array specifies one or more strings that can be used to invoke the schematic.
  For example, the schematic for the Angular CLI "generate" command has an alias "g", that lets you use the command `ng g`.

### Named schematics

When you use the Schematics CLI to create a blank schematics project, the new blank schematic is the first member of the collection, and has the same name as the collection.
When you add a new named schematic to this collection, it is automatically added to the `collection.json` schema.

In addition to the name and description, each schematic has a `factory` property that identifies the schematic's entry point.
In the example, you invoke the schematic's defined functionality by calling the `helloWorld()` function in the main file, `hello-world/index.ts`.

Each named schematic in the collection has the following main parts.

| Parts         | Details                                                           |
| :------------ | :---------------------------------------------------------------- |
| `index.ts`    | Code that defines the transformation logic for a named schematic. |
| `schema.json` | Schematic variable definition.                                    |
| `schema.d.ts` | Schematic variables.                                              |
| `files/`      | Optional component/template files to replicate.                   |

It is possible for a schematic to provide all of its logic in the `index.ts` file, without additional templates.
You can create dynamic schematics for Angular, however, by providing components and templates in the `files` folder, like those in standalone Angular projects.
The logic in the index file configures these templates by defining rules that inject data and modify variables.
