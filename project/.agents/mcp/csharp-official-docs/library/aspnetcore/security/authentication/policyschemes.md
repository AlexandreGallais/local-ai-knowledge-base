---
title: "Policy schemes in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/policyschemes.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Policy schemes in ASP.NET Core

Authentication policy schemes make it easier to have a single logical authentication scheme potentially use multiple approaches. For example, a policy scheme might use Google authentication for challenges, and cookie authentication for everything else. Authentication policy schemes make it:

* Easy to forward any authentication action to another scheme.
* Forward dynamically based on the request.

All authentication schemes that use derived `Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions` and the associated `Microsoft.AspNetCore.Authentication.AuthenticationHandler`1`:

* Are automatically policy schemes in ASP.NET Core 2.1 or later.
* Can be enabled via configuring the scheme's options.

```csharp
public class AuthenticationSchemeOptions
{
    /// <summary>
    /// If set, this specifies a default scheme that authentication handlers should 
    /// forward all authentication operations to, by default. The default forwarding 
    /// logic checks in this order:
    /// 1. The most specific ForwardAuthenticate/Challenge/Forbid/SignIn/SignOut 
    /// 2. The ForwardDefaultSelector
    /// 3. ForwardDefault
    /// The first non null result is used as the target scheme to forward to.
    /// </summary>
    public string ForwardDefault { get; set; }

    /// <summary>
    /// If set, this specifies the target scheme that this scheme should forward 
    /// AuthenticateAsync calls to. For example:
    /// Context.AuthenticateAsync("ThisScheme") => 
    ///                Context.AuthenticateAsync("ForwardAuthenticateValue");
    /// Set the target to the current scheme to disable forwarding and allow 
    /// normal processing.
    /// </summary>
    public string ForwardAuthenticate { get; set; }

    /// <summary>
    /// If set, this specifies the target scheme that this scheme should forward 
    /// ChallengeAsync calls to. For example:
    /// Context.ChallengeAsync("ThisScheme") =>
    ///                         Context.ChallengeAsync("ForwardChallengeValue");
    /// Set the target to the current scheme to disable forwarding and allow normal
    /// processing.
    /// </summary>
    public string ForwardChallenge { get; set; }

    /// <summary>
    /// If set, this specifies the target scheme that this scheme should forward 
    /// ForbidAsync calls to.For example:
    /// Context.ForbidAsync("ThisScheme") 
    ///                               => Context.ForbidAsync("ForwardForbidValue");
    /// Set the target to the current scheme to disable forwarding and allow normal 
    /// processing.
    /// </summary>
    public string ForwardForbid { get; set; }

    /// <summary>
    /// If set, this specifies the target scheme that this scheme should forward 
    /// SignInAsync calls to. For example:
    /// Context.SignInAsync("ThisScheme") => 
    ///                                Context.SignInAsync("ForwardSignInValue");
    /// Set the target to the current scheme to disable forwarding and allow normal 
    /// processing.
    /// </summary>
    public string ForwardSignIn { get; set; }

    /// <summary>
    /// If set, this specifies the target scheme that this scheme should forward 
    /// SignOutAsync calls to. For example:
    /// Context.SignOutAsync("ThisScheme") => 
    ///                              Context.SignOutAsync("ForwardSignOutValue");
    /// Set the target to the current scheme to disable forwarding and allow normal 
    /// processing.
    /// </summary>
    public string ForwardSignOut { get; set; }

    /// <summary>
    /// Used to select a default scheme for the current request that authentication
    /// handlers should forward all authentication operations to by default. The 
    /// default forwarding checks in this order:
    /// 1. The most specific ForwardAuthenticate/Challenge/Forbid/SignIn/SignOut
    /// 2. The ForwardDefaultSelector
    /// 3. ForwardDefault. 
    /// The first non null result will be used as the target scheme to forward to.
    /// </summary>
    public Func<HttpContext, string> ForwardDefaultSelector { get; set; }
}
```

Framework default forwarding logic checks the following settings:

1. `Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardAuthenticate`
1. `Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardChallenge`
1. `Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardForbid`
1. `Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardSignIn`
1. `Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardSignOut`
1. `Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardDefaultSelector`
1. `Microsoft.AspNetCore.Authentication.AuthenticationSchemeOptions.ForwardDefault`

The first non-`null` result is used as the target scheme for forwarding.

## JWT with multiple schemes

The `Microsoft.AspNetCore.Authentication.AuthenticationBuilder.AddPolicyScheme*` method can define multiple authentication schemes and implement logic to select the appropriate scheme based on token <example-value> (for example, issuer, claims). This approach allows for greater flexibility within a single API.

```csharp
services.AddAuthentication(options =>
{
	options.DefaultScheme = Consts.MY_POLICY_SCHEME;
	options.DefaultChallengeScheme = Consts.MY_POLICY_SCHEME;

})
.AddJwtBearer(Consts.MY_FIRST_SCHEME, options =>
{
	options.Authority = "https://your-authority";
	options.Audience = "https://your-audience";
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateIssuerSigningKey = true,
		ValidAudiences = Configuration.GetSection("ValidAudiences").Get<string[]>(),
		ValidIssuers = Configuration.GetSection("ValidIssuers").Get<string[]>()
	};
})
.AddJwtBearer(Consts.MY_AAD_SCHEME, jwtOptions =>
{
	jwtOptions.Authority = Configuration["AzureAd:Authority"];
	jwtOptions.Audience = Configuration["AzureAd:Audience"]; 
})
.AddPolicyScheme(Consts.MY_POLICY_SCHEME, displayName: null, options =>
{
	options.ForwardDefaultSelector = context =>
	{
		string authorization = context.Request.Headers[HeaderNames.Authorization];
		if (!string.IsNullOrEmpty(authorization) && authorization.StartsWith("Bearer "))
		{
			var token = authorization.Substring("<example-value>".Length).Trim();
			var jwtHandler = new JsonWebTokenHandler();

			if(jwtHandler.CanReadToken(token)) // it's a self contained access token and not encrypted
			{
				var issuer = jwtHandler.ReadJsonWebToken(token).Issuer; //.Equals("<example-value>"))
				if (issuer == Consts.MY_THIRD_PARTY_ISS) // Third party identity provider
				{
					return Consts.MY_THIRD_PARTY_SCHEME;
				}

				if (issuer == Consts.MY_AAD_ISS) // AAD
				{
					return Consts.MY_AAD_SCHEME;
				}
			}
		}

		// We don't know with it is
		return Consts.MY_AAD_SCHEME;
	};
});
```

## Examples

The following example shows a higher level scheme that combines lower level schemes. Google authentication is used for challenges, and cookie authentication is used for everything else:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
       .AddCookie(options => options.ForwardChallenge = "Google")
       .AddGoogle(options => { });
}
```

The following example enables dynamic selection of schemes on a per request basis. That is, how to mix cookies and API authentication:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(options =>
        {
            // For example, can foward any requests that start with /api 
            // to the api scheme.
            options.ForwardDefaultSelector = ctx => 
               ctx.Request.Path.StartsWithSegments("/api") ? "Api" : null;
        })
        .AddYourApiAuth("Api");
}
```
