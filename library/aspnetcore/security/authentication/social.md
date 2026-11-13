---
title: "Using external login providers with Identity in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/social/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# External provider authentication in ASP.NET Core Identity

By Valeriy Novytskyy and Rick Anderson

This article explains how to build an ASP.NET Core app that enables users to sign in using OAuth 2.0 with credentials from external authentication providers.

Facebook, X (formerly Twitter), Google, and Microsoft providers are covered in the following sections and use the starter project created in this article. Other providers are available in third-party packages such as OpenIddict, AspNet.Security.OAuth.Providers and AspNet.Security.OpenId.Providers.

Enabling users to sign in with their existing credentials is convenient for the users and shifts many of the complexities of managing the sign-in process onto a third party.

# Visual Studio

* Select the **ASP.NET Core Web App** template and select **Next**.
* Name the project and select **Next**.
* In the **Authentication type** dropdown, select **Individual Accounts** and select **Create**.

# Visual Studio Code / .NET CLI

* Open a command shell. For Visual Studio Code, you can use the integrated terminal.

* Change directories (`cd`) to a folder for the sample app.

* For Windows, run the following command:

  ```dotnetcli
  dotnet new webapp -o WebApp1 -au Individual -uld
  ```

  For macOS and Linux, run the following command:

  ```dotnetcli
  dotnet new webapp -o WebApp1 -au Individual
  ```

  * The `dotnet new` command uses the `-o|--output` option to create a new Razor Pages project in the `WebApp1` folder.
  * `-au Individual` creates the code for Individual authentication.
  * `-uld` uses LocalDB, a lightweight version of SQL Server Express for Windows. Omit `-uld` to use SQLite, which is the default across all platforms.

  For more information, see `dotnet new <TEMPLATE>`.

---

## Apply migrations

* Run the app and select the **Register** link.
* Enter the email and password for the new account, and then select **Register**.
* Follow the instructions to apply migrations.

## Forward request information with a proxy or load balancer

If the app is deployed behind a proxy server or load balancer, some of the original request information might be forwarded to the app in request headers. This information usually includes the secure request scheme (`https`), host, and client IP address. Apps don't automatically read these request headers to discover and use the original request information.

The scheme is used in link generation that affects the authentication flow with external providers. Losing the secure scheme (`https`) results in the app generating incorrect insecure redirect URLs.

Use forwarded headers middleware to make the original request information available to the app for request processing.

For more information, see Configure ASP.NET Core to work with proxy servers and load balancers.

## Use Secret Manager to store tokens assigned by login providers

Social login providers assign **Application Id** and **Application Secret** tokens during the registration process. The exact token names vary by provider. These tokens represent the credentials that the app uses to access the provider's API. The tokens constitute *user secrets* that can be linked to your app configuration with the help of Secret Manager. User secrets are a more secure alternative to storing the tokens in a configuration file, such as `appsettings.json`.

> **Important:**
> Secret Manager is only for local development and testing. Protect staging and production secrets with the Azure Key Vault configuration provider, which can also be used for local development and testing if you prefer not to use the Secret Manager locally.

For guidance on storing the tokens assigned by each login provider, see Safe storage of app secrets in development.

## Configure login providers

Use the following articles to configure login providers and the app:

* Facebook instructions
* X (formerly Twitter) instructions
* Google instructions
* Microsoft instructions
* Other provider instructions

## Multiple authentication providers

When the app requires multiple providers, chain the provider extension methods on `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*`:

```csharp
builder.Services.AddAuthentication()
    .AddGoogle(options =>
    {
        // Google configuration options
    })
    .AddFacebook(options =>
    {
        // Facebook configuration options
    })
    .AddMicrosoftAccount(options =>
    {
        // Microsoft Account configuration options
    })
    .AddTwitter(options =>
    {
        // X (formerly Twitter) configuration options
    });
```

For detailed configuration guidance on each provider, see their respective articles.

## Optionally set a password

When you register with an external login provider, you don't have a password registered with the app. This alleviates you from creating and remembering a password for the site, but it also makes you completely dependent on the external login provider for site access. If the external login provider is unavailable, you won't be able to sign in to the app.

To create a password and sign in using your email that you set during the sign-in process with external providers:

* Select the **Hello <email alias>** link at the top-right corner to navigate to the **Manage** view:
* Select **Create**:
* Set a valid password, and you can use this credential to sign in with your email address.

## Additional information

* Sign in with Apple Example Integration
* How to customize the login buttons (`dotnet/AspNetCore.Docs` #10563)
* Persist additional data about the user and their access and refresh tokens
* Passkeys (FIDO2/WebAuthn) in ASP.NET Core Identity: A passwordless alternative to social logins introduced in .NET 10.
