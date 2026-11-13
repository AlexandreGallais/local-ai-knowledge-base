---
title: "Workspace and project file structure (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/reference/configs/file-structure.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Workspace and project file structure (part 2 of 2)

## Library project files

When you generate a library using the CLI (with a command such as `ng generate library my-lib`), the generated files go into the `projects/` folder of the workspace.
For more information about creating your own libraries, see Creating Libraries.

Unlike an application, a library has its own `package.json` configuration file.

Under the `projects/` folder, the `my-lib` folder contains your library code.

| Library source files     | Purpose                                                                                                                                                                                         |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib`                | Contains your library project's logic and data. Like an application project, a library project can contain components, services, modules, directives, and pipes.                                |
| `src/public-api.ts`      | Specifies all files that are exported from your library.                                                                                                                                        |
| `ng-package.json`        | Configuration file used by ng-packagr for building your library.                                                                                    |
| `package.json`           | Configures npm package dependencies that are required for this library.                                                                                       |
| `tsconfig.lib.json`      | Library-specific TypeScript Configuration, including Angular compiler options. |
| `tsconfig.lib.prod.json` | Library-specific TypeScript Configuration that is used when building the library in production mode.                         |
| `tsconfig.spec.json`     | TypeScript Configuration for the library's unit tests.                                                                       |
