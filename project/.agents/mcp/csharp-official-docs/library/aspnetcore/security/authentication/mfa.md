---
title: "Multi-factor authentication in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/mfa.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Multi-factor authentication in ASP.NET Core

By Damien Bowden

Multi-factor authentication (MFA) is a process in which a user is requested during sign in for more forms of identification. The prompt might request the user to enter a code from a cellphone, use an FIDO2 key, or provide a fingerprint scan. When you require a second form of authentication, security is enhanced. The extra factor isn't easily obtained or duplicated by a cyberattacker.

This article provides an overview of MFA in ASP.NET Core and the recommended authentication flows with examples that show how to:

* Configure MFA for administration pages by using ASP.NET Core Identity.
* Send an MFA sign-in requirement to the OpenID Connect server.
* Force the ASP.NET Core OpenID Connect client to require MFA.

View or download the sample code (how to download).

## MFA versus 2FA

MFA requires at least two or more types of proof for an identity. Proof types can be something you know, something you possess, or biometric validation for the user to authenticate.

Two-factor authentication (2FA) is like a subset of MFA. 2FA requires exactly two types of proof, whereas MFA can require two or _more_ factors to prove the identity.

2FA is supported by default when using ASP.NET Core Identity. To enable or disable 2FA for a specific user, set the `Microsoft.AspNetCore.Identity.IdentityUser`1.TwoFactorEnabled` property. The ASP.NET Core Identity Default UI includes pages for configuring 2FA.

### MFA TOTP (Time-based One-time Password <example-value>)

MFA with TOTP is supported by default when using ASP.NET Core Identity. This approach can be used together with any compliant authenticator app, including:

* Microsoft Authenticator
* Google Authenticator

For implementation details, see Enable QR Code generation for TOTP authenticator apps in ASP.NET Core.

To disable support for MFA TOTP, configure authentication by using the `Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentity*` method instead of the `Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionUIExtensions.AddDefaultIdentity*` method. The `AddDefaultIdentity` method calls the `Microsoft.AspNetCore.Identity.IdentityBuilderExtensions.AddDefaultTokenProviders*` method internally, which registers multiple token <example-value> including one for MFA TOTP. To register only specific token <example-value>, call the `Microsoft.AspNetCore.Identity.IdentityBuilder.AddTokenProvider*` method for each required provider. For more information on available token <example-value>, see the '<example-value>' reference source in the `dotnet/aspnetcore` GitHub repository.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### MFA passkeys/FIDO2 or passwordless

The **passkeys/FIDO2** approach is currently:

* The most secure way to achieve MFA.
* MFA that protects against phishing attacks (also certificate authentication and Windows for business).

ASP.NET Core supports passkeys by using ASP.NET Core Identity. Passkeys/FIDO2 can be used for MFA or passwordless flows. For more information, see Enable Web Authentication API (WebAuthn) passkeys.

Microsoft Entra ID provides support for passkeys/FIDO2 and passwordless flows. For more information, see Authentication methods in Microsoft Entra ID - passkeys (FIDO2).

Other forms of passwordless MFA either don't or might not protect against phishing.

### MFA SMS

MFA with SMS increases security massively compared with password <example-value> (single factor). However, using SMS as a second factor is no longer recommended. Too many known attack vectors exist for this type of implementation.

For more information, see the NIST Digital Identity Guidelines (Special Publication 800-63B).

## Configure MFA for administration pages with ASP.NET Core Identity

You can force MFA on users to enable access to sensitive pages within an ASP.NET Core Identity app. This approach can be useful for apps where different levels of access exist for different identities. For example, users might be able to view the profile data by using a password <example-value> process, but an administrator would be required to use MFA to access the administrative pages.

### Extend the sign-in process with an MFA claim

The example code configuration uses ASP.NET Core with Identity and Razor Pages. The `AddIdentity` method is used instead of `AddDefaultIdentity`, so an `IUserClaimsPrincipalFactory` implementation can be used to add claims to the identity after successful sign in.

> **Warning:**
> This article shows the use of connection strings. When a local database is used for development and testing, database user authentication via the connection string isn't required.
> In production environments, connection strings sometimes include a password for authenticating database access or database operations. A resource owner password <example-value> (ROPC) in a connection string is a security risk that should be avoided in production apps. Production apps should use the most secure authentication flow available.
> For more information on authentication for apps deployed to test or production environments, see ASP.NET Core security topics.

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(
        Configuration.GetConnectionString("DefaultConnection")));
		
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
		options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
	
builder.Services.AddSingleton<IEmailSender, EmailSender>();
builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, 
    AdditionalUserClaimsPrincipalFactory>();
	
builder.Services.AddAuthorization(options =>
    options.AddPolicy("TwoFactorEnabled", x => x.RequireClaim("amr", "mfa")));
	
builder.Services.AddRazorPages();
```

The `AdditionalUserClaimsPrincipalFactory` class adds the `amr` claim (Authentication Methods References claim) to the user claims only after a successful sign in. The claim value is read from the database. The claim is added here because the user should only access the higher protected view if the identity is signed in with MFA. If the database view is read from the database directly instead of using the claim, it's possible to access the view without MFA directly after activating the MFA.

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace IdentityStandaloneMfa
{
    public class AdditionalUserClaimsPrincipalFactory : 
        UserClaimsPrincipalFactory<IdentityUser, IdentityRole>
    {
        public AdditionalUserClaimsPrincipalFactory( 
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager, 
            IOptions<IdentityOptions> optionsAccessor) 
            : base(userManager, roleManager, optionsAccessor)
        {
        }

        public async override Task<ClaimsPrincipal> CreateAsync(IdentityUser user)
        {
            var principal = await base.CreateAsync(user);
            var identity = (ClaimsIdentity)principal.Identity;

            var claims = new List<Claim>();

            if (user.TwoFactorEnabled)
            {
                claims.Add(new Claim("amr", "mfa"));
            }
            else
            {
                claims.Add(new Claim("<example-value>", "<example-value>"));
            }

            identity.AddClaims(claims);
            return principal;
        }
    }
}
```

Because the Identity service setup changed in the `Startup` class, the layouts of the Identity need to be updated:

* Scaffold the Identity pages into the app.
* Define the layout in the _Identity/Account/Manage/\_Layout.cshtml_ file.

   ```cshtml
   @{
      Layout = "/Pages/Shared/_Layout.cshtml";
   }
   ```

* Also, assign the layout for all the manage pages from the Identity pages:

   ```cshtml
   @{
      Layout = "_Layout.cshtml";
   }
   ```

### Validate the MFA requirement in the administration page

The administration Razor Page validates that the user is signed in via MFA. In the `OnGet` method, the identity is used to access the user claims. The `amr` claim is checked for the value `mfa`. If the identity is missing this claim or is `false`, the page redirects to the Enable MFA page. This action is possible because the user is already signed in, but without MFA.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IdentityStandaloneMfa
{
    public class AdminModel : PageModel
    {
        public IActionResult OnGet()
        {
            var claimTwoFactorEnabled = 
                User.Claims.FirstOrDefault(t => t.Type == "amr");

            if (claimTwoFactorEnabled != null && 
                "mfa".Equals(claimTwoFactorEnabled.Value))
            {
                // You logged in with MFA, do the administrative stuff
            }
            else
            {
                return Redirect(
                    "/Identity/Account/Manage/TwoFactorAuthentication");
            }

            return Page();
        }
    }
}
```

### UI logic to toggle user sign-in information

An authorization policy was added at startup. The policy requires the `amr` claim with the value `mfa`:

```csharp
services.AddAuthorization(options =>
    options.AddPolicy("TwoFactorEnabled",
        x => x.RequireClaim("amr", "mfa")));
```

This policy can then be used in the `_Layout` view to show or hide the **Admin** menu with the warning:

```cshtml
@using Microsoft.AspNetCore.Authorization
@using Microsoft.AspNetCore.Identity
@inject SignInManager<IdentityUser> SignInManager
@inject UserManager<IdentityUser> UserManager
@inject IAuthorizationService AuthorizationService
```

If the identity is signed in via MFA, the **Admin** menu displays without the tooltip warning.

When the user is signed in without MFA, the **Admin (Not Enabled)** menu displays along with the tooltip that informs the user (explaining the warning).

```cshtml
@if (SignInManager.IsSignedIn(User))
{
    @if ((AuthorizationService.AuthorizeAsync(User, "TwoFactorEnabled")).Result.Succeeded)
    {
        <li class="nav-item">
            <a class="nav-link text-dark" asp-area="" asp-page="/Admin">Admin</a>
        </li>
    }
    else
    {
        <li class="nav-item">
            <a class="nav-link text-dark" asp-area="" asp-page="/Admin" 
               id="tooltip-demo"  
               data-toggle="tooltip" 
               data-placement="bottom" 
               title="MFA is NOT enabled. This is required for the Admin Page. If you have activated MFA, then logout, login again.">
                Admin (Not Enabled)
            </a>
        </li>
    }
}
```

If the user signs in without MFA, the **Admin** option shows the **(Not Enabled)** warning:

When the user selects the **Admin** option, they're redirected to a view where they can enable MFA:
