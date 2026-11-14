---
title: "AnnotatedWildcardType interface (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/AnnotatedWildcardType.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AnnotatedWildcardType interface (java.lang.reflect)

```java
public interface AnnotatedWildcardType extends AnnotatedType
```

`AnnotatedWildcardType` represents the potentially annotated use of a
wildcard type argument, whose upper or lower bounds may themselves represent
annotated uses of types.

**JLS:** 4.5.1 Type Arguments of Parameterized Types

**Since:** 1.8

## AnnotatedWildcardType.getAnnotatedLowerBounds()

```java
AnnotatedType[] getAnnotatedLowerBounds()
```

Returns the potentially annotated lower bounds of this wildcard type.
If no lower bound is explicitly declared, the lower bound is the
type of null. In this case, a zero length array is returned.

**API note:** While to date a wildcard may have at most one lower
bound, callers of this method should be written to accommodate
multiple bounds.

**Returns:** the potentially annotated lower bounds of this wildcard type or
an empty array if no lower bound is explicitly declared.

**See also:** WildcardType#getLowerBounds()

## AnnotatedWildcardType.getAnnotatedUpperBounds()

```java
AnnotatedType[] getAnnotatedUpperBounds()
```

Returns the potentially annotated upper bounds of this wildcard type.
If no upper bound is explicitly declared, the upper bound is
unannotated `Object`

**API note:** While to date a wildcard may have at most one upper
bound, callers of this method should be written to accommodate
multiple bounds.

**Returns:** the potentially annotated upper bounds of this wildcard type

**See also:** WildcardType#getUpperBounds()

## AnnotatedWildcardType.getAnnotatedOwnerType()

```java
AnnotatedType getAnnotatedOwnerType()
```

Returns the potentially annotated type that this type is a member of, if
this type represents a nested type. For example, if this type is
`@TA O<T>.I`, return a representation of `@TA O<T>`.

Returns `null` for an `AnnotatedType` that is an instance
    of `AnnotatedWildcardType`.

**Returns:** `null`

**Since:** 9
