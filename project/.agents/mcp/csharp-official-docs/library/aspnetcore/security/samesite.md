---
title: "Work with SameSite cookies in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/samesite.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Work with SameSite cookies in ASP.NET Core

By Rick Anderson

SameSite is an IETF draft standard designed to provide some protection against cross-site request forgery (CSRF) attacks. Originally drafted in 2016, the draft standard was updated in 2019. The updated standard is not backward compatible with the previous standard, with the following being the most noticeable differences:

* Cookies without SameSite header are treated as `SameSite=Lax` by default.
* `SameSite=None` must be used to allow cross-site cookie use.
* Cookies that assert `SameSite=None` must also be marked as `Secure`.
* Applications that use `` may experience issues with `sameSite=Lax` or `sameSite=Strict` cookies because `` is treated as cross-site scenarios.
* The value `SameSite=None` is not allowed by the 2016 standard and causes some implementations to treat such cookies as `SameSite=Strict`. See Supporting older browsers in this document.

The `SameSite=Lax` setting works for most application cookies. Some forms of authentication like OpenID Connect (OIDC) and WS-Federation default to POST based redirects. The POST based redirects trigger the SameSite browser protections, so SameSite is disabled for these components. Most OAuth logins are not affected due to differences in how the request flows.

Each ASP.NET Core component that emits cookies needs to decide if SameSite is appropriate.

## SameSite and Identity

ASP.NET Core Identity is largely unaffected by SameSite cookies except for advanced scenarios like `IFrames` or `OpenIdConnect` integration.

When using `Identity`, do ***not*** add any cookie providers or call ` services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)`, `Identity` takes care of that.

## SameSite test sample code

The following sample can be downloaded and tested:

| Sample | Document |
|--------|----------|
| Razor Pages | ASP.NET Core 3.1 Razor Pages SameSite cookie sample |

## .NET support for the sameSite attribute

.NET supports the 2019 draft standard for SameSite. Developers are able to programmatically control the value of the sameSite attribute using the `HttpCookie.SameSite` property. Setting the `SameSite` property to `Strict`, `Lax`, or `None` results in those values being written on the network with the cookie. Setting to `SameSiteMode.Unspecified` indicates no sameSite should be sent with the cookie.

```csharp
    var cookieOptions = new CookieOptions
    {
        // Set the secure flag, which Chrome's changes will require for SameSite none.
        // Note this will also require you to be running on HTTPS.
        Secure = true,

        // Set the cookie to HTTP only which is good practice unless you really do need
        // to access it client side in scripts.
        HttpOnly = true,

        // Add the SameSite attribute, this will emit the attribute with a value of none.
        SameSite = SameSiteMode.None

        // The client should follow its default cookie policy.
        // SameSite = SameSiteMode.Unspecified
    };

    // Add the cookie to the response cookie collection
    Response.Cookies.Append("MyCookie", "cookieValue", cookieOptions);
}
```

## API usage with SameSite

HttpContext.Response.Cookies.Append defaults to `Unspecified`, meaning no SameSite attribute added to the cookie and the client will use its default behavior (Lax for new browsers, None for old ones). The following code shows how to change the cookie SameSite value to `SameSiteMode.Lax`:

```csharp
HttpContext.Response.Cookies.Append(
                     "name", "value",
                     new CookieOptions() { SameSite = SameSiteMode.Lax });
```

All ASP.NET Core components that emit cookies override the preceding defaults with settings appropriate for their scenarios. The overridden preceding default values haven't changed.

| Component | cookie | Default |
| ------------- | ------------- |
| `Microsoft.AspNetCore.Http.CookieBuilder` | `Microsoft.AspNetCore.Http.CookieBuilder.SameSite` | `Unspecified` |
| `Microsoft.AspNetCore.Http.HttpContext.Session`  | SessionOptions.Cookie |`Lax` |
| `Microsoft.AspNetCore.Mvc.ViewFeatures.CookieTempDataProvider`  | CookieTempDataProviderOptions.Cookie | `Lax` |
| `Microsoft.AspNetCore.Antiforgery.IAntiforgery` | AntiforgeryOptions.Cookie| `Strict` |
| Cookie Authentication | CookieAuthenticationOptions.Cookie | `Lax` |
| `Microsoft.Extensions.DependencyInjection.TwitterExtensions.AddTwitter*` | TwitterOptions.StateCookie | `Lax`  |
| `Microsoft.AspNetCore.Authentication.RemoteAuthenticationHandler`1` | RemoteAuthenticationOptions.CorrelationCookie  | `None` |
| `Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect*` | OpenIdConnectOptions.NonceCookie| `None` |
| HttpContext.Response.Cookies.Append | `Microsoft.AspNetCore.Http.CookieOptions` | `Unspecified` |

ASP.NET Core 3.1 or later provides the following SameSite support:

* Redefines the behavior of `SameSiteMode.None` to emit `SameSite=None`
* Adds a new value `SameSiteMode.Unspecified` to omit the SameSite attribute.
* All cookies APIs default to `Unspecified`. Some components that use cookies set values more specific to their scenarios. See the table above for examples.

In ASP.NET Core 3.0 or later the SameSite defaults were changed to avoid conflicting with inconsistent client defaults. The following APIs have changed the default from `SameSiteMode.Lax ` to `-1` to avoid emitting a SameSite attribute for these cookies:

* `Microsoft.AspNetCore.Http.CookieOptions` used with HttpContext.Response.Cookies.Append
* `Microsoft.AspNetCore.Http.CookieBuilder`  used as a factory for `CookieOptions`
* CookiePolicyOptions.MinimumSameSitePolicy

## History and changes

SameSite support was first implemented in ASP.NET Core in 2.0 using the 2016 draft standard. The 2016 standard was opt-in. ASP.NET Core opted-in by setting several cookies to `Lax` by default. After encountering several issues with authentication, most SameSite usage was disabled.

Patches were issued in November 2019 to update from the 2016 standard to the 2019 standard. The 2019 draft of the SameSite specification:

* Is **not** backwards compatible with the 2016 draft. For more information, see Supporting older browsers in this document.
* Specifies cookies are treated as `SameSite=Lax` by default.
* Specifies cookies that explicitly assert `SameSite=None` in order to enable cross-site delivery should be marked as `Secure`. `None` is a new entry to opt out.
* Is supported by patches issued for ASP.NET Core 2.1, 2.2, and 3.0. ASP.NET Core 3.1 or later has additional SameSite support.
* Is scheduled to be enabled by Chrome by default in Feb 2020. Browsers started moving to this standard in 2019.

## APIs impacted by the change from the 2016 SameSite draft standard to the 2019 draft standard

* Http.SameSiteMode
* CookieOptions.SameSite
* CookieBuilder.SameSite
* CookiePolicyOptions.MinimumSameSitePolicy
* `Microsoft.Net.Http.Headers.SameSiteMode`
* `Microsoft.Net.Http.Headers.SetCookieHeaderValue.SameSite`

## Supporting older browsers

The 2016 SameSite standard mandated that unknown values must be treated as `SameSite=Strict` values. Apps accessed from older browsers which support the 2016 SameSite standard may break when they get a SameSite property with a value of `None`. Web apps must implement browser detection if they intend to support older browsers. ASP.NET Core doesn't implement browser detection because User-Agents values are highly volatile and change frequently. An extension point in `Microsoft.AspNetCore.CookiePolicy` allows plugging in User-Agent specific logic.

In `Program.cs`, add code that calls `Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy*` before calling `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*` or *any* method that writes cookies:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
    options.OnAppendCookie = cookieContext =>
        CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
    options.OnDeleteCookie = cookieContext =>
        CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
});

void CheckSameSite(HttpContext httpContext, CookieOptions options)
{
    if (options.SameSite == SameSiteMode.None)
    {
        var userAgent = httpContext.Request.Headers["User-Agent"].ToString();
        if (MyUserAgentDetectionLib.DisallowsSameSiteNone(userAgent))
        {
            options.SameSite = SameSiteMode.Unspecified;
        }
    }
}

    builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCookiePolicy();
app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

In `Program.cs`, add code similar to the following highlighted code:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<CookiePolicyOptions>(options =>
{
    options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
    options.OnAppendCookie = cookieContext =>
        CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
    options.OnDeleteCookie = cookieContext =>
        CheckSameSite(cookieContext.Context, cookieContext.CookieOptions);
});

void CheckSameSite(HttpContext httpContext, CookieOptions options)
{
    if (options.SameSite == SameSiteMode.None)
    {
        var userAgent = httpContext.Request.Headers["User-Agent"].ToString();
        if (MyUserAgentDetectionLib.DisallowsSameSiteNone(userAgent))
        {
            options.SameSite = SameSiteMode.Unspecified;
        }
    }
}

    builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCookiePolicy();
app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

In the preceding sample, `MyUserAgentDetectionLib.DisallowsSameSiteNone` is a user supplied library that detects if the user agent doesn't support SameSite `None`:

```csharp
if (MyUserAgentDetectionLib.DisallowsSameSiteNone(userAgent))
{
    options.SameSite = SameSiteMode.Unspecified;
}
```

The following code shows a sample `DisallowsSameSiteNone` method:

> **Warning:**
> The following code is for demonstration only:
>
> * It should not be considered complete.
> * It is not maintained or supported.

```csharp
public static bool DisallowsSameSiteNone(string userAgent)
{
    // Check if a null or empty string has been passed in, since this
    // will cause further interrogation of the useragent to fail.
     if (String.IsNullOrWhiteSpace(userAgent))
        return false;
    
    // Cover all iOS based browsers here. This includes:
    // - Safari on iOS 12 for iPhone, iPod Touch, iPad
    // - WkWebview on iOS 12 for iPhone, iPod Touch, iPad
    // - Chrome on iOS 12 for iPhone, iPod Touch, iPad
    // All of which are broken by SameSite=None, because they use the iOS networking
    // stack.
    if (userAgent.Contains("CPU iPhone OS 12") ||
        userAgent.Contains("iPad; CPU OS 12"))
    {
        return true;
    }

    // Cover Mac OS X based browsers that use the Mac OS networking stack. 
    // This includes:
    // - Safari on Mac OS X.
    // This does not include:
    // - Chrome on Mac OS X
    // Because they do not use the Mac OS networking stack.
    if (userAgent.Contains("Macintosh; Intel Mac OS X 10_14") &&
        userAgent.Contains("Version/") && userAgent.Contains("Safari"))
    {
        return true;
    }

    // Cover Chrome 50-69, because some versions are broken by SameSite=None, 
    // and none in this range require it.
    // Note: this covers some pre-Chromium Edge versions, 
    // but pre-Chromium Edge does not require SameSite=None.
    if (userAgent.Contains("Chrome/5") || userAgent.Contains("Chrome/6"))
    {
        return true;
    }

    return false;
}
```
