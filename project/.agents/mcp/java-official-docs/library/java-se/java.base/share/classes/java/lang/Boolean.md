---
title: "Boolean class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Boolean.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Boolean class (java.lang)

```java
public final class Boolean implements java.io.Serializable, Comparable<Boolean>, Constable
```

The `Boolean` class is the wrapper class for values of the primitive
type `boolean`. An object of type `Boolean` contains a
single field whose type is `boolean`.

In addition, this class provides many methods for
converting a `boolean` to a `String` and a
`String` to a `boolean`, as well as other
constants and methods useful when dealing with a
`boolean`.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.

**Since:** 1.0

## Boolean.TRUE

```java
public static final Boolean TRUE
```

The `Boolean` object corresponding to the primitive
value `true`.

## Boolean.FALSE

```java
public static final Boolean FALSE
```

The `Boolean` object corresponding to the primitive
value `false`.

## Boolean.TYPE

```java
public static final Class<Boolean> TYPE
```

The Class object representing the primitive type boolean.

**Since:** 1.1

## Boolean.Boolean(boolean)

```java
public Boolean(boolean value)
```

Allocates a `Boolean` object representing the
`value` argument.

Parameters:

- `value`: the value of the `Boolean`.

**Deprecated:** It is rarely appropriate to use this constructor. The static factory
`valueOf(boolean)` is generally a better choice, as it is
likely to yield significantly better space and time performance.
Also consider using the final fields `TRUE` and `FALSE`
if possible.

## Boolean.Boolean(String)

```java
public Boolean(String s)
```

Allocates a `Boolean` object representing the value
`true` if the string argument is not `null`
and is equal, ignoring case, to the string `"true"`.
Otherwise, allocates a `Boolean` object representing the
value `false`.

Parameters:

- `s`: the string to be converted to a `Boolean`.

**Deprecated:** It is rarely appropriate to use this constructor.
Use `parseBoolean(String)` to convert a string to a
`boolean` primitive, or use `valueOf(String)`
to convert a string to a `Boolean` object.

## Boolean.parseBoolean(String)

```java
public static boolean parseBoolean(String s)
```

Parses the string argument as a boolean.  The `boolean`
returned represents the value `true` if the string argument
is not `null` and is equal, ignoring case, to the string
`"true"`.
Otherwise, a false value is returned, including for a null
argument.

Example: `Boolean.parseBoolean("True")` returns `true`.

Example: `Boolean.parseBoolean("yes")` returns `false`.

Parameters:

- `s`: the `String` containing the boolean representation to be parsed

**Returns:** the boolean represented by the string argument

**Since:** 1.5

## Boolean.booleanValue()

```java
public boolean booleanValue()
```

Returns the value of this `Boolean` object as a boolean
primitive.

**Returns:** the primitive `boolean` value of this object.

## Boolean.valueOf(boolean)

```java
public static Boolean valueOf(boolean b)
```

Returns a `Boolean` instance representing the specified
`boolean` value.  If the specified `boolean` value
is `true`, this method returns `Boolean.TRUE`;
if it is `false`, this method returns `Boolean.FALSE`.
If a new `Boolean` instance is not required, this method
should generally be used in preference to the constructor
`Boolean(boolean)`, as this method is likely to yield
significantly better space and time performance.

Parameters:

- `b`: a boolean value.

**Returns:** a `Boolean` instance representing `b`.

**Since:** 1.4

## Boolean.valueOf(String)

```java
public static Boolean valueOf(String s)
```

Returns a `Boolean` with a value represented by the
specified string.  The `Boolean` returned represents a
true value if the string argument is not `null`
and is equal, ignoring case, to the string `"true"`.
Otherwise, a false value is returned, including for a null
argument.

Parameters:

- `s`: a string.

**Returns:** the `Boolean` value represented by the string.

## Boolean.toString(boolean)

```java
public static String toString(boolean b)
```

Returns a `String` object representing the specified
boolean.  If the specified boolean is `true`, then
the string `"true"` will be returned, otherwise the
string `"false"` will be returned.

Parameters:

- `b`: the boolean to be converted

**Returns:** the string representation of the specified `boolean`

**Since:** 1.4

## Boolean.toString()

```java
public String toString()
```

Returns a `String` object representing this Boolean's
value.  If this object represents the value `true`,
a string equal to `"true"` is returned. Otherwise, a
string equal to `"false"` is returned.

**Returns:** a string representation of this object.

## Boolean.hashCode()

```java
public int hashCode()
```

Returns a hash code for this `Boolean` object.

**Returns:** the integer `1231` if this object represents
`true`; returns the integer `1237` if this
object represents `false`.

## Boolean.hashCode(boolean)

```java
public static int hashCode(boolean value)
```

Returns a hash code for a `boolean` value; compatible with
`Boolean.hashCode()`.

Parameters:

- `value`: the value to hash

**Returns:** a hash code value for a `boolean` value.

**Since:** 1.8

## Boolean.equals(Object)

```java
public boolean equals(Object obj)
```

Returns `true` if and only if the argument is not
`null` and is a `Boolean` object that
represents the same `boolean` value as this object.

Parameters:

- `obj`: the object to compare with.

**Returns:** `true` if the Boolean objects represent the
         same value; `false` otherwise.

## Boolean.getBoolean(String)

```java
public static boolean getBoolean(String name)
```

Returns `true` if and only if the system property named
by the argument exists and is equal to, ignoring case, the
string `"true"`.
A system property is accessible through `getProperty`, a
method defined by the `System` class.

 If there is no
property with the specified name, or if the specified name is
empty or null, then `false` is returned.

Parameters:

- `name`: the system property name.

**Returns:** the `boolean` value of the system property.

**See also:** java.lang.System#getProperty(java.lang.String)

**See also:** java.lang.System#getProperty(java.lang.String, java.lang.String)

## Boolean.compareTo(Boolean)

```java
public int compareTo(Boolean b)
```

Compares this `Boolean` instance with another.

Parameters:

- `b`: the `Boolean` instance to be compared

**Returns:** zero if this object represents the same boolean value as the
         argument; a positive value if this object represents true
         and the argument represents false; and a negative value if
         this object represents false and the argument represents true

**See also:** Comparable

**Since:** 1.5

Throws:

- `NullPointerException`: if the argument is `null`

## Boolean.compare(boolean, boolean)

```java
public static int compare(boolean x, boolean y)
```

Compares two `boolean` values.
The value returned is identical to what would be returned by:

```java
   Boolean.valueOf(x).compareTo(Boolean.valueOf(y))
```

Parameters:

- `x`: the first `boolean` to compare
- `y`: the second `boolean` to compare

**Returns:** the value `0` if `x == y`;
        a value less than `0` if `!x && y`; and
        a value greater than `0` if `x && !y`

**Since:** 1.7

## Boolean.logicalAnd(boolean, boolean)

```java
public static boolean logicalAnd(boolean a, boolean b)
```

Returns the result of applying the logical AND operator to the
specified `boolean` operands.

Parameters:

- `a`: the first operand
- `b`: the second operand

**Returns:** the logical AND of `a` and `b`

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Boolean.logicalOr(boolean, boolean)

```java
public static boolean logicalOr(boolean a, boolean b)
```

Returns the result of applying the logical OR operator to the
specified `boolean` operands.

Parameters:

- `a`: the first operand
- `b`: the second operand

**Returns:** the logical OR of `a` and `b`

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Boolean.logicalXor(boolean, boolean)

```java
public static boolean logicalXor(boolean a, boolean b)
```

Returns the result of applying the logical XOR operator to the
specified `boolean` operands.

Parameters:

- `a`: the first operand
- `b`: the second operand

**Returns:** the logical XOR of `a` and `b`

**See also:** java.util.function.BinaryOperator

**Since:** 1.8

## Boolean.describeConstable()

```java
public Optional<DynamicConstantDesc<Boolean>> describeConstable()
```

Returns an `Optional` containing the nominal descriptor for this
instance.

**Returns:** an `Optional` describing the `Boolean` instance

**Since:** 15
