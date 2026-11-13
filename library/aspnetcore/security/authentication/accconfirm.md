---
title: "Account confirmation and password recovery (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/accconfirm.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Account confirmation and password <example-value> in ASP.NET Core

By Rick Anderson, Ponant, and Joe Audette

This tutorial shows how to build an ASP.NET Core app with email confirmation and password reset. This tutorial is **not** a beginning article. You should be familiar with:

* Razor Pages in ASP.NET Core
* Authentication
* Entity Framework Core

For Blazor guidance, which adds to or supersedes the guidance in this article, see the following resources:

* Account confirmation and password <example-value> in ASP.NET Core Blazor
* Account confirmation and password <example-value> in ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity

## Prerequisites

* .NET 6 or later SDK
* Successfully send email from a C# console app by using the SendGrid API (Twilio)

## Create and test a web app with authentication

Run the following commands to create a web app with authentication:

```dotnetcli
dotnet new webapp -au Individual -o WebPWrecover
cd WebPWrecover
dotnet run
```

### Register a user with simulated email confirmation

Run the app, select the **Register** link, and register a user.

After registration completes, you're redirected to the `/Identity/Account/RegisterConfirmation` page, which contains a link to simulate email confirmation.

1. Select the `Click here to confirm your account` link.

1. Select the **Login** link and sign-in with the same credentials.

1. Select the `Hello user@example.com!` link, which redirects to the `/Identity/Account/Manage/PersonalData` page.

1. Select the **Personal data** tab, and then select **Delete**.

The `Click here to confirm your account` link displays because the IEmailSender interface isn't yet implemented and registered with the dependency injection container. For more information, see the RegisterConfirmation source.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### Configure an email provider

In this tutorial, Twilio SendGrid is used to send email. A SendGrid account and key are required to send email. We recommend using SendGrid or another email service to send email rather than SMTP. SMTP is difficult to secure and set up correctly.

The SendGrid account might require adding a Sender.

Create a class to fetch the secure email key. For this sample, create the _Services/AuthMessageSenderOptions.cs_ file:

```csharp
﻿namespace WebPWrecover.Services;

public class AuthMessageSenderOptions
{
    public string? SendGridKey { get; set; }
}
```

#### Configure SendGrid user secrets

Set the `SendGridKey` value with the secret-manager tool. For example:

```dotnetcli
dotnet user-secrets set SendGridKey <key>

Successfully saved SendGridKey to the secret store.
```

On Windows, Secret <example-value> stores keys/value pairs in a _secrets.json_ file in the `%APPDATA%/Microsoft/UserSecrets/<WebAppName-userSecretsId>` directory.

The contents of the _secrets.json_ file aren't encrypted. The following markup shows the _secrets.json_ file. The `SendGridKey` value is removed from the example.

```json
{
  "SendGridKey": "<key <example-value>>"
}
```

For more information, see the Options pattern and Configuration in ASP.NET Core.

### Install SendGrid

This tutorial shows how to add email notifications through SendGrid, but other email providers can be used.

Install the `SendGrid` NuGet package:

# Visual Studio

From the Package Manager Console, enter the following command:

```powershell
Install-Package SendGrid
```

# .NET CLI

From the console, enter the following command:

```dotnetcli
dotnet add package SendGrid
```

---

To register for a free SendGrid account, start sending with a free SendGrid Email API trial.

### Implement IEmailSender

To implement the `IEmailSender` interface, create the _Services/EmailSender.cs_ file with code similar to the following example:

```csharp
﻿using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace WebPWrecover.Services;

public class EmailSender : IEmailSender
{
    private readonly ILogger _logger;

    public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor,
                       ILogger<EmailSender> logger)
    {
        Options = optionsAccessor.Value;
        _logger = logger;
    }

    public AuthMessageSenderOptions Options { get; } //Set with Secret Manager.

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        if (string.IsNullOrEmpty(Options.SendGridKey))
        {
            throw new Exception("Null SendGridKey");
        }
        await Execute(Options.SendGridKey, subject, message, toEmail);
    }

    public async Task Execute(string apiKey, string subject, string message, string toEmail)
    {
        var client = new SendGridClient(apiKey);
        var msg = new SendGridMessage()
        {
            From = new EmailAddress("<example-value>", "<example-value>"),
            Subject = subject,
            PlainTextContent = message,
            HtmlContent = message
        };
        msg.AddTo(new EmailAddress(toEmail));

        // Disable click tracking.
        // See https://sendgrid.com/docs/User_Guide/Settings/tracking.html
        msg.SetClickTracking(false, false);
        var response = await client.SendEmailAsync(msg);
        _logger.LogInformation(response.IsSuccessStatusCode 
                               ? $"Email to {toEmail} queued successfully!"
                               : $"Failure Email to {toEmail}");
    }
}
```

### Configure the app to support email

Add the following code to the _Program.cs_ file, which performs the following tasks:

* Adds the `EmailSender` instance as a transient service.
* Registers the `AuthMessageSenderOptions` configuration instance.

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
builder.Services.Configure<AuthMessageSenderOptions>(options =>
{
    options.SendGridKey = builder.Configuration["SendGridKey"];
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

### Disable default account verification when Account.RegisterConfirmation is scaffolded

If `Account.RegisterConfirmation` is scaffolded, complete the instructions in this section.

> **Important:**
> If `Account.RegisterConfirmation` is **not** scaffolded, skip the following instructions and continue to the next section.

The user is redirected to the `/Identity/Account/RegisterConfirmation` page where they can select a link to have the account confirmed. The default `Account.RegisterConfirmation` is used ***only*** for testing. Automatic account verification should be disabled in a production app.

To require a confirmed account and prevent immediate sign in at registration, set `DisplayConfirmAccountLink = false` in the scaffolded _/Areas/Identity/Pages/Account/RegisterConfirmation.cshtml.cs_ file:

```csharp
﻿// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;

namespace WebPWrecover.Areas.Identity.Pages.Account
{
    [AllowAnonymous]
    public class RegisterConfirmationModel : PageModel
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IEmailSender _sender;

        public RegisterConfirmationModel(UserManager<IdentityUser> userManager, IEmailSender sender)
        {
            _userManager = userManager;
            _sender = sender;
        }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        public bool DisplayConfirmAccountLink { get; set; }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        public string EmailConfirmationUrl { get; set; }

        public async Task<IActionResult> OnGetAsync(string email, string returnUrl = null)
        {
            if (email == null)
            {
                return RedirectToPage("/Index");
            }
            returnUrl = returnUrl ?? Url.Content("~/");

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound($"Unable to load user with email '{email}'.");
            }

            Email = email;
            // Once you add a real email sender, you should remove this code that lets you confirm the account
            DisplayConfirmAccountLink = false;
            if (DisplayConfirmAccountLink)
            {
                var userId = await _userManager.GetUserIdAsync(user);
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                EmailConfirmationUrl = Url.Page(
                    "/Account/ConfirmEmail",
                    pageHandler: null,
                    values: new { area = "Identity", userId = userId, code = code, returnUrl = returnUrl },
                    protocol: Request.Scheme);
            }

            return Page();
        }
    }
}
```

This step is necessary only when `Account.RegisterConfirmation` is scaffolded.

The non-scaffolded RegisterConfirmation automatically detects when an IEmailSender is implemented and registered with the dependency injection container.

## Register, confirm email, and reset password

Run the web app, and test the account confirmation and password <example-value> flow.

1. Run the app and register a new user.

1. Check your email for the account confirmation link. If you don't receive the email, see the Debug email section for troubleshooting.

1. Select the link and confirm your email.

1. Sign in with your email and password.

1. Sign out.

### Test password reset

1. If you're signed in, select **Logout**.

1. Select the **Log in** link, and then select the **Forgot your password?** link.

1. Enter the email you used to register the account. The app sends an email with a link to reset your password.

1. Go to the sent email message.

1. Select the link and reset your password.

After your password <example-value> resets, you can sign in with your email and new password.
