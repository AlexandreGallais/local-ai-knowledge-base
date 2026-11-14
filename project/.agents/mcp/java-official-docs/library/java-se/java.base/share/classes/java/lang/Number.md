---
title: "Number class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Number.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Number class (java.lang)

```java
public abstract class Number implements java.io.Serializable
```

The abstract class `Number` is the superclass of platform
classes representing numeric values that are convertible to the
primitive types `byte`, `double`, `float`, `int`, `long`, and `short`.

The specific semantics of the conversion from the numeric value of
a particular `Number` implementation to a given primitive
type is defined by the `Number` implementation in question.

For platform classes, the conversion is often analogous to a
narrowing primitive conversion or a widening primitive conversion
as defined in *The Java Language Specification*
for converting between primitive types.  Therefore, conversions may
lose information about the overall magnitude of a numeric value, may
lose precision, and may even return a result of a different sign
than the input.

See the documentation of a given `Number` implementation for
conversion details.

**JLS:** 5.1.2 Widening Primitive Conversion

**JLS:** 5.1.3 Narrowing Primitive Conversion

**Since:** 1.0

## Number.Number()

```java
public Number()
```

Constructor for subclasses to call.

## Number.intValue()

```java
public abstract int intValue()
```

Returns the value of the specified number as an `int`.

**Returns:** the numeric value represented by this object after conversion
         to type `int`.

## Number.longValue()

```java
public abstract long longValue()
```

Returns the value of the specified number as a `long`.

**Returns:** the numeric value represented by this object after conversion
         to type `long`.

## Number.floatValue()

```java
public abstract float floatValue()
```

Returns the value of the specified number as a `float`.

**Returns:** the numeric value represented by this object after conversion
         to type `float`.

## Number.doubleValue()

```java
public abstract double doubleValue()
```

Returns the value of the specified number as a `double`.

**Returns:** the numeric value represented by this object after conversion
         to type `double`.

## Number.byteValue()

```java
public byte byteValue()
```

Returns the value of the specified number as a `byte`.

**Implementation requirements:** The default implementation returns the result of `intValue` cast
to a `byte`.

**Returns:** the numeric value represented by this object after conversion
         to type `byte`.

**Since:** 1.1

## Number.shortValue()

```java
public short shortValue()
```

Returns the value of the specified number as a `short`.

**Implementation requirements:** The default implementation returns the result of `intValue` cast
to a `short`.

**Returns:** the numeric value represented by this object after conversion
         to type `short`.

**Since:** 1.1
