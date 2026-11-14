---
title: "GenericArrayType interface (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/GenericArrayType.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# GenericArrayType interface (java.lang.reflect)

```java
public interface GenericArrayType extends Type
```

`GenericArrayType` represents an array type whose component
type is either a parameterized type or a type variable.

**JLS:** 10.1 Array Types

**Since:** 1.5

## GenericArrayType.getGenericComponentType()

```java
Type getGenericComponentType()
```

Returns a `Type` object representing the component type
of this array. This method creates the component type of the
array.  See the declaration of ParameterizedType for the
semantics of the creation process for parameterized types and
see TypeVariable for the
creation process for type variables.

**Returns:** a `Type` object representing the component type
    of this array

Throws:

- `TypeNotPresentException`: if the underlying array type's component type refers to a non-existent class or interface declaration
- `MalformedParameterizedTypeException`: if the underlying array type's component type refers to a parameterized type that cannot be instantiated for any reason
