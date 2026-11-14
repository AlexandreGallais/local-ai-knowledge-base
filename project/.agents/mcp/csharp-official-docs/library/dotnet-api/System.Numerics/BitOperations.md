---
title: "BitOperations class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/BitOperations.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BitOperations class

Namespace: `System.Numerics`

```csharp
public static class BitOperations
```

Provides utility methods for intrinsic bit-twiddling operations. The methods use hardware intrinsics when available on the underlying platform; otherwise, they use optimized software fallbacks.

To be added.

## BitOperations.Crc32C(UInt32, Byte) method

```csharp
public static uint Crc32C (uint crc, byte data);
```

Accumulates the CRC (Cyclic redundancy check) checksum.

Parameters:

- `crc`: The base value to calculate checksum on.
- `data`: The data for which to compute the checksum.

Returns: The CRC-checksum.

To be added.

## BitOperations.Crc32C(UInt32, UInt16) method

```csharp
public static uint Crc32C (uint crc, ushort data);
```

Accumulates the CRC (Cyclic redundancy check) checksum.

Parameters:

- `crc`: The base value to calculate checksum on.
- `data`: The data for which to compute the checksum.

Returns: The CRC-checksum.

To be added.

## BitOperations.Crc32C(UInt32, UInt32) method

```csharp
public static uint Crc32C (uint crc, uint data);
```

Accumulates the CRC (Cyclic redundancy check) checksum.

Parameters:

- `crc`: The base value to calculate checksum on.
- `data`: The data for which to compute the checksum.

Returns: The CRC-checksum.

To be added.

## BitOperations.Crc32C(UInt32, UInt64) method

```csharp
public static uint Crc32C (uint crc, ulong data);
```

Accumulates the CRC (Cyclic redundancy check) checksum.

Parameters:

- `crc`: The base value to calculate checksum on.
- `data`: The data for which to compute the checksum.

Returns: The CRC-checksum.

To be added.

## BitOperations.IsPow2(Int32) method

```csharp
public static bool IsPow2 (int value);
```

Evaluates whether the specified `Int32` value is a power of two.

Parameters:

- `value`: The value to evaluate as being a power of two.

Returns: `true` if the specified value is a power of two; `false` otherwise.

To be added.

## BitOperations.IsPow2(Int64) method

```csharp
public static bool IsPow2 (long value);
```

Evaluates whether the specified `Int64` value is a power of two.

Parameters:

- `value`: The value to evaluate as being a power of two.

Returns: `true` if the specified value is a power of two; `false` otherwise.

To be added.

## BitOperations.IsPow2(IntPtr) method

```csharp
public static bool IsPow2 (IntPtr value);
```

Determines whether the specified integral value is a power of 2.

Parameters:

- `value`: The value.

Returns: `true` if the value is a power of 2; `false` otherwise.

To be added.

## BitOperations.IsPow2(UInt32) method

```csharp
public static bool IsPow2 (uint value);
```

Evaluates whether the specified `UInt32` value is a power of two.

Parameters:

- `value`: The value to evaluate as being a power of two.

Returns: `true` if the specified value is a power of two; `false` otherwise.

To be added.

## BitOperations.IsPow2(UInt64) method

```csharp
public static bool IsPow2 (ulong value);
```

Evaluates whether the specified `UInt64` value is a power of two.

Parameters:

- `value`: The value to evaluate as being a power of two.

Returns: `true` if the specified value is a power of two; `false` otherwise.

To be added.

## BitOperations.IsPow2(UIntPtr) method

```csharp
public static bool IsPow2 (UIntPtr value);
```

Determines whether the specified integral value is a power of 2.

Parameters:

- `value`: The value.

Returns: `true` if the value is a power of 2; `false` otherwise.

To be added.

## BitOperations.LeadingZeroCount(UInt32) method

```csharp
public static int LeadingZeroCount (uint value);
```

Counts the number of leading zero bits in an unsigned 32-bit integer mask.

Parameters:

- `value`: The mask.

Returns: The number of leading zero bits in a mask.

#### Remarks

This method is similar in behavior to the x86 instruction LZCNT.

## BitOperations.LeadingZeroCount(UInt64) method

```csharp
public static int LeadingZeroCount (ulong value);
```

Counts the number of leading zero bits in an unsigned 64-bit integer mask.

Parameters:

- `value`: The mask.

Returns: The number of leading zero bits in a mask.

#### Remarks

This method is similar in behavior to the x86 instruction LZCNT.

## BitOperations.LeadingZeroCount(UIntPtr) method

```csharp
public static int LeadingZeroCount (UIntPtr value);
```

Counts the number of leading zero bits in a mask.
Similar in behavior to the x86 instruction LZCNT.

Parameters:

- `value`: The value.

Returns: The count of leading zeros bits in a mask.

To be added.

## BitOperations.Log2(UInt32) method

```csharp
public static int Log2 (uint value);
```

Returns the integer (floor) log of the specified value, base 2.

Parameters:

- `value`: The number from which to obtain the logarithm.

Returns: The log of the specified value, base 2.

#### Remarks

Note that by convention, input value 0 returns 0 since Log(0) is undefined.

## BitOperations.Log2(UInt64) method

```csharp
public static int Log2 (ulong value);
```

Returns the integer (floor) log of the specified value, base 2.

Parameters:

- `value`: The number from which to obtain the logarithm.

Returns: The log of the specified value, base 2.

#### Remarks

Note that by convention, input value 0 returns 0 since Log(0) is undefined.

## BitOperations.Log2(UIntPtr) method

```csharp
public static int Log2 (UIntPtr value);
```

Returns the integer (floor) log of the specified value, base 2.

Parameters:

- `value`: The value.

Returns: The logarithm value.

By convention, input value 0 returns 0 since log(0) is undefined.

## BitOperations.PopCount(UInt32) method

```csharp
public static int PopCount (uint value);
```

Returns the population count (number of bits set) of a mask.

Parameters:

- `value`: The mask.

Returns: The population count of a mask.

#### Remarks

This method is similar in behavior to the x86 instruction POPCNT.

## BitOperations.PopCount(UInt64) method

```csharp
public static int PopCount (ulong value);
```

Returns the population count (number of bits set) of an unsigned 64-bit integer mask.

Parameters:

- `value`: The mask.

Returns: The population count of the mask.

#### Remarks

This method is similar in behavior to the x86 instruction POPCNT.

## BitOperations.PopCount(UIntPtr) method

```csharp
public static int PopCount (UIntPtr value);
```

Returns the population count (number of bits set) of a mask.
Similar in behavior to the x86 instruction POPCNT.

Parameters:

- `value`: The value.

Returns: The population count.

To be added.

## BitOperations.RotateLeft(UInt32, Int32) method

```csharp
public static uint RotateLeft (uint value, int offset);
```

Rotates the specified value left by the specified number of bits.

Parameters:

- `value`: The value to rotate.
- `offset`: The number of bits to rotate by. Any value outside the range [0..31] is treated as congruent mod 32.

Returns: The rotated value.

#### Remarks

This method is similar in behavior to the x86 instruction ROL.

## BitOperations.RotateLeft(UInt64, Int32) method

```csharp
public static ulong RotateLeft (ulong value, int offset);
```

Rotates the specified value left by the specified number of bits.

Parameters:

- `value`: The value to rotate.
- `offset`: The number of bits to rotate by. Any value outside the range [0..63] is treated as congruent mod 64.

Returns: The rotated value.

#### Remarks

This method is similar in behavior to the x86 instruction ROL.

## BitOperations.RotateLeft(UIntPtr, Int32) method

```csharp
public static UIntPtr RotateLeft (UIntPtr value, int offset);
```

Rotates the specified value left by the specified number of bits.
Similar in behavior to the x86 instruction ROL.

Parameters:

- `value`: The value to rotate.
- `offset`: The number of bits to rotate by.
Any value outside the range [0..31] is treated as congruent mod 32 on a 32-bit process, and any value outside the range [0..63] is treated as congruent mod 64 on a 64-bit process.

Returns: The rotated value.

To be added.

## BitOperations.RotateRight(UInt32, Int32) method

```csharp
public static uint RotateRight (uint value, int offset);
```

Rotates the specified value right by the specified number of bits.

Parameters:

- `value`: The value to rotate.
- `offset`: The number of bits to rotate by. Any value outside the range [0..31] is treated as congruent mod 32.

Returns: The rotated value.

#### Remarks

This method is similar in behavior to the x86 instruction ROR.

## BitOperations.RotateRight(UInt64, Int32) method

```csharp
public static ulong RotateRight (ulong value, int offset);
```

Rotates the specified value right by the specified number of bits.

Parameters:

- `value`: The value to rotate.
- `offset`: The number of bits to rotate by. Any value outside the range [0..63] is treated as congruent mod 64.

Returns: The rotated value.

#### Remarks

This method is similar in behavior to the x86 instruction ROR.

## BitOperations.RotateRight(UIntPtr, Int32) method

```csharp
public static UIntPtr RotateRight (UIntPtr value, int offset);
```

Rotates the specified value right by the specified number of bits.
Similar in behavior to the x86 instruction ROR.

Parameters:

- `value`: The value to rotate.
- `offset`: The number of bits to rotate by.
Any value outside the range [0..31] is treated as congruent mod 32 on a 32-bit process, and any value outside the range [0..63] is treated as congruent mod 64 on a 64-bit process.

Returns: The rotated value.

To be added.

## BitOperations.RoundUpToPowerOf2(UInt32) method

```csharp
public static uint RoundUpToPowerOf2 (uint value);
```

Rounds the specified `UInt32` value up to a power of two.

Parameters:

- `value`: The value to round up to a power of two.

Returns: The smallest power of two that's greater than or equal to `value`.
If `value` is 0 or the result overflows, returns 0.

To be added.

## BitOperations.RoundUpToPowerOf2(UInt64) method

```csharp
public static ulong RoundUpToPowerOf2 (ulong value);
```

Rounds the specified `UInt64` value up to a power of two.

Parameters:

- `value`: The value to round up to a power of two.

Returns: The smallest power of two that's greater than or equal to `value`.

If `value` is 0 or the result overflows, returns 0.

To be added.

## BitOperations.RoundUpToPowerOf2(UIntPtr) method

```csharp
public static UIntPtr RoundUpToPowerOf2 (UIntPtr value);
```

Rounds the given integral value up to a power of 2.

Parameters:

- `value`: The value.

Returns: The smallest power of 2 that is greater than or equal to `value`.
If `value` is 0 or the result overflows, returns 0.

To be added.

## BitOperations.TrailingZeroCount(Int32) method

```csharp
public static int TrailingZeroCount (int value);
```

Counts the number of trailing zero bits in an 32-bit integer value mask.

Parameters:

- `value`: The mask.

Returns: The number of trailing zero bits in the integer value.

#### Remarks

This method is similar in behavior to the x86 instruction TZCNT.

## BitOperations.TrailingZeroCount(Int64) method

```csharp
public static int TrailingZeroCount (long value);
```

Counts the number of trailing zero bits in a 64-bit integer value mask.

Parameters:

- `value`: The mask.

Returns: The number of trailing zero bits in the mask.

#### Remarks

This method is similar in behavior to the x86 instruction TZCNT.

## BitOperations.TrailingZeroCount(IntPtr) method

```csharp
public static int TrailingZeroCount (IntPtr value);
```

Counts the number of trailing zero bits in a mask.
Similar in behavior to the x86 instruction TZCNT.

Parameters:

- `value`: The value.

Returns: The count of trailing zero bits in a mask.

To be added.

## BitOperations.TrailingZeroCount(UInt32) method

```csharp
public static int TrailingZeroCount (uint value);
```

Counts the number of trailing zero bits in an unsigned 32-bit integer value mask.

Parameters:

- `value`: The mask.

Returns: The number of trailing zero bits in the mask.

#### Remarks

This method is similar in behavior to the x86 instruction TZCNT.

## BitOperations.TrailingZeroCount(UInt64) method

```csharp
public static int TrailingZeroCount (ulong value);
```

Count the number of trailing zero bits in an unsigned 64-bit integer value mask.

Parameters:

- `value`: The mask.

Returns: The number of trailing zero bits in the mask.

#### Remarks

This method is similar in behavior to the x86 instruction TZCNT.

## BitOperations.TrailingZeroCount(UIntPtr) method

```csharp
public static int TrailingZeroCount (UIntPtr value);
```

Counts the number of trailing zero bits in a mask.
Similar in behavior to the x86 instruction TZCNT.

Parameters:

- `value`: The value.

Returns: The count of trailing zero bits in a mask.

To be added.
