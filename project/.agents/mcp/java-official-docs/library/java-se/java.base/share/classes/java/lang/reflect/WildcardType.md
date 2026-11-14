---
title: "WildcardType interface (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/WildcardType.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# WildcardType interface (java.lang.reflect)

```java
public interface WildcardType extends Type
```

WildcardType represents a wildcard type expression, such as
`?`, `? extends Number`, or `? super Integer`.

**JLS:** 4.5.1 Type Arguments of Parameterized Types

**Since:** 1.5

## WildcardType.getUpperBounds()

```java
Type[] getUpperBounds()
```

Returns an array of `Type` objects representing the  upper
bound(s) of this type variable.  If no upper bound is
explicitly declared, the upper bound is `Object`.

For each upper bound B :

- if B is a parameterized type or a type variable, it is created,
 (see ParameterizedType
 for the details of the creation process for parameterized types).

- Otherwise, B is resolved.

**API note:** While to date a wildcard may have at most one upper
bound, callers of this method should be written to accommodate
multiple bounds.

**Returns:** an array of Types representing the upper bound(s) of this
    type variable

Throws:

- `TypeNotPresentException`: if any of the bounds refers to a non-existent type declaration
- `MalformedParameterizedTypeException`: if any of the bounds refer to a parameterized type that cannot be instantiated for any reason

## WildcardType.getLowerBounds()

```java
Type[] getLowerBounds()
```

Returns an array of `Type` objects representing the
lower bound(s) of this type variable.  If no lower bound is
explicitly declared, the lower bound is the type of `null`.
In this case, a zero length array is returned.

For each lower bound B :

- if B is a parameterized type or a type variable, it is created,
 (see ParameterizedType
 for the details of the creation process for parameterized types).

- Otherwise, B is resolved.

**API note:** While to date a wildcard may have at most one lower
bound, callers of this method should be written to accommodate
multiple bounds.

**Returns:** an array of Types representing the lower bound(s) of this
    type variable

Throws:

- `TypeNotPresentException`: if any of the bounds refers to a non-existent type declaration
- `MalformedParameterizedTypeException`: if any of the bounds refer to a parameterized type that cannot be instantiated for any reason
