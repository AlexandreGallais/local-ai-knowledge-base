---
title: "MemoryConfigurationProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration.Memory/MemoryConfigurationProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryConfigurationProvider class

Namespace: `Microsoft.Extensions.Configuration.Memory`

```csharp
public class MemoryConfigurationProvider : Microsoft.Extensions.Configuration.ConfigurationProvider, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,string>>
```

Provides configuration key-value pairs that are obtained from memory.

#### Remarks

For more information and examples, see Memory configuration provider.

## MemoryConfigurationProvider.MemoryConfigurationProvider(MemoryConfigurationSource) constructor

```csharp
public MemoryConfigurationProvider (Microsoft.Extensions.Configuration.Memory.MemoryConfigurationSource source);
```

Initialize a new instance from the source.

Parameters:

- `source`: The source settings.

To be added.

## MemoryConfigurationProvider.Add(String, String) method

```csharp
public void Add (string key, string? value);
```

Adds a new key-value pair.

Parameters:

- `key`: The configuration key.
- `value`: The configuration value.

To be added.

## MemoryConfigurationProvider.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string,string?>> GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## MemoryConfigurationProvider.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `MemoryConfigurationProvider` instance is cast to an `IEnumerable` interface.
