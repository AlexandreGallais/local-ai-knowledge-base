---
title: "Breaking change: Identity external login keys use ordinal equality"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/11/identity-login-ordinal-equality.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Identity external login keys use ordinal equality

Starting in ASP.NET Core 11, the built-in Entity Framework Core Identity stores use ordinal equality to verify external login provider names and keys after a database lookup. A collation-only match no longer resolves to a user or causes a login to be removed.

## Version introduced

ASP.NET Core 11 RC 2

## Previous behavior

Previously, `UserStore` and `UserOnlyStore` filtered external logins with a database-translated equality predicate. The database collation determined whether the stored `LoginProvider` and `ProviderKey` values matched the supplied values.

On a case-insensitive collation, `FindByLoginAsync` could resolve a login when either value differed only by case. On databases where equality ignores trailing spaces, it could also resolve a login when either value differed by trailing spaces. `RemoveLoginAsync` used the same collation-dependent lookup and could remove such a login.

## New behavior

Starting in ASP.NET Core 11, the built-in Entity Framework Core Identity stores use the database equality as an indexed candidate lookup, then verify that both the materialized `LoginProvider` and `ProviderKey` match the requested values using `StringComparison.Ordinal`.

If the database returns only a collation-based match, `FindByLoginAsync` returns no user and `RemoveLoginAsync` doesn't remove the login. Exact ordinal matches continue to work.

## Type of breaking change

This change is a behavioral change.

## Reason for change

External provider keys are opaque identifiers. Their equality must not vary with the configured database provider or collation. Managed ordinal verification makes the built-in Entity Framework Core stores consistent with the in-memory reference store while preserving the indexed database lookup. For more information, see dotnet/aspnetcore#69277.

## Recommended action

Persist and later supply the exact `LoginProvider` and `ProviderKey` values issued for an external login. Don't normalize, case-fold, trim, or otherwise alter provider keys.

Third-party `IUserLoginStore<TUser>` implementations own their equality semantics. If an implementation queries a collation-aware database, preserve an indexed candidate lookup and verify the materialized provider name and key with ordinal equality before resolving or removing a login.

## Affected APIs

* `Microsoft.AspNetCore.Identity.IUserLoginStore`1.FindByLoginAsync(System.String,System.String,System.Threading.CancellationToken)`
* `Microsoft.AspNetCore.Identity.IUserLoginStore`1.RemoveLoginAsync(`0,System.String,System.String,System.Threading.CancellationToken)`
