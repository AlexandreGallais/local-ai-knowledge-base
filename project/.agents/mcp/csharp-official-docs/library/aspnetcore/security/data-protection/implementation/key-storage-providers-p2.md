---
title: "Key storage providers in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/data-protection/implementation/key-storage-providers.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Key storage providers in ASP.NET Core (part 2 of 2)

## Entity Framework Core

The Microsoft.AspNetCore.DataProtection.EntityFrameworkCore package provides a mechanism for storing data protection keys to a database using Entity Framework Core. The `Microsoft.AspNetCore.DataProtection.EntityFrameworkCore` NuGet package must be added to the project file, it's not part of the Microsoft.AspNetCore.App metapackage.

With this package, keys can be shared across multiple instances of a web app.

To configure the EF Core provider, call the `Microsoft.AspNetCore.DataProtection.EntityFrameworkCoreDataProtectionExtensions.PersistKeysToDbContext*` method:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.Configure<CookiePolicyOptions>(options =>
    {
        options.CheckConsentNeeded = context => true;
        options.MinimumSameSitePolicy = SameSiteMode.None;
    });

    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(
            Configuration.GetConnectionString("DefaultConnection")));

    // Add a DbContext to store your Database Keys
    services.AddDbContext<MyKeysContext>(options =>
        options.UseSqlServer(
            Configuration.GetConnectionString("MyKeysConnection")));

    // using Microsoft.AspNetCore.DataProtection;
    services.AddDataProtection()
        .PersistKeysToDbContext<MyKeysContext>();

    services.AddDefaultIdentity<IdentityUser>()
        .AddDefaultUI(UIFramework.Bootstrap4)
        .AddEntityFrameworkStores<ApplicationDbContext>();
    services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
}
```

The generic parameter, `TContext`, must inherit from `Microsoft.EntityFrameworkCore.DbContext` and implement `Microsoft.AspNetCore.DataProtection.EntityFrameworkCore.IDataProtectionKeyContext`:

```csharp
﻿using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApp1.Data;

namespace WebApp1
{
    class MyKeysContext : DbContext, IDataProtectionKeyContext
    {
        // A recommended constructor overload when using EF Core 
        // with dependency injection.
        public MyKeysContext(DbContextOptions<MyKeysContext> options) 
            : base(options) { }

        // This maps to the table that stores keys.
        public DbSet<DataProtectionKey> DataProtectionKeys { get; set; }
    }
}
```

Create the `DataProtectionKeys` table.

# Visual Studio

Execute the following commands in the **Package Manager Console** (PMC) window:

```powershell
Add-Migration AddDataProtectionKeys -Context MyKeysContext
Update-Database -Context MyKeysContext
```

# .NET CLI

Execute the following commands in a command shell:

```dotnetcli
dotnet ef migrations add AddDataProtectionKeys --context MyKeysContext
dotnet ef database update --context MyKeysContext
```

---

`MyKeysContext` is the `DbContext` defined in the preceding code sample. If you're using a `DbContext` with a different name, substitute your `DbContext` name for `MyKeysContext`.

The `DataProtectionKeys` class/entity adopts the structure shown in the following table.

| Property/Field | CLR Type | SQL Type              |
| -------------- | -------- | --------------------- |
| `Id`           | `int`    | `int`, PK, `IDENTITY(1,1)`, not null   |
| `FriendlyName` | `string` | `nvarchar(MAX)`, null |
| `Xml`          | `string` | `nvarchar(MAX)`, null |

## Custom key <example-value>

If the in-box mechanisms aren't appropriate, the developer can specify their own key <example-value> mechanism by providing a custom `Microsoft.AspNetCore.DataProtection.Repositories.IXmlRepository`.
