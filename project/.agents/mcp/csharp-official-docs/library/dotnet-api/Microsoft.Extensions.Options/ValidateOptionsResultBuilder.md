---
title: "ValidateOptionsResultBuilder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/ValidateOptionsResultBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValidateOptionsResultBuilder class

Namespace: `Microsoft.Extensions.Options`

```csharp
public class ValidateOptionsResultBuilder
```

Builds `ValidateOptionsResult` with support for multiple error messages.

To be added.

## ValidateOptionsResultBuilder.ValidateOptionsResultBuilder() constructor

```csharp
public ValidateOptionsResultBuilder ();
```

Creates new instance of the `ValidateOptionsResultBuilder` class.

To be added.

## ValidateOptionsResultBuilder.AddError(String, String) method

```csharp
public void AddError (string error, string? propertyName = default);
```

Adds a new validation error to the builder.

Parameters:

- `error`: The content of the error message.
- `propertyName`: The property in the option object which contains an error.

To be added.

## ValidateOptionsResultBuilder.AddResult(ValidateOptionsResult) method

```csharp
public void AddResult (Microsoft.Extensions.Options.ValidateOptionsResult result);
```

Adds any validation errors carried by the `ValidateOptionsResult` instance to this instance.

Parameters:

- `result`: The instance to consume the errors from.

To be added.

## ValidateOptionsResultBuilder.AddResult(ValidationResult) method

```csharp
public void AddResult (System.ComponentModel.DataAnnotations.ValidationResult? result);
```

Adds any validation error carried by the `ValidationResult` instance to this instance.

Parameters:

- `result`: The instance to append the error from.

To be added.

## ValidateOptionsResultBuilder.AddResults(ValidationResult>) method

```csharp
public void AddResults (System.Collections.Generic.IEnumerable<System.ComponentModel.DataAnnotations.ValidationResult?>? results);
```

Adds any validation error carried by the enumeration of `ValidationResult` instances to this instance.

Parameters:

- `results`: The enumeration to consume the errors from.

To be added.

## ValidateOptionsResultBuilder.Build() method

```csharp
public Microsoft.Extensions.Options.ValidateOptionsResult Build ();
```

Builds `ValidateOptionsResult` based on provided data.

Returns: A new instance of `ValidateOptionsResult`.

To be added.

## ValidateOptionsResultBuilder.Clear() method

```csharp
public void Clear ();
```

Reset the builder to the empty state.

To be added.
