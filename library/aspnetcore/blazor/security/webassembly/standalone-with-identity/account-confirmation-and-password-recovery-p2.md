---
title: "Account confirmation and password recovery in ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/standalone-with-identity/account-confirmation-and-password-recovery.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Account confirmation and password recovery in ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity (part 2 of 3)

## Update seed data code to confirm seeded accounts

In the server project's seed data class (`SeedData.cs`), change the code in the `InitializeAsync` method to confirm the seeded accounts, which avoids requiring email address confirmation for each test run of the solution with one of the accounts:

```diff
- if (appUser is not null && user.RoleList is not null)
- {
-     await userManager.AddToRolesAsync(appUser, user.RoleList);
- }
+ if (appUser is not null)
+ {
+     if (user.RoleList is not null)
+     {
+         await userManager.AddToRolesAsync(appUser, user.RoleList);
+     }
+ 
+     var token = await userManager.GenerateEmailConfirmationTokenAsync(appUser);
+     await userManager.ConfirmEmailAsync(appUser, token);
+ }
```

## Enable account confirmation after a site has users

Enabling account confirmation on a site with users locks out all the existing users. Existing users are locked out because their accounts aren't confirmed. Use one of the following approaches, which are beyond the scope of this article:

* Update the database to mark all existing users as confirmed.
* Batch-send emails with confirmation links to all existing users, which requires each user to confirm their own account.

## Password recovery

Password recovery requires the server app to adopt an email provider in order to send password reset codes to users. Therefore, follow the guidance earlier in this article to adopt an email provider:

* Select and configure an email provider for the server project
* Configure a secret for the email provider's security key
* Implement `IEmailSender` in the server project

Password recovery is a two-step process:

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
            "forgotPassword", new
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
    string[] defaultDetail = [ "An unknown error prevented password reset." ];

    try
    {
        using var result = await httpClient.PostAsJsonAsync(
            "resetPassword", new
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
@page "/forgot-password"
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
            <EditForm Model="Input" FormName="forgot-password" 
                      OnValidSubmit="OnValidSubmitStep1Async" method="post">
                <DataAnnotationsValidator />
                <ValidationSummary class="text-danger" role="alert" />

                <div class="form-floating mb-3">
                    <InputText @bind-Value="Input.Email" 
                        id="Input.Email" class="form-control" 
                        autocomplete="username" aria-required="true" 
                        placeholder="name@example.com" />
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
                        Your password was reset. You may <a href="login">login</a> 
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
                <EditForm Model="Reset" FormName="reset-password" 
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
                        <InputText type="password" @bind-Value="Reset.NewPassword" 
                            id="Reset.NewPassword" class="form-control" 
                            autocomplete="new-password" aria-required="true" 
                            placeholder="password" />
                        <label for="Reset.NewPassword" class="form-label">
                            New Password
                        </label>
                        <ValidationMessage For="() => Reset.NewPassword" 
                            class="text-danger" />
                    </div>
                    <div class="form-floating mb-3">
                        <InputText type="password" 
                            @bind-Value="Reset.ConfirmPassword" 
                            id="Reset.ConfirmPassword" class="form-control" 
                            autocomplete="new-password" aria-required="true" 
                            placeholder="password" />
                        <label for="Reset.ConfirmPassword" class="form-label">
                            Confirm Password
                        </label>
                        <ValidationMessage For="() => Reset.ConfirmPassword" 
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

    [SupplyParameterFromForm(FormName = "forgot-password")]
    private InputModel Input { get; set; } = new();

    [SupplyParameterFromForm(FormName = "reset-password")]
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
        [Display(Name = "Password")]
        public string NewPassword { get; set; } = string.Empty;

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation " +
            "password don't match.")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
```

In the `Login` component (`Components/Identity/Login.razor`) of the client project immediately before the closing `</NotAuthorized>` tag, add a forgot password link to reach the `ForgotPassword` component:

```html
<div>
    <a href="forgot-password">Forgot password</a>
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

## Change all ASP.NET Core Data Protection token lifespans

In the server project, the following code changes Data Protection tokens' timeout period to three hours:

```csharp
builder.Services.Configure<DataProtectionTokenProviderOptions>(options =>
    options.TokenLifespan = TimeSpan.FromHours(3));
```

The built-in Identity user tokens (AspNetCore/src/Identity/Extensions.Core/src/TokenOptions.cs) have a one day timeout.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.
