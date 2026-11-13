---
title: "Introduction to Identity on ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/identity.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Introduction to Identity on ASP.NET Core

ASP.NET Core Identity:

* Is an API that supports user interface (UI) login functionality.
* Manages users, passwords, profile data, roles, claims, tokens, email confirmation, and more.

Users can create an account with the login information stored in Identity or they can use an external login provider. Supported external login providers include Facebook, Google, Microsoft Account, and Twitter.

For information on how to require authentication for all app users, see Require global user authentication.

The Identity source code is available on GitHub. Scaffold Identity and view the generated files to review the template interaction with Identity.

Identity is typically configured using a SQL Server database to store user names, passwords, and profile data. Alternatively, another persistent store can be used, for example, Azure Table Storage.

In this topic, you learn how to use Identity to register, log in, and log out a user. Note: the templates treat username and email as the same for users. For more detailed instructions about creating apps that use Identity, see Next Steps.

For more information on Identity in Blazor apps, see ASP.NET Core Blazor authentication and authorization and the articles that follow it in the Blazor documentation.

ASP.NET Core Identity isn't related to the Microsoft identity platform. Microsoft identity platform is:

* An evolution of the Azure Active Directory (Azure AD) developer platform.
* An alternative identity solution for authentication and authorization in ASP.NET Core apps.

ASP.NET Core Identity adds user interface (UI) login functionality to ASP.NET Core web apps. To secure web APIs and SPAs, consider one of the following:

* Microsoft Entra ID
* OpenIddict
* Duende IdentityServer
* Other community-supported authentication solutions

For a comparison of identity solutions, see Identity management solutions for .NET web apps.

Duende IdentityServer is an OpenID Connect and OAuth 2.0 framework for ASP.NET Core. Duende IdentityServer enables the following security features:

* Authentication as a Service (AaaS)
* Single sign-on/off (SSO) over multiple application types
* Access control for APIs
* Federation Gateway

> **Important:**
> Duende Software might require you to pay a license fee for production use of Duende IdentityServer. For more information, see Migrate from ASP.NET Core in .NET 5 to .NET 6.

For more information, see the Duende IdentityServer documentation (Duende Software website).

View or download the sample code (how to download).

## Create a Blazor Web App with authentication

Create an ASP.NET Core Blazor Web App project with Individual Accounts.

> **Note:**
> For a Razor Pages experience, see the Create a Razor Pages app with authentication section.
>
> For an MVC experience, see the Create an MVC app with authentication section.

# Visual Studio

* Select the **Blazor Web App** template. Select **Next**.
* Make the following selections:
  * **Authentication type**: **Individual Accounts**
  * **Interactive render mode**: **Server**
  * **Interactivity Location**: **Global**
* Select **Create**.

# .NET CLI

```dotnetcli
dotnet new blazor -au Individual -o BlazorApp1
```

The `-o|--output` option creates a folder for the app and sets the app name/namespace.

The preceding command creates a Blazor Web App using SQLite. To create the app with LocalDB, run the following command:

```dotnetcli
dotnet new blazor -au Individual -uld -o BlazorApp1
```

---

The generated project includes Identity Razor components. The components are found in the `Components/Account` folder of the server project. For example:

* `Components/Account/Pages/Register.razor`
* `Components/Account/Pages/Login.razor`
* `Components/Account/Pages/Manage/ChangePassword.razor`

Identity Razor components are described individually in the documentation for specific use cases and are subject to change each release. When you generate a Blazor Web App with Individual Accounts, Identity Razor components are included in the generated project. The Identity Razor components can also be inspected in the `Components/Account` folder of the server project in the Blazor Web App project template (`dotnet/aspnetcore` GitHub repository).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

For more information, see ASP.NET Core Blazor authentication and authorization and the articles that follow it in the Blazor documentation. Most of the articles in the *Security and Identity* area of the main ASP.NET Core documentation set apply to Blazor apps. However, the Blazor documentation set contains articles and guidance that supersedes or adds information. We recommend studying the general ASP.NET Core documentation set first, followed by accessing the articles in the Blazor *Security and Identity* documentation.

## Create a Razor Pages app with authentication

Create an ASP.NET Core Web Application (Razor Pages) project with Individual Accounts.

# Visual Studio

* Select the **ASP.NET Core Web App (Razor Pages)** template. Select **Next**.
* For **Authentication type**, select **Individual Accounts**.
* Select **Create**.

# .NET CLI

```dotnetcli
dotnet new webapp -au Individual -o WebApp1
```

The `-o|--output` option creates a folder for the app and sets the app name/namespace.

The preceding command creates a Razor Pages app using SQLite. To create the app with LocalDB, run the following command:

```dotnetcli
dotnet new webapp -au Individual -uld -o WebApp1
```

---

The generated project provides ASP.NET Core Identity as a Razor class library (RCL). The Identity Razor class library exposes endpoints with the `Identity` area. For example:

* `Areas/Identity/Pages/Account/Register`
* `Areas/Identity/Pages/Account/Login`
* `Areas/Identity/Pages/Account/Manage/ChangePassword`

Pages are described individually in the documentation for specific use cases and are subject to change each release. To view all of the pages in the RCL, see the ASP.NET Core reference source (`dotnet/aspnetcore` GitHub repository, `Identity/UI/src/Areas/Identity/Pages` folder). You can *scaffold* individual pages or all of the pages into the app. For more information, see Scaffold Identity in ASP.NET Core projects.

## Create an MVC app with authentication

Create an ASP.NET Core MVC project with Individual Accounts.

# Visual Studio

* Select the **ASP.NET Core Web App (Model-View-Controller)** template. Select **Next**.
* For **Authentication type**, select **Individual Accounts**.
* Select **Create**.

# .NET CLI

```dotnetcli
dotnet new mvc -au Individual -o WebApplication1
```

The `-o|--output` option creates a folder for the app and sets the app name/namespace.

The preceding command creates an MVC app using SQLite. To create the web app with LocalDB, run the following command:

```dotnetcli
dotnet new mvc -au Individual -uld -o WebApplication1
```

---

The generated project provides ASP.NET Core Identity as a Razor class library (RCL). The Identity Razor class library is based on Razor Pages and exposes endpoints with the `Identity` area. For example:

* `Areas/Identity/Pages/Account/Register`
* `Areas/Identity/Pages/Account/Login`
* `Areas/Identity/Pages/Account/Manage/ChangePassword`

Pages are described individually in the documentation for specific use cases and are subject to change each release. To view all of the pages in the RCL, see the ASP.NET Core reference source (`dotnet/aspnetcore` GitHub repository, `Identity/UI/src/Areas/Identity/Pages` folder). You can *scaffold* individual pages or all of the pages into the app. For more information, see Scaffold Identity in ASP.NET Core projects.

### Apply migrations

Apply the migrations to initialize the database.

# Visual Studio

Run the following command in the Package Manager Console (PMC):

`Update-Database`

# .NET CLI

Migrations are not necessary at this step when using SQLite.

If `dotnet ef` has not been installed, install it as a global tool:

```dotnetcli
  dotnet tool install --global dotnet-ef
```

For more information on the CLI for EF Core, see EF Core tools reference for the .NET CLI.

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the '--arch' option.
> For more information, see GitHub dotnet/aspnetcore.docs issue #29262 - _Add '-a arm64' on Apple Silicon_.

For LocalDB, run the following command:

```dotnetcli
dotnet ef database update
```

---

### Test Register and Login

Run the app and register a user. Depending on your screen size, you might need to select the navigation toggle button to see the **Register** and **Login** links.

# Visual Studio

* From the **View** menu, select **SQL Server Object Explorer** (SSOX).
* Navigate to **(localdb)MSSQLLocalDB(SQL Server 13)**. Right-click on **dbo.AspNetUsers** > **View Data**:

# .NET CLI

There are many third party tools you can download to manage and view a SQLite database, for example DB Browser for SQLite.

---

### Configure Identity services

Services are added in `Program.cs`. The typical pattern is to call methods in the following order:

1. `Add{Service}`
1. `builder.Services.Configure{Service}`

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApp1.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddRazorPages();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Password settings.
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;

    // Lockout settings.
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    // User settings.
    options.User.AllowedUserNameCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = false;
});

builder.Services.ConfigureApplicationCookie(options =>
{
    // Cookie settings
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(5);

    options.LoginPath = "/Identity/Account/Login";
    options.AccessDeniedPath = "/Identity/Account/AccessDenied";
    options.SlidingExpiration = true;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
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

app.MapRazorPages();

app.Run();
```
The preceding code configures Identity with default option values. Services are made available to the app through dependency injection.

Identity is enabled by calling `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*`. `UseAuthentication` adds authentication middleware to the request pipeline.

The template-generated app doesn't use authorization. `app.UseAuthorization` is included to ensure it's added in the correct order should the app add authorization. `UseRouting`, `UseAuthentication`, and `UseAuthorization` must be called in the order shown in the preceding code.

For more information on `IdentityOptions`, see `Microsoft.AspNetCore.Identity.IdentityOptions` and Application Startup.
