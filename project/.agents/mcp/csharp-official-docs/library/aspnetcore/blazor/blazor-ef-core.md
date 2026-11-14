---
title: "ASP.NET Core Blazor with Entity Framework Core (EF Core)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/blazor-ef-core.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor with Entity Framework Core (EF Core)

This article explains how to use Entity Framework Core (EF Core) in server-side Blazor apps.

Server-side Blazor is a stateful app framework. The app maintains an ongoing connection to the server, and the user's state is held in the server's memory in a *circuit*. One example of user state is data held in dependency injection (DI) service instances that are scoped to the circuit. The unique application model that Blazor provides requires a special approach to use Entity Framework Core.

> **Note:**
> This article addresses EF Core in server-side Blazor apps. Blazor WebAssembly apps run in a WebAssembly sandbox that prevents most direct database connections. Running EF Core in Blazor WebAssembly is beyond the scope of this article.

This guidance applies to components that adopt interactive server-side rendering (interactive SSR) in a Blazor Web App.

## Secure authentication flow required for production apps

This article pertains to the use of a local database that doesn't require user authentication. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production Blazor apps, see the articles in the Blazor *Security and Identity* node.

For Microsoft Azure services, we recommend using *managed identities*. Managed identities securely authenticate to Azure services without storing credentials in app code. For more information, see the following resources:

* What are managed identities for Azure resources? (Microsoft Entra documentation)
* Azure services documentation
  * Managed identities in Microsoft Entra for Azure SQL
  * How to use managed identities for App Service and Azure Functions

## Build a Blazor movie database app tutorial

For a tutorial experience building an app that uses EF Core for database operations, see Build a Blazor movie database app (Overview). The tutorial shows you how to create a Blazor Web App that can display and manage movies in a movie database.

## Database access

EF Core relies on a `Microsoft.EntityFrameworkCore.DbContext` as the means to configure database access and act as a *unit of work*. EF Core provides the `Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext*` extension for ASP.NET Core apps that registers the context as a *scoped* service. In server-side Blazor apps, scoped service registrations can be problematic because the instance is shared across components within the user's circuit. `Microsoft.EntityFrameworkCore.DbContext` isn't thread safe and isn't designed for concurrent use. The existing lifetimes are inappropriate for these reasons:

* **Singleton** shares state across all users of the app and leads to inappropriate concurrent use.
* **Scoped** (the default) poses a similar issue between components for the same user.
* **Transient** results in a new instance per request; but as components can be long-lived, this results in a longer-lived context than may be intended.

The following recommendations are designed to provide a consistent approach to using EF Core in server-side Blazor apps.

* Consider using one context per operation. The context is designed for fast, low overhead instantiation:

  ```csharp
  using var context = new ProductsDatabaseContext();

  return await context.Products.ToListAsync();
  ```

* Use a flag to prevent multiple concurrent operations:

  ```csharp
  if (Loading)
  {
      return;
  }

  try
  {
      Loading = true;

      ...
  }
  finally
  {
      Loading = false;
  }
  ```

  Place database operations after the `Loading = true;` line in the `try` block.

  Thread safety isn't a concern, so loading logic doesn't require locking database records. The loading logic is used to disable UI controls so that users don't inadvertently select buttons or update fields while data is fetched.

* If there's any chance that multiple threads may access the same code block, inject a factory and make a new instance per operation. Otherwise, injecting and using the context is usually sufficient.

* For longer-lived operations that take advantage of EF Core's change tracking or concurrency control, scope the context to the lifetime of the component.

## New `DbContext` instances

The fastest way to create a new `Microsoft.EntityFrameworkCore.DbContext` instance is by using `new` to create a new instance. However, there are scenarios that require resolving additional dependencies:

* Using `DbContextOptions` to configure the context.
* Using a connection string per `Microsoft.EntityFrameworkCore.DbContext`, such as when you use ASP.NET Core's Identity model. For more information, see Multi-tenancy (EF Core documentation).

> **Warning:**
> Don'<example-value>'t the most secure approach. For local development testing, the Secret <example-value> tool is recommended for securing sensitive data. For more information, see Securely maintain sensitive data and credentials.

The recommended approach to create a new `Microsoft.EntityFrameworkCore.DbContext` with dependencies is to use a factory. EF Core in .NET 5 or later provides a built-in factory for creating new contexts.

The following example configures SQLite and enables data logging in an app that manages contacts. The code uses an extension method (`Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContextFactory*`) to configure the database factory for DI and provide default options:

```csharp
builder.Services.AddDbContextFactory<ContactContext>(opt =>
    opt.UseSqlite($"Data Source={nameof(ContactContext.ContactsDb)}.db"));
```

The factory is injected into components to create new `Microsoft.EntityFrameworkCore.DbContext` instances.

## Scope a database context to a component method

The factory is injected into the component:

```razor
@inject IDbContextFactory<ContactContext> DbFactory
```

Create a `Microsoft.EntityFrameworkCore.DbContext` for a method using the factory (`DbFactory`):

```csharp
private async Task DeleteContactAsync()
{
    using var context = DbFactory.CreateDbContext();

    if (context.Contacts is not null)
    {
        var contact = await context.Contacts.FirstAsync(...);

        if (contact is not null)
        {
            context.Contacts?.Remove(contact);
            await context.SaveChangesAsync();
        }
    }
}
```

## Scope a database context to the lifetime of the component

You may wish to create a `Microsoft.EntityFrameworkCore.DbContext` that exists for the lifetime of a component. This allows you to use it as a unit of work and take advantage of built-in features, such as change tracking and concurrency resolution.

Implement `System.IDisposable` and inject the factory into the component:

```razor
@implements IDisposable
@inject IDbContextFactory<ContactContext> DbFactory
```

Establish a property for the `Microsoft.EntityFrameworkCore.DbContext`:

```csharp
private ContactContext? Context { get; set; }
```

`OnInitializedAsync` is overridden to create the `Microsoft.EntityFrameworkCore.DbContext`:

```csharp
protected override async Task OnInitializedAsync()
{
    Context = DbFactory.CreateDbContext();
}
```

The `Microsoft.EntityFrameworkCore.DbContext` is disposed when the component is disposed:

```csharp
public void Dispose() => Context?.Dispose();
```

## Enable sensitive data logging

`Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging*` includes application data in exception messages and framework logging. The logged data can include the values assigned to properties of entity instances and parameter values for commands sent to the database. Logging data with `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging*` is a **security risk**, as it may expose passwords and other Personally Identifiable Information (PII) when it logs SQL statements executed against the database.

We recommend only enabling `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging*` for local development and testing:

```csharp
if (builder.Environment.IsDevelopment())
{
    services.AddDbContextFactory<ContactContext>(opt =>
        opt.UseSqlite($"Data Source={nameof(ContactContext.ContactsDb)}.db")
        .EnableSensitiveDataLogging());
}
else
{
    services.AddDbContextFactory<ContactContext>(opt =>
        opt.UseSqlite($"Data Source={nameof(ContactContext.ContactsDb)}.db"));
}
```

## Related content

* EF Core documentation
* Blazor samples GitHub repository (`dotnet/blazor-samples`)
* Blazor *Security and Identity* node articles
