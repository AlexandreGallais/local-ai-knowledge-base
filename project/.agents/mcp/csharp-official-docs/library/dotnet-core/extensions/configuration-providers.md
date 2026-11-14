---
title: "Configuration providers (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/configuration-providers.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Configuration providers in .NET

Configuration in .NET is possible with configuration providers. Several types of providers rely on various configuration sources. This article details all of the different configuration providers and their corresponding sources.

- File configuration provider
- Environment variable configuration provider
- Command-line configuration provider
- Key-per-file configuration provider
- Memory configuration provider

## File configuration provider

`Microsoft.Extensions.Configuration.FileConfigurationProvider` is the base class for loading configuration from the file system. The following configuration providers derive from `FileConfigurationProvider`:

- JSON configuration provider
- XML configuration provider
- INI configuration provider

Keys are case-insensitive. All of the file configuration providers throw the `System.FormatException` when duplicate keys are found in a single provider.

### JSON configuration provider

The `Microsoft.Extensions.Configuration.Json.JsonConfigurationProvider` class loads configuration from a JSON file. Install the `Microsoft.Extensions.Configuration.Json` NuGet package.

Overloads can specify:

- Whether the file is optional.
- Whether the configuration is reloaded if the file changes.

Consider the following code:

```csharp
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using ConsoleJson.Example;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Configuration.Sources.Clear();

IHostEnvironment env = builder.Environment;

builder.Configuration
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true);

TransientFaultHandlingOptions options = new();
builder.Configuration.GetSection(nameof(TransientFaultHandlingOptions))
    .Bind(options);

Console.WriteLine($"TransientFaultHandlingOptions.Enabled={options.Enabled}");
Console.WriteLine($"TransientFaultHandlingOptions.AutoRetryDelay={options.AutoRetryDelay}");

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();
```
The preceding code:

- Clears all existing configuration providers that were added by default in the `Microsoft.Extensions.Hosting.Host.CreateApplicationBuilder(System.String[])` method.
- Configures the JSON configuration provider to load the *appsettings.json* and  *appsettings*.`Environment`.*json* files with the following options:
  - `optional: true`: The file is optional.
  - `reloadOnChange: true`: The file is reloaded when changes are saved.

> **Important:**
> When adding configuration providers with `Microsoft.Extensions.Configuration.IConfigurationBuilder.Add*`, the added configuration provider is added to the end of the `IConfigurationSource` list. When keys are found by multiple providers, the last provider to read the key <example-value> previous providers.

An example *appsettings.json* file with various configuration settings follows:

```json
﻿{
    "SecretKey": "<example-value>",
    "TransientFaultHandlingOptions": {
        "Enabled": true,
        "AutoRetryDelay": "00:00:07"
    },
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft": "Warning",
            "Microsoft.Hosting.Lifetime": "Information"
        }
    }
}
```
From the `Microsoft.Extensions.Configuration.IConfigurationBuilder` instance, after configuration providers have been added, you can call `Microsoft.Extensions.Configuration.IConfigurationBuilder.Build` to get the `Microsoft.Extensions.Configuration.IConfigurationRoot` object. The configuration root represents the root of a configuration hierarchy. Sections from the configuration can be bound to instances of .NET objects and later provided as `Microsoft.Extensions.Options.IOptions`1` through dependency injection.

> **Note:**
> The *Build Action* and *Copy to Output Directory* properties of the JSON file must be set to *Content* and *Copy if newer (or Copy always)*, respectively.

Consider the `TransientFaultHandlingOptions` class defined as follows:

```csharp
﻿namespace ConsoleJson.Example;

public sealed class TransientFaultHandlingOptions
{
    public bool Enabled { get; set; }
    public TimeSpan AutoRetryDelay { get; set; }
}
```
The following code builds the configuration root, binds a section to the `TransientFaultHandlingOptions` class type, and prints the bound values to the console window:

```csharp
TransientFaultHandlingOptions options = new();
builder.Configuration.GetSection(nameof(TransientFaultHandlingOptions))
    .Bind(options);

Console.WriteLine($"TransientFaultHandlingOptions.Enabled={options.Enabled}");
Console.WriteLine($"TransientFaultHandlingOptions.AutoRetryDelay={options.AutoRetryDelay}");
```
The application writes the following sample output:

```csharp
// Sample output:
//    TransientFaultHandlingOptions.Enabled=True
//    TransientFaultHandlingOptions.AutoRetryDelay=00:00:07
```
### XML configuration provider

The `Microsoft.Extensions.Configuration.Xml.XmlConfigurationProvider` class loads configuration from an XML file at runtime. Install the `Microsoft.Extensions.Configuration.Xml` NuGet package.

The following code demonstrates the configuration of XML files using the XML configuration provider.

```csharp
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Configuration.Sources.Clear();

builder.Configuration
    .AddXmlFile("appsettings.xml", optional: true, reloadOnChange: true)
    .AddXmlFile("repeating-example.xml", optional: true, reloadOnChange: true);

builder.Configuration.AddEnvironmentVariables();

if (args is { Length: > 0 })
{
    builder.Configuration.AddCommandLine(args);
}

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();
```
The preceding code:

- Clears all existing configuration providers that were added by default in the `Microsoft.Extensions.Hosting.Host.CreateApplicationBuilder(System.String[])` method.
- Configures the XML configuration provider to load the *appsettings.xml* and *repeating-example.xml* files with the following options:
  - `optional: true`: The file is optional.
  - `reloadOnChange: true`: The file is reloaded when changes are saved.
- Configures the environment variables configuration provider.
- Configures the command-line configuration provider if the given `args` contain arguments.

The XML settings are overridden by settings in the Environment variables configuration provider and the Command-line configuration provider.

An example *appsettings.xml* file with various configuration settings follows:

```xml
﻿<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <SecretKey>Secret key value</SecretKey>
  <TransientFaultHandlingOptions>
    <Enabled>true</Enabled>
    <AutoRetryDelay>00:00:07</AutoRetryDelay>
  </TransientFaultHandlingOptions>
  <Logging>
    <LogLevel>
      <Default>Information</Default>
      <Microsoft>Warning</Microsoft>
    </LogLevel>
  </Logging>
</configuration>
```
> **Tip:**
> To use the `IConfiguration` type in WinForms apps, add a reference to the Microsoft.Extensions.Configuration.Xml NuGet package. Instantiate the `Microsoft.Extensions.Configuration.ConfigurationBuilder` and chain calls to `Microsoft.Extensions.Configuration.XmlConfigurationExtensions.AddXmlFile*` and `Microsoft.Extensions.Configuration.ConfigurationBuilder.Build`. For more information, see .NET Docs Issue #29679.

In .NET 5 and earlier versions, add the `name` attribute to distinguish repeating elements that use the same element name. In .NET 6 and later versions, the XML configuration provider automatically indexes repeating elements. That means you don't have to specify the `name` attribute, except if you want the "0" index in the key and there's only one element. (If you're upgrading to .NET 6 or later, you may encounter a break resulting from this change in behavior. For more information, see Repeated XML elements include index.)

```xml
﻿<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <section name="section0">
    <key name="key0">value 00</key>
    <key name="key1">value 01</key>
  </section>
  <section name="section1">
    <key name="key0">value 10</key>
    <key name="key1">value 11</key>
  </section>
</configuration>
```
The following code reads the previous configuration file and displays the keys and values:

```csharp
IConfigurationRoot configurationRoot = builder.Configuration;

string key00 = "section:section0:key:key0";
string key01 = "section:section0:key:key1";
string key10 = "section:section1:key:key0";
string key11 = "section:section1:key:key1";

string? val00 = configurationRoot[key00];
string? val01 = configurationRoot[key01];
string? val10 = configurationRoot[key10];
string? val11 = configurationRoot[key11];

Console.WriteLine($"{key00} = {val00}");
Console.WriteLine($"{key01} = {val01}");
Console.WriteLine($"{key10} = {val10}");
Console.WriteLine($"{key10} = {val11}");
```
The application would write the following sample output:

```csharp
// Sample output:
//    section:section0:key:key0 = value 00
//    section:section0:key:key1 = value 01
//    section:section1:key:key0 = value 10
//    section:section1:key:key0 = value 11
```
Attributes can be used to supply values:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <key <example-value>"value" />
  <section>
    <key <example-value>"value" />
  </section>
</configuration>
```

The previous configuration file loads the following keys with `value`:

- `key:<example-value>`
- `section:key:<example-value>`

### INI configuration provider

The `Microsoft.Extensions.Configuration.Ini.IniConfigurationProvider` class loads configuration from an INI file at runtime.

The following code clears all the configuration providers and adds the `IniConfigurationProvider` with two INI files as the source:

```csharp
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Configuration.Sources.Clear();

IHostEnvironment env = builder.Environment;

builder.Configuration
    .AddIniFile("appsettings.ini", optional: true, reloadOnChange: true)
    .AddIniFile($"appsettings.{env.EnvironmentName}.ini", true, true);

using IHost host = builder.Build();

// Application code should start here.

await host.RunAsync();
```
> **Note:**
> You must install the `Microsoft.Extensions.Configuration.Ini` NuGet package to have access to the `Microsoft.Extensions.Configuration.IniConfigurationExtensions.AddIniFile*` method.

An example *appsettings.ini* file with various configuration settings follows:

```ini
﻿SecretKey="<example-value>"

[TransientFaultHandlingOptions]
Enabled=True
AutoRetryDelay="00:00:07"

[Logging:LogLevel]
Default=Information
Microsoft=Warning
```
The following code displays the preceding configuration settings by writing them to the console window:

```csharp
foreach ((string key, string? value) in
    builder.Configuration.AsEnumerable().Where(t => t.Value is not null))
{
    Console.WriteLine($"{key}={value}");
}
```
The application would write the following sample output:

```csharp
// Sample output:
//    TransientFaultHandlingOptions:Enabled=True
//    TransientFaultHandlingOptions:AutoRetryDelay=00:00:07
//    SecretKey=<example-value> key value
//    Logging:LogLevel:Microsoft=Warning
//    Logging:LogLevel:Default=Information
```
