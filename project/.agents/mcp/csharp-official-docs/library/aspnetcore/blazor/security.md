---
title: "ASP.NET Core Blazor authentication and authorization (part 1 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor authentication and authorization

This article describes ASP.NET Core's support for the configuration and management of security in Blazor apps.

Blazor uses the existing ASP.NET Core authentication mechanisms to establish the user's identity. The exact mechanism depends on how the Blazor app is hosted, server-side or client-side.

Security scenarios differ between authorization code running server-side and client-side in Blazor apps. For authorization code that runs on the server, authorization checks are able to enforce access rules for areas of the app and components. Because client-side code execution can be tampered with, authorization code executing on the client can't be trusted to absolutely enforce access rules or control the display of client-side content.

If authorization rule enforcement must be guaranteed, don't implement authorization checks in client-side code. Build a Blazor Web App that only relies on server-side rendering (SSR) for authorization checks and rule enforcement.

Razor Pages authorization conventions don't apply to routable Razor components. If a non-routable Razor component is embedded in a page of a Razor Pages app, the page's authorization conventions indirectly affect the Razor component along with the rest of the page's content.

> **Note:**
> The code examples in this article adopt nullable reference types (NRTs) and .NET compiler null-state static analysis, which are supported in ASP.NET Core in .NET 6 or later. When targeting .NET 5 or earlier, remove the null type designation (`?`) from examples in this article.

## Securely maintain sensitive data and credentials

Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private .NET/C# code, or private keys/tokens in client-side code, which is ***always insecure***. Client-side Blazor code should access secure services and databases through a secure web API that you control.

In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials <example-value> project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the Secret <example-value> tool is recommended for securing sensitive data. For more information, see the following resources:

* Secure authentication flows (ASP.NET Core documentation)
* Managed identities for Microsoft Azure services (this article)

For client-side and server-side local development and testing, use the Secret <example-value> tool to secure sensitive credentials.

## Managed identities for Microsoft Azure services

For Microsoft Azure services, we recommend using *managed identities*. Managed identities securely authenticate to Azure services without storing credentials in app code. For more information, see the following resources:

* What are managed identities for Azure resources? (Microsoft Entra documentation)
* Azure services documentation
  * Managed identities in Microsoft Entra for Azure SQL
  * How to use managed identities for App Service and Azure Functions

## Antiforgery support

The Blazor project template:

* Enables automatic Cross-Site Request Forgery (CSRF) protection middleware in apps built with `WebApplication.CreateBuilder`. The middleware inspects the `Sec-Fetch-Site` and `Origin` headers on unsafe HTTP methods and records a validation verdict on the request. Blazor server-side rendering (SSR) form posts enforce that verdict and return `400 Bad Request` for cross-origin form posts that aren't trusted.
* Implicitly adds token-based antiforgery *services* to the app when `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*` is called in the `Program` file.

Antiforgery *middleware* isn't automatically included in the request processing pipeline without explicitly calling `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*`.

To explicitly add antiforgery middleware, call `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*` after the call to `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*`. If there are calls to `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*` and `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*`, the call to `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*` must go between them. A call to `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*` must be placed after calls to `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*` and `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*`.

Adding token-based antiforgery middleware doesn't replace the automatic header-based CSRF protection middleware. When an app calls `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*`, both defense mechanisms run for a form post:

* The header-based CSRF protection middleware runs first and records its verdict.
* Antiforgery middleware performs token-based validation.

The token-based result from antiforgery middleware is authoritative and overrides the earlier header-based CSRF middleware verdict.

To disable the automatic header-based CSRF protection middleware, set the `DisableCsrfProtection` configuration key to true. For example, use the app settings file (`appsettings.json`) to disable the middleware:

```json
{
  "DisableCsrfProtection": true
}
```

The `DisableCsrfProtection` configuration setting can be supplied by any configuration source, including via an environment variable (`DisableCsrfProtection=true`).

> **Warning:**
> Disabling the automatic CSRF protection middleware removes the default header-based (`Sec-Fetch-Site`/`Origin`) protection for the entire app. Only disable it if you provide an alternative CSRF defense, such as explicitly adopting token-based antiforgery middleware by calling `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*`.

For more information, see Automatic CSRF protection.

> **Important:**
> The following guidance on the `Microsoft.AspNetCore.Components.Forms.AntiforgeryToken` component and the `Microsoft.AspNetCore.Components.Forms.AntiforgeryStateProvider` service only apply to an app that explicitly adopts token-based antiforgery middleware by calling `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*` in its request processing pipeline.

The `Microsoft.AspNetCore.Components.Forms.AntiforgeryToken` component renders an antiforgery token as a hidden field, and this component is automatically added to form (`Microsoft.AspNetCore.Components.Forms.EditForm`) instances. For more information, see ASP.NET Core Blazor forms overview.

The `Microsoft.AspNetCore.Components.Forms.AntiforgeryStateProvider` service provides access to an antiforgery token <example-value> with the current session. Inject the service and call its `Microsoft.AspNetCore.Components.Forms.AntiforgeryStateProvider.GetAntiforgeryToken` method to obtain the current `Microsoft.AspNetCore.Components.Forms.AntiforgeryRequestToken`. For more information, see Call a web API from an ASP.NET Core Blazor app.

Blazor stores request tokens in component state, which guarantees that antiforgery tokens are available to interactive components, even when they don't have access to the request.

> **Note:**
> Antiforgery mitigation is only required when submitting form data to the server encoded as `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain` since these are the only valid form enctypes.

For more information, see the following resources:

* Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core: This article is the primary ASP.NET Core article on the subject, which applies to server-side Blazor Server, the server project of Blazor Web Apps, and Blazor integration with MVC/Razor Pages.
* ASP.NET Core Blazor forms overview: The *Antiforgery support* section of the article pertains to Blazor forms antiforgery support.
