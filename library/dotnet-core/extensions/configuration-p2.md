---
title: "Configuration (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/configuration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Configuration (part 2 of 2)

## Basic <example-value>

To access configuration values in their basic form, without the assistance of the _generic host_ approach, use the `Microsoft.Extensions.Configuration.ConfigurationBuilder` type directly.

> **Tip:**
> The `System.Configuration.ConfigurationBuilder` type is different to the `Microsoft.Extensions.Configuration.ConfigurationBuilder` type. All of this content is specific to the `Microsoft.Extensions.*` NuGet packages and namespaces.

Consider the following C# project:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>true</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <Content Include="appsettings.json">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </Content>
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Configuration.Binder" Version="10.0.12" />
    <PackageReference Include="Microsoft.Extensions.Configuration.Json" Version="10.0.12" />
    <PackageReference Include="Microsoft.Extensions.Configuration.EnvironmentVariables" Version="10.0.12" />
  </ItemGroup>

</Project>
```
The preceding project file references several configuration NuGet packages:

- Microsoft.Extensions.Configuration.Binder: Functionality to bind an object to data in configuration providers for `Microsoft.Extensions.Configuration`.
- Microsoft.Extensions.Configuration.Json: JSON configuration provider implementation for `Microsoft.Extensions.Configuration`.
- Microsoft.Extensions.Configuration.EnvironmentVariables: Environment variables configuration provider implementation for `Microsoft.Extensions.Configuration`.

Consider an example _appsettings.json_ file:

```json
{
    "Settings": {
        "KeyOne": 1,
        "KeyTwo": true,
        "KeyThree": {
            "Message": "Oh, that's nice...",
            "SupportedVersions": {
                "v1": "1.0.0",
                "v3": "3.0.7"
            }
        },
        "IPAddressRange": [
            "46.36.198.121",
            "46.36.198.122",
            "46.36.198.123",
            "46.36.198.124",
            "46.36.198.125"
        ]
    }
}
```
Now, given this JSON file, here's an example consumption pattern using the configuration builder directly:

```csharp
﻿using Microsoft.Extensions.Configuration;

// Build a config object, using env vars and JSON providers.
IConfigurationRoot config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .AddEnvironmentVariables()
    .Build();

// Get values from the config given their key and their target type.
Settings? settings = config.GetRequiredSection("Settings").Get<Settings>();

// Write the values to the console.
Console.WriteLine($"KeyOne = {settings?.KeyOne}");
Console.WriteLine($"KeyTwo = {settings?.KeyTwo}");
Console.WriteLine($"KeyThree:Message = {settings?.KeyThree?.Message}");

// Application code which might rely on the config could start here.

// This will output the following:
//   KeyOne = 1
//   KeyTwo = True
//   KeyThree:Message = Oh, that's nice...
```
The preceding C# code:

- Instantiates a `Microsoft.Extensions.Configuration.ConfigurationBuilder`.
- Adds the `"appsettings.json"` file to be recognized by the JSON configuration provider.
- Adds environment variables as being recognized by the Environment Variable configuration provider.
- Gets the required `"Settings"` section and the corresponding `Settings` instance by using the `config` instance.

The `Settings` object is shaped as follows:

```csharp
﻿public sealed class Settings
{
    public required int KeyOne { get; set; }
    public required bool KeyTwo { get; set; }
    public required NestedSettings KeyThree { get; set; } = null!;
}
```
```csharp
﻿public sealed class NestedSettings
{
    public required string Message { get; set; } = null!;
}
```
## Basic <example-value> with hosting

To access the `IConfiguration` value, you can rely again on the `Microsoft.Extensions.Hosting` NuGet package. Create a new console application, and paste the following project file contents into it:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>true</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <Content Include="appsettings.json">
      <CopyToOutputDirectory>Always</CopyToOutputDirectory>
    </Content>
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.Configuration.Binder" Version="10.0.13" />
    <PackageReference Include="Microsoft.Extensions.Hosting" Version="10.0.13" />
  </ItemGroup>

</Project>
```
The preceding project file defines that:

- The application is an executable.
- An _appsettings.json_ file is to be copied to the output directory when the project is compiled.
- The `Microsoft.Extensions.Hosting` NuGet package reference is added.

Add the _appsettings.json_ file at the root of the project with the following contents:

```json
{
    "KeyOne": 1,
    "KeyTwo": true,
    "KeyThree": {
        "Message": "Thanks for checking this out!"
    }
}
```
Replace the contents of the _Program.cs_ file with the following C# code:

```csharp
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using IHost host = Host.CreateApplicationBuilder(args).Build();

// Ask the service provider for the configuration abstraction.
IConfiguration config = host.Services.GetRequiredService<IConfiguration>();

// Get values from the config given their key and their target type.
int keyOneValue = config.GetValue<int>("KeyOne");
bool keyTwoValue = config.GetValue<bool>("KeyTwo");
string? keyThreeNestedValue = config.GetValue<string>("KeyThree:Message");

// Write the values to the console.
Console.WriteLine($"KeyOne = {keyOneValue}");
Console.WriteLine($"KeyTwo = {keyTwoValue}");
Console.WriteLine($"KeyThree:Message = {keyThreeNestedValue}");

// Application code which might rely on the config could start here.

await host.RunAsync();

// This will output the following:
//   KeyOne = 1
//   KeyTwo = True
//   KeyThree:Message = Thanks for checking this out!
```
When you run this application, the `Host.CreateApplicationBuilder` defines the behavior to discover the JSON configuration and expose it through the `IConfiguration` instance. From the `host` instance, you can ask the service provider for the `IConfiguration` instance and then ask it for values.

> **Tip:**
> Using the raw `IConfiguration` instance in this way, while convenient, doesn't scale very well. When applications grow in complexity, and their corresponding configurations become more complex, we recommend that you use the _options pattern_ as an alternative.

## Basic <example-value> with hosting and using the indexer API

Consider the same _appsettings.json_ file contents from the previous example:

```json
{
    "SupportedVersions": {
        "v1": "1.0.0",
        "v3": "3.0.7"
    },
    "IPAddressRange": [
        "46.36.198.123",
        "46.36.198.124",
        "46.36.198.125"
    ]
}
```
Replace the contents of the _Program.cs_ file with the following C# code:

```csharp
﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using IHost host = Host.CreateApplicationBuilder(args).Build();

// Ask the service provider for the configuration abstraction.
IConfiguration config = host.Services.GetRequiredService<IConfiguration>();

// Get values from the config given their key and their target type.
string? ipOne = config["IPAddressRange:0"];
string? ipTwo = config["IPAddressRange:1"];
string? ipThree = config["IPAddressRange:2"];
string? versionOne = config["SupportedVersions:v1"];
string? versionThree = config["SupportedVersions:v3"];

// Write the values to the console.
Console.WriteLine($"IPAddressRange:0 = {ipOne}");
Console.WriteLine($"IPAddressRange:1 = {ipTwo}");
Console.WriteLine($"IPAddressRange:2 = {ipThree}");
Console.WriteLine($"SupportedVersions:v1 = {versionOne}");
Console.WriteLine($"SupportedVersions:v3 = {versionThree}");

// Application code which might rely on the config could start here.

await host.RunAsync();

// This will output the following:
//     IPAddressRange:0 = 46.36.198.123
//     IPAddressRange:1 = 46.36.198.124
//     IPAddressRange:2 = 46.36.198.125
//     SupportedVersions:v1 = 1.0.0
//     SupportedVersions:v3 = 3.0.7
```
The values are accessed using the indexer API where each key is a string, and the value is a string. Configuration supports properties, objects, arrays, and dictionaries.

## Configuration providers

The following table shows the configuration providers available to .NET Core apps.

| Configuration provider                                                         | Provides configuration from |
|--------------------------------------------------------------------------------|-----------------------------|
| Azure App Configuration | Azure App Configuration |
| Azure Key Vault       | Azure Key Vault             |
| Command-line | Command-line parameters     |
| Custom                                     | Custom source               |
| Environment variables | Environment variables |
| File                 | JSON, XML, and INI files    |
| Key-per-file | Directory files             |
| Memory             | In-memory collections       |
| App secrets (secret <example-value>)              | File in the user profile directory |

> **Tip:**
> The order in which configuration providers are added matters. When multiple configuration providers are used and more than one provider specifies the same key, the last one added is used.

For more information on various configuration providers, see Configuration providers in .NET.

## See also

- Configuration providers in .NET
- Implement a custom configuration provider
- Configuration bugs should be created in the github.com/dotnet/runtime repo
- Configuration in ASP.NET Core
