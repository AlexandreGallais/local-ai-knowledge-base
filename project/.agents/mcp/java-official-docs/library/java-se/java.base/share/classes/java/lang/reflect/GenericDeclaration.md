---
title: "GenericDeclaration interface (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/GenericDeclaration.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# GenericDeclaration interface (java.lang.reflect)

```java
public interface GenericDeclaration extends AnnotatedElement
```

A common interface for all entities that declare type variables.

**Since:** 1.5

## GenericDeclaration.getTypeParameters()

```java
public TypeVariable<?>[] getTypeParameters()
```

Returns an array of `TypeVariable` objects that
represent the type variables declared by the generic
declaration represented by this `GenericDeclaration`
object, in declaration order.  Returns an array of length 0 if
the underlying generic declaration declares no type variables.

**Returns:** an array of `TypeVariable` objects that represent
    the type variables declared by this generic declaration

Throws:

- `GenericSignatureFormatError`: if the generic signature of this generic declaration does not conform to the format specified in *The Java Virtual Machine Specification*
