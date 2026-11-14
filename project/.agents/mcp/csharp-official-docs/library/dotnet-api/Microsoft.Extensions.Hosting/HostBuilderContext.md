---
title: "HostBuilderContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/HostBuilderContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostBuilderContext class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public class HostBuilderContext
```

Context containing the common services on the `IHost`. Some properties may be null until set by the `IHost`.

To be added.

## HostBuilderContext.HostBuilderContext(Object>) constructor

```csharp
public HostBuilderContext (System.Collections.Generic.IDictionary<object,object> properties);
```

Initializes a new instance of `HostBuilderContext`.

Parameters:

- `properties`: A non-null `IDictionary<T1,T2>` for sharing state between components during the host building process.

To be added.

## HostBuilderContext.Configuration property

```csharp
public Microsoft.Extensions.Configuration.IConfiguration Configuration { get; set; }
```

The `IConfiguration` containing the merged configuration of the application and the `IHost`.

Returns: To be added.

To be added.

## HostBuilderContext.HostingEnvironment property

```csharp
public Microsoft.Extensions.Hosting.IHostEnvironment HostingEnvironment { get; set; }
```

The `IHostEnvironment` initialized by the `IHost`.

Returns: To be added.

To be added.

## HostBuilderContext.Properties property

```csharp
public System.Collections.Generic.IDictionary<object,object> Properties { get; }
```

A central location for sharing state between components during the host building process.

Returns: To be added.

To be added.
