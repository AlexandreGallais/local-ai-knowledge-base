---
title: "bind-get"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/bind-get.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# bind-get

> **Warning:**
> For security reasons, you must opt in to binding `GET` request data to page model properties. Verify user input before mapping it to properties. Opting into `GET` binding is useful when addressing scenarios that rely on query string or route values.
>
> To bind a property on `GET` requests, set the `[BindProperty]` attribute's `SupportsGet` property to `true`:
>
> ```csharp
> [BindProperty(SupportsGet = true)]
> ```
>
> For more information, see ASP.NET Core Community Standup: Bind on GET discussion (YouTube).
