---
title: "Microsoft Account external login setup with ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/social/microsoft-logins.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Microsoft Account external login setup with ASP.NET Core

By Valeriy Novytskyy and Rick Anderson

This sample shows how to enable users to sign in with their work, school, or personal Microsoft account using the ASP.NET Core  project created on the previous page.

## Create the app in the Microsoft Entra admin center

* Add the Microsoft.AspNetCore.Authentication.MicrosoftAccount NuGet package to the project.
* Register the application in the Microsoft Entra admin center by following the steps in Register an application with the Microsoft identity platform

### Create a client secret

Generate a client secret in the Microsoft Entra admin center by following the steps in Add and manage application credentials in Microsoft Entra ID.

## Store the Microsoft client ID and secret

Store sensitive settings such as the Microsoft **Application (client) ID** and **Client Secret** created in the previous step with Secret Manager. For this sample, use the following steps:

1. Initialize the project for secret <example-value> per the instructions at Enable secret storage.
1. Store the sensitive settings in the local secret store with the secret keys `Authentication:Microsoft:ClientId` and `Authentication:Microsoft:ClientSecret`. The `<client-id>` is listed on the Azure App registrations blade under **Application (client) ID**. The `<client-secret>` is on listed under **Certificates & secrets** as the **Value**, not the **Secret ID**.

    ```dotnetcli
    dotnet user-secrets set "<example-value>" "<example-value>"
    dotnet user-secrets set "<example-value>" "<example-value>"
    ```

The colon (`:`) separator doesn't work with environment variable hierarchical keys on all platforms. For example, Bash doesn't support colon (`:`) as a separator. All platforms support the double underscore (`__`) syntax and automatically replace it with a colon (`:`).

## Configure Microsoft Account Authentication

Add the Authentication service to the `Program`:

```csharp
builder.Services.AddAuthentication().AddMicrosoftAccount(microsoftOptions =>
{
    microsoftOptions.ClientId = configuration["Authentication:Microsoft:ClientId"];
    microsoftOptions.ClientSecret = <example-value>["<example-value>"];
});
```

The `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.String)` overload sets the `Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme` property. The `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.Action{Microsoft.AspNetCore.Authentication.AuthenticationOptions})` overload allows configuring authentication options, which can be used to set up default authentication schemes for different purposes. Subsequent calls to `AddAuthentication` override previously configured `Microsoft.AspNetCore.Builder.AuthenticationOptions` properties.

`Microsoft.AspNetCore.Authentication.AuthenticationBuilder` extension methods that register an authentication handler may only be called once per authentication scheme. Overloads exist that allow configuring the scheme properties, scheme name, and display name.

For more information about configuration options supported by Microsoft Account authentication, see the `Microsoft.AspNetCore.Builder.MicrosoftAccountOptions` API reference. This can be used to request different information about the user.

## Sign in with Microsoft Account

* Run the app and select **Log in**. An option to sign in with Microsoft appears.
* Select to sign in with Microsoft to navigate to Microsoft for authentication. After signing in with your Microsoft Account, you'll be prompted to let the app access your info:
* Select **Yes** to navigate back to the web site where to set your email.

You're now logged in using your Microsoft credentials.

To use multiple authentication providers, see Using external login providers with Identity in ASP.NET Core.

## Forward request information with a proxy or load balancer

If the app is deployed behind a proxy server or load balancer, some of the original request information might be forwarded to the app in request headers. This information usually includes the secure request scheme (`https`), host, and client IP address. Apps don't automatically read these request headers to discover and use the original request information.

The scheme is used in link generation that affects the authentication flow with external providers. Losing the secure scheme (`https`) results in the app generating incorrect insecure redirect URLs.

Use forwarded headers middleware to make the original request information available to the app for request processing.

For more information, see Configure ASP.NET Core to work with proxy servers and load balancers.

## Troubleshooting

* If the Microsoft Account provider redirects to a sign in error page, note the error title and description query string parameters directly following the `#` (hashtag) in the Uri.

  Although the error message seems to indicate a problem with Microsoft authentication, the most common cause is your application Uri not matching any of the **Redirect URIs** specified for the **Web** platform.

* If Identity isn't configured by calling `services.AddIdentity` in `ConfigureServices`, attempting to authenticate will result in *ArgumentException: The 'SignInScheme' option must be provided*. The project template used in this sample ensures that this is done.

* If the site database hasn't been created by applying the initial migration, *A database operation failed while processing the request* error occurs. Tap **Apply Migrations** to create the database and refresh to continue past the error.

## Next steps

* This article showed how to authenticate with Microsoft. Follow a similar approach to authenticate with other providers listed on the previous page.
* Once the web site is published to Azure web app, create a new client secrets in the Microsoft Entra admin center.
* Set the `Authentication:Microsoft:ClientId` and `Authentication:Microsoft:ClientSecret` as application settings in the Microsoft Entra admin center. The configuration system is set up to read keys from environment variables.

## Related content

Multiple authentication providers
