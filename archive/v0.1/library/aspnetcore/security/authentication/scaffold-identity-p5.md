---
title: "Scaffold Identity in ASP.NET Core projects (part 5 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/scaffold-identity.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Scaffold Identity in ASP.NET Core projects (part 5 of 5)

## Scaffold Identity into an MVC project with authorization

Install the Microsoft.VisualStudio.Web.CodeGeneration.Design NuGet package.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

---

Run the Identity scaffolder with the following procedures.

# Visual Studio

1. In **Solution Explorer**, right-click the project, and select **Add** > **New Scaffolded Item**.

1. In the left pane of the **Add New Scaffolded Item** dialog, select **Identity**.

1. In the center pane, select **Identity**, and then select **Add**.

1. In the **Add Identity** dialog, select your desired options:

   1. If you have an existing customized layout page for Identity (*_Layout.cshtml*), select the existing page to avoid overwriting your layout with incorrect markup by the scaffolder. For example, select either:

      - *Pages/Shared/_Layout.cshtml* for Razor Pages or Blazor Server projects with existing Razor Pages infrastructure.
      - *Views/Shared/_Layout.cshtml* for MVC projects or Blazor Server projects with existing MVC infrastructure.

   1. Select the plus icon (**+**) and add the database context class, **DbContext class**. You must select at least one file to add your data context.

      - To create a data context, select the plus icon (**+**). Accept the default value or specify a class (for example, `Contoso.Data.ApplicationDbContext` for a company named "Contoso").

      - To create a new user class, select the plus icon (**+**) for **User class** and specify the class (for example, `ContosoUser` for a company named "Contoso").

   1. Select **Add** to run the scaffolder.

# .NET CLI

1. If the ASP.NET Core scaffolder isn't already installed, run the following command to install it now:

   ```dotnetcli
   dotnet tool install -g dotnet-aspnet-codegenerator
   ```

   > **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the '--arch' option.
> For more information, see GitHub dotnet/aspnetcore.docs issue #29262 - _Add '-a arm64' on Apple Silicon_.

1. Add required NuGet package references to the project file (_.csproj_). Run the following commands in the project directory:

   ```dotnetcli
   dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
   dotnet add package Microsoft.EntityFrameworkCore.Design
   dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
   dotnet add package Microsoft.AspNetCore.Identity.UI
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.EntityFrameworkCore.Tools
   ```

1. Run the following command to list the Identity scaffolder options:

   ```dotnetcli
   dotnet aspnet-codegenerator identity -h
   ```

   If you get a scaffolding error, verify the Target Framework Moniker (TFM) matches the NuGet package version in the project file. For example, the following project file contains the version 3.1 for .NET Core and the listed NuGet packages:

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore" Version="3.1.0" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="3.1.0" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.UI" Version="3.1.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="3.1.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="3.1.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="3.1.0" />
    <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="3.1.0" />
  </ItemGroup>

</Project>
```

1. In the project folder, run the Identity scaffolder with the options you want.

   For example, to set up identity with the default UI and the minimum number of files, run the following command. Use the correct fully qualified name for your DB context.

   ```dotnetcli
   dotnet aspnet-codegenerator identity -dc MyApplication.Data.ApplicationDbContext --files "Account.Register;Account.Login"
   ```

   PowerShell uses the semicolon (`;`) as a command separator. When using PowerShell, escape any semicolons in the file list or put the file list in double quotes (`""`). For example:

   ```dotnetcli
   dotnet aspnet-codegenerator identity -dc MyApplication.Data.ApplicationDbContext --files "Account.Register;Account.Login;Account.Logout"
   ```

   If you run the Identity scaffolder without specifying the `--files` flag or the `--useDefaultUI` flag, all the available Identity UI pages are created in the project.

---

## Create full Identity UI source

To maintain full control of the Identity UI, run the Identity scaffolder and select **Override all files**.

## Password <example-value>

If `Microsoft.AspNetCore.Identity.PasswordOptions` are configured in `Startup.ConfigureServices`, the StringLengthAttribute configuration might be required for the `Password` property in scaffolded Identity pages. The `InputModel` and its `Password` properties are located in the following files:

* _Areas/Identity/Pages/Account/Register.cshtml.cs_
* _Areas/Identity/Pages/Account/ResetPassword.cshtml.cs_

## Disable a page

This section describes how to disable the register page, but you can use the same approach to disable any page.

To disable user registration:

1. Scaffold Identity. Include `Account.Register`, `Account.Login`, and `Account.RegisterConfirmation`. For example:

   ```dotnetcli
   dotnet aspnet-codegenerator identity -dc RPauth.Data.ApplicationDbContext --files "Account.Register;Account.Login;Account.RegisterConfirmation"
   ```

1. Update the _Areas/Identity/Pages/Account/Register.cshtml.cs_ file so users can't register from this endpoint:

   ```csharp
public class RegisterModel : PageModel
{
    public IActionResult OnGet()
    {
        return RedirectToPage("Login");
    }

    public IActionResult OnPost()
    {
        return RedirectToPage("Login");
    }
}
```

1. Update the _Areas/Identity/Pages/Account/Register.cshtml_ file to be consistent with the preceding changes:

   ```cshtml
﻿@page
@model RegisterModel
@{
    ViewData["Title"] = "Go to Login";
}

<h1>@ViewData["Title"]</h1>

<li class="nav-item">
    <a class="nav-link text-dark" asp-area="Identity" asp-page="/Account/Login">Login</a>
</li>
```

1. Comment out or remove the registration link from the _Areas/Identity/Pages/Account/Login.cshtml_ file:

   ```cshtml
   @*
   <p>
       <a asp-page="./Register" asp-route-returnUrl="@Model.ReturnUrl">Register as a new user</a>
   </p>
   *@
   ```

1. Update the `Areas/Identity/Pages/Account/RegisterConfirmation` page.

   * Remove the code and links from the _.cshtml_ file.

   * Remove the confirmation code from the `PageModel` implementation:

   ```csharp
   [AllowAnonymous]
   public class RegisterConfirmationModel : PageModel
   {
        public IActionResult OnGet()
        {
            return Page();
        }
   }
   ```

### Use another app to add users

Provide a mechanism to add users outside the web app. Options to add users include:

* A dedicated admin web app
* A console app

The following code outlines one approach for adding users:

* Read the list of users into memory.
* Generate a strong unique password for each user.
* Add the user to the Identity database.
* Notify the user about changing their password.

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        var host = CreateHostBuilder(args).Build();

        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<AppDbCntx>();
                context.Database.Migrate();

                var config = host.Services.GetRequiredService<IConfiguration>();
                var userList = config.GetSection("userList").Get<List<string>>();

                SeedData.Initialize(services, userList).Wait();
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred adding users.");
            }
        }

        host.Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}
```

The following code outlines adding a user:

```csharp

public static async Task Initialize(IServiceProvider serviceProvider,
                                    List<string> userList)
{
    var userManager = serviceProvider.GetService<UserManager<IdentityUser>>();

    foreach (var userName in userList)
    {
        var userPassword = GenerateSecurePassword();
        var userId = await EnsureUser(userManager, userName, userPassword);

        NotifyUser(userName, userPassword);
    }
}

private static async Task<string> EnsureUser(UserManager<IdentityUser> userManager,
                                             string userName, string userPassword)
{
    var user = await userManager.FindByNameAsync(userName);

    if (user == null)
    {
        user = new IdentityUser(userName)
        {
            EmailConfirmed = true
        };
        await userManager.CreateAsync(user, userPassword);
    }

    return user.Id;
}
```

A similar approach can be followed for production scenarios.

## Prevent publish of static Identity assets

To prevent publishing static Identity assets to the web root, see Introduction to Identity on ASP.NET Core.

## Related content

- ASP.NET Core Identity
- Visual Studio Connected Services
