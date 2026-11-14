---
title: "IStartupValidator interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IStartupValidator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IStartupValidator interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IStartupValidator
```

Provides synchronous options validation during host startup.

Options are enabled to be validated during startup by calling `OptionsBuilderExtensions.ValidateOnStart<T>`.
This interface is retained for compatibility. New startup validators should implement and register
`IAsyncStartupValidator` instead. When migrating, replace the obsolete registration rather than
registering a custom validator under both startup contracts.

## IStartupValidator.Validate() method

```csharp
public void Validate ();
```

Validates options during host startup.

Exceptions:

- `OptionsValidationException`: One or more `IValidateOptions<T>` return failed `ValidateOptionsResult` when validating.

To be added.
