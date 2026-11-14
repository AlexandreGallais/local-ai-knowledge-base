---
title: "MethodParametersAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/MethodParametersAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodParametersAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface MethodParametersAttribute extends Attribute<MethodParametersAttribute>, MethodElement permits BoundAttribute.BoundMethodParametersAttribute, UnboundAttribute.UnboundMethodParametersAttribute
```

Models the MethodParameters attribute
(JVMS ), which records reflective information about this
method's parameters such as access modifiers.

This attribute only appears on methods, and does not permit multiple instances in a method.  It has a
data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 8, major version
`ClassFile#JAVA_8_VERSION`.

**See also:** Attributes#methodParameters()

**See also:** Executable#getParameters()

**jvms:** 4.7.24 The `MethodParameters` Attribute

**Since:** 24

## MethodParametersAttribute.parameters()

```java
List<MethodParameterInfo> parameters()
```

The i'th entry
in the list corresponds to the i'th parameter in the method descriptor.

## MethodParametersAttribute.of(List<MethodParameterInfo>)

```java
static MethodParametersAttribute of(List<MethodParameterInfo> parameters)
```

Parameters:

- `parameters`: the method parameter descriptions

## MethodParametersAttribute.of(MethodParameterInfo...)

```java
static MethodParametersAttribute of(MethodParameterInfo... parameters)
```

Parameters:

- `parameters`: the method parameter descriptions
