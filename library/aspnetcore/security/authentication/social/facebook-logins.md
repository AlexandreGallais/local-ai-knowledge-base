---
title: "Facebook external login setup in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/social/facebook-logins.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Facebook external login setup in ASP.NET Core

By Valeriy Novytskyy and Rick Anderson

This tutorial with code examples shows how to enable your users to sign in with their Facebook account using a sample ASP.NET Core project created on the previous page.

## Create the app in Facebook

* Add the Microsoft.AspNetCore.Authentication.Facebook NuGet package to the project.

* Follow the Facebook App Registration instructions to create a Facebook app and obtain your **App ID** and **App Secret**.

* Follow the Facebook Login for Web instructions to configure Facebook Login for your app. Add your development URI with */signin-facebook* appended (for example: `https://localhost:44320/signin-facebook`) to the **Valid OAuth Redirect URIs**.

  The Facebook authentication configured later in this tutorial automatically handles requests at the */signin-facebook* route to implement the OAuth flow.

> **Note:**
> The URI */signin-facebook* is set as the default callback of the Facebook authentication provider. You can change the default callback URI while configuring the Facebook authentication middleware via the inherited `Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.CallbackPath` property of the `Microsoft.AspNetCore.Authentication.Facebook.FacebookOptions` class.

* Follow the Facebook Login Permissions guide to enable the **email** permission for your app. The ASP.NET Core Facebook authentication middleware requests the `email` scope by default. If the **email** permission isn't enabled on your Facebook app, authentication may fail or the user's email address will be missing after sign-in.

* Make a note of your **App ID** and **App Secret**. You add both into your ASP.NET Core application in the next section.

* When deploying the site, revisit the **Facebook Login** setup page and register a new public URI.

## Store the Facebook app ID and secret

Store sensitive settings such as the Facebook app ID and secret values with Secret Manager. For this sample, use the following steps:

1. Initialize the project for secret storage per the instructions at Enable secret storage.
1. Store the sensitive settings in the local secret store with the secret keys `Authentication:Facebook:AppId` and `Authentication:Facebook:AppSecret`:

    ```dotnetcli
    dotnet user-secrets set "Authentication:Facebook:AppId" "<app-id>"
    dotnet user-secrets set "Authentication:Facebook:AppSecret" "<app-secret>"
    ```

The colon (`:`) separator doesn't work with environment variable hierarchical keys on all platforms. For example, Bash doesn't support colon (`:`) as a separator. All platforms support the double underscore (`__`) syntax and automatically replace it with a colon (`:`).

## Configure Facebook Authentication

Add the Authentication service to the `Program`:

```csharp
var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

services.AddAuthentication().AddFacebook(facebookOptions =>
    {
        facebookOptions.AppId = configuration["Authentication:Facebook:AppId"];
        facebookOptions.AppSecret = configuration["Authentication:Facebook:AppSecret"];
    });
```

The `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.String)` overload sets the `Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme` property. The `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.Action{Microsoft.AspNetCore.Authentication.AuthenticationOptions})` overload allows configuring authentication options, which can be used to set up default authentication schemes for different purposes. Subsequent calls to `AddAuthentication` override previously configured `Microsoft.AspNetCore.Builder.AuthenticationOptions` properties.

`Microsoft.AspNetCore.Authentication.AuthenticationBuilder` extension methods that register an authentication handler may only be called once per authentication scheme. Overloads exist that allow configuring the scheme properties, scheme name, and display name.

## Sign in with Facebook

* Run the app and select **Log in**.
* Under **Use another service to log in.**, select Facebook.
* You are redirected to **Facebook** for authentication.
* Enter your Facebook credentials.
* You are redirected back to your site where you can set your email.

You are now logged in using your Facebook credentials.

## React to cancel authorize external sign-in

`Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.AccessDeniedPath` can provide a redirect path to the user agent when the user doesn't approve the requested authorization demand.

The following code sets the `AccessDeniedPath` to `"/AccessDeniedPathInfo"`:

```csharp
services.AddAuthentication().AddFacebook(options =>
{
    options.AppId = Configuration["Authentication:Facebook:AppId"];
    options.AppSecret = Configuration["Authentication:Facebook:AppSecret"];
    options.AccessDeniedPath = "/AccessDeniedPathInfo";
});
```

We recommend the `AccessDeniedPath` page contains the following information:

* Remote authentication was canceled.
* This app requires authentication.
* To try sign-in again, select the Login link.

### Test AccessDeniedPath

* Navigate to facebook.com
* If you are signed in, you must sign out.
* Run the app and select Facebook sign-in.
* Select **Not now**. You are redirected to the specified `AccessDeniedPath` page.

## Forward request information with a proxy or load balancer

If the app is deployed behind a proxy server or load balancer, some of the original request information might be forwarded to the app in request headers. This information usually includes the secure request scheme (`https`), host, and client IP address. Apps don't automatically read these request headers to discover and use the original request information.

The scheme is used in link generation that affects the authentication flow with external providers. Losing the secure scheme (`https`) results in the app generating incorrect insecure redirect URLs.

Use forwarded headers middleware to make the original request information available to the app for request processing.

For more information, see Configure ASP.NET Core to work with proxy servers and load balancers.

For more information on configuration options supported by Facebook authentication, see the `Microsoft.AspNetCore.Builder.FacebookOptions` API reference. Configuration options can be used to:

* Request different information about the user.
* Add query string arguments to customize the login experience.

## Troubleshooting

* **ASP.NET Core 2.x only:** If Identity isn't configured by calling `services.AddIdentity` in `ConfigureServices`, attempting to authenticate will result in *ArgumentException: The 'SignInScheme' option must be provided*. The project template used in this tutorial ensures that this is done.
* If the site database has not been created by applying the initial migration, you get *A database operation failed while processing the request* error. Tap **Apply Migrations** to create the database and refresh to continue past the error.
* If you receive an error during Facebook sign-in or the user's email address is missing after sign-in, verify that the **email** permission is enabled for your Facebook app. See the Facebook Login Permissions guide for details on enabling permissions in the Facebook Developer portal.

## Next steps

* This article showed how you can authenticate with Facebook. You can follow a similar approach to authenticate with other providers listed on the previous page.

* Once you publish your web site to Azure web app, you should reset the `AppSecret` in the Facebook developer portal.

* Set the `Authentication:Facebook:AppId` and `Authentication:Facebook:AppSecret` as application settings in the Azure portal. The configuration system is set up to read keys from environment variables.

## Related content

Multiple authentication providers
