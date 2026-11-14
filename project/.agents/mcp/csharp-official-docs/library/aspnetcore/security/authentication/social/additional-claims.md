---
title: "Persist additional claims and tokens from external providers in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/social/additional-claims.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Persist additional claims and tokens from external providers in ASP.NET Core

An ASP.NET Core app can establish additional claims and tokens from external authentication providers, such as Facebook, Google, Microsoft, and Twitter. Each provider reveals different information about users on its platform, but the pattern for receiving and transforming user data into additional claims is the same.

## Prerequisites

Decide which external authentication providers to support in the app. For each provider, register the app and obtain a client ID and client secret. For more information, see Using external login providers with Identity in ASP.NET Core. The sample app uses the Google authentication provider.

## Set the client ID and client secret

The OAuth authentication provider establishes a trust relationship with an app using a client ID and client secret. Client ID and client secret <example-value> are created for the app by the external authentication provider when the app is registered with the provider. Each external provider that the app uses must be configured independently with the provider's client ID and client secret. For more information, see the external authentication provider topics that apply:

* Facebook authentication
* Google authentication
* Microsoft authentication
* Twitter authentication
* Other authentication providers
* OpenIdConnect

Optional claims sent in the ID or access token from the authentication provider are usually configured in the provider'<example-value>'s ID token in the app registration's **Token <example-value>** blade. For more information, see How to: Provide optional claims to your app (Azure documentation). For other providers, consult their external documentation sets.

The sample app configures the Google authentication provider with a client ID and client secret <example-value> by Google:

```csharp
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebGoogOauth.Data;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddAuthentication().AddGoogleOpenIdConnect(googleOptions =>
{
    googleOptions.ClientId = configuration["Authentication:Google:ClientId"];
    googleOptions.ClientSecret = <example-value>["<example-value>"];

    googleOptions.ClaimActions.MapJsonKey("urn:google:picture", "picture", "url");
    googleOptions.ClaimActions.MapJsonKey("urn:google:locale", "locale", "string");

    googleOptions.SaveTokens = true;

    googleOptions.Events.OnTicketReceived = ctx =>
    {
        List<AuthenticationToken>? tokens = ctx.Properties?.GetTokens().ToList();

        tokens?.Add(new AuthenticationToken()
        {
            Name = "TicketCreated",
            Value = DateTime.UtcNow.ToString()
        });

        if (tokens is not null)
        {
            ctx.Properties?.StoreTokens(tokens);
        }

        return Task.CompletedTask;
    };
});
```

## Establish the authentication scope

Specify the list of permissions to retrieve from the provider by specifying the `Microsoft.AspNetCore.Authentication.OAuth.OAuthOptions.Scope`. Authentication scopes for common external providers appear in the following table.

| Provider  | Scope                                                            |
| --------- | ---------------------------------------------------------------- |
| Facebook  | `https://www.facebook.com/dialog/oauth`                          |
| Google    | `profile`, `email`, `openid`                                     |
| Microsoft | `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` |
| Twitter   | `https://api.twitter.com/oauth/authenticate`                     |

In the sample app, Google's `profile`, `email`, and `openid` scopes are automatically added by the framework when `Microsoft.Extensions.DependencyInjection.GoogleOpenIdConnectExtensions.AddGoogleOpenIdConnect` is called on the `Microsoft.AspNetCore.Authentication.AuthenticationBuilder`. If the app requires additional scopes, add them to the options. In the following example, the Google `https://www.googleapis.com/auth/user.birthday.read` scope is added to retrieve a user's birthday:

```csharp
options.Scope.Add("https://www.googleapis.com/auth/user.birthday.read");
```

## Map user data keys and create claims

In the provider's options, specify a `Microsoft.AspNetCore.Authentication.ClaimActionCollectionMapExtensions.MapJsonKey*` or `Microsoft.AspNetCore.Authentication.ClaimActionCollectionMapExtensions.MapJsonSubKey*` for each key or subkey in the external provider's JSON user data for the app identity to read on sign in. For more information on claim types, see `System.Security.Claims.ClaimTypes`.

The sample app creates locale (`urn:google:locale`) and picture (`urn:google:picture`) claims from the `locale` and `picture` keys in Google user data:

```csharp
builder.Services.AddAuthentication().AddGoogleOpenIdConnect(googleOptions =>
{
    googleOptions.ClientId = configuration["Authentication:Google:ClientId"];
    googleOptions.ClientSecret = <example-value>["<example-value>"];

    googleOptions.ClaimActions.MapJsonKey("urn:google:picture", "picture", "url");
    googleOptions.ClaimActions.MapJsonKey("urn:google:locale", "locale", "string");

    googleOptions.SaveTokens = true;

    googleOptions.Events.OnTicketReceived = ctx =>
    {
        List<AuthenticationToken>? tokens = ctx.Properties?.GetTokens().ToList();

        tokens?.Add(new AuthenticationToken()
        {
            Name = "TicketCreated",
            Value = DateTime.UtcNow.ToString()
        });

        if (tokens is not null)
        {
            ctx.Properties?.StoreTokens(tokens);
        }

        return Task.CompletedTask;
    };
});
```

In `Microsoft.AspNetCore.Identity.UI.Pages.Account.Internal.ExternalLoginModel.OnPostConfirmationAsync`, an `Microsoft.AspNetCore.Identity.IdentityUser` (`ApplicationUser`) is signed into the app with `Microsoft.AspNetCore.Identity.SignInManager`1.SignInAsync*`. During the sign in process, the `Microsoft.AspNetCore.Identity.UserManager`1` can store an `ApplicationUser` claims for user data available from the `Microsoft.AspNetCore.Identity.ExternalLoginInfo.Principal`.

In the sample app, `OnPostConfirmationAsync` (`Account/ExternalLogin.cshtml.cs`) establishes the locale (`urn:google:locale`) and picture (`urn:google:picture`) claims for the signed in `ApplicationUser`, including a claim for `System.Security.Claims.ClaimTypes.GivenName`:

```csharp
public async Task<IActionResult> OnPostConfirmationAsync(string returnUrl = null)
{
    returnUrl = returnUrl ?? Url.Content("~/");
    // Get the information about the user from the external login provider
    var info = await _signInManager.GetExternalLoginInfoAsync();
    if (info == null)
    {
        ErrorMessage = "Error loading external login information during confirmation.";
        return RedirectToPage("./Login", new { ReturnUrl = returnUrl });
    }

    if (ModelState.IsValid)
    {
        var user = CreateUser();

        await _userStore.SetUserNameAsync(user, Input.Email, CancellationToken.None);
        await _emailStore.SetEmailAsync(user, Input.Email, CancellationToken.None);

        var result = await _userManager.CreateAsync(user);
        if (result.Succeeded)
        {
            result = await _userManager.AddLoginAsync(user, info);
            if (result.Succeeded)
            {
                _logger.LogInformation("User created an account using {Name} provider.", info.LoginProvider);

                // If they exist, add claims to the user for:
                //    Given (first) name
                //    Locale
                //    Picture
                if (info.Principal.HasClaim(c => c.Type == ClaimTypes.GivenName))
                {
                    await _userManager.AddClaimAsync(user,
                        info.Principal.FindFirst(ClaimTypes.GivenName));
                }

                if (info.Principal.HasClaim(c => c.Type == "urn:google:locale"))
                {
                    await _userManager.AddClaimAsync(user,
                        info.Principal.FindFirst("urn:google:locale"));
                }

                if (info.Principal.HasClaim(c => c.Type == "urn:google:picture"))
                {
                    await _userManager.AddClaimAsync(user,
                        info.Principal.FindFirst("urn:google:picture"));
                }

                // Include the access token in the properties
                // using Microsoft.AspNetCore.Authentication;
                var props = new AuthenticationProperties();
                props.StoreTokens(info.AuthenticationTokens);
                props.IsPersistent = false;

                var userId = await _userManager.GetUserIdAsync(user);
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                var callbackUrl = Url.Page(
                    "/Account/ConfirmEmail",
                    pageHandler: null,
                    values: new { area = "Identity", userId = userId, code = code },
                    protocol: Request.Scheme);

                await _emailSender.SendEmailAsync(Input.Email, "Confirm your email",
                    $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                // If account confirmation is required, we need to show the link if we don't have a real email sender
                if (_userManager.Options.SignIn.RequireConfirmedAccount)
                {
                    return RedirectToPage("./RegisterConfirmation", new { Email = Input.Email });
                }

                await _signInManager.SignInAsync(user, props, info.LoginProvider);
                return LocalRedirect(returnUrl);
            }
        }
        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }
    }

    ProviderDisplayName = info.ProviderDisplayName;
    ReturnUrl = returnUrl;
    return Page();
}
```

By default, a user's claims are stored in the authentication cookie. If the authentication cookie is too large, it can cause the app to fail because:

* The browser detects that the cookie header is too long.
* The overall size of the request is too large.

If a large amount of user data is required for processing user requests:

* Limit the number and size of user claims for request processing to only what the app requires.
* Use a custom `Microsoft.AspNetCore.Authentication.Cookies.ITicketStore` for the cookie authentication middleware's `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions.SessionStore` to store identity across requests. Preserve large quantities of identity information on the server while only sending a small session identifier key to the client.
