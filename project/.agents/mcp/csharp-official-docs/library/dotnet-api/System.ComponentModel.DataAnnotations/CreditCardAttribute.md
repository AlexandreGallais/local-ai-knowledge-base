---
title: "CreditCardAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/CreditCardAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CreditCardAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public sealed class CreditCardAttribute : System.ComponentModel.DataAnnotations.DataTypeAttribute
```

Specifies that a data field value is a credit card number.

#### Remarks
The value is validated using a string processing algorithm. The class does not validate that the credit card number is valid for purchases, only that it is well formed.

## CreditCardAttribute.CreditCardAttribute() constructor

```csharp
public CreditCardAttribute ();
```

Initializes a new instance of the `CreditCardAttribute` class.

To be added.

## CreditCardAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Determines whether the specified credit card number is valid.

Parameters:

- `value`: The value to validate.

Returns: `true` if the credit card number is valid; otherwise, `false`.

#### Remarks
The value is validated using a string processing algorithm. The class does not validate that the credit card number is valid for purchases, only that it is well formed.
