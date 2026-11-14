---
title: "RetryConditionHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/RetryConditionHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RetryConditionHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class RetryConditionHeaderValue : ICloneable
```

Represents a Retry-After header value that can either be a date/time or a timespan value.

#### Remarks
The `RetryConditionHeaderValue` class provides support for the Retry-After header as defined in RFC 2616 by the IETF.

## RetryConditionHeaderValue.RetryConditionHeaderValue(DateTimeOffset) constructor

```csharp
public RetryConditionHeaderValue (DateTimeOffset date);
```

Initializes a new instance of the `RetryConditionHeaderValue` class.

Parameters:

- `date`: The date and time offset used to initialize the new instance.

To be added.

## RetryConditionHeaderValue.RetryConditionHeaderValue(TimeSpan) constructor

```csharp
public RetryConditionHeaderValue (TimeSpan delta);
```

Initializes a new instance of the `RetryConditionHeaderValue` class.

Parameters:

- `delta`: The delta, in seconds, used to initialize the new instance.

To be added.

## RetryConditionHeaderValue.Date property

```csharp
public DateTimeOffset? Date { get; }
```

Gets the date and time offset from the `RetryConditionHeaderValue` object.

Returns: The date and time offset from the `RetryConditionHeaderValue` object.

To be added.

## RetryConditionHeaderValue.Delta property

```csharp
public TimeSpan? Delta { get; }
```

Gets the delta in seconds from the `RetryConditionHeaderValue` object.

Returns: The delta in seconds from the `RetryConditionHeaderValue` object.

To be added.

## RetryConditionHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `RetryConditionHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## RetryConditionHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `RetryConditionHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `RetryConditionHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## RetryConditionHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.RetryConditionHeaderValue Parse (string input);
```

Converts a string to an `RetryConditionHeaderValue` instance.

Parameters:

- `input`: A string that represents retry condition header value information.

Returns: A `RetryConditionHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid retry condition header value information.

To be added.

## RetryConditionHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `RetryConditionHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `RetryConditionHeaderValue` instance is cast to an `ICloneable` interface.

## RetryConditionHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `RetryConditionHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## RetryConditionHeaderValue.TryParse(String, RetryConditionHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.RetryConditionHeaderValue? parsedValue);
```

Determines whether a string is valid `RetryConditionHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `RetryConditionHeaderValue` version of the string.

Returns: `true` if `input` is valid `RetryConditionHeaderValue` information; otherwise, `false`.

To be added.
