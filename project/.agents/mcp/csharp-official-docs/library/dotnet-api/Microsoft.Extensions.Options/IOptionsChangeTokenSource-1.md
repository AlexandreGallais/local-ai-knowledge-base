---
title: "IOptionsChangeTokenSource<TOptions> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IOptionsChangeTokenSource`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOptionsChangeTokenSource<TOptions> interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IOptionsChangeTokenSource<out TOptions>
```

Fetches a `IChangeToken` that's used for tracking options changes.

Parameters:

- `TOptions`: The options type being changed.

To be added.

## IOptionsChangeTokenSource<TOptions>.Name property

```csharp
public string? Name { get; }
```

Gets the name of the option instance being changed.

Returns: To be added.

To be added.

## IOptionsChangeTokenSource<TOptions>.GetChangeToken() method

```csharp
public Microsoft.Extensions.Primitives.IChangeToken <example-value> ();
```

Returns a `IChangeToken` that can be used to register a change notification callback.

Returns: A change token.

To be added.
