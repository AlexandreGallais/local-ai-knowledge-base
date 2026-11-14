---
title: "TimeSpan struct (part 4 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TimeSpan.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeSpan struct (part 4 of 11)

## TimeSpan.FromSeconds(Int64, Int64, Int64) method

```csharp
public static TimeSpan FromSeconds (long seconds, long milliseconds = 0, long microseconds = 0);
```

Initializes a new instance of the `TimeSpan` structure to a specified number of seconds, milliseconds, and microseconds.

Parameters:

- `seconds`: Number of seconds.
- `milliseconds`: Number of milliseconds.
- `microseconds`: Number of microseconds.

Returns: Returns a `TimeSpan` that represents a specified number of seconds, milliseconds, and microseconds.

Exceptions:

- `ArgumentOutOfRangeException`: The parameters specify a `TimeSpan` value less than `TimeSpan.MinValue` or greater than `TimeSpan.MaxValue`.

To be added.

## TimeSpan.FromTicks(Int64) method

```csharp
public static TimeSpan FromTicks (long value);
```

Returns a `TimeSpan` that represents a specified time, where the specification is in units of ticks.

Parameters:

- `value`: A number of ticks that represent a time.

Returns: An object that represents `value`.

#### Remarks
This is a convenience method with the same behavior as the `%23ctor` constructor. A single tick represents one hundred nanoseconds or one ten-millionth of a second. There are 10,000 ticks in a millisecond.

#### Examples
The following example creates several `TimeSpan` objects using the `TimeSpan.FromTicks` method.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/FromDays/fromticks.cs._

## TimeSpan.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash code for this instance.

Returns: A 32-bit signed integer hash code.

#### Remarks
Two `TimeSpan` objects might have the same hash code even though they represent different time values.

#### Examples
The following example generates the hash codes of several `TimeSpan` objects using the `TimeSpan.GetHashCode` method.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/GetHashCode/hashcode.cs._

## TimeSpan.Multiply(Double) method

```csharp
public TimeSpan Multiply (double factor);
```

Returns a new `TimeSpan` object which value is the result of multiplication of this instance and the specified `factor`.

Parameters:

- `factor`: The value to be multiplied by.

Returns: A new object that represents the value of this instance multiplied by the value of `factor`.

To be added.

## TimeSpan.Negate() method

```csharp
public TimeSpan Negate ();
```

Returns a new `TimeSpan` object whose value is the negated value of this instance.

Returns: A new object with the same numeric value as this instance, but with the opposite sign.

Exceptions:

- `OverflowException`: The negated value of this instance cannot be represented by a `TimeSpan`; that is, the value of this instance is <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see>.

#### Examples
The following example applies the `TimeSpan.Negate` method to several `TimeSpan` objects.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Duration/dura_nega_una.cs._

## TimeSpan.op_Addition(TimeSpan, TimeSpan) method

```csharp
public static TimeSpan operator + (TimeSpan t1, TimeSpan t2);
```

Adds two specified `TimeSpan` instances.

Parameters:

- `t1`: The first time interval to add.
- `t2`: The second time interval to add.

Returns: An object whose value is the sum of the values of `t1` and `t2`.

Exceptions:

- `OverflowException`: The resulting `TimeSpan` is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

#### Remarks
The `TimeSpan.op_Addition` method defines the addition operator for `TimeSpan` values. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/TimeSpan/op_Addition/operators1.cs._

Languages that do not support custom operators can call the `TimeSpan.Add` method instead.

The equivalent method for this operator is `Add`

## TimeSpan.op_Division(TimeSpan, Double) method

```csharp
public static TimeSpan operator / (TimeSpan timeSpan, double divisor);
```

Returns a new `TimeSpan` object whose value is the result of dividing the specified `timeSpan` by the specified `divisor`.

Parameters:

- `timeSpan`: The dividend or value to be divided.
- `divisor`: The divisor or value to be divided by.

Returns: A new object that represents the value of `timeSpan` divided by the value of `divisor`.

To be added.

## TimeSpan.op_Division(TimeSpan, TimeSpan) method

```csharp
public static double operator / (TimeSpan t1, TimeSpan t2);
```

Returns a new `Double` value that's the result of dividing `t1` by `t2`.

Parameters:

- `t1`: The dividend or value to be divided.
- `t2`: The divisor or value to be divided by.

Returns: A new value that represents result of dividing `t1` by the value of `t2`.

To be added.

## TimeSpan.op_Equality(TimeSpan, TimeSpan) method

```csharp
public static bool operator == (TimeSpan t1, TimeSpan t2);
```

Indicates whether two `TimeSpan` instances are equal.

Parameters:

- `t1`: The first time interval to compare.
- `t2`: The second time interval to compare.

Returns: `true` if the values of `t1` and `t2` are equal; otherwise, `false`.

The equivalent method for this operator is `Equals`

#### Examples
The following example compares several `TimeSpan` objects to a reference `TimeSpan` using the `TimeSpan.op_Equality` operator.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/op_Equality/relationalops.cs._

## TimeSpan.op_GreaterThan(TimeSpan, TimeSpan) method

```csharp
public static bool operator > (TimeSpan t1, TimeSpan t2);
```

Indicates whether a specified `TimeSpan` is greater than another specified `TimeSpan`.

Parameters:

- `t1`: The first time interval to compare.
- `t2`: The second time interval to compare.

Returns: `true` if the value of `t1` is greater than the value of `t2`; otherwise, `false`.

The equivalent method for this operator is `Compare`

#### Examples
The following example compares several `TimeSpan` objects to a reference `TimeSpan` using the `TimeSpan.op_GreaterThan` operator.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/op_Equality/relationalops.cs._

## TimeSpan.op_GreaterThanOrEqual(TimeSpan, TimeSpan) method

```csharp
public static bool operator >= (TimeSpan t1, TimeSpan t2);
```

Indicates whether a specified `TimeSpan` is greater than or equal to another specified `TimeSpan`.

Parameters:

- `t1`: The first time interval to compare.
- `t2`: The second time interval to compare.

Returns: `true` if the value of `t1` is greater than or equal to the value of `t2`; otherwise, `false`.

The equivalent method for this operator is `Compare`

#### Examples
The following example compares several `TimeSpan` objects to a reference `TimeSpan` using the `TimeSpan.op_GreaterThanOrEqual` operator.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/op_Equality/relationalops.cs._

## TimeSpan.op_Inequality(TimeSpan, TimeSpan) method

```csharp
public static bool operator != (TimeSpan t1, TimeSpan t2);
```

Indicates whether two `TimeSpan` instances are not equal.

Parameters:

- `t1`: The first time interval to compare.
- `t2`: The second time interval to compare.

Returns: `true` if the values of `t1` and `t2` are not equal; otherwise, `false`.

The equivalent method for this operator is `Compare`

#### Examples
The following example compares several `TimeSpan` objects to a reference `TimeSpan` using the `TimeSpan.op_Inequality` operator.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/op_Equality/relationalops.cs._

## TimeSpan.op_LessThan(TimeSpan, TimeSpan) method

```csharp
public static bool operator < (TimeSpan t1, TimeSpan t2);
```

Indicates whether a specified `TimeSpan` is less than another specified `TimeSpan`.

Parameters:

- `t1`: The first time interval to compare.
- `t2`: The second time interval to compare.

Returns: `true` if the value of `t1` is less than the value of `t2`; otherwise, `false`.

The equivalent method for this operator is `Compare`

#### Examples
The following example compares several `TimeSpan` objects to a reference `TimeSpan` using the `TimeSpan.op_LessThan` operator.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/op_Equality/relationalops.cs._

## TimeSpan.op_LessThanOrEqual(TimeSpan, TimeSpan) method

```csharp
public static bool operator <= (TimeSpan t1, TimeSpan t2);
```

Indicates whether a specified `TimeSpan` is less than or equal to another specified `TimeSpan`.

Parameters:

- `t1`: The first time interval to compare.
- `t2`: The second time interval to compare.

Returns: `true` if the value of `t1` is less than or equal to the value of `t2`; otherwise, `false`.

The equivalent method for this operator is `Compare`

#### Examples
The following example compares several `TimeSpan` objects to a reference `TimeSpan` using the `TimeSpan.op_LessThanOrEqual` operator.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/op_Equality/relationalops.cs._

## TimeSpan.op_Multiply(Double, TimeSpan) method

```csharp
public static TimeSpan operator * (double factor, TimeSpan timeSpan);
```

Returns a new `TimeSpan` object whose value is the result of multiplying the specified `factor` and the specified `timeSpan` instance.

Parameters:

- `factor`: The value to be multiplied by.
- `timeSpan`: The value to be multiplied.

Returns: A new object that represents the value of the specified `factor` multiplied by the value of the specified `timeSpan` instance.

To be added.

## TimeSpan.op_Multiply(TimeSpan, Double) method

```csharp
public static TimeSpan operator * (TimeSpan timeSpan, double factor);
```

Returns a new `TimeSpan` object whose value is the result of multiplying the specified `timeSpan` instance and the specified `factor`.

Parameters:

- `timeSpan`: The value to be multiplied.
- `factor`: The value to be multiplied by.

Returns: A new object that represents the value of the specified `timeSpan` instance multiplied by the value of the specified `factor`.

To be added.

## TimeSpan.op_Subtraction(TimeSpan, TimeSpan) method

```csharp
public static TimeSpan operator - (TimeSpan t1, TimeSpan t2);
```

Subtracts a specified `TimeSpan` from another specified `TimeSpan`.

Parameters:

- `t1`: The minuend.
- `t2`: The subtrahend.

Returns: An object whose value is the result of the value of `t1` minus the value of `t2`.

Exceptions:

- `OverflowException`: The return value is less than <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see> or greater than <see cref="F:System.TimeSpan.MaxValue">TimeSpan.MaxValue</see>.

The equivalent method for this operator is `Subtract`

#### Examples
The following example uses the `TimeSpan` subtraction operator to calculate the total length of the weekly work day. It also uses the `TimeSpan` addition operator to compute the total time of the daily breaks before using it in a subtraction operation to compute the total actual daily working time.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/op_Addition/Subtraction1.cs._

## TimeSpan.op_UnaryNegation(TimeSpan) method

```csharp
public static TimeSpan operator - (TimeSpan t);
```

Returns a `TimeSpan` whose value is the negated value of the specified instance.

Parameters:

- `t`: The time interval to be negated.

Returns: An object that has the same numeric value as this instance, but the opposite sign.

Exceptions:

- `OverflowException`: The negated value of this instance cannot be represented by a `TimeSpan`; that is, the value of this instance is <see cref="F:System.TimeSpan.MinValue">TimeSpan.MinValue</see>.

The equivalent method for this operator is `Negate`

#### Examples
The following example applies the `TimeSpan.op_UnaryNegation` operator to several `TimeSpan` objects.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Duration/dura_nega_una.cs._

## TimeSpan.op_UnaryPlus(TimeSpan) method

```csharp
public static TimeSpan operator + (TimeSpan t);
```

Returns the specified instance of `TimeSpan`.

Parameters:

- `t`: The time interval to return.

Returns: The time interval specified by `t`.

#### Examples
The following example applies the `TimeSpan.op_UnaryPlus` operator to several `TimeSpan` objects.

_Code sample not included: ~/snippets/csharp/System/TimeSpan/Duration/dura_nega_una.cs._
