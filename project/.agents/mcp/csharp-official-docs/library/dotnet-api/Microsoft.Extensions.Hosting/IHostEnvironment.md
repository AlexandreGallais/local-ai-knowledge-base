---
title: "IHostEnvironment interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/IHostEnvironment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHostEnvironment interface

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public interface IHostEnvironment
```

Provides information about the hosting environment an application is running in.

To be added.

## IHostEnvironment.ApplicationName property

```csharp
public string ApplicationName { get; set; }
```

Gets or sets the name of the application. This property is automatically set by the host to the assembly containing
the application entry point.

Returns: To be added.

To be added.

## IHostEnvironment.ContentRootFileProvider property

```csharp
public Microsoft.Extensions.FileProviders.IFileProvider ContentRootFileProvider { get; set; }
```

Gets or sets an `IFileProvider` pointing at `IHostEnvironment.ContentRootPath`.

Returns: To be added.

To be added.

## IHostEnvironment.ContentRootPath property

```csharp
public string ContentRootPath { get; set; }
```

Gets or sets the absolute path to the directory that contains the application content files.

Returns: To be added.

To be added.

## IHostEnvironment.EnvironmentName property

```csharp
public string EnvironmentName { get; set; }
```

Gets or sets the name of the environment. The host automatically sets this property to the value of the
"environment" key as specified in configuration.

Returns: To be added.

To be added.
