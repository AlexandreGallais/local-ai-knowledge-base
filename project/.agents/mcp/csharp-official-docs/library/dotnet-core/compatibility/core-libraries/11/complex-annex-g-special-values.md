---
title: "Breaking change: System.Numerics.Complex special-value results now follow C23 Annex G"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/11/complex-annex-g-special-values.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.Numerics.Complex special-value results now follow C23 Annex G

`System.Numerics.Complex` arithmetic operators and math functions now produce the special-value results (for signed zeros, infinities, and NaNs) required by C23 Annex G (IEC 60559-compatible complex arithmetic). Because `Complex` now delegates most of its implementation to the new `Complex<double>` type, the conformant special-value handling flows through to it.

## Version introduced

.NET 11

## Previous behavior

Previously, for non-finite (and some overflowing) inputs, `Complex` arithmetic and elementary functions frequently returned `(NaN, NaN)` even when a directed infinity or signed result was mathematically appropriate.

```csharp
using System.Numerics;

Complex.Atan(new Complex(double.PositiveInfinity, 1.0)); // (NaN, NaN)
Complex.Acos(new Complex(double.NegativeInfinity, double.NaN)); // (NaN, NaN)
Complex.Cosh(new Complex(double.PositiveInfinity, double.PositiveInfinity)); // (NaN, NaN)

// An infinite operand could collapse the product to NaN:
new Complex(double.PositiveInfinity, double.PositiveInfinity) * new Complex(1.0, 0.0); // (NaN, NaN)
```

## New behavior

Starting in .NET 11, the same inputs return the C23 Annex G special values.

```csharp
using System.Numerics;

Complex.Atan(new Complex(double.PositiveInfinity, 1.0)); // (π/2, 0)
Complex.Acos(new Complex(double.NegativeInfinity, double.NaN)); // (NaN, +∞)
Complex.Cosh(new Complex(double.PositiveInfinity, double.PositiveInfinity)); // (+∞, NaN)

// An infinite operand now yields a directed infinity (Annex G.5.1 recovery):
new Complex(double.PositiveInfinity, double.PositiveInfinity) * new Complex(1.0, 0.0); // (+∞, +∞)
```

Division by a zero divisor is likewise governed by Annex G: the result is a directed infinity, or NaN for `0/0`. For example, `(1, 0) / (0, 0)` yields an infinite real component rather than a fully NaN result.

The change spans `operator *`, `operator /`, `Multiply`, `Divide`, `Reciprocal`, `Abs`, `Pow`, and the elementary functions (`Sqrt`, `Exp`, `Log`, `Log10`, and the trigonometric, hyperbolic, and inverse-trigonometric functions). One case Annex G leaves explicitly unspecified, that is, the sign of a zero-valued quotient component from `operator /`, might also differ.

## Type of breaking change

This change is a behavioral change.

## Reason for change

Complex numbers are outside the scope of IEEE 754 itself, so C23 Annex G is the relevant specification of the special-value behavior IEEE 754 otherwise implies for the scalar operations complex arithmetic is built on. The previous implementation returned `NaN` for many inputs where Annex G requires a directed infinity or a signed result, which is both non-conformant and less useful for downstream numerical code, because it lost the sign or direction information that an infinite intermediate value carries. The new generic `Complex<T>` type was made conformant, and the shipped `Complex` type inherits that conformance by delegation.

For more information, see dotnet/runtime#131132.

## Recommended action

Most code benefits from the more accurate results and needs no change. If your code explicitly depends on the previous `(NaN, NaN)` results for special-value inputs, update it to expect the Annex G values. Such code might be tests that assert `NaN` for `Complex` operations on infinities, or logic that treats any non-finite input as producing `NaN`.

There's no compatibility switch to restore the previous behavior.

## Affected APIs

- `System.Numerics.Complex.op_Multiply(System.Numerics.Complex,System.Numerics.Complex)`
- `System.Numerics.Complex.op_Division(System.Numerics.Complex,System.Numerics.Complex)`
- `System.Numerics.Complex.Multiply(System.Numerics.Complex,System.Numerics.Complex)`
- `System.Numerics.Complex.Divide(System.Numerics.Complex,System.Numerics.Complex)`
- `System.Numerics.Complex.Reciprocal(System.Numerics.Complex)`
- `System.Numerics.Complex.Abs(System.Numerics.Complex)`
- `System.Numerics.Complex.Pow(System.Numerics.Complex,System.Numerics.Complex)` and `System.Numerics.Complex.Pow(System.Numerics.Complex,System.Double)`
- `System.Numerics.Complex.Sqrt(System.Numerics.Complex)`
- `System.Numerics.Complex.Exp(System.Numerics.Complex)`
- `System.Numerics.Complex.Log(System.Numerics.Complex)` (all overloads) and `System.Numerics.Complex.Log10(System.Numerics.Complex)`
- `System.Numerics.Complex.Sin(System.Numerics.Complex)`, `System.Numerics.Complex.Cos(System.Numerics.Complex)`, `System.Numerics.Complex.Tan(System.Numerics.Complex)`, `System.Numerics.Complex.Sinh(System.Numerics.Complex)`, `System.Numerics.Complex.Cosh(System.Numerics.Complex)`, `System.Numerics.Complex.Tanh(System.Numerics.Complex)`
- `System.Numerics.Complex.Asin(System.Numerics.Complex)`, `System.Numerics.Complex.Acos(System.Numerics.Complex)`, `System.Numerics.Complex.Atan(System.Numerics.Complex)`
