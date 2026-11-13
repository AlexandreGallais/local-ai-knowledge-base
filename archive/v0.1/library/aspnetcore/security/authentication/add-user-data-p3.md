---
title: "Add, download, and delete user data to Identity in an ASP.NET Core project (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/add-user-data.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Add, download, and delete user data to Identity in an ASP.NET Core project (part 3 of 3)

### Update the `Account/Register.cshtml` page

Update the `InputModel` in `Areas/Identity/Pages/Account/Register.cshtml.cs` with the following highlighted code:

```csharp
    public class RegisterModel : PageModel
    {
        private readonly SignInManager<WebApp1User> _signInManager;
        private readonly UserManager<WebApp1User> _userManager;
        private readonly IUserStore<WebApp1User> _userStore;
        private readonly IUserEmailStore<WebApp1User> _emailStore;
        private readonly ILogger<RegisterModel> _logger;
        private readonly IEmailSender _emailSender;

        public RegisterModel(
            UserManager<WebApp1User> userManager,
            IUserStore<WebApp1User> userStore,
            SignInManager<WebApp1User> signInManager,
            ILogger<RegisterModel> logger,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _userStore = userStore;
            _emailStore = GetEmailStore();
            _signInManager = signInManager;
            _logger = logger;
            _emailSender = emailSender;
        }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        [BindProperty]
        public InputModel Input { get; set; }

        // Remaining API warnings omited.
        public string ReturnUrl { get; set; }

        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        public class InputModel
        {
            [Required]
            [DataType(DataType.Text)]
            [Display(Name = "Full name")]
            public string Name { get; set; }

            [Required]
            [Display(Name = "Birth Date")]
            [DataType(DataType.Date)]
            public DateTime DOB { get; set; }

            [Required]
            [EmailAddress]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
            [DataType(DataType.Password)]
            [Display(Name = "<example-value>")]
            public string Password { get; set; }

            [DataType(DataType.Password)]
            [Display(Name = "<example-value>")]
            [Compare("<example-value>", ErrorMessage = "<example-value>")]
            public string ConfirmPassword { get; set; }
        }

        public async Task OnGetAsync(string returnUrl = null)
        {
            ReturnUrl = returnUrl;
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl ??= Url.Content("~/");
            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            if (ModelState.IsValid)
            {
                var user = CreateUser();

                user.Name = Input.Name;
                user.DOB = Input.DOB;

                await _userStore.SetUserNameAsync(user, Input.Email, CancellationToken.None);
                await _emailStore.SetEmailAsync(user, Input.Email, CancellationToken.None);
                var result = await _userManager.CreateAsync(user, Input.Password);

                if (result.Succeeded)
                {
                    _logger.LogInformation("<example-value>");

                    var userId = await _userManager.GetUserIdAsync(user);
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                    var callbackUrl = Url.Page(
                        "/Account/ConfirmEmail",
                        pageHandler: null,
                        values: new { area = "Identity", userId = userId, code = code, returnUrl = returnUrl },
                        protocol: Request.Scheme);

                    await _emailSender.SendEmailAsync(Input.Email, "Confirm your email",
                        $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.");

                    if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    {
                        return RedirectToPage("RegisterConfirmation", new { email = Input.Email, returnUrl = returnUrl });
                    }
                    else
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        return LocalRedirect(returnUrl);
                    }
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            // If we got this far, something failed, redisplay form
            return Page();
        }

        private WebApp1User CreateUser()
        {
            try
            {
                return Activator.CreateInstance<WebApp1User>();
            }
            catch
            {
                throw new InvalidOperationException($"Can't create an instance of '{nameof(WebApp1User)}'. " +
                    $"Ensure that '{nameof(WebApp1User)}' is not an abstract class and has a parameterless constructor, or alternatively " +
                    $"override the register page in /Areas/Identity/Pages/Account/Register.cshtml");
            }
        }

        private IUserEmailStore<WebApp1User> GetEmailStore()
        {
            if (!_userManager.SupportsUserEmail)
            {
                throw new NotSupportedException("The default UI requires a user store with email support.");
            }
            return (IUserEmailStore<WebApp1User>)_userStore;
        }
    }
}
```

Update the `Areas/Identity/Pages/Account/Register.cshtml` with the following highlighted markup:

```cshtml
@page
@model RegisterModel
@{
    ViewData["Title"] = "Register";
}

<h1>@ViewData["Title"]</h1>

<div class="row">
    <div class="col-md-4">
        <form id="registerForm" asp-route-returnUrl="@Model.ReturnUrl" method="post">
            <h2>Create a new account.</h2>
            <hr />
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>

            <div class="form-floating">
                <input asp-for="Input.Name" class="form-control" />
                <label asp-for="Input.Name"></label>
                <span asp-validation-for="Input.Name" class="text-danger"></span>
            </div>
            <div class="form-floating">
                <input asp-for="Input.DOB" class="form-control" />
                <label asp-for="Input.DOB"></label>
                <span asp-validation-for="Input.DOB" class="text-danger"></span>
            </div>

            <div class="form-floating">
                <input asp-for="Input.Email" class="form-control" autocomplete="username" aria-required="true" />
                <label asp-for="Input.Email"></label>
                <span asp-validation-for="Input.Email" class="text-danger"></span>
            </div>
            <div class="form-floating">
                <input asp-for="<example-value>" <example-value>"<example-value>" autocomplete="<example-value>" <example-value>"<example-value>" />
                <label asp-for="<example-value>"></label>
                <span asp-validation-for="<example-value>" <example-value>"<example-value>"></span>
            </div>
            <div class="form-floating">
                <input asp-for="<example-value>" <example-value>"<example-value>" autocomplete="<example-value>" <example-value>"<example-value>" />
                <label asp-for="<example-value>"></label>
                <span asp-validation-for="<example-value>" <example-value>"<example-value>"></span>
            </div>
            <button id="registerSubmit" type="submit" class="w-100 btn btn-lg btn-primary">Register</button>
        </form>
    </div>
    <div class="col-md-6 col-md-offset-2">
        <section>
            <h3>Use another service to register.</h3>
            <hr />
            @{
                if ((Model.ExternalLogins?.Count ?? 0) == 0)
                {
                    <div>
                        <p>
                            There are no external authentication services configured. See this <a href="https://go.microsoft.com/fwlink/?LinkID=532715">article
                            about setting up this ASP.NET application to support logging in via external services</a>.
                        </p>
                    </div>
                }
                else
                {
                    <form id="external-account" asp-page="./ExternalLogin" asp-route-returnUrl="@Model.ReturnUrl" method="post" class="form-horizontal">
                        <div>
                            <p>
                                @foreach (var provider in Model.ExternalLogins!)
                                {
                                    <button type="submit" class="btn btn-primary" name="provider" value="@provider.Name" title="Log in using your @provider.DisplayName account">@provider.DisplayName</button>
                                }
                            </p>
                        </div>
                    </form>
                }
            }
        </section>
    </div>
</div>

@section Scripts {
    <partial name="_ValidationScriptsPartial" />
}
```

Build the project.

### Update the layout

See Layout changes for instructions to add sign-in and sign-out links to every page.

# Visual Studio

In the Visual Studio **Package Manager Console**:

```powershell
Add-Migration CustomUserData
Update-Database
```

# .NET CLI

```dotnetcli
dotnet ef migrations add CustomUserData
dotnet ef database update
```

---

## Test create, view, download, delete custom user data

Test the app:

* Register a new user.
* View the custom user data on the `/Identity/Account/Manage` page.
* Download and view the users personal data from the `/Identity/Account/Manage/PersonalData` page.

## Troubleshooting

If you encounter issues:

| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| Custom fields don't appear in registration form | Forgot to update Register.cshtml | Ensure you've scaffolded and modified `Areas/Identity/Pages/Account/Register.cshtml` |
| Custom data not saving | Forgot to add migration or update database | Run `dotnet ef migrations add CustomUserData` then `dotnet ef database update` |
| Custom fields not in downloaded data | Missing `[PersonalData]` attribute | Add `[PersonalData]` attribute to properties in your user class |
| Build errors after scaffolding | Package version mismatch | Ensure all Identity packages match your target framework version |
