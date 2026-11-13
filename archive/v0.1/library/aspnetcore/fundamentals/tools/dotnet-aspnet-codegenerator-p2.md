---
title: "ASP.NET Core code generator tool (`aspnet-codegenerator`) (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/tools/dotnet-aspnet-codegenerator.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core code generator tool (`aspnet-codegenerator`) (part 2 of 2)

## Generator options

The following sections detail the options available for the supported generators:

* Area (`area`)
* Controller (`controller`)
* Blazor (`blazor`)
* Blazor Identity (`blazor-identity`)
* Identity (`identity`)
* Minimal API (`minimalapi`)
* Razor page (`razorpage`)
* View (`view`)

### Area options

Usage: `dotnet aspnet-codegenerator area {AREA NAME}`

The `{AREA NAME}` placeholder is the name of the area to generate.

The preceding command generates the following folders:

* `Areas`
  * `{AREA NAME}`
    * `Controllers`
    * `Data`
    * `Models`
    * `Views`

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator area -h
```

### Blazor options

Razor components can be individually scaffolded for Blazor apps by specifying the name of the template to use. The supported templates are:

* `Empty`
* `Create`
* `Edit`
* `Delete`
* `Details`
* `List`
* `CRUD`: *CRUD* is an acronym for Create, Read, Update, and Delete. The `CRUD` template produces `Create`, `Edit`, `Delete`, `Details`, and `Index` (`List`) components for the app.

The options for the `blazor` generator are shown in the following table.

Option                           | Description
-------------------------------- | ---
`-dbProvider|--databaseProvider` | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, or `postgres`.
`-dc|--dataContext`              | Database context class to use.
`-m|--model`                     | Model class to use.
`-ns|--namespaceName`            | Specify the name of the namespace to use for the generated Endpoints file.
`--relativeFolderPath|-outDir`   | Relative output folder path. If not specified, files are generated in the project folder.

The following example:

* Uses the `Edit` template to generate an `Edit` component (`Edit.razor`) in the `Components/Pages/MoviePages` folder of the app. If the `MoviePages` folder doesn't exist, the tool creates the folder automatically.
* Uses the SQLite database provider.
* Uses `BlazorWebAppMovies.Data.BlazorWebAppMoviesContext` for the database context.
* Uses the `Movie` model.

```dotnetcli
dotnet aspnet-codegenerator blazor Edit -dbProvider sqlite -dc BlazorWebAppMovies.Data.BlazorWebAppMoviesContext -m Movie -outDir Components/Pages
```

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator blazor -h
```

For an example that uses the `blazor` generator, see Build a Blazor movie database app (Overview).

For more information, see ASP.NET Core Blazor \`QuickGrid\` component.

### Blazor Identity options

Scaffold Identity Razor components into a Blazor app with the `blazor-identity` generator.

The options for the `blazor-identity` template are shown in the following table.

Option                           | Description
-------------------------------- | ---
`-dbProvider|--databaseProvider` | Database provider to use. Options include `sqlserver` (default) and `sqlite`.
`-dc|--dataContext`              | Database context class to use.
`-f|--force`                     | Use this option to overwrite existing files.
`-fi|--files`                    | List of semicolon separated files to scaffold. Use the `-lf|--listFiles` option to see the available options.
`-lf|--listFiles`                | Lists the files that can be scaffolded by using the `-fi|--files` option.
`-rn|--rootNamespace`            | Root namespace to use for generating Identity code.
`-u|--userClass`                 | Name of the user class to generate.

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator blazor-identity -h
```

### Controller options

General options are shown in the following table.

Option                                | Description
------------------------------------- | ---
`-b|--bootstrapVersion`               | Specifies the bootstrap version and creates a `wwwroot` folder for the Bootstrap assets if the folder isn't present.
`-dbProvider|--databaseProvider`      | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`.
`-dc|--dataContext`                   | The database context class to use or the name of the class to generate.
`-f|--force`                          | Overwrite existing files.
`-l|--layout`                         | Custom layout page to use.
`-m|--model`                          | Model class to use.
`-outDir|--relativeFolderPath`        | Relative output folder path. If not specified, files are generated in the project folder.
`-scripts|--referenceScriptLibraries` | Reference script libraries in the generated views. Adds `_ValidationScriptsPartial` to `Edit` and `Create` pages.
`-sqlite|--useSqlite`                 | Flag to specify if the database context should use SQLite instead of SQL Server.
`-udl|--useDefaultLayout`             | Use the default layout for the views.

The options unique to `controller` are shown in the following table.

Option                             | Description
---------------------------------- | ---
`-actions|--readWriteActions`      | Generate controller with read/write actions without a model.
`-api|--restWithNoViews`           | Generate a controller with REST style API. `noViews` is assumed and any view related options are ignored.
`-async|--useAsyncActions`         | Generate asynchronous controller actions.
`-name|--controllerName`           | Name of the controller.
`-namespace|--controllerNamespace` | Specify the name of the namespace to use for the generated controller.
`-nv|--noViews`                    | Generate **no** views.

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator controller -h
```

For an example that uses the `controller` generator, see Part 4, add a model to an ASP.NET Core MVC app.

### Identity options

For more information, see Scaffold Identity in ASP.NET Core projects.

### Minimal API options

Scaffold a Minimal API backend with the `minimalapi` template.

The options for `minimalapi` are shown in the following table.

Option                            | Description
--------------------------------- | ---
`-dbProvider|--databaseProvider`  | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, or `postgres`.
`-dc|--dataContext`               | Database context class to use.
`-e|--endpoints`                  | Endpoints class to use (not the file name).
`-m|--model`                      | Model class to use.
`-namespace|--endpointsNamespace` | Specify the name of the namespace to use for the generated endpoints file.
`-o|--open`                       | Use this option to enable OpenAPI.
`-outDir|--relativeFolderPath`    | Relative output folder path. If not specified, files are generated in the project folder.
`-sqlite|--useSqlite`             | Flag to specify if the database context should use SQLite instead of SQL Server. |

The following example:

* Generates an endpoints class named `SpeakersEndpoints` with API endpoints that map to database operations using the `ApplicationDbContext` database context class and the `BackEnd.Models.Speaker` model.
* Adds `app.MapSpeakerEndpoints();` to the `Program` file (`Program.cs`) to register the endpoints class.

```dotnetcli
dotnet aspnet-codegenerator minimalapi -dc ApplicationDbContext -e SpeakerEndpoints -m BackEnd.Models.Speaker -o
```

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator minimalapi -h
```

### Razor page options

Razor Pages can be individually scaffolded by specifying the name of the new page and the template to use. The supported templates are:

* `Empty`
* `Create`
* `Edit`
* `Delete`
* `Details`
* `List`

Typically, the template and generated file name isn't specified, which creates the following templates:

* `Create`
* `Edit`
* `Delete`
* `Details`
* `List`

General options are shown in the following table.

Option                                | Description
------------------------------------- | ---
`-b|--bootstrapVersion`               | Specifies the bootstrap version and creates a `wwwroot` folder for the Bootstrap assets if the folder isn't present.
`-dbProvider|--databaseProvider`      | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`.
`-dc|--dataContext`                   | The database context class to use or the name of the class to generate.
`-f|--force`                          | Overwrite existing files.
`-l|--layout`                         | Custom layout page to use.
`-m|--model`                          | Model class to use.
`-outDir|--relativeFolderPath`        | Relative output folder path. If not specified, files are generated in the project folder.
`-scripts|--referenceScriptLibraries` | Reference script libraries in the generated views. Adds `_ValidationScriptsPartial` to `Edit` and `Create` pages.
`-sqlite|--useSqlite`                 | Flag to specify if the database context should use SQLite instead of SQL Server.
`-udl|--useDefaultLayout`             | Use the default layout for the views.

The options unique to `razorpage` are shown in the following table.

Option                       | Description
---------------------------- | ---
`-namespace|--namespaceName` | The name of the namespace to use for the generated `PageModel` class.
`-npm|--noPageModel`         | Don't generate a `PageModel` class for the `Empty` template.
`-partial|--partialView`     | Generate a partial view. Layout options `-l` and `-udl` are ignored if this is specified.

The following example uses the `Edit` template to generate `CustomEditPage.cshtml` and `CustomEditPage.cshtml.cs` in the `Pages/Movies` folder:

```dotnetcli
dotnet aspnet-codegenerator razorpage CustomEditPage Edit -dc RazorPagesMovieContext -m Movie -outDir Pages/Movies
```

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator razorpage -h
```

For an example that uses the `razorpage` generator, see Part 2, add a model.

### View options

Views can be individually scaffolded by specifying the name of the view and the template. The supported templates are:

* `Empty`
* `Create`
* `Edit`
* `Delete`
* `Details`
* `List`

General options are shown in the following table.

Option                                | Description
------------------------------------- | ---
`-b|--bootstrapVersion`               | Specifies the bootstrap version and creates a `wwwroot` folder for the Bootstrap assets if the folder isn't present.
`-dbProvider|--databaseProvider`      | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`.
`-dc|--dataContext`                   | The database context class to use or the name of the class to generate.
`-f|--force`                          | Overwrite existing files.
`-l|--layout`                         | Custom layout page to use.
`-m|--model`                          | Model class to use.
`-outDir|--relativeFolderPath`        | Relative output folder path. If not specified, files are generated in the project folder.
`-scripts|--referenceScriptLibraries` | Reference script libraries in the generated views. Adds `_ValidationScriptsPartial` to `Edit` and `Create` pages.
`-sqlite|--useSqlite`                 | Flag to specify if the database context should use SQLite instead of SQL Server.
`-udl|--useDefaultLayout`             | Use the default layout for the views.

The options unique to `view` are shown in the following table.

Option                             | Description
---------------------------------- | ---
`-namespace|--controllerNamespace` | Specify the name of the namespace to use for the generated controller.
`-partial|--partialView`           | Generate a partial view. Other layout options (`-l` and `-udl`) are ignored if this is specified.

The following example uses the `Edit` template to generate `CustomEditView.cshtml` in the `Views/Movies` folder:

```dotnetcli
dotnet aspnet-codegenerator view CustomEditView Edit -dc MovieContext -m Movie -outDir Views/Movies
```

Use the `-h|--help` option for help:

```dotnetcli
dotnet aspnet-codegenerator view -h
```
