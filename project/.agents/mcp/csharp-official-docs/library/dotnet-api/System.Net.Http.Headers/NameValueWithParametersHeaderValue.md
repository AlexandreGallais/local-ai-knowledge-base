---
title: "NameValueWithParametersHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/NameValueWithParametersHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NameValueWithParametersHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class NameValueWithParametersHeaderValue : System.Net.Http.Headers.NameValueHeaderValue, ICloneable
```

Represents a name/value pair with parameters used in various headers as defined in RFC 2616.

#### Remarks
The `NameValueWithParametersHeaderValue` class provides support for a name/value pair with parameters used in various headers  as defined in RFC 2616 by the IETF.

## NameValueWithParametersHeaderValue.NameValueWithParametersHeaderValue(NameValueWithParametersHeaderValue) constructor

```csharp
protected NameValueWithParametersHeaderValue (System.Net.Http.Headers.NameValueWithParametersHeaderValue source);
```

Initializes a new instance of the `NameValueWithParametersHeaderValue` class.

Parameters:

- `source`: A `NameValueWithParametersHeaderValue` object used to initialize the new instance.

To be added.

## NameValueWithParametersHeaderValue.NameValueWithParametersHeaderValue(String) constructor

```csharp
public NameValueWithParametersHeaderValue (string name);
```

Initializes a new instance of the `NameValueWithParametersHeaderValue` class.

Parameters:

- `name`: The header name.

To be added.

## NameValueWithParametersHeaderValue.NameValueWithParametersHeaderValue(String, String) constructor

```csharp
public NameValueWithParametersHeaderValue (string name, string? value);
```

Initializes a new instance of the `NameValueWithParametersHeaderValue` class.

Parameters:

- `name`: The header name.
- `value`: The header value.

To be added.

## NameValueWithParametersHeaderValue.Parameters property

```csharp
public System.Collections.Generic.ICollection<System.Net.Http.Headers.NameValueHeaderValue> Parameters { get; }
```

Gets the parameters from the `NameValueWithParametersHeaderValue` object.

Returns: A collection containing the parameters.

To be added.

## NameValueWithParametersHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `NameValueWithParametersHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## NameValueWithParametersHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `NameValueWithParametersHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `NameValueWithParametersHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## NameValueWithParametersHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.NameValueWithParametersHeaderValue Parse (string input);
```

Converts a string to an `NameValueWithParametersHeaderValue` instance.

Parameters:

- `input`: A string that represents name value with parameter header value information.

Returns: A `NameValueWithParametersHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid name value with parameter header value information.

To be added.

## NameValueWithParametersHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `NameValueWithParametersHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `NameValueWithParametersHeaderValue` instance is cast to an `ICloneable` interface.

## NameValueWithParametersHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `NameValueWithParametersHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## NameValueWithParametersHeaderValue.TryParse(String, NameValueWithParametersHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.NameValueWithParametersHeaderValue? parsedValue);
```

Determines whether a string is valid `NameValueWithParametersHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `NameValueWithParametersHeaderValue` version of the string.

Returns: `true` if `input` is valid `NameValueWithParametersHeaderValue` information; otherwise, `false`.

To be added.
