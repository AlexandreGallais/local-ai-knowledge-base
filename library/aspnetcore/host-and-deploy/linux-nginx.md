---
title: "Host ASP.NET Core on Linux with Nginx (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/host-and-deploy/linux-nginx.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Host ASP.NET Core on Linux with Nginx

By Sourabh Shirhatti

-->
-->

This guide explains setting up a production-ready ASP.NET Core environment for Ubuntu, Red Hat Enterprise (RHEL), and SUSE Linux Enterprise Server.

For information on other Linux distributions supported by ASP.NET Core, see Prerequisites for .NET on Linux.

This guide:

* Places an existing ASP.NET Core app behind a reverse proxy server.
* Sets up the reverse proxy server to forward requests to the Kestrel web server.
* Ensures the web app runs on startup as a daemon.
* Configures a process management tool to help restart the web app.

# Ubuntu

* Access to Ubuntu 20.04 with a standard user account with sudo privilege.
* The latest stable .NET runtime installed on the server.
* An existing ASP.NET Core app.

# Red Hat Enterprise Linux

* Access to Red Hat Enterprise (RHEL) 8.0 or later with a standard user account with sudo privilege.
* The latest stable .NET runtime installed on the server.
* An existing ASP.NET Core app.

# SUSE Linux Enterprise Server

* Access to SLES 12 or 15 with a standard user account with sudo privilege.
* The latest stable .NET runtime installed on the server.
* An existing ASP.NET Core app.

---

At any point in the future after upgrading the shared framework, restart the ASP.NET Core apps hosted by the server.

## Publish and copy over the app

Configure the app for a framework-dependent deployment.

If the app is run locally in the `Development` environment and isn't configured by the server to make secure HTTPS connections, adopt either of the following approaches:

* Configure the app to handle secure local connections. For more information, see the HTTPS configuration section.

* Configure the app to run at the insecure endpoint:

  * Deactivate HTTPS redirection middleware in the `Development` environment (`Program.cs`):

    ```csharp
    if (!app.Environment.IsDevelopment())
    {
        app.UseHttpsRedirection();
    }
    ```

    For more information, see ASP.NET Core runtime environments.

  * Remove `https://localhost:5001` (if present) from the `applicationUrl` property in the `Properties/launchSettings.json` file.

For more information on configuration by environment, see ASP.NET Core runtime environments.

Run dotnet publish from the `Development` environment to package an app into a directory (for example, `bin/Release/{TARGET FRAMEWORK MONIKER}/publish`, where the `{TARGET FRAMEWORK MONIKER}` placeholder is the Target Framework Moniker (TFM)) that can run on the server:

```dotnetcli
dotnet publish --configuration Release
```

The app can also be published as a self-contained deployment if you prefer not to maintain the .NET runtime on the server.

Copy the ASP.NET Core app to the server using a tool that integrates into the organization's workflow (for example, `SCP`, `SFTP`). It's common to locate web apps under the `var` directory (for example, `var/www/helloapp`).

> **Note:**
> Under a production deployment scenario, a continuous integration workflow does the work of publishing the app and copying the assets to the server.

Test the app:

1. From the command line, run the app: `dotnet <app_assembly>.dll`.
1. In a browser, navigate to `http://<serveraddress>:<port>` to verify the app works on Linux locally.

## Configure a reverse proxy server

A reverse proxy is a common setup for serving dynamic web apps. A reverse proxy terminates the HTTP request and forwards it to the ASP.NET Core app.

### Use a reverse proxy server

Kestrel is great for serving dynamic content from ASP.NET Core. However, the web serving capabilities aren't as feature rich as servers such as IIS, Apache, or Nginx. A reverse proxy server can offload work such as serving static content, caching requests, compressing requests, and HTTPS termination from the HTTP server. A reverse proxy server may reside on a dedicated machine or may be deployed alongside an HTTP server.

For the purposes of this guide, a single instance of Nginx is used. It runs on the same server, alongside the HTTP server. Based on requirements, a different setup may be chosen.

Because requests are forwarded by reverse proxy, use the forwarded headers middleware from the `Microsoft.AspNetCore.HttpOverrides` package, which is automatically included in ASP.NET Core apps via the shared framework's `Microsoft.AspNetCore.App` metapackage. The middleware updates the `Request.Scheme`, using the `X-Forwarded-Proto` header, so that redirect URIs and other security policies work correctly.

Forwarded headers middleware should run before other middleware. This ordering ensures that the middleware relying on forwarded headers information can consume the header values for processing. To run forwarded headers middleware after diagnostics and error handling middleware, see forwarded headers middleware order.

Invoke the `Microsoft.AspNetCore.Builder.ForwardedHeadersExtensions.UseForwardedHeaders*` method before calling other middleware. Configure the middleware to forward the `X-Forwarded-For` and `X-Forwarded-Proto` headers:

```csharp
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication();

var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseAuthentication();

app.MapGet("/", () => "Hello ForwardedHeadersOptions!");

app.Run();
```
If no `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions` are specified to the middleware, the default headers to forward are `None`.

Proxies running on loopback addresses (`127.0.0.0/8`, `[::1]`), including the standard localhost address (`127.0.0.1`), are trusted by default. If other trusted proxies or networks within the organization handle requests between the internet and the web server, add them to the list of `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownProxies` or `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.KnownNetworks` with `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions`. The following example adds a trusted proxy server at IP address `10.0.0.100` to the forwarded headers middleware `KnownProxies`:

```csharp
using Microsoft.AspNetCore.HttpOverrides;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Configure forwarded headers
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.KnownProxies.Add(IPAddress.Parse("10.0.0.100"));
});

builder.Services.AddAuthentication();

var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseAuthentication();

app.MapGet("/", () => "10.0.0.100");

app.Run();
```
For more information, see Configure ASP.NET Core to work with proxy servers and load balancers.

# Ubuntu

Use `apt-get` to install Nginx. The installer creates a `systemd` init script that runs Nginx as daemon on system startup. Follow the installation instructions for Ubuntu at Nginx: Linux packages - Ubuntu.

# Red Hat Enterprise Linux

Use `yum-utils` to select and install an Nginx module stream. Follow the installation instructions for RHEL at Nginx: Linux packages - RHEL.

# SUSE Linux Enterprise Server

Use `yum-utils` to select and install an Nginx module stream. Follow the installation instructions for SLES at Nginx: Linux packages - SLES.

---

> **Note:**
> If optional Nginx modules are required, building Nginx from source might be required.

Since Nginx was installed for the first time, explicitly start it by running:

```bash
sudo service nginx start
```

Verify a browser displays the default landing page for Nginx. The landing page is reachable at `http://<server_IP_address>/index.nginx-debian.html`.

# Ubuntu

To configure Nginx as a reverse proxy to forward HTTP requests to the ASP.NET Core app, modify `/etc/nginx/sites-available/default` and  recreate the symlink. After creating the `/etc/nginx/sites-available/default` file,  use the following command to create the symlink:

```bash
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
```

Open `/etc/nginx/sites-available/default` in a text editor, and replace the contents with the following snippet:

# Red Hat Enterprise Linux

To configure Nginx as a reverse proxy to forward HTTP requests to an ASP.NET Core app, modify `/etc/nginx.conf`. Update the `http{}` code block with the following snippet:

# SUSE Linux Enterprise Server

To configure Nginx as a reverse proxy to forward HTTP requests to an ASP.NET Core app, modify `/etc/nginx.conf`. Update the `http{}` code block with the following snippet:

---

```text
map $http_connection $connection_upgrade {
  "~*Upgrade" $http_connection;
  default keep-alive;
}

server {
  listen        80;
  server_name   example.com *.example.com;
  location / {
      proxy_pass         http://127.0.0.1:5000/;
      proxy_http_version 1.1;
      proxy_set_header   Upgrade $http_upgrade;
      proxy_set_header   Connection $connection_upgrade;
      proxy_set_header   Host $host;
      proxy_cache_bypass <example-value>;
      proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header   X-Forwarded-Proto $scheme;
  }
}
```

If the app is a SignalR or Blazor Server app, see ASP.NET Core SignalR production hosting and scaling and Host and deploy ASP.NET Core server-side Blazor apps respectively for more information.

When no `server_name` matches, Nginx uses the default server. If no default server is defined, the first server in the configuration file is the default server. As a best practice, add a specific default server that returns a status code of 444 in your configuration file. A default server configuration example is:

```text
server {
    listen   80 default_server;
    # listen [::]:80 default_server deferred;
    return   444;
}
```

With the preceding configuration file and default server, Nginx accepts public traffic on port 80 with host header `example.com` or `*.example.com`. Requests not matching these hosts won't get forwarded to Kestrel. Nginx forwards the matching requests to Kestrel at `http://127.0.0.1:5000/`. For more information, see How nginx processes a request. To change Kestrel's IP/port, see Kestrel: Endpoint configuration.

> **Warning:**
> Failure to specify a proper server_name directive exposes your app to security vulnerabilities. Subdomain wildcard binding (for example, `*.example.com`) doesn't pose this security risk if you control the entire parent domain (as opposed to `*.com`, which is vulnerable). For more information, see RFC 9110: HTTP Semantics (Section 7.2: Host and :authority).

Once the Nginx configuration is established, run `sudo nginx -t` to verify the syntax of the configuration files. If the configuration file test is successful, force Nginx to pick up the changes by running `sudo nginx -s reload`.

To directly run the app on the server:

1. Navigate to the app's directory.
1. Run the app: `dotnet <app_assembly.dll>`, where `app_assembly.dll` is the assembly file name of the app.

# Ubuntu

If the app runs on the server but fails to respond over the internet, check the server's firewall and confirm port 80 is open. If using an Azure Ubuntu VM, add a Network Security Group (NSG) rule that enables inbound port 80 traffic. There's no need to enable an outbound port 80 rule, as the outbound traffic is automatically granted when the inbound rule is enabled.

# Red Hat Enterprise Linux

If the app runs on the server but fails to respond over the internet, check the server's firewall and confirm port 80 is open.

# SUSE Linux Enterprise Server

If the app runs on the server but fails to respond over the internet, check the server's firewall and confirm port 80 is open.

---

When done testing the app, shut down the app with `Ctrl`+`C` in the command shell.

### Increase keepalive_requests

`keepalive_requests` can be increased for higher performance, For more information, see this GitHub issue.
