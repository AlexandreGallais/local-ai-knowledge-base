---
title: "redirecttologin-component"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/includes/redirecttologin-component.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# redirecttologin-component

The `RedirectToLogin` component (`RedirectToLogin.razor`):

* Manages redirecting unauthorized users to the login page.
* The current URL that the user is attempting to access is maintained so that they can be returned to that page if authentication is successful using:
  * Navigation history state in ASP.NET Core in .NET 7 or later.
  * A query string in ASP.NET Core in .NET 6 or earlier.

Inspect the `RedirectToLogin` component in reference source. The location of the component changed over time, so use GitHub search tools to locate the component.
