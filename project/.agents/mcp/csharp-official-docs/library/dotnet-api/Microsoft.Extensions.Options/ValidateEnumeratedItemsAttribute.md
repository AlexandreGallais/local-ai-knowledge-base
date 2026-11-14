---
title: "ValidateEnumeratedItemsAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/ValidateEnumeratedItemsAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ValidateEnumeratedItemsAttribute class

Namespace: `Microsoft.Extensions.Options`

```csharp
public sealed class ValidateEnumeratedItemsAttribute : Attribute
```

Marks a field or property to be enumerated; each enumerated object is validated.

To be added.

## ValidateEnumeratedItemsAttribute.ValidateEnumeratedItemsAttribute() constructor

```csharp
public ValidateEnumeratedItemsAttribute ();
```

Initializes a new instance of the `ValidateEnumeratedItemsAttribute` class.

Using this constructor for a field or property tells the code generator to
generate validation for the individual members of the enumerable's type.

## ValidateEnumeratedItemsAttribute.ValidateEnumeratedItemsAttribute(Type) constructor

```csharp
public ValidateEnumeratedItemsAttribute (Type validator);
```

Initializes a new instance of the `ValidateEnumeratedItemsAttribute` class.

Parameters:

- `validator`: A type that implements `IValidateOptions<T>` for the enumerable's type.

Using this constructor for a field or property tells the code generator to use the given type to validate
the object held by the enumerable.

## ValidateEnumeratedItemsAttribute.Validator property

```csharp
public Type? Validator { get; }
```

Gets the type to use to validate the enumerable's objects.

Returns: To be added.

To be added.
