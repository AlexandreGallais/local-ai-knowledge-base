---
title: "NameValueHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/NameValueHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NameValueHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class NameValueHeaderValue : ICloneable
```

Represents a name/value pair used in various headers as defined in RFC 2616.

#### Remarks
The `NameValueHeaderValue` class provides support for name/value pairs used in various headers as defined in RFC 2616 by the IETF.

## NameValueHeaderValue.NameValueHeaderValue(NameValueHeaderValue) constructor

```csharp
protected internal NameValueHeaderValue (System.Net.Http.Headers.NameValueHeaderValue source);
```

Initializes a new instance of the `NameValueHeaderValue` class.

Parameters:

- `source`: A `NameValueHeaderValue` object used to initialize the new instance.

To be added.

## NameValueHeaderValue.NameValueHeaderValue(String) constructor

```csharp
public NameValueHeaderValue (string name);
```

Initializes a new instance of the `NameValueHeaderValue` class.

Parameters:

- `name`: The header name.

To be added.

## NameValueHeaderValue.NameValueHeaderValue(String, String) constructor

```csharp
public NameValueHeaderValue (string name, string? value);
```

Initializes a new instance of the `NameValueHeaderValue` class.

Parameters:

- `name`: The header name.
- `value`: The header value.

To be added.

## NameValueHeaderValue.Name property

```csharp
public string Name { get; }
```

Gets the header name.

Returns: The header name.

To be added.

## NameValueHeaderValue.Value property

```csharp
public string? Value { get; set; }
```

Gets the header value.

Returns: The header value.

To be added.

## NameValueHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `NameValueHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## NameValueHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `NameValueHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `NameValueHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## NameValueHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.NameValueHeaderValue Parse (string input);
```

Converts a string to an `NameValueHeaderValue` instance.

Parameters:

- `input`: A string that represents name value header value information.

Returns: A `NameValueHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid name value header value information.

To be added.

## NameValueHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `NameValueHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `NameValueHeaderValue` instance is cast to an `ICloneable` interface.

## NameValueHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `NameValueHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## NameValueHeaderValue.TryParse(String, NameValueHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.NameValueHeaderValue? parsedValue);
```

Determines whether a string is valid `NameValueHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `NameValueHeaderValue` version of the string.

Returns: `true` if `input` is valid `NameValueHeaderValue` information; otherwise, `false`.

To be added.
