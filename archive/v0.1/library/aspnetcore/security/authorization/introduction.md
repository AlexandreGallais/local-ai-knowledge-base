---
title: "Introduction to authorization in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authorization/introduction.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Introduction to authorization in ASP.NET Core

Authorization refers to the process that determines what a user is able to do. For example, an administrative user is allowed to create a document library, add documents, edit documents, and delete them. A nonadministrative user working with the library is only authorized to read the documents.

Authorization is separate and distinct from authentication. However, authorization relies on an authentication mechanism. Authentication is the process of verifying a user's identity, which might result in the creation of one or more identity objects for the user.

Configuring authentication doesn't automatically restrict access to endpoints. To require authenticated users by default in a server-side app, configure a fallback authorization policy. For information about how authorization metadata selects named, default, and fallback policies, see Policy-based authorization in ASP.NET Core.

For more information about authentication in ASP.NET Core, see Overview of ASP.NET Core Authentication.

## Authorization types

ASP.NET Core authorization provides a simple declarative role and a rich policy-based model. Authorization is expressed in requirements, and handlers evaluate a user's claims against requirements. Imperative checks can be based on simple policies or policies that evaluate both the user identity and properties of the resource that the user is attempting to access.

## Namespaces

Authorization components, including the `[Authorize]` attribute and `[AllowAnonymous]` attribute, are defined in the `Microsoft.AspNetCore.Authorization` namespace.

For more information, see Simple authorization in ASP.NET Core.

## Related content

* Authentication and authorization in Minimal APIs
* ASP.NET Core Blazor authentication and authorization
* Razor Pages authorization conventions in ASP.NET Core
* Blazor app authorization patterns
  * Server-side Blazor (Blazor Web Apps, Blazor Server apps)
  * Blazor WebAssembly
