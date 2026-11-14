---
title: "Float class (java.lang) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Float.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Float class (java.lang) (part 3 of 3)

## Float.compareTo(Float)

```java
public int compareTo(Float anotherFloat)
```

Compares two `Float` objects numerically.

This method imposes a total order on `Float` objects
with two differences compared to the incomplete order defined by
the Java language numerical comparison operators (`<, <=, ==, >=, >`) on `float` values.

-  A NaN is *unordered* with respect to other
         values and unequal to itself under the comparison
         operators.  This method chooses to define `Float.NaN` to be equal to itself and greater than all
         other `double` values (including `Float.POSITIVE_INFINITY`).

-  Positive zero and negative zero compare equal
     numerically, but are distinct and distinguishable values.
     This method chooses to define positive zero (`+0.0f`),
     to be greater than negative zero (`-0.0f`).

This ensures that the *natural ordering* of `Float`
objects imposed by this method is *consistent with
equals*; see this discussion for details of floating-point comparison and ordering.

Parameters:

- `anotherFloat`: the `Float` to be compared.

**Returns:** the value `0` if `anotherFloat` is
         numerically equal to this `Float`; a value
         less than `0` if this `Float`
         is numerically less than `anotherFloat`;
         and a value greater than `0` if this
         `Float` is numerically greater than
         `anotherFloat`.

**JLS:** 15.20.1 Numerical Comparison Operators `<`, `<=`, `>`, and `>=`

**Since:** 1.2

## Float.compare(float, float)

```java
public static int compare(float f1, float f2)
```

Compares the two specified `float` values. The sign
of the integer value returned is the same as that of the
integer that would be returned by the call:

```java
   Float.valueOf(f1).compareTo(Float.valueOf(f2))
```

Parameters:

- `f1`: the first `float` to compare.
- `f2`: the second `float` to compare.

**Returns:** the value `0` if `f1` is
         numerically equal to `f2`; a value less than
         `0` if `f1` is numerically less than
         `f2`; and a value greater than `0`
         if `f1` is numerically greater than
         `f2`.

**Since:** 1.4

## Float.sum(float, float)

```java
public static float sum(float a, float b)
```

Adds two `float` values together as per the + operator.

Parameters:

- `a`: the first operand
- `b`: the second operand

**API note:** This method corresponds to the addition operation
defined in IEEE 754.

**Returns:** the sum of `a` and `b`

**JLS:** 4.2.4 Floating-Point Operations

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Float.max(float, float)

```java
public static float max(float a, float b)
```

Returns the greater of two `float` values
as if by calling float) Math.max.

Parameters:

- `a`: the first operand
- `b`: the second operand

**API note:** This method corresponds to the maximum operation defined in
IEEE 754.

**Returns:** the greater of `a` and `b`

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Float.min(float, float)

```java
public static float min(float a, float b)
```

Returns the smaller of two `float` values
as if by calling float) Math.min.

Parameters:

- `a`: the first operand
- `b`: the second operand

**API note:** This method corresponds to the minimum operation defined in
IEEE 754.

**Returns:** the smaller of `a` and `b`

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Float.describeConstable()

```java
public Optional<Float> describeConstable()
```

Returns an `Optional` containing the nominal descriptor for this
instance, which is the instance itself.

**Returns:** an `Optional` describing the `Float` instance

**Since:** 12

## Float.resolveConstantDesc(MethodHandles.Lookup)

```java
public Float resolveConstantDesc(MethodHandles.Lookup lookup)
```

Resolves this instance as a `ConstantDesc`, the result of which is
the instance itself.

Parameters:

- `lookup`: ignored

**Returns:** the `Float` instance

**Since:** 12
