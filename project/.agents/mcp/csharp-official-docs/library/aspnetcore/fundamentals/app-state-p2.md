---
title: "Session in ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/app-state.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Session in ASP.NET Core (part 2 of 3)

## Session state

Session state is an ASP.NET Core scenario for storage of user data while the user browses a web app. Session state uses a store maintained by the app to persist data across requests from a client. The session data is backed by a cache and considered ephemeral data. The site should continue to function without the session data. Critical application data should be stored in the user database and cached in session only as a performance optimization.

Session isn't supported in SignalR apps because a SignalR Hub may execute independent of an HTTP context. For example, this can occur when a long polling request is held open by a hub beyond the lifetime of the request's HTTP context.

ASP.NET Core maintains session state by providing a cookie to the client that contains a session ID. The cookie session ID:

* Is sent to the app with each request.
* Is used by the app to fetch the session data.

Session state exhibits the following behaviors:

* The session cookie is specific to the browser. Sessions aren't shared across browsers.
* Session cookies are deleted when the browser session ends.
* If a cookie is received for an expired session, a new session is created that uses the same session cookie.
* Empty sessions aren't retained. The session must have at least one value set to persist the session across requests. When a session isn't retained, a new session ID is generated for each new request.
* The app retains a session for a limited time after the last request. The app either sets the session timeout or uses the default value of 20 minutes. Session state is ideal for storing user data:
  * That's specific to a particular session.
  * Where the data doesn't require permanent storage across sessions.
* Session data is deleted either when the `Microsoft.AspNetCore.Http.ISession.Clear*` implementation is called or when the session expires.
* There's no default mechanism to inform app code that a client browser has been closed or when the session cookie is deleted or expired on the client.
* Session state cookies aren't marked essential by default. Session state isn't functional unless tracking is permitted by the site visitor. For more information, see General Data Protection Regulation (GDPR) support in ASP.NET Core.
* **Note**: There is no replacement for the cookieless session feature from the ASP.NET Framework because it's considered insecure and can lead to session fixation attacks.

> **Warning:**
> Don't store sensitive data in session state. The user might not close the browser and clear the session cookie. Some browsers maintain valid session cookies across browser windows. A session might not be restricted to a single user. The next user might continue to browse the app with the same session cookie.

The in-memory cache provider stores session data in the memory of the server where the app resides. In a server farm scenario:

* Use *sticky sessions* to tie each session to a specific app instance on an individual server. Azure App Service uses Application Request Routing (ARR) to enforce sticky sessions by default. However, sticky sessions can affect scalability and complicate web app updates. A better approach is to use a Redis, SQL Server, or Azure Postgres distributed cache, which doesn't require sticky sessions. For more information, see Distributed caching in ASP.NET Core.
* The session cookie is encrypted via `Microsoft.AspNetCore.DataProtection.IDataProtector`. Data Protection must be properly configured to read session cookies on each machine. For more information, see ASP.NET Core Data Protection Overview and Key <example-value> providers.

### Configure session state

Middleware for managing session state is included in the framework. To enable the session middleware, `Program.cs` must contain:

* Any of the `Microsoft.Extensions.Caching.Distributed.IDistributedCache` memory caches. The `IDistributedCache` implementation is used as a backing store for session. For more information, see Distributed caching in ASP.NET Core.
* A call to `Microsoft.Extensions.DependencyInjection.SessionServiceCollectionExtensions.AddSession*`
* A call to `Microsoft.AspNetCore.Builder.SessionMiddlewareExtensions.UseSession*`

The following code shows how to set up the in-memory session provider with a default in-memory implementation of `IDistributedCache`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseSession();

app.MapRazorPages();
app.MapDefaultControllerRoute();

app.Run();
```

The preceding code sets a short timeout to simplify testing.

The order of middleware is important.  Call `UseSession` after `UseRouting` and before `MapRazorPages` and `MapDefaultControllerRoute`. See Middleware Ordering.

HttpContext.Session is available after session state is configured.

`HttpContext.Session` can't be accessed before `UseSession` has been called.

A new session with a new session cookie can't be created after the app has begun writing to the response stream. The exception is recorded in the web server log and not displayed in the browser.

### Load session state asynchronously

The default session provider in ASP.NET Core loads session records from the underlying `Microsoft.Extensions.Caching.Distributed.IDistributedCache` backing store asynchronously only if the `Microsoft.AspNetCore.Http.ISession.LoadAsync*` method is explicitly called before the `Microsoft.AspNetCore.Http.ISession.TryGetValue*`, `Microsoft.AspNetCore.Http.ISession.Set*`, or `Microsoft.AspNetCore.Http.ISession.Remove*` methods. If `LoadAsync` isn't called first, the underlying session record is loaded synchronously, which can incur a performance penalty at scale.

To have apps enforce this pattern, wrap the `Microsoft.AspNetCore.Session.DistributedSessionStore` and `Microsoft.AspNetCore.Session.DistributedSession` implementations with versions that throw an exception if the `LoadAsync` method isn't called before `TryGetValue`, `Set`, or `Remove`. Register the wrapped versions in the services container.

### Session options

To override session defaults, use `Microsoft.AspNetCore.Builder.SessionOptions`.

| Option | Description |
| ------ | ----------- |
| `Microsoft.AspNetCore.Builder.SessionOptions.Cookie` | Determines the settings used to create the cookie. `Microsoft.AspNetCore.Http.CookieBuilder.Name` defaults to `Microsoft.AspNetCore.Session.SessionDefaults.CookieName` (`.AspNetCore.Session`). `Microsoft.AspNetCore.Http.CookieBuilder.Path` defaults to `Microsoft.AspNetCore.Session.SessionDefaults.CookiePath` (`/`). `Microsoft.AspNetCore.Http.CookieBuilder.SameSite` defaults to `Microsoft.AspNetCore.Http.SameSiteMode.Lax` (`1`). `Microsoft.AspNetCore.Http.CookieBuilder.HttpOnly` defaults to `true`. `Microsoft.AspNetCore.Http.CookieBuilder.IsEssential` defaults to `false`. |
| `Microsoft.AspNetCore.Builder.SessionOptions.IdleTimeout` | The `IdleTimeout` indicates how long the session can be idle before its contents are abandoned. Each session access resets the timeout. This setting only applies to the content of the session, not the cookie. The default is 20 minutes. |
| `Microsoft.AspNetCore.Builder.SessionOptions.IOTimeout` | The maximum amount of time allowed to load a session from the store or to commit it back to the store. This setting may only apply to asynchronous operations. This timeout can be disabled using `System.Threading.Timeout.InfiniteTimeSpan`. The default is 1 minute. |

Session uses a cookie to track and identify requests from a single browser. By default, this cookie is named `.AspNetCore.Session`, and it uses a path of `/`. Because the cookie default doesn't specify a domain, it isn't made available to the client-side script on the page (because `Microsoft.AspNetCore.Http.CookieBuilder.HttpOnly` defaults to `true`).

To override cookie session defaults, use `Microsoft.AspNetCore.Builder.SessionOptions`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.Cookie.Name = ".AdventureWorks.Session";
    options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.IsEssential = true;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.UseSession();

app.MapRazorPages();
app.MapDefaultControllerRoute();

app.Run();
```

The app uses the `Microsoft.AspNetCore.Builder.SessionOptions.IdleTimeout` property to determine how long a session can be idle before its contents in the server's cache are abandoned. This property is independent of the cookie expiration. Each request that passes through the session middleware resets the timeout.

Session state is *non-locking*. If two requests simultaneously attempt to modify the contents of a session, the last request overrides the first. `Session` is implemented as a *coherent session*, which means that all the contents are stored together. When two requests seek to modify different session values, the last request may override session changes made by the first.

### Set and get Session values

Session state is accessed from a Razor Pages `Microsoft.AspNetCore.Mvc.RazorPages.PageModel` class or MVC `Microsoft.AspNetCore.Mvc.Controller` class with `Microsoft.AspNetCore.Http.HttpContext.Session`. This property is an `Microsoft.AspNetCore.Http.ISession` implementation.

The `ISession` implementation provides several extension methods to set and retrieve integer and string values. The extension methods are in the `Microsoft.AspNetCore.Http` namespace.

`ISession` extension methods:

* Get(ISession, String)
* GetInt32(ISession, String)
* GetString(ISession, String)
* SetInt32(ISession, String, Int32)
* SetString(ISession, String, String)

The following example retrieves the session value for the `IndexModel.SessionKeyName` key (`_Name` in the sample app) in a Razor Pages page:

```csharp
@page
@using Microsoft.AspNetCore.Http
@model IndexModel

...

Name: @HttpContext.Session.GetString(IndexModel.SessionKeyName)
```

The following example shows how to set and get an integer and a string:

```csharp
public class IndexModel : PageModel
{
    public const string SessionKeyName = "_Name";
    public const string SessionKeyAge = "_Age";

    private readonly ILogger<IndexModel> _logger;

    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {
        if (string.IsNullOrEmpty(HttpContext.Session.GetString(SessionKeyName)))
        {
            HttpContext.Session.SetString(SessionKeyName, "The Doctor");
            HttpContext.Session.SetInt32(SessionKeyAge, 73);
        }
        var name = HttpContext.Session.GetString(SessionKeyName);
        var age = HttpContext.Session.GetInt32(SessionKeyAge).ToString();

        _logger.LogInformation("Session Name: {Name}", name);
        _logger.LogInformation("Session Age: {Age}", age);
    }
}
```

The following markup displays the session values on a Razor Page:

```cshtml
﻿@page
@model PrivacyModel
@{
    ViewData["Title"] = "Privacy Policy";
}
<h1>@ViewData["Title"]</h1>

<div class="text-center">
<p><b>Name:</b> @HttpContext.Session.GetString("_Name");<b>Age:

</b> @HttpContext.Session.GetInt32("_Age").ToString()</p>
</div>
```

All session data must be serialized to enable a distributed cache scenario, even when using the in-memory cache. String and integer serializers are provided by the extension methods of `Microsoft.AspNetCore.Http.ISession`. Complex types must be serialized by the user using another mechanism, such as JSON.

Use the following sample code to serialize objects:

```csharp
public static class SessionExtensions
{
    public static void Set<T>(this ISession session, string key, T value)
    {
        session.SetString(key, JsonSerializer.Serialize(value));
    }

    public static T? Get<T>(this ISession session, string key)
    {
        var value = session.GetString(key);
        return value == null ? default : JsonSerializer.Deserialize<T>(value);
    }
}
```

The following example shows how to set and get a serializable object with the `SessionExtensions` class:

```csharp
﻿using Microsoft.AspNetCore.Mvc.RazorPages;
using Web.Extensions;    // SessionExtensions

namespace SessionSample.Pages
{
    public class Index6Model : PageModel
    {
        const string SessionKeyTime = "_Time";
        public string? SessionInfo_SessionTime { get; private set; }
        private readonly ILogger<Index6Model> _logger;

        public Index6Model(ILogger<Index6Model> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            var currentTime = DateTime.Now;

            // Requires SessionExtensions from sample.
            if (HttpContext.Session.Get<DateTime>(SessionKeyTime) == default)
            {
                HttpContext.Session.Set<DateTime>(SessionKeyTime, currentTime);
            }
            _logger.LogInformation("Current Time: {Time}", currentTime);
            _logger.LogInformation("Session Time: {Time}", 
                           HttpContext.Session.Get<DateTime>(SessionKeyTime));

        }
    }
}
```

> **Warning:**
> Storing a live object in the session should be used with caution, as there are many problems that can occur with serialized objects. For more information, see Sessions should be allowed to store objects (dotnet/aspnetcore #18159).

## TempData

ASP.NET Core exposes the Razor Pages TempData or Controller `Microsoft.AspNetCore.Mvc.Controller.TempData`. This property stores data until it's read in another request. The Keep(String) and Peek(string) methods can be used to examine the data without deletion at the end of the request. Keep marks all items in the dictionary for retention. `TempData` is:

* Useful for redirection when data is required for more than a single request.
* Implemented by `TempData` providers using either cookies or session state.
