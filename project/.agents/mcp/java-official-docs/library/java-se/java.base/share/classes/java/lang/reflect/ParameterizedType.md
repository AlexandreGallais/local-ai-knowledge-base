---
title: "ParameterizedType interface (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/ParameterizedType.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ParameterizedType interface (java.lang.reflect)

```java
public interface ParameterizedType extends Type
```

ParameterizedType represents a parameterized type such as
`Collection<String>`.

A parameterized type is created the first time it is needed by a
reflective method, as specified in this package. When a
parameterized type p is created, the generic class or interface declaration
that p instantiates is resolved, and all type arguments of p are created
recursively. See TypeVariable for details on the creation process for type
variables. Repeated creation of a parameterized type has no effect.

Instances of classes that implement this interface must implement
an equals() method that equates any two instances that share the
same generic class or interface declaration and have equal type parameters.

**JLS:** 4.5 Parameterized Types

**Since:** 1.5

## ParameterizedType.getActualTypeArguments()

```java
Type[] getActualTypeArguments()
```

Returns an array of `Type` objects representing the actual type
arguments to this type.

Note that in some cases, the returned array be empty. This can occur
if this type represents a non-parameterized type nested within
a parameterized type.

**Returns:** an array of `Type` objects representing the actual type
    arguments to this type

**Since:** 1.5

Throws:

- `TypeNotPresentException`: if any of the actual type arguments refers to a non-existent class or interface declaration
- `MalformedParameterizedTypeException`: if any of the actual type parameters refer to a parameterized type that cannot be instantiated for any reason

## ParameterizedType.getRawType()

```java
Type getRawType()
```

**API note:** All `ParameterizedType` objects from core reflection return a
`Class`. The static `Type` return type allows other
implementations to represent classes and interfaces not in the current
runtime.

**Since:** 1.5

## ParameterizedType.getOwnerType()

```java
Type getOwnerType()
```

Returns a `Type` object representing the type that this type
is a member of.  For example, if this type is `O<T>.I`,
return a representation of `O<T>`.

If this type is a top-level type, `null` is returned.

**Returns:** a `Type` object representing the type that
    this type is a member of. If this type is a top-level type,
    `null` is returned

**Since:** 1.5

Throws:

- `TypeNotPresentException`: if the owner type refers to a non-existent class or interface declaration
- `MalformedParameterizedTypeException`: if the owner type refers to a parameterized type that cannot be instantiated for any reason
