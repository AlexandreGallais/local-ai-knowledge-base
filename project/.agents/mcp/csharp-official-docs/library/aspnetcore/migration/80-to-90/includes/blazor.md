---
title: "blazor"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/migration/80-to-90/includes/blazor.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# blazor

### Adopt simplified authentication state serialization for Blazor Web Apps

Blazor Web Apps can optionally adopt simplified authentication state serialization.

In the server project:

* Remove the Persisting Authentication State Provider (`PersistingAuthenticationStateProvider.cs`).

* Remove the service registration from the `Program` file. Instead, chain a call to `Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization*` on `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*`:

  ```diff
  - builder.Services.AddScoped<AuthenticationStateProvider, PersistingAuthenticationStateProvider>();

    builder.Services.AddRazorComponents()
        .AddInteractiveServerComponents()
        .AddInteractiveWebAssemblyComponents()
  +     .AddAuthenticationStateSerialization();
  ```

The API only serializes the server-side name and role claims for access in the browser. To include all claims, set `Microsoft.AspNetCore.Components.WebAssembly.Server.AuthenticationStateSerializationOptions.SerializeAllClaims` to `true`:

```csharp
.AddAuthenticationStateSerialization(options => options.SerializeAllClaims = true);
```

In the client project (`.Client`):

* Remove the Persistent Authentication State Provider (`PersistentAuthenticationStateProvider.cs`).

* Remove the service registration from the `Program` file. Instead, call `Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization*` on the service collection:

  ```diff
  - builder.Services.AddSingleton<AuthenticationStateProvider, PersistentAuthenticationStateProvider>();
  + builder.Services.AddAuthenticationStateDeserialization();
  ```

For more information, see What's new in ASP.NET Core in .NET 9.

### Streaming rendering attribute no longer requires the `true` parameter

In .NET 8, streaming rendering required you to pass `true` for the `enabled` parameter:

```razor
@attribute [StreamRendering(true)]
```

In .NET 9 or later, `true` can optionally be removed, as `true` is now the default for the `enabled` parameter:

```razor
@attribute [StreamRendering]
```
