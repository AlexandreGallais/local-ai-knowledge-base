---
title: "AnnotatedParameterizedType interface (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/AnnotatedParameterizedType.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AnnotatedParameterizedType interface (java.lang.reflect)

```java
public interface AnnotatedParameterizedType extends AnnotatedType
```

`AnnotatedParameterizedType` represents the potentially annotated use
of a parameterized type, whose type arguments may themselves represent
annotated uses of types.

**JLS:** 4.5 Parameterized Types

**Since:** 1.8

## AnnotatedParameterizedType.getAnnotatedActualTypeArguments()

```java
AnnotatedType[] getAnnotatedActualTypeArguments()
```

Returns the potentially annotated actual type arguments of this parameterized type.

Note that in some cases, the returned array can be empty. This can occur
if this annotated type represents a non-parameterized type nested within
a parameterized type.

**Returns:** the potentially annotated actual type arguments of this parameterized type

**See also:** ParameterizedType#getActualTypeArguments()

## AnnotatedParameterizedType.getAnnotatedOwnerType()

```java
AnnotatedType getAnnotatedOwnerType()
```

Returns the potentially annotated type that this type is a member of, if
this type represents a nested type. For example, if this type is
`@TA O<T>.I`, return a representation of `@TA O<T>`.

Returns `null` if this `AnnotatedType` represents a
    top-level class or interface, or a local or anonymous class, or
    a primitive type, or void.

**Returns:** an `AnnotatedType` object representing the potentially
    annotated type that this type is a member of, or `null`

**Since:** 9

Throws:

- `TypeNotPresentException`: if the owner type refers to a non-existent class or interface declaration
- `MalformedParameterizedTypeException`: if the owner type refers to a parameterized type that cannot be instantiated for any reason
