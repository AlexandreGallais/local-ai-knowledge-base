---
title: "MidpointRounding enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/MidpointRounding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MidpointRounding enum

Namespace: `System`

```csharp
public enum MidpointRounding
```

Specifies the strategy that mathematical rounding methods should use to round a number.

Use the `MidpointRounding` enumeration with appropriate overloads of `Math.Round`, `MathF.Round`, and `Decimal.Round` to provide more control of the rounding process.

Despite the enumeration's name, not every mode is only about how midpoints are handled. `MidpointRounding` defines two overall rounding strategies—*round to nearest* and *directed rounding*—and each enumeration field participates in exactly one of these strategies:

- The *round-to-nearest* modes (`AwayFromZero` and `ToEven`) always round to the nearest representable value. They only differ from each other when the input is exactly halfway between two values (a *midpoint*), which is what the enumeration's name refers to.
- The *directed rounding* modes (`ToNegativeInfinity`, `ToPositiveInfinity`, and `ToZero`) always round every value—not just midpoints—in a fixed direction. The result is the nearest representable value in that direction, even when the input isn't a midpoint.

#### Round to nearest

Fields:

- `AwayFromZero`
- `ToEven`

A round-to-nearest operation takes an original number with an implicit or specified precision; examines the next digit, which is at that precision plus one; and returns the nearest number with the same precision as the original number. For positive numbers, if the next digit is from 0 through 4, the nearest number is toward negative infinity. If the next digit is from 6 through 9, the nearest number is toward positive infinity. For negative numbers, if the next digit is from 0 through 4, the nearest number is toward positive infinity. If the next digit is from 6 through 9, the nearest number is toward negative infinity.

If the next digit is from 0 through 4 or 6 through 9, the choice between `AwayFromZero` and `ToEven` doesn't affect the result of the rounding operation. However, if the next digit is 5, which is the midpoint between two possible results, and all remaining digits are zero or there are no remaining digits, the nearest number is ambiguous. In this case, the round-to-nearest modes in `MidpointRounding` enable you to specify whether the rounding operation returns the nearest number away from zero or the nearest even number.

The following table demonstrates the results of rounding some negative and positive numbers in conjunction with round-to-nearest modes. The precision used to round the numbers is zero, which means the number after the decimal point affects the rounding operation. For example, for the number -2.5, the digit after the decimal point is 5. Because that digit is the midpoint, you can use a `MidpointRounding` value to determine the result of rounding. If `AwayFromZero` is specified, -3 is returned because it is the nearest number away from zero with a precision of zero. If `ToEven` is specified, -2 is returned because it is the nearest even number with a precision of zero.

| Original number | AwayFromZero | ToEven |
|-----------------|--------------|--------|
| 3.5             | 4            | 4      |
| 2.8             | 3            | 3      |
| 2.5             | 3            | 2      |
| 2.1             | 2            | 2      |
| -2.1            | -2           | -2     |
| -2.5            | -3           | -2     |
| -2.8            | -3           | -3     |
| -3.5            | -4           | -4     |

#### Directed rounding

Fields:

- `ToNegativeInfinity`
- `ToPositiveInfinity`
- `ToZero`

A directed-rounding operation takes an original number with an implicit or specified precision and returns the next closest number in a specific direction with the same precision as the original number. Directed modes on `MidpointRounding` control the direction toward which every value is rounded. Unlike the round-to-nearest modes, these modes apply to every input value, not just midpoints; for example, `ToPositiveInfinity` rounds 2.1, 2.5, and 2.8 all up to 3.

The following table demonstrates the results of rounding some negative and positive numbers in conjunction with directed-rounding modes. The precision used to round the numbers is zero, which means the number before the decimal point is affected by the rounding operation.

| Original number | ToNegativeInfinity | ToPositiveInfinity | ToZero |
|-----------------|--------------------|--------------------|--------|
| 3.5             | 3                  | 4                  | 3      |
| 2.8             | 2                  | 3                  | 2      |
| 2.5             | 2                  | 3                  | 2      |
| 2.1             | 2                  | 3                  | 2      |
| -2.1            | -3                 | -2                 | -2     |
| -2.5            | -3                 | -2                 | -2     |
| -2.8            | -3                 | -2                 | -2     |
| -3.5            | -4                 | -3                 | -3     |

The following example demonstrates the `Math.Round` method in conjunction with the `MidpointRounding` enumeration:

_Code sample not included: ~/snippets/csharp/System/Decimal/Round/mpr.cs._

## MidpointRounding.AwayFromZero field

```csharp
AwayFromZero
```

The strategy of rounding to the nearest number. When a number is halfway between two others, it's rounded toward the nearest number that's away from zero. Non-midpoint values are unaffected by this choice and are rounded to the nearest representable value.

## MidpointRounding.ToEven field

```csharp
ToEven
```

The strategy of rounding to the nearest number. When a number is halfway between two others, it's rounded toward the nearest even number. Non-midpoint values are unaffected by this choice and are rounded to the nearest representable value. Also known as banker's rounding.

## MidpointRounding.ToNegativeInfinity field

```csharp
ToNegativeInfinity
```

The strategy of downwards-directed rounding, where every value—not just midpoints—is rounded toward negative infinity. The result is the value closest to and no greater than the infinitely precise result. When rounding to zero digits, this is equivalent to the mathematical floor function; when rounding to a non-zero number of digits, it applies the same behavior at the specified precision.

## MidpointRounding.ToPositiveInfinity field

```csharp
ToPositiveInfinity
```

The strategy of upwards-directed rounding, where every value—not just midpoints—is rounded toward positive infinity. The result is the value closest to and no less than the infinitely precise result. When rounding to zero digits, this is equivalent to the mathematical ceiling function; when rounding to a non-zero number of digits, it applies the same behavior at the specified precision.

## MidpointRounding.ToZero field

```csharp
ToZero
```

The strategy of directed rounding toward zero, where every value—not just midpoints—is rounded toward zero. The result is the value closest to and no greater in magnitude than the infinitely precise result. When rounding to zero digits, this is equivalent to truncation; when rounding to a non-zero number of digits, it truncates toward zero at the specified precision.
