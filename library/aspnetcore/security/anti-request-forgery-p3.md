---
title: "Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core (part 3 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/anti-request-forgery.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core (part 3 of 5)

### Customizing: implement `ICsrfProtection`

The decision logic lives behind a one-method interface:

```csharp
namespace Microsoft.AspNetCore.Antiforgery;

public interface ICsrfProtection
{
    ValueTask<CsrfProtectionResult> ValidateAsync(HttpContext context);
}
```

To replace the default implementation, register a singleton in DI. Because the framework uses `TryAddSingleton`, an explicit `AddSingleton` call overrides the default:

```csharp
builder.Services.AddSingleton<ICsrfProtection, AllowlistCsrfProtection>();
```

A custom implementation is useful when the trust model doesn't fit CORS—for example, when a fixed allowlist of partner origins is preferred, or when stricter rules are needed:

```csharp
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;

public sealed class AllowlistCsrfProtection : ICsrfProtection
{
    private static readonly HashSet<string> SafeMethods =
        new(StringComparer.OrdinalIgnoreCase) { "GET", "HEAD", "OPTIONS", "TRACE" };

    private static readonly HashSet<string> TrustedOrigins =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "https://app.contoso.com",
            "https://admin.contoso.com",
        };

    public ValueTask<CsrfProtectionResult> ValidateAsync(HttpContext context)
    {
        if (SafeMethods.Contains(context.Request.Method))
        {
            return ValueTask.FromResult(CsrfProtectionResult.Allowed());
        }

        var origin = context.Request.Headers.Origin.ToString();
        var allowed = !string.IsNullOrEmpty(origin) && TrustedOrigins.Contains(origin);

        return ValueTask.FromResult(
            allowed ? CsrfProtectionResult.Allowed() : CsrfProtectionResult.Denied());
    }
}
```

The middleware still honors `.DisableAntiforgery()` / `[IgnoreAntiforgeryToken]` regardless of which implementation is registered—opt-out is handled by the middleware itself before `ValidateAsync` is called.

### Interaction with token-based antiforgery

The two CSRF defenses target different layers and are designed to coexist. They also share the same request feature: both record their result on `Microsoft.AspNetCore.Antiforgery.IAntiforgeryValidationFeature`, and form consumers enforce whatever verdict is present.

| Aspect | Token-based `AntiforgeryMiddleware` | Automatic CSRF protection middleware |
|---|---|---|
| Introduced | ASP.NET Core 2.0+ | .NET 11 |
| Activation | Opt-in via `app.UseAntiforgery()` (or implicitly by `AddMvc` / `MapRazorPages` / `AddRazorComponents`) | Auto-injected by `WebApplication.CreateBuilder` |
| Validates | Synchronized token (form field + cookie pair) | `Sec-Fetch-Site` / `Origin` headers |
| Requires | ASP.NET Core Data Protection Overview for token <example-value> | No tokens, no state |
| Browser scope | All browsers that send cookies | All modern browsers; `Origin` fallback for legacy |
| Per-endpoint opt-out | `.DisableAntiforgery()` / `[IgnoreAntiforgeryToken]` | Same — both honor the same metadata |

The token-based middleware specifically protects against the classic CSRF attack pattern in which a malicious site triggers a form `POST` to a vulnerable site using the user's ambient cookies. The automatic CSRF middleware addresses the same threat at the HTTP layer using browser-supplied metadata. Both can be active on the same endpoint, and many apps will benefit from defense in depth:

* **Razor Pages, MVC, and Blazor SSR apps** that already use the token <example-value> gain a header-based check that runs before token <example-value>, without changing the token flow.
* **Minimal API apps** that bind forms get a useful default without needing to call `app.UseAntiforgery()` or thread `IAntiforgery` through endpoints.
* **APIs called from cross-origin SPAs** can rely on this middleware combined with a CORS allowlist, and skip the token <example-value> entirely if the API never serves HTML forms.

The automatic CSRF middleware replaces the token-based system in many scenarios, because both protect the same form-handling endpoints. Keep the token-based system when:

* The app must support browsers that don't send `Sec-Fetch-Site`. See Browser support.
* The app uses `Microsoft.AspNetCore.Antiforgery.IAntiforgeryAdditionalDataProvider` to round-trip extra data inside the token.
* A security review or compliance requirement specifies the token <example-value> as an independent layer.

For details on the token-based system, including form integration, AJAX flows, configuration via `AntiforgeryOptions`, and `IAntiforgery` APIs, see Antiforgery in ASP.NET Core.

#### Token <example-value> takes precedence

When an app calls `app.UseAntiforgery()`, the token-based middleware runs after the automatic CSRF middleware. The token <example-value> clears any verdict the CSRF middleware recorded and replaces it with the result of token validation. The token <example-value> is authoritative:

* A request that the CSRF middleware marked invalid becomes valid if it carries a valid token.
* A request that the CSRF middleware allowed is marked invalid if its token is missing or invalid.

This ordering means apps that use the token <example-value> see the same end-to-end behavior they had before the automatic middleware existed, while apps that don'<example-value>'s verdict.

### Blazor static server-side rendering

Blazor static server-side rendering (SSR) endpoints participate in the same deferred model. The Razor Components endpoint trusts the verdict recorded on `Microsoft.AspNetCore.Antiforgery.IAntiforgeryValidationFeature` by the upstream middleware and returns `400 - Bad Request` for a form post only when that verdict is invalid. The endpoint no longer validates the request itself.

The behavior depends on which middleware ran:

* Apps that call `app.UseAntiforgery()` are unchanged. The token-based middleware validates each request, and antiforgery tokens are generated for rendered forms as before.
* Apps that don't call `app.UseAntiforgery()` are protected by the automatic CSRF middleware instead. In that configuration, the endpoint skips antiforgery token <example-value> because no token <example-value> is present to validate a token on a later request.

This is a behavior change for static SSR that previously removed `app.UseAntiforgery()`: they're now protected by the CSRF middleware rather than left unprotected, and they stop emitting antiforgery tokens. For migration guidance, see Migrate from ASP.NET Core in .NET 10 to ASP.NET Core in .NET 11. For the formal breaking-change notice, see Blazor server-side rendering defers antiforgery validation to middleware.

### Troubleshooting

**Symptom:** Same-origin requests from a browser succeed, but cross-origin form posts return `400 - Bad Request` with no body.

**Cause:** The CSRF middleware recorded an invalid verdict for the cross-origin request, and a form-processing component—such as an MVC action, a Minimal API form binding, or a Blazor SSR form post—enforced that verdict with a `400 - Bad Request`. This is the expected default behavior for endpoints that process forms.

**Resolution:** Choose one of the following, depending on the scenario:

* If the calling origin is known and trusted, allow it via CORS.
* If the endpoint isn't browser-reachable or uses non-cookie authentication, opt it out with `.DisableAntiforgery()` or `[IgnoreAntiforgeryToken]`.
* If the entire app needs to opt out (for example, during a migration window), disable globally.

**Diagnosing:** The middleware logs every invalid verdict at `Debug` level under the category `Microsoft.AspNetCore.Antiforgery.CsrfProtectionMiddleware` with event name `CsrfValidationFailed`. Enable `Debug` logging for that category in `appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Microsoft.AspNetCore.Antiforgery.CsrfProtectionMiddleware": "Debug"
    }
  }
}
```

A recorded verdict then appears in the log as:

```text
dbug: Microsoft.AspNetCore.Antiforgery.CsrfProtectionMiddleware[1]
      Cross-origin CSRF protection marked request POST /widgets from origin 'https://attacker.example.com' as invalid.
```

**Reproducing locally:** Use `curl` with an explicit `Origin` header to simulate a cross-origin browser request against a form endpoint:

```bash
curl -i -X POST https://localhost:{PORT}/widgets \
     -H "Origin: https://attacker.example.com" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "name=test"
```

Replace `{PORT}` with the app's local HTTPS port. The `400 - Bad Request` is observed because the endpoint binds the form, which enforces the recorded verdict. A non-form endpoint returns its normal response because nothing reads the verdict. Without the `Origin` header, the same request is allowed because `curl` doesn't send `Sec-Fetch-Site` either and a request with neither header is treated as a non-browser client.

The token-based antiforgery system described in the rest of this article predates this middleware and remains available. For most apps, the automatic protection is enough on its own. For guidance on when to keep the token-based system and how to migrate, see Migrate from ASP.NET Core in .NET 10 to ASP.NET Core in .NET 11.

## Antiforgery in ASP.NET Core

> **Warning:**
> ASP.NET Core implements antiforgery using ASP.NET Core Data Protection. The data protection stack must be configured to work in a server farm. For more information, see Configuring data protection.

Antiforgery *services* are registered in the dependency injection container when one of the following APIs is called in `Program.cs`:

* `Microsoft.Extensions.DependencyInjection.AntiforgeryServiceCollectionExtensions.AddAntiforgery*`
* `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddMvc*`
* `Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages*`
* `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllerRoute*`
* `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*`

> **Note:**
> Registering the services doesn'<example-value>'t add the middleware. Blazor and Minimal APIs require an explicit call to `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*` in `Program.cs` to add the middleware to the request processing pipeline. MVC and Razor Pages validate tokens with built-in filters and don't require the middleware. For more information, see ASP.NET Core Blazor authentication and authorization and Antiforgery with Minimal APIs.

The FormTagHelper injects antiforgery tokens into HTML form elements. The following markup in a Razor file automatically generates antiforgery tokens:

```cshtml
<form method="post">
	<!-- ... -->
</form>
```
Similarly, `Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper.BeginForm*` generates antiforgery tokens by default if the form'<example-value>'t GET.

The automatic generation of antiforgery tokens for HTML form elements happens when the `<form>` tag contains the `method="<example-value>"` attribute and either of the following are true:

* The action attribute is empty (`action=""`).
* The action attribute isn't supplied (`<form method="post">`).

Automatic generation of antiforgery tokens for HTML form elements can be disabled:

* Explicitly disable antiforgery tokens with the `asp-antiforgery` attribute:

```cshtml
<form method="post" asp-antiforgery="false">
	<!-- ... -->
</form>
```
* The form element is opted-out of Tag Helpers by using the Tag Helper ! opt-out symbol:

```cshtml
<!form method="post">
	<!-- ... -->
</!form>
```
* Remove the `FormTagHelper` from the view. The `FormTagHelper` can be removed from a view by adding the following directive to the Razor view:

```cshtml
@removeTagHelper Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper, Microsoft.AspNetCore.Mvc.TagHelpers
```
> **Note:**
> Razor Pages are automatically protected from XSRF/CSRF. For more information, see XSRF/CSRF and Razor Pages.

The most common approach to protecting against CSRF attacks is to use the *Synchronizer Token <example-value>* (STP). STP is used when the user requests a page with form data:

1. The server sends a token <example-value> with the current user's identity to the client.
1. The client sends back the token to the server for verification.
1. If the server receives a token that doesn'<example-value>'s identity, the request is rejected.

The token is unique and unpredictable. The token can also be used to ensure proper sequencing of a series of requests (for example, ensuring the request sequence of: page 1 > page 2 > page 3). All of the forms in ASP.NET Core MVC and Razor Pages templates generate antiforgery tokens. The following pair of view examples generates antiforgery tokens:

```cshtml
<form asp-action="Index" asp-controller="Home" method="post">
	<!-- ... -->
</form>

@using (Html.BeginForm("Index", "Home"))
{
	<!-- ... -->
}
```
Explicitly add an antiforgery token to a `<form>` element without using Tag Helpers with the HTML helper `@Html.AntiForgeryToken`:

```cshtml
<form asp-action="Index" asp-controller="Home" method="post">
	@Html.AntiForgeryToken()

	<!-- ... -->
</form>
```
In each of the preceding cases, ASP.NET Core adds a hidden form field similar to the following example:

```html
<input name="<example-value>" type="<example-value>" value="<example-value>">
```

ASP.NET Core includes three filters for working with antiforgery tokens:

* ValidateAntiForgeryToken
* AutoValidateAntiforgeryToken
* IgnoreAntiforgeryToken

## Antiforgery with `AddControllers`

Calling `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllers*` does ***not*** enable antiforgery tokens. `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddControllersWithViews*` must be called to have built-in antiforgery token support.

## Multiple browser tabs and the Synchronizer Token <example-value>

Multiple tabs logged in as different users, or one logged in as anonymous, are not supported.
