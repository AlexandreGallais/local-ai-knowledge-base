---
title: "Share authentication cookies among ASP.NET apps"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/cookie-sharing.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Share authentication cookies among ASP.NET apps

By Rick Anderson

Websites often consist of individual web apps working together. To provide a single sign-on (SSO) experience, web apps within a site must share authentication cookies. To support this scenario, the data protection stack allows sharing Katana cookie authentication and ASP.NET Core cookie authentication tickets.

In the examples that follow:

* The authentication cookie name is set to a common value of `.AspNet.SharedCookie`.
* The `AuthenticationType` is set to `Identity.Application` either explicitly or by default.
* A common app name, `SharedCookieApp`, is used to enable the data protection system to share data protection keys.
* `Identity.Application` is used as the authentication scheme. Whatever scheme is used, it must be used consistently *within and across* the shared cookie apps either as the default scheme or by explicitly setting it. The scheme is used when encrypting and decrypting cookies, so a consistent scheme must be used across apps.
* A common data protection key <example-value> location is used.
  * In ASP.NET Core apps, `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.PersistKeysToFileSystem*` is used to set the key <example-value> location.
  * In .NET Framework apps, cookie authentication middleware uses an implementation of `Microsoft.AspNetCore.DataProtection.DataProtectionProvider`. `DataProtectionProvider` provides data protection services for the encryption and decryption of authentication cookie payload data. The `DataProtectionProvider` instance is isolated from the data protection system used by other parts of the app. DataProtectionProvider.Create(System.IO.DirectoryInfo, Action\<IDataProtectionBuilder>) accepts a `System.IO.DirectoryInfo` to specify the location for data protection key storage.
* `DataProtectionProvider` requires the Microsoft.AspNetCore.DataProtection.Extensions NuGet package:
  * In .NET Framework apps, add a package reference to Microsoft.AspNetCore.DataProtection.Extensions.
* `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName*` sets the common app name.

## Share authentication cookies with ASP.NET Core Identity

When using ASP.NET Core Identity:

* Data protection keys and the app name must be shared among apps. A common key <example-value> location is provided to the `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.PersistKeysToFileSystem*` method in the following examples. Use `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName*` to configure a common shared app name (`SharedCookieApp` in the following examples). For more information, see Configure ASP.NET Core Data Protection.
* Use the `Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.ConfigureApplicationCookie*` extension method to set up the data protection service for cookies.
* The default authentication type is `Identity.Application`.

In `Program.cs`:

```csharp
using Microsoft.AspNetCore.DataProtection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(@"c:\PATH TO COMMON KEY RING FOLDER"))
    .SetApplicationName("SharedCookieApp");

builder.Services.ConfigureApplicationCookie(options => {
    options.Cookie.Name = ".AspNet.SharedCookie";
});

var app = builder.Build();
```

**Note:** The preceding instructions don't work with `ITicketStore` (`CookieAuthenticationOptions.SessionStore`).  For more information, see this GitHub issue.

For security reasons, authentication cookies are not compressed in ASP.NET Core. When using authentication cookies, developers should minimize the number of claim information included to just that necessary for their needs.

## Share authentication cookies without ASP.NET Core Identity

When using cookies directly without ASP.NET Core Identity, configure data protection and authentication. In the following example, the authentication type is set to `Identity.Application`:

```csharp
using Microsoft.AspNetCore.DataProtection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(@"c:\PATH TO COMMON KEY RING FOLDER"))
    .SetApplicationName("SharedCookieApp");

builder.Services.AddAuthentication("Identity.Application")
    .AddCookie("Identity.Application", options =>
    {
        options.Cookie.Name = ".AspNet.SharedCookie";
    });

var app = builder.Build();
```

For security reasons, authentication cookies are not compressed in ASP.NET Core. When using authentication cookies, developers should minimize the number of claim information included to just that necessary for their needs.

## Share cookies across different base paths

An authentication cookie uses the HttpRequest.PathBase as its default Cookie.Path. If the app's cookie must be shared across different base paths, `Path` must be overridden:

```csharp
using Microsoft.AspNetCore.DataProtection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(@"c:\PATH TO COMMON KEY RING FOLDER"))
    .SetApplicationName("SharedCookieApp");

builder.Services.ConfigureApplicationCookie(options => {
    options.Cookie.Name = ".AspNet.SharedCookie";
    options.Cookie.Path = "/";
});

var app = builder.Build();
```

## Share cookies across subdomains

When hosting apps that share cookies across subdomains, specify a common domain in the Cookie.Domain property. To share cookies across apps at `contoso.com`, such as `first_subdomain.contoso.com` and `second_subdomain.contoso.com`, specify the `Cookie.Domain` as `.contoso.com`:

```csharp
options.Cookie.Domain = ".contoso.com";
```

## Encrypt data protection keys at rest

For production deployments, configure the `DataProtectionProvider` to encrypt keys at rest with DPAPI or an X509Certificate. For more information, see Key <example-value> at rest in Windows and Azure using ASP.NET Core. In the following example, a certificate thumbprint is provided to `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.ProtectKeysWithCertificate*`:

```csharp
using Microsoft.AspNetCore.DataProtection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddDataProtection()
    .ProtectKeysWithCertificate("{CERTIFICATE THUMBPRINT}");
```

## Use a common user database

When apps use the same Identity schema (same version of Identity), confirm that the Identity system for each app is pointed at the same user database. Otherwise, the identity system produces failures at runtime when it attempts to match the information in the authentication cookie against the information in its database.

When the Identity schema is different among apps, usually because apps are using different Identity versions, sharing a common database based on the latest version of Identity isn't possible without remapping and adding columns in other app's Identity schemas. It's often more efficient to upgrade the other apps to use the latest Identity version so that a common database can be shared by the apps.

## Application name change

 In .NET 6, `Microsoft.AspNetCore.Builder.WebApplicationBuilder` normalizes the content root path to end with a `System.IO.Path.DirectorySeparatorChar`. Most apps migrating from `Microsoft.Extensions.Hosting.HostBuilder` or  `Microsoft.AspNetCore.Hosting.WebHostBuilder` won't have the same app name because they aren't normalized. For more information, see SetApplicationName

## Share authentication cookies between ASP.NET 4.x and ASP.NET Core apps

ASP.NET 4.x apps that use Microsoft.Owin cookie authentication middleware can be configured to generate authentication cookies that are compatible with the ASP.NET Core cookie authentication middleware. This can be useful if a web application consists of both ASP.NET 4.x apps and ASP.NET Core apps that must share a single sign-on experience. A specific example of such a scenario is incrementally migrating a web app from ASP.NET to ASP.NET Core. In such scenarios, it's common for some parts of an app to be served by the original ASP.NET app while others are served by the new ASP.NET Core app. Users should only have to sign in once, though. This can be accomplished by either of the following approaches:

* Using the System.Web adapters' remote authentication feature, which uses the ASP.NET app to sign users in.
* Configuring the ASP.NET app to use Microsoft.Owin cookie authentication middleware so that authentication cookies are shared with the ASP.NET Core app.

To configure ASP.NET Microsoft.Owin cookie authentication middleware to share cookies with an ASP.NET Core app, follow the preceding instructions to configure the ASP.NET Core app to use a specific cookie name, app name, and to persist data protection keys to a well-known location. See Configure ASP.NET Core Data Protection for more information on persisting data protection keys.

In the ASP.NET app, install the `Microsoft.Owin.Security.Interop` package.

Update the `UseCookieAuthentication` call in Startup.Auth.cs to configure an AspNetTicketDataFormat to match the ASP.NET Core app's settings:

```csharp
app.UseCookieAuthentication(new CookieAuthenticationOptions
{
    LoginPath = new PathString("/Account/Login"),
    Provider = new CookieAuthenticationProvider
    { 
        OnValidateIdentity = SecurityStampValidator.OnValidateIdentity<ApplicationUserManager, ApplicationUser>(
            validateInterval: TimeSpan.FromMinutes(30),
            regenerateIdentity: (manager, user) => user.GenerateUserIdentityAsync(manager))
    },

    // Settings to configure shared cookie with ASP.NET Core app
    CookieName = ".AspNet.ApplicationCookie",
    AuthenticationType = "Identity.Application",                
    TicketDataFormat = new AspNetTicketDataFormat(
        new DataProtectorShim(
            DataProtectionProvider.Create(new DirectoryInfo(@"c:\PATH TO COMMON KEY RING FOLDER"),
            builder => builder.SetApplicationName("SharedCookieApp"))
            .CreateProtector(
                "Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationMiddleware",
                // Must match the Scheme name used in the ASP.NET Core app, i.e. IdentityConstants.ApplicationScheme
                "Identity.Application",
                "v2"))),
    CookieManager = new ChunkingCookieManager()
});
```

Important items configured here include:

* The cookie name is set to the same name as in the ASP.NET Core app.
* A data protection provider is created using the same key ring path. Note that in these examples, data protection keys are stored on disk but other data protection providers can be used. For example, Redis or Azure Blob Storage can be used for data protection providers as long as the configuration matches between the apps. See Configure ASP.NET Core Data Protection for more information on persisting data protection keys.
* The app name is set to be the same as the app name used in the ASP.NET Core app.
* The authentication type is set to the name of the authentication scheme in the ASP.NET Core app.
* `System.Web.Helpers.AntiForgeryConfig.UniqueClaimTypeIdentifier` is set to a claim from the ASP.NET Core identity that will be unique to a user.

Because the authentication type was changed to match the authentication scheme of the ASP.NET Core app, it's also necessary to update how the ASP.NET app generates new identities to use that same name. This is typically done in `Models/IdentityModels.cs`:

```csharp
public class ApplicationUser : IdentityUser
{
    public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
    {
        // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
        var userIdentity = await manager.CreateIdentityAsync(this, "Identity.Application");
        
        // Add custom user claims here
        return userIdentity;
    }
}
```

With these changes, the ASP.NET and ASP.NET Core apps are able to use the same authentication cookies so that users signing in or out of one app are reflected in the other app.

Note that because there are differences between ASP.NET Identity and ASP.NET Core Identity's database schemas, it is recommended that users only *sign-in* using one of the apps - either the ASP.NET or ASP.NET Core app. Once users are signed in, the steps documented in this section will allow the authentication cookie to be *used* by either app and both apps should be able to log users out.

## Additional resources

* Host ASP.NET Core in a web farm
* A primer on OWIN cookie authentication middleware for the ASP.NET developer by Brock Allen
* OWIN authentication middleware Architecture by Brock Allen
* Posts from the 'OWIN / Katana' Category by Brock Allen
