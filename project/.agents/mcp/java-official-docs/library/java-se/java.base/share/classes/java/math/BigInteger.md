---
title: "BigInteger class (java.math) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/math/BigInteger.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BigInteger class (java.math)

```java
public class BigInteger extends Number implements Comparable<BigInteger>
```

Immutable arbitrary-precision integers.  All operations behave as if
BigIntegers were represented in two's-complement notation (like Java's
primitive integer types).  BigInteger provides analogues to all of Java's
primitive integer operators, and all relevant methods from java.lang.Math.
Additionally, BigInteger provides operations for modular arithmetic, GCD
calculation, primality testing, prime generation, bit manipulation,
and a few other miscellaneous operations.

Semantics of arithmetic operations exactly mimic those of Java's integer
arithmetic operators, as defined in *The Java Language Specification*.
For example, division by zero throws an `ArithmeticException`, and
division of a negative by a positive yields a negative (or zero) remainder.

Semantics of shift operations extend those of Java's shift operators
to allow for negative shift distances.  A right-shift with a negative
shift distance results in a left shift, and vice-versa.  The unsigned
right shift operator (`>>>`) is omitted since this operation
only makes sense for a fixed sized word and not for a
representation conceptually having an infinite number of leading
virtual sign bits.

Semantics of bitwise logical operations exactly mimic those of Java's
bitwise integer operators.  The binary operators (`and`,
`or`, `xor`) implicitly perform sign extension on the shorter
of the two operands prior to performing the operation.

Comparison operations perform signed integer comparisons, analogous to
those performed by Java's relational and equality operators.

Modular arithmetic operations are provided to compute residues, perform
exponentiation, and compute multiplicative inverses.  These methods always
return a non-negative result, between `0` and `(modulus - 1)`,
inclusive.

Bit operations operate on a single bit of the two's-complement
representation of their operand.  If necessary, the operand is sign-extended
so that it contains the designated bit.  None of the single-bit
operations can produce a BigInteger with a different sign from the
BigInteger being operated on, as they affect only a single bit, and the
arbitrarily large abstraction provided by this class ensures that conceptually
there are infinitely many "virtual sign bits" preceding each BigInteger.

For the sake of brevity and clarity, pseudo-code is used throughout the
descriptions of BigInteger methods.  The pseudo-code expression
`(i + j)` is shorthand for "a BigInteger whose value is
that of the BigInteger `i` plus that of the BigInteger `j`."
The pseudo-code expression `(i == j)` is shorthand for
"`true` if and only if the BigInteger `i` represents the same
value as the BigInteger `j`."  Other pseudo-code expressions are
interpreted similarly.

All methods and constructors in this class throw
`NullPointerException` when passed
a null object reference for any input parameter.

BigInteger must support values in the range
-2`Integer.MAX_VALUE` (exclusive) to
+2`Integer.MAX_VALUE` (exclusive)
and may support values outside of that range.

An `ArithmeticException` is thrown when a BigInteger
constructor or method would generate a value outside of the
supported range.

The range of probable prime values is limited and may be less than
the full supported positive range of `BigInteger`.
The range must be at least 1 to 2500000000.

**API note:** As `BigInteger` values are
arbitrary precision integers, the algorithmic complexity of the
methods of this class varies and may be superlinear in the size of
the input. For example, a method like `intValue()` would be
expected to run in *O*(1), that is constant time, since with
the current internal representation only a fixed-size component of
the `BigInteger` needs to be accessed to perform the
conversion to `int`. In contrast, a method like `not()`
would be expected to run in *O*(*n*) time where *n*
is the size of the `BigInteger` in bits, that is, to run in
time proportional to the size of the input. For multiplying two
`BigInteger` values of size *n*, a naive multiplication
algorithm would run in time *O*(*n2*) and
theoretical results indicate a multiplication algorithm for numbers
using this category of representation must run in *at least*
*O*(*n* log *n*). Common multiplication
algorithms between the bounds of the naive and theoretical cases
include the Karatsuba multiplication
(*O*(*n1.585*)) and 3-way Toom-Cook
multiplication (*O*(*n1.465*)).

A particular implementation of multiply is free to switch between different algorithms for
different inputs, such as to improve actual running time to produce
the product by using simpler algorithms for smaller inputs even if
the simpler algorithm has a larger asymptotic complexity.

Operations may also allocate and compute on intermediate
results, potentially those allocations may be as large as in
proportion to the running time of the algorithm.

Users of `BigInteger` concerned with bounding the running
time or space of operations can screen out `BigInteger`
values above a chosen magnitude.

**Implementation note:** In the reference implementation, BigInteger constructors and
operations throw `ArithmeticException` when the result is out
of the supported range of
-2`Integer.MAX_VALUE` (exclusive) to
+2`Integer.MAX_VALUE` (exclusive).

**See also:** BigDecimal

**JLS:** 4.2.2 Integer Operations

**Since:** 1.1

## BigInteger.BigInteger(byte[], int, int)

```java
public BigInteger(byte[] val, int off, int len)
```

Translates a byte sub-array containing the two's-complement binary
representation of a BigInteger into a BigInteger.  The sub-array is
specified via an offset into the array and a length.  The sub-array is
assumed to be in *big-endian* byte-order: the most significant
byte is the element at index `off`.  The `val` array is
assumed to be unchanged for the duration of the constructor call.

An `IndexOutOfBoundsException` is thrown if the length of the array
`val` is non-zero and either `off` is negative, `len`
is negative, or `off+len` is greater than the length of
`val`.

Parameters:

- `val`: byte array containing a sub-array which is the big-endian two's-complement binary representation of a BigInteger.
- `off`: the start offset of the binary representation.
- `len`: the number of bytes to use.

**Since:** 9

Throws:

- `NumberFormatException`: `val` is zero bytes long.
- `IndexOutOfBoundsException`: if the provided array offset and length would cause an index into the byte array to be negative or greater than or equal to the array length.

## BigInteger.BigInteger(byte[])

```java
public BigInteger(byte[] val)
```

Translates a byte array containing the two's-complement binary
representation of a BigInteger into a BigInteger.  The input array is
assumed to be in *big-endian* byte-order: the most significant
byte is in the zeroth element.  The `val` array is assumed to be
unchanged for the duration of the constructor call.

Parameters:

- `val`: big-endian two's-complement binary representation of a BigInteger.

Throws:

- `NumberFormatException`: `val` is zero bytes long.

## BigInteger.BigInteger(int, byte[], int, int)

```java
public BigInteger(int signum, byte[] magnitude, int off, int len)
```

Translates the sign-magnitude representation of a BigInteger into a
BigInteger.  The sign is represented as an integer signum value: -1 for
negative, 0 for zero, or 1 for positive.  The magnitude is a sub-array of
a byte array in *big-endian* byte-order: the most significant byte
is the element at index `off`.  A zero value of the length
`len` is permissible, and will result in a BigInteger value of 0,
whether signum is -1, 0 or 1.  The `magnitude` array is assumed to
be unchanged for the duration of the constructor call.

An `IndexOutOfBoundsException` is thrown if the length of the array
`magnitude` is non-zero and either `off` is negative,
`len` is negative, or `off+len` is greater than the length of
`magnitude`.

Parameters:

- `signum`: signum of the number (-1 for negative, 0 for zero, 1 for positive).
- `magnitude`: big-endian binary representation of the magnitude of the number.
- `off`: the start offset of the binary representation.
- `len`: the number of bytes to use.

**Since:** 9

Throws:

- `NumberFormatException`: `signum` is not one of the three legal values (-1, 0, and 1), or `signum` is 0 and `magnitude` contains one or more non-zero bytes.
- `IndexOutOfBoundsException`: if the provided array offset and length would cause an index into the byte array to be negative or greater than or equal to the array length.

## BigInteger.BigInteger(int, byte[])

```java
public BigInteger(int signum, byte[] magnitude)
```

Translates the sign-magnitude representation of a BigInteger into a
BigInteger.  The sign is represented as an integer signum value: -1 for
negative, 0 for zero, or 1 for positive.  The magnitude is a byte array
in *big-endian* byte-order: the most significant byte is the
zeroth element.  A zero-length magnitude array is permissible, and will
result in a BigInteger value of 0, whether signum is -1, 0 or 1.  The
`magnitude` array is assumed to be unchanged for the duration of
the constructor call.

Parameters:

- `signum`: signum of the number (-1 for negative, 0 for zero, 1 for positive).
- `magnitude`: big-endian binary representation of the magnitude of the number.

Throws:

- `NumberFormatException`: `signum` is not one of the three legal values (-1, 0, and 1), or `signum` is 0 and `magnitude` contains one or more non-zero bytes.

## BigInteger.BigInteger(String, int)

```java
public BigInteger(String val, int radix)
```

Translates the String representation of a BigInteger in the
specified radix into a BigInteger.  The String representation
consists of an optional minus or plus sign followed by a
sequence of one or more digits in the specified radix.  The
character-to-digit mapping is provided by int) Character.digit.  The String may
not contain any extraneous characters (whitespace, for
example).

Parameters:

- `val`: String representation of BigInteger.
- `radix`: radix to be used in interpreting `val`.

Throws:

- `NumberFormatException`: `val` is not a valid representation of a BigInteger in the specified radix, or `radix` is outside the range from `Character.MIN_RADIX` to `Character.MAX_RADIX`, inclusive.

## BigInteger.BigInteger(String)

```java
public BigInteger(String val)
```

Translates the decimal String representation of a BigInteger
into a BigInteger.  The String representation consists of an
optional minus or plus sign followed by a sequence of one or
more decimal digits.  The character-to-digit mapping is
provided by int) Character.digit.  The String may not contain any extraneous
characters (whitespace, for example).

Parameters:

- `val`: decimal String representation of BigInteger.

Throws:

- `NumberFormatException`: `val` is not a valid representation of a BigInteger.

## BigInteger.BigInteger(int, Random)

```java
public BigInteger(int numBits, Random rnd)
```

Constructs a randomly generated BigInteger, uniformly distributed over
the range 0 to (2`numBits` - 1), inclusive.
The uniformity of the distribution assumes that a fair source of random
bits is provided in `rnd`.  Note that this constructor always
constructs a non-negative BigInteger.

Parameters:

- `numBits`: maximum bitLength of the new BigInteger.
- `rnd`: source of randomness to be used in computing the new BigInteger.

**See also:** #bitLength()

Throws:

- `IllegalArgumentException`: `numBits` is negative.

## BigInteger.BigInteger(int, int, Random)

```java
public BigInteger(int bitLength, int certainty, Random rnd)
```

Constructs a randomly generated positive BigInteger that is probably
prime, with the specified bitLength.

Parameters:

- `bitLength`: bitLength of the returned BigInteger.
- `certainty`: a measure of the uncertainty that the caller is willing to tolerate. The probability that the new BigInteger represents a prime number will exceed (1 - 1/2`certainty`). The execution time of this constructor is proportional to the value of this parameter.
- `rnd`: source of random bits used to select candidates to be tested for primality.

**API note:** It is recommended that the probablePrime
method be used in preference to this constructor unless there
is a compelling need to specify a certainty.

**See also:** #bitLength()

Throws:

- `ArithmeticException`: `bitLength < 2` or `bitLength` is too large.

## BigInteger.probablePrime(int, Random)

```java
public static BigInteger probablePrime(int bitLength, Random rnd)
```

Returns a positive BigInteger that is probably prime, with the
specified bitLength. The probability that a BigInteger returned
by this method is composite does not exceed 2-100.

Parameters:

- `bitLength`: bitLength of the returned BigInteger.
- `rnd`: source of random bits used to select candidates to be tested for primality.

**Returns:** a BigInteger of `bitLength` bits that is probably prime

**See also:** #bitLength()

**Since:** 1.4

Throws:

- `ArithmeticException`: `bitLength < 2` or `bitLength` is too large.

## BigInteger.nextProbablePrime()

```java
public BigInteger nextProbablePrime()
```

Returns the first integer greater than this `BigInteger` that
is probably prime.  The probability that the number returned by this
method is composite does not exceed 2-100. This method will
never skip over a prime when searching: if it returns `p`, there
is no prime `q` such that `this < q < p`.

**Returns:** the first integer greater than this `BigInteger` that
        is probably prime.

**Implementation note:** Due to the nature of the underlying algorithm,
         and depending on the size of `this`,
         this method could consume a large amount of memory, up to
         exhaustion of available heap space, or could run for a long time.

**Since:** 1.5

Throws:

- `ArithmeticException`: `this < 0` or `this` is too large.

## BigInteger.valueOf(long)

```java
public static BigInteger valueOf(long val)
```

Returns a BigInteger whose value is equal to that of the
specified `long`.

Parameters:

- `val`: value of the BigInteger to return.

**API note:** This static factory method is provided in preference
to a (`long`) constructor because it allows for reuse of
frequently used BigIntegers.

**Returns:** a BigInteger with the specified value.

## BigInteger.ZERO

```java
public static final BigInteger ZERO
```

The BigInteger constant zero.

**Since:** 1.2

## BigInteger.ONE

```java
public static final BigInteger ONE
```

The BigInteger constant one.

**Since:** 1.2

## BigInteger.TWO

```java
public static final BigInteger TWO
```

The BigInteger constant two.

**Since:** 9

## BigInteger.TEN

```java
public static final BigInteger TEN
```

The BigInteger constant ten.

**Since:** 1.5
