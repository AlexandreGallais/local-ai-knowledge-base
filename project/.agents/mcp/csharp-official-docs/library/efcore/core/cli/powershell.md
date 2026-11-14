---
title: "EF Core tools reference (Package Manager Console) - EF Core (part 1 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/cli/powershell.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Entity Framework Core tools reference - Package Manager Console in Visual Studio

The Package Manager Console (PMC) tools for Entity Framework Core perform design-time development tasks. For example, they create migrations, apply migrations, and generate code for a model based on an existing database. The commands run inside of Visual Studio using the Package Manager Console. These tools work with both .NET Framework and .NET projects.

If you aren't using Visual Studio, we recommend the EF Core Command-line Tools instead. The .NET CLI tools are cross-platform and run inside a command prompt.

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see Secure authentication flows.

## Install the tools

Install the Package Manager Console tools by running the following command in **Package Manager Console**:

```powershell
Install-Package Microsoft.EntityFrameworkCore.Tools
```

Update the tools by running the following command in **Package Manager Console**.

```powershell
Update-Package Microsoft.EntityFrameworkCore.Tools
```

### Verify the installation

Verify that the tools are installed by running this command:

```powershell
Get-Help about_EntityFrameworkCore
```

The output looks like this (it doesn't tell you which version of the tools you're using):

```output

                     _/\__
               ---==/    \\
         ___  ___   |.    \|\
        | __|| __|  |  )   \\\
        | _| | _|   \_/ |  //|\\
        |___||_|       /   \\\/\\

TOPIC
    about_EntityFrameworkCore

SHORT DESCRIPTION
    Provides information about the Entity Framework Core Package Manager Console Tools.

<A list of available commands follows, omitted here.>
```

## Use the tools

Before using the tools:

* Understand the difference between target and startup project.
* Learn how to use the tools with .NET Standard class libraries.
* For ASP.NET Core projects, set the environment.

### Target and startup project

The commands refer to a *project* and a *startup project*.

* The *project* is also known as the *target project* because it's where the commands add or remove files. By default, the **Default project** selected in **Package Manager Console** is the target project. You can specify a different project as target project by using the <nobr>`-Project`</nobr> parameter.

* The *startup project* is the one that the tools build and run. The tools have to execute application code at design time to get information about the project, such as the database connection string and the configuration of the model. By default, the **Startup Project** in **Solution Explorer** is the startup project. You can specify a different project as startup project by using the <nobr>`-StartupProject`</nobr> parameter.

The startup project and target project are often the same project. A typical scenario where they are separate projects is when:

* The EF Core context and entity classes are in a .NET class library.
* A .NET console app or web app references the class library.

It's also possible to put migrations code in a class library separate from the EF Core context.

### Other target frameworks

The Package Manager Console tools must execute application code using a .NET runtime. Don't use a platform-specific application, such as .NET MAUI, WinUI, Blazor WebAssembly, or Azure Functions, as the startup project for the tools. Instead, put migrations in a normal cross-platform .NET project with an `IDesignTimeDbContextFactory<TContext>`, and use that project as both the target and startup project. See Using a Separate Migrations Project.

> **Important:**
> Xamarin.Android, Xamarin.iOS, Xamarin.Mac are now integrated directly into .NET (starting with .NET 6) as .NET for Android, .NET for iOS, and .NET for macOS. If you're building with these project types today, they should be upgraded to .NET SDK-style projects for continued support. For more information about upgrading Xamarin projects to .NET, see the Upgrade from Xamarin to .NET & .NET MAUI documentation.

Visual Studio and Package Manager Console normally run as 64-bit processes and can't load an x86-only startup assembly. Prefer an AnyCPU migrations project. When all design-time dependencies must be x86, use the .NET CLI with an explicitly selected x86 SDK/tool host.

### ASP.NET Core environment

You can specify the environment for ASP.NET Core projects on the command-line. This and any additional arguments are passed into Program.CreateHostBuilder.

```powershell
Update-Database -Args '--environment Production'
```

## Common parameters

The following table shows parameters that are common to all of the EF Core commands:

| Parameter                 | Description                                                                                                                                                                                                          |
|:--------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <nobr>`-Context <String>`</nobr>        | The `DbContext` class to use. Class name only or fully qualified with namespaces.  If this parameter is omitted, EF Core finds the context class. If there are multiple context classes, this parameter is required. |
| <nobr>`-Project <String>`</nobr>        | The target project. If this parameter is omitted, the **Default project** for **Package Manager Console** is used as the target project.                                                                             |
| <nobr>`-StartupProject <String>`</nobr> | The startup project. If this parameter is omitted, the **Startup project** in **Solution properties** is used as the target project.                                                                                 |
| <nobr>`-Args <String>`</nobr>           | Arguments passed to the application.                                                                                                                                                           |
| `-Verbose`                              | Show verbose output.                                                                                                                                                                                                 |

To show help information about a command, use PowerShell's `Get-Help` command.

> **Tip:**
> The `Context`, `Project`, and `StartupProject` parameters support tab-expansion.

## Add-Migration

Adds a new migration.

Parameters:

| Parameter                          | Description                                                                                                             |
|:-----------------------------------|:------------------------------------------------------------------------------------------------------------------------|
| <nobr>`-Name <String>`</nobr>      | The name of the migration. This is a positional parameter and is required.                                              |
| <nobr>`-OutputDir <String>`</nobr> | The directory to use for the output files. Paths are relative to the target project directory. Defaults to "Migrations". |
| <nobr>`-Namespace <String>`</nobr> | The namespace to use for the generated classes. Defaults to generated from the output directory.  |
| <nobr>`-NoBuild`</nobr>            | Don't build the project before running the command. Intended to be used when the build is up-to-date. Added in EF Core 11. |

The common parameters are listed above.

## Bundle-Migration

Creates an executable to update the database.

Parameters:

Parameter                              | Description
-------------------------------------- | -----------
`-Output <String>`                     | The path of executable file to create.
`-Force`                               | Overwrite existing files.
`-SelfContained`                       | Also bundle the .NET runtime so it doesn't need to be installed on the machine.
<nobr>`-TargetRuntime <String>`</nobr> | The target runtime to bundle for.
`-Framework <String>`                  | The target framework. Defaults to the first one in the project.

The common parameters are listed above.

## Drop-Database

Drops the database.

Parameters:

| Parameter                           | Description                                                                                                                     |
|:------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------|
| <nobr>`-WhatIf`</nobr>              | Show which database would be dropped, but don't drop it.                                                                        |
| <nobr>`-Connection <String>`</nobr> | The connection string to the database. Defaults to the one specified in `AddDbContext` or `OnConfiguring`. Added in EF Core 11. |

The common parameters are listed above.

## Get-DbContext

Lists and gets information about available `DbContext` types.

The common parameters are listed above.

## Get-Migration

Lists available migrations.

Parameters:

| Parameter                           | Description                                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| <nobr>`-Connection <String>`</nobr> | The connection string to the database. Defaults to the one specified in AddDbContext or OnConfiguring. |
| <nobr>`-NoConnect`</nobr>           | Don't connect to the database.                                                                         |

The common parameters are listed above.

## Optimize-DbContext

Generates a compiled version of the model used by the `DbContext`.

See Compiled models for more information.

Parameters:

| Parameter                           | Description                                                                                                                                                                                                                                                             |
|:------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <nobr>`-OutputDir <String>`</nobr>  | The directory to put files in. Paths are relative to the project directory.                                                                                                                                                                                             |
| <nobr>`-Namespace <String>`</nobr>  | The namespace to use for all generated classes. Defaults to generated from the root namespace and the output directory plus `CompiledModels`.                                                                                                                           |

The common parameters are listed above.

> **Note:**
> The PMC tools currently don't support generating code required for NativeAOT compilation and precompiled queries.

The following example uses the defaults and works if there is only one `DbContext` in the project:

```powershell
Optimize-DbContext
```

The following example optimizes the model for the context with the specified name and places it in a separate folder and namespace:

```powershell
Optimize-DbContext -OutputDir Models -Namespace BlogModels -Context BlogContext
```

## Remove-Migration

Removes the last migration (rolls back the code changes that were done for the migration).

Parameters:

| Parameter                           | Description                                                                                                  |
|:------------------------------------|:-------------------------------------------------------------------------------------------------------------|
| <nobr>`-Force`</nobr>               | Revert the migration (roll back the changes that were applied to the database).                              |
| <nobr>`-Connection <String>`</nobr> | The connection string to the database. Defaults to the one specified in `AddDbContext` or `OnConfiguring`. Added in EF Core 11. |
| <nobr>`-Offline`</nobr>             | Remove the migration without connecting to the database. Added in EF Core 11.                                |

The common parameters are listed above.

> **Note:**
> The `-Offline` and `-Force` parameters cannot be used together, since `-Force` requires a database connection to check if the migration has been applied before reverting it.
