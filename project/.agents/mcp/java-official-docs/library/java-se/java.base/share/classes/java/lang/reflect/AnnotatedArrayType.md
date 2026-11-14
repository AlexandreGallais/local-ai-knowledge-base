---
title: "AnnotatedArrayType interface (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/AnnotatedArrayType.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AnnotatedArrayType interface (java.lang.reflect)

```java
public interface AnnotatedArrayType extends AnnotatedType
```

`AnnotatedArrayType` represents the potentially annotated use of an
array type, whose component type may itself represent the annotated use of a
type.

**JLS:** 10.1 Array Types

**Since:** 1.8

## AnnotatedArrayType.getAnnotatedGenericComponentType()

```java
AnnotatedType getAnnotatedGenericComponentType()
```

Returns the potentially annotated generic component type of this array type.

**Returns:** the potentially annotated generic component type of this array type

**See also:** GenericArrayType#getGenericComponentType()

## AnnotatedArrayType.getAnnotatedOwnerType()

```java
AnnotatedType getAnnotatedOwnerType()
```

Returns the potentially annotated type that this type is a member of, if
this type represents a nested class or interface. For example, if this
type is `@TA O<T>.I`, return a representation of `@TA O<T>`.

Returns `null` for an `AnnotatedType` that is an instance
    of `AnnotatedArrayType`.

**Returns:** `null`

**Since:** 9
