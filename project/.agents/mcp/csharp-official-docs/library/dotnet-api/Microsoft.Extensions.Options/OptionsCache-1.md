---
title: "OptionsCache<TOptions> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/OptionsCache`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsCache<TOptions> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class OptionsCache<TOptions> : Microsoft.Extensions.Options.IOptionsMonitorCache<TOptions> where TOptions : class
```

Caches `TOptions` instances.

Parameters:

- `TOptions`: The type of options being requested.

To be added.

## OptionsCache<TOptions>.OptionsCache() constructor

```csharp
public OptionsCache ();
```

Initializes an instance of the `OptionsCache<T>` class.

To be added.

## OptionsCache<TOptions>.Clear() method

```csharp
public void Clear ();
```

Clears all options instances from the cache.

To be added.

## OptionsCache<TOptions>.GetOrAdd(String, Func<TOptions>) method

```csharp
public virtual TOptions GetOrAdd (string? name, Func<TOptions> createOptions);
```

Gets a named options instance, or adds a new instance created with `createOptions`.

Parameters:

- `name`: The name of the options instance.
- `createOptions`: The function used to create the new instance.

Returns: The options instance.

To be added.

## OptionsCache<TOptions>.TryAdd(String, TOptions) method

```csharp
public virtual bool TryAdd (string? name, TOptions options);
```

Tries to adds a new option to the cache.

Parameters:

- `name`: The name of the options instance.
- `options`: The options instance.

Returns: `true` if the option was added; `false` if the name already exists.

To be added.

## OptionsCache<TOptions>.TryRemove(String) method

```csharp
public virtual bool TryRemove (string? name);
```

Tries to remove an options instance.

Parameters:

- `name`: The name of the options instance.

Returns: `true` if anything was removed; otherwise, `false`.

To be added.
