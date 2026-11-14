---
title: "BigInteger class (java.math) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/math/BigInteger.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BigInteger class (java.math) (part 3 of 3)

## BigInteger.toString()

```java
public String toString()
```

Returns the decimal String representation of this BigInteger.
The digit-to-character mapping provided by
`Character.forDigit` is used, and a minus sign is
prepended if appropriate.  (This representation is compatible
with the (String) constructor, and
allows for String concatenation with Java's + operator.)

**Returns:** decimal String representation of this BigInteger.

**See also:** Character#forDigit

**See also:** #BigInteger(java.lang.String)

## BigInteger.toByteArray()

```java
public byte[] toByteArray()
```

Returns a byte array containing the two's-complement
representation of this BigInteger.  The byte array will be in
*big-endian* byte-order: the most significant byte is in
the zeroth element.  The array will contain the minimum number
of bytes required to represent this BigInteger, including at
least one sign bit, which is `(ceil((this.bitLength() + 1)/8))`.  (This representation is compatible with the
(byte[]) constructor.)

**Returns:** a byte array containing the two's-complement representation of
        this BigInteger.

**See also:** #BigInteger(byte[])

## BigInteger.intValue()

```java
public int intValue()
```

Converts this BigInteger to an `int`.  This
conversion is analogous to a
*narrowing primitive conversion* from `long` to
`int` as defined in
*The Java Language Specification*:
if this BigInteger is too big to fit in an
`int`, only the low-order 32 bits are returned.
Note that this conversion can lose information about the
overall magnitude of the BigInteger value as well as return a
result with the opposite sign.

**Returns:** this BigInteger converted to an `int`.

**See also:** #intValueExact()

**JLS:** 5.1.3 Narrowing Primitive Conversion

## BigInteger.longValue()

```java
public long longValue()
```

Converts this BigInteger to a `long`.  This
conversion is analogous to a
*narrowing primitive conversion* from `long` to
`int` as defined in
*The Java Language Specification*:
if this BigInteger is too big to fit in a
`long`, only the low-order 64 bits are returned.
Note that this conversion can lose information about the
overall magnitude of the BigInteger value as well as return a
result with the opposite sign.

**Returns:** this BigInteger converted to a `long`.

**See also:** #longValueExact()

**JLS:** 5.1.3 Narrowing Primitive Conversion

## BigInteger.floatValue()

```java
public float floatValue()
```

Converts this BigInteger to a `float`.  This
conversion is similar to the
*narrowing primitive conversion* from `double` to
`float` as defined in
*The Java Language Specification*:
if this BigInteger has too great a magnitude
to represent as a `float`, it will be converted to
`Float.NEGATIVE_INFINITY` or `Float.POSITIVE_INFINITY` as appropriate.  Note that even when
the return value is finite, this conversion can lose
information about the precision of the BigInteger value.

**Returns:** this BigInteger converted to a `float`.

**JLS:** 5.1.3 Narrowing Primitive Conversion

## BigInteger.doubleValue()

```java
public double doubleValue()
```

Converts this BigInteger to a `double`.  This
conversion is similar to the
*narrowing primitive conversion* from `double` to
`float` as defined in
*The Java Language Specification*:
if this BigInteger has too great a magnitude
to represent as a `double`, it will be converted to
`Double.NEGATIVE_INFINITY` or `Double.POSITIVE_INFINITY` as appropriate.  Note that even when
the return value is finite, this conversion can lose
information about the precision of the BigInteger value.

**Returns:** this BigInteger converted to a `double`.

**JLS:** 5.1.3 Narrowing Primitive Conversion

## BigInteger.longValueExact()

```java
public long longValueExact()
```

Converts this `BigInteger` to a `long`, checking
for lost information.  If the value of this `BigInteger`
is out of the range of the `long` type, then an
`ArithmeticException` is thrown.

**Returns:** this `BigInteger` converted to a `long`.

**See also:** BigInteger#longValue

**Since:** 1.8

Throws:

- `ArithmeticException`: if the value of `this` will not exactly fit in a `long`.

## BigInteger.intValueExact()

```java
public int intValueExact()
```

Converts this `BigInteger` to an `int`, checking
for lost information.  If the value of this `BigInteger`
is out of the range of the `int` type, then an
`ArithmeticException` is thrown.

**Returns:** this `BigInteger` converted to an `int`.

**See also:** BigInteger#intValue

**Since:** 1.8

Throws:

- `ArithmeticException`: if the value of `this` will not exactly fit in an `int`.

## BigInteger.shortValueExact()

```java
public short shortValueExact()
```

Converts this `BigInteger` to a `short`, checking
for lost information.  If the value of this `BigInteger`
is out of the range of the `short` type, then an
`ArithmeticException` is thrown.

**Returns:** this `BigInteger` converted to a `short`.

**See also:** BigInteger#shortValue

**Since:** 1.8

Throws:

- `ArithmeticException`: if the value of `this` will not exactly fit in a `short`.

## BigInteger.byteValueExact()

```java
public byte byteValueExact()
```

Converts this `BigInteger` to a `byte`, checking
for lost information.  If the value of this `BigInteger`
is out of the range of the `byte` type, then an
`ArithmeticException` is thrown.

**Returns:** this `BigInteger` converted to a `byte`.

**See also:** BigInteger#byteValue

**Since:** 1.8

Throws:

- `ArithmeticException`: if the value of `this` will not exactly fit in a `byte`.
