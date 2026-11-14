---
title: "Razor Pages authorization conventions in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/razor-pages/security/authorization/conventions.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Razor Pages authorization conventions in ASP.NET Core

One way to control access in a Razor Pages app is to use authorization conventions at startup. These conventions allow the app to authorize users and allow anonymous users to access individual pages or folders of pages. The conventions described in this article automatically apply authorization filters to control access.

View or download sample code (how to download)

The sample app uses cookie authentication without ASP.NET Core Identity. To use ASP.NET Core Identity, follow the guidance in Introduction to Identity on ASP.NET Core.

## Require authorization to access a page

Use the `Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizePage*` convention to add an `Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter` to the page at the specified path:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/10.x/AuthorizationSample/Program.cs._
The specified path is the View Engine path, which is the Razor Pages root relative path without an extension and containing only forward slashes.

To specify an authorization policy, use an `AuthorizePage` overload:

```csharp
options.Conventions.AuthorizePage("/Contact", "AtLeast21");
```

> **Note:**
> An `Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter` can be applied to a page model class with the `[Authorize]` filter attribute. For more information, see Filter methods for Razor Pages in ASP.NET Core.

## Require authorization to access a folder of pages

Use the `Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizeFolder*` convention to add an `Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter` to all of the pages in a folder at the specified path:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/10.x/AuthorizationSample/Program.cs._
The specified path is the View Engine path, which is the Razor Pages root relative path containing only forward slashes.

To specify an authorization policy, use an `AuthorizeFolder` overload:

```csharp
options.Conventions.AuthorizeFolder("/Private", "AtLeast21");
```

## Require authorization to access an area page

Use the `Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizeAreaPage*` convention to add an `Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter` to the area page at the specified path:

```csharp
options.Conventions.AuthorizeAreaPage("Identity", "/Manage/Accounts");
```

The page name is the path of the file without an extension relative to the pages root directory for the specified area. For example, the page name for the file `Areas/Identity/Pages/Manage/Accounts.cshtml` is `/Manage/Accounts`.

To specify an authorization policy, use an `AuthorizeAreaPage` overload:

```csharp
options.Conventions.AuthorizeAreaPage("Identity", "/Manage/Accounts", "AtLeast21");
```

## Require authorization to access a folder of areas

Use the `Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AuthorizeAreaFolder*` convention to add an `Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter` to all of the areas in a folder at the specified path:

```csharp
options.Conventions.AuthorizeAreaFolder("Identity", "/Manage");
```

The folder path is the path of the folder relative to the pages root directory for the specified area. For example, the folder path for the files under `Areas/Identity/Pages/Manage/` is `/Manage`.

To specify an authorization policy, use an `AuthorizeAreaFolder` overload:

```csharp
options.Conventions.AuthorizeAreaFolder("Identity", "/Manage", "AtLeast21");
```

## Allow anonymous access to a page

Use the `Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AllowAnonymousToPage*` convention to add an `Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter` to a page at the specified path:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/10.x/AuthorizationSample/Program.cs._
The specified path is the View Engine path, which is the Razor Pages root relative path without an extension and containing only forward slashes.

## Allow anonymous access to a folder of pages

Use the `Microsoft.Extensions.DependencyInjection.PageConventionCollectionExtensions.AllowAnonymousToFolder*` convention to add an `Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter` to all of the pages in a folder at the specified path:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/RazorPagesAuthorization/10.x/AuthorizationSample/Program.cs._
The specified path is the View Engine path, which is the Razor Pages root relative path without an extension and containing only forward slashes.

## Note on combining authorized and anonymous access

The app can specify that a folder of pages requires authorization and that a page within that folder allows anonymous access:

```csharp
// This works.
.AuthorizeFolder("/Private").AllowAnonymousToPage("/Private/Public")
```

The reverse, however, isn't valid. The app can't declare a folder of pages for anonymous access and specify a page within that folder that requires authorization:

```csharp
// This doesn't work!
.AllowAnonymousToFolder("/Public").AuthorizePage("/Public/Private")
```

Requiring authorization on the Private page fails. When both the `Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter` and `Microsoft.AspNetCore.Mvc.Authorization.AuthorizeFilter` are applied to the page, the `Microsoft.AspNetCore.Mvc.Authorization.AllowAnonymousFilter` takes precedence and controls access.

## Related content

* Razor Pages route and app conventions in ASP.NET Core
* `Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection`
