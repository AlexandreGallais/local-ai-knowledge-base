---
title: "Single struct (part 14 of 14)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Single.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Single struct (part 14 of 14)

## Single.NaN field

```csharp
public const float NaN = NaN;
```

Represents not a number (`NaN`). This field is constant.

#### Remarks
A method or operator returns `NaN` when the result of an operation is undefined. For example, the result of dividing zero by zero is `NaN`, as the following example shows. (But note that dividing a non-zero number by zero returns either `PositiveInfinity` or `NegativeInfinity`, depending on the sign of the divisor.)

_Code sample not included: ~/snippets/csharp/System/Single/NaN/nan1.cs._

In addition, a method call with a `NaN` value or an operation on a `NaN` value returns `NaN`, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/Single/NaN/nan1.cs._

Use the `Single.IsNaN` method to determine whether a value is not a number. In general, `Single` operators cannot be used to compare `NaN` with other `Single` values, although comparison methods (such as `Single.Equals` and `Single.CompareTo`) can. The following example illustrates the difference in behavior between `Single` comparison operators and methods.

_Code sample not included: ~/snippets/csharp/System/Single/NaN/single.nan4.cs._

#### Examples
The following example demonstrates the `NaN` constant.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/singlesample.cs._

## Single.NegativeInfinity field

```csharp
public const float NegativeInfinity = -Infinity;
```

Represents negative infinity. This field is constant.

#### Remarks
The value of this constant is the result of dividing a negative number by zero.

This constant is returned when the result of an operation is less than `MinValue`.

Use `Single.IsNegativeInfinity` to determine whether a value evaluates to negative infinity.

#### Examples
The following code example demonstrates the `NegativeInfinity` constant.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/singlesample.cs._

## Single.NegativeZero field

```csharp
public const float NegativeZero = 0;
```

Represents the number negative zero (-0).

To be added.

## Single.Pi field

```csharp
public const float Pi = 3.14159274;
```

Represents the ratio of the circumference of a circle to its diameter, specified by the constant, π.

#### Remarks

Pi is approximately 3.1415926535897932385.

## Single.PositiveInfinity field

```csharp
public const float PositiveInfinity = Infinity;
```

Represents positive infinity. This field is constant.

#### Remarks
The value of this constant is the result of dividing a positive number by zero.

This constant is returned when the result of an operation is greater than `MaxValue`.

Use `Single.IsPositiveInfinity` to determine whether a value evaluates to positive infinity.

#### Examples
The following code example demonstrates the `PositiveInfinity` constant.

_Code sample not included: ~/snippets/csharp/System/Single/CompareTo/singlesample.cs._

## Single.Tau field

```csharp
public const float Tau = 6.28318548;
```

Represents the number of radians in one turn, specified by the constant, τ.

#### Remarks

Tau is approximately 6.2831853071795864769.
