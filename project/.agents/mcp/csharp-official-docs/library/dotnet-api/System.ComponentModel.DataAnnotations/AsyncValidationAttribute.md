---
title: "AsyncValidationAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/AsyncValidationAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncValidationAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public abstract class AsyncValidationAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Base class for validation attributes that require asynchronous operations, such as database lookups or API calls.

Derived implementations must be thread-safe, as instances of this attribute might be invoked concurrently from multiple threads.

To be added.

## AsyncValidationAttribute.AsyncValidationAttribute() constructor

```csharp
protected AsyncValidationAttribute ();
```

Default constructor for any async validation attribute.

To be added.

## AsyncValidationAttribute.AsyncValidationAttribute(String>) constructor

```csharp
protected AsyncValidationAttribute (Func<string> errorMessageAccessor);
```

Allows for providing a resource accessor function that is used by the `ValidationAttribute.ErrorMessageString` property to retrieve the error message.

Parameters:

- `errorMessageAccessor`: The `Func<T>` that returns an error message.

To be added.

## AsyncValidationAttribute.AsyncValidationAttribute(String) constructor

```csharp
protected AsyncValidationAttribute (string errorMessage);
```

Constructor that accepts a fixed validation error message.

Parameters:

- `errorMessage`: A non-localized error message to use in `ValidationAttribute.ErrorMessageString`.

To be added.

## AsyncValidationAttribute.GetValidationResultAsync(Object, ValidationContext, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.ComponentModel.DataAnnotations.ValidationResult?> GetValidationResultAsync (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Threading.CancellationToken <example-value> = default);
```

Tests whether the given `value` is valid asynchronously with respect to the current validation attribute without throwing a `ValidationException`.

Parameters:

- `value`: The value to validate.
- `validationContext`: A `ValidationContext` instance that provides context about the validation operation, such as the object and member being validated. Provides access to services required to perform validation using `IServiceProvider`.
- `cancellationToken`: A `CancellationToken` to observe while waiting for the task to complete.

Returns: A `Task<T>` representing the asynchronous validation operation.

When validation is valid, the result is `ValidationResult.Success`.

When validation is invalid, the result is an instance of `ValidationResult`.

Exceptions:

- `InvalidOperationException`: The current attribute is malformed.
- `ArgumentNullException`: When `validationContext` is `null`.
- `OperationCanceledException`: The validation operation was canceled.

The underlying `AsyncValidationAttribute.IsValidAsync` implementation
must observe the supplied `cancellationToken` and stop work promptly when cancellation
is requested. The validation infrastructure awaits all started validation tasks before returning, so an
implementation that ignores cancellation can delay failure and short-circuiting.

Callers that need to bound validation time should pass a token <example-value> to cancel after a timeout,
such as one from a `CancellationTokenSource` configured with
`CancellationTokenSource.CancelAfter`.

## AsyncValidationAttribute.IsValid(Object) method

```csharp
public override sealed bool IsValid (object? value);
```

Sealed override of `ValidationAttribute.IsValid` that delegates to the `ValidationContext` overload so that `AsyncValidationAttribute` implementations only need to provide a single synchronous fallback via `ValidationAttribute.IsValid`.

Parameters:

- `value`: The value to validate.

Returns: `true` if the value is valid; otherwise, `false`.

To be added.

## AsyncValidationAttribute.IsValid(Object, ValidationContext) method

```csharp
protected abstract System.ComponentModel.DataAnnotations.ValidationResult? IsValid (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext);
```

Defines the synchronous validation behavior for this attribute.

Parameters:

- `value`: The value to validate.
- `validationContext`: A `ValidationContext` instance that provides context about the validation operation, such as the object and member being validated. Provides access to services required to perform validation using `IServiceProvider`. This value can be `null` when the contextless `ValidationAttribute.IsValid` overload invokes this method.

Returns: `ValidationResult.Success` when validation is valid.

An instance of `ValidationResult` when validation is invalid.

Synchronous validation consumers invoke this method. Provide a synchronous implementation when it
can evaluate the applicable rule, and return a validation error when the rule rejects the value.
If a required rule applies but cannot be evaluated synchronously, throw
`InvalidOperationException` with a message directing callers to an asynchronous
validation entry point. An unsupported invocation does not establish that the value is invalid.

Return `ValidationResult.Success` without evaluating the rule only when the rule does
not apply. Do not return success merely because a required asynchronous check applies but cannot run
synchronously. Success does not indicate pending validation or arrange a later asynchronous invocation.

Do not implement this method by blocking on asynchronous work through
`Task<TResult>.Result`, `Task.Wait()`, or `GetAwaiter().GetResult()`.
Wrapping the asynchronous operation in `Task.Run` does not make a blocking wait appropriate.

## AsyncValidationAttribute.IsValidAsync(Object, ValidationContext, CancellationToken) method

```csharp
protected abstract System.Threading.Tasks.Task<System.ComponentModel.DataAnnotations.ValidationResult?> IsValidAsync (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext, System.Threading.CancellationToken <example-value>);
```

Override this method in subclasses to implement asynchronous validation logic.

Parameters:

- `value`: The value to validate.
- `validationContext`: A `ValidationContext` instance that provides context about the validation operation, such as the object and member being validated. Provides access to services required to perform validation using `IServiceProvider`.
- `cancellationToken`: A `CancellationToken` to observe while waiting for the task to complete.

Returns: A `Task<T>` representing the asynchronous validation operation.

When validation is valid, the result is `ValidationResult.Success`.

When validation is invalid, the result is an instance of `ValidationResult`.

This method must perform all applicable checks, including checks that can run synchronously.
The synchronous `AsyncValidationAttribute.IsValid` implementation is not
automatically invoked before this method. Share common checks through a helper when needed.

Implementations must observe the supplied `cancellationToken` and stop work promptly
when cancellation is requested. The validation infrastructure might cancel this token after a validation
failure to stop sibling validators and awaits all started validation tasks before returning. An
implementation that ignores cancellation can delay failure and short-circuiting.
