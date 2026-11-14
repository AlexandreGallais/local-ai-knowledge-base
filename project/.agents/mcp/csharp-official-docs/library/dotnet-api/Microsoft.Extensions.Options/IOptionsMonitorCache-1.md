---
title: "IOptionsMonitorCache<TOptions> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IOptionsMonitorCache`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOptionsMonitorCache<TOptions> interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IOptionsMonitorCache<TOptions> where TOptions : class
```

Used by `IOptionsMonitor<T>` to cache `TOptions` instances.

Parameters:

- `TOptions`: The type of options being requested.

To be added.

## IOptionsMonitorCache<TOptions>.Clear() method

```csharp
public void Clear ();
```

Clears all options instances from the cache.

To be added.

## IOptionsMonitorCache<TOptions>.GetOrAdd(String, Func<TOptions>) method

```csharp
public TOptions GetOrAdd (string? name, Func<TOptions> createOptions);
```

Gets a named options instance, or adds a new instance created with `createOptions`.

Parameters:

- `name`: The name of the options instance.
- `createOptions`: The func used to create the new instance.

Returns: The options instance.

To be added.

## IOptionsMonitorCache<TOptions>.TryAdd(String, TOptions) method

```csharp
public bool TryAdd (string? name, TOptions options);
```

Tries to adds a new option to the cache.

Parameters:

- `name`: The name of the options instance.
- `options`: The options instance.

Returns: `true` if the options instance was added; `false` if the name already exists.

To be added.

## IOptionsMonitorCache<TOptions>.TryRemove(String) method

```csharp
public bool TryRemove (string? name);
```

Tries to remove an options instance.

Parameters:

- `name`: The name of the options instance.

Returns: `true` if the options instance was removed; otherwise, `false`.

To be added.
