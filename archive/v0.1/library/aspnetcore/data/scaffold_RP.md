---
title: "Scaffold a data model with dotnet scaffold in a Razor Pages project"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/data/scaffold_RP.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Scaffold a data model with dotnet scaffold in a Razor Pages project

The CLI tool, dotnet scaffold creates data access UI for many .NET project types, such as API, Aspire, Blazor, MVC, and Razor Pages. `dotnet scaffold` can be run interactively or as a command line tool via passing parameter values.

## Install and update the scaffolding tool

Install the .NET SDK.

The following command installs the scaffolder globally:

```dotnetcli
dotnet tool install --global Microsoft.dotnet-scaffold
```

See How to manage .NET tools for information on .NET tools and how to install them locally.

To launch the interactive tool, run `dotnet scaffold`. The UI changes as more features are added. Currently, the interactive UI looks similar to the following image:

To navigate the UI, use the:

* Up and down arrow keys to navigate the menu items.
* Enter key to select the highlighted menu item.
* Select and enter **Back** to return to the previous menu.

## Create and scaffold a data model in a Razor Pages project

If you have any problems with the following steps, see Tutorial: Create a Razor Pages web app with ASP.NET Core.

1. Run the following commands to create a Razor Pages project and navigate to the projects folder:
    ```dotnetcli
    dotnet new webapp -o MyWebApp
    cd MyWebApp
    ```
1. Add the `Contact` class to the `MyWebApp` project:
```csharp
namespace MyWebApp;
public class Contact
{
    public int Id { get; set; }
    public string? Firstname { get; set; }
    public string? Lastname { get; set; }
    public string? Email { get; set; }
}
```
1. Run `dotnet scaffold` in the `MyWebApp` folder and select **Razor Pages**, then enter return.
1. Navigate to **Razor Pages with Entity Framework (CRUD) (dotnet-scaffold-aspnet)**, then enter return.
1. Enter return on the selected **MyWebApp (MyWebApp.csproj)**.
1. Enter return on **Contact (Contact)**.
1. Enter `ContactDbContext`, then enter return.
1. Navigate to a Database Provider, then enter return.
1. Select **CRUD**, then enter return.
1. Select a choice for prerelease packages, then enter return.

  The `dotnet scaffold` tool makes the following changes to the project files:

* A package reference is added for Entity Framework.
* `Program.cs` is updated to initialize the database connection.
* `appsettings.json` is updated with connection information.
* `ContactDbContext.cs` is created and added to the project root directory.
* Razor Pages for CRUD operations are added to the Pages folder.

The content has been generated but the database isn't initialized. Run the following commands to initialize the DB.

```dotnetcli
dotnet tool uninstall --global dotnet-ef
dotnet tool install --global dotnet-ef
dotnet ef migrations add initialMigration
dotnet ef database update
```

In  The preceding commands:

* `dotnet tool uninstall --global dotnet-ef` uninstalls the `dotnet-ef` tool. Uninstalling ensures the latest tool is successfully installed. If `dotnet-ef` isn't installed, an error messages **A tool with the package Id 'dotnet-ef' could not be found.** You can ignore this message.
* `dotnet tool install --global dotnet-ef` installs globally the `dotnet-ef` tool.
* `dotnet ef migrations add initialMigration` adds the initial migration. For more information, see Part 2, add a model.
* `dotnet ef database update` applies the migrations to the database.

Run the app:

1. Enter `dotnet run` on the command line, which launches the app.
1. Open a browser and navigate the URL specified in the output **Now listening on: http://localhost:wxyz**, where `wxyz` is the port listed.
1. Append `/ContactPages` to the end of the URL.
1. Test the app by selecting:
    1. **Create New** to create a new app.
    1. Try the **Edit**, **Details**, and **Delete** links.

## Related content

* dotnet scaffold repo on GitHub
* How to manage .NET tools
* `Microsoft.dotnet-scaffold` NuGet package.
* Scaffold a data model with dotnet scaffold in a Razor Pages project
