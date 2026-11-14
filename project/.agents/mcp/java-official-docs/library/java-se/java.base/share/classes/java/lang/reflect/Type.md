---
title: "Type interface (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/Type.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Type interface (java.lang.reflect)

```java
public interface Type
```

Type is the common superinterface for all types in the Java
programming language. These include raw types, parameterized types,
array types, type variables and primitive types.

**JLS:** 4.1 The Kinds of Types and Values

**JLS:** 4.2 Primitive Types and Values

**JLS:** 4.3 Reference Types and Values

**JLS:** 4.4 Type Variables

**JLS:** 4.5 Parameterized Types

**JLS:** 4.8 Raw Types

**JLS:** 4.9 Intersection Types

**JLS:** 10.1 Array Types

**Since:** 1.5

## Type.getTypeName()

```java
default String getTypeName()
```

Returns a string describing this type, including information
about any type parameters.

**Implementation requirements:** The default implementation calls `toString`.

**Returns:** a string describing this type

**Since:** 1.8
