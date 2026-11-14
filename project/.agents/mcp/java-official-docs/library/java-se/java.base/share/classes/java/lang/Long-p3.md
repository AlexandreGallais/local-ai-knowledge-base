---
title: "Long class (java.lang) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Long.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Long class (java.lang) (part 3 of 3)

## Long.divideUnsigned(long, long)

```java
public static long divideUnsigned(long dividend, long divisor)
```

Returns the unsigned quotient of dividing the first argument by
the second where each argument and the result is interpreted as
an unsigned value.

Note that in two's complement arithmetic, the three other
basic <example-value> operations of add, subtract, and multiply are
bit-wise identical if the two operands are regarded as both
being signed or both being unsigned.  Therefore separate `addUnsigned`, etc. methods are not provided.

Parameters:

- `dividend`: the value to be divided
- `divisor`: the value doing the dividing

**Returns:** the unsigned quotient of the first argument divided by
the second argument

**See also:** #remainderUnsigned

**Since:** 1.8

## Long.remainderUnsigned(long, long)

```java
public static long remainderUnsigned(long dividend, long divisor)
```

Returns the unsigned remainder from dividing the first argument
by the second where each argument and the result is interpreted
as an unsigned value.

Parameters:

- `dividend`: the value to be divided
- `divisor`: the value doing the dividing

**Returns:** the unsigned remainder of the first argument divided by
the second argument

**See also:** #divideUnsigned

**Since:** 1.8

## Long.SIZE

```java
public static final int SIZE
```

The number of bits used to represent a `long` value in two's
complement binary form.

**Since:** 1.5

## Long.BYTES

```java
public static final int BYTES
```

The number of bytes used to represent a `long` value in two's
complement binary form.

**Since:** 1.8

## Long.highestOneBit(long)

```java
public static long highestOneBit(long i)
```

Returns a `long` value with at most a single one-bit, in the
position of the highest-order ("leftmost") one-bit in the specified
`long` value.  Returns zero if the specified value has no
one-bits in its two's complement binary representation, that is, if it
is equal to zero.

Parameters:

- `i`: the value whose highest one bit is to be computed

**Returns:** a `long` value with a single one-bit, in the position
    of the highest-order one-bit in the specified value, or zero if
    the specified value is itself equal to zero.

**Since:** 1.5

## Long.lowestOneBit(long)

```java
public static long lowestOneBit(long i)
```

Returns a `long` value with at most a single one-bit, in the
position of the lowest-order ("rightmost") one-bit in the specified
`long` value.  Returns zero if the specified value has no
one-bits in its two's complement binary representation, that is, if it
is equal to zero.

Parameters:

- `i`: the value whose lowest one bit is to be computed

**Returns:** a `long` value with a single one-bit, in the position
    of the lowest-order one-bit in the specified value, or zero if
    the specified value is itself equal to zero.

**Since:** 1.5

## Long.numberOfLeadingZeros(long)

```java
public static int numberOfLeadingZeros(long i)
```

Returns the number of zero bits preceding the highest-order
("leftmost") one-bit in the two's complement binary representation
of the specified `long` value.  Returns 64 if the
specified value has no one-bits in its two's complement representation,
in other words if it is equal to zero.

Note that this method is closely related to the logarithm base 2.
For all positive `long` values x:

- floor(log2(x)) = `63 - numberOfLeadingZeros(x)`

- ceil(log2(x)) = `64 - numberOfLeadingZeros(x - 1)`

Parameters:

- `i`: the value whose number of leading zeros is to be computed

**Returns:** the number of zero bits preceding the highest-order
    ("leftmost") one-bit in the two's complement binary representation
    of the specified `long` value, or 64 if the value
    is equal to zero.

**Since:** 1.5

## Long.numberOfTrailingZeros(long)

```java
public static int numberOfTrailingZeros(long i)
```

Returns the number of zero bits following the lowest-order ("rightmost")
one-bit in the two's complement binary representation of the specified
`long` value.  Returns 64 if the specified value has no
one-bits in its two's complement representation, in other words if it is
equal to zero.

Parameters:

- `i`: the value whose number of trailing zeros is to be computed

**Returns:** the number of zero bits following the lowest-order ("rightmost")
    one-bit in the two's complement binary representation of the
    specified `long` value, or 64 if the value is equal
    to zero.

**Since:** 1.5

## Long.bitCount(long)

```java
public static int bitCount(long i)
```

Returns the number of one-bits in the two's complement binary
representation of the specified `long` value.  This function is
sometimes referred to as the *population count*.

Parameters:

- `i`: the value whose bits are to be counted

**Returns:** the number of one-bits in the two's complement binary
    representation of the specified `long` value.

**Since:** 1.5

## Long.rotateLeft(long, int)

```java
public static long rotateLeft(long i, int distance)
```

Returns the value obtained by rotating the two's complement binary
representation of the specified `long` value left by the
specified number of bits.  (Bits shifted out of the left hand, or
high-order, side reenter on the right, or low-order.)

Note that left rotation with a negative distance is equivalent to
right rotation: `rotateLeft(val, -distance) == rotateRight(val, distance)`.  Note also that rotation by any multiple of 64 is a
no-op, so all but the last six bits of the rotation distance can be
ignored, even if the distance is negative: `rotateLeft(val, distance) == rotateLeft(val, distance & 0x3F)`.

Parameters:

- `i`: the value whose bits are to be rotated left
- `distance`: the number of bit positions to rotate left

**Returns:** the value obtained by rotating the two's complement binary
    representation of the specified `long` value left by the
    specified number of bits.

**Since:** 1.5

## Long.rotateRight(long, int)

```java
public static long rotateRight(long i, int distance)
```

Returns the value obtained by rotating the two's complement binary
representation of the specified `long` value right by the
specified number of bits.  (Bits shifted out of the right hand, or
low-order, side reenter on the left, or high-order.)

Note that right rotation with a negative distance is equivalent to
left rotation: `rotateRight(val, -distance) == rotateLeft(val, distance)`.  Note also that rotation by any multiple of 64 is a
no-op, so all but the last six bits of the rotation distance can be
ignored, even if the distance is negative: `rotateRight(val, distance) == rotateRight(val, distance & 0x3F)`.

Parameters:

- `i`: the value whose bits are to be rotated right
- `distance`: the number of bit positions to rotate right

**Returns:** the value obtained by rotating the two's complement binary
    representation of the specified `long` value right by the
    specified number of bits.

**Since:** 1.5

## Long.reverse(long)

```java
public static long reverse(long i)
```

Returns the value obtained by reversing the order of the bits in the
two's complement binary representation of the specified `long`
value.

Parameters:

- `i`: the value to be reversed

**Returns:** the value obtained by reversing order of the bits in the
    specified `long` value.

**Since:** 1.5

## Long.compress(long, long)

```java
public static long compress(long i, long mask)
```

Returns the value obtained by compressing the bits of the
specified `long` value, `i`, in accordance with
the specified bit mask.

For each one-bit value `mb` of the mask, from least
significant to most significant, the bit value of `i` at
the same bit location as `mb` is assigned to the compressed
value contiguously starting from the least significant bit location.
All the upper remaining bits of the compressed value are set
to zero.

Parameters:

- `i`: the value whose bits are to be compressed
- `mask`: the bit mask

**API note:** Consider the simple case of compressing the digits of a hexadecimal
value:

Starting from the least significant hexadecimal digit at position 0
from the right, the mask `0xFF00FFF0` selects hexadecimal digits
at positions 1, 2, 3, 6 and 7 of `0xCAFEBABE`. The selected digits
occur in the resulting compressed value contiguously from digit position
0 in the same order.

The following identities all return `true` and are helpful to
understand the behaviour of `compress`:

The Sheep And Goats (SAG) operation (see Hacker's Delight, Second Edition, section 7.7)
can be implemented as follows:

**Returns:** the compressed value

**See also:** #expand

**Since:** 19

## Long.expand(long, long)

```java
public static long expand(long i, long mask)
```

Returns the value obtained by expanding the bits of the
specified `long` value, `i`, in accordance with
the specified bit mask.

For each one-bit value `mb` of the mask, from least
significant to most significant, the next contiguous bit value
of `i` starting at the least significant bit is assigned
to the expanded value at the same bit location as `mb`.
All other remaining bits of the expanded value are set to zero.

Parameters:

- `i`: the value whose bits are to be expanded
- `mask`: the bit mask

**API note:** Consider the simple case of expanding the digits of a hexadecimal
value:

Starting from the least significant hexadecimal digit at position 0
from the right, the mask `0xFF00FFF0` selects the first five
hexadecimal digits of `0x0000CABAB`. The selected digits occur
in the resulting expanded value in order at positions 1, 2, 3, 6, and 7.

The following identities all return `true` and are helpful to
understand the behaviour of `expand`:

The select operation for determining the position of the one-bit with
index `n` in a `long` value can be implemented as follows:

**Returns:** the expanded value

**See also:** #compress

**Since:** 19

## Long.signum(long)

```java
public static int signum(long i)
```

Returns the signum function of the specified `long` value.  (The
return value is -1 if the specified value is negative; 0 if the
specified value is zero; and 1 if the specified value is positive.)

Parameters:

- `i`: the value whose signum is to be computed

**Returns:** the signum function of the specified `long` value.

**Since:** 1.5

## Long.reverseBytes(long)

```java
public static long reverseBytes(long i)
```

Returns the value obtained by reversing the order of the bytes in the
two's complement representation of the specified `long` value.

Parameters:

- `i`: the value whose bytes are to be reversed

**Returns:** the value obtained by reversing the bytes in the specified
    `long` value.

**Since:** 1.5

## Long.sum(long, long)

```java
public static long sum(long a, long b)
```

Adds two `long` values together as per the + operator.

Parameters:

- `a`: the first operand
- `b`: the second operand

**Returns:** the sum of `a` and `b`

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Long.max(long, long)

```java
public static long max(long a, long b)
```

Returns the greater of two `long` values
as if by calling long) Math.max.

Parameters:

- `a`: the first operand
- `b`: the second operand

**Returns:** the greater of `a` and `b`

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Long.min(long, long)

```java
public static long min(long a, long b)
```

Returns the smaller of two `long` values
as if by calling long) Math.min.

Parameters:

- `a`: the first operand
- `b`: the second operand

**Returns:** the smaller of `a` and `b`

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Long.describeConstable()

```java
public Optional<Long> describeConstable()
```

Returns an `Optional` containing the nominal descriptor for this
instance, which is the instance itself.

**Returns:** an `Optional` describing the `Long` instance

**Since:** 12

## Long.resolveConstantDesc(MethodHandles.Lookup)

```java
public Long resolveConstantDesc(MethodHandles.Lookup lookup)
```

Resolves this instance as a `ConstantDesc`, the result of which is
the instance itself.

Parameters:

- `lookup`: ignored

**Returns:** the `Long` instance

**Since:** 12
