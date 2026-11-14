---
title: "Breaking change: OpenID Connect `max_age` validates `auth_time`"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/11/openid-connect-max-age-validates-auth-time.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# OpenID Connect `max_age` validates `auth_time`

To enforce the authentication freshness requested by an app, the ASP.NET Core OpenID Connect handler now validates the signed `auth_time` claim in ID tokens whenever the authorization request includes `max_age`. Providers that omit the claim or return an invalid authentication time now cause authentication to fail.

## Version introduced

.NET 11 RC 2

## Previous behavior

Previously, the OpenID Connect handler sent `max_age` to the identity provider but didn'<example-value>'s `auth_time` against that value. An app could accept authentication even if the provider omitted `auth_time` or reported an authentication time outside the requested limit.

## New behavior

Starting in ASP.NET Core 11, the handler validates `auth_time` after normal token and protocol validation whenever the effective authorization request includes `max_age`. The handler records the exact effective `max_age` in protected authorization transaction state after `OnRedirectToIdentityProvider` runs and uses that value to validate the response.

The effective value can come from any of the following sources:

* `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MaxAge`
* `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectChallengeProperties.MaxAge` for an individual challenge.
* `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.AdditionalAuthorizationParameters`
* `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectEvents.OnRedirectToIdentityProvider`

The signed ID token must contain `auth_time` as an integral, nonnegative OpenID Connect NumericDate: a JSON number that represents seconds since the Unix epoch and fits within the `DateTimeOffset` range. Authentication fails if the claim is missing, malformed, a string, fractional, negative, or outside that range.

The handler also rejects authentication times that are too old or too far in the future:

* The elapsed time since `auth_time` must not exceed `max_age` plus `TokenValidationParameters.ClockSkew`.
* `auth_time` must not exceed the current time plus `TokenValidationParameters.ClockSkew`.

Values exactly at either boundary are accepted.

This validation applies to every ID token in the authorization code, implicit, and hybrid flows, including both ID tokens in a hybrid flow. It applies to both the default `TokenHandler` and the legacy `SecurityTokenValidator` paths. If the authorization request doesn't include `max_age`, this change adds no new `auth_time` check.

For pushed authorization requests (PAR), set `max_age` in `OnRedirectToIdentityProvider`. While this validation is active, changes to `max_age` in `OnPushAuthorization` are rejected unless the handler skips the push.

## Type of breaking change

This change is a behavioral change. No API signatures change.

## Reason for change

To enforce the app's requested authentication freshness, the handler must validate the provider's signed assertion instead of only forwarding `max_age`. The OpenID Connect authentication request specification requires an `auth_time` claim when `max_age` is requested. For the implementation and background, see dotnet/aspnetcore#69321 and dotnet/aspnetcore#67462.

This check trusts only the identity provider'<example-value>'t prove that a person performed a new physical authentication ceremony or protect against a compromised provider. It doesn'<example-value>'s local authentication cookie lifetime.

## Recommended action

To preserve authentication freshness checks, ensure that your identity provider honors `max_age` and returns a valid signed `auth_time` claim in every applicable ID token. Test requests that use each of your app's `max_age` sources and, for PAR, move any `max_age` customization from `OnPushAuthorization` to `OnRedirectToIdentityProvider`.

As a temporary compatibility measure while you update the provider, you can disable the new validation with a process-wide AppContext switch. Set the switch before authentication starts, for example at the beginning of `Program.cs`:

```csharp
AppContext.SetSwitch(
    "Microsoft.AspNetCore.Authentication.OpenIdConnect.DisableMaxAgeValidation",
    true);
```

Alternatively, set the equivalent property in the app's runtime configuration:

```json
{
  "runtimeOptions": {
    "configProperties": {
      "Microsoft.AspNetCore.Authentication.OpenIdConnect.DisableMaxAgeValidation": true
    }
  }
}
```

The switch defaults to `false`. To restore validation after the provider is fixed, remove the switch or set it to `false`. The switch disables the handler's `max_age` validation for the entire process, not just one authentication scheme or challenge.

## Affected APIs

* `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.MaxAge`
* `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectChallengeProperties.MaxAge`
* `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions.AdditionalAuthorizationParameters`
* `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectEvents.OnRedirectToIdentityProvider`
