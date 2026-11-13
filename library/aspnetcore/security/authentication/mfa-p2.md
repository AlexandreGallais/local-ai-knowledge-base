---
title: "Multi-factor authentication in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/mfa.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Multi-factor authentication in ASP.NET Core (part 2 of 2)

## Send MFA sign-in requirement to OpenID Connect server

The `acr_values` parameter can be used to pass the `mfa` required value from the client to the server in an authentication request.

> **Note:**
> The `acr_values` parameter needs to be handled on the OpenID Connect server for this approach to work.

### OpenID Connect ASP.NET Core client

The ASP.NET Core Razor Pages OpenID Connect client app uses the `AddOpenIdConnect` method to sign into the OpenID Connect server. The `acr_values` parameter is set with the `mfa` value and sent with the authentication request. The `OpenIdConnectEvents` is used to add this value.

For recommended `acr_values` parameter values, see the IETF Authentication Method Reference Values specification.

```csharp
build.Services.AddAuthentication(options =>
{
	options.DefaultScheme =
		CookieAuthenticationDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme =
		OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect(options =>
{
	options.SignInScheme =
		CookieAuthenticationDefaults.AuthenticationScheme;
	options.Authority = "<OpenID Connect server URL>";
	options.RequireHttpsMetadata = true;
	options.ClientId = "<OpenID Connect client ID>";
	options.ClientSecret = "<example-value>";
	options.ResponseType = "code";
	options.UsePkce = true;	
	options.Scope.Add("profile");
	options.Scope.Add("offline_access");
	options.SaveTokens = true;
	options.AdditionalAuthorizationParameters.Add("acr_values", "mfa");
});
```

### Example: OpenID Connect Duende IdentityServer server

The following example demonstrates OpenID Connect Duende IdentityServer server with ASP.NET Core Identity. On the OpenID Connect server, which is implemented by using ASP.NET Core Identity with Razor Pages, a new page named `ErrorEnable2FA.cshtml` is created.

The page view:

* Displays if the Identity comes from an app that requires MFA, but the user hasn't activated MFA in Identity.
* Informs the user and adds a link to activate this.

```cshtml
@{
    ViewData["Title"] = "ErrorEnable2FA";
}

<h1>The client application requires you to have MFA enabled. Enable this, try login again.</h1>

<br />

You can enable MFA to login here:

<br />

<a href="~/Identity/Account/Manage/TwoFactorAuthentication">Enable MFA</a>
```

In the `Login` method, the `IIdentityServerInteractionService` interface implementation `_interaction` is used to access the OpenID Connect request parameters. The `acr_values` parameter is accessed by using the `AcrValues` property. Because the client sent this with `mfa` set, this can then be checked.

If MFA is required, and the user in ASP.NET Core Identity is enabled with MFA, the sign-in process continues. When the user has no MFA enabled, the user is redirected to the custom view `ErrorEnable2FA.cshtml`. Then ASP.NET Core Identity signs the user in.

The Fido2Store is used to check if the user activated MFA by using a custom FIDO2 Token Provider.

```csharp
public async Task<IActionResult> OnPost()
{
	// check if we are in the context of an authorization request
	var context = await _interaction.GetAuthorizationContextAsync(Input.ReturnUrl);

	var requires2Fa = context?.AcrValues.Count(t => t.Contains("mfa")) >= 1;

	var user = await _userManager.FindByNameAsync(Input.Username);
	if (user != null && !user.TwoFactorEnabled && requires2Fa)
	{
		return RedirectToPage("/Home/ErrorEnable2FA/Index");
	}

	// code omitted for brevity

	if (ModelState.IsValid)
	{
		var result = await _signInManager.PasswordSignInAsync(Input.Username, Input.Password, Input.RememberLogin, lockoutOnFailure: true);
		if (result.Succeeded)
		{
			// code omitted for brevity
		}
		if (result.RequiresTwoFactor)
		{
			var fido2ItemExistsForUser = await _fido2Store.GetCredentialsByUserNameAsync(user.UserName);
			if (fido2ItemExistsForUser.Count > 0)
			{
				return RedirectToPage("/Account/LoginFido2Mfa", new { area = "Identity", Input.ReturnUrl, Input.RememberLogin });
			}

			return RedirectToPage("/Account/LoginWith2fa", new { area = "Identity", Input.ReturnUrl, RememberMe = Input.RememberLogin });
		}
		
		await _events.RaiseAsync(new UserLoginFailureEvent(Input.Username, "invalid credentials", clientId: context?.Client.ClientId));
		ModelState.AddModelError(string.Empty, LoginOptions.InvalidCredentialsErrorMessage);
	}

	// something went wrong, show form with error
	await BuildModelAsync(Input.ReturnUrl);
	return Page();
}
```

If the user is already signed in, the client app:

* Still validates the `amr` claim.
* Can set up the MFA with a link to the ASP.NET Core Identity view, such as **Enable MFA**:

## Force ASP.NET Core OpenID Connect client to require MFA

This example shows how an ASP.NET Core Razor Page app, which uses OpenID Connect to sign in, can require users are authenticated by using MFA.

To validate the MFA requirement, an `IAuthorizationRequirement` requirement is created. The requirement is added to the pages by using a policy that requires MFA.

```csharp
using Microsoft.AspNetCore.Authorization;
 
namespace AspNetCoreRequireMfaOidc;

public class RequireMfa : IAuthorizationRequirement{}

```

An `AuthorizationHandler` is implemented to use the `amr` claim and check for the value `mfa`. The `amr` is returned in the `id_token` of a successful authentication and can have many different values, as defined in the IETF Authentication Method Reference Values specification.

The returned value depends on how the identity authenticated and on the OpenID Connect server implementation.

The `AuthorizationHandler` uses the `RequireMfa` requirement and validates the `amr` claim. The OpenID Connect server can be implemented by using Duende Identity Server with ASP.NET Core Identity. When a user signs in by using TOTP, the `amr` claim is returned with an MFA value. If you use a different OpenID Connect server implementation or a different MFA type, the `amr` claim can have a different value. The code must be extended to accept the other possible values.

```csharp
public class RequireMfaHandler : AuthorizationHandler<RequireMfa>
{
	protected override Task HandleRequirementAsync(
		AuthorizationHandlerContext context, 
		RequireMfa requirement)
	{
		if (context == null)
			throw new ArgumentNullException(nameof(context));
		if (requirement == null)
			throw new ArgumentNullException(nameof(requirement));

		var amrClaim =
			context.User.Claims.FirstOrDefault(t => t.Type == "amr");

		if (amrClaim != null && amrClaim.Value == Amr.Mfa)
		{
			context.Succeed(requirement);
		}

		return Task.CompletedTask;
	}
}
```

In the program file, the `AddOpenIdConnect` method is used as the default challenge scheme. The authorization handler, which is used to check the `amr` claim, is added to the Inversion of Control container. A policy is then created which adds the `RequireMfa` requirement.

```csharp
builder.Services.ConfigureApplicationCookie(options =>
        options.Cookie.SecurePolicy =
            CookieSecurePolicy.Always);

builder.Services.AddSingleton<IAuthorizationHandler, RequireMfaHandler>();

builder.Services.AddAuthentication(options =>
{
	options.DefaultScheme =
		CookieAuthenticationDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme =
		OpenIdConnectDefaults.AuthenticationScheme;
})
.AddCookie()
.AddOpenIdConnect(options =>
{
	options.SignInScheme =
		CookieAuthenticationDefaults.AuthenticationScheme;
	options.Authority = "https://localhost:44352";
	options.RequireHttpsMetadata = true;
	options.ClientId = "AspNetCoreRequireMfaOidc";
	options.ClientSecret = "<example-value>";
	options.ResponseType = "code";
	options.UsePkce = true;	
	options.Scope.Add("profile");
	options.Scope.Add("offline_access");
	options.SaveTokens = true;
});

builder.Services.AddAuthorization(options =>
{
	options.AddPolicy("RequireMfa", policyIsAdminRequirement =>
	{
		policyIsAdminRequirement.Requirements.Add(new RequireMfa());
	});
});

builder.Services.AddRazorPages();
```

The policy is then used in the Razor page as required. The policy can also be added globally for the entire app.

```csharp
[Authorize(Policy= "RequireMfa")]
public class IndexModel : PageModel
{
    public void OnGet()
    {
    }
}
```

If the user authenticates without MFA, the `amr` claim probably has a `pwd` (password) value. As a result, the request isn't authorized to access the page. Using the default values, the user is redirected to the **Account** > **AccessDenied** page. This behavior can be changed or you can implement your own custom logic. In this example, a link is added so the valid user can set up MFA for their account.

```cshtml
@page
@model AspNetCoreRequireMfaOidc.AccessDeniedModel
@{
    ViewData["Title"] = "AccessDenied";
    Layout = "~/Pages/Shared/_Layout.cshtml";
}

<h1>AccessDenied</h1>

You require MFA to login here

<a href="https://localhost:44352/Manage/TwoFactorAuthentication">Enable MFA</a>
```

After this change, only users that authenticate with MFA can access the page or website. If different MFA types are used, or if 2FA is permitted, the `amr` claim has different values and needs to be processed correctly. Different OpenID Connect servers also return different values for this claim. These values might not follow the IETF Authentication Method Reference Values specification.

When the user signs in without MFA (for example, by using only a password):

* The `amr` claim has the `pwd` password value:

* Access is denied:

Alternatively, when the user signs in by using OTP with Identity, the `amr` claim has the `mfa` value:

### OIDC and OAuth parameter customization

The OAuth and OIDC authentication handlers `Microsoft.AspNetCore.Authentication.OAuth.OAuthOptions.AdditionalAuthorizationParameters` option allows customization of authorization message parameters that are commonly included as part of the redirect query string:

```csharp
builder.Services.AddAuthentication().AddOpenIdConnect(options =>
{
    options.AdditionalAuthorizationParameters.Add("prompt", "login");
    options.AdditionalAuthorizationParameters.Add("audience", "https://api.example.com");
});
```
## Related content

* Enable QR Code generation for TOTP authenticator apps in ASP.NET Core
* Authentication methods in Microsoft Entra ID - passkeys (FIDO2)
* FIDO2 .NET library for FIDO2 / WebAuthn attestation and assertion with .NET (GitHub)
* WebAuthn and Passkeys Awesome (GitHub)
