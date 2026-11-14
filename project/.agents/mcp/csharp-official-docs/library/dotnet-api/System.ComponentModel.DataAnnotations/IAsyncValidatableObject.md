---
title: "IAsyncValidatableObject interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/IAsyncValidatableObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IAsyncValidatableObject interface

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public interface IAsyncValidatableObject : System.ComponentModel.DataAnnotations.IValidatableObject
```

Provides a way for an object to be validated asynchronously.

When an object implements `IAsyncValidatableObject`, the asynchronous
`Validator` APIs (such as
`Validator.TryValidateObjectAsync`)
invoke only `IAsyncValidatableObject.ValidateAsync`; `IValidatableObject.Validate`
is not called on the async path. The synchronous `Validator`
APIs continue to invoke `IValidatableObject.Validate`.

Provide a synchronous implementation of `IValidatableObject.Validate` when it can
evaluate the applicable rules, returning validation errors for rules that reject the object.
If a required rule applies but cannot be evaluated synchronously, throw
`InvalidOperationException` with a message directing callers to an asynchronous
validation entry point.

Returning no validation errors without evaluating a rule is appropriate only when the rule does not
apply. Do not return an empty result merely because a required asynchronous check applies but cannot
run synchronously. An empty result does not indicate pending validation or arrange a later asynchronous
invocation.

Do not implement `IValidatableObject.Validate` by blocking on asynchronous work
or asynchronously enumerated results.

## IAsyncValidatableObject.ValidateAsync(ValidationContext, CancellationToken) method

```csharp
public System.Collections.Generic.IAsyncEnumerable<System.ComponentModel.DataAnnotations.ValidationResult> ValidateAsync (System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Threading.CancellationToken <example-value> = default);
```

Determines whether the specified object is valid asynchronously, yielding validation results as each check completes.

Parameters:

- `validationContext`: A `ValidationContext` instance that provides context about the validation operation, such as the object and member being validated.
- `cancellationToken`: The token to observe during asynchronous validation and enumeration of the validation results.

Returns: An `IAsyncEnumerable<T>` that yields `ValidationResult` instances as each validation check completes.

This method must perform all applicable checks, including checks that can run synchronously.

The asynchronous `Validator` APIs do not automatically invoke `IValidatableObject.Validate` first. Share common checks through a helper when needed.
