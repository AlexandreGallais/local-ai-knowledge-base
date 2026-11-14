---
title: "Base64StringAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/Base64StringAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Base64StringAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class Base64StringAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Specifies that a data field value is a well-formed Base64 string.

Recognition of valid Base64 is delegated to the `Convert` class, using the `Convert.TryFromBase64String` method.

## Base64StringAttribute.Base64StringAttribute() constructor

```csharp
public Base64StringAttribute ();
```

Initializes a new instance of the `Base64StringAttribute` class.

To be added.

## Base64StringAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Determines whether a specified object is valid. (Overrides `ValidationAttribute.IsValid`)

Parameters:

- `value`: The object to validate.

Returns: `true` if `value` is `null` or is a valid Base64 string, otherwise `false`

To be added.
