---
title: "Double struct (part 14 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Double.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Double struct (part 14 of 14)

## Double.NaN field

```csharp
public const double NaN = NaN;
```

Represents a value that is not a number (`NaN`). This field is constant.

A method or operator returns `NaN` when the result of an operation is undefined. For example, the result of dividing zero by zero is `NaN`, as the following example shows. (However, dividing a non-zero number by zero returns either `PositiveInfinity` or `NegativeInfinity`, depending on the sign of the divisor.)

_Code sample not included: ~/snippets/csharp/System/Double/NaN/nan1.cs._

In addition, a method call with a `NaN` value or an operation on a `NaN` value returns `NaN`, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Double/NaN/nan1.cs._

Use the `Double.IsNaN` method to determine whether a value is not a number. The `Double.op_Equality` operator considers two `NaN` values to be unequal to one another. In general, `Double` operators cannot be used to compare `NaN` with other `Double` values, although comparison methods (such as `Double.Equals` and `Double.CompareTo`) can. The following example illustrates the difference in behavior between `Double` comparison operators and methods.

_Code sample not included: ~/snippets/csharp/System/Double/NaN/double.nan4.cs._

#### Examples

The following example illustrates the use of `NaN`.

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/doublesample.cs._

## Double.NegativeInfinity field

```csharp
public const double NegativeInfinity = -Infinity;
```

Represents negative infinity. This field is constant.

The value of this constant is the result of dividing a negative number by zero.

This constant is returned when the result of an operation is less than `MinValue`.

Use `Double.IsNegativeInfinity` to determine whether a value evaluates to negative infinity.

#### Examples

The following code example illustrates the use of `NegativeInfinity`:

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/doublesample.cs._

## Double.NegativeZero field

```csharp
public const double NegativeZero = 0;
```

Represents the number negative zero (-0).

To be added.

## Double.Pi field

```csharp
public const double Pi = 3.<example-card-number>;
```

Represents the ratio of the circumference of a circle to its diameter, specified by the constant, π.

#### Remarks

Pi is approximately 3.1415926535897932385.

## Double.PositiveInfinity field

```csharp
public const double PositiveInfinity = Infinity;
```

Represents positive infinity. This field is constant.

The value of this constant is the result of dividing a positive number by zero.

This constant is returned when the result of an operation is greater than `MaxValue`.

Use `Double.IsPositiveInfinity` to determine whether a value evaluates to positive infinity.

#### Examples

The following code example illustrates the use of `PositiveInfinity`:

_Code sample not included: ~/snippets/csharp/System/Double/CompareTo/doublesample.cs._

## Double.Tau field

```csharp
public const double Tau = 6.<example-card-number>;
```

Represents the number of radians in one turn, specified by the constant, τ.

#### Remarks

Tau is approximately 6.2831853071795864769.
