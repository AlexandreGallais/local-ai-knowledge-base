---
title: "Support for the .localhost top-level domain"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/test/localhost-tld.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Support for the .localhost top-level domain

The `.localhost` top-level domain (TLD) is defined in RFC2606 and RFC6761 as being reserved for testing purposes and available for users to use locally as they would any other domain name. This means using a name like `myapp.localhost` locally that resolves to the IP loopback address is allowed and expected according to these RFCs.

Modern evergreen browsers already automatically resolve any `*.localhost` name to the IP loopback address (`127.0.0.1`/`::1`), effectively making them an alias for any service already being hosted at `localhost` on the local machine. Any service responding to `http://localhost:6789` will also respond to `http://anything-here.localhost:6789`, assuming no further specific hostname verification or enforcement is being performed by the service.

Having different apps running locally be resolvable via different names allows for better separation of some domain-name-associated website assets (for example, cookies) and makes it easier to identify which app you're browsing via the name displayed in the browser address bar. Support for the .localhost TLD was introduced in ASP.NET Core in .NET 10.

## Kestrel support for .localhost

ASP.NET Core's built-in HTTP server, Kestrel, correctly treats any `*.localhost` name set via supported endpoint configuration mechanisms as the local loopback address and binds to it rather than all external addresses (that is, bind to `127.0.0.1`/`::1` rather than `0.0.0.0`/`::`). This includes the `"applicationUrl"` property in launch profiles configured in a *launchSettings.json* file, and the `ASPNETCORE_URLS` environment variable. When configured to listen on a `.localhost` address, Kestrel logs an information message for both the `.localhost` **and** `localhost` addresses, to make it clear that both names can be used.

## Browser compatibility

While most modern evergreen browsers automatically resolve `*.localhost` names to the local loopback address, Safari on macOS doesn't support this feature. In Safari, you should use the regular `localhost` name instead of `*.localhost` domain names.

Some client apps other than Safari and evergreen web browsers treat `*.localhost` names as regular domain names and attempt to resolve them via their corresponding DNS stack. If your DNS configuration doesn't resolve `*.localhost` names to an address, they fail to connect. You can continue to use the regular `localhost` name to address your apps when not in a web browser.

## HTTPS development certificate

The ASP.NET Core HTTPS development certificate (including the `dotnet dev-certs https` command) is valid for use with the `*.dev.localhost` domain name.

The certificate lists the `*.dev.localhost` name as a Subject Alternative Name (SAN) rather than `*.localhost` because using a wildcard certificate for a top-level domain name is invalid.

## Project template integration

The project templates for *ASP.NET Core Empty* (`web`) and *Blazor Web App* (`blazor`) have an option that configures the created project to use the `.dev.localhost` domain name suffix. The option combines the domain suffix with the project name to allow the app to be browsed at an address like `https://myapp.dev.localhost:5036`:

```console
$ dotnet new web -n MyApp --localhost-tld
The template "ASP.NET Core Empty" was created successfully.

Processing post-creation actions...
Restoring D:\src\MyApp\MyApp.csproj:
Restore succeeded.

$ cd .\MyApp\
$ dotnet run --launch-profile https
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://myapp.dev.localhost:7099
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7099/
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://myapp.dev.localhost:5036
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5036/
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: D:\src\local\10.0.1xx\MyApp
```
