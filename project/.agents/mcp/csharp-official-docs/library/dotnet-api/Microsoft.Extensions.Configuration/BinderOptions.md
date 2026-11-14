---
title: "BinderOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/BinderOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BinderOptions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public class BinderOptions
```

Specifies options used by the `ConfigurationBinder`.

To be added.

## BinderOptions.BinderOptions() constructor

```csharp
public BinderOptions ();
```

To be added.

To be added.

## BinderOptions.BindNonPublicProperties property

```csharp
public bool BindNonPublicProperties { get; set; }
```

Gets or sets a value that indicates whether the binder attempts to set all properties or only public properties.

Returns: `true` if the binder attempts to set all non-read-only properties; `false` if only public properties are set.

To be added.

## BinderOptions.ErrorOnUnknownConfiguration property

```csharp
public bool ErrorOnUnknownConfiguration { get; set; }
```

Gets or sets a value that indicates whether exceptions are thrown when converting a value or when a configuration
key is found for which the provided model object doesn't have an appropriate property that matches the key's name.

Returns: `true` if an `InvalidOperationException` is thrown with a description; `false` if no exceptions are thrown. The default is `false`.

The exception that's thrown when no matching property is found contains a description of the missing property.
