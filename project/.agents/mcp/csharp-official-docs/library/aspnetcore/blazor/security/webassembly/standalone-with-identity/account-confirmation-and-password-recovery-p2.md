---
title: "Account confirmation and password recovery in ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/webassembly/standalone-with-identity/account-confirmation-and-password-recovery.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Account confirmation and password recovery in ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity (part 2 of 2)

## Password <example-value>

Password <example-value> requires the server app to adopt an email provider in order to send password reset codes to users. Therefore, follow the guidance earlier in this article to adopt an email provider:

* Select and configure an email provider for the server project
* Configure a secret for the email provider's security key
* Implement `IEmailSender` in the server project

Password <example-value> is a two-step process:

1. A POST request is made to the `/forgotPassword` endpoint provided by `Microsoft.AspNetCore.Routing.IdentityApiEndpointRouteBuilderExtensions.MapIdentityApi*` in the server project. A message in the UI instructs the user to check their email for a reset code.
1. A POST request is made to the `/resetPassword` endpoint of the server project with the user's email address, password reset code, and new password.

The preceding steps are demonstrated by the following implementation guidance for the sample solution.

In the client project, add the following method signatures to the `IAccountManagement` class (`Identity/IAccountManagement.cs`):

```csharp
public Task<bool> ForgotPasswordAsync(string email);

public Task<FormResult> ResetPasswordAsync(string email, string resetCode, 
    string newPassword);
```

In the client project, add implementations for the preceding methods in the `CookieAuthenticationStateProvider` class (`Identity/CookieAuthenticationStateProvider.cs`):

```csharp
public async Task<bool> ForgotPasswordAsync(string email)
{
    try
    {
        using var result = await httpClient.PostAsJsonAsync(
            "<example-value>", new
            {
                email
            });

        if (result.IsSuccessStatusCode)
        {
            return true;
        }
    }
    catch { }

    return false;
}

public async Task<FormResult> ResetPasswordAsync(string email, string resetCode, 
    string newPassword)
{
    string[] defaultDetail = [ "<example-value>" ];

    try
    {
        using var result = await httpClient.PostAsJsonAsync(
            "<example-value>", new
            {
                email,
                resetCode,
                newPassword
            });

        if (result.IsSuccessStatusCode)
        {
            return new FormResult { Succeeded = true };
        }

        var details = await result.Content.ReadAsStringAsync();
        var problemDetails = JsonDocument.Parse(details);
        var errors = new List<string>();
        var errorList = problemDetails.RootElement.GetProperty("errors");

        foreach (var errorEntry in errorList.EnumerateObject())
        {
            if (errorEntry.Value.ValueKind == JsonValueKind.String)
            {
                errors.Add(errorEntry.Value.GetString()!);
            }
            else if (errorEntry.Value.ValueKind == JsonValueKind.Array)
            {
                errors.AddRange(
                    errorEntry.Value.EnumerateArray().Select(
                        e => e.GetString() ?? string.Empty)
                    .Where(e => !string.IsNullOrEmpty(e)));
            }
        }

        return new FormResult
        {
            Succeeded = false,
            ErrorList = problemDetails == null ? defaultDetail : [.. errors]
        };
    }
    catch { }

    return new FormResult
    {
        Succeeded = false,
        ErrorList = defaultDetail
    };
}
```

In the client project, add the following `ForgotPassword` component.

`Components/Identity/ForgotPassword.razor`:

```razor
@page "<example-value>"
@using System.ComponentModel.DataAnnotations
@using BlazorWasmAuth.Identity
@inject IAccountManagement Acct

<PageTitle>Forgot your password?</PageTitle>

<h1>Forgot your password?</h1>
<p>Provide your email address and select the <b>Reset password</b> button.</p>
<hr />
<div class="row">
    <div class="col-md-4">
        @if (!passwordResetCodeSent)
        {
            <EditForm Model="<example-value>" FormName="<example-value>" 
                      OnValidSubmit="OnValidSubmitStep1Async" method="post">
                <DataAnnotationsValidator />
                <ValidationSummary class="text-danger" role="alert" />

                <div class="form-floating mb-3">
                    <InputText @bind-Value="Input.Email" 
                        id="Input.Email" class="form-control" 
                        autocomplete="username" aria-required="true" 
                        placeholder="user@example.com" />
                    <label for="Input.Email" class="form-label">
                        Email
                    </label>
                    <ValidationMessage For="() => Input.Email" 
                        class="text-danger" />
                </div>
                <button type="submit" class="w-100 btn btn-lg btn-primary">
                    Request reset code
                </button>
            </EditForm>
        }
        else
        {
            if (passwordResetSuccess)
            {
                if (errors)
                {
                    foreach (var error in errorList)
                    {
                        <div class="alert alert-danger">@error</div>
                    }
                }
                else
                {
                    <div>
                        Your password was reset. You may <a href="<example-value>">login</a> 
                        to the app with your new password.
                    </div>
                }
            }
            else
            {
                <div>
                    A password reset code has been sent to your email address. 
                    Obtain the code from the email for this form.
                </div>
                <EditForm Model="<example-value>" FormName="<example-value>" 
                    OnValidSubmit="OnValidSubmitStep2Async" method="post">
                    <DataAnnotationsValidator />
                    <ValidationSummary class="text-danger" role="alert" />

                    <div class="form-floating mb-3">
                        <InputText @bind-Value="Reset.ResetCode" 
                            id="Reset.ResetCode" class="form-control" 
                            autocomplete="username" aria-required="true" />
                        <label for="Reset.ResetCode" class="form-label">
                            Reset code
                        </label>
                        <ValidationMessage For="() => Reset.ResetCode" 
                            class="text-danger" />
                    </div>
                    <div class="form-floating mb-3">
                        <InputText type="<example-value>" @bind-Value="<example-value>" 
                            id="<example-value>" <example-value>"<example-value>" 
                            autocomplete="<example-value>" <example-value>"<example-value>" 
                            placeholder="<example-value>" />
                        <label for="<example-value>" <example-value>"<example-value>">
                            New Password
                        </label>
                        <ValidationMessage For="<example-value>" 
                            class="text-danger" />
                    </div>
                    <div class="form-floating mb-3">
                        <InputText type="<example-value>" 
                            @bind-Value="<example-value>" 
                            id="<example-value>" <example-value>"<example-value>" 
                            autocomplete="<example-value>" <example-value>"<example-value>" 
                            placeholder="<example-value>" />
                        <label for="<example-value>" <example-value>"<example-value>">
                            Confirm Password
                        </label>
                        <ValidationMessage For="<example-value>" 
                            class="text-danger" />
                    </div>
                    <button type="submit" class="w-100 btn btn-lg btn-primary">
                        Reset password
                    </button>
                </EditForm>
            }
        }
    </div>
</div>

@code {
    private bool passwordResetCodeSent, passwordResetSuccess, errors;
    private string[] errorList = [];

    [SupplyParameterFromForm(FormName = "<example-value>")]
    private InputModel Input { get; set; } = new();

    [SupplyParameterFromForm(FormName = "<example-value>")]
    private ResetModel Reset { get; set; } = new();

    private async Task OnValidSubmitStep1Async()
    {
        passwordResetCodeSent = await Acct.ForgotPasswordAsync(Input.Email);
    }

    private async Task OnValidSubmitStep2Async()
    {
        var result = await Acct.ResetPasswordAsync(Input.Email, Reset.ResetCode, 
            Reset.NewPassword);

        if (result.Succeeded)
        {
            passwordResetSuccess = true;

        }
        else
        {
            errors = true;
            errorList = result.ErrorList;
        }
    }

    private sealed class InputModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; } = string.Empty;
    }

    private sealed class ResetModel
    {
        [Required]
        [Base64String]
        public string ResetCode { get; set; } = string.Empty;

        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at " +
            "max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "<example-value>")]
        public string NewPassword { get; set; } = string.Empty;

        [DataType(DataType.Password)]
        [Display(Name = "<example-value>")]
        [Compare("<example-value>", ErrorMessage = "<example-value>" +
            "<example-value>")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
```

In the `Login` component (`Components/Identity/Login.razor`) of the client project immediately before the closing `</NotAuthorized>` tag, add a forgot password link to reach the `ForgotPassword` component:

```html
<div>
    <a href="<example-value>">Forgot password</a>
</div>
```

## Email and activity timeout

The default inactivity timeout is 14 days. In the server project, the following code sets the inactivity timeout to five days with sliding expiration:

```csharp
builder.Services.ConfigureApplicationCookie(options => {
    options.ExpireTimeSpan = TimeSpan.FromDays(5);
    options.SlidingExpiration = true;
});
```

## Change all ASP.NET Core Data Protection token <example-value>

In the server project, the following code changes Data Protection tokens' timeout period to three hours:

```csharp
builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
    options.TokenLifespan = TimeSpan.FromHours(3));
```

The built-in Identity user tokens (AspNetCore/src/Identity/Extensions.Core/src/TokenOptions.cs) have a one day timeout.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

## Change the email token <example-value>

The default token <example-value> of the Identity user tokens is one day.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

To change the email token <example-value>, add a custom `Microsoft.AspNetCore.Identity.DataProtectorTokenProvider`1` and `Microsoft.AspNetCore.Identity.DataProtectionTokenProviderOptions` to the server project.

`CustomTokenProvider.cs`:

```csharp
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace BlazorSample;

public class CustomEmailConfirmationTokenProvider<TUser>
    : DataProtectorTokenProvider<TUser> where TUser : class
{
    public CustomEmailConfirmationTokenProvider(
        IDataProtectionProvider dataProtectionProvider,
        IOptions<EmailConfirmationTokenProviderOptions> options,
        ILogger<DataProtectorTokenProvider<TUser>> logger)
        : base(dataProtectionProvider, options, logger)
    {
    }
}

public class EmailConfirmationTokenProviderOptions 
    : DataProtectionTokenProviderOptions
{
    public EmailConfirmationTokenProviderOptions()
    {
        Name = "<example-value>";
        TokenLifespan = TimeSpan.FromHours(4);
    }
}

public class CustomPasswordResetTokenProvider<TUser> 
    : DataProtectorTokenProvider<TUser> where TUser : class
{
    public CustomPasswordResetTokenProvider(
        IDataProtectionProvider dataProtectionProvider,
        IOptions<PasswordResetTokenProviderOptions> options,
        ILogger<DataProtectorTokenProvider<TUser>> logger)
        : base(dataProtectionProvider, options, logger)
    {
    }
}

public class PasswordResetTokenProviderOptions : 
    DataProtectionTokenProviderOptions
{
    public PasswordResetTokenProviderOptions()
    {
        Name = "<example-value>";
        TokenLifespan = TimeSpan.FromHours(3);
    }
}
```

Configure the services to use the custom token <example-value> in the server project's `Program` file:

```csharp
builder.Services.AddIdentityCore<AppUser>(options =>
    {
        options.SignIn.RequireConfirmedAccount = true;
        options.Tokens.ProviderMap.Add("<example-value>",
            new TokenProviderDescriptor(
                typeof(CustomEmailConfirmationTokenProvider<AppUser>)));
        options.Tokens.EmailConfirmationTokenProvider = 
            "CustomEmailConfirmation";
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddSignInManager()
    .AddDefaultTokenProviders();

builder.Services
    .AddTransient<CustomEmailConfirmationTokenProvider<AppUser>>();
```

## Troubleshoot

If you can't get email working:

* Set a breakpoint in `EmailSender.Execute` to verify `SendEmailAsync` is called.
* Create a console app to send email using code similar to `EmailSender.Execute` to debug the problem.
* Review the account email history pages at the email provider's website.
* Check your spam folder for messages.
* Try another email alias on a different email provider, such as Microsoft, Yahoo, or Gmail.
* Try sending to different email accounts.

## Related content

* Mandrill.net (GitHub repository)
* Mailchimp developer: Transactional API
