---
title: ".NET upgrade scenarios and skills (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/porting/github-copilot-upgrade/dotnet-scenarios-and-skills.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET upgrade scenarios and skills (part 2 of 2)

## Upgrade skills: web and ASP.NET

Skills for upgrading ASP.NET Framework applications to ASP.NET Core.

### ASP.NET Framework upgrade

| Skill | What it does |
|---|---|
| **Upgrading ASP.NET Framework to Core** | Orchestrates the upgrade from ASP.NET Framework (MVC and Web API) to ASP.NET Core, and defines the order the other web skills run in. |
| **Upgrading ASP.NET Identity** | Upgrades ASP.NET MVC Identity to ASP.NET Core Identity, including `IdentityDbContext`, `UserManager`, `SignInManager`, auth middleware, and OWIN cleanup. |
| **Upgrading Global.asax** | Converts `Global.asax` lifecycle events (`Application_Start`, `Application_Error`) to ASP.NET Core `Program.cs` and middleware. |
| **Upgrading OWIN to ASP.NET Core** | Replaces OWIN/Katana middleware (`IAppBuilder`, `OwinMiddleware`), authentication, pipeline components, and SignalR 2.x with ASP.NET Core equivalents. |
| **Scaffolding a YARP proxy project** | Creates a new ASP.NET Core project with a YARP reverse proxy alongside an existing .NET Framework app, for incremental side-by-side upgrades. |

### MVC features

| Skill | What it does |
|---|---|
| **Upgrading MVC authentication** | Upgrades Forms Authentication, membership providers, Windows Authentication, token-based auth, authorization rules, and anti-forgery tokens to ASP.NET Core. |
| **Upgrading MVC bundling** | Converts `System.Web.Optimization` bundling to direct `<script>` and `<link>` tags or modern bundlers. |
| **Upgrading MVC configuration** | Upgrades `web.config` settings to the ASP.NET Core configuration system, including `appsettings.json`, `IConfiguration`, and `IOptions`. |
| **Upgrading MVC content negotiation** | Converts `MediaTypeFormatter` subclasses to input and output formatters, and replaces `IContentNegotiator` with `OutputFormatterSelector`. |
| **Upgrading MVC controllers** | Upgrades MVC and Web API controllers and action results to ASP.NET Core patterns, including `HttpResponseMessage` and `IHttpActionResult` returns. |
| **Upgrading MVC dependency injection** | Upgrades `DependencyResolver` registrations to ASP.NET Core built-in DI or a modernized third-party container. |
| **Upgrading MVC filters** | Converts global MVC filters (`GlobalFilters`, `FilterConfig`, `HandleErrorAttribute`) to ASP.NET Core exception handling middleware and the filter pipeline. |
| **Upgrading MVC HTTP pipeline** | Upgrades `IHttpModule`, `IHttpHandler`, and `.ashx` handlers to ASP.NET Core middleware and endpoints. |
| **Upgrading MVC HttpContext** | Upgrades `HttpContext.Current`, `HttpRequest`, `HttpResponse`, and `HttpServerUtility` usage to ASP.NET Core equivalents. |
| **Upgrading MVC logging** | Upgrades `System.Diagnostics.Trace`, log4net, NLog, ELMAH, and `customErrors` to ASP.NET Core logging, error middleware, and health checks. |
| **Upgrading MVC model binding** | Upgrades binding source attributes, custom model binders, value providers, and over-posting protection to ASP.NET Core. |
| **Upgrading MVC Razor views** | Converts HTML helpers to tag helpers, child actions to view components, and updates layout infrastructure. |
| **Upgrading MVC routing** | Converts `RouteCollection` routing to ASP.NET Core endpoint routing (`MapControllerRoute`, attribute routing). |
| **Upgrading MVC session state** | Converts `HttpSessionState` to `ISession` with a distributed cache backend, and moves `TempData` to the cookie-based provider. |
| **Upgrading MVC static files** | Moves `Content/`, `Scripts/`, and `App_Data/` into `wwwroot/`, configures static files middleware, and replaces `VirtualPathProvider` with `IFileProvider`. |
| **Upgrading MVC System.Web adapters** | Installs `Microsoft.AspNetCore.SystemWebAdapters` compatibility shims so `System.Web` patterns keep working during an incremental upgrade. |
| **Upgrading MVC validation** | Upgrades data annotations, custom `ValidationAttribute` classes, `ModelState` handling, unobtrusive client validation, and FluentValidation integration. |

### WCF

| Skill | What it does |
|---|---|
| **Upgrading WCF to CoreWCF** | Upgrades server-side WCF services to CoreWCF for .NET 6+. Converts hosting, configuration, bindings, behavior extensions, and APM-style contracts. |

### Web Forms and Blazor Server

| Skill | What it does |
|---|---|
| **Upgrading Web Forms to Blazor Server** | Handles the full upgrade: Blazor project setup (side-by-side or in-place), the `Routes` component, `App.razor` interactive server render modes, and static asset migration. |
| **Managing Blazor Server authentication** | Solves Blazor Server auth problems with ASP.NET Core Identity, such as a null `HttpContext` during WebSocket circuits and cookie operations that fail silently in component handlers. |
| **Managing Blazor Server data access** | Solves Blazor Server data and state problems, such as a null `Session` in WebSocket circuits, `DbContext` threading errors, and lost wizard or cart state. |

## Upgrade skills: cloud

| Skill | What it does |
|---|---|
| **Upgrading Azure Functions Startup** | Upgrades Azure Functions from in-process startup hooks (`FunctionsStartup`, `IFunctionsHostBuilder`) to the isolated worker model with `Program.cs`. |
| **Upgrading Azure Functions to v2** | Upgrades Azure Functions to the v2 isolated worker pattern using `IHostApplicationBuilder` and Application Insights. |

## Upgrade skills: libraries

Most library skills are deprecation-driven: they activate when a package is flagged as obsolete or deprecated and must be replaced, not when a still-supported package needs a routine version bump.

| Skill | What it does |
|---|---|
| **Upgrading ADAL to MSAL** | Upgrades the deprecated Azure Active Directory Authentication Library (ADAL) to Microsoft Authentication Library (MSAL). |
| **Upgrading ASP.NET SignalR** | Upgrades the obsolete `Microsoft.AspNet.SignalR` to `Microsoft.AspNetCore.SignalR`. |
| **Upgrading Autofac to .NET DI** | Removes Autofac entirely and upgrades all registrations, lifetimes, and modules to built-in ASP.NET Core dependency injection. |
| **Integrating Autofac with .NET** | Keeps Autofac as the DI container but modernizes its ASP.NET Core integration and moves setup into `Program.cs`. |
| **Upgrading Azure Key Vault** | Upgrades the deprecated `Microsoft.Azure.KeyVault` SDK to the `Azure.Security.KeyVault` client libraries. |
| **Upgrading Azure Service Bus** | Upgrades the deprecated `WindowsAzure.ServiceBus` to `Azure.Messaging.ServiceBus`. |
| **Upgrading Azure Storage** | Upgrades the deprecated `WindowsAzure.Storage` to the modern Azure SDK storage libraries, such as `Azure.Storage.Blobs` and `Azure.Data.Tables`. |
| **Upgrading Bond interfaces** | Upgrades the obsolete `Microsoft.Bond.Interfaces` package to the unified `Bond.CSharp` SDK. |
| **Upgrading Cosmos DB bulk executor** | Upgrades the deprecated `Microsoft.Azure.CosmosDB.BulkExecutor` library to built-in bulk support in the `Microsoft.Azure.Cosmos` SDK. |
| **Upgrading cryptography namespaces** | Fixes the `System.Security.Cryptography` namespace split. Adds the correct `using` statements and NuGet packages for types such as `X509Certificate2` and `SignedCms`. |
| **Upgrading Data EDM to OData** | Upgrades the obsolete `Microsoft.Data.Edm` to `Microsoft.OData.Edm` for OData v4. |
| **Upgrading Data OData to OData Core** | Upgrades the obsolete `Microsoft.Data.OData` to `Microsoft.OData.Core` for OData v4 serialization. |
| **Upgrading Data Services client** | Upgrades the obsolete `Microsoft.Data.Services.Client` (WCF Data Services) to `Microsoft.OData.Client`. |
| **Upgrading DocumentDB to Cosmos DB** | Upgrades the deprecated `Microsoft.Azure.DocumentDB` SDK (V2) to the `Microsoft.Azure.Cosmos` SDK (V3). |
| **Upgrading Newtonsoft to System.Text.Json** | Full upgrade from `Newtonsoft.Json`. Handles converters, attributes, dynamic types, and settings. |
| **Upgrading OWIN Cookie Authentication** | Upgrades `Microsoft.Owin.Security.Cookies` to ASP.NET Core cookie authentication. |
| **Upgrading OWIN OAuth to JWT** | Upgrades `Microsoft.Owin.Security.OAuth` bearer authentication to ASP.NET Core JWT bearer authentication. |
| **Upgrading OWIN OpenID Connect** | Upgrades `Microsoft.Owin.Security.OpenIdConnect` to ASP.NET Core OpenID Connect authentication. |
| **Upgrading PowerShell SDK** | Upgrades PowerShell modules from Windows PowerShell 5.1 reference assemblies to the cross-platform `Microsoft.PowerShell.SDK` package for PowerShell 7+. |
| **Upgrading RazorEngine to RazorLight** | Upgrades the deprecated RazorEngine to RazorLight for Razor template rendering outside of MVC. |
| **Upgrading Semantic Kernel to Agents** | Upgrades `Microsoft.SemanticKernel.Agents` to Microsoft Agent Framework (`Microsoft.Agents.AI`), including tool registration and thread management. |
| **Upgrading SPA Services to SPA Proxy** | Upgrades the obsolete `Microsoft.AspNetCore.SpaServices.Extensions` to `Microsoft.AspNetCore.SpaProxy` for Angular and React SPAs. |
| **Upgrading System.Spatial** | Upgrades the obsolete `System.Spatial` to `Microsoft.Spatial` for OData v4. |
| **Upgrading to MSMQ.Messaging** | Upgrades from `System.Messaging` (.NET Framework only) to `MSMQ.Messaging` for modern .NET. |
| **Upgrading WebAPI CORS** | Upgrades `Microsoft.AspNet.WebApi.Cors` to ASP.NET Core CORS middleware. |
| **Upgrading WebAPI OData** | Upgrades `Microsoft.AspNet.WebApi.OData` to `Microsoft.AspNetCore.OData`. |

## When skills activate

The agent loads skills progressively as your upgrade session unfolds:

| When | What happens |
|---|---|
| **Session start** | The agent loads the matching scenario and any skills that are immediately relevant to your codebase. |
| **During execution** | As the agent works through tasks, it loads extra specialized skills on demand when it encounters specific upgrade patterns, such as EDMX files, WCF services, or OWIN middleware. |
| **On request** | You can ask the agent to use any skill at any time. For example, _"help me upgrade WCF to CoreWCF"_ or _"use the EF6 upgrade skill."_ |

You don't need to manage skill loading. The agent handles it automatically. Just describe what you need.

## Create your own skills

Create custom skills to teach the agent patterns specific to your codebase, such as internal framework upgrades, coding conventions, or custom upgrade workflows.

Place skills in your repository (`.github/skills/`) or user profile (`%UserProfile%/.copilot/skills/`), and the agent picks them up automatically.

For more information about creating custom skills, see Apply custom .NET upgrade instructions.

## Related content

- What is GitHub Copilot upgrade?
- Core concepts
- Upgrade a .NET app with GitHub Copilot upgrade
- Apply custom .NET upgrade instructions
