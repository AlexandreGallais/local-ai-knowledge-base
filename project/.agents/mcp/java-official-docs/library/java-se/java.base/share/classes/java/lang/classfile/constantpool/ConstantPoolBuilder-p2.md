---
title: "ConstantPoolBuilder interface (java.lang.classfile.constantpool) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/ConstantPoolBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConstantPoolBuilder interface (java.lang.classfile.constantpool) (part 2 of 2)

## ConstantPoolBuilder.constantValueEntry(ConstantDesc)

```java
default ConstantValueEntry constantValueEntry(ConstantDesc c)
```

Parameters:

- `c`: the provided constant value

**See also:** ConstantValueEntry#constantValue() ConstantValueEntry::constantValue

**See also:** ConstantValueAttribute#of(ConstantDesc)
     ConstantValueAttribute::of(ConstantDesc)

Throws:

- `IllegalArgumentException`: if the value is not one of `Integer`, `Long`, `Float`, `Double`, or `String`

## ConstantPoolBuilder.loadableConstantEntry(ConstantDesc)

```java
default LoadableConstantEntry loadableConstantEntry(ConstantDesc c)
```

Parameters:

- `c`: the nominal descriptor for the constant

## ConstantPoolBuilder.bsmEntry(DirectMethodHandleDesc, List<ConstantDesc>)

```java
default BootstrapMethodEntry bsmEntry(DirectMethodHandleDesc methodReference, List<ConstantDesc> arguments)
```

Parameters:

- `methodReference`: the bootstrap method
- `arguments`: the arguments

## ConstantPoolBuilder.bsmEntry(MethodHandleEntry, List<LoadableConstantEntry>)

```java
BootstrapMethodEntry bsmEntry(MethodHandleEntry methodReference, List<LoadableConstantEntry> arguments)
```

The `MethodHandleEntry` is the bootstrap method, and the
list of `LoadableConstantEntry` is the arguments.

Parameters:

- `methodReference`: the `MethodHandleEntry`
- `arguments`: the list of `LoadableConstantEntry`

**See also:** BootstrapMethodEntry#bootstrapMethod()
     BootstrapMethodEntry::bootstrapMethod

**See also:** BootstrapMethodEntry#arguments() BootstrapMethodEntry::arguments
