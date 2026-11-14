---
title: "ExactConversionsSupport class (java.lang.runtime)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/runtime/ExactConversionsSupport.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ExactConversionsSupport class (java.lang.runtime)

```java
public final class ExactConversionsSupport
```

A testing conversion of a value is exact if it yields a result without loss
of information or throwing an exception. Otherwise, it is inexact. Some
conversions are always exact regardless of the value. These conversions are
said to be unconditionally exact.

For example, a conversion from `int` to `byte` for the value 10
is exact because the result, 10, is the same as the original value. In
contrast, if the `int` variable `i` stores the value 1000 then a
narrowing primitive conversion to `byte` will yield the result -24.
Loss of information has occurred: both the magnitude and the sign of the
result are different than those of the original value. As such, a conversion
from `int` to `byte` for the value 1000 is inexact. Finally a
widening primitive conversion from `byte` to `int` is
unconditionally exact because it will always succeed with no loss of
information about the magnitude of the numeric value.

The methods in this class provide the run-time support for the exactness
checks of testing conversions from a primitive type to primitive type. These
methods may be used, for example, by Java compiler implementations to
implement checks for `instanceof` and pattern matching runtime
implementations. Unconditionally exact testing conversions do not require a
corresponding action at run time and, for this reason, methods corresponding
to these exactness checks are omitted here.

The run time conversion checks examine whether loss of information would
occur if a testing conversion would be to be applied. In those cases where a
floating-point primitive type is involved, and the value of the testing
conversion is either signed zero, signed infinity or `NaN`, these
methods comply with the following:

- Converting a floating-point negative zero to an integer type is considered
  inexact.

- Converting a floating-point `NaN` or infinity to an integer type is
  considered inexact.

- Converting a floating-point `NaN` or infinity or signed zero to another
  floating-point type is considered exact.

**JLS:** 5.7.1 Exact Testing Conversions

**JLS:** 5.7.2 Unconditionally Exact Testing Conversions

**JLS:** 15.20.2 The instanceof Operator

**Implementation note:** Some exactness checks describe a test which can be redirected
safely through one of the existing methods. Those are omitted too (i.e.,
`byte` to `char` can be redirected  to
`ExactConversionsSupport.isIntToCharExact(int)`, `short` to
`byte` can be redirected to
`ExactConversionsSupport.isIntToByteExact(int)` and similarly for
`short` to `char`, `char` to `byte` and `char`
to `short` to the corresponding methods that take an `int`).

**Since:** 23

## ExactConversionsSupport.isIntToByteExact(int)

```java
public static boolean isIntToByteExact(int n)
```

Exactness method from int to byte

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isIntToShortExact(int)

```java
public static boolean isIntToShortExact(int n)
```

Exactness method from int to short

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isIntToCharExact(int)

```java
public static boolean isIntToCharExact(int n)
```

Exactness method from int to char

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isIntToFloatExact(int)

```java
public static boolean isIntToFloatExact(int n)
```

Exactness method from int to float

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isLongToByteExact(long)

```java
public static boolean isLongToByteExact(long n)
```

Exactness method from long to byte

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isLongToShortExact(long)

```java
public static boolean isLongToShortExact(long n)
```

Exactness method from long to short

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isLongToCharExact(long)

```java
public static boolean isLongToCharExact(long n)
```

Exactness method from long to char

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isLongToIntExact(long)

```java
public static boolean isLongToIntExact(long n)
```

Exactness method from long to int

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

## ExactConversionsSupport.isLongToFloatExact(long)

```java
public static boolean isLongToFloatExact(long n)
```

Exactness method from long to float

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isLongToDoubleExact(long)

```java
public static boolean isLongToDoubleExact(long n)
```

Exactness method from long to double

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isFloatToByteExact(float)

```java
public static boolean isFloatToByteExact(float n)
```

Exactness method from float to byte

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isFloatToShortExact(float)

```java
public static boolean isFloatToShortExact(float n)
```

Exactness method from float to short

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isFloatToCharExact(float)

```java
public static boolean isFloatToCharExact(float n)
```

Exactness method from float to char

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isFloatToIntExact(float)

```java
public static boolean isFloatToIntExact(float n)
```

Exactness method from float to int

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isFloatToLongExact(float)

```java
public static boolean isFloatToLongExact(float n)
```

Exactness method from float to long

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isDoubleToByteExact(double)

```java
public static boolean isDoubleToByteExact(double n)
```

Exactness method from double to byte

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isDoubleToShortExact(double)

```java
public static boolean isDoubleToShortExact(double n)
```

Exactness method from double to short

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isDoubleToCharExact(double)

```java
public static boolean isDoubleToCharExact(double n)
```

Exactness method from double to char

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isDoubleToIntExact(double)

```java
public static boolean isDoubleToIntExact(double n)
```

Exactness method from double to int

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isDoubleToLongExact(double)

```java
public static boolean isDoubleToLongExact(double n)
```

Exactness method from double to long

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.

## ExactConversionsSupport.isDoubleToFloatExact(double)

```java
public static boolean isDoubleToFloatExact(double n)
```

Exactness method from double to float

Parameters:

- `n`: value

**Returns:** true if and only if the passed value can be converted exactly to the target type

**Implementation requirements:** relies on the notion of representation equivalence defined in the
specification of the `Double` class.
