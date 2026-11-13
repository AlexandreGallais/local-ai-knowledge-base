---
title: "Configure ASP.NET Core Identity (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/identity-configuration.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure ASP.NET Core Identity

ASP.NET Core Identity uses default values for settings such as password <example-value>, lockout, and cookie configuration. These settings can be overridden at application startup.

## Identity options

The `Microsoft.AspNetCore.Identity.IdentityOptions` class represents the options that can be used to configure the Identity system. `Microsoft.AspNetCore.Identity.IdentityOptions` must be set **after** calling `Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentity*` or `Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionUIExtensions.AddDefaultIdentity*`.

### Claims Identity

`Microsoft.AspNetCore.Identity.IdentityOptions.ClaimsIdentity` specifies the `Microsoft.AspNetCore.Identity.ClaimsIdentityOptions` with the properties shown in the following table.

| Property | Description | Default |
|--|--|:-:|
| `Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.RoleClaimType` | Gets or sets the claim type used for a role claim. | `System.Security.Claims.ClaimTypes.Role` |
| `Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.SecurityStampClaimType` | Gets or sets the claim type used for the security stamp claim. | `AspNet.Identity.SecurityStamp` |
| `Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.UserIdClaimType` | Gets or sets the claim type used for the user identifier claim. | `System.Security.Claims.ClaimTypes.NameIdentifier` |
| `Microsoft.AspNetCore.Identity.ClaimsIdentityOptions.UserNameClaimType` | Gets or sets the claim type used for the user name claim. | `System.Security.Claims.ClaimTypes.Name` |

### Lockout

Lockout is set in the PasswordSignInAsync) method:

```csharp
public async Task<IActionResult> OnPostAsync(string returnUrl = null)
{
    returnUrl ??= Url.Content("~/");

    ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

    if (ModelState.IsValid)
    {
        // This doesn't count login failures towards account lockout
        // To enable password <example-value> to trigger account lockout, set lockoutOnFailure: true
        var result = await _signInManager.PasswordSignInAsync(Input.Email,
             Input.Password, Input.RememberMe,
             lockoutOnFailure: false);
        if (result.Succeeded)
        {
            _logger.LogInformation("User logged in.");
            return LocalRedirect(returnUrl);
        }
        if (result.RequiresTwoFactor)
        {
            return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, RememberMe = Input.RememberMe });
        }
        if (result.IsLockedOut)
        {
            _logger.LogWarning("User account locked out.");
            return RedirectToPage("./Lockout");
        }
        else
        {
            ModelState.AddModelError(string.Empty, "Invalid login attempt.");
            return Page();
        }
    }

    // If we got this far, something failed, redisplay form
    return Page();
}
```

The preceding code is based on the `Login` Identity template.

Lockout options are set in `Program.cs`:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RPauth.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options =>
                                       options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddRazorPages();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Default Lockout settings.
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

The preceding code sets the `Microsoft.AspNetCore.Identity.IdentityOptions` `Microsoft.AspNetCore.Identity.LockoutOptions` with default values.

A successful authentication resets the failed access attempts count and resets the clock.

`Microsoft.AspNetCore.Identity.IdentityOptions.Lockout` specifies the `Microsoft.AspNetCore.Identity.LockoutOptions` with the properties shown in the table.

| Property | Description | Default |
|--|--|:-:|
| `Microsoft.AspNetCore.Identity.LockoutOptions.AllowedForNewUsers` | Determines if a new user can be locked out. | `true` |
| `Microsoft.AspNetCore.Identity.LockoutOptions.DefaultLockoutTimeSpan` | The amount of time a user is locked out when a lockout occurs. | 5 minutes |
| `Microsoft.AspNetCore.Identity.LockoutOptions.MaxFailedAccessAttempts` | The number of failed access attempts until a user is locked out, if lockout is enabled. | 5 |

### Password

By default, Identity requires that passwords contain an uppercase character, lowercase character, a digit, and a non-alphanumeric character. Passwords must be at least six characters long.

Passwords are configured with:

* `Microsoft.AspNetCore.Identity.PasswordOptions` in `Program.cs`.
* `[StringLength]` attributes of `Password` properties if Identity is scaffolded into the app. `InputModel` `Password` properties are found in the following files:
  * `Areas/Identity/Pages/Account/Register.cshtml.cs`
  * `Areas/Identity/Pages/Account/ResetPassword.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RPauth.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options =>
                                options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddRazorPages();

builder.Services.Configure<IdentityOptions>(options =>
{
    // Default Password settings.
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
});

var app = builder.Build();

// Remaining code removed for brevity.
```

`Microsoft.AspNetCore.Identity.IdentityOptions.Password` specifies the `Microsoft.AspNetCore.Identity.PasswordOptions` with the properties shown in the table.

| Property | Description | Default |
|--|--|:-:|
| `Microsoft.AspNetCore.Identity.PasswordOptions.RequireDigit` | Requires a number between 0-9 in the password. | `true` |
| `Microsoft.AspNetCore.Identity.PasswordOptions.RequiredLength` | The minimum length of the password. | 6 |
| `Microsoft.AspNetCore.Identity.PasswordOptions.RequireLowercase` | Requires a lowercase character in the password. | `true` |
| `Microsoft.AspNetCore.Identity.PasswordOptions.RequireNonAlphanumeric` | Requires a non-alphanumeric character in the password. | `true` |
| `Microsoft.AspNetCore.Identity.PasswordOptions.RequiredUniqueChars` | Only applies to ASP.NET Core 2.0 or later. Requires the number of distinct characters in the password. | 1 |
| `Microsoft.AspNetCore.Identity.PasswordOptions.RequireUppercase` | Requires an uppercase character in the password. | `true` |

### Sign-in

The following code sets `SignIn` settings (to default values):

```csharp
builder.Services.Configure<IdentityOptions>(options =>
{
    // Default SignIn settings.
    options.SignIn.RequireConfirmedEmail = false;
    options.SignIn.RequireConfirmedPhoneNumber = false;
});
```

`Microsoft.AspNetCore.Identity.IdentityOptions.SignIn` specifies the `Microsoft.AspNetCore.Identity.SignInOptions` with the properties shown in the table.

| Property | Description | Default |
|--|--|:-:|
| `Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedEmail` | Requires a confirmed email to sign in. | `false` |
| `Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedPhoneNumber` | Requires a confirmed phone number to sign in. | `false` |

### Tokens

`Microsoft.AspNetCore.Identity.IdentityOptions.Tokens` specifies the `Microsoft.AspNetCore.Identity.TokenOptions` with the properties shown in the table.

| Property | Description |
|--|--|
| `Microsoft.AspNetCore.Identity.TokenOptions.AuthenticatorTokenProvider` | Gets or sets the `AuthenticatorTokenProvider` used to validate two-factor sign-ins with an authenticator. |
| `Microsoft.AspNetCore.Identity.TokenOptions.ChangeEmailTokenProvider` | Gets or sets the `ChangeEmailTokenProvider` used to generate tokens used in email change confirmation emails. |
| `Microsoft.AspNetCore.Identity.TokenOptions.ChangePhoneNumberTokenProvider` | Gets or sets the `ChangePhoneNumberTokenProvider` used to generate tokens used when changing phone numbers. |
| `Microsoft.AspNetCore.Identity.TokenOptions.EmailConfirmationTokenProvider` | Gets or sets the token <example-value> used to generate tokens used in account confirmation emails. |
| `Microsoft.AspNetCore.Identity.TokenOptions.PasswordResetTokenProvider` | Gets or sets the `Microsoft.AspNetCore.Identity.IUserTwoFactorTokenProvider`1` used to generate tokens used in password reset emails. |
| `Microsoft.AspNetCore.Identity.TokenOptions.ProviderMap` | Used to construct a User Token <example-value> with the key used as the provider's name. |

### User

```csharp
builder.Services.Configure<IdentityOptions>(options =>
{
    // Default User settings.
    options.User.AllowedUserNameCharacters =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = false;

});
```

`Microsoft.AspNetCore.Identity.IdentityOptions.User` specifies the `Microsoft.AspNetCore.Identity.UserOptions` with the properties shown in the table.

| Property | Description | Default |
|--|--|:-:|
| `Microsoft.AspNetCore.Identity.UserOptions.AllowedUserNameCharacters` | Allowed characters in the username. | abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.\_@+ |
| `Microsoft.AspNetCore.Identity.UserOptions.RequireUniqueEmail` | Requires each user to have a unique email. | `false` |

### Cookie settings

Configure the app's cookie in `Program.cs`. ConfigureApplicationCookie) must be called **after** calling `AddIdentityCore`, `AddIdentity`, or `AddDefaultIdentity`.

```csharp
builder.Services.ConfigureApplicationCookie(options =>
{
    options.AccessDeniedPath = "/Identity/Account/AccessDenied";
    options.Cookie.Name = "YourAppCookieName";
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    options.LoginPath = "/Identity/Account/Login";
    // ReturnUrlParameter requires 
    //using Microsoft.AspNetCore.Authentication.Cookies;
    options.ReturnUrlParameter = CookieAuthenticationDefaults.ReturnUrlParameter;
    options.SlidingExpiration = true;
});
```

For more information, see `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationOptions`.

## Password <example-value> options

`Microsoft.AspNetCore.Identity.PasswordHasherOptions` gets and sets options for password hashing.

| Option | Description |
|--|--|
| `Microsoft.AspNetCore.Identity.PasswordHasherOptions.CompatibilityMode` | The compatibility mode used when hashing new passwords. Defaults to `Microsoft.AspNetCore.Identity.PasswordHasherCompatibilityMode.IdentityV3`. The first byte of a hashed password, called a *format marker*, specifies the version of the hashing algorithm used to hash the password. When verifying a password <example-value> a hash, the `Microsoft.AspNetCore.Identity.PasswordHasher`1.VerifyHashedPassword*` method selects the correct algorithm based on the first byte. A client is able to authenticate regardless of which version of the algorithm was used to hash the password. Setting the compatibility mode affects the hashing of *new passwords*. |
| `Microsoft.AspNetCore.Identity.PasswordHasherOptions.IterationCount` | The number of iterations used when hashing passwords using PBKDF2. This value is only used when the `Microsoft.AspNetCore.Identity.PasswordHasherOptions.CompatibilityMode` is set to `Microsoft.AspNetCore.Identity.PasswordHasherCompatibilityMode.IdentityV3`. The value must be a positive integer and defaults to `100000`. |

In the following example, the `Microsoft.AspNetCore.Identity.PasswordHasherOptions.IterationCount` is set to `12000` in `Program.cs`:

```csharp
// using Microsoft.AspNetCore.Identity;

builder.Services.Configure<PasswordHasherOptions>(option =>
{
    option.IterationCount = 12000;
});
```

## Globally require all users to be authenticated

For guidance, see Require global user authentication.
