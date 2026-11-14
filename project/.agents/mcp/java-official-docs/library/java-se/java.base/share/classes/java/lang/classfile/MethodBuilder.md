---
title: "MethodBuilder interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/MethodBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodBuilder interface (java.lang.classfile)

```java
public sealed interface MethodBuilder extends ClassFileBuilder<MethodElement, MethodBuilder> permits ChainedMethodBuilder, TerminalMethodBuilder
```

A builder for methods.  The main way to obtain a method builder is via MethodTypeDesc, int, Consumer).  MethodTypeDesc, int, Consumer) is
useful if no attribute on the method except Code needs to
be configured, skipping the method handler.

Refer to `ClassFileBuilder` for general guidance and caution around
the use of builders for structures in the `class` file format.

**See also:** MethodModel

**See also:** MethodTransform

**jvms:** 4.6 Methods

**Since:** 24

## MethodBuilder.withFlags(int)

```java
default MethodBuilder withFlags(int flags)
```

Sets the method access flags.  The `AccessFlag.STATIC` flag cannot
be modified after the builder is created.

Parameters:

- `flags`: the access flags, as a bit mask

**Returns:** this builder

**See also:** AccessFlags

**See also:** AccessFlag.Location#METHOD

Throws:

- `IllegalArgumentException`: if the ACC_STATIC flag is modified

## MethodBuilder.withFlags(AccessFlag...)

```java
default MethodBuilder withFlags(AccessFlag... flags)
```

Sets the method access flags.  The `AccessFlag.STATIC` flag cannot
be modified after the builder is created.

Parameters:

- `flags`: the access flags, as a bit mask

**Returns:** this builder

**See also:** AccessFlags

**See also:** AccessFlag.Location#METHOD

Throws:

- `IllegalArgumentException`: if the ACC_STATIC flag is modified

## MethodBuilder.withCode(Consumer<? super CodeBuilder>)

```java
MethodBuilder withCode(Consumer<? super CodeBuilder> code)
```

Build the method body for this method.

Parameters:

- `code`: a handler receiving a `CodeBuilder`

**Returns:** this builder

**See also:** CodeModel

## MethodBuilder.transformCode(CodeModel, CodeTransform)

```java
MethodBuilder transformCode(CodeModel code, CodeTransform transform)
```

Build the method body for this method by transforming the body of another
method.

This method behaves as if:

Parameters:

- `code`: the method body to be transformed
- `transform`: the transform to apply to the method body

**Returns:** this builder

**See also:** CodeTransform
