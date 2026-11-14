---
title: "AnnotatedTypeVariable interface (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/AnnotatedTypeVariable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AnnotatedTypeVariable interface (java.lang.reflect)

```java
public interface AnnotatedTypeVariable extends AnnotatedType
```

`AnnotatedTypeVariable` represents the potentially annotated use of a
type variable, whose declaration may have bounds which themselves represent
annotated uses of types.

**JLS:** 4.4 Type Variables

**Since:** 1.8

## AnnotatedTypeVariable.getAnnotatedBounds()

```java
AnnotatedType[] getAnnotatedBounds()
```

Returns the potentially annotated bounds of this type variable.
If no bound is explicitly declared, the bound is unannotated
`Object`.

**Returns:** the potentially annotated bounds of this type variable

**See also:** TypeVariable#getBounds()

## AnnotatedTypeVariable.getAnnotatedOwnerType()

```java
AnnotatedType getAnnotatedOwnerType()
```

Returns the potentially annotated type that this type is a member of, if
this type represents a nested type. For example, if this type is
`@TA O<T>.I`, return a representation of `@TA O<T>`.

Returns `null` for an `AnnotatedType` that is an instance
    of `AnnotatedTypeVariable`.

**Returns:** `null`

**Since:** 9
