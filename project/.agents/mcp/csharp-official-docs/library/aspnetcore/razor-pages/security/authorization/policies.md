---
title: "Policy-based authorization in ASP.NET Core Razor Pages"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/razor-pages/security/authorization/policies.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Policy-based authorization in ASP.NET Core Razor Pages

This article provides additional Razor Pages policy-based authorization scenarios following Policy-based authorization in ASP.NET Core, which should be read before this article when learning about policy-based authorization.

## Apply policies to Razor Pages

Apply policies to Razor Pages using the `[Authorize]` attribute with the policy name:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/policies/6.0/AuthorizationPoliciesSample/Pages/AtLeast21.cshtml.cs._
Policies can't be applied at the page handler level, they must be applied to the `Microsoft.AspNetCore.Mvc.RazorPages.PageModel` class.

Policies can also be applied to pages using an authorization convention.
