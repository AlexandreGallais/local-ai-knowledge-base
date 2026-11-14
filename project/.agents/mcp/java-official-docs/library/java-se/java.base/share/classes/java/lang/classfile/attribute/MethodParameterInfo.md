---
title: "MethodParameterInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/MethodParameterInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodParameterInfo interface (java.lang.classfile.attribute)

```java
public sealed interface MethodParameterInfo permits UnboundAttribute.UnboundMethodParameterInfo
```

Models a single method parameter in the `MethodParametersAttribute`.

**See also:** MethodParametersAttribute#parameters()

**See also:** Parameter

**jvms:** 4.7.24 The `MethodParameters` Attribute

**Since:** 24

## MethodParameterInfo.name()

```java
Optional<Utf8Entry> name()
```

**See also:** Parameter#getName()

**See also:** Parameter#isNamePresent()

## MethodParameterInfo.flagsMask()

```java
int flagsMask()
```

It is in the range of unsigned
short, `[0, 0xFFFF]`.

**See also:** Parameter#getModifiers()

**See also:** AccessFlag.Location#METHOD_PARAMETER

## MethodParameterInfo.flags()

```java
default Set<AccessFlag> flags()
```

**See also:** Parameter#accessFlags()

**See also:** AccessFlag.Location#METHOD_PARAMETER

Throws:

- `IllegalArgumentException`: if the flags mask has any undefined bit set

## MethodParameterInfo.has(AccessFlag)

```java
default boolean has(AccessFlag flag)
```

Parameters:

- `flag`: the method parameter flag

**See also:** AccessFlag.Location#METHOD_PARAMETER

## MethodParameterInfo.of(Optional<Utf8Entry>, int)

```java
static MethodParameterInfo of(Optional<Utf8Entry> name, int flags)
```

Parameters:

- `name`: the method parameter name, may be empty
- `flags`: the method parameter access flags

## MethodParameterInfo.of(Optional<String>, AccessFlag...)

```java
static MethodParameterInfo of(Optional<String> name, AccessFlag... flags)
```

Parameters:

- `name`: the method parameter name, may be empty
- `flags`: the method parameter access flags

Throws:

- `IllegalArgumentException`: if any flag cannot be applied to the `AccessFlag.Location.METHOD_PARAMETER` location

## MethodParameterInfo.ofParameter(Optional<String>, int)

```java
static MethodParameterInfo ofParameter(Optional<String> name, int flags)
```

Parameters:

- `name`: the method parameter name, may be empty
- `flags`: the method parameter access flags
