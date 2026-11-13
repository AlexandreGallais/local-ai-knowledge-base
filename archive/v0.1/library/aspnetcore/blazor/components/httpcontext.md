---
title: "IHttpContextAccessor/HttpContext in ASP.NET Core Blazor apps"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/httpcontext.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# `IHttpContextAccessor`/`HttpContext` in ASP.NET Core Blazor apps

-->
-->

`Microsoft.AspNetCore.Http.IHttpContextAccessor` generally should be avoided with interactive rendering because a valid `Microsoft.AspNetCore.Http.HttpContext` isn't always available.

`Microsoft.AspNetCore.Http.IHttpContextAccessor` can be used during static server-side rendering (static SSR), for example in statically-rendered root components, and when using a token <example-value> for web API calls on the server. **We recommend avoiding `Microsoft.AspNetCore.Http.IHttpContextAccessor` when static SSR or code running on the server can't be guaranteed.**

`Microsoft.AspNetCore.Http.HttpContext` can be used as a cascading parameter only in statically-rendered root components or during static SSR for general tasks, such as inspecting and modifying headers or other properties in the `App` component (`App.razor`). The value is `null` during interactive rendering.

```csharp
[CascadingParameter]
private HttpContext? HttpContext { get; set; }
```

For additional context in *advanced* edge cases&dagger;, see the discussion in the following articles:

* HttpContext is valid in Interactive Server Rendering Blazor page (`dotnet/AspNetCore.Docs` #34301)
* Security implications of using IHttpContextAccessor in Blazor Server (`dotnet/aspnetcore` #45699)

&dagger;Most developers building and maintaining Blazor apps don't need to delve into advanced concepts when the general guidance in this article is followed. The most important concept to keep in mind is that `Microsoft.AspNetCore.Http.HttpContext` is fundamentally a server-based, request-response feature that's only generally available on the server during static SSR and only created when a user's circuit is established.

## Don't set or modify headers after the response starts

Attempting to set or modify a header after the first rendering (after the response starts) results in an error:

> :::no-loc text="System.InvalidOperationException: 'Headers are read-only, response has already started.'":::

Examples of situations that result in this error include:

* Calling `Microsoft.AspNetCore.Identity.SignInManager`1.PasswordSignInAsync*`, which must set headers for Identity to function correctly, while adopting streaming rendering.
* Attempting to set or modify a header after the response has started during interactive rendering.

For guidance on setting headers before the response starts, see ASP.NET Core Blazor startup.

For guidance on `Microsoft.AspNetCore.Http.IHttpContextAccessor` and `Microsoft.AspNetCore.Http.HttpContext` in ASP.NET Core SignalR, see IHttpContextAccessor/HttpContext in ASP.NET Core SignalR.
