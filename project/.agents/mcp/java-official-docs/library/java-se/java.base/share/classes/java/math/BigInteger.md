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

<p>Semantics of arithmetic operations exactly mimic those of Java's integer
arithmetic operators, as defined in <i>The Java Language Specification</i>.
For example, division by zero throws an {@code ArithmeticException}, and
division of a negative by a positive yields a negative (or zero) remainder.

<p>Semantics of shift operations extend those of Java's shift operators
to allow for negative shift distances.  A right-shift with a negative
shift distance results in a left shift, and vice-versa.  The unsigned
right shift operator ({@code >>>}) is omitted since this operation
only makes sense for a fixed sized word and not for a
representation conceptually having an infinite number of leading
virtual sign bits.

<p>Semantics of bitwise logical operations exactly mimic those of Java's
bitwise integer operators.  The binary operators ({@code and},
{@code or}, {@code xor}) implicitly perform sign extension on the shorter
of the two operands prior to performing the operation.

<p>Comparison operations perform signed integer comparisons, analogous to
those performed by Java's relational and equality operators.

<p>Modular arithmetic operations are provided to compute residues, perform
exponentiation, and compute multiplicative inverses.  These methods always
return a non-negative result, between {@code 0} and {@code (modulus - 1)},
inclusive.

<p>Bit operations operate on a single bit of the two's-complement
representation of their operand.  If necessary, the operand is sign-extended
so that it contains the designated bit.  None of the single-bit
operations can produce a BigInteger with a different sign from the
BigInteger being operated on, as they affect only a single bit, and the
arbitrarily large abstraction provided by this class ensures that conceptually
there are infinitely many "virtual sign bits" preceding each BigInteger.

<p>For the sake of brevity and clarity, pseudo-code is used throughout the
descriptions of BigInteger methods.  The pseudo-code expression
{@code (i + j)} is shorthand for "a BigInteger whose value is
that of the BigInteger {@code i} plus that of the BigInteger {@code j}."
The pseudo-code expression {@code (i == j)} is shorthand for
"{@code true} if and only if the BigInteger {@code i} represents the same
value as the BigInteger {@code j}."  Other pseudo-code expressions are
interpreted similarly.

<p>All methods and constructors in this class throw
{@code NullPointerException} when passed
a null object reference for any input parameter.

BigInteger must support values in the range
-2<sup>{@code Integer.MAX_VALUE}</sup> (exclusive) to
+2<sup>{@code Integer.MAX_VALUE}</sup> (exclusive)
and may support values outside of that range.

An {@code ArithmeticException} is thrown when a BigInteger
constructor or method would generate a value outside of the
supported range.

The range of probable prime values is limited and may be less than
the full supported positive range of {@code BigInteger}.
The range must be at least 1 to 2<sup>500000000</sup>.

@apiNote
<span id="algorithmicComplexity">As {@code BigInteger} values are
arbitrary precision integers, the algorithmic complexity of the
methods of this class varies and may be superlinear in the size of
the input. For example, a method like {@link intValue()} would be
expected to run in <i>O</i>(1), that is constant time, since with
the current internal representation only a fixed-size component of
the {@code BigInteger} needs to be accessed to perform the
conversion to {@code int}. In contrast, a method like {@link not()}
would be expected to run in <i>O</i>(<i>n</i>) time where <i>n</i>
is the size of the {@code BigInteger} in bits, that is, to run in
time proportional to the size of the input. For multiplying two
{@code BigInteger} values of size <i>n</i>, a naive multiplication
algorithm would run in time <i>O</i>(<i>n<sup>2</sup></i>) and
theoretical results indicate a multiplication algorithm for numbers
using this category of representation must run in <em>at least</em>
<i>O</i>(<i>n</i>&nbsp;log&nbsp;<i>n</i>). Common multiplication
algorithms between the bounds of the naive and theoretical cases
include the Karatsuba multiplication
(<i>O</i>(<i>n<sup>1.585</sup></i>)) and 3-way Toom-Cook
multiplication (<i>O</i>(<i>n<sup>1.465</sup></i>)).</span>

<p>A particular implementation of {@link multiply(BigInteger)
multiply} is free to switch between different algorithms for
different inputs, such as to improve actual running time to produce
the product by using simpler algorithms for smaller inputs even if
the simpler algorithm has a larger asymptotic complexity.

<p>Operations may also allocate and compute on intermediate
results, potentially those allocations may be as large as in
proportion to the running time of the algorithm.

<p>Users of {@code BigInteger} concerned with bounding the running
time or space of operations can screen out {@code BigInteger}
values above a chosen magnitude.

@implNote
In the reference implementation, BigInteger constructors and
operations throw {@code ArithmeticException} when the result is out
of the supported range of
-2<sup>{@code Integer.MAX_VALUE}</sup> (exclusive) to
+2<sup>{@code Integer.MAX_VALUE}</sup> (exclusive).

@see     BigDecimal
@jls     4.2.2 Integer Operations
@author  Josh Bloch
@author  Michael McCloskey
@author  Alan Eliasen
@author  Timothy Buktu
@since 1.1

## BigInteger.BigInteger(byte[], int, int)

```java
public BigInteger(byte[] val, int off, int len)
```

Translates a byte sub-array containing the two's-complement binary
representation of a BigInteger into a BigInteger.  The sub-array is
specified via an offset into the array and a length.  The sub-array is
assumed to be in <i>big-endian</i> byte-order: the most significant
byte is the element at index {@code off}.  The {@code val} array is
assumed to be unchanged for the duration of the constructor call.

An {@code IndexOutOfBoundsException} is thrown if the length of the array
{@code val} is non-zero and either {@code off} is negative, {@code len}
is negative, or {@code off+len} is greater than the length of
{@code val}.

@param  val byte array containing a sub-array which is the big-endian
        two's-complement binary representation of a BigInteger.
@param  off the start offset of the binary representation.
@param  len the number of bytes to use.
@throws NumberFormatException {@code val} is zero bytes long.
@throws IndexOutOfBoundsException if the provided array offset and
        length would cause an index into the byte array to be
        negative or greater than or equal to the array length.
@since 9

## BigInteger.BigInteger(byte[])

```java
public BigInteger(byte[] val)
```

Translates a byte array containing the two's-complement binary
representation of a BigInteger into a BigInteger.  The input array is
assumed to be in <i>big-endian</i> byte-order: the most significant
byte is in the zeroth element.  The {@code val} array is assumed to be
unchanged for the duration of the constructor call.

@param  val big-endian two's-complement binary representation of a
        BigInteger.
@throws NumberFormatException {@code val} is zero bytes long.

## BigInteger.BigInteger(int, byte[], int, int)

```java
public BigInteger(int signum, byte[] magnitude, int off, int len)
```

Translates the sign-magnitude representation of a BigInteger into a
BigInteger.  The sign is represented as an integer signum value: -1 for
negative, 0 for zero, or 1 for positive.  The magnitude is a sub-array of
a byte array in <i>big-endian</i> byte-order: the most significant byte
is the element at index {@code off}.  A zero value of the length
{@code len} is permissible, and will result in a BigInteger value of 0,
whether signum is -1, 0 or 1.  The {@code magnitude} array is assumed to
be unchanged for the duration of the constructor call.

An {@code IndexOutOfBoundsException} is thrown if the length of the array
{@code magnitude} is non-zero and either {@code off} is negative,
{@code len} is negative, or {@code off+len} is greater than the length of
{@code magnitude}.

@param  signum signum of the number (-1 for negative, 0 for zero, 1
        for positive).
@param  magnitude big-endian binary representation of the magnitude of
        the number.
@param  off the start offset of the binary representation.
@param  len the number of bytes to use.
@throws NumberFormatException {@code signum} is not one of the three
        legal values (-1, 0, and 1), or {@code signum} is 0 and
        {@code magnitude} contains one or more non-zero bytes.
@throws IndexOutOfBoundsException if the provided array offset and
        length would cause an index into the byte array to be
        negative or greater than or equal to the array length.
@since 9

## BigInteger.BigInteger(int, byte[])

```java
public BigInteger(int signum, byte[] magnitude)
```

Translates the sign-magnitude representation of a BigInteger into a
BigInteger.  The sign is represented as an integer signum value: -1 for
negative, 0 for zero, or 1 for positive.  The magnitude is a byte array
in <i>big-endian</i> byte-order: the most significant byte is the
zeroth element.  A zero-length magnitude array is permissible, and will
result in a BigInteger value of 0, whether signum is -1, 0 or 1.  The
{@code magnitude} array is assumed to be unchanged for the duration of
the constructor call.

@param  signum signum of the number (-1 for negative, 0 for zero, 1
        for positive).
@param  magnitude big-endian binary representation of the magnitude of
        the number.
@throws NumberFormatException {@code signum} is not one of the three
        legal values (-1, 0, and 1), or {@code signum} is 0 and
        {@code magnitude} contains one or more non-zero bytes.

## BigInteger.BigInteger(String, int)

```java
public BigInteger(String val, int radix)
```

Translates the String representation of a BigInteger in the
specified radix into a BigInteger.  The String representation
consists of an optional minus or plus sign followed by a
sequence of one or more digits in the specified radix.  The
character-to-digit mapping is provided by {@link
Character#digit(char, int) Character.digit}.  The String may
not contain any extraneous characters (whitespace, for
example).

@param val String representation of BigInteger.
@param radix radix to be used in interpreting {@code val}.
@throws NumberFormatException {@code val} is not a valid representation
        of a BigInteger in the specified radix, or {@code radix} is
        outside the range from {@link Character#MIN_RADIX} to
        {@link Character#MAX_RADIX}, inclusive.

## BigInteger.BigInteger(String)

```java
public BigInteger(String val)
```

Translates the decimal String representation of a BigInteger
into a BigInteger.  The String representation consists of an
optional minus or plus sign followed by a sequence of one or
more decimal digits.  The character-to-digit mapping is
provided by {@link Character#digit(char, int)
Character.digit}.  The String may not contain any extraneous
characters (whitespace, for example).

@param val decimal String representation of BigInteger.
@throws NumberFormatException {@code val} is not a valid representation
        of a BigInteger.

## BigInteger.BigInteger(int, Random)

```java
public BigInteger(int numBits, Random rnd)
```

Constructs a randomly generated BigInteger, uniformly distributed over
the range 0 to (2<sup>{@code numBits}</sup> - 1), inclusive.
The uniformity of the distribution assumes that a fair source of random
bits is provided in {@code rnd}.  Note that this constructor always
constructs a non-negative BigInteger.

@param  numBits maximum bitLength of the new BigInteger.
@param  rnd source of randomness to be used in computing the new
        BigInteger.
@throws IllegalArgumentException {@code numBits} is negative.
@see #bitLength()

## BigInteger.BigInteger(int, int, Random)

```java
public BigInteger(int bitLength, int certainty, Random rnd)
```

Constructs a randomly generated positive BigInteger that is probably
prime, with the specified bitLength.

@apiNote It is recommended that the {@link #probablePrime probablePrime}
method be used in preference to this constructor unless there
is a compelling need to specify a certainty.

@param  bitLength bitLength of the returned BigInteger.
@param  certainty a measure of the uncertainty that the caller is
        willing to tolerate.  The probability that the new BigInteger
        represents a prime number will exceed
        (1 - 1/2<sup>{@code certainty}</sup>).  The execution time of
        this constructor is proportional to the value of this parameter.
@param  rnd source of random bits used to select candidates to be
        tested for primality.
@throws ArithmeticException {@code bitLength < 2} or {@code bitLength} is too large.
@see    #bitLength()

## BigInteger.probablePrime(int, Random)

```java
public static BigInteger probablePrime(int bitLength, Random rnd)
```

Returns a positive BigInteger that is probably prime, with the
specified bitLength. The probability that a BigInteger returned
by this method is composite does not exceed 2<sup>-100</sup>.

@param  bitLength bitLength of the returned BigInteger.
@param  rnd source of random bits used to select candidates to be
        tested for primality.
@return a BigInteger of {@code bitLength} bits that is probably prime
@throws ArithmeticException {@code bitLength < 2} or {@code bitLength} is too large.
@see    #bitLength()
@since 1.4

## BigInteger.nextProbablePrime()

```java
public BigInteger nextProbablePrime()
```

Returns the first integer greater than this {@code BigInteger} that
is probably prime.  The probability that the number returned by this
method is composite does not exceed 2<sup>-100</sup>. This method will
never skip over a prime when searching: if it returns {@code p}, there
is no prime {@code q} such that {@code this < q < p}.

@return the first integer greater than this {@code BigInteger} that
        is probably prime.
@throws ArithmeticException {@code this < 0} or {@code this} is too large.
@implNote Due to the nature of the underlying algorithm,
         and depending on the size of {@code this},
         this method could consume a large amount of memory, up to
         exhaustion of available heap space, or could run for a long time.
@since 1.5

## BigInteger.valueOf(long)

```java
public static BigInteger valueOf(long val)
```

Returns a BigInteger whose value is equal to that of the
specified {@code long}.

@apiNote This static factory method is provided in preference
to a ({@code long}) constructor because it allows for reuse of
frequently used BigIntegers.

@param  val value of the BigInteger to return.
@return a BigInteger with the specified value.

## BigInteger.ZERO

```java
public static final BigInteger ZERO
```

The BigInteger constant zero.

@since   1.2

## BigInteger.ONE

```java
public static final BigInteger ONE
```

The BigInteger constant one.

@since   1.2

## BigInteger.TWO

```java
public static final BigInteger TWO
```

The BigInteger constant two.

@since   9

## BigInteger.TEN

```java
public static final BigInteger TEN
```

The BigInteger constant ten.

@since   1.5

## BigInteger.add(BigInteger)

```java
public BigInteger add(BigInteger val)
```

Returns a BigInteger whose value is {@code (this + val)}.

@param  val value to be added to this BigInteger.
@return {@code this + val}

## BigInteger.subtract(BigInteger)

```java
public BigInteger subtract(BigInteger val)
```

Returns a BigInteger whose value is {@code (this - val)}.

@param  val value to be subtracted from this BigInteger.
@return {@code this - val}

## BigInteger.multiply(BigInteger)

```java
public BigInteger multiply(BigInteger val)
```

Returns a BigInteger whose value is {@code (this * val)}.

@implNote An implementation may offer better algorithmic
performance when {@code val == this}.

@param  val value to be multiplied by this BigInteger.
@return {@code this * val}

## BigInteger.parallelMultiply(BigInteger)

```java
public BigInteger parallelMultiply(BigInteger val)
```

Returns a BigInteger whose value is {@code (this * val)}.
When both {@code this} and {@code val} are large, typically
in the thousands of bits, parallel multiply might be used.
This method returns the exact same mathematical result as
{@link #multiply}.

@implNote This implementation may offer better algorithmic
performance when {@code val == this}.

@implNote Compared to {@link #multiply}, an implementation's
parallel multiplication algorithm would typically use more
CPU resources to compute the result faster, and may do so
with a slight increase in memory consumption.

@param  val value to be multiplied by this BigInteger.
@return {@code this * val}
@see #multiply
@since 19

## BigInteger.divide(BigInteger)

```java
public BigInteger divide(BigInteger val)
```

Returns a BigInteger whose value is {@code (this / val)}.

@param  val value by which this BigInteger is to be divided.
@return {@code this / val}
@throws ArithmeticException if {@code val} is zero.

## BigInteger.divideAndRemainder(BigInteger)

```java
public BigInteger[] divideAndRemainder(BigInteger val)
```

Returns an array of two BigIntegers containing {@code (this / val)}
followed by {@code (this % val)}.

@param  val value by which this BigInteger is to be divided, and the
        remainder computed.
@return an array of two BigIntegers: the quotient {@code (this / val)}
        is the initial element, and the remainder {@code (this % val)}
        is the final element.
@throws ArithmeticException if {@code val} is zero.

## BigInteger.remainder(BigInteger)

```java
public BigInteger remainder(BigInteger val)
```

Returns a BigInteger whose value is {@code (this % val)}.

@param  val value by which this BigInteger is to be divided, and the
        remainder computed.
@return {@code this % val}
@throws ArithmeticException if {@code val} is zero.

## BigInteger.pow(int)

```java
public BigInteger pow(int exponent)
```

Returns a BigInteger whose value is <code>(this<sup>exponent</sup>)</code>.
Note that {@code exponent} is an integer rather than a BigInteger.

@param  exponent exponent to which this BigInteger is to be raised.
@return <code>this<sup>exponent</sup></code>
@throws ArithmeticException {@code exponent} is negative.  (This would
        cause the operation to yield a non-integer value.)

## BigInteger.sqrt()

```java
public BigInteger sqrt()
```

Returns the integer square root of this BigInteger.  The integer square
root of the corresponding mathematical integer {@code n} is the largest
mathematical integer {@code s} such that {@code s*s <= n}.  It is equal
to the value of {@code floor(sqrt(n))}, where {@code sqrt(n)} denotes the
real square root of {@code n} treated as a real.  Note that the integer
square root will be less than the real square root if the latter is not
representable as an integral value.

@return the integer square root of {@code this}
@throws ArithmeticException if {@code this} is negative.  (The square
        root of a negative integer {@code val} is
        {@code (i * sqrt(-val))} where <i>i</i> is the
        <i>imaginary unit</i> and is equal to
        {@code sqrt(-1)}.)
@since  9

## BigInteger.sqrtAndRemainder()

```java
public BigInteger[] sqrtAndRemainder()
```

Returns an array of two BigIntegers containing the integer square root
{@code s} of {@code this} and its remainder {@code this - s*s},
respectively.

@return an array of two BigIntegers with the integer square root at
        offset 0 and the remainder at offset 1
@throws ArithmeticException if {@code this} is negative.  (The square
        root of a negative integer {@code val} is
        {@code (i * sqrt(-val))} where <i>i</i> is the
        <i>imaginary unit</i> and is equal to
        {@code sqrt(-1)}.)
@see #sqrt()
@since  9

## BigInteger.gcd(BigInteger)

```java
public BigInteger gcd(BigInteger val)
```

Returns a BigInteger whose value is the greatest common divisor of
{@code abs(this)} and {@code abs(val)}.  Returns 0 if
{@code this == 0 && val == 0}.

@param  val value with which the GCD is to be computed.
@return {@code GCD(abs(this), abs(val))}

## BigInteger.abs()

```java
public BigInteger abs()
```

Returns a BigInteger whose value is the absolute value of this
BigInteger.

@return {@code abs(this)}

## BigInteger.negate()

```java
public BigInteger negate()
```

Returns a BigInteger whose value is {@code (-this)}.

@return {@code -this}

## BigInteger.signum()

```java
public int signum()
```

Returns the signum function of this BigInteger.

@return -1, 0 or 1 as the value of this BigInteger is negative, zero or
        positive.

## BigInteger.mod(BigInteger)

```java
public BigInteger mod(BigInteger m)
```

Returns a BigInteger whose value is {@code (this mod m}).  This method
differs from {@code remainder} in that it always returns a
<i>non-negative</i> BigInteger.

@param  m the modulus.
@return {@code this mod m}
@throws ArithmeticException {@code m} &le; 0
@see    #remainder

## BigInteger.modPow(BigInteger, BigInteger)

```java
public BigInteger modPow(BigInteger exponent, BigInteger m)
```

Returns a BigInteger whose value is
<code>(this<sup>exponent</sup> mod m)</code>.  (Unlike {@code pow}, this
method permits negative exponents.)

@param  exponent the exponent.
@param  m the modulus.
@return <code>this<sup>exponent</sup> mod m</code>
@throws ArithmeticException {@code m} &le; 0 or the exponent is
        negative and this BigInteger is not <i>relatively
        prime</i> to {@code m}.
@see    #modInverse

## BigInteger.modInverse(BigInteger)

```java
public BigInteger modInverse(BigInteger m)
```

Returns a BigInteger whose value is {@code (this}<sup>-1</sup> {@code mod m)}.

@param  m the modulus.
@return {@code this}<sup>-1</sup> {@code mod m}.
@throws ArithmeticException {@code  m} &le; 0, or this BigInteger
        has no multiplicative inverse mod m (that is, this BigInteger
        is not <i>relatively prime</i> to m).

## BigInteger.shiftLeft(int)

```java
public BigInteger shiftLeft(int n)
```

Returns a BigInteger whose value is {@code (this << n)}.
The shift distance, {@code n}, may be negative, in which case
this method performs a right shift.
(Computes <code>floor(this * 2<sup>n</sup>)</code>.)

@param  n shift distance, in bits.
@return {@code this << n}
@see #shiftRight

## BigInteger.shiftRight(int)

```java
public BigInteger shiftRight(int n)
```

Returns a BigInteger whose value is {@code (this >> n)}.  Sign
extension is performed.  The shift distance, {@code n}, may be
negative, in which case this method performs a left shift.
(Computes <code>floor(this / 2<sup>n</sup>)</code>.)

@param  n shift distance, in bits.
@return {@code this >> n}
@see #shiftLeft

## BigInteger.and(BigInteger)

```java
public BigInteger and(BigInteger val)
```

Returns a BigInteger whose value is {@code (this & val)}.  (This
method returns a negative BigInteger if and only if this and val are
both negative.)

@param val value to be AND'ed with this BigInteger.
@return {@code this & val}

## BigInteger.or(BigInteger)

```java
public BigInteger or(BigInteger val)
```

Returns a BigInteger whose value is {@code (this | val)}.  (This method
returns a negative BigInteger if and only if either this or val is
negative.)

@param val value to be OR'ed with this BigInteger.
@return {@code this | val}

## BigInteger.xor(BigInteger)

```java
public BigInteger xor(BigInteger val)
```

Returns a BigInteger whose value is {@code (this ^ val)}.  (This method
returns a negative BigInteger if and only if exactly one of this and
val are negative.)

@param val value to be XOR'ed with this BigInteger.
@return {@code this ^ val}

## BigInteger.not()

```java
public BigInteger not()
```

Returns a BigInteger whose value is {@code (~this)}.  (This method
returns a negative value if and only if this BigInteger is
non-negative.)

@return {@code ~this}

## BigInteger.andNot(BigInteger)

```java
public BigInteger andNot(BigInteger val)
```

Returns a BigInteger whose value is {@code (this & ~val)}.  This
method, which is equivalent to {@code and(val.not())}, is provided as
a convenience for masking operations.  (This method returns a negative
BigInteger if and only if {@code this} is negative and {@code val} is
positive.)

@param val value to be complemented and AND'ed with this BigInteger.
@return {@code this & ~val}

## BigInteger.testBit(int)

```java
public boolean testBit(int n)
```

Returns {@code true} if and only if the designated bit is set.
(Computes {@code ((this & (1<<n)) != 0)}.)

@param  n index of bit to test.
@return {@code true} if and only if the designated bit is set.
@throws ArithmeticException {@code n} is negative.

## BigInteger.setBit(int)

```java
public BigInteger setBit(int n)
```

Returns a BigInteger whose value is equivalent to this BigInteger
with the designated bit set.  (Computes {@code (this | (1<<n))}.)

@param  n index of bit to set.
@return {@code this | (1<<n)}
@throws ArithmeticException {@code n} is negative.

## BigInteger.clearBit(int)

```java
public BigInteger clearBit(int n)
```

Returns a BigInteger whose value is equivalent to this BigInteger
with the designated bit cleared.
(Computes {@code (this & ~(1<<n))}.)

@param  n index of bit to clear.
@return {@code this & ~(1<<n)}
@throws ArithmeticException {@code n} is negative.

## BigInteger.flipBit(int)

```java
public BigInteger flipBit(int n)
```

Returns a BigInteger whose value is equivalent to this BigInteger
with the designated bit flipped.
(Computes {@code (this ^ (1<<n))}.)

@param  n index of bit to flip.
@return {@code this ^ (1<<n)}
@throws ArithmeticException {@code n} is negative.

## BigInteger.getLowestSetBit()

```java
public int getLowestSetBit()
```

Returns the index of the rightmost (lowest-order) one bit in this
BigInteger (the number of zero bits to the right of the rightmost
one bit).  Returns -1 if this BigInteger contains no one bits.
(Computes {@code (this == 0? -1 : log2(this & -this))}.)

@return index of the rightmost one bit in this BigInteger.

## BigInteger.bitLength()

```java
public int bitLength()
```

Returns the number of bits in the minimal two's-complement
representation of this BigInteger, <em>excluding</em> a sign bit.
For positive BigIntegers, this is equivalent to the number of bits in
the ordinary binary representation.  For zero this method returns
{@code 0}.  (Computes {@code (ceil(log2(this < 0 ? -this : this+1)))}.)

@return number of bits in the minimal two's-complement
        representation of this BigInteger, <em>excluding</em> a sign bit.

## BigInteger.bitCount()

```java
public int bitCount()
```

Returns the number of bits in the two's complement representation
of this BigInteger that differ from its sign bit.  This method is
useful when implementing bit-vector style sets atop BigIntegers.

@return number of bits in the two's complement representation
        of this BigInteger that differ from its sign bit.

## BigInteger.isProbablePrime(int)

```java
public boolean isProbablePrime(int certainty)
```

Returns {@code true} if this BigInteger is probably prime,
{@code false} if it's definitely composite.  If
{@code certainty} is &le; 0, {@code true} is
returned.

@param  certainty a measure of the uncertainty that the caller is
        willing to tolerate: if the call returns {@code true}
        the probability that this BigInteger is prime exceeds
        (1 - 1/2<sup>{@code certainty}</sup>).  The execution time of
        this method is proportional to the value of this parameter.
@return {@code true} if this BigInteger is probably prime,
        {@code false} if it's definitely composite.
@throws ArithmeticException {@code this} is too large.
@implNote Due to the nature of the underlying primality test algorithm,
         and depending on the size of {@code this} and {@code certainty},
         this method could consume a large amount of memory, up to
         exhaustion of available heap space, or could run for a long time.

## BigInteger.compareTo(BigInteger)

```java
public int compareTo(BigInteger val)
```

Compares this BigInteger with the specified BigInteger.  This
method is provided in preference to individual methods for each
of the six boolean comparison operators ({@literal <}, ==,
{@literal >}, {@literal >=}, !=, {@literal <=}).  The suggested
idiom for performing these comparisons is: {@code
(x.compareTo(y)} &lt;<i>op</i>&gt; {@code 0)}, where
&lt;<i>op</i>&gt; is one of the six comparison operators.

@param  val BigInteger to which this BigInteger is to be compared.
@return -1, 0 or 1 as this BigInteger is numerically less than, equal
        to, or greater than {@code val}.

## BigInteger.equals(Object)

```java
public boolean equals(Object x)
```

Compares this BigInteger with the specified Object for equality.

@param  x Object to which this BigInteger is to be compared.
@return {@code true} if and only if the specified Object is a
        BigInteger whose value is numerically equal to this BigInteger.

## BigInteger.min(BigInteger)

```java
public BigInteger min(BigInteger val)
```

Returns the minimum of this BigInteger and {@code val}.

@param  val value with which the minimum is to be computed.
@return the BigInteger whose value is the lesser of this BigInteger and
        {@code val}.  If they are equal, either may be returned.

## BigInteger.max(BigInteger)

```java
public BigInteger max(BigInteger val)
```

Returns the maximum of this BigInteger and {@code val}.

@param  val value with which the maximum is to be computed.
@return the BigInteger whose value is the greater of this and
        {@code val}.  If they are equal, either may be returned.

## BigInteger.hashCode()

```java
public int hashCode()
```

{@return the hash code for this BigInteger}

## BigInteger.toString(int)

```java
public String toString(int radix)
```

Returns the String representation of this BigInteger in the
given radix.  If the radix is outside the range from {@link
Character#MIN_RADIX} to {@link Character#MAX_RADIX} inclusive,
it will default to 10 (as is the case for
{@code Integer.toString}).  The digit-to-character mapping
provided by {@code Character.forDigit} is used, and a minus
sign is prepended if appropriate.  (This representation is
compatible with the {@link #BigInteger(String, int) (String,
int)} constructor.)

@param  radix  radix of the String representation.
@return String representation of this BigInteger in the given radix.
@see    Integer#toString
@see    Character#forDigit
@see    #BigInteger(java.lang.String, int)

## BigInteger.toString()

```java
public String toString()
```

Returns the decimal String representation of this BigInteger.
The digit-to-character mapping provided by
{@code Character.forDigit} is used, and a minus sign is
prepended if appropriate.  (This representation is compatible
with the {@link #BigInteger(String) (String)} constructor, and
allows for String concatenation with Java's + operator.)

@return decimal String representation of this BigInteger.
@see    Character#forDigit
@see    #BigInteger(java.lang.String)

## BigInteger.toByteArray()

```java
public byte[] toByteArray()
```

Returns a byte array containing the two's-complement
representation of this BigInteger.  The byte array will be in
<i>big-endian</i> byte-order: the most significant byte is in
the zeroth element.  The array will contain the minimum number
of bytes required to represent this BigInteger, including at
least one sign bit, which is {@code (ceil((this.bitLength() +
1)/8))}.  (This representation is compatible with the
{@link #BigInteger(byte[]) (byte[])} constructor.)

@return a byte array containing the two's-complement representation of
        this BigInteger.
@see    #BigInteger(byte[])

## BigInteger.intValue()

```java
public int intValue()
```

Converts this BigInteger to an {@code int}.  This
conversion is analogous to a
<i>narrowing primitive conversion</i> from {@code long} to
{@code int} as defined in
<cite>The Java Language Specification</cite>:
if this BigInteger is too big to fit in an
{@code int}, only the low-order 32 bits are returned.
Note that this conversion can lose information about the
overall magnitude of the BigInteger value as well as return a
result with the opposite sign.

@return this BigInteger converted to an {@code int}.
@see #intValueExact()
@jls 5.1.3 Narrowing Primitive Conversion

## BigInteger.longValue()

```java
public long longValue()
```

Converts this BigInteger to a {@code long}.  This
conversion is analogous to a
<i>narrowing primitive conversion</i> from {@code long} to
{@code int} as defined in
<cite>The Java Language Specification</cite>:
if this BigInteger is too big to fit in a
{@code long}, only the low-order 64 bits are returned.
Note that this conversion can lose information about the
overall magnitude of the BigInteger value as well as return a
result with the opposite sign.

@return this BigInteger converted to a {@code long}.
@see #longValueExact()
@jls 5.1.3 Narrowing Primitive Conversion

## BigInteger.floatValue()

```java
public float floatValue()
```

Converts this BigInteger to a {@code float}.  This
conversion is similar to the
<i>narrowing primitive conversion</i> from {@code double} to
{@code float} as defined in
<cite>The Java Language Specification</cite>:
if this BigInteger has too great a magnitude
to represent as a {@code float}, it will be converted to
{@link Float#NEGATIVE_INFINITY} or {@link
Float#POSITIVE_INFINITY} as appropriate.  Note that even when
the return value is finite, this conversion can lose
information about the precision of the BigInteger value.

@return this BigInteger converted to a {@code float}.
@jls 5.1.3 Narrowing Primitive Conversion

## BigInteger.doubleValue()

```java
public double doubleValue()
```

Converts this BigInteger to a {@code double}.  This
conversion is similar to the
<i>narrowing primitive conversion</i> from {@code double} to
{@code float} as defined in
<cite>The Java Language Specification</cite>:
if this BigInteger has too great a magnitude
to represent as a {@code double}, it will be converted to
{@link Double#NEGATIVE_INFINITY} or {@link
Double#POSITIVE_INFINITY} as appropriate.  Note that even when
the return value is finite, this conversion can lose
information about the precision of the BigInteger value.

@return this BigInteger converted to a {@code double}.
@jls 5.1.3 Narrowing Primitive Conversion

## BigInteger.longValueExact()

```java
public long longValueExact()
```

Converts this {@code BigInteger} to a {@code long}, checking
for lost information.  If the value of this {@code BigInteger}
is out of the range of the {@code long} type, then an
{@code ArithmeticException} is thrown.

@return this {@code BigInteger} converted to a {@code long}.
@throws ArithmeticException if the value of {@code this} will
not exactly fit in a {@code long}.
@see BigInteger#longValue
@since  1.8

## BigInteger.intValueExact()

```java
public int intValueExact()
```

Converts this {@code BigInteger} to an {@code int}, checking
for lost information.  If the value of this {@code BigInteger}
is out of the range of the {@code int} type, then an
{@code ArithmeticException} is thrown.

@return this {@code BigInteger} converted to an {@code int}.
@throws ArithmeticException if the value of {@code this} will
not exactly fit in an {@code int}.
@see BigInteger#intValue
@since  1.8

## BigInteger.shortValueExact()

```java
public short shortValueExact()
```

Converts this {@code BigInteger} to a {@code short}, checking
for lost information.  If the value of this {@code BigInteger}
is out of the range of the {@code short} type, then an
{@code ArithmeticException} is thrown.

@return this {@code BigInteger} converted to a {@code short}.
@throws ArithmeticException if the value of {@code this} will
not exactly fit in a {@code short}.
@see BigInteger#shortValue
@since  1.8

## BigInteger.byteValueExact()

```java
public byte byteValueExact()
```

Converts this {@code BigInteger} to a {@code byte}, checking
for lost information.  If the value of this {@code BigInteger}
is out of the range of the {@code byte} type, then an
{@code ArithmeticException} is thrown.

@return this {@code BigInteger} converted to a {@code byte}.
@throws ArithmeticException if the value of {@code this} will
not exactly fit in a {@code byte}.
@see BigInteger#byteValue
@since  1.8