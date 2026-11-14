---
title: "Modifier class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/Modifier.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Modifier class (java.lang.reflect)

```java
public final class Modifier
```

The Modifier class provides `static` methods and
constants to decode class and member access modifiers.  The sets of
modifiers are represented as integers with distinct bit positions
representing different modifiers.  The values for the constants
representing the modifiers are taken from the tables in sections
, , , and  of
*The Java Virtual Machine Specification*.

**API note:** Not all modifiers that are syntactic Java language modifiers are
represented in this class, only those modifiers that *also*
have a corresponding JVM access flag are
included. In particular the `default` method modifier (JLS
) and the `sealed` and `non-sealed` class
(JLS ) and interface (JLS ) modifiers
are *not* represented in this class.

**See also:** Class#getModifiers()

**See also:** Member#getModifiers()

**Since:** 1.1

## Modifier.isPublic(int)

```java
public static boolean isPublic(int mod)
```

Return `true` if the integer argument includes the
`public` modifier, `false` otherwise.

Parameters:

- `mod`: a set of modifiers

**Returns:** `true` if `mod` includes the
`public` modifier; `false` otherwise.

## Modifier.isPrivate(int)

```java
public static boolean isPrivate(int mod)
```

Return `true` if the integer argument includes the
`private` modifier, `false` otherwise.

Parameters:

- `mod`: a set of modifiers

**Returns:** `true` if `mod` includes the
`private` modifier; `false` otherwise.

## Modifier.isProtected(int)

```java
public static boolean isProtected(int mod)
```

Return `true` if the integer argument includes the
`protected` modifier, `false` otherwise.

Parameters:

- `mod`: a set of modifiers

**Returns:** `true` if `mod` includes the
`protected` modifier; `false` otherwise.

## Modifier.isStatic(int)

```java
public static boolean isStatic(int mod)
```

Return `true` if the integer argument includes the
`static` modifier, `false` otherwise.

Parameters:

- `mod`: a set of modifiers

**Returns:** `true` if `mod` includes the
`static` modifier; `false` otherwise.

## Modifier.isFinal(int)

```java
public static boolean isFinal(int mod)
```

Return `true` if the integer argument includes the
`final` modifier, `false` otherwise.

Parameters:

- `mod`: a set of modifiers

**Returns:** `true` if `mod` includes the
`final` modifier; `false` otherwise.

## Modifier.isSynchronized(int)

```java
public static boolean isSynchronized(int mod)
```

Return `true` if the integer argument includes the
`synchronized` modifier, `false` otherwise.

Parameters:

- `mod`: a set of modifiers

**Returns:** `true` if `mod` includes the
`synchronized` modifier; `false` otherwise.

## Modifier.isVolatile(int)

```java
public static boolean isVolatile(int mod)
```

Return `true` if the integer argument includes the
`volatile` modifier, `false` otherwise.

Parameters:

- `mod`: a set of modifiers

**Returns:** `true` if `mod` includes the
`volatile` modifier; `false` otherwise.

## Modifier.isTransient(int)

```java
public static boolean isTransient(int mod)
```

Return `true` if the integer argument includes the
`transient` modifier, `false` otherwise.

Parameters:

- `mod`: a set of modifiers

**Returns:** `true` if `mod` includes the
`transient` modifier; `false` otherwise.

## Modifier.isNative(int)

```java
public static boolean isNative(int mod)
```

Return `true` if the integer argument includes the
`native` modifier, `false` otherwise.

Parameters:

- `mod`: a set of modifiers

**Returns:** `true` if `mod` includes the
`native` modifier; `false` otherwise.

## Modifier.isInterface(int)

```java
public static boolean isInterface(int mod)
```

Return `true` if the integer argument includes the
`interface` modifier, `false` otherwise.

Parameters:

- `mod`: a set of modifiers

**Returns:** `true` if `mod` includes the
`interface` modifier; `false` otherwise.

## Modifier.isAbstract(int)

```java
public static boolean isAbstract(int mod)
```

Return `true` if the integer argument includes the
`abstract` modifier, `false` otherwise.

Parameters:

- `mod`: a set of modifiers

**Returns:** `true` if `mod` includes the
`abstract` modifier; `false` otherwise.

## Modifier.isStrict(int)

```java
public static boolean isStrict(int mod)
```

Return `true` if the integer argument includes the
`strictfp` modifier, `false` otherwise.

Parameters:

- `mod`: a set of modifiers

**Returns:** `true` if `mod` includes the
`strictfp` modifier; `false` otherwise.

## Modifier.toString(int)

```java
public static String toString(int mod)
```

Return a string describing the access modifier flags in
the specified modifier. For example:

```java
   public final synchronized strictfp
```

The modifier names are returned in an order consistent with the
suggested modifier orderings given in sections 8.1.1, 8.3.1, 8.4.3, 8.8.3, and 9.1.1 of
*The Java Language Specification*.
The full modifier ordering used by this method is:
 `public protected private abstract static final transient volatile synchronized native strictfp interface`

The `interface` modifier discussed in this class is
not a true modifier in the Java language and it appears after
all other modifiers listed by this method.  This method may
return a string of modifiers that are not valid modifiers of a
Java entity; in other words, no checking is done on the
possible validity of the combination of modifiers represented
by the input.

Note that to perform such checking for a known kind of entity,
such as a constructor or method, first AND the argument of
`toString` with the appropriate mask from a method like
`constructorModifiers` or `methodModifiers`.

Parameters:

- `mod`: a set of modifiers

**API note:** To make a high-fidelity representation of the Java source
modifiers of a class or member, source-level modifiers that do
*not* have a constant in this class should be included
and appear in an order consistent with the full recommended
ordering for that kind of declaration as given in *The
Java Language Specification*. For example, for a
method the "default" modifier is ordered immediately
before "`static`" (JLS ). For a class object, the "sealed" or `"non-sealed"` modifier is
ordered immediately after "`final`" for a class (JLS
) and immediately after "`static`" for an
interface (JLS ).

**Returns:** a string representation of the set of modifiers
represented by `mod`

## Modifier.PUBLIC

```java
public static final int PUBLIC
```

The `int` value representing the `public`
modifier.

**See also:** AccessFlag#PUBLIC

## Modifier.PRIVATE

```java
public static final int PRIVATE
```

The `int` value representing the `private`
modifier.

**See also:** AccessFlag#PRIVATE

## Modifier.PROTECTED

```java
public static final int PROTECTED
```

The `int` value representing the `protected`
modifier.

**See also:** AccessFlag#PROTECTED

## Modifier.STATIC

```java
public static final int STATIC
```

The `int` value representing the `static`
modifier.

**See also:** AccessFlag#STATIC

## Modifier.FINAL

```java
public static final int FINAL
```

The `int` value representing the `final`
modifier.

**See also:** AccessFlag#FINAL

## Modifier.SYNCHRONIZED

```java
public static final int SYNCHRONIZED
```

The `int` value representing the `synchronized`
modifier.

**See also:** AccessFlag#SYNCHRONIZED

## Modifier.VOLATILE

```java
public static final int VOLATILE
```

The `int` value representing the `volatile`
modifier.

**See also:** AccessFlag#VOLATILE

## Modifier.TRANSIENT

```java
public static final int TRANSIENT
```

The `int` value representing the `transient`
modifier.

**See also:** AccessFlag#TRANSIENT

## Modifier.NATIVE

```java
public static final int NATIVE
```

The `int` value representing the `native`
modifier.

**See also:** AccessFlag#NATIVE

## Modifier.INTERFACE

```java
public static final int INTERFACE
```

The `int` value representing the `interface`
modifier.

**See also:** AccessFlag#INTERFACE

## Modifier.ABSTRACT

```java
public static final int ABSTRACT
```

The `int` value representing the `abstract`
modifier.

**See also:** AccessFlag#ABSTRACT

## Modifier.STRICT

```java
public static final int STRICT
```

The `int` value representing the `strictfp`
modifier.

**See also:** AccessFlag#STRICT

## Modifier.classModifiers()

```java
public static int classModifiers()
```

Return an `int` value OR-ing together the source language
modifiers that can be applied to a class.

**Returns:** an `int` value OR-ing together the source language
modifiers that can be applied to a class.

**See also:** AccessFlag.Location#CLASS

**See also:** AccessFlag.Location#INNER_CLASS

**JLS:** 8.1.1 Class Modifiers

**Since:** 1.7

## Modifier.interfaceModifiers()

```java
public static int interfaceModifiers()
```

Return an `int` value OR-ing together the source language
modifiers that can be applied to an interface.

**Returns:** an `int` value OR-ing together the source language
modifiers that can be applied to an interface.

**See also:** AccessFlag.Location#CLASS

**See also:** AccessFlag.Location#INNER_CLASS

**JLS:** 9.1.1 Interface Modifiers

**Since:** 1.7

## Modifier.constructorModifiers()

```java
public static int constructorModifiers()
```

Return an `int` value OR-ing together the source language
modifiers that can be applied to a constructor.

**Returns:** an `int` value OR-ing together the source language
modifiers that can be applied to a constructor.

**See also:** AccessFlag.Location#METHOD

**JLS:** 8.8.3 Constructor Modifiers

**Since:** 1.7

## Modifier.methodModifiers()

```java
public static int methodModifiers()
```

Return an `int` value OR-ing together the source language
modifiers that can be applied to a method.

**Returns:** an `int` value OR-ing together the source language
modifiers that can be applied to a method.

**See also:** AccessFlag.Location#METHOD

**JLS:** 8.4.3 Method Modifiers

**Since:** 1.7

## Modifier.fieldModifiers()

```java
public static int fieldModifiers()
```

Return an `int` value OR-ing together the source language
modifiers that can be applied to a field.

**Returns:** an `int` value OR-ing together the source language
modifiers that can be applied to a field.

**See also:** AccessFlag.Location#FIELD

**JLS:** 8.3.1 Field Modifiers

**Since:** 1.7

## Modifier.parameterModifiers()

```java
public static int parameterModifiers()
```

Return an `int` value OR-ing together the source language
modifiers that can be applied to a parameter.

**Returns:** an `int` value OR-ing together the source language
modifiers that can be applied to a parameter.

**See also:** AccessFlag.Location#METHOD_PARAMETER

**JLS:** 8.4.1 Formal Parameters

**Since:** 1.8
