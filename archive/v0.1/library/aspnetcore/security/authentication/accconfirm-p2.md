---
title: "Account confirmation and password recovery (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/accconfirm.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Account confirmation and password recovery (part 2 of 2)

## Resend email confirmation

This section describes the code that supports the email confirmation process and related tasks.

* Start by selecting the **Resend email confirmation** link on the **Login** page.

### Change email and activity timeout

The default inactivity timeout is 14 days. The following code sets the inactivity timeout to five days:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using WebPWrecover.Data;
using WebPWrecover.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddRazorPages();

builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.Configure<AuthMessageSenderOptions>(builder.Configuration);

builder.Services.ConfigureApplicationCookie(o => {
    o.ExpireTimeSpan = TimeSpan.FromDays(5);
    o.SlidingExpiration = true;
});

var app = builder.Build();

// Code removed for brevity
```

### Change all data protection token <example-value>

The following code changes the timeout period for all data protection tokens to three hours:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using WebPWrecover.Data;
using WebPWrecover.Services;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddRazorPages();

builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.Configure<AuthMessageSenderOptions>(builder.Configuration);

builder.Services.Configure<DataProtectionTokenProviderOptions>(o =>
       o.TokenLifespan = TimeSpan.FromHours(3));

var app = builder.Build();

// Code removed for brevity.
```

The built-in Identity user tokens (see the AspNetCore/src/Identity/Extensions.Core/src/TokenOptions.cs source) have a one day timeout.

### Change the email token <example-value>

The default token <example-value> of the Identity user tokens is one day.

The following code shows how to change the email token lifespan.

Add a custom `Microsoft.AspNetCore.Identity.DataProtectorTokenProvider`1` class and `Microsoft.AspNetCore.Identity.DataProtectionTokenProviderOptions` class:

```csharp
public class CustomEmailConfirmationTokenProvider<TUser>
                              :  DataProtectorTokenProvider<TUser> where TUser : class
{
    public CustomEmailConfirmationTokenProvider(
        IDataProtectionProvider dataProtectionProvider,
        IOptions<EmailConfirmationTokenProviderOptions> options,
        ILogger<DataProtectorTokenProvider<TUser>> logger)
                                       : base(dataProtectionProvider, options, logger)
    {

    }
}
public class EmailConfirmationTokenProviderOptions : DataProtectionTokenProviderOptions
{
    public EmailConfirmationTokenProviderOptions()
    {
        Name = "<example-value>";
        TokenLifespan = TimeSpan.FromHours(4);
    }
}
```

Add the custom provider to the service container:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using WebPWrecover.Data;
using WebPWrecover.Services;
using WebPWrecover.TokenProviders;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(config =>
{
    config.SignIn.RequireConfirmedEmail = true;
    config.Tokens.ProviderMap.Add("<example-value>",
        new TokenProviderDescriptor(
            typeof(CustomEmailConfirmationTokenProvider<IdentityUser>)));
    config.Tokens.EmailConfirmationTokenProvider = "<example-value>";
}).AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddTransient<CustomEmailConfirmationTokenProvider<IdentityUser>>();

builder.Services.AddRazorPages();

builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.Configure<AuthMessageSenderOptions>(builder.Configuration);

var app = builder.Build();

// Code removed for brevity.
```

### Debug email

If the email process isn't working as expected, try these troubleshooting steps:

* Set a breakpoint in the `EmailSender.Execute` method and verify the `SendGridClient.SendEmailAsync` method is called.

* Create a console app to send email by using similar code to `EmailSender.Execute`.

* Review the Email Activity page.

* Check your spam folder.

* Try another email alias on a different email provider, such as Microsoft, Yahoo, Gmail, and so on.

* Try sending to different email accounts.

> **Tip:**
> **A security best practice** is to **not** use production secrets in test and development. If you publish the app to Azure, set the SendGrid secrets as application settings in the Azure Web App portal. The configuration system is set up to read keys from environment variables.

## Combine social and local login accounts

To complete this section, you must first enable an external authentication provider. For more information, see Using external login providers with Identity in ASP.NET Core.

In this sequence, the email address `user@example.com` is first created as a local login. However, you can create the account as a social login first, and then add a local login.

1. To combine local and social accounts, select the email address link.

1. In the **Manage your account** page, select the **Manage** link.

   Notice there are currently zero (0) external (social logins) associated with the authenticated account.

1. In the **Manage your external logins** page, select the link to another login service. Follow the service prompts and accept the app requests.

   In the following image, Facebook is added as an external authentication provider:

Authentication for the user email address now combines local and external (social) accounts. The user can sign in with either account.

> **Tip:**
> It's a good practice to recommend your users to add a local account to your app. This approach can help ensure continued access in case their social login authentication service is down, or they lose access to their social account.

## Enable account confirmation after a site has users

If you enable account confirmation on a site with existing users, you lock them out because their accounts aren't confirmed.

To work around the issue of existing user lockout, use one of the following approaches:

* Update the database to mark all existing users as confirmed.

* Confirm existing users. For example, batch-send emails with confirmation links.

## Related content

* Razor Pages in ASP.NET Core
* Authentication
* Entity Framework Core
