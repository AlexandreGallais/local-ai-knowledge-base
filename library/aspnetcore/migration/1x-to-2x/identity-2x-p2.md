---
title: "Migrate authentication and Identity to ASP.NET Core 2.0 (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/migration/1x-to-2x/identity-2x.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Migrate authentication and Identity to ASP.NET Core 2.0 (part 2 of 2)

## IdentityCookieOptions instances

A side effect of the 2.0 changes is the switch to using named options instead of cookie options instances. The ability to customize the Identity cookie scheme names is removed.

For example, 1.x projects use constructor injection to pass an `IdentityCookieOptions` parameter into `AccountController.cs` and `ManageController.cs`. The external cookie authentication scheme is accessed from the provided instance:

```csharp
public AccountController(
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager,
    IOptions<IdentityCookieOptions> identityCookieOptions,
    IEmailSender emailSender,
    ISmsSender smsSender,
    ILoggerFactory loggerFactory)
{
    _userManager = userManager;
    _signInManager = signInManager;
    _externalCookieScheme = identityCookieOptions.Value.ExternalCookieAuthenticationScheme;
    _emailSender = emailSender;
    _smsSender = smsSender;
    _logger = loggerFactory.CreateLogger<AccountController>();
}
```

The aforementioned constructor injection becomes unnecessary in 2.0 projects, and the `_externalCookieScheme` field can be deleted:

```csharp
public AccountController(
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager,
    IEmailSender emailSender,
    ISmsSender smsSender,
    ILoggerFactory loggerFactory)
{
    _userManager = userManager;
    _signInManager = signInManager;
    _emailSender = emailSender;
    _smsSender = smsSender;
    _logger = loggerFactory.CreateLogger<AccountController>();
}
```

1.x projects used the `_externalCookieScheme` field as follows:

```csharp
// Clear the existing external cookie to ensure a clean login process
await HttpContext.Authentication.SignOutAsync(_externalCookieScheme);
```

In 2.0 projects, replace the preceding code with the following. The `IdentityConstants.ExternalScheme` constant can be used directly.

```csharp
// Clear the existing external cookie to ensure a clean login process
await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
```

Resolve the newly added `SignOutAsync` call by importing the following namespace:

```csharp
using Microsoft.AspNetCore.Authentication;
```

## Add IdentityUser POCO navigation properties

The Entity Framework (EF) Core navigation properties of the base `IdentityUser` POCO (Plain Old CLR Object) have been removed. If your 1.x project used these properties, manually add them back to the 2.0 project:

```csharp
/// <summary>
/// Navigation property for the roles this user belongs to.
/// </summary>
public virtual ICollection<IdentityUserRole<int>> Roles { get; } = new List<IdentityUserRole<int>>();

/// <summary>
/// Navigation property for the claims this user possesses.
/// </summary>
public virtual ICollection<IdentityUserClaim<int>> Claims { get; } = new List<IdentityUserClaim<int>>();

/// <summary>
/// Navigation property for this users login accounts.
/// </summary>
public virtual ICollection<IdentityUserLogin<int>> Logins { get; } = new List<IdentityUserLogin<int>>();
```

To prevent duplicate foreign keys when running EF Core Migrations, add the following to your `IdentityDbContext` class' `OnModelCreating` method (after the `base.OnModelCreating();` call):

```csharp
protected override void OnModelCreating(ModelBuilder builder)
{
    base.OnModelCreating(builder);
    // Customize the ASP.NET Core Identity model and override the defaults if needed.
    // For example, you can rename the ASP.NET Core Identity table names and more.
    // Add your customizations after calling base.OnModelCreating(builder);

    builder.Entity<ApplicationUser>()
        .HasMany(e => e.Claims)
        .WithOne()
        .HasForeignKey(e => e.UserId)
        .IsRequired()
        .OnDelete(DeleteBehavior.Cascade);

    builder.Entity<ApplicationUser>()
        .HasMany(e => e.Logins)
        .WithOne()
        .HasForeignKey(e => e.UserId)
        .IsRequired()
        .OnDelete(DeleteBehavior.Cascade);

    builder.Entity<ApplicationUser>()
        .HasMany(e => e.Roles)
        .WithOne()
        .HasForeignKey(e => e.UserId)
        .IsRequired()
        .OnDelete(DeleteBehavior.Cascade);
}
```

## Replace GetExternalAuthenticationSchemes

The synchronous method `GetExternalAuthenticationSchemes` was removed in favor of an asynchronous version. 1.x projects have the following code in `Controllers/ManageController.cs`:

```csharp
var otherLogins = _signInManager.GetExternalAuthenticationSchemes().Where(auth => userLogins.All(ul => auth.AuthenticationScheme != ul.LoginProvider)).ToList();
```

This method appears in `Views/Account/Login.cshtml` too:

```cshtml
@{
    var loginProviders = SignInManager.GetExternalAuthenticationSchemes().ToList();
    if (loginProviders.Count == 0)
    {
        <div>
            <p>
                There are no external authentication services configured. See <a href="https://go.microsoft.com/fwlink/?LinkID=532715">this article</a>
                for details on setting up this ASP.NET application to support logging in via external services.
            </p>
        </div>
    }
    else
    {
        <form asp-controller="Account" asp-action="ExternalLogin" asp-route-returnurl="@ViewData["ReturnUrl"]" method="post" class="form-horizontal">
            <div>
                <p>
                    @foreach (var provider in loginProviders)
                    {
                        <button type="submit" class="btn btn-default" name="provider" value="@provider.AuthenticationScheme" title="Log in using your @provider.DisplayName account">@provider.AuthenticationScheme</button>
                    }
                </p>
            </div>
        </form>
    }
}
```

In 2.0 projects, use the `Microsoft.AspNetCore.Identity.SignInManager`1.GetExternalAuthenticationSchemesAsync*` method. The change in `ManageController.cs` resembles the following code:

```csharp
var schemes = await _signInManager.GetExternalAuthenticationSchemesAsync();
var otherLogins = schemes.Where(auth => userLogins.All(ul => auth.Name != ul.LoginProvider)).ToList();
```

In `Login.cshtml`, the `AuthenticationScheme` property accessed in the `foreach` loop changes to `Name`:

```cshtml
@{
    var loginProviders = (await SignInManager.GetExternalAuthenticationSchemesAsync()).ToList();
    if (loginProviders.Count == 0)
    {
        <div>
            <p>
                There are no external authentication services configured. See <a href="https://go.microsoft.com/fwlink/?LinkID=532715">this article</a>
                for details on setting up this ASP.NET application to support logging in via external services.
            </p>
        </div>
    }
    else
    {
        <form asp-controller="Account" asp-action="ExternalLogin" asp-route-returnurl="@ViewData["ReturnUrl"]" method="post" class="form-horizontal">
            <div>
                <p>
                    @foreach (var provider in loginProviders)
                    {
                        <button type="submit" class="btn btn-default" name="provider" value="@provider.Name" title="Log in using your @provider.DisplayName account">@provider.DisplayName</button>
                    }
                </p>
            </div>
        </form>
    }
}
```

## ManageLoginsViewModel property change

A `ManageLoginsViewModel` object is used in the `ManageLogins` action of `ManageController.cs`. In 1.x projects, the object's `OtherLogins` property return type is `IList<AuthenticationDescription>`. This return type requires an import of `Microsoft.AspNetCore.Http.Authentication`:

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Identity;

namespace AspNetCoreDotNetCore1App.Models.ManageViewModels
{
    public class ManageLoginsViewModel
    {
        public IList<UserLoginInfo> CurrentLogins { get; set; }

        public IList<AuthenticationDescription> OtherLogins { get; set; }
    }
}
```

In 2.0 projects, the return type changes to `IList<AuthenticationScheme>`. This new return type requires replacing the `Microsoft.AspNetCore.Http.Authentication` import with a `Microsoft.AspNetCore.Authentication` import.

```csharp
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;

namespace AspNetCoreDotNetCore2App.Models.ManageViewModels
{
    public class ManageLoginsViewModel
    {
        public IList<UserLoginInfo> CurrentLogins { get; set; }

        public IList<AuthenticationScheme> OtherLogins { get; set; }
    }
}
```

## Related content

For more information, see the Discussion for Auth 2.0 issue on GitHub.
