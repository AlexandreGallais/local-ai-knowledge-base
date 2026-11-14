---
title: "OptionsValidationException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/OptionsValidationException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsValidationException class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class OptionsValidationException : Exception
```

Represents the exception that's thrown when options validation fails.

To be added.

## OptionsValidationException.OptionsValidationException(String, Type, String>) constructor

```csharp
public OptionsValidationException (string optionsName, Type optionsType, System.Collections.Generic.IEnumerable<string>? failureMessages);
```

Creates a new instance of `OptionsValidationException`.

Parameters:

- `optionsName`: The name of the options instance that failed.
- `optionsType`: The options type that failed.
- `failureMessages`: The validation failure messages.

To be added.

## OptionsValidationException.Failures property

```csharp
public System.Collections.Generic.IEnumerable<string> Failures { get; }
```

Gets the validation failures.

Returns: To be added.

To be added.

## OptionsValidationException.Message property

```csharp
public override string Message { get; }
```

Gets a semicolon-separated list of the `OptionsValidationException.Failures`.

Returns: To be added.

To be added.

## OptionsValidationException.OptionsName property

```csharp
public string OptionsName { get; }
```

Gets the name of the options instance that failed.

Returns: To be added.

To be added.

## OptionsValidationException.OptionsType property

```csharp
public Type OptionsType { get; }
```

Gets the type of the options that failed.

Returns: To be added.

To be added.
