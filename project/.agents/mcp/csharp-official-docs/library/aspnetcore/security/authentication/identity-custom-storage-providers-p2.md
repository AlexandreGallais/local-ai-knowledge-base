---
title: "Custom storage providers for ASP.NET Core Identity (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/identity-custom-storage-providers.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Custom storage providers for ASP.NET Core Identity (part 2 of 2)

## Reconfigure app to use a new storage provider

Once you have implemented a storage provider, you configure your app to use it. If your app used the default provider, replace it with your custom provider.

1. Remove the `Microsoft.AspNetCore.Identity.EntityFrameworkCore` NuGet package.
1. If the storage provider resides in a separate project or package, add a reference to it.
1. Replace all references to `Microsoft.AspNetCore.Identity.EntityFrameworkCore` with a using statement for the namespace of your storage provider.
1. Change the `AddIdentity` method to use the custom types. You can create your own extension methods for this purpose. See IdentityServiceCollectionExtensions for an example.
1. If you are using Roles, update the `RoleManager` to use your `RoleStore` class.
1. Update the connection string and credentials to your app's configuration.

> **Warning:**
> This article shows the use of connection strings. When a local database is used for development and testing, database user authentication via the connection string isn't required.
> In production environments, connection strings sometimes include a password for authenticating database access or database operations. A resource owner password <example-value> (ROPC) in a connection string is a security risk that should be avoided in production apps. Production apps should use the most secure authentication flow available.
> For more information on authentication for apps deployed to test or production environments, see ASP.NET Core security topics.

Example:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add identity types
builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddDefaultTokenProviders();

// Identity Services
builder.Services.AddTransient<IUserStore<ApplicationUser>, CustomUserStore>();
builder.Services.AddTransient<IRoleStore<ApplicationRole>, CustomRoleStore>();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddTransient<SqlConnection>(e => new SqlConnection(connectionString));
builder.Services.AddTransient<DapperUsersTable>();

// additional configuration

builder.Services.AddRazorPages();

var app = builder.Build();
```

## References

* Identity model customization
* Custom Storage Providers for ASP.NET 4.x Identity
* ASP.NET Core Identity: This repository includes links to community maintained store providers.
* View or download sample from GitHub.
