---
title: "IHostingEnvironment interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/IHostingEnvironment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHostingEnvironment interface

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public interface IHostingEnvironment
```

Provides information about the hosting environment an application is running in.

This type is obsolete and will be removed in a future version.
The recommended alternative is Microsoft.Extensions.Hosting.IHostEnvironment.

To be added.

## IHostingEnvironment.ApplicationName property

```csharp
public string ApplicationName { get; set; }
```

Gets or sets the name of the application. This property is automatically set by the host to the assembly containing
the application entry point.

Returns: To be added.

To be added.

## IHostingEnvironment.ContentRootFileProvider property

```csharp
public Microsoft.Extensions.FileProviders.IFileProvider ContentRootFileProvider { get; set; }
```

Gets or sets an `IFileProvider` pointing at `IHostingEnvironment.ContentRootPath`.

Returns: To be added.

To be added.

## IHostingEnvironment.ContentRootPath property

```csharp
public string ContentRootPath { get; set; }
```

Gets or sets the absolute path to the directory that contains the application content files.

Returns: To be added.

To be added.

## IHostingEnvironment.EnvironmentName property

```csharp
public string EnvironmentName { get; set; }
```

Gets or sets the name of the environment. The host automatically sets this property to the value of the
of the "environment" key as specified in configuration.

Returns: To be added.

To be added.
