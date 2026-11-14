---
title: "ValidateOptions<TOptions,TDep> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/ValidateOptions`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValidateOptions<TOptions,TDep> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class ValidateOptions<TOptions,TDep> : Microsoft.Extensions.Options.IValidateOptions<TOptions> where TOptions : class
```

Implementation of `IValidateOptions<T>`

Parameters:

- `TOptions`: The options type to validate.
- `TDep`: Dependency type.

To be added.

## ValidateOptions<TOptions,TDep>.ValidateOptions(String, TDep, Boolean>, String) constructor

```csharp
public ValidateOptions (string? name, TDep dependency, Func<TOptions,TDep,bool> validation, string failureMessage);
```

Initializes a new instance of `ValidateOptions<T1,T2>`.

Parameters:

- `name`: Options name.
- `dependency`: Gets the dependency.
- `validation`: Validation function.
- `failureMessage`: Validation failure message.

To be added.

## ValidateOptions<TOptions,TDep>.Dependency property

```csharp
public TDep Dependency { get; }
```

Gets the dependency.

Returns: To be added.

To be added.

## ValidateOptions<TOptions,TDep>.FailureMessage property

```csharp
public string FailureMessage { get; }
```

Gets the error to return when validation fails.

Returns: To be added.

To be added.

## ValidateOptions<TOptions,TDep>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## ValidateOptions<TOptions,TDep>.Validation property

```csharp
public Func<TOptions,TDep,bool> Validation { get; }
```

Gets the validation function.

Returns: To be added.

To be added.

## ValidateOptions<TOptions,TDep>.Validate(String, TOptions) method

```csharp
public Microsoft.Extensions.Options.ValidateOptionsResult Validate (string? name, TOptions options);
```

Validates a specific named options instance (or all when `name` is null).

Parameters:

- `name`: The name of the options instance being validated.
- `options`: The options instance.

Returns: The `ValidateOptionsResult` result.

To be added.
