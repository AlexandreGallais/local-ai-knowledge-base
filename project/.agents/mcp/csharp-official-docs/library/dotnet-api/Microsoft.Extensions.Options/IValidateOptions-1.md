---
title: "IValidateOptions<TOptions> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IValidateOptions`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IValidateOptions<TOptions> interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IValidateOptions<TOptions> where TOptions : class
```

Validates options.

Parameters:

- `TOptions`: The options type to validate.

To be added.

## IValidateOptions<TOptions>.Validate(String, TOptions) method

```csharp
public Microsoft.Extensions.Options.ValidateOptionsResult Validate (string? name, TOptions options);
```

Validates a specified named options instance (or all if `name` is `null`).

Parameters:

- `name`: The name of the options instance being validated.
- `options`: The options instance.

Returns: The `ValidateOptionsResult` result.

To be added.
