---
title: "ASP.NET Core Blazor authentication and authorization (part 2 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor authentication and authorization (part 2 of 7)

## Server-side Blazor authentication

Server-side Blazor apps are configured for security in the same manner as ASP.NET Core apps. For more information, see the articles under ASP.NET Core security topics.

The authentication context is only established when the app starts, which is when the app first connects to the WebSocket over a SignalR connection with the client. Authentication can be based on a cookie or some other bearer token, but authentication is managed via the SignalR hub and entirely within the circuit. The authentication context is maintained for the lifetime of the connection and is re-evaluated on reconnection.

If the app must capture users for custom services or react to updates to the user, see ASP.NET Core Blazor additional server-side security scenarios.

Blazor differs from traditional server-rendered web apps that make new HTTP requests with cookies on every page navigation. Authentication is checked during navigation events. However, cookies aren't involved. Cookies are only sent when making an HTTP request to a server, which isn't what happens when the user navigates in a Blazor app. During navigation, the user's authentication state is checked within the Blazor circuit, which you can update at any time on the server using the `RevalidatingAuthenticationStateProvider` abstraction.

> **Important:**
> Implementing a custom `NavigationManager` to achieve authentication validation during navigation isn't recommended. If the app must execute custom authentication state logic during navigation, use a custom `AuthenticationStateProvider`.

> **Note:**
> The code examples in this article adopt nullable reference types (NRTs) and .NET compiler null-state static analysis, which are supported in ASP.NET Core in .NET 6 or later. When targeting .NET 5 or earlier, remove the null type designation (`?`) from the examples in this article.

The built-in or custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` service obtains authentication state data from ASP.NET Core's `Microsoft.AspNetCore.Http.HttpContext.User`. This is how authentication state integrates with existing ASP.NET Core authentication mechanisms.

### Shared state

Server-side Blazor apps live in server memory, and multiple app sessions are hosted within the same process. For each app session, Blazor starts a circuit with its own dependency injection container scope, thus scoped services are unique per Blazor session.

> **Warning:**
> We don't recommend apps on the same server share state using singleton services unless extreme care is taken, as this can introduce security vulnerabilities, such as leaking user state across circuits.

You can use stateful singleton services in Blazor apps if they're specifically designed for it. For example, use of a singleton memory cache is acceptable because a memory cache requires a key to access a given entry. Assuming users don't have control over the cache keys that are used with the cache, state stored in the cache doesn't leak across circuits.

For general guidance on state management, see ASP.NET Core Blazor state management overview.

### Server-side security of sensitive data and credentials

In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the Secret Manager tool is recommended for securing sensitive data. For more information, see the following resources:

* Secure authentication flows (ASP.NET Core documentation)
* Managed identities for Microsoft Azure services (Blazor documentation)

For client-side and server-side local development and testing, use the Secret Manager tool to secure sensitive credentials.

### Project template

Create a new server-side Blazor app by following the guidance in Tooling for ASP.NET Core Blazor.

# Visual Studio

After choosing the server-side app template and configuring the project, select the app's authentication under **Authentication type**:

* **None** (default): No authentication.
* **Individual Accounts**: User accounts are stored within the app using ASP.NET Core Identity.

# Visual Studio Code

When issuing the .NET CLI command to create and configure the server-side Blazor app, indicate the authentication mechanism with the `-au|--auth` option:

```dotnetcli
-au {AUTHENTICATION}
```

> **Note:**
> For the full command, see Tooling for ASP.NET Core Blazor.

Permissible authentication values for the `{AUTHENTICATION}` placeholder are shown in the following table.

| Authentication mechanism | Description |
| ------------------------ | ----------- |
| `None` (default)         | No authentication |
| `Individual`             | Users stored in the app with ASP.NET Core Identity |

For more information, see the `dotnet new` command in the .NET Guide.

# .NET CLI

When issuing the .NET CLI command to create and configure the server-side Blazor app, indicate the authentication mechanism with the `-au|--auth` option:

```dotnetcli
-au {AUTHENTICATION}
```

> **Note:**
> For the full command, see Tooling for ASP.NET Core Blazor.

Permissible authentication values for the `{AUTHENTICATION}` placeholder are shown in the following table.

| Authentication mechanism | Description |
| ------------------------ | ----------- |
| `None` (default)         | No authentication |
| `Individual`             | Users stored in the app with ASP.NET Core Identity |

For more information:

* See the `dotnet new` command in the .NET Guide.
* Execute the help command for the template in a command shell:

  ```dotnetcli
  dotnet new {PROJECT TEMPLATE} --help
  ```

  In the preceding command, the `{PROJECT TEMPLATE}` placeholder is the project template.

---

### Blazor Identity UI (Individual Accounts)

Blazor supports generating a full Blazor-based Identity UI when you choose the authentication option for *Individual Accounts*.

The Blazor Web App template scaffolds Identity code for a SQL Server database. The command line version uses SQLite and includes a SQLite database for Identity.

The template:

* Supports interactive server-side rendering (interactive SSR) and client-side rendering (CSR) scenarios with authenticated users.
* Adds Identity Razor components and related logic for routine authentication tasks, such as signing users in and out. The Identity components also support advanced Identity features, such as account confirmation and password recovery and multi-factor authentication using a third-party app. Note that the Identity components themselves don't support interactivity.
* Adds the Identity-related packages and dependencies.
* References the Identity packages in the imports file (`_Imports.razor`).
* Creates a custom user Identity class (`ApplicationUser`).
* Creates and registers an EF Core database context (`ApplicationDbContext`).
* Configures routing for the built-in Identity endpoints.
* Includes Identity validation and business logic.

To inspect the Blazor framework's Identity components, access them in the `Pages` and `Shared` folders of the `Components/Account` folder in the server project of the Blazor Web App project template (`dotnet/aspnetcore` GitHub repository).

When you choose the Interactive WebAssembly or Interactive Auto render modes, the server handles all authentication and authorization requests, and the Identity components render statically on the server in the Blazor Web App's main project.

The framework provides a custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` in both the server and client (`.Client`) projects to flow the user's authentication state to the browser. The server project calls `Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization*`, while the client project calls `Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization*`. Authenticating on the server rather than the client allows the app to access authentication state during prerendering and before the .NET WebAssembly runtime is initialized. The custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` implementations use the Persistent Component State service (`Microsoft.AspNetCore.Components.PersistentComponentState`) to serialize the authentication state into HTML comments and then read it back from WebAssembly to create a new `Microsoft.AspNetCore.Components.Authorization.AuthenticationState` instance. For more information, see the Manage authentication state in Blazor Web Apps section.

Only for Interactive Server solutions, `IdentityRevalidatingAuthenticationStateProvider` (`Components/Account/IdentityRevalidatingAuthenticationStateProvider.cs`) in the server project of the Blazor Web App project template (`dotnet/aspnetcore` GitHub repository) is a server-side `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` that revalidates the security stamp for the connected user every 30 minutes an interactive circuit is connected.

Blazor Identity depends on `Microsoft.EntityFrameworkCore.DbContext` instances not created by a factory, which is intentional because `Microsoft.EntityFrameworkCore.DbContext` is sufficient for the project template's Identity components to render statically without supporting interactivity.

For a description on how global interactive render modes are applied to non-Identity components while at the same time enforcing static SSR for the Identity components, see ASP.NET Core Blazor render modes.

For more information on persisting prerendered state, see ASP.NET Core Blazor prerendered state persistence.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### Manage authentication state in Blazor Web Apps

*This section applies to Blazor Web Apps that adopt:*

* Individual Accounts
* *Client-side rendering (CSR, WebAssembly-based interactivity).*

A client-side authentication state provider is only used within Blazor and isn't integrated with the ASP.NET Core authentication system. During prerendering, Blazor respects the metadata defined on the page and uses the ASP.NET Core authentication system to determine if the user is authenticated. When a user navigates from one page to another, a client-side authentication provider is used. When the user refreshes the page (full-page reload), the client-side authentication state provider isn't involved in the authentication decision on the server. Since the user's state isn't persisted by the server, any authentication state maintained client-side is lost.

To address this, the best approach is to perform authentication within the ASP.NET Core authentication system. The client-side authentication state provider only takes care of reflecting the user's authentication state. Examples for how to accomplish this with authentication state providers are demonstrated by the Blazor Web App project template and described below.

In the server project's `Program` file, call `Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization*`, which serializes the `Microsoft.AspNetCore.Components.Authorization.AuthenticationState` returned by the server-side `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` using the Persistent Component State service (`Microsoft.AspNetCore.Components.PersistentComponentState`):

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveWebAssemblyComponents()
    .AddAuthenticationStateSerialization();
```

The API only serializes the server-side name and role claims for access in the browser. To include all claims, set `Microsoft.AspNetCore.Components.WebAssembly.Server.AuthenticationStateSerializationOptions.SerializeAllClaims` to `true` in the server-side call to `Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization*`:

```csharp
builder.Services.AddRazorComponents()
    .AddInteractiveWebAssemblyComponents()
    .AddAuthenticationStateSerialization(
        options => options.SerializeAllClaims = true);
```

In the client (`.Client`) project's `Program` file, call `Microsoft.Extensions.DependencyInjection.WebAssemblyAuthenticationServiceCollectionExtensions.AddAuthenticationStateDeserialization*`, which adds an `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` where the `Microsoft.AspNetCore.Components.Authorization.AuthenticationState` is deserialized from the server using `AuthenticationStateData` and the Persistent Component State service (`Microsoft.AspNetCore.Components.PersistentComponentState`). There should be a corresponding call to `Microsoft.Extensions.DependencyInjection.WebAssemblyRazorComponentsBuilderExtensions.AddAuthenticationStateSerialization*` in the server project.

```csharp
builder.Services.AddAuthorizationCore();
builder.Services.AddCascadingAuthenticationState();
builder.Services.AddAuthenticationStateDeserialization();
```

### Additional claims and tokens from external providers

To store additional claims from external providers, see Persist additional claims and tokens from external providers in ASP.NET Core.

### Azure App Service on Linux with Identity Server

Specify the issuer explicitly when deploying to Azure App Service on Linux with Identity Server. For more information, see Use Identity to secure a Web API backend for SPAs.
