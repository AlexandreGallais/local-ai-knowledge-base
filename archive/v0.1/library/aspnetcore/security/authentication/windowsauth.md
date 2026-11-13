---
title: "Configure Windows Authentication in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/windowsauth.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure Windows Authentication in ASP.NET Core

By Rick Anderson and Kirk Larkin

Windows Authentication (also known as Negotiate, Kerberos, or NTLM authentication) can be configured for ASP.NET Core apps hosted with IIS, Kestrel, or HTTP.sys.

Windows Authentication relies on the operating system to authenticate users of ASP.NET Core apps. Windows Authentication is used for servers that run on a corporate network using Active Directory domain identities or Windows accounts to identify users. Windows Authentication is best suited to intranet environments where users, client apps, and web servers belong to the same Windows domain.

## When to use Windows Authentication

Windows Authentication is suitable for web applications that operate within an organization's private internal network, accessible only to employees (and other authorized users) within the same network. The user management is done within Active Directory (AD), and users use their existing Windows domain account to authenticate.

Windows Authentication provides several benefits for intranet applications:

* **Seamless user experience** - Users are automatically authenticated based on their active Windows session, or are prompted to enter their Windows credentials via a standard browser dialog box.
* **Integration with Active Directory** - Leverages existing Windows infrastructure and security policies, including user groups, account lockouts, and multi-factor authentication (MFA).
* **Secure credential <example-value>** - Authentication is handled through secure protocols like Kerberos, with no need to manage separate user credentials.
* **Role-based authorization** - Applications can access user and group information from Active Directory, enabling role-based access control (RBAC) within the application.
* **Reduced administrative overhead** - No need to maintain a separate user database or credential <example-value> system.

This makes Windows Authentication ideal for organizations that want to make use of their existing Windows infrastructure, such as intranet portals.

> **Note:**
> Windows Authentication isn't supported with HTTP/2. While authentication challenges can be sent over HTTP/2 responses, the client must downgrade to HTTP/1.1 to complete the authentication process. This is a protocol limitation, not a deprecation of Windows Authentication. Once authenticated, normal HTTP/2 communication can resume for subsequent requests.

For public-facing applications Windows Authentication isn't recommended due to security and usability concerns.
These reasons include:
* Windows Authentication is best kept internal to protect Active Directory, exposing it outside an internal network introduces security risks.
* External users don't have Windows domain accounts.
* It's complex to configure the necessary network infrastructure securely, and firewalls or proxies may interfere with the authentication process.
* It's not cross-platform and doesn't provide customization options for designs and user experiences.

### Alternatives for different scenarios

Depending on your application requirements, consider these alternatives:

**For public-facing applications:**

* OpenID Connect with external identity providers
* ASP.NET Core Identity with local user accounts (Introduction to Identity on ASP.NET Core)
* Azure Active Directory (AAD) for Microsoft 365 environments

**For mixed environments** with both intranet and external users:

* Active Directory Federation Services (ADFS) with OpenID Connect
* Azure Active Directory with hybrid configuration

**For corporate environments using modern authentication:**

* Azure Active Directory with single sign-on
* SAML-based solutions with third-party identity providers

## Proxy and load balancer scenarios

Windows Authentication is a stateful scenario primarily used in an intranet, where a proxy or load balancer doesn't usually handle traffic between clients and servers. If a proxy or load balancer is used, Windows Authentication only works if the proxy or load balancer:

* Handles the authentication.
* Passes the user authentication information to the app (for example, in a request header), which acts on the authentication information.

An alternative to Windows Authentication in environments where proxies and load balancers are used is Active Directory Federated Services (ADFS) with OpenID Connect (OIDC).

## IIS/IIS Express

Add the `Microsoft.AspNetCore.Authentication.Negotiate` NuGet package and authentication services by calling `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*` in `Program.cs`:

```csharp
using Microsoft.AspNetCore.Authentication.Negotiate;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
   .AddNegotiate();

builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = options.DefaultPolicy;
});
builder.Services.AddRazorPages();

var app = builder.Build();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

The preceding code was generated by the ASP.NET Core Razor Pages template with **Windows Authentication** specified.

### Launch settings (debugger)

Configuration for launch settings only affects the `Properties/launchSettings.json` file for IIS Express and doesn't configure IIS for Windows Authentication. Server configuration is explained in the IIS section.

The **Web Application** templates available via Visual Studio or the .NET CLI can be configured to support Windows Authentication, which updates the `Properties/launchSettings.json` file automatically.

# Visual Studio

**New project**

Create a new Razor Pages or MVC app. In the **Additional information** dialog, set the **Authentication type** to **Windows**.

Run the app. The username appears in the rendered app's user interface.

**Existing project**

The project's properties enable Windows Authentication and disable Anonymous Authentication. Open the launch profiles dialog:

1. In Solution Explorer, right click the project and select **Properties**.
1. Select the **Debug > General** tab and select **Open debug launch profiles UI**.
1. Clear the checkbox for **Enable Anonymous Authentication**.
1. Select the checkbox for **Enable Windows Authentication**.

Alternatively, the properties can be configured in the `iisSettings` node of the `launchSettings.json` file:

```json
"iisSettings": {
    "windowsAuthentication": true,
    "anonymousAuthentication": false,
    "iisExpress": {
        "applicationUrl": "http://localhost:52171/",
        "sslPort": 44308
    }
}
```

# .NET CLI

**New project**

Execute the `dotnet new` command with the `webapp` argument (ASP.NET Core Web App) and `--auth Windows` switch:

```dotnetcli
dotnet new webapp --auth Windows
```

**Existing project**

Update the `iisSettings` node of the `launchSettings.json` file:

```json
"iisSettings": {
    "windowsAuthentication": true,
    "anonymousAuthentication": false,
    "iisExpress": {
        "applicationUrl": "http://localhost:52171/",
        "sslPort": 44308
    }
}
```

---

### IIS

IIS uses the ASP.NET Core Module to host ASP.NET Core apps. Windows Authentication is configured for IIS via the *web.config* file. The following sections show how to:

* Provide a local *web.config* file that activates Windows Authentication on the server when the app is deployed.
* Use the IIS Manager to configure the *web.config* file of an ASP.NET Core app that has already been deployed to the server.

If you haven't already done so, enable IIS to host ASP.NET Core apps. For more information, see Host ASP.NET Core on Windows with IIS.

Enable the IIS Role Service for Windows Authentication. For more information, see Enable Windows Authentication in IIS Role Services (see Step 2).

IIS integration middleware is configured to automatically authenticate requests by default. For more information, see Host ASP.NET Core on Windows with IIS: IIS options (AutomaticAuthentication).

The ASP.NET Core Module is configured to forward the Windows Authentication token to the app by default. For more information, see ASP.NET Core Module configuration reference: Attributes of the aspNetCore element.

Use **either** of the following approaches:

* **Before publishing and deploying the project,** add the following *web.config* file to the project root:

  ```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <security>
        <authentication>
          <anonymousAuthentication enabled="false" />
          <windowsAuthentication enabled="true" />
        </authentication>
      </security>
    </system.webServer>
  </location>
</configuration>
```

  When the project is published by the .NET SDK (without the `<IsTransformWebConfigDisabled>` property set to `true` in the project file), the published *web.config* file includes the `<location><system.webServer><security><authentication>` section. For more information on the `<IsTransformWebConfigDisabled>` property, see web.config file.

* **After publishing and deploying the project,** perform server-side configuration with the IIS Manager:

  1. In IIS Manager, select the IIS site under the **Sites** node of the **Connections** sidebar.
  1. Double-click **Authentication** in the **IIS** area.
  1. Select **Anonymous Authentication**. Select **Disable** in the **Actions** sidebar.
  1. Select **Windows Authentication**. Select **Enable** in the **Actions** sidebar.

  When these actions are taken, IIS Manager modifies the app's *web.config* file. A `<system.webServer><security><authentication>` node is added with updated settings for `anonymousAuthentication` and `windowsAuthentication`:

  ```xml
<system.webServer>
  <security>
    <authentication>
      <anonymousAuthentication enabled="false" />
      <windowsAuthentication enabled="true" />
    </authentication>
  </security>
</system.webServer>
```

  The `<system.webServer>` section added to the *web.config* file by IIS Manager is outside of the app's `<location>` section added by the .NET SDK when the app is published. Because the section is added outside of the `<location>` node, the settings are inherited by any sub-apps to the current app. To prevent inheritance, move the added `<security>` section inside of the `<location><system.webServer>` section that the .NET SDK provided.

  When IIS Manager is used to add the IIS configuration, it only affects the app's *web.config* file on the server. A subsequent deployment of the app may overwrite the settings on the server if the server's copy of *web.config* is replaced by the project's *web.config* file. Use **either** of the following approaches to manage the settings:

  * Use IIS Manager to reset the settings in the *web.config* file after the file is overwritten on deployment.
  * Add a *web.config file* to the app locally with the settings.
