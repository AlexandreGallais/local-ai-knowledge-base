---
title: "YARP Lets Encrypt"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/servers/yarp/lets-encrypt.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# YARP Lets Encrypt

> **Note:**
> The `LettuceEncrypt` NuGet package described in this article is archived and no longer supported, so the package isn't recommended for use.

## Introduction

YARP can support the certificate authority Lets Encrypt by using the API of another ASP.NET Core project, `LettuceEncrypt`. It allows you to set up TLS between the client and YARP with minimal configuration.

## Requirements

Add the `LettuceEncrypt` package dependency:

```xml
<PackageReference Include="LettuceEncrypt" Version="1.1.2" />
```

## Configuration

There are required options for `LettuceEncrypt` that should be set. See the example of `appsettings.json`:

```json
{
  "Urls": "http://*:80;https://*:443",

  "Logging": { ... },

  "ReverseProxy": {
    "Routes": { ... },
    "Clusters": { ... }
  },

  "LettuceEncrypt": {
    // Set this to automatically accept the terms of service of your certificate 
    // authority.
    // If you don't set this in config, you will need to press "y" whenever the 
    // application starts
    "AcceptTermsOfService": true,

    // You must specify at least one domain name
    "DomainNames": [ "example.com" ],

    // You must specify an email address to register with the certificate authority
    "EmailAddress": "user@example.com"
  }
}
```

## Update Services

```csharp
services.AddLettuceEncrypt();
```

For more options (for example, saving certificates) see the examples in the `LettuceEncrypt` project README.

## Kestrel Endpoints

If your project is explicitly using Kestrel options to configure IP addresses, ports, or HTTPS settings, call `UseLettuceEncrypt`:

Example:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(kestrel =>
{
    kestrel.ListenAnyIP(443, portOptions =>
    {
        portOptions.UseHttps(h =>
        {
            h.UseLettuceEncrypt(kestrel.ApplicationServices);
        });
    });
});
```
