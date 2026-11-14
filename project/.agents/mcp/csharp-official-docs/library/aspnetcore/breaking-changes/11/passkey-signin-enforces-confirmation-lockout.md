---
title: "Breaking change: Passkey sign-in enforces email/phone confirmation and lockout"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/11/passkey-signin-enforces-confirmation-lockout.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Passkey <example-value> enforces email/phone confirmation and lockout

`SignInManager<TUser>.PasskeySignInAsync` now calls `PreSignInCheck` before signing the user in. This means a successful passkey <example-value> alone is no longer enough to sign in if the user'<example-value>'t met the configured `RequireConfirmedEmail`, `RequireConfirmedPhoneNumber`, or `RequireConfirmedAccount` policies. This aligns passkey <example-value> behavior with `PasswordSignInAsync` and the other sign-in methods.

## Version introduced

.NET 11

## Previous behavior

Previously, `SignInManager<TUser>.PasskeySignInAsync` didn't call `PreSignInCheck`. A successful passkey <example-value> signed the user in even when:

- `SignInOptions.RequireConfirmedEmail` was `true` and the user's email wasn't confirmed.
- `SignInOptions.RequireConfirmedPhoneNumber` was `true` and the user's phone number wasn't confirmed.
- `SignInOptions.RequireConfirmedAccount` was `true` and the user's account wasn't confirmed.
- The user was locked out (their `LockoutEnd` was in the future).

This was inconsistent with `PasswordSignInAsync` and other sign-in methods, which already enforced these requirements.

## New behavior

Starting in ASP.NET Core 11, after a successful passkey <example-value>, `PasskeySignInAsync` calls `PreSignInCheck` before issuing the authentication cookie. If the user fails any of the configured checks, the method returns one of the following without signing the user in:

- `Microsoft.AspNetCore.Identity.SignInResult.LockedOut` if the user is locked out.
- `Microsoft.AspNetCore.Identity.SignInResult.NotAllowed` if the user's email, phone, or account isn't confirmed.

## Type of breaking change

This change is a behavioral change.

## Reason for change

`PasskeySignInAsync` was missing the `PreSignInCheck` call that the other `SignInManager` sign-in methods make. As a result, an application that required confirmed email or phone for password <example-value> unintentionally let users bypass that requirement by enrolling a passkey. The change brings passkey <example-value> into line with the rest of the sign-in surface. For more information, see dotnet/aspnetcore#65024.

## Recommended action

Review your sign-in UI flow to handle `SignInResult.LockedOut` and `SignInResult.NotAllowed` for passkey <example-value> the same way you already handle them for password sign-in. The scaffolded Identity UI in the ASP.NET Core templates already handles both results.

If your app currently relies on passkey <example-value> to bypass these checks, the safest change is to update the relevant user records (for example, mark the email as confirmed) rather than to remove the checks themselves. Removing the checks on `SignInManager<TUser>.PreSignInCheck` affects every sign-in path, not only passkey sign-in.

## Affected APIs

- `Microsoft.AspNetCore.Identity.SignInManager`1.PasskeySignInAsync*`
- `Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedEmail`
- `Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedPhoneNumber`
- `Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedAccount`
