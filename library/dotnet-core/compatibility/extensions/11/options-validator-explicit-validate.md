---
title: "Breaking change: Options validation generator reports SYSLIB1205 for explicit Validate implementations"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/extensions/11/options-validator-explicit-validate.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Options validation generator reports SYSLIB1205 for explicit Validate implementations

Starting in .NET 11, the options validation source generator recognizes an explicit implementation of `IValidateOptions<TOptions>.Validate` as a handwritten implementation. It reports the error diagnostic `SYSLIB1205` instead of generating a separate public synchronous `Validate` method.

## Version introduced

.NET 11

## Previous behavior

Previously, the source generator didn't recognize an explicit implementation of `Microsoft.Extensions.Options.IValidateOptions`1.Validate(System.String,`0)` as an existing implementation. It could generate an additional public `Validate` method, so interface calls used the handwritten implementation while direct calls on the concrete validator used the generated method. The two call paths could produce different validation results.

```csharp
[OptionsValidator]
public partial class MyValidator : IValidateOptions<MyOptions>
{
    ValidateOptionsResult IValidateOptions<MyOptions>.Validate(string? name, MyOptions options)
        => ValidateOptionsResult.Success;
}
```

## New behavior

Starting in .NET 11, the source generator recognizes the explicit implementation, reports `SYSLIB1205`, and suppresses synchronous `Validate` generation for that options model.

If the validator also implements `IAsyncValidateOptions<TOptions>`, synchronous and asynchronous generation remain independent. The handwritten synchronous implementation produces `SYSLIB1205` and suppresses generated `Validate`, but the generator can still emit `ValidateAsync`.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The previous behavior allowed interface calls to use handwritten validation while direct calls used separately generated validation. Recognizing explicit implementations prevents generated validation from being silently bypassed and removes these divergent validation paths. For more information, see dotnet/runtime#130263.

## Recommended action

Choose one owner for the synchronous `Validate` implementation.

To use source-generated validation, keep `[OptionsValidator]` and remove the handwritten explicit implementation:

```csharp
[OptionsValidator]
public partial class MyValidator : IValidateOptions<MyOptions>
{
}
```

To own validation manually, remove `[OptionsValidator]` and implement the complete validator yourself:

```csharp
public sealed class MyValidator : IValidateOptions<MyOptions>
{
    public ValidateOptionsResult Validate(string? name, MyOptions options)
        => ValidateOptionsResult.Success;
}
```

There is no compatibility switch. Suppressing `SYSLIB1205` doesn't resolve the conflicting ownership of the method.

## Affected APIs

- `Microsoft.Extensions.Options.OptionsValidatorAttribute`
- `Microsoft.Extensions.Options.IValidateOptions`1.Validate(System.String,`0)`
