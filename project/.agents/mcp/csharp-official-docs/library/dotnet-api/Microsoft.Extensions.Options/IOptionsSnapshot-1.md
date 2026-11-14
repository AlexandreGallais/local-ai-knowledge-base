---
title: "IOptionsSnapshot<TOptions> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IOptionsSnapshot`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOptionsSnapshot<TOptions> interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IOptionsSnapshot<out TOptions> : Microsoft.Extensions.Options.IOptions<out TOptions> where TOptions : class
```

Used to access the value of `TOptions` for the lifetime of a request.

Parameters:

- `TOptions`: Options type.

The default implementation, `OptionsManager<T>`, has a separate options cache in each
scope. Startup validation does not populate this cache, and the default implementation creates and validates
options synchronously. Validators with a usable synchronous `IValidateOptions<T>.Validate`
implementation continue to work. Validators that require asynchronous validation fail through their
synchronous validation result because the default implementation cannot execute or await
`IAsyncValidateOptions<T>.ValidateAsync`.

## IOptionsSnapshot<TOptions>.Get(String) method

```csharp
public TOptions Get (string? name);
```

Returns a configured `TOptions` instance with the given `name`.

Parameters:

- `name`: The name of the `TOptions` instance. If `null`, `Options.DefaultName`, which is the empty string, is used.

Returns: The `TOptions` instance that matches the given `name`.

To be added.
