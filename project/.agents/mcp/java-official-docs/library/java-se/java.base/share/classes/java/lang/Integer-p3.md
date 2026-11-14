---
title: "Integer class (java.lang) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Integer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Integer class (java.lang) (part 3 of 3)

## Integer.toUnsignedLong(int)

```java
public static long toUnsignedLong(int x)
```

Converts the argument to a `long` by an unsigned
conversion.  In an unsigned conversion to a `long`, the
high-order 32 bits of the `long` are zero and the
low-order 32 bits are equal to the bits of the integer
argument.

Consequently, zero and positive `int` values are mapped
to a numerically equal `long` value and negative `int` values are mapped to a `long` value equal to the
input plus 232.

Parameters:

- `x`: the value to convert to an unsigned `long`

**Returns:** the argument converted to `long` by an unsigned
        conversion

**Since:** 1.8

## Integer.divideUnsigned(int, int)

```java
public static int divideUnsigned(int dividend, int divisor)
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

## Integer.remainderUnsigned(int, int)

```java
public static int remainderUnsigned(int dividend, int divisor)
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

## Integer.SIZE

```java
public static final int SIZE
```

The number of bits used to represent an `int` value in two's
complement binary form.

**Since:** 1.5

## Integer.BYTES

```java
public static final int BYTES
```

The number of bytes used to represent an `int` value in two's
complement binary form.

**Since:** 1.8

## Integer.highestOneBit(int)

```java
public static int highestOneBit(int i)
```

Returns an `int` value with at most a single one-bit, in the
position of the highest-order ("leftmost") one-bit in the specified
`int` value.  Returns zero if the specified value has no
one-bits in its two's complement binary representation, that is, if it
is equal to zero.

Parameters:

- `i`: the value whose highest one bit is to be computed

**Returns:** an `int` value with a single one-bit, in the position
    of the highest-order one-bit in the specified value, or zero if
    the specified value is itself equal to zero.

**Since:** 1.5

## Integer.lowestOneBit(int)

```java
public static int lowestOneBit(int i)
```

Returns an `int` value with at most a single one-bit, in the
position of the lowest-order ("rightmost") one-bit in the specified
`int` value.  Returns zero if the specified value has no
one-bits in its two's complement binary representation, that is, if it
is equal to zero.

Parameters:

- `i`: the value whose lowest one bit is to be computed

**Returns:** an `int` value with a single one-bit, in the position
    of the lowest-order one-bit in the specified value, or zero if
    the specified value is itself equal to zero.

**Since:** 1.5

## Integer.numberOfLeadingZeros(int)

```java
public static int numberOfLeadingZeros(int i)
```

Returns the number of zero bits preceding the highest-order
("leftmost") one-bit in the two's complement binary representation
of the specified `int` value.  Returns 32 if the
specified value has no one-bits in its two's complement representation,
in other words if it is equal to zero.

Note that this method is closely related to the logarithm base 2.
For all positive `int` values x:

- floor(log2(x)) = `31 - numberOfLeadingZeros(x)`

- ceil(log2(x)) = `32 - numberOfLeadingZeros(x - 1)`

Parameters:

- `i`: the value whose number of leading zeros is to be computed

**Returns:** the number of zero bits preceding the highest-order
    ("leftmost") one-bit in the two's complement binary representation
    of the specified `int` value, or 32 if the value
    is equal to zero.

**Since:** 1.5

## Integer.numberOfTrailingZeros(int)

```java
public static int numberOfTrailingZeros(int i)
```

Returns the number of zero bits following the lowest-order ("rightmost")
one-bit in the two's complement binary representation of the specified
`int` value.  Returns 32 if the specified value has no
one-bits in its two's complement representation, in other words if it is
equal to zero.

Parameters:

- `i`: the value whose number of trailing zeros is to be computed

**Returns:** the number of zero bits following the lowest-order ("rightmost")
    one-bit in the two's complement binary representation of the
    specified `int` value, or 32 if the value is equal
    to zero.

**Since:** 1.5

## Integer.bitCount(int)

```java
public static int bitCount(int i)
```

Returns the number of one-bits in the two's complement binary
representation of the specified `int` value.  This function is
sometimes referred to as the *population count*.

Parameters:

- `i`: the value whose bits are to be counted

**Returns:** the number of one-bits in the two's complement binary
    representation of the specified `int` value.

**Since:** 1.5

## Integer.rotateLeft(int, int)

```java
public static int rotateLeft(int i, int distance)
```

Returns the value obtained by rotating the two's complement binary
representation of the specified `int` value left by the
specified number of bits.  (Bits shifted out of the left hand, or
high-order, side reenter on the right, or low-order.)

Note that left rotation with a negative distance is equivalent to
right rotation: `rotateLeft(val, -distance) == rotateRight(val, distance)`.  Note also that rotation by any multiple of 32 is a
no-op, so all but the last five bits of the rotation distance can be
ignored, even if the distance is negative: `rotateLeft(val, distance) == rotateLeft(val, distance & 0x1F)`.

Parameters:

- `i`: the value whose bits are to be rotated left
- `distance`: the number of bit positions to rotate left

**Returns:** the value obtained by rotating the two's complement binary
    representation of the specified `int` value left by the
    specified number of bits.

**Since:** 1.5

## Integer.rotateRight(int, int)

```java
public static int rotateRight(int i, int distance)
```

Returns the value obtained by rotating the two's complement binary
representation of the specified `int` value right by the
specified number of bits.  (Bits shifted out of the right hand, or
low-order, side reenter on the left, or high-order.)

Note that right rotation with a negative distance is equivalent to
left rotation: `rotateRight(val, -distance) == rotateLeft(val, distance)`.  Note also that rotation by any multiple of 32 is a
no-op, so all but the last five bits of the rotation distance can be
ignored, even if the distance is negative: `rotateRight(val, distance) == rotateRight(val, distance & 0x1F)`.

Parameters:

- `i`: the value whose bits are to be rotated right
- `distance`: the number of bit positions to rotate right

**Returns:** the value obtained by rotating the two's complement binary
    representation of the specified `int` value right by the
    specified number of bits.

**Since:** 1.5

## Integer.reverse(int)

```java
public static int reverse(int i)
```

Returns the value obtained by reversing the order of the bits in the
two's complement binary representation of the specified `int`
value.

Parameters:

- `i`: the value to be reversed

**Returns:** the value obtained by reversing order of the bits in the
    specified `int` value.

**Since:** 1.5

## Integer.compress(int, int)

```java
public static int compress(int i, int mask)
```

Returns the value obtained by compressing the bits of the
specified `int` value, `i`, in accordance with
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

## Integer.expand(int, int)

```java
public static int expand(int i, int mask)
```

Returns the value obtained by expanding the bits of the
specified `int` value, `i`, in accordance with
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
index `n` in a `int` value can be implemented as follows:

**Returns:** the expanded value

**See also:** #compress

**Since:** 19

## Integer.signum(int)

```java
public static int signum(int i)
```

Returns the signum function of the specified `int` value.  (The
return value is -1 if the specified value is negative; 0 if the
specified value is zero; and 1 if the specified value is positive.)

Parameters:

- `i`: the value whose signum is to be computed

**Returns:** the signum function of the specified `int` value.

**Since:** 1.5

## Integer.reverseBytes(int)

```java
public static int reverseBytes(int i)
```

Returns the value obtained by reversing the order of the bytes in the
two's complement representation of the specified `int` value.

Parameters:

- `i`: the value whose bytes are to be reversed

**Returns:** the value obtained by reversing the bytes in the specified
    `int` value.

**Since:** 1.5

## Integer.sum(int, int)

```java
public static int sum(int a, int b)
```

Adds two integers together as per the + operator.

Parameters:

- `a`: the first operand
- `b`: the second operand

**Returns:** the sum of `a` and `b`

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Integer.max(int, int)

```java
public static int max(int a, int b)
```

Returns the greater of two `int` values
as if by calling int) Math.max.

Parameters:

- `a`: the first operand
- `b`: the second operand

**Returns:** the greater of `a` and `b`

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Integer.min(int, int)

```java
public static int min(int a, int b)
```

Returns the smaller of two `int` values
as if by calling int) Math.min.

Parameters:

- `a`: the first operand
- `b`: the second operand

**Returns:** the smaller of `a` and `b`

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Integer.describeConstable()

```java
public Optional<Integer> describeConstable()
```

Returns an `Optional` containing the nominal descriptor for this
instance, which is the instance itself.

**Returns:** an `Optional` describing the `Integer` instance

**Since:** 12

## Integer.resolveConstantDesc(MethodHandles.Lookup)

```java
public Integer resolveConstantDesc(MethodHandles.Lookup lookup)
```

Resolves this instance as a `ConstantDesc`, the result of which is
the instance itself.

Parameters:

- `lookup`: ignored

**Returns:** the `Integer` instance

**Since:** 12
