---
title: "Generic math (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/generics/math.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Generic math (part 4 of 4)

### Operator interfaces

The operator interfaces correspond to the various operators available to the C# language.

- They explicitly don't pair operations such as multiplication and division since that isn't correct for all types. For example, `Matrix4x4 * Matrix4x4` is valid, but `Matrix4x4 / Matrix4x4` isn't valid.
- They typically allow the input and result types to differ to support scenarios such as dividing two integers to obtain a `double`, for example, `3 / 2 = 1.5`, or calculating the average of a set of integers.

| Interface name                                     | Defined operators                        |
|----------------------------------------------------|------------------------------------------|
| `System.Numerics.IAdditionOperators`3`      | `x + y`                                  |
| `System.Numerics.IBitwiseOperators`3`       | `x & y`, 'x &#124; y', `x ^ y`, and `~x` |
| `System.Numerics.IComparisonOperators`3`    | `x < y`, `x > y`, `x <= y`, and `x >= y` |
| `System.Numerics.IDecrementOperators`1`     | `--x` and `x--`                          |
| `System.Numerics.IDivisionOperators`3`      | `x / y`                                  |
| `System.Numerics.IEqualityOperators`3`      | `x == y` and `x != y`                    |
| `System.Numerics.IIncrementOperators`1`     | `++x` and `x++`                          |
| `System.Numerics.IModulusOperators`3`       | `x % y`                                  |
| `System.Numerics.IMultiplyOperators`3`      | `x * y`                                  |
| `System.Numerics.IShiftOperators`3`         | `x << y` and `x >> y`                    |
| `System.Numerics.ISubtractionOperators`3`   | `x - y`                                  |
| `System.Numerics.IUnaryNegationOperators`2` | `-x`                                     |
| `System.Numerics.IUnaryPlusOperators`2`     | `+x`                                     |

> **Note:**
> Some of the interfaces define a checked operator in addition to a regular unchecked operator. Checked operators are called in checked contexts and allow a user-defined type to define overflow behavior. If you implement a checked operator, for example, `System.Numerics.ISubtractionOperators`3.op_CheckedSubtraction(`0,`1)`, you must also implement the unchecked operator, for example, `System.Numerics.ISubtractionOperators`3.op_Subtraction(`0,`1)`.

### Function interfaces

The function interfaces define common mathematical APIs that apply more broadly than to a specific numeric interface. These interfaces are all implemented by `System.Numerics.IFloatingPointIeee754`1`, and may get implemented by other relevant types in the future.

| Interface name                                     | Description                                                                                                              |
|----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| `System.Numerics.IExponentialFunctions`1`   | Exposes exponential functions supporting `e^x`, `e^x - 1`, `2^x`, `2^x - 1`, `10^x`, and `10^x - 1`.                     |
| `System.Numerics.IHyperbolicFunctions`1`    | Exposes hyperbolic functions supporting `acosh(x)`, `asinh(x)`, `atanh(x)`, `cosh(x)`, `sinh(x)`, and `tanh(x)`.         |
| `System.Numerics.ILogarithmicFunctions`1`   | Exposes logarithmic functions supporting `ln(x)`, `ln(x + 1)`, `log2(x)`, `log2(x + 1)`, `log10(x)`, and `log10(x + 1)`. |
| `System.Numerics.IPowerFunctions`1`         | Exposes power functions supporting `x^y`.                                                                                |
| `System.Numerics.IRootFunctions`1`          | Exposes root functions supporting `cbrt(x)` and `sqrt(x)`.                                                               |
| `System.Numerics.ITrigonometricFunctions`1` | Exposes trigonometric functions supporting `acos(x)`, `asin(x)`, `atan(x)`, `cos(x)`, `sin(x)`, and `tan(x)`.            |

### Parsing and formatting interfaces

Parsing and formatting are core concepts in programming. They're commonly used when converting user input to a given type or displaying a type to the user. These interfaces are in the `System` namespace.

| Interface name                     | Description                                                                                      |
|------------------------------------|--------------------------------------------------------------------------------------------------|
| `System.IParsable`1` | Exposes support for `T.Parse(string, IFormatProvider)` and `T.TryParse(string, IFormatProvider, out TSelf)`.  |
| `System.ISpanParsable`1` | Exposes support for `T.Parse(ReadOnlySpan<char>, IFormatProvider)` and `T.TryParse(ReadOnlySpan<char>, IFormatProvider, out TSelf)`. |
| `System.IFormattable`1 | Exposes support for `value.ToString(string, IFormatProvider)`. |
| `System.ISpanFormattable`1 | Exposes support for `value.TryFormat(Span<char>, out int, ReadOnlySpan<char>, IFormatProvider)`. |

1This interface isn't new, nor is it generic. However, it's implemented by all number types and represents the inverse operation of `IParsable`.

For example, the following program takes two numbers as input, reading them from the console using a generic method where the type parameter is constrained to be `System.IParsable`1`. It calculates the average using a generic method where the type parameters for the input and result values are constrained to be `System.Numerics.INumber`1`, and then displays the result to the console.

```csharp
using System.Globalization;
using System.Numerics;

static TResult Average<T, TResult>(T first, T second)
    where T : INumber<T>
    where TResult : INumber<TResult>
{
    return TResult.CreateChecked( (first + second) / T.CreateChecked(2) );
}

static T ParseInvariant<T>(string s)
    where T : IParsable<T>
{
    return T.Parse(s, CultureInfo.InvariantCulture);
}

Console.Write("First number: ");
var left = ParseInvariant<float>(Console.ReadLine());

Console.Write("Second number: ");
var right = ParseInvariant<float>(Console.ReadLine());

Console.WriteLine($"Result: {Average<float, float>(left, right)}");

/* This code displays output similar to:

First number: 5.0
Second number: 6
Result: 5.5
*/
```

## See also

- Generic math in .NET 7 (blog post)
