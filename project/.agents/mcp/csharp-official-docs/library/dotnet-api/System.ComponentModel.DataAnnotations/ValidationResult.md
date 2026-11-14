---
title: "ValidationResult class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/ValidationResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValidationResult class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class ValidationResult
```

Represents a container for the results of a validation request.

To be added.

## ValidationResult.ValidationResult(ValidationResult) constructor

```csharp
protected ValidationResult (System.ComponentModel.DataAnnotations.ValidationResult validationResult);
```

Initializes a new instance of the `ValidationResult` class by using a `ValidationResult` object.

Parameters:

- `validationResult`: The validation result object.

Exceptions:

- `ArgumentNullException`: `validationResult` is `null`.

#### Remarks
The method creates a copy of an exiting `ValidationResult` object.

## ValidationResult.ValidationResult(String) constructor

```csharp
public ValidationResult (string? errorMessage);
```

Initializes a new instance of the `ValidationResult` class by using an error message.

Parameters:

- `errorMessage`: The error message.

To be added.

## ValidationResult.ValidationResult(String, String>) constructor

```csharp
public ValidationResult (string? errorMessage, System.Collections.Generic.IEnumerable<string>? memberNames);
```

Initializes a new instance of the `ValidationResult` class by using an error message and a list of members that have validation errors.

Parameters:

- `errorMessage`: The error message.
- `memberNames`: The list of member names that have validation errors.

To be added.

## ValidationResult.ErrorMessage property

```csharp
public string? ErrorMessage { get; set; }
```

Gets the error message for the validation.

Returns: The error message for the validation.

#### Remarks
You can set the `ErrorMessage` property to `null`.

## ValidationResult.MemberNames property

```csharp
public System.Collections.Generic.IEnumerable<string> MemberNames { get; }
```

Gets the collection of member names that indicate which fields have validation errors.

Returns: The collection of member names that indicate which fields have validation errors.

#### Remarks
The collection can be empty, but it will never be `null`.

## ValidationResult.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation of the current validation result.

Returns: The current validation result.

If `ErrorMessage` is empty, it still qualifies as specified and is therefore returned by `ToString`.

## ValidationResult.Success field

```csharp
public static readonly System.ComponentModel.DataAnnotations.ValidationResult? Success;
```

Represents the success of the validation.

The `null` value is used to indicate success. Consumers of `ValidationResult` should compare the values to `Success` rather than checking for `null`.
