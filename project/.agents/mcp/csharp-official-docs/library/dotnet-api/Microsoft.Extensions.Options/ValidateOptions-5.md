---
title: "ValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/ValidateOptions`5.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4> class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class ValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4> : Microsoft.Extensions.Options.IValidateOptions<TOptions> where TOptions : class
```

Implementation of `IValidateOptions<T>`

Parameters:

- `TOptions`: The options type to validate.
- `TDep1`: First dependency type.
- `TDep2`: Second dependency type.
- `TDep3`: Third dependency type.
- `TDep4`: Fourth dependency type.

To be added.

## ValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.ValidateOptions(String, TDep1, TDep2, TDep3, TDep4, Boolean>, String) constructor

```csharp
public ValidateOptions (string? name, TDep1 dependency1, TDep2 dependency2, TDep3 dependency3, TDep4 dependency4, Func<TOptions,TDep1,TDep2,TDep3,TDep4,bool> validation, string failureMessage);
```

Initializes a new instance of `ValidateOptions<T1,T2,T3,T4,T5>`.

Parameters:

- `name`: Options name.
- `dependency1`: The first dependency.
- `dependency2`: The second dependency.
- `dependency3`: The third dependency.
- `dependency4`: The fourth dependency.
- `validation`: Validation function.
- `failureMessage`: Validation failure message.

To be added.

## ValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Dependency1 property

```csharp
public TDep1 Dependency1 { get; }
```

Gets the first dependency.

Returns: To be added.

To be added.

## ValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Dependency2 property

```csharp
public TDep2 Dependency2 { get; }
```

Gets the second dependency.

Returns: To be added.

To be added.

## ValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Dependency3 property

```csharp
public TDep3 Dependency3 { get; }
```

Gets the third dependency.

Returns: To be added.

To be added.

## ValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Dependency4 property

```csharp
public TDep4 Dependency4 { get; }
```

Gets the fourth dependency.

Returns: To be added.

To be added.

## ValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.FailureMessage property

```csharp
public string FailureMessage { get; }
```

Gets the error to return when validation fails.

Returns: To be added.

To be added.

## ValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Name property

```csharp
public string? Name { get; }
```

Gets the options name.

Returns: To be added.

To be added.

## ValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Validation property

```csharp
public Func<TOptions,TDep1,TDep2,TDep3,TDep4,bool> Validation { get; }
```

Gets the validation function.

Returns: To be added.

To be added.

## ValidateOptions<TOptions,TDep1,TDep2,TDep3,TDep4>.Validate(String, TOptions) method

```csharp
public Microsoft.Extensions.Options.ValidateOptionsResult Validate (string? name, TOptions options);
```

Validates a specific named options instance (or all when `name` is null).

Parameters:

- `name`: The name of the options instance being validated.
- `options`: The options instance.

Returns: The `ValidateOptionsResult` result.

To be added.
