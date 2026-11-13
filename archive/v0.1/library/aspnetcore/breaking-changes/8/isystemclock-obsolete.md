---
title: "Breaking change: ISystemClock is obsolete"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/8/isystemclock-obsolete.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ISystemClock is obsolete

`Microsoft.AspNetCore.Authentication.ISystemClock` has been used by ASP.NET Core's authentication and identity components since version 1.0 to enable unit testing of time-related functionality, like expiration checking. .NET 8 includes a suitable abstraction, `System.TimeProvider`, that provides the same functionality and much more. We're taking this opportunity to obsolete `Microsoft.AspNetCore.Authentication.ISystemClock` and replace it with `System.TimeProvider` throughout the ASP.NET Core libraries.

## Version introduced

ASP.NET Core 8.0 Preview 5

## Previous behavior

`Microsoft.AspNetCore.Authentication.ISystemClock` was injected into the constructors of the authentication and identity components by dependency injection (DI) and could be overridden for testing.

The default `Microsoft.AspNetCore.Authentication.SystemClock` implementation truncated to the nearest second for easier formatting.

## New behavior

`Microsoft.AspNetCore.Authentication.ISystemClock`, `Microsoft.AspNetCore.Authentication.SystemClock`, and the authentication handler constructors that have an `Microsoft.AspNetCore.Authentication.ISystemClock` parameter have been marked obsolete. Using these APIs in code will generate a warning at compile time.

`Microsoft.AspNetCore.Authentication.ISystemClock` remains in the dependency injection container but is no longer used. It may be removed from the container in a future version.

`System.TimeProvider` is now a settable property on the `Options` classes for the authentication and identity components. It can be set directly or by registering a provider in the dependency injection container.

`System.TimeProvider` does not truncate to the nearest second. Consumers are expected to correctly format the time as needed.

## Type of breaking change

This change affects source compatibility.

## Reason for change

This change was made to unify time abstraction across the stack for easier testing.

## Recommended action

If you have components that derive from `Microsoft.AspNetCore.Authentication.AuthenticationHandler`1` or `Microsoft.AspNetCore.Identity.SecurityStampValidator`1`, remove the `Microsoft.AspNetCore.Authentication.ISystemClock` constructor parameter and call the new base constructor accordingly.

```diff
- public BasicAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock)
-     : base(options, logger, encoder, clock)
+ public BasicAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder)
+     : base(options, logger, encoder)
```

Similarly, derived implementations that reference the `Clock` property on these types should reference the new `TimeProvider` property instead.

```diff
- var currentUtc = Clock.UtcNow;
+ var currentUtc = TimeProvider.GetUtcNow();
```

You can set `TimeProvider` for testing on the options or via DI.

## Affected APIs

- `Microsoft.AspNetCore.Authentication.ISystemClock`
- `Microsoft.AspNetCore.Authentication.SystemClock`
- `Microsoft.AspNetCore.Authentication.AuthenticationHandler`1`
- `Microsoft.AspNetCore.Authentication.AuthenticationHandler`1.Clock`
- `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationHandler.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Authentication.Facebook.FacebookHandler.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.Facebook.FacebookOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Authentication.Google.GoogleHandler.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.Google.GoogleOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerHandler.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Authentication.MicrosoftAccount.MicrosoftAccountHandler.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.MicrosoftAccount.MicrosoftAccountOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Authentication.Negotiate.NegotiateHandler.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.Negotiate.NegotiateOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Authentication.OAuth.OAuthHandler`1.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{`0},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectHandler.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.HtmlEncoder,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Authentication.PolicySchemeHandler.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.PolicySchemeOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Authentication.RemoteAuthenticationHandler`1`
- `Microsoft.AspNetCore.Authentication.SignInAuthenticationHandler`1.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{`0},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Authentication.SignOutAuthenticationHandler`1.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{`0},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Authentication.Twitter.TwitterHandler.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.Twitter.TwitterOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Authentication.WsFederation.WsFederationHandler.#ctor(Microsoft.Extensions.Options.IOptionsMonitor{Microsoft.AspNetCore.Authentication.WsFederation.WsFederationOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.UrlEncoder,Microsoft.AspNetCore.Authentication.ISystemClock)`
- `Microsoft.AspNetCore.Identity.SecurityStampValidator`1.#ctor(Microsoft.Extensions.Options.IOptions{Microsoft.AspNetCore.Identity.SecurityStampValidatorOptions},Microsoft.AspNetCore.Identity.SignInManager{`0},Microsoft.AspNetCore.Authentication.ISystemClock,Microsoft.Extensions.Logging.ILoggerFactory)`
- `Microsoft.AspNetCore.Identity.SecurityStampValidator`1.Clock`
- `Microsoft.AspNetCore.Identity.TwoFactorSecurityStampValidator`1.#ctor(Microsoft.Extensions.Options.IOptions{Microsoft.AspNetCore.Identity.SecurityStampValidatorOptions},Microsoft.AspNetCore.Identity.SignInManager{`0},Microsoft.AspNetCore.Authentication.ISystemClock,Microsoft.Extensions.Logging.ILoggerFactory)`
