---
title: "MemoryConfigurationSource class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration.Memory/MemoryConfigurationSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryConfigurationSource class

Namespace: `Microsoft.Extensions.Configuration.Memory`

```csharp
public class MemoryConfigurationSource : Microsoft.Extensions.Configuration.IConfigurationSource
```

Represents in-memory data as an `IConfigurationSource`.

To be added.

## MemoryConfigurationSource.MemoryConfigurationSource() constructor

```csharp
public MemoryConfigurationSource ();
```

Initializes a new instance of `MemoryConfigurationSource`.

To be added.

## MemoryConfigurationSource.InitialData property

```csharp
public System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,string?>>? InitialData { get; set; }
```

The initial key value configuration pairs.

Returns: To be added.

To be added.

## MemoryConfigurationSource.Build(IConfigurationBuilder) method

```csharp
public Microsoft.Extensions.Configuration.IConfigurationProvider Build (Microsoft.Extensions.Configuration.IConfigurationBuilder builder);
```

Builds the `MemoryConfigurationProvider` for this source.

Parameters:

- `builder`: The `IConfigurationBuilder`.

Returns: A `MemoryConfigurationProvider`

To be added.
