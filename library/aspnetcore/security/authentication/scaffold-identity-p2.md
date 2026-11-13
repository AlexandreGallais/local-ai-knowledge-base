---
title: "Scaffold Identity in ASP.NET Core projects (part 2 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/scaffold-identity.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Scaffold Identity in ASP.NET Core projects (part 2 of 5)

## Scaffold Identity into a Razor project without existing authorization

Install the Microsoft.VisualStudio.Web.CodeGeneration.Design NuGet package.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

---

Run the Identity scaffolder with the following procedures.

# Visual Studio

1. In **Solution Explorer**, right-click the project, and select **Add** > **New Scaffolded Item**.

1. In the left pane of the **Add New Scaffolded Item** dialog, select **Identity**.

1. In the center pane, select **Identity**, and then select **Add**.

1. In the **Add Identity** dialog, select your desired options:

   1. If you have an existing customized layout page for Identity (*_Layout.cshtml*), select the existing page to avoid overwriting your layout with incorrect markup by the scaffolder. For example, select either:

      - *Pages/Shared/_Layout.cshtml* for Razor Pages or Blazor Server projects with existing Razor Pages infrastructure.
      - *Views/Shared/_Layout.cshtml* for MVC projects or Blazor Server projects with existing MVC infrastructure.

   1. Select the plus icon (**+**) and add the database context class, **DbContext class**. You must select at least one file to add your data context.

      - To create a data context, select the plus icon (**+**). Accept the default value or specify a new class for Identity.

      - To create a new user class, select the plus icon (**+**) for **User class** and specify the class (for example, `ContosoUser` for a company named "Contoso").

   1. Select **Add** to run the scaffolder.

# .NET CLI

1. If the ASP.NET Core scaffolder isn't already installed, run the following command to install it now:

   ```dotnetcli
   dotnet tool install -g dotnet-aspnet-codegenerator
   ```

   > **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the '--arch' option.
> For more information, see GitHub dotnet/aspnetcore.docs issue #29262 - _Add '-a arm64' on Apple Silicon_.

1. Add required NuGet package references to the project file (_.csproj_). Run the following commands in the project directory:

   ```dotnetcli
   dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
   dotnet add package Microsoft.EntityFrameworkCore.Design
   dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
   dotnet add package Microsoft.AspNetCore.Identity.UI
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.EntityFrameworkCore.Tools
   ```

1. Run the following command to list the Identity scaffolder options:

   ```dotnetcli
   dotnet aspnet-codegenerator identity -h
   ```

   If you get a scaffolding error, verify the Target Framework Moniker (TFM) matches the NuGet package version in the project file. For example, the following project file contains the version 3.1 for .NET Core and the listed NuGet packages:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore" Version="3.1.0" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="3.1.0" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.UI" Version="3.1.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="3.1.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="3.1.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="3.1.0" />
    <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="3.1.0" />
  </ItemGroup>

</Project>
```

1. In the project folder, run the Identity scaffolder with the options you want.

   For example, to set up identity with the default UI and the minimum number of files, run the following command:

   ```dotnetcli
   dotnet aspnet-codegenerator identity --useDefaultUI
   ```

---

### Migrations, UseAuthentication, and layout

The generated Identity database code requires Entity Framework Core Migrations. If a migration to generate the Identity schema isn't already created and applied to the database, use the following procedures to create a migration and update the database.

# Visual Studio

Visual Studio Connected Services are used to add an EF Core migration and update the database.

1. In **Solution Explorer**, double-click **Connected Services**.

1. In the **SQL Server Express LocalDB** area of **Service Dependencies**, select **More actions** (**...**) > **Add migration**.

1. Give the migration a **Migration name**, such as `CreateIdentitySchema`, which is a name that describes the migration.

   Wait for the database context to load in the **DbContext class names** field. The action can take a few seconds.

1. Select **Finish** to complete the update. After the operation finishes, select **Close**.

1. Select **More actions** (**...**) > **Update database**.

   The **Update database with the latest migration** dialog opens.

   Wait for the **DbContext class names** field to update and for prior migrations to load. The action can take a few seconds.

1. Select **Finish** to complete the update. After the operation finishes, select **Close**.

The update database command runs the `Up` method migrations that aren't applied in a migration code file created by the scaffolder. In this case, the command runs the `Up` method in the _Migrations/{TIME STAMP}\_{MIGRATION NAME}.cs_ file, which creates the Identity tables, constraints, and indexes. The `{TIME STAMP}` placeholder is a time stamp, and the `{MIGRATION NAME}` placeholder is the migration name.

# .NET CLI

In a command shell, run the following commands:

```dotnetcli
dotnet ef migrations add CreateIdentitySchema
dotnet ef database update
```

---

If the Identity schema is created but not applied to the database, you only need to run the command to update the database:

# Visual Studio

1. In **Solution Explorer**, double-click **Connected Services**.

1. In the **SQL Server Express LocalDB** area of **Service Dependencies**, select **More actions** (**...**) > **Update database**.

   The **Update database with the latest migration** dialog opens.

   Wait for the **DbContext class names** field to update and for prior migrations to load. The action can take a few seconds.

1. Select **Finish** to complete the update. After the operation finishes, select **Close**.

# .NET CLI

In a command shell, run the dotnet ef database update command:

```dotnetcli
dotnet ef database update
```

---

You can confirm the application of an Identity schema with the following command. The output of the command includes an "`applied`" column to show which migrations are applied to the database.

# Visual Studio

In the Visual Studio **Package Manager Console**, run the Get-Migration command:

```powershell
Get-Migration
```

If more than one database context exists, specify the context with the `-Context` parameter.

# .NET CLI

In a command shell, run the dotnet ef migrations list command:

```dotnetcli
dotnet ef migrations list
```

If more than one database context exists, specify the context with the `--context` parameter.

---

<!--
### Enable authentication

Update the `Startup` class with code similar to the following:

```csharp
public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddRazorPages();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseDatabaseErrorPage();
        }
        else
        {
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapRazorPages();
        });
    }
}
```

`UseHsts` is recommended but not required. For more information, see HTTP Strict Transport Security (HSTS) protocol. -->

### Layout changes

As an option, you can add the login partial (`_LoginPartial`) to the layout file:

```cshtml
﻿<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - WebRPnoAuth2Auth</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.css" />
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
    <link rel="stylesheet" href="~/WebRPnoAuth2Auth.styles.css" asp-append-version="true" />
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container">
                <a class="navbar-brand" asp-area="" asp-page="/Index">WebRPnoAuth2Auth</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">
                        <li class="nav-item">
                            <a class="nav-link text-dark" asp-area="" asp-page="/Index">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-dark" asp-area="" asp-page="/Privacy">Privacy</a>
                        </li>
                    </ul>
                    <partial name="_LoginPartial" />
                </div>
            </div>
        </nav>
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>

    <footer class="border-top footer text-muted">
        <div class="container">
            &copy; 2021 - WebRPnoAuth2Auth - <a asp-area="" asp-page="/Privacy">Privacy</a>
        </div>
    </footer>

    <script src="~/lib/jquery/dist/jquery.js"></script>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.js"></script>
    <script src="~/js/site.js" asp-append-version="true"></script>

    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```
