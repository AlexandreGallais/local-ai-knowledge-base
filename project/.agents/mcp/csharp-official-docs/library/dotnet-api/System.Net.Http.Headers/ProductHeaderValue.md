---
title: "ProductHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/ProductHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProductHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class ProductHeaderValue : ICloneable
```

Represents a product token value in a User-Agent header.

#### Remarks
The `ProductInfoHeaderValue` class provides support for the product token <example-value> value used in a User-Agent header as defined in RFC 2616 by the IETF.

## ProductHeaderValue.ProductHeaderValue(String) constructor

```csharp
public ProductHeaderValue (string name);
```

Initializes a new instance of the `ProductHeaderValue` class.

Parameters:

- `name`: The product name.

To be added.

## ProductHeaderValue.ProductHeaderValue(String, String) constructor

```csharp
public ProductHeaderValue (string name, string? version);
```

Initializes a new instance of the `ProductHeaderValue` class.

Parameters:

- `name`: The product name value.
- `version`: The product version value.

To be added.

## ProductHeaderValue.Name property

```csharp
public string Name { get; }
```

Gets the name of the product token.

Returns: The name of the product token.

To be added.

## ProductHeaderValue.Version property

```csharp
public string? Version { get; }
```

Gets the version of the product token.

Returns: The version of the product token.

To be added.

## ProductHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `ProductHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## ProductHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `ProductHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `ProductHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## ProductHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.ProductHeaderValue Parse (string input);
```

Converts a string to an `ProductHeaderValue` instance.

Parameters:

- `input`: A string that represents product header value information.

Returns: A `ProductHeaderValue` instance.

To be added.

## ProductHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `ProductHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ProductHeaderValue` instance is cast to an `ICloneable` interface.

## ProductHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `ProductHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## ProductHeaderValue.TryParse(String, ProductHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.ProductHeaderValue? parsedValue);
```

Determines whether a string is valid `ProductHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `ProductHeaderValue` version of the string.

Returns: `true` if `input` is valid `ProductHeaderValue` information; otherwise, `false`.

To be added.
