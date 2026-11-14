---
title: "ConstantDesc interface (java.lang.constant)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/constant/ConstantDesc.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConstantDesc interface (java.lang.constant)

```java
public sealed interface ConstantDesc permits ClassDesc, MethodHandleDesc, MethodTypeDesc, Double, DynamicConstantDesc, Float, Integer, Long, String
```

A nominal descriptor for a loadable
constant value, as defined in JVMS . Such a descriptor can be resolved via
`ConstantDesc.resolveConstantDesc(MethodHandles.Lookup)` to yield the
constant value itself.

Class names in a nominal descriptor, like class names in the constant pool
of a classfile, must be interpreted with respect to a particular class
loader, which is not part of the nominal descriptor.

Static constants that are expressible natively in the constant pool (`String`,
`Integer`, `Long`, `Float`, and `Double`) implement
`ConstantDesc`, and serve as nominal descriptors for themselves.
Native linkable constants (`Class`, `MethodType`, and
`MethodHandle`) have counterpart `ConstantDesc` types:
`ClassDesc`, `MethodTypeDesc`, and `MethodHandleDesc`.
Other constants are represented by subtypes of `DynamicConstantDesc`.

APIs that perform generation or parsing of bytecode are encouraged to use
`ConstantDesc` to describe the operand of an `ldc` instruction
(including dynamic constants), the static bootstrap arguments of
dynamic constants and `invokedynamic` instructions, and other
bytecodes or classfile structures that make use of the constant pool.

Constants describing various common constants (such as `ClassDesc`
instances for platform types) can be found in `ConstantDescs`.

Implementations of `ConstantDesc` should be immutable
and their behavior should not rely on object identity.

Non-platform classes should not implement `ConstantDesc` directly.
Instead, they should extend `DynamicConstantDesc` (as `EnumDesc`
and `VarHandleDesc` do.)

Nominal descriptors should be compared using the
`Object.equals(Object)` method. There is no guarantee that any
particular entity will always be represented by the same descriptor instance.

**See also:** Constable

**See also:** ConstantDescs

**jvms:** 4.4 The Constant Pool

**Since:** 12

**sealedGraph:**

## ConstantDesc.resolveConstantDesc(MethodHandles.Lookup)

```java
Object resolveConstantDesc(MethodHandles.Lookup lookup) throws ReflectiveOperationException
```

Resolves this descriptor reflectively, emulating the resolution behavior
of JVMS  and the access control behavior of JVMS .  The resolution
and access control context is provided by the `MethodHandles.Lookup`
parameter.  No caching of the resulting value is performed.

Parameters:

- `lookup`: The `MethodHandles.Lookup` to provide name resolution and access control context

**Returns:** the resolved constant value

**API note:** Some constant descriptors, such as `MethodTypeDesc`, can represent
a value that is not representable by run-time entities. Attempts to resolve these may
result in errors.

**jvms:** 5.4.3 Resolution

**jvms:** 5.4.4 Access Control

Throws:

- `ReflectiveOperationException`: if a class, method, or field could not be reflectively resolved in the course of resolution
- `LinkageError`: if a linkage error occurs
