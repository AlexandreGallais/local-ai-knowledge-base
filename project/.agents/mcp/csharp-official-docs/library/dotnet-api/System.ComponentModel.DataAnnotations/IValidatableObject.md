---
title: "IValidatableObject interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/IValidatableObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IValidatableObject interface

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public interface IValidatableObject
```

Provides a way for an object to be validated.

Instances of types that implement this interface can be checked to determine if they are valid.

## IValidatableObject.Validate(ValidationContext) method

```csharp
public System.Collections.Generic.IEnumerable<System.ComponentModel.DataAnnotations.ValidationResult> Validate (System.ComponentModel.DataAnnotations.ValidationContext validationContext);
```

Determines whether the specified object is valid.

Parameters:

- `validationContext`: The validation context.

Returns: A collection that holds failed-validation information.

To be added.
