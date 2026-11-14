---
title: "Migrate configuration to ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/migration/fx-to-core/examples/configuration.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Migrate configuration to ASP.NET Core

In the previous article, we began to migrate an ASP.NET MVC project to ASP.NET Core MVC. In this article, we migrate configuration.

View or download sample code (how to download)

## Setup configuration

ASP.NET Core no longer uses the *Global.asax* and *web.config* files that previous versions of ASP.NET utilized. In the earlier versions of ASP.NET, application startup logic was placed in an `Application_StartUp` method within *Global.asax*. Later, in ASP.NET MVC, a `Startup.cs` file was included in the root of the project; and, it was called when the application started. ASP.NET Core has adopted this approach completely by placing all startup logic in the `Startup.cs` file.

The *web.config* file has also been replaced in ASP.NET Core. Configuration itself can now be configured, as part of the application startup procedure described in `Startup.cs`. Configuration can still utilize XML files, but typically ASP.NET Core projects will place configuration values in a JSON-formatted file, such as `appsettings.json`. ASP.NET Core'<example-value>'t be checked into source control. See Configuration to learn more about configuration in ASP.NET Core.

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see Secure authentication flows.

To setup configuration, add the following constructor and property to the `Startup.cs` file located in the root of the project:

```csharp
public Startup(IConfiguration configuration)
{
    Configuration = configuration;
}

public IConfiguration Configuration { get; }
```

Note that at this point, the `Startup.cs` file won't compile, as we still need to add the following `using` statement:

```csharp
using Microsoft.Extensions.Configuration;
```

Add an `appsettings.json` file to the root of the project using the appropriate item template:

## Migrate configuration settings from web.config

Our ASP.NET MVC project included the required database connection string in *web.config*, in the `<connectionStrings>` element. In our ASP.NET Core project, we are going to store this information in the `appsettings.json` file. Open `appsettings.json`, and note that it already includes the following:

```json
﻿{
	"Data": {
		"DefaultConnection": {
			"ConnectionString": "Server=(localdb)\\MSSQLLocalDB;Database=_CHANGE_ME;Trusted_Connection=True;"
		}
	}
}
```

In the highlighted line depicted above, change the name of the database from **_CHANGE_ME** to the name of your database.

## Summary

ASP.NET Core places all startup logic for the application in a single file, in which the necessary services and dependencies can be defined and configured. It replaces the *web.config* file with a flexible configuration feature that can leverage a variety of file formats, such as JSON, as well as environment variables.
