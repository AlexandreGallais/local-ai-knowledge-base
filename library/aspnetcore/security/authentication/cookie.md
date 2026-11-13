---
title: "Use cookie authentication without ASP.NET Core Identity (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/cookie.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use cookie authentication without ASP.NET Core Identity

By Rick Anderson

ASP.NET Core Identity is a complete, full-featured authentication provider for creating and maintaining logins. However, a cookie-based authentication provider without ASP.NET Core Identity can be used. For more information, see Introduction to Identity on ASP.NET Core.

View or download sample code (how to download)

For demonstration purposes in the sample app, the user account for the hypothetical user, Maria Rodriguez, is hardcoded into the app. Use the **Email** address `maria.rodriguez@contoso.com` and any password to sign in the user. The user is authenticated in the `AuthenticateUser` method in the `Pages/Account/Login.cshtml.cs` file. In a real-world example, the user would be authenticated against a datastore.

> **Important:**
> Starting with ASP.NET Core 10, known API endpoints no longer redirect to login pages when using cookie authentication. Instead, they return 401/403 status codes. For details, see API endpoint authentication behavior in ASP.NET Core.
## Add cookie authentication

* Add the authentication middleware services with the `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*` and `Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie*` methods.
* Call `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*` and `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*` to set the `HttpContext.User` property and run the authorization middleware for requests. `UseAuthentication` and `UseAuthorization` must be called before `Map` methods such as `Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages*` and `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapDefaultControllerRoute*`

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
app.MapDefaultControllerRoute();

app.Run();
```

> **Note:**
> The preceding sample includes `builder.Services.AddHttpContextAccessor()` because its Razor Pages (`Index.cshtml` and `_LoginPartial.cshtml`) inject `Microsoft.AspNetCore.Http.IHttpContextAccessor`. In standard controllers, Razor Pages (`PageModel`), and minimal API route handlers, `HttpContext` and `HttpContext.User` are available directly without registering `IHttpContextAccessor`.

`Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme` passed to `AddAuthentication` sets the default authentication scheme for the app. `AuthenticationScheme` is useful when there are multiple instances of cookie authentication and the app needs to authorize with a specific scheme. Setting the `AuthenticationScheme` to `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme` provides a value of `"Cookies"` for the scheme. Any string value can be used that distinguishes the scheme.

If `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme` (default value: "`Cookies`") isn't used as the scheme, supply the scheme used when configuring the authentication provider. Otherwise, the default scheme is used. For example, if "`ContosoCookie`" is used as the scheme, supply the scheme used when configuring the authentication provider.

The authentication cookie's `Microsoft.AspNetCore.Http.CookieBuilder.IsEssential` property is set to `true` by default. Authentication cookies are allowed when a site visitor hasn't consented to data collection. For more information, see General Data Protection Regulation (GDPR) support in ASP.NET Core.

The `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions` class is used to configure the authentication provider options.

Configure `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions` in the `Microsoft.Extensions.DependencyInjection.CookieExtensions.AddCookie*` method:

```csharp
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
        options.SlidingExpiration = true;
        options.AccessDeniedPath = "/Forbidden/";
    });

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
app.MapDefaultControllerRoute();

app.Run();
```

## Cookie policy middleware

The
Cookie policy middleware (GitHub Source) `Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy*` enables cookie policy capabilities. Middleware is processed in the order it's added, and cookie policy middleware should be added before cookie authentication middleware.

Use `Microsoft.AspNetCore.Builder.CookiePolicyOptions` provided to the cookie policy middleware to control global characteristics of cookie processing and hook into cookie processing handlers when cookies are appended or deleted.

The default `Microsoft.AspNetCore.Builder.CookiePolicyOptions.MinimumSameSitePolicy` value is `SameSiteMode.Lax` to permit OAuth2 authentication. To strictly enforce a same-site policy of `SameSiteMode.Strict`, set the `MinimumSameSitePolicy`. Although this setting breaks OAuth2 and other cross-origin authentication schemes, it elevates the level of cookie security for other types of apps that don't rely on cross-origin request processing.

The following example shows how to configure cookie authentication with cookie policy middleware:

```csharp
var cookiePolicyOptions = new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.Strict,
};

app.UseCookiePolicy(cookiePolicyOptions);
```
The cookie policy middleware setting for `MinimumSameSitePolicy` can affect the setting of `Cookie.SameSite` in `CookieAuthenticationOptions` settings according to the matrix below.

| MinimumSameSitePolicy | Cookie.SameSite | Resultant Cookie.SameSite setting |
| --------------------- | --------------- | --------------------------------- |
| SameSiteMode.None     | SameSiteMode.NoneSameSiteMode.LaxSameSiteMode.Strict | SameSiteMode.NoneSameSiteMode.LaxSameSiteMode.Strict |
| SameSiteMode.Lax      | SameSiteMode.NoneSameSiteMode.LaxSameSiteMode.Strict | SameSiteMode.LaxSameSiteMode.LaxSameSiteMode.Strict |
| SameSiteMode.Strict   | SameSiteMode.NoneSameSiteMode.LaxSameSiteMode.Strict | SameSiteMode.StrictSameSiteMode.StrictSameSiteMode.Strict |

## Create an authentication cookie

To create a cookie holding user information, construct a `System.Security.Claims.ClaimsPrincipal`. The user information is serialized and stored in the cookie.

Create a `System.Security.Claims.ClaimsIdentity` with any required `System.Security.Claims.Claim`s and call `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignInAsync*` to sign in the user. `Login.cshtml.cs` in the sample app contains the following code:

```csharp
public async Task<IActionResult> OnPostAsync(string returnUrl = null)
{
    ReturnUrl = returnUrl;

    if (ModelState.IsValid)
    {
        // Use Input.Email and Input.Password to authenticate the user
        // with your custom authentication logic.
        //
        // For demonstration purposes, the sample validates the user
        // on the email address maria.rodriguez@contoso.com with 
        // any password that passes model validation.

        var user = await AuthenticateUser(Input.Email, Input.Password);

        if (user == null)
        {
            ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            return Page();
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Email),
            new Claim("FullName", user.FullName),
            new Claim(ClaimTypes.Role, "Administrator"),
        };

        var claimsIdentity = new ClaimsIdentity(
            claims, CookieAuthenticationDefaults.AuthenticationScheme);

        var authProperties = new AuthenticationProperties
        {
            //AllowRefresh = <bool>,
            // Refreshing the authentication session should be allowed.

            //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
            // The time at which the authentication ticket expires. A 
            // value set here overrides the ExpireTimeSpan option of 
            // CookieAuthenticationOptions set with AddCookie.

            //IsPersistent = true,
            // Whether the authentication session is persisted across 
            // multiple requests. When used with cookies, controls
            // whether the cookie's lifetime is absolute (matching the
            // lifetime of the authentication ticket) or session-based.

            //IssuedUtc = <DateTimeOffset>,
            // The time at which the authentication ticket was issued.

            //RedirectUri = <string>
            // The full path or absolute URI to be used as an http 
            // redirect response value.
        };

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme, 
            new ClaimsPrincipal(claimsIdentity), 
            authProperties);

        _logger.LogInformation("User {Email} logged in at {Time}.", 
            user.Email, DateTime.UtcNow);

        return LocalRedirect(Url.GetLocalUrl(returnUrl));
    }

    // Something failed. Redisplay the form.
    return Page();
}
```

`SignInAsync` creates an encrypted cookie and adds it to the current response. If `AuthenticationScheme` isn't specified, the default scheme is used.

`Microsoft.AspNetCore.Authentication.AuthenticationProperties.RedirectUri` is only used on a few specific paths by default, for example, the login path and logout paths. For more information see the CookieAuthenticationHandler source.

ASP.NET Core's Data Protection system is used for encryption. For an app hosted on multiple machines, load balancing across apps, or using a web farm, configure data protection to use the same key ring and app identifier.

## Sign out

To sign out the current user and delete their cookie, call `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync*`:

```csharp
public async Task OnGetAsync(string returnUrl = null)
{
    if (!string.IsNullOrEmpty(ErrorMessage))
    {
        ModelState.AddModelError(string.Empty, ErrorMessage);
    }

    // Clear the existing external cookie
    await HttpContext.SignOutAsync(
        CookieAuthenticationDefaults.AuthenticationScheme);

    ReturnUrl = returnUrl;
}
```

If `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme` (default value: "`Cookies`") isn't used as the scheme, supply the scheme used when configuring the authentication provider. Otherwise, the default scheme is used. For example, if "`ContosoCookie`" is used as the scheme, supply the scheme used when configuring the authentication provider.

When the browser closes it automatically deletes session based cookies (non-persistent cookies), but no cookies are cleared when an individual tab is closed. The server is not notified of tab or browser close events.
