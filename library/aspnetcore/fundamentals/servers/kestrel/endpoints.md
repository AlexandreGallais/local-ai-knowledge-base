---
title: "Configure endpoints for Kestrel web server (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/servers/kestrel/endpoints.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure endpoints for the ASP.NET Core Kestrel web server

-->
-->

Kestrel endpoints provide the infrastructure for listening to incoming requests and routing them to the appropriate middleware. The combination of an address and a protocol defines an endpoint.

* The address specifies the network interface that the server listens on for incoming requests, such as a TCP port.
* The protocol specifies the communication between the client and server, such as HTTP/1.1, HTTP/2, or HTTP/3.
* An endpoint can be secured by using the `https` URL scheme or `UseHttps` method.

Endpoints can be configured with URLs, JSON in the _appsettings.json_ file, and code. This article describes how to use each option to configure endpoints, HTTPS, and HTTP protocols.

## Identify the default endpoint

The configuration for new ASP.NET Core projects binds each project to a default endpoint. The configuration selects a random HTTP port between 5000-5300 and a random HTTPS port between 7000-7300. The selected ports are stored in the generated _Properties/launchSettings.json_ file and are modifiable by the developer. The _launchSetting.json_ file is used for local development only.

If there's no endpoint configuration, Kestrel binds to the `http://localhost:5000` URL.

## Configure endpoints

Kestrel endpoints listen for incoming connections. When an endpoint is created, it must be configured with the address to use for listening. The address is usually a TCP address and port number.

You have several options for configuring endpoints. You can specify the URLs or ports directly, define the addresses in your code, or create the endpoints with JSON in the _appsettings.json_ file.

### Specify endpoints with URLs

The following sections explain how to configure endpoints by using the following resources:

* `ASPNETCORE_URLS` environment variable
* `--urls` command-line argument
* `urls` host configuration key
* UseUrls extension method
* WebApplication.Urls property

#### URL formats

The URLs indicate the IP or host addresses with ports and protocols that the server listens on. You can omit the port if it's the default for the protocol (typically 80 and 443). URLs can be in any of the following formats.

* IPv4 address with port number:

  ```url
  http://65.55.39.10:80/
  ```

  `0.0.0.0` is a special case that binds to all IPv4 addresses.

* IPv6 address with port number:

  ```url
  http://[0:0:0:0:0:ffff:4137:270a]:80/
  ```

  `[::]` is the IPv6 equivalent of IPv4 `0.0.0.0`.

* Wildcard (`*`) host with port number:

  ```url
  http://contoso.com:80/
  http://*:80/
  ```

  Anything not recognized as a valid IP address or `localhost` is treated as a wildcard that binds to all IPv4 and IPv6 addresses. Some developers prefer to use the asterisk `*` or plus symbol `+` to be more explicit. To bind different host names to different ASP.NET Core apps on the same port, use HTTP.sys or a reverse proxy server. Reverse proxy server examples include IIS, YARP, Nginx, and Apache.

* Host name `localhost` with port number or loopback IP with port number:

  ```url
  http://localhost:5000/
  http://127.0.0.1:5000/
  http://[::1]:5000/
  ```

  When `localhost` is specified, Kestrel attempts to bind to both IPv4 and IPv6 loopback interfaces. If the requested port is in use by another service on either loopback interface, Kestrel fails to start. If either loopback interface is unavailable for any other reason (most commonly because IPv6 isn't supported), Kestrel logs a warning.

* Specify multiple URL prefixes by using a semicolon (`;`) delimiter, for example:

  ```url
  http://*:5000;http://localhost:5001;https://hostname:5002
  ```

For more information, see Override configuration.

#### HTTPS URL prefixes

You can define endpoints by using HTTPS URL prefixes only if a default certificate is provided in the HTTPS endpoint configuration. For example, use the `Microsoft.AspNetCore.Server.Kestrel.KestrelServerOptions` configuration or a configuration file. This approach is described in the Configure HTTPS in appsettings.json section later in this article. For more information, see the Configure HTTPS section.

### Specify ports only

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

### Create endpoints in `appsettings.json`

Kestrel can load endpoints from an `Microsoft.Extensions.Configuration.IConfiguration` instance. By default, Kestrel configuration is loaded from the `Kestrel` section and endpoints are configured in `Kestrel:Endpoints`:

```json
{
  "Kestrel": {
    "Endpoints": {
      "MyHttpEndpoint": {
        "Url": "http://localhost:8080"
      }
    }
  }
}
```

The example code:

* Uses the _appsettings.json_ file as the configuration source. However, any `IConfiguration` source can be used.
* Adds an endpoint named `MyHttpEndpoint` on port 8080.

For more information about configuring endpoints with JSON, see the Configure HTTPS in appsettings.json and Configure HTTP protocols in appsettings.json sections later in this article.

#### Reload endpoints from configuration

By default, the endpoint configuration can be reloaded when the configuration source changes. It can be disabled by using the `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration,System.Boolean)` method.

When a change is signaled:

* The new configuration is compared to the old version. Any endpoint without configuration changes isn't modified.
* Removed or modified endpoints are allowed 5 seconds to complete processing requests and shut down.
* New or modified endpoints are started.

Clients connecting to a modified endpoint might be disconnected or refused while the endpoint is restarted.

#### ConfigurationLoader

The `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure*` returns a `Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader`. The loader's `Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader.Endpoint(System.String,System.Action{Microsoft.AspNetCore.Server.Kestrel.EndpointConfiguration})` method can be used to supplement a configured endpoint's settings:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel((context, serverOptions) =>
{
    var kestrelSection = context.Configuration.GetSection("Kestrel");

    serverOptions.Configure(kestrelSection)
        .Endpoint("HTTPS", listenOptions =>
        {
            // ...
        });
});
```
`KestrelServerOptions.ConfigurationLoader` can be directly accessed to continue iterating on the existing loader, such as the one provided by the `Microsoft.AspNetCore.Builder.WebApplicationBuilder.WebHost`.

* The configuration section for each endpoint is available on the options in the `Microsoft.AspNetCore.Server.Kestrel.KestrelConfigurationLoader.Endpoint*` method so custom settings can be read.
* `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Configure(Microsoft.Extensions.Configuration.IConfiguration)` can be called multiple times, but only the last configuration is used unless `Load` is explicitly called on prior instances. The default host doesn't call `Load` so its default configuration section might be replaced.
* `KestrelConfigurationLoader` mirrors the `Listen` family of APIs from `KestrelServerOptions` as `Endpoint` overloads, so code and config endpoints can be configured in the same place. These overloads don't use names and only consume default settings from configuration.

### Define endpoints in the code

`Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions` provides methods for configuring endpoints in code:

* `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen*`
* `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenLocalhost*`
* `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenAnyIP*`
* `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket*`
* `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenNamedPipe*`

When both the `Listen` and UseUrls APIs are used simultaneously, the `Listen` endpoints override the `UseUrls` endpoints.

#### Bind to a TCP socket

The `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen*`, `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenLocalhost*`, and `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenAnyIP*` methods bind to a TCP socket:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel((context, serverOptions) =>
{
    serverOptions.Listen(IPAddress.Loopback, 5000);
    serverOptions.Listen(IPAddress.Loopback, 5001, listenOptions =>
    {
        listenOptions.UseHttps("testCert.pfx", "testPassword");
    });
});
```
The example code:

* Configures endpoints that listen on port 5000 and 5001.
* Configures HTTPS for an endpoint with the `Microsoft.AspNetCore.Hosting.ListenOptionsHttpsExtensions.UseHttps*` extension method on a `Microsoft.AspNetCore.Server.Kestrel.Core.ListenOptions` object. For more information, see Configure HTTPS in code.

On Windows, self-signed certificates can be created by using the New-SelfSignedCertificate PowerShell cmdlet. For an unsupported example, see the UpdateIISExpressSSLForChrome.ps1 certificate file on GitHub.

On macOS, Linux, and Windows, create certificates can be created by using OpenSSL.

#### Bind to a Unix socket

Listen on a Unix socket with `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket*` for improved performance with Nginx, as shown in this example:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel((context, serverOptions) =>
{
    serverOptions.ListenUnixSocket("/tmp/kestrel-test.sock");
});
```
* In the Nginx configuration file, set the `server` > `location` > `proxy_pass` entry to `http://unix:/tmp/{KESTREL SOCKET}:/;`, where `{KESTREL SOCKET}` is the name of the socket provided to `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket*`. In the code example, the name is `kestrel-test.sock`.
* Ensure the socket is writeable by Nginx. (You can set the write permissions on the socket with the `chmod go+w /tmp/kestrel-test.sock` command).

#### Configure endpoint defaults

ConfigureEndpointDefaults(Action\<ListenOptions>)) specifies configuration that runs for each specified endpoint. Multiple calls to `ConfigureEndpointDefaults` replace the previous configuration.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ConfigureEndpointDefaults(listenOptions =>
    {
        // ...
    });
});
```
> **Note:**
> Endpoints created by calling the `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.Listen*` **before** calling the `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ConfigureEndpointDefaults*` don't have the defaults applied.

### Use dynamic port binding

When port number `0` is specified, Kestrel dynamically binds to an available port. The following example shows how to determine the port bound by Kestrel at runtime:

```csharp
app.Run(async (context) =>
{
    var serverAddressFeature = context.Features.Get<IServerAddressesFeature>();

    if (serverAddressFeature is not null)
    {
        var listenAddresses = string.Join(", ", serverAddressFeature.Addresses);

        // ...
    }
});
```
Dynamically binding a port isn't available in some scenarios:

* The code calls the `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenLocalhost*`.
* The code binds together TCP-based HTTP/1.1 or HTTP/2 with QUIC-based HTTP/3.
