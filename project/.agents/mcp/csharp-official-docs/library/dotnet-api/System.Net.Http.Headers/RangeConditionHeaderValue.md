---
title: "RangeConditionHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/RangeConditionHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RangeConditionHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class RangeConditionHeaderValue : ICloneable
```

Represents an If-Range header value that can either be a date/time or an entity-tag value.

#### Remarks
The `RangeConditionHeaderValue` class provides support for the If-Range header as defined in RFC 2616 by the IETF.

## RangeConditionHeaderValue.RangeConditionHeaderValue(DateTimeOffset) constructor

```csharp
public RangeConditionHeaderValue (DateTimeOffset date);
```

Initializes a new instance of the `RangeConditionHeaderValue` class.

Parameters:

- `date`: A date value used to initialize the new instance.

To be added.

## RangeConditionHeaderValue.RangeConditionHeaderValue(EntityTagHeaderValue) constructor

```csharp
public RangeConditionHeaderValue (System.Net.Http.Headers.EntityTagHeaderValue entityTag);
```

Initializes a new instance of the `RangeConditionHeaderValue` class.

Parameters:

- `entityTag`: An `EntityTagHeaderValue` object used to initialize the new instance.

To be added.

## RangeConditionHeaderValue.RangeConditionHeaderValue(String) constructor

```csharp
public RangeConditionHeaderValue (string entityTag);
```

Initializes a new instance of the `RangeConditionHeaderValue` class.

Parameters:

- `entityTag`: An entity tag represented as a string used to initialize the new instance.

To be added.

## RangeConditionHeaderValue.Date property

```csharp
public DateTimeOffset? Date { get; }
```

Gets the date from the `RangeConditionHeaderValue` object.

Returns: The date from the `RangeConditionHeaderValue` object.

To be added.

## RangeConditionHeaderValue.EntityTag property

```csharp
public System.Net.Http.Headers.EntityTagHeaderValue? EntityTag { get; }
```

Gets the entity tag from the `RangeConditionHeaderValue` object.

Returns: The entity tag from the `RangeConditionHeaderValue` object.

To be added.

## RangeConditionHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `RangeConditionHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## RangeConditionHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `RangeConditionHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `RangeConditionHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## RangeConditionHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.RangeConditionHeaderValue Parse (string input);
```

Converts a string to an `RangeConditionHeaderValue` instance.

Parameters:

- `input`: A string that represents range condition header value information.

Returns: A `RangeConditionHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid range Condition header value information.

To be added.

## RangeConditionHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `RangeConditionHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `RangeConditionHeaderValue` instance is cast to an `ICloneable` interface.

## RangeConditionHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `RangeConditionHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## RangeConditionHeaderValue.TryParse(String, RangeConditionHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.RangeConditionHeaderValue? parsedValue);
```

Determines whether a string is valid `RangeConditionHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `RangeConditionHeaderValue` version of the string.

Returns: `true` if `input` is valid `RangeConditionHeaderValue` information; otherwise, `false`.

To be added.
