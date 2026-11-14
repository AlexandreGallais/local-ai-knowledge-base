---
title: "WarningHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/WarningHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WarningHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class WarningHeaderValue : ICloneable
```

Represents a warning value used by the Warning header.

To be added.

## WarningHeaderValue.WarningHeaderValue(Int32, String, String) constructor

```csharp
public WarningHeaderValue (int code, string agent, string text);
```

Initializes a new instance of the `WarningHeaderValue` class.

Parameters:

- `code`: The specific warning code.
- `agent`: The host that attached the warning.
- `text`: A quoted-string containing the warning text.

To be added.

## WarningHeaderValue.WarningHeaderValue(Int32, String, String, DateTimeOffset) constructor

```csharp
public WarningHeaderValue (int code, string agent, string text, DateTimeOffset date);
```

Initializes a new instance of the `WarningHeaderValue` class.

Parameters:

- `code`: The specific warning code.
- `agent`: The host that attached the warning.
- `text`: A quoted-string containing the warning text.
- `date`: The date/time stamp of the warning.

To be added.

## WarningHeaderValue.Agent property

```csharp
public string Agent { get; }
```

Gets the host that attached the warning.

Returns: The host that attached the warning.

To be added.

## WarningHeaderValue.Code property

```csharp
public int Code { get; }
```

Gets the specific warning code.

Returns: The specific warning code.

To be added.

## WarningHeaderValue.Date property

```csharp
public DateTimeOffset? Date { get; }
```

Gets the date/time stamp of the warning.

Returns: The date/time stamp of the warning.

To be added.

## WarningHeaderValue.Text property

```csharp
public string Text { get; }
```

Gets a quoted-string containing the warning text.

Returns: A quoted-string containing the warning text.

To be added.

## WarningHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `WarningHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## WarningHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `WarningHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `WarningHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## WarningHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.WarningHeaderValue Parse (string input);
```

Converts a string to an `WarningHeaderValue` instance.

Parameters:

- `input`: A string that represents authentication header value information.

Returns: Returns a `WarningHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid authentication header value information.

To be added.

## WarningHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `WarningHeaderValue` instance.

Returns: Returns a copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `WarningHeaderValue` instance is cast to an `ICloneable` interface.

## WarningHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `WarningHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## WarningHeaderValue.TryParse(String, WarningHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.WarningHeaderValue? parsedValue);
```

Determines whether a string is valid `WarningHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `WarningHeaderValue` version of the string.

Returns: `true` if `input` is valid `WarningHeaderValue` information; otherwise, `false`.

To be added.
