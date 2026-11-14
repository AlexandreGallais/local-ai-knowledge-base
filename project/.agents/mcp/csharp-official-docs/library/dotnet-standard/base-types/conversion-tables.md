---
title: "Type Conversion Tables"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/conversion-tables.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Type conversion tables in .NET

Widening conversion occurs when a value of one type is converted to another type that is of equal or greater size. A narrowing conversion occurs when a value of one type is converted to a value of another type that is of a smaller size. The tables in this topic illustrate the behaviors exhibited by both types of conversions.

## Widening conversions

The following table describes the widening conversions that can be performed without the loss of information.

| Type | Can be converted without data loss to |
|------|---------------------------------------|
|`System.Byte`|`System.UInt16`, `System.Int16`, `System.UInt32`, `System.Int32`, `System.UInt64`, `System.Int64`, `System.Single`, `System.Double`, `System.Decimal`|
|`System.SByte`|`System.Int16`, `System.Int32`, `System.Int64`, `System.Single`, `System.Double`, `System.Decimal`|
|`System.Int16`|`System.Int32`, `System.Int64`, `System.Single`, `System.Double`, `System.Decimal`|
|`System.UInt16`|`System.UInt32`, `System.Int32`, `System.UInt64`, `System.Int64`, `System.Single`, `System.Double`, `System.Decimal`|
|`System.Char`|`System.UInt16`, `System.UInt32`, `System.Int32`, `System.UInt64`, `System.Int64`, `System.Single`, `System.Double`, `System.Decimal`|
|`System.Int32`|`System.Int64`, `System.Double`, `System.Decimal`|
|`System.UInt32`|`System.Int64`, `System.UInt64`, `System.Double`, `System.Decimal`|
|`System.Int64`|`System.Decimal`|
|`System.UInt64`|`System.Decimal`|
|`System.Single`|`System.Double`|

Some widening conversions to `System.Single` or `System.Double` can cause a loss of precision. The following table describes the widening conversions that sometimes result in a loss of information.

| Type | Can be converted to |
|------|---------------------|
|`System.Int32`|`System.Single`|
|`System.UInt32`|`System.Single`|
|`System.Int64`|`System.Single`, `System.Double`|
|`System.UInt64`|`System.Single`, `System.Double`|
|`System.Decimal`|`System.Single`, `System.Double`|

## Narrowing conversions

A narrowing conversion to `System.Single` or `System.Double` can cause a loss of information. If the target type cannot properly express the magnitude of the source, the resulting type is set to the constant `PositiveInfinity` or `NegativeInfinity`. `PositiveInfinity` results from dividing a positive number by zero and is also returned when the value of a `System.Single` or `System.Double` exceeds the value of the `MaxValue` field. `NegativeInfinity` results from dividing a negative number by zero and is also returned when the value of a `System.Single` or `System.Double` falls below the value of the `MinValue` field. A conversion from a `System.Double` to a `System.Single` might result in `PositiveInfinity` or `NegativeInfinity`.

A narrowing conversion can also result in a loss of information for other data types. However, an `System.OverflowException` is thrown if the value of a type that is being converted falls outside of the range specified by the target type's `MaxValue` and `MinValue` fields, and the conversion is checked by the runtime to ensure that the value of the target type does not exceed its `MaxValue` or `MinValue`. Conversions that are performed with the `System.Convert` class are always checked in this manner.

The following table lists conversions that throw an `System.OverflowException` using `System.Convert` or any checked conversion if the value of the type being converted is outside the defined range of the resulting type.

| Type | Can be converted to |
|------|---------------------|
|`System.Byte`|`System.SByte`|
|`System.SByte`|`System.Byte`, `System.UInt16`, `System.UInt32`, `System.UInt64`|
|`System.Int16`|`System.Byte`, `System.SByte`, `System.UInt16`|
|`System.UInt16`|`System.Byte`, `System.SByte`, `System.Int16`|
|`System.Int32`|`System.Byte`, `System.SByte`, `System.Int16`, `System.UInt16`,`System.UInt32`|
|`System.UInt32`|`System.Byte`, `System.SByte`, `System.Int16`, `System.UInt16`, `System.Int32`|
|`System.Int64`|`System.Byte`, `System.SByte`, `System.Int16`, `System.UInt16`, `System.Int32`,`System.UInt32`,`System.UInt64`|
|`System.UInt64`|`System.Byte`, `System.SByte`, `System.Int16`, `System.UInt16`, `System.Int32`, `System.UInt32`, `System.Int64`|
|`System.Decimal`|`System.Byte`, `System.SByte`, `System.Int16`, `System.UInt16`, `System.Int32`, `System.UInt32`, `System.Int64`, `System.UInt64`|
|`System.Single`|`System.Byte`, `System.SByte`, `System.Int16`, `System.UInt16`, `System.Int32`, `System.UInt32`, `System.Int64`, `System.UInt64`|
|`System.Double`|`System.Byte`, `System.SByte`, `System.Int16`, `System.UInt16`, `System.Int32`, `System.UInt32`, `System.Int64`, `System.UInt64`|

## See also

- `System.Convert`
- Type Conversion in .NET
