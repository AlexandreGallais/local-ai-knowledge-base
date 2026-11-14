---
title: "BigInteger class (java.math) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/math/BigInteger.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BigInteger class (java.math) (part 2 of 3)

## BigInteger.add(BigInteger)

```java
public BigInteger add(BigInteger val)
```

Returns a BigInteger whose value is `(this + val)`.

Parameters:

- `val`: value to be added to this BigInteger.

**Returns:** `this + val`

## BigInteger.subtract(BigInteger)

```java
public BigInteger subtract(BigInteger val)
```

Returns a BigInteger whose value is `(this - val)`.

Parameters:

- `val`: value to be subtracted from this BigInteger.

**Returns:** `this - val`

## BigInteger.multiply(BigInteger)

```java
public BigInteger multiply(BigInteger val)
```

Returns a BigInteger whose value is `(this * val)`.

Parameters:

- `val`: value to be multiplied by this BigInteger.

**Implementation note:** An implementation may offer better algorithmic
performance when `val == this`.

**Returns:** `this * val`

## BigInteger.parallelMultiply(BigInteger)

```java
public BigInteger parallelMultiply(BigInteger val)
```

Returns a BigInteger whose value is `(this * val)`.
When both `this` and `val` are large, typically
in the thousands of bits, parallel multiply might be used.
This method returns the exact same mathematical result as
`multiply`.

Parameters:

- `val`: value to be multiplied by this BigInteger.

**Implementation note:** This implementation may offer better algorithmic
performance when `val == this`.

**Implementation note:** Compared to `multiply`, an implementation's
parallel multiplication algorithm would typically use more
CPU resources to compute the result faster, and may do so
with a slight increase in memory consumption.

**Returns:** `this * val`

**See also:** #multiply

**Since:** 19

## BigInteger.divide(BigInteger)

```java
public BigInteger divide(BigInteger val)
```

Returns a BigInteger whose value is `(this / val)`.

Parameters:

- `val`: value by which this BigInteger is to be divided.

**Returns:** `this / val`

Throws:

- `ArithmeticException`: if `val` is zero.

## BigInteger.divideAndRemainder(BigInteger)

```java
public BigInteger[] divideAndRemainder(BigInteger val)
```

Returns an array of two BigIntegers containing `(this / val)`
followed by `(this % val)`.

Parameters:

- `val`: value by which this BigInteger is to be divided, and the remainder computed.

**Returns:** an array of two BigIntegers: the quotient `(this / val)`
        is the initial element, and the remainder `(this % val)`
        is the final element.

Throws:

- `ArithmeticException`: if `val` is zero.

## BigInteger.remainder(BigInteger)

```java
public BigInteger remainder(BigInteger val)
```

Returns a BigInteger whose value is `(this % val)`.

Parameters:

- `val`: value by which this BigInteger is to be divided, and the remainder computed.

**Returns:** `this % val`

Throws:

- `ArithmeticException`: if `val` is zero.

## BigInteger.pow(int)

```java
public BigInteger pow(int exponent)
```

Returns a BigInteger whose value is `(thisexponent)`.
Note that `exponent` is an integer rather than a BigInteger.

Parameters:

- `exponent`: exponent to which this BigInteger is to be raised.

**Returns:** `thisexponent`

Throws:

- `ArithmeticException`: `exponent` is negative. (This would cause the operation to yield a non-integer value.)

## BigInteger.sqrt()

```java
public BigInteger sqrt()
```

Returns the integer square root of this BigInteger.  The integer square
root of the corresponding mathematical integer `n` is the largest
mathematical integer `s` such that `s*s <= n`.  It is equal
to the value of `floor(sqrt(n))`, where `sqrt(n)` denotes the
real square root of `n` treated as a real.  Note that the integer
square root will be less than the real square root if the latter is not
representable as an integral value.

**Returns:** the integer square root of `this`

**Since:** 9

Throws:

- `ArithmeticException`: if `this` is negative. (The square root of a negative integer `val` is `(i * sqrt(-val))` where *i* is the *imaginary unit* and is equal to `sqrt(-1)`.)

## BigInteger.sqrtAndRemainder()

```java
public BigInteger[] sqrtAndRemainder()
```

Returns an array of two BigIntegers containing the integer square root
`s` of `this` and its remainder `this - s*s`,
respectively.

**Returns:** an array of two BigIntegers with the integer square root at
        offset 0 and the remainder at offset 1

**See also:** #sqrt()

**Since:** 9

Throws:

- `ArithmeticException`: if `this` is negative. (The square root of a negative integer `val` is `(i * sqrt(-val))` where *i* is the *imaginary unit* and is equal to `sqrt(-1)`.)

## BigInteger.gcd(BigInteger)

```java
public BigInteger gcd(BigInteger val)
```

Returns a BigInteger whose value is the greatest common divisor of
`abs(this)` and `abs(val)`.  Returns 0 if
`this == 0 && val == 0`.

Parameters:

- `val`: value with which the GCD is to be computed.

**Returns:** `GCD(abs(this), abs(val))`

## BigInteger.abs()

```java
public BigInteger abs()
```

Returns a BigInteger whose value is the absolute value of this
BigInteger.

**Returns:** `abs(this)`

## BigInteger.negate()

```java
public BigInteger negate()
```

Returns a BigInteger whose value is `(-this)`.

**Returns:** `-this`

## BigInteger.signum()

```java
public int signum()
```

Returns the signum function of this BigInteger.

**Returns:** -1, 0 or 1 as the value of this BigInteger is negative, zero or
        positive.

## BigInteger.mod(BigInteger)

```java
public BigInteger mod(BigInteger m)
```

Returns a BigInteger whose value is `(this mod m`).  This method
differs from `remainder` in that it always returns a
*non-negative* BigInteger.

Parameters:

- `m`: the modulus.

**Returns:** `this mod m`

**See also:** #remainder

Throws:

- `ArithmeticException`: `m` &le; 0

## BigInteger.modPow(BigInteger, BigInteger)

```java
public BigInteger modPow(BigInteger exponent, BigInteger m)
```

Returns a BigInteger whose value is
`(thisexponent mod m)`.  (Unlike `pow`, this
method permits negative exponents.)

Parameters:

- `exponent`: the exponent.
- `m`: the modulus.

**Returns:** `thisexponent mod m`

**See also:** #modInverse

Throws:

- `ArithmeticException`: `m` &le; 0 or the exponent is negative and this BigInteger is not *relatively prime* to `m`.

## BigInteger.modInverse(BigInteger)

```java
public BigInteger modInverse(BigInteger m)
```

Returns a BigInteger whose value is `(this`-1 `mod m)`.

Parameters:

- `m`: the modulus.

**Returns:** `this`-1 `mod m`.

Throws:

- `ArithmeticException`: `m` &le; 0, or this BigInteger has no multiplicative inverse mod m (that is, this BigInteger is not *relatively prime* to m).

## BigInteger.shiftLeft(int)

```java
public BigInteger shiftLeft(int n)
```

Returns a BigInteger whose value is `(this << n)`.
The shift distance, `n`, may be negative, in which case
this method performs a right shift.
(Computes `floor(this * 2n)`.)

Parameters:

- `n`: shift distance, in bits.

**Returns:** `this << n`

**See also:** #shiftRight

## BigInteger.shiftRight(int)

```java
public BigInteger shiftRight(int n)
```

Returns a BigInteger whose value is `(this >> n)`.  Sign
extension is performed.  The shift distance, `n`, may be
negative, in which case this method performs a left shift.
(Computes `floor(this / 2n)`.)

Parameters:

- `n`: shift distance, in bits.

**Returns:** `this >> n`

**See also:** #shiftLeft

## BigInteger.and(BigInteger)

```java
public BigInteger and(BigInteger val)
```

Returns a BigInteger whose value is `(this & val)`.  (This
method returns a negative BigInteger if and only if this and val are
both negative.)

Parameters:

- `val`: value to be AND'ed with this BigInteger.

**Returns:** `this & val`

## BigInteger.or(BigInteger)

```java
public BigInteger or(BigInteger val)
```

Returns a BigInteger whose value is `(this | val)`.  (This method
returns a negative BigInteger if and only if either this or val is
negative.)

Parameters:

- `val`: value to be OR'ed with this BigInteger.

**Returns:** `this | val`

## BigInteger.xor(BigInteger)

```java
public BigInteger xor(BigInteger val)
```

Returns a BigInteger whose value is `(this ^ val)`.  (This method
returns a negative BigInteger if and only if exactly one of this and
val are negative.)

Parameters:

- `val`: value to be XOR'ed with this BigInteger.

**Returns:** `this ^ val`

## BigInteger.not()

```java
public BigInteger not()
```

Returns a BigInteger whose value is `(~this)`.  (This method
returns a negative value if and only if this BigInteger is
non-negative.)

**Returns:** `~this`

## BigInteger.andNot(BigInteger)

```java
public BigInteger andNot(BigInteger val)
```

Returns a BigInteger whose value is `(this & ~val)`.  This
method, which is equivalent to `and(val.not())`, is provided as
a convenience for masking operations.  (This method returns a negative
BigInteger if and only if `this` is negative and `val` is
positive.)

Parameters:

- `val`: value to be complemented and AND'ed with this BigInteger.

**Returns:** `this & ~val`

## BigInteger.testBit(int)

```java
public boolean testBit(int n)
```

Returns `true` if and only if the designated bit is set.
(Computes `((this & (1<<n)) != 0)`.)

Parameters:

- `n`: index of bit to test.

**Returns:** `true` if and only if the designated bit is set.

Throws:

- `ArithmeticException`: `n` is negative.

## BigInteger.setBit(int)

```java
public BigInteger setBit(int n)
```

Returns a BigInteger whose value is equivalent to this BigInteger
with the designated bit set.  (Computes `(this | (1<<n))`.)

Parameters:

- `n`: index of bit to set.

**Returns:** `this | (1<<n)`

Throws:

- `ArithmeticException`: `n` is negative.

## BigInteger.clearBit(int)

```java
public BigInteger clearBit(int n)
```

Returns a BigInteger whose value is equivalent to this BigInteger
with the designated bit cleared.
(Computes `(this & ~(1<<n))`.)

Parameters:

- `n`: index of bit to clear.

**Returns:** `this & ~(1<<n)`

Throws:

- `ArithmeticException`: `n` is negative.

## BigInteger.flipBit(int)

```java
public BigInteger flipBit(int n)
```

Returns a BigInteger whose value is equivalent to this BigInteger
with the designated bit flipped.
(Computes `(this ^ (1<<n))`.)

Parameters:

- `n`: index of bit to flip.

**Returns:** `this ^ (1<<n)`

Throws:

- `ArithmeticException`: `n` is negative.

## BigInteger.getLowestSetBit()

```java
public int getLowestSetBit()
```

Returns the index of the rightmost (lowest-order) one bit in this
BigInteger (the number of zero bits to the right of the rightmost
one bit).  Returns -1 if this BigInteger contains no one bits.
(Computes `(this == 0? -1 : log2(this & -this))`.)

**Returns:** index of the rightmost one bit in this BigInteger.

## BigInteger.bitLength()

```java
public int bitLength()
```

Returns the number of bits in the minimal two's-complement
representation of this BigInteger, *excluding* a sign bit.
For positive BigIntegers, this is equivalent to the number of bits in
the ordinary binary representation.  For zero this method returns
`0`.  (Computes `(ceil(log2(this < 0 ? -this : this+1)))`.)

**Returns:** number of bits in the minimal two's-complement
        representation of this BigInteger, *excluding* a sign bit.

## BigInteger.bitCount()

```java
public int bitCount()
```

Returns the number of bits in the two's complement representation
of this BigInteger that differ from its sign bit.  This method is
useful when implementing bit-vector style sets atop BigIntegers.

**Returns:** number of bits in the two's complement representation
        of this BigInteger that differ from its sign bit.

## BigInteger.isProbablePrime(int)

```java
public boolean isProbablePrime(int certainty)
```

Returns `true` if this BigInteger is probably prime,
`false` if it's definitely composite.  If
`certainty` is &le; 0, `true` is
returned.

Parameters:

- `certainty`: a measure of the uncertainty that the caller is willing to tolerate: if the call returns `true` the probability that this BigInteger is prime exceeds (1 - 1/2`certainty`). The execution time of this method is proportional to the value of this parameter.

**Returns:** `true` if this BigInteger is probably prime,
        `false` if it's definitely composite.

**Implementation note:** Due to the nature of the underlying primality test algorithm,
         and depending on the size of `this` and `certainty`,
         this method could consume a large amount of memory, up to
         exhaustion of available heap space, or could run for a long time.

Throws:

- `ArithmeticException`: `this` is too large.

## BigInteger.compareTo(BigInteger)

```java
public int compareTo(BigInteger val)
```

Compares this BigInteger with the specified BigInteger.  This
method is provided in preference to individual methods for each
of the six boolean comparison operators (<, ==,
>, >=, !=, <=).  The suggested
idiom for performing these comparisons is: `(x.compareTo(y)` <*op*> `0)`, where
<*op*> is one of the six comparison operators.

Parameters:

- `val`: BigInteger to which this BigInteger is to be compared.

**Returns:** -1, 0 or 1 as this BigInteger is numerically less than, equal
        to, or greater than `val`.

## BigInteger.equals(Object)

```java
public boolean equals(Object x)
```

Compares this BigInteger with the specified Object for equality.

Parameters:

- `x`: Object to which this BigInteger is to be compared.

**Returns:** `true` if and only if the specified Object is a
        BigInteger whose value is numerically equal to this BigInteger.

## BigInteger.min(BigInteger)

```java
public BigInteger min(BigInteger val)
```

Returns the minimum of this BigInteger and `val`.

Parameters:

- `val`: value with which the minimum is to be computed.

**Returns:** the BigInteger whose value is the lesser of this BigInteger and
        `val`.  If they are equal, either may be returned.

## BigInteger.max(BigInteger)

```java
public BigInteger max(BigInteger val)
```

Returns the maximum of this BigInteger and `val`.

Parameters:

- `val`: value with which the maximum is to be computed.

**Returns:** the BigInteger whose value is the greater of this and
        `val`.  If they are equal, either may be returned.

## BigInteger.hashCode()

```java
public int hashCode()
```

## BigInteger.toString(int)

```java
public String toString(int radix)
```

Returns the String representation of this BigInteger in the
given radix.  If the radix is outside the range from `Character.MIN_RADIX` to `Character.MAX_RADIX` inclusive,
it will default to 10 (as is the case for
`Integer.toString`).  The digit-to-character mapping
provided by `Character.forDigit` is used, and a minus
sign is prepended if appropriate.  (This representation is
compatible with the int) (String, int) constructor.)

Parameters:

- `radix`: radix of the String representation.

**Returns:** String representation of this BigInteger in the given radix.

**See also:** Integer#toString

**See also:** Character#forDigit

**See also:** #BigInteger(java.lang.String, int)
