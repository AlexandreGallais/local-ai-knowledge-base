---
title: "Connection Strings - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/miscellaneous/connection-strings.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Connection Strings

Most database providers require a connection string to connect to the database. The connection string:

* Can contain sensitive information that needs to be protected.
* May need to change when the app moves to different environments, such as development, testing, and production.

For more information, see Secure authentication flows

## ASP.NET Core

The ASP.NET Core configuration can store connection strings with various providers:

* In the `appsettings.Development.json` or `appsettings.json` file.
* In an environment variable
* Using Azure Key Vault
* Using the Secret <example-value> tool

> **Warning:**
> Secrets should never be added to configuration files.

For example, the Secret <example-value> tool can store the database password. When scaffolding and using Secret <example-value>, a connection string consists of `Name=<database-alias>`.

See the Configuration section of the ASP.NET Core documentation for more information.

```dotnetcli
dotnet user-secrets init
dotnet user-secrets set ConnectionStrings:YourDatabaseAlias "<example-value>"
```

For example, to connect to a SQL Server instance running locally in a Docker container, use SQL authentication with a user ID and password <example-value> of LocalDB:

```dotnetcli
dotnet user-secrets set ConnectionStrings:YourDatabaseAlias "<example-value>"
```

> **Note:**
> `TrustServerCertificate=True` skips validation of the server's certificate. Use it only for local development, for example with the self-signed certificate of a SQL Server container. Remove it for other environments and use a server certificate that the client trusts.

Then, in scaffolding, use a connection string that consists of `Name=<database-alias>`.

### .NET CLI

```dotnetcli
dotnet ef dbcontext scaffold Name=ConnectionStrings:YourDatabaseAlias Microsoft.EntityFrameworkCore.SqlServer
```

### Visual Studio PMC

```powershell
Scaffold-DbContext 'Name=ConnectionStrings:YourDatabaseAlias' Microsoft.EntityFrameworkCore.SqlServer
```

***

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see Secure authentication flows.

The following example shows the connection string stored in `appsettings.json`.

```json
{
  "ConnectionStrings": {
    "BloggingDatabase": "Server=(localdb)\\mssqllocaldb;Database=EFGetStarted.ConsoleApp.NewDb;Trusted_Connection=True;"
  },
}
```

The context is typically configured in `Program.cs` with the connection string being read from configuration. Note the GetConnectionString method looks for a configuration value whose key is `ConnectionStrings:<connection string name>`. `GetConnectionString` requires the Microsoft.Extensions.Configuration namespace.

```csharp
var conString = builder.Configuration.GetConnectionString("BloggingContext") ??
     throw new InvalidOperationException("Connection string 'BloggingContext'" +
    " not found.");
builder.Services.AddDbContext<BloggingContext>(options =>
    options.UseSqlServer(conString));
```

## WinForms & WPF Applications

WinForms, WPF, and ASP.NET 4 applications have a tried and tested connection string pattern. The connection string should be added to your application's `App.config` file, or `Web.config` when using ASP.NET. Connection string containing sensitive information, such as username and password, should protect the contents of the configuration file using Protected Configuration.

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>

  <connectionStrings>
    <add name="BloggingDatabase"
         connectionString="Server=(localdb)\mssqllocaldb;Database=Blogging;Trusted_Connection=True;" />
  </connectionStrings>
</configuration>
```

> **Tip:**
> The `providerName` setting is not required on EF Core connection strings stored in App.config because the database provider is configured via code.

You can then read the connection string using the `ConfigurationManager` API in your context's `OnConfiguring` method. You may need to add a reference to the `System.Configuration` framework assembly to be able to use this API.

```csharp
public class BloggingContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<Post> Posts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlServer(ConfigurationManager.ConnectionStrings["BloggingDatabase"].ConnectionString);
    }
}
```

## Universal Windows Platform (UWP)

Connection strings in a UWP application are typically a SQLite connection that just specifies a local filename. They typically don't contain sensitive information, and don't need to be changed as an application is deployed. As such, these connection strings are usually fine to be left in code, as shown below. If you wish to move them out of code then UWP supports the concept of settings, see the App Settings section of the UWP documentation for details.

```csharp
public class BloggingContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<Post> Posts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
            optionsBuilder.UseSqlite("Data Source=blogging.db");
    }
}
```
