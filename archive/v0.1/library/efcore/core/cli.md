---
title: "Entity Framework Core tools reference - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/cli/index.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Entity Framework Core tools reference

The Entity Framework Core tools help with design-time development tasks. They're primarily used to manage Migrations and to scaffold a `DbContext` and entity types by reverse engineering the schema of a database.

Either of the following tools can be installed, as both tools expose the same functionality:

* The EF Core Package Manager Console tools run in the Package Manager Console in Visual Studio. We recommend using these tools if you are developing in Visual Studio as they provide a more integrated experience.

* The EF Core .NET command-line interface (CLI) tools are an extension to the cross-platform .NET CLI tools. These tools require a .NET SDK project (one with `Sdk="Microsoft.NET.Sdk"` or similar in the project file).

## Next steps

* EF Core Package Manager Console tools reference
* EF Core .NET CLI tools reference
