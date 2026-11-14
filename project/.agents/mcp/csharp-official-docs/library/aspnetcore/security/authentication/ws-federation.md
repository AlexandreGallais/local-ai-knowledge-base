---
title: "Authenticate users with WS-Federation in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/ws-federation.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Authenticate users with WS-Federation in ASP.NET Core

This tutorial demonstrates how to enable users to sign in with a WS-Federation authentication provider like Active Directory Federation Services (ADFS) or Microsoft Entra ID. It uses the ASP.NET Core sample app described in Facebook, Google, and external provider authentication.

For ASP.NET Core apps, WS-Federation support is provided by Microsoft.AspNetCore.Authentication.WsFederation. This component is ported from Microsoft.Owin.Security.WsFederation and shares many of that component's mechanics. However, the components differ in a couple of important ways.

By default, the new middleware:

* Doesn't allow unsolicited logins. This feature of the WS-Federation protocol is vulnerable to XSRF attacks. However, it can be enabled with the `AllowUnsolicitedLogins` option.
* Doesn't check every form post for sign-in messages. Only requests to the `CallbackPath` are checked for sign-ins. `CallbackPath` defaults to `/signin-wsfed` but can be changed via the inherited `Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.CallbackPath` property of the `Microsoft.AspNetCore.Authentication.WsFederation.WsFederationOptions` class. This path can be shared with other authentication providers by enabling the `Microsoft.AspNetCore.Authentication.WsFederation.WsFederationOptions.SkipUnrecognizedRequests` option.

## Remote sign-out

The handler processes GET requests containing `wa=wsignoutcleanup1.0` at `Microsoft.AspNetCore.Authentication.WsFederation.WsFederationOptions.RemoteSignOutPath`, which defaults to `/signin-wsfed`. It calls `SignOutAsync` for the configured `SignOutScheme`. Cleanup messages aren't signed or bound to a session, so the handler can't verify that they came from the identity provider.

The samples use `AddDefaultIdentity`, which sets `Identity.External` as the default sign-in scheme. WS-Federation defaults `SignOutScheme` to its `SignInScheme`, so a cleanup message in these samples signs out the temporary external cookie rather than the application session. For an Identity app that requires provider-initiated sign-out of the application cookie, set `SignOutScheme` to `IdentityConstants.ApplicationScheme` in the options passed to `AddWsFederation`:

```csharp
options.SignOutScheme = IdentityConstants.ApplicationScheme;
```

Only configure this scheme if provider-initiated sign-out should end the app's Identity session.

If the app doesn't require the identity provider to initiate a process for users to sign out, disable it by setting `RemoteSignOutPath` to `Microsoft.AspNetCore.Http.PathString.Empty`:

```csharp
options.RemoteSignOutPath = PathString.Empty;
```

Microsoft Entra ID sends cleanup messages to a reply URL that isn't deterministic, so disabling the feature is generally the practical choice when using Entra ID. If the app must remotely sign out users, use `Microsoft.AspNetCore.Authentication.WsFederation.WsFederationEvents.OnRemoteSignOut` to filter requests based on the headers your identity provider actually sends. For example:

```csharp
options.Events.OnRemoteSignOut = context =>
{
    var referer = context.Request.Headers["Referer"].ToString();
    if (!referer.StartsWith("https://adfs.contoso.com/", StringComparison.OrdinalIgnoreCase))
    {
        // Reject missing Referer headers and requests from other origins.
        context.HandleResponse();
    }

    return Task.CompletedTask;
};
```

This check helps prevent another site from triggering sign-out through the user's browser. It rejects missing `Referer` headers, and the trailing `/` prevents matching look-alike host names. Before enabling the filter, verify that cleanup requests from the identity provider include the expected `Referer`.

For cleanup requests in a cross-site iframe or image, the browser might reject the cookie-deletion response under its `SameSite` rules. If that occurs, set `SameSite=None` and `Secure` on the deletion response. The cookie handler's `OnSigningOut` event runs before the cookie is deleted, so these settings don't change the attributes used when the app issues the authentication cookie:

```csharp
services.ConfigureApplicationCookie(options =>
{
    options.Events.OnSigningOut = context =>
    {
        context.CookieOptions.SameSite = SameSiteMode.None;
        context.CookieOptions.Secure = true;
        return Task.CompletedTask;
    };
});
```

Browser restrictions on third-party cookies can still prevent the browser from sending or removing the cookie.

## Register the app with Active Directory

### Active Directory Federation Services

* Open the server's **Add Relying Party Trust Wizard** from the ADFS Management console:

* Choose to enter data manually:

* Enter a display name for the relying party. The name isn't important to the ASP.NET Core app.

* Microsoft.AspNetCore.Authentication.WsFederation lacks support for token <example-value>, so don't configure a token <example-value> certificate:

* Enable support for WS-Federation Passive protocol, using the app's URL. Verify the port is correct for the app:

> **Note:**
> This must be an HTTPS URL. IIS Express can provide a self-signed certificate when hosting the app during development. Kestrel requires manual certificate configuration. See the Kestrel documentation for more details.

* Click **Next** through the rest of the wizard and **Close** at the end.

* ASP.NET Core Identity requires a **Name ID** claim. Add one from the **Edit Claim Rules** dialog:

* In the **Add Transform Claim Rule Wizard**, leave the default **Send LDAP Attributes as Claims** template selected, and click **Next**. Add a rule mapping the **SAM-Account-Name** LDAP attribute to the **Name ID** outgoing claim:

* Click **Finish** > **OK** in the **Edit Claim Rules** window.

### Microsoft Entra ID

Microsoft Entra ID can serve as the app's WS-Federation identity provider. Identity provider setup is maintained in the Microsoft Entra documentation. To register the app, follow the Register an application in Microsoft Entra ID quickstart.

After registering the app, provide the following two values to the WS-Federation middleware:

* `MetadataAddress`: The **Federation Metadata Document** URL, listed under the app registration's **Endpoints**.
* `Wtrealm`: The **Application ID URI**, configured under the app registration's **Expose an API**.

## Use WS-Federation without ASP.NET Core Identity

The WS-Federation middleware can be used without Identity. For example:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthentication(sharedOptions =>
    {
        sharedOptions.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        sharedOptions.DefaultChallengeScheme = WsFederationDefaults.AuthenticationScheme;
    })
     .AddWsFederation(options =>
     {
         options.Wtrealm = Configuration["wsfed:realm"];
         options.MetadataAddress = Configuration["wsfed:metadata"];
     })
     .AddCookie();

    services.AddControllersWithViews();
    services.AddRazorPages();
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
        app.UseDatabaseErrorPage();
    }
    else
    {
        app.UseExceptionHandler("/Home/Error");
        app.UseHsts();
    }
    app.UseHttpsRedirection();
    app.UseStaticFiles();

    app.UseRouting();

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");
        endpoints.MapRazorPages();
    });
}
```
## Add WS-Federation as an external login provider for ASP.NET Core Identity

* Add a dependency on Microsoft.AspNetCore.Authentication.WsFederation to the project.

* Add WS-Federation to `Startup.ConfigureServices`:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(
            Configuration.GetConnectionString("DefaultConnection")));
    services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
        .AddEntityFrameworkStores<ApplicationDbContext>();

    services.AddAuthentication()
        .AddWsFederation(options =>
        {
            // MetadataAddress represents the Active Directory instance used to authenticate users.
            options.MetadataAddress = "https://<ADFS FQDN or AAD tenant>/FederationMetadata/2007-06/FederationMetadata.xml";

            // Wtrealm is the app's identifier in the Active Directory instance.
            // For ADFS, use the relying party's identifier, its WS-Federation Passive protocol URL:
            options.Wtrealm = "https://localhost:44307/";

            // For AAD, use the Application ID URI from the app registration's Overview blade:
            options.Wtrealm = "api://bbd35166-7c13-49f3-8041-9551f2847b69";
        });

    services.AddControllersWithViews();
    services.AddRazorPages();
}
```

The `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.String)` overload sets the `Microsoft.AspNetCore.Authentication.AuthenticationOptions.DefaultScheme` property. The `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.Action{Microsoft.AspNetCore.Authentication.AuthenticationOptions})` overload allows configuring authentication options, which can be used to set up default authentication schemes for different purposes. Subsequent calls to `AddAuthentication` override previously configured `Microsoft.AspNetCore.Builder.AuthenticationOptions` properties.

`Microsoft.AspNetCore.Authentication.AuthenticationBuilder` extension methods that register an authentication handler may only be called once per authentication scheme. Overloads exist that allow configuring the scheme properties, scheme name, and display name.

### Log in with WS-Federation

Browse to the app and click the **Log in** link in the nav header. There's an option to log in with WsFederation:

With ADFS as the provider, the button redirects to an ADFS sign-in page:

With Microsoft Entra ID as the provider, the button redirects to a Microsoft Entra ID sign-in page:

A successful sign-in for a new user redirects to the app's user registration page:
