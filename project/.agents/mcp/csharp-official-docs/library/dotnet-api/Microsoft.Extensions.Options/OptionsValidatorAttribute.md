---
title: "OptionsValidatorAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/OptionsValidatorAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsValidatorAttribute class

Namespace: `Microsoft.Extensions.Options`

```csharp
public sealed class OptionsValidatorAttribute : Attribute
```

Triggers the automatic generation of validation members for `IValidateOptions<T>` at compile time.

When the annotated partial type implements
`IAsyncValidateOptions<T>` for an options type,
the generator emits both the synchronous `Validate` method and the asynchronous `ValidateAsync`
method for that type.

## OptionsValidatorAttribute.OptionsValidatorAttribute() constructor

```csharp
public OptionsValidatorAttribute ();
```

To be added.

To be added.
