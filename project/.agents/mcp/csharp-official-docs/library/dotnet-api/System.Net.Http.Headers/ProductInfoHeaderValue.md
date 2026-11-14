---
title: "ProductInfoHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/ProductInfoHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProductInfoHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class ProductInfoHeaderValue : ICloneable
```

Represents a value that can either be a product or a comment in a User-Agent header.

#### Remarks
The `ProductInfoHeaderValue` class provides support for the product and comment tokens values used in  a User-Agent header as defined in RFC 2616 by the IETF.

The User-Agent field contains information about the user agent originating the request. The field can contain multiple product tokens and comments identifying the user agent and any sub-products.

## ProductInfoHeaderValue.ProductInfoHeaderValue(ProductHeaderValue) constructor

```csharp
public ProductInfoHeaderValue (System.Net.Http.Headers.ProductHeaderValue product);
```

Initializes a new instance of the `ProductInfoHeaderValue` class.

Parameters:

- `product`: A `ProductHeaderValue` object used to initialize the new instance.

To be added.

## ProductInfoHeaderValue.ProductInfoHeaderValue(String) constructor

```csharp
public ProductInfoHeaderValue (string comment);
```

Initializes a new instance of the `ProductInfoHeaderValue` class.

Parameters:

- `comment`: A comment value.

To be added.

## ProductInfoHeaderValue.ProductInfoHeaderValue(String, String) constructor

```csharp
public ProductInfoHeaderValue (string productName, string? productVersion);
```

Initializes a new instance of the `ProductInfoHeaderValue` class.

Parameters:

- `productName`: The product name value.
- `productVersion`: The product version value.

To be added.

## ProductInfoHeaderValue.Comment property

```csharp
public string? Comment { get; }
```

Gets the comment from the `ProductInfoHeaderValue` object.

Returns: The comment value this `ProductInfoHeaderValue`.

To be added.

## ProductInfoHeaderValue.Product property

```csharp
public System.Net.Http.Headers.ProductHeaderValue? Product { get; }
```

Gets the product from the `ProductInfoHeaderValue` object.

Returns: The product value from this `ProductInfoHeaderValue`.

To be added.

## ProductInfoHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `ProductInfoHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## ProductInfoHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `ProductInfoHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `ProductInfoHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## ProductInfoHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.ProductInfoHeaderValue Parse (string input);
```

Converts a string to an `ProductInfoHeaderValue` instance.

Parameters:

- `input`: A string that represents product info header value information.

Returns: A `ProductInfoHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid product info header value information.

To be added.

## ProductInfoHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `ProductInfoHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ProductInfoHeaderValue` instance is cast to an `ICloneable` interface.

## ProductInfoHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `ProductInfoHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## ProductInfoHeaderValue.TryParse(String, ProductInfoHeaderValue) method

```csharp
public static bool TryParse (string input, out System.Net.Http.Headers.ProductInfoHeaderValue? parsedValue);
```

Determines whether a string is valid `ProductInfoHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `ProductInfoHeaderValue` version of the string.

Returns: `true` if `input` is valid `ProductInfoHeaderValue` information; otherwise, `false`.

To be added.
