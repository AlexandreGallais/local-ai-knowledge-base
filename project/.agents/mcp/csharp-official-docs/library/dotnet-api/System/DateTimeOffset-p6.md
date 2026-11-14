---
title: "DateTimeOffset struct (part 6 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 6 of 15)

## DateTimeOffset.FromUnixTimeMilliseconds(Int64) method

```csharp
public static DateTimeOffset FromUnixTimeMilliseconds (long milliseconds);
```

Converts a Unix time expressed as the number of milliseconds that have elapsed since 1970-01-01T00:00:00Z to a `DateTimeOffset` value.

Parameters:

- `milliseconds`: A Unix time, expressed as the number of milliseconds that have elapsed since 1970-01-01T00:00:00Z (January 1, 1970, at 12:00 AM UTC). For Unix times before this date, its value is negative.

Returns: A date and time value that represents the same moment in time as the Unix time.

Exceptions:

- `ArgumentOutOfRangeException`: `milliseconds` is less than  -62,135,596,800,000.

-or-

`milliseconds` is greater than 253,402,300,799,999.

#### Remarks
The `Offset` property value of the returned `DateTimeOffset` instance is `Zero`, which represents Coordinated Universal Time. You can convert it to the time in a specific time zone by calling the `ConvertTime` method.

## DateTimeOffset.FromUnixTimeSeconds(Int64) method

```csharp
public static DateTimeOffset FromUnixTimeSeconds (long seconds);
```

Converts a Unix time expressed as the number of seconds that have elapsed since 1970-01-01T00:00:00Z to a `DateTimeOffset` value.

Parameters:

- `seconds`: A Unix time, expressed as the number of seconds that have elapsed since 1970-01-01T00:00:00Z (January 1, 1970, at 12:00 AM UTC). For Unix times before this date, its value is negative.

Returns: A date and time value that represents the same moment in time as the Unix time.

Exceptions:

- `ArgumentOutOfRangeException`: `seconds` is less than  -62,135,596,800.

-or-

`seconds` is greater than 253,402,300,799.

#### Remarks
The `Offset` property value of the returned `DateTimeOffset` instance is `Zero`, which represents Coordinated Universal Time. You can convert it to the time in a specific time zone by calling the `ConvertTime` method.

## DateTimeOffset.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `DateTimeOffset` object.

Returns: A 32-bit signed integer hash code.

To be added.

## DateTimeOffset.op_Addition(DateTimeOffset, TimeSpan) method

```csharp
public static DateTimeOffset operator + (DateTimeOffset dateTimeOffset, TimeSpan timeSpan);
```

Adds a specified time interval to a `DateTimeOffset` object that has a specified date and time, and yields a `DateTimeOffset` object that has new a date and time.

Parameters:

- `dateTimeOffset`: The object to add the time interval to.
- `timeSpan`: The time interval to add.

Returns: An object whose value is the sum of the values of `dateTimeTz` and `timeSpan`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` value is greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
The `DateTimeOffset.op_Addition` method defines the addition operation for `DateTimeOffset` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/op_Addition/Operators.cs._

Languages that do not support custom operators and operator overloading can call the `DateTimeOffset.Add` method instead.

The equivalent method for this operator is `Add`.

## DateTimeOffset.op_Equality(DateTimeOffset, DateTimeOffset) method

```csharp
public static bool operator == (DateTimeOffset left, DateTimeOffset right);
```

Determines whether two specified `DateTimeOffset` objects represent the same point in time.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if both `DateTimeOffset` objects have the same `DateTimeOffset.UtcDateTime` value; otherwise, `false`.

#### Remarks
The `DateTimeOffset.op_Equality` method defines the operation of the equality operator for `DateTimeOffset` objects. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/op_Addition/Operators.cs._

Before evaluating the `left` and `right` operands for equality, the operator converts both values to Coordinated Universal Time (UTC). The operation is equivalent to the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Compare/Syntax.cs._

In other words, the `DateTimeOffset.op_Equality` method determines whether the two `DateTimeOffset` objects represent a single point in time. It directly compares neither dates and times nor offsets. To determine whether two `DateTimeOffset` objects represent the same time and have the same offset value, use the `DateTimeOffset.EqualsExact` method.

The equivalent method for this operator is `Equals`

## DateTimeOffset.op_GreaterThan(DateTimeOffset, DateTimeOffset) method

```csharp
public static bool operator > (DateTimeOffset left, DateTimeOffset right);
```

Determines whether one specified `DateTimeOffset` object is greater than (or later than) a second specified `DateTimeOffset` object.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if the `DateTimeOffset.UtcDateTime` value of `left` is later than the `DateTimeOffset.UtcDateTime` value of `right`; otherwise, `false`.

#### Remarks
The `DateTimeOffset.op_GreaterThan` method defines the operation of the greater than operator for `DateTimeOffset` objects. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/op_Addition/Operators.cs._

Languages that do not support custom operators can call the `DateTimeOffset.Compare` method instead. They can also call the `DateTimeOffset.op_GreaterThan` method directly, as the following example shows.

Before evaluating the `left` and `right` operands, the operator converts both values to Coordinated Universal Time (UTC). The operation is equivalent to the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Compare/Syntax.cs._

The equivalent method for this operator is `Compare`

## DateTimeOffset.op_GreaterThanOrEqual(DateTimeOffset, DateTimeOffset) method

```csharp
public static bool operator >= (DateTimeOffset left, DateTimeOffset right);
```

Determines whether one specified `DateTimeOffset` object is greater than or equal to a second specified `DateTimeOffset` object.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if the `DateTimeOffset.UtcDateTime` value of `left` is the same as or later than the `DateTimeOffset.UtcDateTime` value of `right`; otherwise, `false`.

#### Remarks
The `DateTimeOffset.op_GreaterThan` method defines the operation of the greater than or equal to operator for `DateTimeOffset` objects. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/op_Addition/Operators.cs._

Languages that do not support custom operators can call the `DateTimeOffset.Compare` method instead. Some languages can also call the `DateTimeOffset.op_GreaterThanOrEqual` method directly, as the following example shows.

Before evaluating the `left` and `right` operands, the operator converts both values to Coordinated Universal Time (UTC). The operation is equivalent to the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Compare/Syntax.cs._

The equivalent method for this operator is `Compare`

## DateTimeOffset.op_Implicit(DateTime) method

```csharp
public static implicit operator DateTimeOffset (DateTime dateTime);
```

Defines an implicit conversion of a `DateTime` object to a `DateTimeOffset` object.

Parameters:

- `dateTime`: The object to convert.

Returns: The converted object.

Exceptions:

- `ArgumentOutOfRangeException`: The Coordinated Universal Time (UTC) date and time that results from applying the offset is earlier than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The UTC date and time that results from applying the offset is later than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
The `DateTimeOffset.op_Implicit` method enables the compiler to automatically convert a `DateTime` object to a `DateTimeOffset` object without an explicit casting operator (in C#) or a call to a conversion function (in Visual Basic). It defines a widening conversion that does not involve data loss and does not throw an `OverflowException`. The `DateTimeOffset.op_Implicit` method makes code such as the following possible:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/op_Addition/Operators.cs._

This method is equivalent to the `DateTimeOffset.%23ctor` constructor. The offset of the resulting `DateTimeOffset` object depends on the value of the `Kind` property of the `dateTime` parameter:

- If the value of the `Kind` property is `Utc`, the date and time of the `DateTimeOffset` object is set equal to `dateTime`, and its `Offset` property is set equal to 0.

- If the value of the `Kind` property is `Local` or `Unspecified`, the date and time of the `DateTimeOffset` object is set equal to `dateTime`, and its `Offset` property is set equal to the offset of the local system's current time zone.

The equivalent method for this operator is `%23ctor`

## DateTimeOffset.op_Inequality(DateTimeOffset, DateTimeOffset) method

```csharp
public static bool operator != (DateTimeOffset left, DateTimeOffset right);
```

Determines whether two specified `DateTimeOffset` objects refer to different points in time.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` and `right` do not have the same `DateTimeOffset.UtcDateTime` value; otherwise, `false`.

#### Remarks
The `DateTimeOffset.op_Inequality` method defines the operation of the inequality operator for `DateTimeOffset` objects. It always returns the opposite result from `DateTimeOffset.op_Equality`. The `DateTimeOffset.op_Inequality` method enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/op_Addition/Operators.cs._

Before evaluating the `left` and `right` operands for equality, the operator converts both values to Coordinated Universal Time (UTC). The operation is equivalent to the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Compare/Syntax.cs._

In other words, the `DateTimeOffset.op_Inequality` method determines whether the two `DateTimeOffset` objects represent different points in time. It directly compares neither dates and times nor offsets.

Languages that do not support custom operators can call the `DateTimeOffset.Compare` method instead. In addition, some languages can also call the `DateTimeOffset.op_Inequality` method directly, as the following example shows.

The equivalent method for this operator is `Compare`

## DateTimeOffset.op_LessThan(DateTimeOffset, DateTimeOffset) method

```csharp
public static bool operator < (DateTimeOffset left, DateTimeOffset right);
```

Determines whether one specified `DateTimeOffset` object is less than a second specified `DateTimeOffset` object.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if the `DateTimeOffset.UtcDateTime` value of `left` is earlier than the `DateTimeOffset.UtcDateTime` value of `right`; otherwise, `false`.

#### Remarks
The `DateTimeOffset.op_LessThan` method defines the operation of the less than operator for `DateTimeOffset` objects. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/op_Addition/Operators.cs._

Before evaluating the `left` and `right` operands, the operator converts both operands to Coordinated Universal Time (UTC). The operation is equivalent to the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Compare/Syntax.cs._

Languages that do not support custom operators can call the `DateTimeOffset.Compare` method instead. In addition, some languages can also call the `DateTimeOffset.op_LessThan` method directly, as the following example shows.

The equivalent method for this operator is `Compare`

## DateTimeOffset.op_LessThanOrEqual(DateTimeOffset, DateTimeOffset) method

```csharp
public static bool operator <= (DateTimeOffset left, DateTimeOffset right);
```

Determines whether one specified `DateTimeOffset` object is less than a second specified `DateTimeOffset` object.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if the `DateTimeOffset.UtcDateTime` value of `left` is earlier than the `DateTimeOffset.UtcDateTime` value of `right`; otherwise, `false`.

#### Remarks
The `DateTimeOffset.op_LessThanOrEqual` method defines the operation of the less than or equal to operator for `DateTimeOffset` objects. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/op_Addition/Operators.cs._

Languages that do not support custom operators can call the `DateTimeOffset.Compare` method instead. Some languages can also call the `DateTimeOffset.op_LessThanOrEqual` method directly, as the following example shows.

Before evaluating the `left` and `right` operands, the operator converts both values to Coordinated Universal Time (UTC). The operation is equivalent to the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Compare/Syntax.cs._

The equivalent method for this operator is `Compare`

## DateTimeOffset.op_Subtraction(DateTimeOffset, DateTimeOffset) method

```csharp
public static TimeSpan operator - (DateTimeOffset left, DateTimeOffset right);
```

Subtracts one `DateTimeOffset` object from another and yields a time interval.

Parameters:

- `left`: The minuend.
- `right`: The subtrahend.

Returns: An object that represents the difference between `left` and `right`.

#### Remarks
The `DateTimeOffset.op_Subtraction` method defines the subtraction operation for `DateTimeOffset` objects. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/op_Addition/Operators.cs._

Languages that do not support custom operators and operator overloading can call the `Subtract` method instead.

The equivalent method for this operator is `Subtract`.
