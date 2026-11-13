---
title: "Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core (part 2 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/anti-request-forgery.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core (part 2 of 5)

## Automatic CSRF protection in ASP.NET Core

ASP.NET Core ships an automatic CSRF protection middleware that'<example-value>'t issue or validate tokens. Instead, it inspects the `Sec-Fetch-Site` and `Origin` Fetch metadata headers and records a validation verdict on the request. Components that process submitted form data enforce that verdict, rejecting cross-origin form posts that aren't explicitly trusted.

For most apps, no code changes are required: same-origin browser requests, safe HTTP methods, and non-browser clients (`curl`, server-to-server, mobile apps) all pass <example-value> unaffected. The middleware primarily affects apps that accept cross-origin form posts from a browser, such as a site that posts a form to an API on a different origin. Those scenarios need to either configure CORS to declare the trusted origin or opt the endpoint out.

This middleware is *additive* to the token-based antiforgery system. The two protections coexist and can both be active on the same endpoint. For a comparison of when each one applies, see Interaction with token-based antiforgery.

### How it works

For every request, the middleware evaluates a short chain of rules to reach a verdict—*allowed* or *denied*. The checks run in order, and the first match wins:

1. **Safe HTTP methods are always allowed.** `GET`, `HEAD`, `OPTIONS`, and `TRACE` requests pass through. This follows RFC 9110 §9.2.1 and is consistent with the long-standing rule that endpoints shouldn't change state on `GET`.
1. **`Sec-Fetch-Site: same-origin` or `Sec-Fetch-Site: none` is allowed.** Modern browsers send `Sec-Fetch-Site` on every request. `same-origin` covers normal in-app navigation and fetch, and `none` covers requests initiated directly by the user (typing a URL, using a bookmark). This is the most common code path—most legitimate browser traffic exits here.
1. **A trusted, credentialed origin from CORS is allowed.** If the request carries an `Origin` header and the endpoint's resolved CORS policy trusts that origin and the policy has `.AllowCredentials()` configured, the request is allowed. The middleware resolves the policy the same way the CORS middleware does: per-endpoint policy from `[EnableCors("name")]` first, then the default policy registered with `AddDefaultPolicy`. See Allowing cross-origin clients for important limits on this rule.
1. **Any other `Sec-Fetch-Site` value is denied.** When `Sec-Fetch-Site` is `cross-site` or `same-site` and the origin isn't trusted via CORS, the request is denied.
1. **No `Sec-Fetch-Site`, but `Origin` is present:** the middleware compares the `Origin` to `scheme://host[:port]` built from the request. If they match, the request is allowed; otherwise it's denied. This is the fallback path for browsers older than the Fetch Metadata spec (released ~2020).
1. **No `Sec-Fetch-Site` and no `Origin`: the request is allowed.** Browsers always send at least one of these on a write request, so a request missing both is almost certainly a non-browser client such as `curl`, Postman, a mobile app, or a server-to-server caller. CSRF is a browser-only attack vector, so these requests pass through.

The middleware records this verdict on the request rather than ending the request itself. For how and when a denied verdict turns into an HTTP `400 Bad Request` response, see Deferred validation.

### Deferred validation

The middleware doesn'<example-value>'s `Microsoft.AspNetCore.Antiforgery.IAntiforgeryValidationFeature`—the same feature the token-based antiforgery system uses—where a denied verdict is recorded as *invalid*. The request continues down the pipeline. An invalid verdict becomes an HTTP `400 Bad Request` only when a component that processes form data observes it. This deferral matches how the token-based system already behaves: the verdict is produced early but enforced at the point where a form is consumed.

The following components read `Microsoft.AspNetCore.Antiforgery.IAntiforgeryValidationFeature` and reject a request with `400 - Bad Request` when the recorded verdict is invalid:

* MVC actions protected by antiforgery.
* Minimal API endpoints that bind a form parameter.
* Blazor SSR endpoints.
* Any code that reads the request form directly, which acts as a backstop.

Each consumer first confirms that an antiforgery or CSRF middleware actually ran before it trusts the verdict, so a pipeline without either middleware doesn't produce false rejections.

A consequence of this model is that an endpoint that never reads form data runs even when the verdict is invalid. For example, a JSON API endpoint that binds its body from JSON, or a handler that ignores the request body, isn't rejected automatically on a cross-origin request. The verdict is still recorded on `Microsoft.AspNetCore.Antiforgery.IAntiforgeryValidationFeature` for code that wants to inspect it, but nothing enforces it. CSRF is a form-and-cookie attack vector, so endpoints that don't consume a browser-submitted form generally don't need this rejection. Endpoints that do process forms—Razor Pages, MVC views, Blazor SSR, and Minimal API form binding—get the protection automatically.

### Default behavior

The middleware is registered automatically by `WebApplication.CreateBuilder` and runs after authentication and authorization. It validates each request using the registered `ICsrfProtection` implementation, which by default applies the rules described in How it works. The default implementation can be replaced; see Customizing: implement `ICsrfProtection`. To turn the middleware off entirely, see Disabling globally.

The result is that a minimal app with a form-handling endpoint like the following is already protected:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/widgets", ([FromForm] Widget w) =>
    Results.Created($"/widgets/{w.Id}", w));

app.Run();
```

A browser making a same-origin `POST /widgets` request reaches the endpoint normally. A browser at `https://attacker.example.com` posting the same form is rejected with `400 - Bad Request` when the endpoint binds the form, before the handler body runs. A `curl` request without `Sec-Fetch-Site` or `Origin` is allowed.

Because rejection is deferred to form consumers, an endpoint that doesn't read form data—such as a JSON API that binds its body from JSON—isn't rejected automatically, even on a cross-origin request. The verdict is still recorded on the request for code that wants to inspect it.

The middleware integrates with the existing antiforgery model:

* **Minimal APIs:** Calling `.DisableAntiforgery()` on an endpoint opts that endpoint out of *both* the token-based middleware and CSRF protection middleware. The same metadata (`IAntiforgeryMetadata { RequiresValidation = false }`) is checked by both.
* **MVC controllers and actions:** `[IgnoreAntiforgeryToken]` also opts the endpoint out of both protections.

### Allowing cross-origin clients

The most common scenario that requires action is a browser-based client that submits a cross-origin form—for example, a site at `https://app.contoso.com` posting a form to an API at `https://api.contoso.com`. Such form posts are denied by default because `Sec-Fetch-Site` is `same-site` or `cross-site` rather than `same-origin`, and the form consumer enforces that verdict with a `400 - Bad Request`.

The CSRF middleware doesn't introduce its own trust list. It reuses the same CORS policy that the CORS middleware resolves for the endpoint: if that policy allows the request's `Origin` *and* the policy has `.AllowCredentials()` configured, the CSRF middleware records an allowed verdict for the request.

Allowing an origin with `WithOrigins` does not, by itself, permit browser JavaScript at that origin to read responses to credentialed requests. `.AllowCredentials()` grants that permission. Omitting it does not guarantee that requests arrive without credentials, so CORS alone is not a defense against CSRF. The CSRF middleware requires both an allowed origin and `.AllowCredentials()` as an explicit trust signal. Otherwise, the request falls through to the remaining `Sec-Fetch-Site` and Origin-vs-Host checks.

The policy is picked per-endpoint in this order:

1. `[EnableCors("api")]` (MVC) or `.RequireCors("api")` (Minimal API) → the named policy `"api"`.
1. No CORS metadata on the endpoint → the default policy registered with `AddDefaultPolicy`.
1. No matching policy (named policy not registered, no default policy, or `services.AddCors()` never called) → no CORS-derived trust. The middleware falls through to the `Sec-Fetch-Site` and Origin-vs-Host rules.

> **Note:**
> The CSRF middleware trusts whatever `IsOriginAllowed` returns for the resolved CORS policy, so this includes custom predicates configured with `SetIsOriginAllowed` and wildcard-subdomain matching configured with `SetIsOriginAllowedToAllowWildcardSubdomains`. When such a policy also has `.AllowCredentials()` configured, every origin the predicate accepts is treated as CSRF-trusted. Use custom or wildcard origin matching only when every origin the predicate can match is controlled and trusted for cookie-authenticated operations, and avoid broad wildcard credentialed policies when subdomains are user-controlled, third-party-hosted, or otherwise susceptible to takeover.

A minimal example using a default policy and a Minimal API endpoint:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("https://app.contoso.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

var app = builder.Build();

app.UseCors();

app.MapPost("/widgets", ([FromForm] Widget w) =>
    Results.Created($"/widgets/{w.Id}", w));

app.Run();
```

For a named policy on a single endpoint:

```csharp
app.MapPost("/widgets", ([FromForm] Widget w) => Results.Created($"/widgets/{w.Id}", w))
   .RequireCors("api");
```

> **Warning:**
> `AllowAnyOrigin` is intentionally **not** honored as a CSRF trust signal. (In ASP.NET Core CORS, combining `AllowAnyOrigin` with `.AllowCredentials()` is invalid and insecure.) `AllowAnyOrigin` means "any browser can read this resource," which is a different concern than "any origin may mutate state on the user's behalf." Treating `AllowAnyOrigin` as trusted would turn this middleware into a no-op for cross-origin writes. Apps that need a public-read CORS policy combined with CSRF-protected writes should list trusted write origins explicitly with `WithOrigins` or opt write endpoints out if they don't rely on cookie-based authentication.
>
> A policy that lists specific origins with `WithOrigins` but omits `.AllowCredentials()` isn't honored for CSRF trust either. Add `.AllowCredentials()` to any policy that's meant to mark cross-origin, cookie-authenticated form posts as CSRF-trusted.

`[DisableCors]` on an endpoint isn't a CSRF opt-out. It skips the CORS-derived trust step, and the request still has to satisfy the `Sec-Fetch-Site` and Origin-vs-Host rules. To opt out of CSRF protection, see Opting an endpoint out.

For details on configuring CORS itself—`AddCors`, `AddDefaultPolicy`, `AddPolicy`, `WithOrigins`, and the rest of the policy builder API—see Enable Cross-Origin Requests (CORS) in ASP.NET Core.

### Opting an endpoint out

If an endpoint isn't browser-reachable or is secured by a non-cookie mechanism, such as a bearer token or API key, opt it out individually rather than disabling the middleware globally.

**Minimal APIs** — call `DisableAntiforgery` on the endpoint or group:

```csharp
app.MapPost("/api/webhook", (WebhookPayload p) => Results.Accepted())
   .DisableAntiforgery();
```

**MVC controllers** — apply `[IgnoreAntiforgeryToken]` to the action or controller:

```csharp
[ApiController]
[Route("api/[controller]")]
[IgnoreAntiforgeryToken]
public class WebhookController : ControllerBase
{
    [HttpPost]
    public IActionResult Post([FromBody] WebhookPayload payload) => Accepted();
}
```

Either approach adds `IAntiforgeryMetadata { RequiresValidation = false }` to the endpoint, which the CSRF middleware honors by skipping validation.

> **Warning:**
> Disabling CSRF protection on an endpoint should only be done when the endpoint isn't vulnerable to CSRF attacks—for example, endpoints that aren't callable from a browser or that are secured with non-cookie authentication such as bearer <example-value> or API keys. Don't disable CSRF protection on browser-accessible endpoints that rely on cookies for authentication.

### Disabling globally

The middleware can be disabled across the entire app using the `DisableCsrfProtection` configuration key. This is an escape hatch—prefer per-endpoint opt-outs.

In `appsettings.json`:

```json
{
  "DisableCsrfProtection": true
}
```

Or as an environment variable:

```text
ASPNETCORE_DisableCsrfProtection=true
```

When this key is set to `true`, `WebApplication` skips registering the middleware in the pipeline. The `ICsrfProtection` service remains registered, so anything that resolves it directly continues to work.

> **Warning:**
> The automatic CSRF middleware also satisfies the antiforgery requirement for endpoints that require validation, even when an app doesn't call `app.UseAntiforgery()`. If an app relies on antiforgery but doesn't call `app.UseAntiforgery()`, disabling the CSRF middleware globally or running on a host that isn't built with `WebApplication`, where the middleware isn't injected, leaves those endpoints with no antiforgery middleware. A request to such an endpoint then throws an exception. Call `app.UseAntiforgery()` in that configuration.

### Browser support

`Sec-Fetch-Site` is supported by all current versions of Chromium-based browsers, Firefox, and Safari. For an authoritative compatibility table, see the MDN reference for `Sec-Fetch-Site`.

Older browsers that predate Fetch Metadata don't send `Sec-Fetch-Site`. For those clients, the middleware falls back to comparing the `Origin` header against the request's scheme and host. Browsers have sent `Origin` on cross-origin write requests for many years, so this fallback covers essentially all legacy browser traffic.

Non-browser clients—`curl`, Postman, mobile apps, server-to-server callers—typically send neither `Sec-Fetch-Site` nor `Origin`. Those requests are allowed because CSRF is a browser-only attack vector that depends on the browser automatically attaching ambient credentials such as cookies. A non-browser client that wants to attack the API has no need for CSRF; it can simply call the API directly with whatever credentials it possesses.
