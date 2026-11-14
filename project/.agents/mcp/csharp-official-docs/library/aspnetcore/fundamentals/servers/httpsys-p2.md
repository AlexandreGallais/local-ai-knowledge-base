---
title: "HTTP.sys web server implementation in ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/servers/httpsys.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# HTTP.sys web server implementation in ASP.NET Core (part 2 of 3)

## How to use HTTP.sys

### Configure the ASP.NET Core app to use HTTP.sys

Call the `Microsoft.AspNetCore.Hosting.WebHostBuilderHttpSysExtensions.UseHttpSys*` extension method when building the host, specifying any required `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions`. The following example sets options to their default values:

```csharp
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Server.HttpSys;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseHttpSys(options =>
{
    options.AllowSynchronousIO = false;
    options.Authentication.Schemes = AuthenticationSchemes.None;
    options.Authentication.AllowAnonymous = true;
    options.MaxConnections = null;
    options.MaxRequestBodySize = 30_000_000;
    options.UrlPrefixes.Add("http://localhost:5005");
});

builder.Services.AddRazorPages();

var app = builder.Build();
```
Additional HTTP.sys configuration is handled through registry settings.

For more information about HTTP.sys options, see `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions`.

### Customize security descriptors

A *request queue* in HTTP.sys is a kernel-level structure that temporarily stores incoming HTTP requests until your app is ready to process them. Manage access to the request queue by using `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.RequestQueueSecurityDescriptor`. Set it to a `System.Security.AccessControl.GenericSecurityDescriptor` instance when configuring your HTTP.sys server.

By customizing the security descriptor, you can allow or deny specific users or groups access to the request queue. This is useful in scenarios where you want to restrict or delegate HTTP.sys request handling at the operating system level.

For example, the following code allows all authenticated users but denies guests:

```csharp
using System.Security.AccessControl;
using System.Security.Principal;
using Microsoft.AspNetCore.Server.HttpSys;

// Create a new security descriptor
var securityDescriptor = new CommonSecurityDescriptor(isContainer: false, isDS: false, sddlForm: string.Empty);

// Create a discretionary access control list (DACL)
var dacl = new DiscretionaryAcl(isContainer: false, isDS: false, capacity: 2);
dacl.AddAccess(
    AccessControlType.Allow,
    new SecurityIdentifier(WellKnownSidType.AuthenticatedUserSid, null),
    -1,
    InheritanceFlags.None,
    PropagationFlags.None
);
dacl.AddAccess(
    AccessControlType.Deny,
    new SecurityIdentifier(WellKnownSidType.BuiltinGuestsSid, null),
    -1,
    InheritanceFlags.None,
    PropagationFlags.None
);

// Assign the DACL to the security descriptor
securityDescriptor.DiscretionaryAcl = dacl;

// Configure HTTP.sys options
var builder = WebApplication.CreateBuilder();
builder.WebHost.UseHttpSys(options =>
{
    options.RequestQueueSecurityDescriptor = securityDescriptor;
});
```

The `RequestQueueSecurityDescriptor` property applies only when creating a new request queue. The property doesn't affect existing request queues. When `RequestQueueMode` is `Attach`it opens an existing queue, queue-level options such as `RequestQueueSecurityDescriptor` and `RequestQueueLimit` don't apply. In `Attach` mode, URL-group settings, such as timeouts and authentication hardening, must be configured by the listener that owns the URL group, and `UrlPrefixes` is used only to compute `PathBase`. `CreateOrAttach` still configures its own URL group and registers its `UrlPrefixes`, even when the queue already exists; settings for prefixes already registered by another listener remain controlled by that listener.

**MaxRequestBodySize**

The maximum allowed size of any request body in bytes. When set to `null`, the maximum request body size is unlimited. This limit has no effect on upgraded connections, which are always unlimited.

The recommended method to override the limit in an ASP.NET Core MVC app for a single `IActionResult` is to use the `Microsoft.AspNetCore.Mvc.RequestSizeLimitAttribute` attribute on an action method:

```csharp
[RequestSizeLimit(100000000)]
public IActionResult MyActionMethod()
```

An exception is thrown if the app attempts to configure the limit on a request after the app has started reading the request. An `IsReadOnly` property can be used to indicate if the `MaxRequestBodySize` property is in a read-only state, meaning it's too late to configure the limit.

If the app should override `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.MaxRequestBodySize` per-request, use the `Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature`:

```csharp
app.Use((context, next) =>
{
    context.Features.GetRequiredFeature<IHttpMaxRequestBodySizeFeature>()
                                             .MaxRequestBodySize = 10 * 1024;

    var server = context.RequestServices
        .GetRequiredService<IServer>();
    var serverAddressesFeature = server.Features
                                 .GetRequiredFeature<IServerAddressesFeature>();

    var addresses = string.Join(", ", serverAddressesFeature.Addresses);

    var loggerFactory = context.RequestServices
        .GetRequiredService<ILoggerFactory>();
    var logger = loggerFactory.CreateLogger("Sample");

    logger.LogInformation("Addresses: {addresses}", addresses);

    return next(context);
});
```
If using Visual Studio, make sure the app isn't configured to run IIS or IIS Express.

In Visual Studio, the default launch profile is for IIS Express. To run the project as a console app, manually change the selected profile, as shown in the following screenshot:

### Configure Windows Server

1. Determine the ports to open for the app and use Windows Firewall or the New-NetFirewallRule PowerShell cmdlet to open firewall ports to allow traffic to reach HTTP.sys. In the following commands and app configuration, port 443 is used.

1. When deploying to an Azure VM, open the ports in the Network Security Group. In the following commands and app configuration, port 443 is used.

1. Obtain and install X.509 certificates, if required.

   On Windows, create self-signed certificates using the New-SelfSignedCertificate PowerShell cmdlet. For an unsupported example, see UpdateIISExpressSSLForChrome.ps1.

   Install either self-signed or CA-signed certificates in the server's **Local Machine** > **Personal** store.

1. If the app is a framework-dependent deployment, install the matching ASP.NET Core Runtime and .NET Runtime from .NET Downloads. The .NET SDK isn't required on the server. ASP.NET Core doesn't target .NET Framework. For installer contents, see Choose the correct runtime.

   If the app is a self-contained deployment, the app includes the runtime in its deployment. No framework installation is required on the server.

1. Configure URLs and ports in the app.

   By default, ASP.NET Core binds to `http://localhost:5000`. To configure URL prefixes and ports, options include:

   * `Microsoft.AspNetCore.Hosting.HostingAbstractionsWebHostBuilderExtensions.UseUrls*`
   * `urls` command-line argument
   * `ASPNETCORE_URLS` environment variable
   * `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.UrlPrefixes`

   The following code example shows how to use `Microsoft.AspNetCore.Server.HttpSys.HttpSysOptions.UrlPrefixes` with the server's local IP address `10.0.0.4` on port 443:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseHttpSys(options =>
{
    options.UrlPrefixes.Add("https://10.0.0.4:443");
});

builder.Services.AddRazorPages();

var app = builder.Build();
```
   An advantage of `UrlPrefixes` is that an error message is generated immediately for improperly formatted prefixes.

   The settings in `UrlPrefixes` override `UseUrls`/`urls`/`ASPNETCORE_URLS` settings. Therefore, an advantage of `UseUrls`, `urls`, and the `ASPNETCORE_URLS` environment variable is that it's easier to switch between Kestrel and HTTP.sys.

   HTTP.sys recognizes two types of wild cards in URL prefixes:

   * `*` is a *weak binding*, also known as a *fallback binding*. If the URL prefix is `http://*:5000`, and something else is bound to port 5000, this binding won't be used.
   * `+` is a *strong binding*. If the URL prefix is `http://+:5000`, this binding will be used before other port 5000 bindings.

   For more information, see UrlPrefix Strings.

   > **Warning:**
   > Top-level wildcard bindings (`http://*:80/` and `http://+:80`) should **not** be used. Top-level wildcard bindings create app security vulnerabilities. This applies to both strong and weak wildcards. Use explicit host names or IP addresses rather than wildcards. Subdomain wildcard binding (for example, `*.mysub.com`) isn't a security risk if you control the entire parent domain (as opposed to `*.com`, which is vulnerable). For more information, see RFC 9110: Section 7.2: Host and :authority.

   Most configurations for apps and containers define only a port for listening, like port 80, without specifying other constraints like the host or path. `HTTP_PORTS` and `HTTPS_PORTS` are config keys that specify the listening ports for the Kestrel and HTTP.sys servers. You can specify the keys as environment variables defined with the `DOTNET_` or `ASPNETCORE_` prefixes, or set them directly through any other config input, such as the `appsettings.json` file. Each configuration is a semicolon-delimited list of port values, as shown in the following example:

```json
ASPNETCORE_HTTP_PORTS=80;8080
ASPNETCORE_HTTPS_PORTS=443;8081
```

The configuration in the example is shorthand for the following specification, which defines the scheme (HTTP or HTTPS) and any host or IP:

```json
ASPNETCORE_URLS=http://*:80/;http://*:8080/;https://*:443/;https://*:8081/
```

The `HTTP_PORTS` and `HTTPS_PORTS` configuration keys are lower priority. If other URLs or values are set directly in code, they can override the configuration keys. Configure certificates separately using server-specific mechanics for HTTPS.

> **Note:**
> Don't confuse the `HTTPS_PORTS` configuration key and `ASPNETCORE_HTTPS_PORTS` environment variable, which set the ports for Kestrel/HTTP.sys endpoint configuration, with the `HTTPS_PORT` configuration key and `ASPNETCORE_HTTPS_PORT` environment variable, which set the port for HTTPS redirection middleware.

   These configuration keys are equivalent to top-level wildcard bindings. They're convenient for development and container scenarios, but avoid wildcards when running on a machine that may also host other services.

1. Preregister URL prefixes on the server.

   The built-in tool for configuring HTTP.sys is *netsh.exe*. *netsh.exe* is used to reserve URL prefixes and assign X.509 certificates. The tool requires administrator privileges.

   Use the *netsh.exe* tool to register URLs for the app:

   ```console
   netsh http add urlacl url=<URL> user=<USER>
   ```

   * `<URL>`: The fully qualified Uniform Resource Locator (URL). Don't use a wildcard binding. Use a valid hostname or local IP address. *The URL must include a trailing slash.*
   * `<USER>`: Specifies the user or user-group name.

   In the following example, the local IP address of the server is `10.0.0.4`:

   ```console
   netsh http add urlacl url=https://10.0.0.4:443/ user=Users
   ```

   When a URL is registered, the tool responds with `URL reservation successfully added`.

   To delete a registered URL, use the `delete urlacl` command:

   ```console
   netsh http delete urlacl url=<URL>
   ```

1. Register X.509 certificates on the server.

   Use the *netsh.exe* tool to register certificates for the app:

   ```console
   netsh http add sslcert ipport=<IP>:<PORT> certhash=<THUMBPRINT> appid="{<GUID>}"
   ```

   * `<IP>`: Specifies the local IP address for the binding. Don't use a wildcard binding. Use a valid IP address.
   * `<PORT>`: Specifies the port for the binding.
   * `<THUMBPRINT>`: The X.509 certificate thumbprint.
   * `<GUID>`: A developer-generated GUID to represent the app for informational purposes.

   For reference purposes, store the GUID in the app as a package tag:

   * In Visual Studio:
     * Open the app's project properties by right-clicking on the app in **Solution Explorer** and selecting **Properties**.
     * Select the **Package** tab.
     * Enter the GUID that you created in the **Tags** field.
   * When not using Visual Studio:
     * Open the app's project file.
     * Add a `<PackageTags>` property to a new or existing `<PropertyGroup>` with the GUID that you created:

       ```xml
       <PropertyGroup>
         <PackageTags>00001111-aaaa-2222-bbbb-3333cccc4444</PackageTags>
       </PropertyGroup>
       ```

   In the following example:

   * The local IP address of the server is `10.0.0.4`.
   * An online random GUID generator provides the `appid` value.

   ```console
   netsh http add sslcert
       ipport=10.0.0.4:443
       certhash=b66ee04419d4ee37464ab8785ff02449980eae10
       appid="{00001111-aaaa-2222-bbbb-3333cccc4444}"
   ```

   When a certificate is registered, the tool responds with `SSL Certificate successfully added`.

   To delete a certificate registration, use the `delete sslcert` command:

   ```console
   netsh http delete sslcert ipport=<IP>:<PORT>
   ```

   Reference documentation for *netsh.exe*:

   * `netsh http`
   * UrlPrefix Strings

1. Run the app.

   Run the app under the identity authorized by the URL reservation. Administrator privileges are required to configure URL reservations and certificate bindings but aren't required to run an app whose identity has the necessary namespace permissions. Binding to a local IP address or port 443 doesn't by itself require an elevated application process. For more information, see Namespace reservations, registrations, and routing.

   The app responds at the server's public IP address. In this example, the server is reached from the Internet at its public IP address of `104.214.79.47`.

   A development certificate is used in this example. The page loads securely after bypassing the browser's untrusted certificate warning.

## Proxy server and load balancer scenarios

For apps hosted by HTTP.sys that interact with requests from the Internet or a corporate network, additional configuration might be required when hosting behind proxy servers and load balancers. For more information, see Configure ASP.NET Core to work with proxy servers and load balancers.

When processing a request with both a `Content-Length` header and a `Transfer-Encoding` header whose final coding is `chunked`, HTTP.sys removes `Content-Length` from the request headers surfaced to the app and closes the connection after responding by default. Proxies shouldn't send conflicting request framing. This behavior helps prevent request smuggling; it doesn't imply that every such request is rejected before reaching the app.
