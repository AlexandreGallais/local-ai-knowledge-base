---
title: "Account confirmation and password recovery in ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/standalone-with-identity/account-confirmation-and-password-recovery.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Account confirmation and password recovery in ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity

-->
-->

This article explains how to configure an ASP.NET Core Blazor WebAssembly app with ASP.NET Core Identity with email confirmation and password recovery.

> **Note:**
> This article only applies standalone Blazor WebAssembly apps with ASP.NET Core Identity. To implement email confirmation and password recovery for Blazor Web Apps, see Account confirmation and password recovery in ASP.NET Core Blazor.

## Namespaces and article code examples

The namespaces used by the examples in this article are:

* `Backend` for the backend server web API project ("server project" in this article).
* `BlazorWasmAuth` for the front-end client standalone Blazor WebAssembly app ("client project" in this article).

These namespaces correspond to the projects in the `BlazorWebAssemblyStandaloneWithIdentity` sample solution in the `dotnet/blazor-samples` GitHub repository. For more information, see Secure ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity.

If you aren't using the `BlazorWebAssemblyStandaloneWithIdentity` sample solution, change the namespaces in the code examples to use the namespaces of your projects.

## Select and configure an email provider for the server project

In this article, Mailchimp's Transactional API is used via Mandrill.net to send email. We recommend using an email service to send email rather than SMTP. SMTP is difficult to configure and secure properly. Whichever email service you use, access their guidance for .NET apps, create an account, configure an API key for their service, and install any NuGet packages required.

In the server project, create a class to hold the secret email provider API key. The example in this article uses a class named `AuthMessageSenderOptions` with an `EmailAuthKey` property to hold the key.

`AuthMessageSenderOptions.cs`:

```csharp
namespace Backend;

public class AuthMessageSenderOptions
{
    public string? EmailAuthKey { get; set; }
}
```

Register the `AuthMessageSenderOptions` configuration instance in the server project's `Program` file:

```csharp
builder.Services.Configure<AuthMessageSenderOptions>(builder.Configuration);
```

## Configure a secret for the email provider's security key

Receive the email provider's security key from the provider and use it in the following guidance.

Use either or both of the following approaches to supply the secret to the app:

* Secret Manager tool: The Secret Manager tool stores private data on the local machine and is only used during local development.
* Azure Key Vault: You can store the secret in a key vault for use in any environment, including for the `Development` environment when working locally. Some developers prefer to use key vaults for staging and production deployments and use the Secret Manager tool for local development.

We strongly recommend that you avoid storing secrets in project code or configuration files. Use secure authentication flows, such as either or both of the approaches in this section.

## Secret Manager Tool

If the server project has already been initialized for the Secret Manager tool, it will already have a user secrets identifier (`<UserSecretsId>`) in its project file (`.csproj`). In Visual Studio, you can tell if the user secrets ID is present by looking at the **Properties** panel when the project is selected in **Solution Explorer**. If the app hasn't been initialized, execute the following command in a command shell opened to the server project's directory. In Visual Studio, you can use the Developer PowerShell command prompt (use the `cd` command to change the directory to the server project after you open the command shell).

```dotnetcli
dotnet user-secrets init
```

Set the API key with the Secret Manager tool. In the following example, the key name is `EmailAuthKey` to match `AuthMessageSenderOptions.EmailAuthKey`, and the key is represented by the `{KEY}` placeholder. Execute the following command with the API key:

```dotnetcli
dotnet user-secrets set "EmailAuthKey" "{KEY}"
```

If using Visual Studio, you can confirm the secret is set by right-clicking the server project in **Solution Explorer** and selecting **Manage User Secrets**.

For more information, see Safe storage of app secrets in development.

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the Secret Manager tool is recommended for securing sensitive data. For more information, see Securely maintain sensitive data and credentials.

### Azure Key Vault

Azure Key Vault provides a safe approach for providing the app's client secret to the app.

To create a key vault and set a secret, see About Azure Key Vault secrets (Azure documentation), which cross-links resources to get started with Azure Key Vault. To implement the code in this section, record the key vault URI and the secret name from Azure when you create the key vault and secret. When you set the access policy for the secret in the **Access policies** panel:

* Only the **Get** secret permission is required.
* Select the application as the **Principal** for the secret.

Confirm in the Azure or Entra portal that the app has been granted access to the secret that you created for the email provider key.

> **Important:**
> A key vault secret is created with an expiration date. Be sure to track when a key vault secret is going to expire and create a new secret for the app prior to that date passing.

If Microsoft Identity packages aren't already part of the app's package registrations, add the following packages to the server project for Azure Identity and Azure Key Vault. These packages are transitively provided by Microsoft Identity Web packages, so you only need to add them if the app isn't referencing `Microsoft.Identity.Web`:

* `Azure.Identity`
* `Azure.Security.KeyVault.Secrets`

Add the following `AzureHelper` class to the server project. The `GetKeyVaultSecret` method retrieves a secret from a key vault. Adjust the namespace (`BlazorSample.Helpers`) to match your project namespace scheme.

`Helpers/AzureHelper.cs`:

```csharp
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

namespace BlazorSample.Helpers;

public static class AzureHelper
{
    public static string GetKeyVaultSecret(string tenantId, string vaultUri, string secretName)
    {
        DefaultAzureCredentialOptions options = new()
        {
            // Specify the tenant ID to use the dev credentials when running the app locally
            // in Visual Studio.
            VisualStudioTenantId = tenantId,
            SharedTokenCacheTenantId = tenantId
        };

        var client = new SecretClient(new Uri(vaultUri), new DefaultAzureCredential(options));
        var secret = client.GetSecretAsync(secretName).Result;

        return secret.Value.Value;
    }
}
```

> **Note:**
> The preceding example uses `Azure.Identity.DefaultAzureCredential` to simplify authentication while developing apps that deploy to Azure by combining credentials used in Azure hosting environments with credentials used in local development. When moving to production, an alternative is a better choice, such as `Azure.Identity.ManagedIdentityCredential`. For more information, see Authenticate Azure-hosted .NET apps to Azure resources using a system-assigned managed identity.

Where services are registered in the server project's `Program` file, obtain and bind the secret with Options configuration:

```csharp
var tenantId = builder.Configuration.GetValue<string>("AzureAd:TenantId")!;
var vaultUri = builder.Configuration.GetValue<string>("AzureAd:VaultUri")!;

var emailAuthKey = AzureHelper.GetKeyVaultSecret(
    tenantId, vaultUri, "EmailAuthKey");

var authMessageSenderOptions = 
    new AuthMessageSenderOptions() { EmailAuthKey = emailAuthKey };
builder.Configuration.GetSection(authMessageSenderOptions.EmailAuthKey)
    .Bind(authMessageSenderOptions);
```

If you wish to control the environment where the preceding code operates, for example to avoid running the code locally because you've opted to use the Secret Manager tool for local development, you can wrap the preceding code in a conditional statement that checks the environment:

```csharp
if (!context.HostingEnvironment.IsDevelopment())
{
    ...
}
```

In the `AzureAd` section, which you may need to add if it isn't already present, of `appsettings.json` in the server project, add the following `TenantId` and `VaultUri` configuration keys and values, if they aren't already present:

```json
"AzureAd": {
  "TenantId": "{TENANT ID}",
  "VaultUri": "{VAULT URI}"
}
```

In the preceding example:

* The `{TENANT ID}` placeholder is the app's tenant ID in Azure.
* The `{VAULT URI}` placeholder is the key vault URI. Include the trailing slash on the URI.

Example:

```json
"TenantId": "00001111-aaaa-2222-bbbb-3333cccc4444",
"VaultUri": "https://contoso.vault.azure.net/"
```

Configuration is used to facilitate supplying dedicated key vaults and secret names based on the app's environmental configuration files. For example, you can supply different configuration values for `appsettings.Development.json` in development, `appsettings.Staging.json` when staging, and `appsettings.Production.json` for the production deployment. For more information, see ASP.NET Core Blazor configuration.

## Implement `IEmailSender` in the server project

The following example is based on Mailchimp's Transactional API using Mandrill.net. For a different provider, refer to their documentation on how to implement sending an email message.

Add the Mandrill.net NuGet package to the server project.

Add the following `EmailSender` class to implement `Microsoft.AspNetCore.Identity.IEmailSender`1`. In the following example, `AppUser` is an `Microsoft.AspNetCore.Identity.IdentityUser`. The message HTML markup can be further customized. As long as the `message` passed to `MandrillMessage` starts with the `<` character, the Mandrill.net API assumes that the message body is composed in HTML.

`EmailSender.cs`:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Mandrill;
using Mandrill.Model;

namespace Backend;

public class EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor,
    ILogger<EmailSender> logger) : IEmailSender<AppUser>
{
    private readonly ILogger logger = logger;

    public AuthMessageSenderOptions Options { get; } = optionsAccessor.Value;

    public Task SendConfirmationLinkAsync(AppUser user, string email,
        string confirmationLink) => SendEmailAsync(email, "Confirm your email",
        "<html lang=\"en\"><head></head><body>Please confirm your account by " +
        $"<a href='{confirmationLink}'>clicking here</a>.</body></html>");

    public Task SendPasswordResetLinkAsync(AppUser user, string email,
        string resetLink) => SendEmailAsync(email, "Reset your password",
        "<html lang=\"en\"><head></head><body>Please reset your password by " +
        $"<a href='{resetLink}'>clicking here</a>.</body></html>");

    public Task SendPasswordResetCodeAsync(AppUser user, string email,
        string resetCode) => SendEmailAsync(email, "Reset your password",
        "<html lang=\"en\"><head></head><body>Please reset your password " +
        $"using the following code:<br>{resetCode}</body></html>");

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        if (string.IsNullOrEmpty(Options.EmailAuthKey))
        {
            throw new Exception("Null EmailAuthKey");
        }

        await Execute(Options.EmailAuthKey, subject, message, toEmail);
    }

    public async Task Execute(string apiKey, string subject, string message, 
        string toEmail)
    {
        var api = new MandrillApi(apiKey);
        var mandrillMessage = new MandrillMessage("sarah@contoso.com", toEmail, 
            subject, message);
        await api.Messages.SendAsync(mandrillMessage);

        logger.LogInformation("Email to {EmailAddress} sent!", toEmail);
    }
}
```

> **Note:**
> Body content for messages might require special encoding for the email service provider. If links in the message body can't be followed in the email message, consult the service provider's documentation to troubleshoot the problem.

Add the following `Microsoft.AspNetCore.Identity.IEmailSender`1` service registration to the server project's `Program` file:

```csharp
builder.Services.AddTransient<IEmailSender<AppUser>, EmailSender>();
```

## Configure the server project to require email confirmation

In the server project's `Program` file, require a confirmed email address to sign in to the app.

Locate the line that calls `Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentityCore*` and set the `Microsoft.AspNetCore.Identity.SignInOptions.RequireConfirmedEmail` property to `true`:

```diff
- builder.Services.AddIdentityCore<AppUser>()
+ builder.Services.AddIdentityCore<AppUser>(o => o.SignIn.RequireConfirmedEmail = true)
```

## Update the client project's account registration response

In the client project's `Register` component (`Components/Identity/Register.razor`), change the message to users on a successful account registration to instruct them to confirm their account. The following example includes a link to trigger Identity on the server to resend the confirmation email.

```diff
- You successfully registered and can <a href="login">login</a> to the app.
+ You successfully registered. You must now confirm your account by clicking 
+ the link in the email that was sent to you. After confirming your account, 
+ you can <a href="login">login</a> to the app. 
+ <a href="resendConfirmationEmail">Resend confirmation email</a>
```
